import React, { useState } from 'react';
import { Layout, message } from 'antd';
import axios from 'axios';
import './App.css';

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

const { Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const onFinish = async (values) => {
    try {
      const res = await axios.post('http://localhost:5000/api/save-lead', values);
      if (res.status === 200) {
        message.success('Lead Saved! Saban, check your MongoDB Atlas.');
        handleClose();
      }
    } catch (err) {
      message.error('Backend connection failed!');
    }
  };

  return (
    <Layout style={{ background: '#fff' }}>
      <NotificationModal />
      <Navbar onOpenForm={handleOpen} />
      <Content>
        <Hero onOpenForm={handleOpen} />
        <div style={{ padding: '40px 0' }}>
           <SpacesGrid onOpenForm={handleOpen} />
        </div>
        <CeilingSection />
        <MarketOfferings />
        <GallerySection />
        <ProcessSection />
        <FaqSection />
        <FooterContact />
      </Content>
      <InquiryModal isOpen={isModalOpen} onClose={handleClose} onFinish={onFinish} />
    </Layout>
  );
}

export default App;