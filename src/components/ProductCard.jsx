import React, { useState } from 'react';
import ProductModal from './ProductModal';
import { Tilt } from 'react-tilt';

const defaultTiltOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            15,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.05,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const ProductCard = ({ item, category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rating = item.rating || 4.5;
  const reviewsCount = item.reviews ? item.reviews.length : 0;

  return (
    <>
      <Tilt options={defaultTiltOptions} style={{ height: '100%' }}>
        <div 
          className="card h-100 bg-dark text-white border-secondary position-relative" 
          style={{ cursor: 'pointer', transition: 'box-shadow 0.3s' }}
          onClick={() => setIsModalOpen(true)}
        >
          <div className="img-box position-relative overflow-hidden">
              <img src={item.image} alt={item.title} className="img-fluid rounded-top w-100" style={{ height: '200px', objectFit: 'cover' }} loading="lazy" />
              <div className="position-absolute top-0 end-0 m-2 bg-dark rounded-pill px-2 py-1 shadow" style={{ background: 'rgba(0,0,0,0.7)' }}>
                <span className="text-warning small fw-bold"><i className="fa-solid fa-star"></i> {rating}</span>
              </div>
          </div>
          <h3 className="orngyellow mt-3 mx-2 fs-5">{item.title}</h3>
          <h4 className="text-white mt-2 mx-2 fs-6 text-truncate">{item.description}</h4>
          <div className="d-flex justify-content-between align-items-center px-2 pb-3 mt-auto">
              <h2 className="orngyellow mb-0 fs-4">RS. {item.price}</h2>
              <button 
                className="btn btn-warning rounded-pill px-3" 
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
          </div>
        </div>
      </Tilt>

      <ProductModal  
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={item} 
        category={category} 
      />
    </>
  );
};

export default ProductCard;
