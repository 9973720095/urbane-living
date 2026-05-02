import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Added Navigate
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import { onAuthStateChanged } from "firebase/auth"; // Added for auth check
import { auth } from './firebase'; // Added

// Components & Pages imports (Keep your existing imports here...)
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
import FalseCeilingPage from './pages/FalseCeilingPage'; 
import AboutUsPage from './pages/AboutUs'; 
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetails from './pages/BlogDetails';
import BedroomPage from './pages/BedroomPage';
import LivingHallPage from './pages/LivingHallPage';
import KitchenPage from './pages/KitchenPage';
import WardrobePage from './pages/WardrobePage';

const { Content } = Layout;

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const ALLOWED_EMAILS = ["sabankumarjha9@gmail.com", "urbaneliving.in@gmail.com"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null; // Or a spinner

  if (!user || !ALLOWED_EMAILS.includes(user.email)) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

const LayoutContent = ({ children, handleOpen, isModalOpen, handleClose, onFinish, showNotification, setShowNotification }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <Layout style={{ background: '#fff' }}>
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
  const [showNotification, setShowNotification] = useState(false);

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
    : 'https://urbaneliving.in/api';

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
          {/* UPDATED ADMIN DASHBOARD ROUTE */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard onFinish={onFinish} />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/admin-login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/false-ceiling" element={<FalseCeilingPage onOpenForm={handleOpen} />} />
          <Route path="/about" element={<AboutUsPage onOpenForm={handleOpen} />} />
          <Route path="/contact" element={<ContactPage onOpenForm={handleOpen} />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/bedroom" element={<BedroomPage />} />
          <Route path="/living-hall" element={<LivingHallPage />} />
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/wardrobe" element={<WardrobePage />} />
        </Routes>
      </LayoutContent>
    </Router>
  );
}

export default App;