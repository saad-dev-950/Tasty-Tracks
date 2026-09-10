import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { cartItems, getCartCount, getCartTotal, removeFromCart } = useCart();
  const { currentUser, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header>
        <motion.div
          style={{
            scaleX,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#fadb14',
            transformOrigin: '0%',
            zIndex: 1060,
          }}
        />
        <nav className={`navbar navbar-expand-lg navbar-dark fixed-top transition-nav ${scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}`}>
          <div className="container">
            <h3>
              <Link 
                className="navbar-brand text-warning fw-bold d-flex align-items-center gap-2" 
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <i className="fa-solid fa-burger"></i> Tasty Tracks
              </Link>
            </h3>
            
            <div className="d-flex align-items-center gap-3 ms-auto order-lg-last">
                <button className="btn btn-outline-warning rounded-pill d-flex align-items-center gap-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="badge bg-warning text-dark rounded-circle">{getCartCount()}</span>
                </button>
                
                {/* User Dropdown */}
                <div className="dropdown d-none d-lg-block">
                  <button className="btn btn-warning rounded-pill d-flex align-items-center gap-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-user"></i> {currentUser ? currentUser.name : 'Account'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                    {currentUser ? (
                      <>
                        {currentUser.role === 'admin' ? (
                          <li><Link className="dropdown-item" to="/admin"><i className="fa-solid fa-chart-line me-2"></i> Admin Dashboard</Link></li>
                        ) : (
                          <li><Link className="dropdown-item" to="/tracking"><i className="fa-solid fa-box-open me-2"></i> My Orders</Link></li>
                        )}
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="fa-solid fa-sign-out-alt me-2"></i> Logout</button></li>
                      </>
                    ) : (
                      <>
                        <li><Link className="dropdown-item" to="/login"><i className="fa-solid fa-sign-in-alt me-2"></i> Login</Link></li>
                        <li><Link className="dropdown-item" to="/signup"><i className="fa-solid fa-user-plus me-2"></i> Sign Up</Link></li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Custom Animated Hamburger */}
                <button 
                  className={`hamburger-btn d-lg-none ${isMobileMenuOpen ? 'open' : ''}`} 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle navigation"
                >
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                </button>
            </div>

            <div className="collapse navbar-collapse d-none d-lg-block">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to="/gallery">Gallery</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to="/about">About Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to="/contact">Contact Us</Link>
                    </li>
                </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Professional Animated Dropdown Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu-dropdown d-lg-none"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="mobile-menu-content">
              <Link className="mobile-link" to="/" onClick={closeMobileMenu}>Home</Link>
              <Link className="mobile-link" to="/gallery" onClick={closeMobileMenu}>Gallery</Link>
              <Link className="mobile-link" to="/about" onClick={closeMobileMenu}>About Us</Link>
              <Link className="mobile-link" to="/contact" onClick={closeMobileMenu}>Contact Us</Link>
              <hr className="border-secondary my-1 w-50 mx-auto" />
              {currentUser ? (
                <>
                  {currentUser.role === 'admin' ? (
                    <Link className="mobile-link text-info" to="/admin" onClick={closeMobileMenu}>Admin Dashboard</Link>
                  ) : (
                    <Link className="mobile-link text-warning" to="/tracking" onClick={closeMobileMenu}>My Orders</Link>
                  )}
                  <button className="btn btn-link mobile-link text-danger text-decoration-none" onClick={() => { handleLogout(); closeMobileMenu(); }}>Logout</button>
                </>
              ) : (
                <>
                  <Link className="mobile-link text-warning" to="/login" onClick={closeMobileMenu}>Login</Link>
                  <Link className="mobile-link text-warning" to="/signup" onClick={closeMobileMenu}>Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Offcanvas */}
      <div className="offcanvas offcanvas-end bg-dark text-white" tabIndex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
        <div className="offcanvas-header border-bottom border-secondary">
          <h5 className="offcanvas-title text-warning fw-bold" id="cartOffcanvasLabel">
            <i className="fa-solid fa-cart-shopping me-2"></i> Your Cart
          </h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          {cartItems.length === 0 ? (
            <div className="text-center text-muted my-auto">
              <i className="fa-solid fa-basket-shopping fa-3x mb-3"></i>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <>
              <div className="cart-items flex-grow-1 overflow-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-secondary">
                    <div>
                      <h6 className="mb-0 text-white">{item.title}</h6>
                      <small className="text-muted">{item.quantity} x RS. {item.price}</small>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="text-warning fw-bold">RS. {item.price * item.quantity}</span>
                      <button onClick={() => removeFromCart(item.id)} className="btn btn-sm btn-outline-danger border-0">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-footer mt-4 pt-3 border-top border-secondary">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 text-white">Total:</h5>
                  <h4 className="mb-0 text-warning fw-bold">RS. {getCartTotal()}</h4>
                </div>
                <button 
                  className="btn btn-warning w-100 fw-bold rounded-pill" 
                  data-bs-dismiss="offcanvas" 
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
