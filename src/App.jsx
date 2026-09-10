import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import InitialLoader from './components/InitialLoader';
import { useAuth } from './context/AuthContext';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    let title = "Tasty Tracks";
    switch(location.pathname) {
      case '/': title = "Home | Tasty Tracks"; break;
      case '/about': title = "About Us | Tasty Tracks"; break;
      case '/contact': title = "Contact Us | Tasty Tracks"; break;
      case '/gallery': title = "Gallery | Tasty Tracks"; break;
      case '/login': title = "Login | Tasty Tracks"; break;
      case '/signup': title = "Sign Up | Tasty Tracks"; break;
      case '/checkout': title = "Checkout | Tasty Tracks"; break;
      case '/tracking': title = "My Orders | Tasty Tracks"; break;
      case '/admin': title = "Admin Dashboard | Tasty Tracks"; break;
      default: title = "Page Not Found | Tasty Tracks"; break;
    }
    document.title = title;
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/tracking" element={<PageTransition><OrderTracking /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <InitialLoader />
      <CustomCursor />
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000' }}>
        <Header />
        <div style={{ flex: 1, paddingTop: '76px' }}> {/* Padding for fixed header */}
          <AnimatedRoutes />
        </div>
        <Footer />
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
          toastClassName="premium-toast"
          bodyClassName="premium-toast-body"
        />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
