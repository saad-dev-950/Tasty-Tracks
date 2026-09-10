import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroCarousel from '../components/HeroCarousel';
import CategoryNav from '../components/CategoryNav';
import MenuSection from '../components/MenuSection';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { useMenu } from '../context/MenuContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const Home = () => {
  const { menuData } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter menu data based on search
  const filteredMenuData = Object.keys(menuData).reduce((acc, category) => {
    const filteredItems = menuData[category].filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredItems.length > 0) {
      acc[category] = filteredItems;
    }
    return acc;
  }, {});

  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <HeroCarousel />
      <CategoryNav />

      {/* Live Search Bar */}
      <div className="container mt-5 mb-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="position-relative">
              <input 
                type="text" 
                className="form-control bg-dark text-white border-warning py-3 ps-4 pe-5 rounded-pill shadow-lg"
                placeholder="Search for Burgers, Pizzas, Deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '1.1rem' }}
              />
              <i className="fa-solid fa-search position-absolute text-warning fs-4" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)' }}></i>
            </div>
          </div>
        </div>
      </div>

      {Object.entries(filteredMenuData).map(([category, items]) => (
        <MenuSection key={category} id={category} title={category.replace('-', ' ')}>
          {isLoading 
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div className="col-12 col-md-6 col-lg-4" key={`skeleton-${idx}`}>
                  <SkeletonCard />
                </div>
              ))
            : items.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                  <ProductCard item={item} category={category} />
                </div>
              ))
          }
        </MenuSection>
      ))}
    </motion.main>
  );
};

export default Home;
