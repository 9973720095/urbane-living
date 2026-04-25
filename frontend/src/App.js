import React, { useState, useEffect } from 'react'; // Added useEffect
import { Layout, message } from 'antd';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpacesGrid from './components/SpacesGrid';
import CeilingSection from './components/CeilingSection';
import ProcessSection from './components/ProcessSection';
import FaqSection from './components/FaqSection';
import FooterContact from './components/FooterContact';
import InquiryModal from './components/InquiryModal';
import NotificationModal from './components/NotificationModal';
import GallerySection from './components/GallerySection';
import MarketOfferings from './components/MarketOfferings';

// Pages
import FalseCeilingPage from './pages/FalseCeilingPage'; 
import AboutUsPage from './pages/AboutUs'; 
import ContactPage from './pages/ContactPage'; 
import Login from './pages/Login';

const { Content } = Layout;

// Layout content component
const LayoutContent = ({ children, handleOpen, isModalOpen, handleClose, onFinish, showNotification, setShowNotification }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <Layout style={{ background: '#fff' }}>
      {/* Ab ye conditional check logic se handle hoga */}
      {!isAdminPage && showNotification && (
        <NotificationModal onClose={() => setShowNotification(false)} />
      )}
      {!isAdminPage && <Navbar onOpenForm={handleOpen} />}
      
      <Content>
        {children}
        {!isAdminPage && <FooterContact />}
      </Content>

      <InquiryModal isOpen={isModalOpen} onClose={handleClose} onFinish={onFinish} />
    </Layout>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Notification modal ke liye state
  const [showNotification, setShowNotification] = useState(false);

  // Persistence Logic: Sirf 1st bar dikhane ke liye
  useEffect(() => {
    const hasSeenModal = localStorage.getItem('urbane_notification_seen');
    if (!hasSeenModal) {
      setShowNotification(true);
      localStorage.setItem('urbane_notification_seen', 'true');
    }
  }, []);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://urbane-living.onrender.com';

  const onFinish = async (values, type = 'lead') => {
    try {
      const endpoint = type === 'design' ? '/api/designs/add' : '/api/save-lead';
      const res = await axios.post(`${API_BASE_URL}${endpoint}`, values);
      
      if (res.status === 200) {
        message.success(`${type === 'design' ? 'Design' : 'Lead'} successfully saved!`);
        if (type === 'lead') handleClose();
        return true; 
      }
    } catch (err) {
      console.error(err);
      message.error('Backend connection failed!');
      return false;
    }
  };

  const HomePage = () => (
    <>
      <Hero onOpenForm={handleOpen} />
      <div style={{ padding: '40px 0' }}><SpacesGrid onOpenForm={handleOpen} /></div>
      <CeilingSection /><MarketOfferings /><GallerySection /><ProcessSection /><FaqSection />
    </>
  );

  return (
    <Router>
      <LayoutContent 
        handleOpen={handleOpen} 
        isModalOpen={isModalOpen} 
        handleClose={handleClose} 
        onFinish={onFinish}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      >
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard onFinish={onFinish} />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/false-ceiling" element={<FalseCeilingPage onOpenForm={handleOpen} />} />
          <Route path="/about" element={<AboutUsPage onOpenForm={handleOpen} />} />
          <Route path="/contact" element={<ContactPage onOpenForm={handleOpen} />} />
          <Route path="/admin-login" element={<Login />} />
        </Routes>
      </LayoutContent>
    </Router>
  );
}

export default App;