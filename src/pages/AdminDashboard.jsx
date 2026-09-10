import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useMenu } from '../context/MenuContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Pages.css';

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 }
};

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { orders, updateOrderStatus } = useOrder();
  const { menuData, categories, addMenuItem, updateMenuItem } = useMenu();
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    const handleNewOrder = () => {
      // Play a short chime sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(e => console.log('Audio play blocked by browser.'));
      
      toast.info('🔔 New Order Received!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        style: { border: '1px solid #ffc107', background: '#212529' }
      });
    };

    window.addEventListener('new_order_placed', handleNewOrder);
    return () => window.removeEventListener('new_order_placed', handleNewOrder);
  }, []);

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Calculate stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total + 150, 0);
  const pendingOrders = orders.filter(o => o.status !== 'Delivered').length;

  return (
    <motion.div 
      className="page-wrapper"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container-fluid px-4 px-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="page-title mb-0">Admin Dashboard</h1>
          <span className="badge bg-warning text-dark fs-6 px-3 py-2"><i className="fa-solid fa-crown me-2"></i>Admin Mode</span>
        </div>

        {/* Stats Row */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="feature-card text-center p-4">
              <i className="fa-solid fa-money-bill-wave fa-3x text-success mb-3"></i>
              <h4 className="text-white">Total Revenue</h4>
              <h2 className="text-warning fw-bold">RS. {totalRevenue.toLocaleString()}</h2>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="feature-card text-center p-4">
              <i className="fa-solid fa-bell fa-3x text-info mb-3"></i>
              <h4 className="text-white">Active Orders</h4>
              <h2 className="text-warning fw-bold">{pendingOrders}</h2>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="feature-card text-center p-4">
              <i className="fa-solid fa-box fa-3x text-white mb-3"></i>
              <h4 className="text-white">Total Orders</h4>
              <h2 className="text-warning fw-bold">{orders.length}</h2>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-pills mb-4 border-bottom border-secondary pb-3 gap-3">
          <li className="nav-item">
            <button className={`btn ${activeTab === 'orders' ? 'btn-warning fw-bold' : 'btn-outline-warning text-light'}`} onClick={() => setActiveTab('orders')}>
              <i className="fa-solid fa-list-check me-2"></i> Manage Orders
            </button>
          </li>
          <li className="nav-item">
            <button className={`btn ${activeTab === 'menu' ? 'btn-warning fw-bold' : 'btn-outline-warning text-light'}`} onClick={() => setActiveTab('menu')}>
              <i className="fa-solid fa-utensils me-2"></i> Manage Menu
            </button>
          </li>
        </ul>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="table-responsive feature-card p-0 overflow-hidden text-start">
            <table className="table table-dark table-hover mb-0">
              <thead className="table-secondary">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-5 text-muted">No orders yet.</td></tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} className="align-middle">
                      <td className="px-4 fw-bold text-warning">{order.id}</td>
                      <td className="px-4">
                        <div>{order.deliveryInfo.name}</div>
                        <small className="text-muted">{order.deliveryInfo.phone}</small>
                      </td>
                      <td className="px-4">RS. {order.total + 150}</td>
                      <td className="px-4">
                        <span className={`badge ${order.status === 'Preparing' ? 'bg-warning text-dark' : order.status === 'Out for Delivery' ? 'bg-info text-dark' : 'bg-success'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 text-end">
                        <select 
                          className="form-select form-select-sm bg-dark text-white border-secondary d-inline-block w-auto"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div className="row g-4">
            {categories.map(category => (
              <div className="col-12" key={category}>
                <h3 className="text-warning border-bottom border-secondary pb-2 mb-4 text-capitalize">{category.replace('-', ' ')}</h3>
                <div className="table-responsive feature-card p-0 overflow-hidden text-start">
                  <table className="table table-dark table-hover mb-0">
                    <thead className="table-secondary">
                      <tr>
                        <th className="py-3 px-4 w-25">Image</th>
                        <th className="py-3 px-4">Title & Description</th>
                        <th className="py-3 px-4 text-end">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuData[category].map(item => (
                        <tr key={item.id} className="align-middle">
                          <td className="px-4">
                            <img src={item.image} alt={item.title} className="rounded" style={{ width: '80px', height: '60px', objectFit: 'cover' }} />
                          </td>
                          <td className="px-4">
                            <h6 className="text-white mb-1">{item.title}</h6>
                            <small className="text-muted d-block text-truncate" style={{ maxWidth: '300px' }}>{item.description}</small>
                          </td>
                          <td className="px-4 text-end">
                            <div className="d-flex align-items-center justify-content-end gap-2">
                              <span className="text-light">RS.</span>
                              <input 
                                type="number" 
                                className="form-control form-control-sm bg-dark text-warning fw-bold border-secondary text-end"
                                style={{ width: '100px' }}
                                defaultValue={item.price}
                                onBlur={(e) => updateMenuItem(category, item.id, { price: parseInt(e.target.value) })}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
