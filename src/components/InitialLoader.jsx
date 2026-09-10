import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const InitialLoader = () => {
  const location = useLocation();
  const validRoutes = ['/', '/about', '/contact', '/gallery', '/login', '/signup', '/checkout', '/tracking', '/admin'];
  
  // Only show loader if we are on a valid, known route (not a 404 page)
  const [isLoading, setIsLoading] = useState(() => validRoutes.includes(location.pathname));

  useEffect(() => {
    // Hide loader after 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0a0a0a',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <i className="fa-solid fa-burger text-warning" style={{ fontSize: '5rem', marginBottom: '20px' }}></i>
            <h1 className="text-white fw-bold mb-4" style={{ letterSpacing: '2px' }}>
              TASTY <span className="text-warning">TRACKS</span>
            </h1>
            
            {/* Custom Spinner */}
            <div className="spinner-container" style={{ position: 'relative', width: '50px', height: '50px', margin: '0 auto' }}>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  border: '3px solid rgba(250, 219, 20, 0.2)',
                  borderTopColor: '#fadb14',
                  borderRadius: '50%'
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
