import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
      >
        <h1 className="text-warning fw-bold" style={{ fontSize: '8rem', textShadow: '0px 10px 20px rgba(250, 219, 20, 0.3)' }}>
          404
        </h1>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-4"
      >
        <i className="fa-solid fa-pizza-slice text-secondary" style={{ fontSize: '4rem', opacity: 0.5 }}></i>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-white mb-3">Oops! This page got eaten...</h2>
        <p className="text-light opacity-75 mb-5" style={{ maxWidth: '500px', fontSize: '1.1rem', margin: '0 auto' }}>
          We can't seem to find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link to="/" className="btn btn-warning rounded-pill px-5 py-3 fw-bold shadow-lg" style={{ fontSize: '1.1rem' }}>
          <i className="fa-solid fa-arrow-left me-2"></i> Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
