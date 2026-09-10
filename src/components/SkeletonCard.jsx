import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="card h-100 bg-dark border-secondary skeleton-wrapper">
      <div className="skeleton-img-box w-100" style={{ height: '200px' }}></div>
      <div className="card-body d-flex flex-column p-3">
        <div className="skeleton-title mb-3" style={{ height: '24px', width: '70%', borderRadius: '4px' }}></div>
        <div className="skeleton-text mb-2" style={{ height: '16px', width: '100%', borderRadius: '4px' }}></div>
        <div className="skeleton-text mb-4" style={{ height: '16px', width: '80%', borderRadius: '4px' }}></div>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="skeleton-price" style={{ height: '28px', width: '30%', borderRadius: '4px' }}></div>
          <div className="skeleton-btn" style={{ height: '38px', width: '40px', borderRadius: '50%' }}></div>
        </div>
      </div>
      
      <style>{`
        .skeleton-wrapper .skeleton-img-box,
        .skeleton-wrapper .skeleton-title,
        .skeleton-wrapper .skeleton-text,
        .skeleton-wrapper .skeleton-price,
        .skeleton-wrapper .skeleton-btn {
          background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
          background-size: 200% 100%;
          animation: skeletonLoading 1.5s infinite linear;
        }

        @keyframes skeletonLoading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default SkeletonCard;
