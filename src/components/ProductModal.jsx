import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';
import { playPopSound } from '../utils/audio';

const ProductModal = ({ isOpen, onClose, product, category }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const { addReview } = useMenu();
  
  const [extraCheese, setExtraCheese] = useState(false);
  const [makeSpicy, setMakeSpicy] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const [isFlying, setIsFlying] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    setIsFlying(true);
    playPopSound(); // Play satisfying micro-interaction pop sound
    
    // Wait for the flying animation to finish before actually adding to cart and closing
    setTimeout(() => {
      let finalPrice = product.price;
      let customTitle = product.title;
      
      if (extraCheese) {
        finalPrice += 80;
        customTitle += ' (Extra Cheese)';
      }
      if (makeSpicy) {
        customTitle += ' (Spicy)';
      }

      const uniqueId = `${product.id}_${extraCheese ? 'cheese' : 'no'}_${makeSpicy ? 'spicy' : 'no'}`;

      addToCart({
        id: uniqueId,
        title: customTitle,
        price: finalPrice,
        image: product.image,
        baseId: product.id
      });
      
      // Reset state and close
      setExtraCheese(false);
      setMakeSpicy(false);
      setIsFlying(false);
      onClose();
    }, 800); // 800ms animation duration
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (currentUser) {
      addReview(category, product.id, currentUser, reviewRating, reviewText);
      setReviewText('');
    }
  };

  const productRating = product.rating || 4.5;
  const productReviews = product.reviews || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="modal-backdrop" 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="modal-content-custom"
            style={{ background: 'rgba(15, 15, 15, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '15px', width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', backdropFilter: 'blur(10px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 position-relative">
              <button onClick={onClose} className="btn-close btn-close-white position-absolute" style={{ top: '20px', right: '20px', zIndex: 2 }}></button>
              
              <div className="row g-4">
                <div className="col-12 col-md-5">
                  <img src={product.image} alt={product.title} className="img-fluid rounded shadow w-100" style={{ objectFit: 'cover', height: '100%', maxHeight: '300px' }} />
                </div>
                <div className="col-12 col-md-7 text-start">
                  <h2 className="text-warning fw-bold mb-2">{product.title}</h2>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="text-warning"><i className="fa-solid fa-star"></i> {productRating}</span>
                    <span className="text-muted">({productReviews.length} reviews)</span>
                  </div>
                  <p className="text-light opacity-75">{product.description}</p>
                  
                  {/* Nutritional Info Mock */}
                  <div className="d-flex gap-3 mb-4 mt-3 border-top border-bottom border-secondary py-2">
                    <div className="text-center">
                      <small className="text-muted d-block">Calories</small>
                      <strong className="text-white">450 kcal</strong>
                    </div>
                    <div className="text-center border-start border-secondary ps-3">
                      <small className="text-muted d-block">Allergens</small>
                      <strong className="text-white">Dairy, Gluten</strong>
                    </div>
                  </div>

                  <h5 className="text-white mb-3">Customize</h5>
                  <div className="form-check mb-2">
                    <input className="form-check-input bg-dark border-secondary" type="checkbox" id="extraCheese" checked={extraCheese} onChange={(e) => setExtraCheese(e.target.checked)} />
                    <label className="form-check-label text-light d-flex justify-content-between w-100" htmlFor="extraCheese">
                      <span>Extra Cheese</span>
                      <span className="text-warning">+ RS. 80</span>
                    </label>
                  </div>
                  <div className="form-check mb-4">
                    <input className="form-check-input bg-dark border-secondary" type="checkbox" id="makeSpicy" checked={makeSpicy} onChange={(e) => setMakeSpicy(e.target.checked)} />
                    <label className="form-check-label text-light d-flex justify-content-between w-100" htmlFor="makeSpicy">
                      <span>Make it Spicy 🌶️</span>
                      <span className="text-success">Free</span>
                    </label>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-auto pt-3">
                    <h3 className="text-warning fw-bold mb-0">RS. {product.price + (extraCheese ? 80 : 0)}</h3>
                    <button className="btn btn-warning rounded-pill px-4" onClick={handleAddToCart}>
                      Add to Cart <i className="fa-solid fa-cart-plus ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Professional cleanup: Removed the long review list and feedback form from the Quick View modal */}
            </div>
          </motion.div>

          {/* Flying Cart Animation */}
          {isFlying && (
            <motion.img
              src={product.image}
              initial={{ 
                position: 'fixed', 
                top: '50%', 
                left: '50%', 
                x: '-50%', 
                y: '-50%',
                width: '300px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '15px',
                zIndex: 9999,
                opacity: 1
              }}
              animate={{ 
                top: '20px', 
                left: '90%', // Approximate cart icon position
                width: '30px', 
                height: '30px',
                opacity: 0.5,
                scale: 0.2
              }}
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut" 
              }}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
