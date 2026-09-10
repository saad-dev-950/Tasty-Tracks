import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';
import { useOrder } from '../context/OrderContext';
import AdminProductModal from '../components/AdminProductModal';
import StaggeredText from '../components/StaggeredText';
import './Pages.css';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Admin = () => {
  const { currentUser } = useAuth();
  const { menuData, categories, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const { orders, updateOrderStatus } = useOrder();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');

  // Protect route
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== 'admin') {
    return null; 
  }

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product, category) => {
    setEditingProduct({ ...product, category });
    setIsModalOpen(true);
  };

  const handleDelete = (category, productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMenuItem(category, productId);
    }
  };

  const handleSaveProduct = (category, formattedProduct) => {
    if (editingProduct && editingProduct.id) {
      updateMenuItem(category, editingProduct.id, formattedProduct);
      if (category !== editingProduct.category) {
        deleteMenuItem(editingProduct.category, editingProduct.id);
        addMenuItem(category, formattedProduct);
      }
    } else {
      addMenuItem(category, formattedProduct);
    }
    setIsModalOpen(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Preparing': return 'bg-warning text-dark';
      case 'Out for Delivery': return 'bg-info text-dark';
      case 'Delivered': return 'bg-success text-white';
      default: return 'bg-secondary';
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
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
          <div>
            <StaggeredText text="Admin Dashboard" className="page-title mb-1 d-block" />
            <p className="text-light opacity-75 mb-0">Manage Menu & Orders</p>
          </div>
          {activeTab === 'products' && (
            <button className="btn btn-warning fw-bold px-4 py-2 shadow-lg" onClick={handleAddNew}>
              <i className="fa-solid fa-plus me-2"></i> Add New Product
            </button>
          )}
        </div>

        {/* Main Tabs */}
        <div className="d-flex gap-3 mb-4 border-bottom border-secondary pb-3">
          <button 
            className={`btn ${activeTab === 'products' ? 'btn-warning' : 'btn-outline-light'} px-4 rounded-pill fw-bold`}
            onClick={() => setActiveTab('products')}
          >
            <i className="fa-solid fa-burger me-2"></i> Products
          </button>
          <button 
            className={`btn ${activeTab === 'orders' ? 'btn-warning' : 'btn-outline-light'} px-4 rounded-pill fw-bold position-relative`}
            onClick={() => setActiveTab('orders')}
          >
            <i className="fa-solid fa-receipt me-2"></i> Orders
            {orders.filter(o => o.status === 'Preparing').length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {orders.filter(o => o.status === 'Preparing').length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'products' ? (
          <>
            {/* Category Sub-Tabs */}
            <div className="d-flex gap-2 overflow-auto mb-4 pb-2" style={{ whiteSpace: 'nowrap' }}>
              {categories.map((cat, idx) => (
                <button 
                  key={idx}
                  className={`btn ${activeCategory === cat ? 'btn-light text-dark' : 'btn-outline-secondary'} rounded-pill px-4`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Products Table */}
            <div className="table-responsive bg-dark rounded-4 shadow-lg p-3 border border-secondary border-opacity-50">
              <table className="table table-dark table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col" className="text-warning">Image</th>
                    <th scope="col" className="text-warning">Title</th>
                    <th scope="col" className="text-warning">Price</th>
                    <th scope="col" className="text-warning">Rating</th>
                    <th scope="col" className="text-warning text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuData[activeCategory] && menuData[activeCategory].map((product) => (
                    <motion.tr variants={itemVariants} key={product.id}>
                      <td style={{ width: '80px' }}>
                        <div className="rounded overflow-hidden" style={{ width: '50px', height: '50px' }}>
                          <img src={product.image} alt={product.title} className="w-100 h-100 object-fit-cover" />
                        </div>
                      </td>
                      <td>
                        <h6 className="mb-0 fw-bold">{product.title}</h6>
                        <small className="text-light opacity-50 text-truncate d-inline-block" style={{ maxWidth: '250px' }}>
                          {product.description}
                        </small>
                      </td>
                      <td><span className="badge bg-secondary">RS. {product.price}</span></td>
                      <td>⭐ {product.rating}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-info me-2" onClick={() => handleEdit(product, activeCategory)}>
                          <i className="fa-solid fa-pen"></i> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(activeCategory, product.id)}>
                          <i className="fa-solid fa-trash"></i> Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                  
                  {(!menuData[activeCategory] || menuData[activeCategory].length === 0) && (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-light opacity-50">
                        No products found in this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* Orders Section */
          <div className="row g-4">
            {orders.length === 0 ? (
              <div className="col-12 text-center py-5">
                <i className="fa-solid fa-receipt fa-4x text-secondary mb-3"></i>
                <h4 className="text-light">No orders received yet.</h4>
              </div>
            ) : (
              orders.map(order => (
                <div className="col-12 col-lg-6" key={order.id}>
                  <motion.div variants={itemVariants} className="feature-card border border-secondary text-start h-100">
                    <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3">
                      <div>
                        <h5 className="text-warning mb-0 fw-bold">#{order.id}</h5>
                        <small className="text-light opacity-75">{new Date(order.date).toLocaleString()}</small>
                      </div>
                      <div>
                        <span className={`badge ${getStatusBadgeClass(order.status)} fs-6`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h6 className="text-white mb-2">Customer Details:</h6>
                      <p className="mb-1 text-light opacity-75"><i className="fa-solid fa-envelope me-2"></i>{order.userEmail}</p>
                      <p className="mb-1 text-light opacity-75"><i className="fa-solid fa-location-dot me-2"></i>{order.deliveryInfo.address}</p>
                      <p className="mb-1 text-light opacity-75"><i className="fa-solid fa-phone me-2"></i>{order.deliveryInfo.phone}</p>
                    </div>

                    <div className="bg-dark rounded p-3 mb-3">
                      <h6 className="text-white mb-2 border-bottom border-secondary pb-2">Items Summary</h6>
                      {order.items.map(item => (
                        <div key={item.id} className="d-flex justify-content-between small text-light opacity-75 mb-1">
                          <span>{item.quantity}x {item.title}</span>
                          <span>RS. {item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="d-flex justify-content-between mt-3 pt-2 border-top border-secondary fw-bold text-warning">
                        <span>Total (inc. delivery)</span>
                        <span>RS. {order.total + 150}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-top border-secondary d-flex justify-content-end gap-2">
                      <span className="me-auto text-light opacity-50 align-self-center small">Update Status:</span>
                      {order.status === 'Preparing' && (
                        <button className="btn btn-sm btn-info fw-bold" onClick={() => updateOrderStatus(order.id, 'Out for Delivery')}>
                          <i className="fa-solid fa-truck-fast me-1"></i> Send out
                        </button>
                      )}
                      {order.status === 'Out for Delivery' && (
                        <button className="btn btn-sm btn-success fw-bold" onClick={() => updateOrderStatus(order.id, 'Delivered')}>
                          <i className="fa-solid fa-check me-1"></i> Mark Delivered
                        </button>
                      )}
                      {order.status === 'Delivered' && (
                        <span className="text-success fw-bold"><i className="fa-solid fa-check-double me-1"></i> Completed</span>
                      )}
                    </div>
                  </motion.div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <AdminProductModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          product={editingProduct}
          categories={categories}
        />
      )}
    </motion.div>
  );
};

export default Admin;
