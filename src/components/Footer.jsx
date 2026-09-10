import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      if (day >= 1 && day <= 6 && hour >= 10 && hour < 23) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      toast.error('Please enter a valid email.', { theme: "dark" });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Successfully subscribed to our newsletter!', { 
      theme: "dark",
      icon: "🚀"
    });
    setEmail('');
    setIsLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-overlay">
        <div className="container">
          <motion.div 
            className="row g-5 justify-content-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Column 1: Brand & Mission */}
            <motion.div className="col-12 col-md-4" variants={itemVariants}>
              <h2 className="footer-title d-flex align-items-center gap-2">
                <i className="fa-solid fa-burger fs-3"></i> Tasty Tracks
              </h2>
              <p className="text-light opacity-75 mb-4" style={{ lineHeight: '1.8', fontSize: '0.9rem' }}>
                We are passionate about serving the most delicious fast food, crafted with the finest ingredients and a whole lot of love. Your ultimate destination for flavor.
              </p>
              <div className="social-icons-wrapper">
                <a href="#" className="social-icon facebook"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="social-icon instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="social-icon twitter"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="social-icon tiktok"><i className="fa-brands fa-tiktok"></i></a>
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div className="col-12 col-md-4" variants={itemVariants}>
              <h3 className="footer-title">Quick Links</h3>
              <div className="d-flex flex-column gap-3">
                <a href="/#Deals" className="footer-link">Special Deals</a>
                <a href="/#Burger" className="footer-link">Signature Burgers</a>
                <Link to="/gallery" className="footer-link">Our Gallery</Link>
                <Link to="/about" className="footer-link">About Us</Link>
                <Link to="/contact" className="footer-link">Contact Us</Link>
              </div>
            </motion.div>

            {/* Column 3: Contact Info */}
            <motion.div className="col-12 col-md-4" variants={itemVariants}>
              <h3 className="footer-title">Visit Us</h3>
              <div className="contact-item">
                <i className="fa-solid fa-location-dot"></i>
                <span>Tasty Tracks Street, Food City, FC 9021</span>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-clock"></i>
                <div className="d-flex flex-column">
                  <span>Mon - Sat: 10:00 AM - 11:00 PM</span>
                  <span className="mt-1 fw-bold" style={{ fontSize: '0.9rem' }}>
                    {isOpen ? (
                      <span className="text-success"><i className="fa-solid fa-circle text-success me-1" style={{ fontSize: '0.6rem' }}></i> We are currently OPEN</span>
                    ) : (
                      <span className="text-danger"><i className="fa-solid fa-circle text-danger me-1" style={{ fontSize: '0.6rem' }}></i> Closed right now</span>
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <motion.div 
            className="row"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="col-12">
              <div className="copyright-section">
                &copy; {new Date().getFullYear()} Tasty Tracks. Designed by SJ. All Rights Reserved.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
