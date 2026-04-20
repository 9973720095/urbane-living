import React, { useState } from 'react';
import { Layout, message } from 'antd';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

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

const { Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://urbane-living.onrender.com';

  const onFinish = async (values) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/save-lead`, values);
      if (res.status === 200) {
        message.success('Lead Saved Successfully!');
        handleClose();
      }
    } catch (err) {
      message.error('Backend connection failed!');
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
      <Layout style={{ background: '#fff' }}>
        <NotificationModal />
        <Navbar onOpenForm={handleOpen} />
        <Content>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/false-ceiling" element={<FalseCeilingPage onOpenForm={handleOpen} />} />
            <Route path="/about" element={<AboutUsPage onOpenForm={handleOpen} />} /> 
          </Routes>
          <FooterContact />
        </Content>
        <InquiryModal isOpen={isModalOpen} onClose={handleClose} onFinish={onFinish} />
      </Layout>
    </Router>
  );
}

export default App;