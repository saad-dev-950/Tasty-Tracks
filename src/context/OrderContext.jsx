import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('tt_orders')) || [];
    setOrders(storedOrders);
  }, []);

  const placeOrder = (user, cartItems, total, deliveryInfo) => {
    const newOrder = {
      id: `ORD_${Math.floor(Math.random() * 1000000)}`,
      userEmail: user ? user.email : 'guest',
      items: cartItems,
      total,
      deliveryInfo,
      status: 'Preparing', // Preparing -> Out for Delivery -> Delivered
      date: new Date().toISOString()
    };
    
    const newOrders = [newOrder, ...orders];
    setOrders(newOrders);
    localStorage.setItem('tt_orders', JSON.stringify(newOrders));
    
    // Trigger custom event for admin real-time alert
    window.dispatchEvent(new Event('new_order_placed'));

    toast.success(`Order placed successfully! ID: ${newOrder.id}`, { theme: 'dark' });
    return newOrder.id;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updatedOrders);
    localStorage.setItem('tt_orders', JSON.stringify(updatedOrders));
    toast.info(`Order ${orderId} marked as ${newStatus}`, { theme: 'dark' });
  };

  const getUserOrders = (email) => {
    return orders.filter(o => o.userEmail === email);
  };

  const getOrderById = (orderId) => {
    return orders.find(o => o.id === orderId);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, getUserOrders, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};
