import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import StaggeredText from '../components/StaggeredText';
import './Pages.css';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields', { theme: 'dark' });
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! We will get back to you soon.', { theme: 'dark', icon: "✉️" });
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          <StaggeredText text="Contact Us" className="page-title d-block w-100 text-center" />
          <p className="page-subtitle text-light opacity-75 mx-auto" style={{ fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '600px' }}>
            Have a question, feedback, or want to book a large table? We'd love to hear from you. 
            Drop us a message and our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="row g-5">
          {/* Contact Form */}
          <div className="col-12 col-lg-7">
            <motion.div variants={itemVariants} className="feature-card text-start">
              <h3 className="feature-title mb-4">Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="text-light mb-2 fw-bold" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="newsletter-input" 
                    style={{ padding: '10px 15px', fontSize: '0.9rem' }}
                    placeholder="John Doe" 
                  />
                </div>
                <div className="mb-4">
                  <label className="text-light mb-2 fw-bold" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="newsletter-input" 
                    style={{ padding: '10px 15px', fontSize: '0.9rem' }}
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="mb-4">
                  <label className="text-light mb-2 fw-bold" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="newsletter-input" 
                    style={{ padding: '10px 15px', fontSize: '0.9rem', minHeight: '120px', resize: 'none' }}
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-warning newsletter-btn w-100 py-2 mt-2" style={{ fontSize: '0.95rem', fontWeight: '600' }} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="spinner-border spinner-border-sm text-dark" role="status"></div>
                  ) : (
                    <>Send Message <i className="fa-solid fa-paper-plane ms-2"></i></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-lg-5">
            <div className="d-flex flex-column gap-4">
              <motion.div variants={itemVariants} className="feature-card text-start p-4">
                <div className="d-flex align-items-center gap-4">
                  <div className="feature-icon-wrapper m-0 flex-shrink-0" style={{ width: '50px', height: '50px' }}>
                    <i className="fa-solid fa-location-dot feature-icon" style={{ fontSize: '1.4rem' }}></i>
                  </div>
                  <div>
                    <h6 className="text-white mb-1 fw-bold">Our Location</h6>
                    <p className="text-light opacity-75 mb-0" style={{ fontSize: '0.9rem' }}>Tasty Tracks Street, Food City, FC 9021</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="feature-card text-start p-4">
                <div className="d-flex align-items-center gap-4">
                  <div className="feature-icon-wrapper m-0 flex-shrink-0" style={{ width: '50px', height: '50px' }}>
                    <i className="fa-solid fa-phone feature-icon" style={{ fontSize: '1.4rem' }}></i>
                  </div>
                  <div>
                    <h6 className="text-white mb-1 fw-bold">Phone Number</h6>
                    <p className="text-light opacity-75 mb-0" style={{ fontSize: '0.9rem' }}>+1 (555) 123-4567</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="feature-card text-start p-4">
                <div className="d-flex align-items-center gap-4">
                  <div className="feature-icon-wrapper m-0 flex-shrink-0" style={{ width: '50px', height: '50px' }}>
                    <i className="fa-solid fa-clock feature-icon" style={{ fontSize: '1.4rem' }}></i>
                  </div>
                  <div>
                    <h6 className="text-white mb-1 fw-bold">Opening Hours</h6>
                    <p className="text-light opacity-75 mb-0" style={{ fontSize: '0.9rem' }}>Mon - Sat: 10:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
