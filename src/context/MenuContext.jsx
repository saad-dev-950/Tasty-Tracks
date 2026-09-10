import React, { createContext, useContext, useState, useEffect } from 'react';
import { menuData as initialMenuData } from '../data/menuData';
import { toast } from 'react-toastify';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load from LocalStorage or use initial data
    const storedMenu = JSON.parse(localStorage.getItem('tt_menu'));
    if (storedMenu && Object.keys(storedMenu).length > 0) {
      // Self-healing: Ensure all prices are pure numbers without "PKR" strings
      let dirty = false;
      Object.keys(storedMenu).forEach(cat => {
        storedMenu[cat] = (storedMenu[cat] || []).map(item => {
          if (typeof item.price === 'string' || isNaN(Number(item.price))) {
            dirty = true;
            const cleanedPrice = Number(String(item.price).replace(/[^0-9.]/g, '')) || 0;
            return { ...item, price: cleanedPrice };
          }
          return item;
        });
      });
      if (dirty) {
        localStorage.setItem('tt_menu', JSON.stringify(storedMenu));
      }
      setMenuData(storedMenu);
      setCategories(Object.keys(storedMenu));
    } else {
      setMenuData(initialMenuData);
      setCategories(Object.keys(initialMenuData));
      localStorage.setItem('tt_menu', JSON.stringify(initialMenuData));
    }
  }, []);

  const addMenuItem = (category, item) => {
    const updatedMenu = { ...menuData };
    // Clone array to trigger re-render
    updatedMenu[category] = updatedMenu[category] ? [...updatedMenu[category]] : [];
    const newItem = { ...item, id: `item_${Date.now()}` };
    updatedMenu[category].push(newItem);
    
    setMenuData(updatedMenu);
    setCategories(Object.keys(updatedMenu));
    localStorage.setItem('tt_menu', JSON.stringify(updatedMenu));
    toast.success(`${item.title} added to menu!`, { theme: 'dark' });
  };

  const updateMenuItem = (category, itemId, updatedItem) => {
    const updatedMenu = { ...menuData };
    if (updatedMenu[category]) {
      updatedMenu[category] = [...updatedMenu[category]];
      const index = updatedMenu[category].findIndex(i => i.id === itemId);
      if (index !== -1) {
        updatedMenu[category][index] = { ...updatedMenu[category][index], ...updatedItem };
        setMenuData(updatedMenu);
        localStorage.setItem('tt_menu', JSON.stringify(updatedMenu));
        toast.success(`Item updated successfully!`, { theme: 'dark' });
      }
    }
  };

  const deleteMenuItem = (category, itemId) => {
    const updatedMenu = { ...menuData };
    if (updatedMenu[category]) {
      updatedMenu[category] = updatedMenu[category].filter(i => i.id !== itemId);
      setMenuData(updatedMenu);
      localStorage.setItem('tt_menu', JSON.stringify(updatedMenu));
      toast.info(`Item removed from menu.`, { theme: 'dark' });
    }
  };

  const addReview = (category, itemId, user, rating, text) => {
    const updatedMenu = { ...menuData };
    if (updatedMenu[category]) {
      const index = updatedMenu[category].findIndex(i => i.id === itemId);
      if (index !== -1) {
        const item = updatedMenu[category][index];
        const newReview = { user: user.name, rating, text, date: new Date().toISOString() };
        item.reviews = item.reviews ? [...item.reviews, newReview] : [newReview];
        
        // Calculate new average rating
        const totalRating = item.reviews.reduce((sum, r) => sum + r.rating, 0);
        item.rating = (totalRating / item.reviews.length).toFixed(1);

        setMenuData(updatedMenu);
        localStorage.setItem('tt_menu', JSON.stringify(updatedMenu));
        toast.success(`Review submitted!`, { theme: 'dark' });
      }
    }
  };

  return (
    <MenuContext.Provider value={{ menuData, categories, addMenuItem, updateMenuItem, deleteMenuItem, addReview }}>
      {children}
    </MenuContext.Provider>
  );
};
