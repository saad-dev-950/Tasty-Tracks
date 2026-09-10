import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';
import { playSuccessSound } from '../utils/audio';
import StaggeredText from '../components/StaggeredText';
import './Pages.css';

const slideLeftVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideRightVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.15 } }
};

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: currentUser ? currentUser.name : '',
    phone: '',
    address: '',
    paymentMethod: 'cash'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!', { theme: 'dark' });
      return;
    }

    setIsProcessing(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = placeOrder(currentUser, cartItems, getCartTotal(), deliveryInfo);
    clearCart();
    
    // Trigger Micro-interactions
    playSuccessSound();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fadb14', '#ffffff', '#222222']
    });

    setIsProcessing(false);
    
    // Short delay to let user enjoy confetti before navigating
    setTimeout(() => {
      navigate(`/tracking`);
    }, 1500);
  };

  const getInputBorder = (inputName) => {
    return focusedInput === inputName ? 'border-warning' : 'border-secondary';
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-wrapper d-flex align-items-center justify-content-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <i className="fa-solid fa-basket-shopping fa-4x text-warning mb-4"></i>
          <h2 className="text-white">Your Cart is Empty</h2>
          <button className="btn btn-warning fw-bold px-5 py-3 mt-3 rounded-pill shadow" onClick={() => navigate('/')}>
            Browse Menu
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
    >
      <div className="container">
        <div className="text-center mb-4">
          <StaggeredText text="Secure Checkout" className="page-title mb-1" />
          <p className="page-subtitle mb-0" style={{ fontSize: '1.05rem' }}>Almost there! We just need your delivery details.</p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Checkout Form */}
          <motion.div className="col-12 col-lg-7" variants={slideLeftVariants} initial="initial" animate="animate">
            <div className="feature-card text-start h-100 d-flex flex-column" style={{ padding: '20px' }}>
              <h5 className="feature-title mb-3 border-bottom border-secondary pb-2">Delivery Details</h5>
              <form onSubmit={handlePlaceOrder} className="d-flex flex-column flex-grow-1">
                
                <div className="row g-2 mb-2">
                  <div className="col-md-6">
                    <label className="text-light opacity-75 mb-1 small text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>
                      <i className="fa-regular fa-user me-1 text-warning"></i>Full Name
                    </label>
                    <input 
                      type="text" 
                      className={`form-control bg-dark text-white shadow-none transition-all duration-300 ${getInputBorder('name')}`} 
                      style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '0.9rem' }}
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, name: e.target.value})}
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput(null)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="text-light opacity-75 mb-1 small text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>
                      <i className="fa-solid fa-phone me-1 text-warning"></i>Phone Number
                    </label>
                    <input 
                      type="tel" 
                      className={`form-control bg-dark text-white shadow-none transition-all duration-300 ${getInputBorder('phone')}`} 
                      style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '0.9rem' }}
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                      onFocus={() => setFocusedInput('phone')}
                      onBlur={() => setFocusedInput(null)}
                      placeholder="03XX-XXXXXXX"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="text-light opacity-75 mb-1 small text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>
                    <i className="fa-solid fa-location-dot me-1 text-warning"></i>Complete Address
                  </label>
                  <textarea 
                    className={`form-control bg-dark text-white shadow-none transition-all duration-300 ${getInputBorder('address')}`} 
                    style={{ padding: '8px 12px', minHeight: '60px', resize: 'none', borderRadius: '6px', fontSize: '0.9rem' }}
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                    onFocus={() => setFocusedInput('address')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="House/Apt, Street, Area, City"
                    required
                  ></textarea>
                </div>

                <div className="mt-auto pt-2">
                  <h6 className="text-white mb-2">Payment Method</h6>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="px-2 py-1 border border-warning rounded-3 mb-3 d-flex align-items-center justify-content-between shadow-sm" 
                    style={{ background: 'rgba(250, 219, 20, 0.1)', cursor: 'pointer' }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
                        <i className="fa-solid fa-money-bill-wave" style={{ fontSize: '0.7rem' }}></i>
                      </div>
                      <span className="text-white fw-bold" style={{ fontSize: '0.9rem' }}>Cash on Delivery</span>
                    </div>
                    <i className="fa-solid fa-circle-check text-warning" style={{ fontSize: '1.1rem' }}></i>
                  </motion.div>

                  <motion.button 
                    type="submit" 
                    className="btn btn-warning w-100 py-1 fw-bold rounded-pill text-dark shadow-sm border-0" 
                    style={{ fontSize: '0.95rem' }}
                    disabled={isProcessing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ 
                      boxShadow: ["0px 0px 0px rgba(250,219,20,0)", "0px 0px 10px rgba(250,219,20,0.4)", "0px 0px 0px rgba(250,219,20,0)"] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isProcessing ? (
                      <div className="d-flex align-items-center justify-content-center gap-2 py-1">
                        <div className="spinner-border spinner-border-sm" role="status"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center gap-2 py-1">
                        <span>Place Order (RS. {getCartTotal() + 150})</span>
                        <i className="fa-solid fa-arrow-right small"></i>
                      </div>
                    )}
                  </motion.button>
                </div>
                
              </form>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div className="col-12 col-lg-5" variants={slideRightVariants} initial="initial" animate="animate">
            <div className="feature-card text-start h-100 d-flex flex-column position-relative overflow-hidden" style={{ padding: '30px 25px' }}>
              {/* Receipt edge decoration */}
              <div className="position-absolute top-0 start-0 w-100" style={{ height: '8px', background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAOklEQVQYV2NkYGAwYcSPQPqfEUwji8EUsCqGq8KrmCwwqhhSBDKBEU3vP7J+BgwMDIYMjCgKccmQAAAfIRUhy4K+JQAAAABJRU5ErkJggg==) repeat-x' }}></div>
              
              <h4 className="feature-title mb-3 mt-1 border-bottom border-secondary pb-2">Order Summary</h4>
              
              <div className="d-flex flex-column gap-2 mb-3 overflow-auto flex-grow-1 pe-1" style={{ maxHeight: '350px' }}>
                {cartItems.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    className="d-flex justify-content-between align-items-center p-2 rounded bg-dark border border-secondary"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded overflow-hidden bg-black" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                        <img src={item.image} alt={item.title} className="w-100 h-100 object-fit-cover" />
                      </div>
                      <div>
                        <h6 className="text-white mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>{item.title}</h6>
                        <span className="badge bg-secondary text-light opacity-75" style={{ fontSize: '0.7rem' }}>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-end ms-2">
                      <span className="text-warning fw-bold d-block" style={{ fontSize: '0.9rem' }}>RS. {item.price * item.quantity}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-auto pt-3 border-top border-secondary border-2 border-dashed">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-light opacity-75 small">Subtotal</span>
                  <span className="text-white fw-bold small">RS. {getCartTotal()}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-light opacity-75 small">Delivery Fee</span>
                  <span className="text-success fw-bold small">+ RS. 150</span>
                </div>
                <div className="d-flex justify-content-between align-items-center p-2 px-3 bg-warning rounded mt-2 shadow-sm">
                  <h6 className="text-dark mb-0 fw-bold">Total Amount</h6>
                  <h5 className="text-dark fw-bolder mb-0">RS. {getCartTotal() + 150}</h5>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
