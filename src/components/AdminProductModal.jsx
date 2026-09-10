import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProductModal = ({ isOpen, onClose, onSave, product, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: categories[0] || 'Burgers',
    tags: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price ? String(product.price).replace(/[^0-9.]/g, '') : '',
        image: product.image || '',
        category: product.category || categories[0] || 'Burgers',
        tags: product.tags ? (Array.isArray(product.tags) ? product.tags.join(', ') : product.tags) : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        image: '',
        category: categories[0] || 'Burgers',
        tags: ''
      });
    }
  }, [product, isOpen, categories]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    const formattedProduct = {
      ...product, // keep id if editing
      title: formData.title,
      description: formData.description,
      price: Number(formData.price), // Clean numerical price matching original data
      image: formData.image,
      tags: tagsArray,
      rating: product ? product.rating : '0.0'
    };

    onSave(formData.category, formattedProduct);
  };

  return (
    <AnimatePresence>
      <div 
        className="modal-backdrop" 
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-content bg-dark text-light rounded-4 shadow-lg overflow-hidden position-relative d-flex flex-column border border-secondary"
          style={{ width: '90%', maxWidth: '650px', maxHeight: '85vh' }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fixed Header */}
          <div className="p-3 px-4 border-bottom border-secondary d-flex justify-content-between align-items-center" style={{ flexShrink: 0 }}>
            <h5 className="mb-0 text-warning fw-bold">{product ? 'Edit Product' : 'Add New Product'}</h5>
            <button className="btn btn-dark text-light border-0 p-1" onClick={onClose}><i className="fa-solid fa-xmark fs-5"></i></button>
          </div>
          
          {/* Scrollable Form Body & Fixed Footer via Form wrap */}
          <form onSubmit={handleSubmit} className="d-flex flex-column flex-grow-1 overflow-hidden" style={{ minHeight: 0 }}>
            <div className="p-4 overflow-auto flex-grow-1">
              <div className="mb-3">
                <label className="form-label text-light opacity-75 small text-uppercase fw-bold">Product Title</label>
                <input type="text" name="title" className="form-control bg-dark text-white border-secondary" value={formData.title} onChange={handleChange} required />
              </div>
              
              <div className="mb-3">
                <label className="form-label text-light opacity-75 small text-uppercase fw-bold">Description</label>
                <textarea name="description" className="form-control bg-dark text-white border-secondary" value={formData.description} onChange={handleChange} rows="2" required></textarea>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label text-light opacity-75 small text-uppercase fw-bold">Price (PKR)</label>
                  <input type="number" name="price" className="form-control bg-dark text-white border-secondary" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-light opacity-75 small text-uppercase fw-bold">Category</label>
                  <select name="category" className="form-select bg-dark text-white border-secondary" value={formData.category} onChange={handleChange}>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat.replace('-', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-light opacity-75 small text-uppercase fw-bold d-flex justify-content-between">
                  <span>Online Image URL / Local Path</span>
                  <span className="text-warning small text-lowercase"><i className="fa-solid fa-globe me-1"></i>Supports any web image URL!</span>
                </label>
                <div className="d-flex gap-3 align-items-center">
                  <input 
                    type="text" 
                    name="image" 
                    className="form-control bg-dark text-white border-secondary flex-grow-1" 
                    value={formData.image} 
                    onChange={handleChange} 
                    placeholder="https://images.unsplash.com/photo-... or /Assets/Images/..." 
                    required 
                  />
                  {/* Live Image URL Preview */}
                  <div 
                    className="border border-secondary rounded flex-shrink-0 d-flex align-items-center justify-content-center bg-black overflow-hidden" 
                    style={{ width: '55px', height: '55px' }}
                    title="Live Image Preview"
                  >
                    {formData.image ? (
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-100 h-100 object-fit-cover" 
                        onError={(e) => { e.target.style.display = 'none'; }}
                        onLoad={(e) => { e.target.style.display = 'block'; }}
                      />
                    ) : (
                      <i className="fa-regular fa-image text-secondary fs-5"></i>
                    )}
                  </div>
                </div>
                <small className="text-muted d-block mt-1 style-small">
                  Tip: Copy & paste any image link from Google, Unsplash, or anywhere online.
                </small>
              </div>

              <div className="mb-2">
                <label className="form-label text-light opacity-75 small text-uppercase fw-bold">Tags (Comma separated)</label>
                <input type="text" name="tags" className="form-control bg-dark text-white border-secondary" value={formData.tags} onChange={handleChange} placeholder="Best Seller, Spicy, Cheesy" />
              </div>
            </div>
            
            {/* Fixed Footer (Always visible) */}
            <div className="p-3 px-4 border-top border-secondary d-flex gap-3 justify-content-end bg-dark" style={{ flexShrink: 0 }}>
              <button type="button" className="btn btn-outline-light px-4 rounded-pill" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-warning fw-bold px-4 rounded-pill shadow-sm">
                {product ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminProductModal;
