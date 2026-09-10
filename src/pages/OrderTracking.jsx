import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useMenu } from '../context/MenuContext';
import { Link, Navigate } from 'react-router-dom';
import './Pages.css';

const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Preparing': return 'text-warning';
    case 'Out for Delivery': return 'text-info';
    case 'Delivered': return 'text-success';
    default: return 'text-secondary';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Preparing': return 'fa-fire-burner';
    case 'Out for Delivery': return 'fa-truck-fast';
    case 'Delivered': return 'fa-check-circle';
    default: return 'fa-clock';
  }
};

const OrderTracking = () => {
  const { currentUser } = useAuth();
  const { getUserOrders } = useOrder();
  const { menuData, addReview } = useMenu();

  const [reviewingItem, setReviewingItem] = React.useState(null);
  const [reviewRating, setReviewRating] = React.useState(5);
  const [reviewText, setReviewText] = React.useState('');

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const myOrders = getUserOrders(currentUser.email);

  const findCategory = (baseId) => {
    for (const [cat, items] of Object.entries(menuData)) {
      if (items.some(i => i.id === baseId)) return cat;
    }
    return null;
  };

  const handleReviewClick = (item) => {
    const cat = findCategory(item.baseId);
    if (cat) {
      setReviewingItem({ item, category: cat });
      setReviewRating(5);
      setReviewText('');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewingItem && currentUser) {
      addReview(reviewingItem.category, reviewingItem.item.baseId, currentUser, reviewRating, reviewText);
      setReviewingItem(null);
    }
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
        <h1 className="page-title text-center mb-5">My Orders</h1>
        
        {myOrders.length === 0 ? (
          <div className="text-center mt-5">
            <i className="fa-solid fa-box-open fa-4x text-muted mb-4"></i>
            <h3 className="text-white">You have no orders yet.</h3>
            <Link to="/" className="btn btn-warning mt-4">Browse Menu</Link>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {myOrders.map(order => (
              <div className="col-12 col-lg-8" key={order.id}>
                <motion.div variants={itemVariants} className="feature-card text-start position-relative">
                  <div className="d-flex flex-column flex-md-row justify-content-between border-bottom border-secondary pb-3 mb-4">
                    <div>
                      <h4 className="text-white mb-1">Order #{order.id}</h4>
                      <small className="text-light opacity-75">{new Date(order.date).toLocaleString()}</small>
                    </div>
                    <div className="text-md-end mt-3 mt-md-0">
                      <h5 className={`mb-1 fw-bold d-flex align-items-center gap-2 ${getStatusColor(order.status)}`}>
                        <i className={`fa-solid ${getStatusIcon(order.status)}`}></i> {order.status}
                      </h5>
                    </div>
                  </div>

                  {/* Order Progress Bar */}
                  <div className="position-relative mb-5 px-3">
                    <div className="progress" style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <motion.div 
                        className="progress-bar bg-warning" 
                        initial={{ width: 0 }}
                        animate={{ width: order.status === 'Preparing' ? '33%' : order.status === 'Out for Delivery' ? '66%' : '100%' }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      ></motion.div>
                    </div>
                    <div className="d-flex justify-content-between position-absolute w-100" style={{ top: '-10px', left: 0 }}>
                      <div className={`rounded-circle d-flex align-items-center justify-content-center ${order.status !== 'Unknown' ? 'bg-warning text-dark' : 'bg-secondary text-white'}`} style={{ width: '24px', height: '24px' }}><i className="fa-solid fa-fire-burner fs-6"></i></div>
                      <div className={`rounded-circle d-flex align-items-center justify-content-center ${order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'bg-warning text-dark' : 'bg-secondary text-white'}`} style={{ width: '24px', height: '24px' }}><i className="fa-solid fa-truck-fast fs-6"></i></div>
                      <div className={`rounded-circle d-flex align-items-center justify-content-center ${order.status === 'Delivered' ? 'bg-success text-white' : 'bg-secondary text-white'}`} style={{ width: '24px', height: '24px' }}><i className="fa-solid fa-check fs-6"></i></div>
                    </div>
                  </div>

                  <div className="bg-dark rounded p-3 mb-3 border border-secondary">
                    <h6 className="text-warning mb-3">Items Summary</h6>
                    {order.items.map(item => (
                      <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <span className="text-light opacity-75">{item.quantity}x {item.title}</span>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-white">RS. {item.price * item.quantity}</span>
                          {order.status === 'Delivered' && (
                            <button 
                              className="btn btn-sm btn-outline-warning rounded-pill px-3" 
                              onClick={() => handleReviewClick(item)}
                            >
                              <i className="fa-solid fa-star me-1"></i> Review
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-secondary text-light me-2">{order.deliveryInfo.paymentMethod.toUpperCase()}</span>
                    </div>
                    <h4 className="text-warning fw-bold mb-0">Total: RS. {order.total + 150}</h4>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewingItem && (
        <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setReviewingItem(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="modal-content-custom bg-dark p-4 rounded border border-secondary"
            style={{ width: '90%', maxWidth: '500px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="text-warning mb-0">Review {reviewingItem.item.title}</h4>
              <button onClick={() => setReviewingItem(null)} className="btn-close btn-close-white"></button>
            </div>
            
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-3">
                <label className="text-light mb-2">Rating (1-5)</label>
                <div className="d-flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i 
                      key={star}
                      className={`fa-solid fa-star fs-4 ${star <= reviewRating ? 'text-warning' : 'text-secondary'}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setReviewRating(star)}
                    ></i>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="text-light mb-2">Your Feedback</label>
                <textarea 
                  className="form-control bg-transparent text-white border-secondary" 
                  rows="3" 
                  value={reviewText} 
                  onChange={(e) => setReviewText(e.target.value)} 
                  required 
                  placeholder="Tell us what you liked..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-warning w-100 fw-bold rounded-pill">Submit Review</button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default OrderTracking;
