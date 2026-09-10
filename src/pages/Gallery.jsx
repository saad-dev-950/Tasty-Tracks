import React from 'react';
import { motion } from 'framer-motion';
import StaggeredText from '../components/StaggeredText';
import './Pages.css';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// We will use existing assets from the project
const galleryImages = [
  '/Assets/Images/hero3.webp',
  '/Assets/Images/hero2.webp',
  '/Assets/Images/Pizza 1.webp',
  '/Assets/Images/Burger 1.webp',
  '/Assets/Images/hero4.webp',
  '/Assets/Images/d2.webp',
  '/Assets/Images/Fries 1.webp',
  '/Assets/Images/hero1.webp',
  '/Assets/Images/Quick Bite 4.webp'
];

const Gallery = () => {
  return (
    <motion.div 
      className="page-wrapper"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container">
        <div className="text-center mb-5">
          <StaggeredText text="Our Gallery" className="page-title d-block w-100 text-center" />
          <p className="page-subtitle">
            Take a visual journey through our mouth-watering menu. Every dish is prepared with 
            passion, using only the freshest ingredients to guarantee a premium dining experience.
          </p>
        </div>

        <div className="row g-4">
          {galleryImages.map((src, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <motion.div 
                variants={itemVariants} 
                className="gallery-item zoom-image-container rounded-4 shadow-lg position-relative"
                style={{ height: '300px' }}
              >
                <img 
                  src={src} 
                  alt={`Gallery item ${index + 1}`} 
                  className="w-100 h-100 object-fit-cover"
                  loading="lazy"
                />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                     style={{ background: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.3s ease' }}
                     onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                     onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <i className="fa-solid fa-magnifying-glass text-warning fs-1 drop-shadow"></i>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;
