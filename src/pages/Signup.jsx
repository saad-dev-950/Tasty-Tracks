import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
};

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signup(name, email, password)) {
      navigate('/');
    }
  };

  return (
    <motion.div 
      className="page-wrapper d-flex align-items-center justify-content-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="feature-card text-start p-5">
          <div className="text-center mb-4">
            <h2 className="text-white fw-bold mb-2">Create Account</h2>
            <p className="text-light opacity-75">Join Tasty Tracks for a premium experience.</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-light opacity-75 mb-2">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="newsletter-input" 
                style={{ padding: '12px 20px' }}
                placeholder="John Doe" 
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-light opacity-75 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input" 
                style={{ padding: '12px 20px' }}
                placeholder="john@example.com" 
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-light opacity-75 mb-2">Password</label>
              <div className="position-relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="newsletter-input w-100" 
                  style={{ padding: '12px 20px', paddingRight: '45px' }}
                  placeholder="••••••••" 
                  required
                  minLength="6"
                />
                <i 
                  className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute`}
                  style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#fadb14', opacity: 0.8 }}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>
            <button type="submit" className="btn btn-warning newsletter-btn w-100 py-3 mt-2">
              Create Account <i className="fa-solid fa-user-plus ms-2"></i>
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-light opacity-75 mb-0">
              Already have an account? <Link to="/login" className="text-warning text-decoration-none fw-bold">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
