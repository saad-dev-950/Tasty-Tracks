import React from 'react';
import { motion } from 'framer-motion';
import StaggeredText from '../components/StaggeredText';
import './Pages.css';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const About = () => {
  return (
    <motion.div 
      className="page-wrapper"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container">
        <div className="text-center">
          <StaggeredText text="Our Story" className="page-title d-block w-100 text-center" />
          <p className="page-subtitle">
            Welcome to Tasty Tracks! We are passionate about serving the most delicious fast food, 
            crafted with the finest ingredients and a whole lot of love. From our juicy signature burgers 
            to our loaded pizzas and crispy fries, every item on our menu is designed to take your 
            taste buds on an unforgettable journey.
          </p>
        </div>

        <div className="row g-4 mt-5">
          {/* Value 1 */}
          <div className="col-12 col-md-4">
            <motion.div variants={itemVariants} className="feature-card">
              <div className="feature-icon-wrapper">
                <i className="fa-solid fa-medal feature-icon"></i>
              </div>
              <h3 className="feature-title">Premium Quality</h3>
              <p className="feature-text">
                We never compromise on quality. Every burger and pizza is made using 100% fresh, locally sourced ingredients to ensure the perfect bite every single time.
              </p>
            </motion.div>
          </div>

          {/* Value 2 */}
          <div className="col-12 col-md-4">
            <motion.div variants={itemVariants} className="feature-card">
              <div className="feature-icon-wrapper">
                <i className="fa-solid fa-fire-burner feature-icon"></i>
              </div>
              <h3 className="feature-title">Secret Recipes</h3>
              <p className="feature-text">
                Our signature sauces and spice blends have been perfected over years of experimentation, giving our food that unique, unforgettable Tasty Tracks flavor.
              </p>
            </motion.div>
          </div>

          {/* Value 3 */}
          <div className="col-12 col-md-4">
            <motion.div variants={itemVariants} className="feature-card">
              <div className="feature-icon-wrapper">
                <i className="fa-solid fa-people-group feature-icon"></i>
              </div>
              <h3 className="feature-title">Community First</h3>
              <p className="feature-text">
                Our mission is simple: to bring people together over great food. We strive to create a warm, welcoming environment for families and friends to make memories.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
