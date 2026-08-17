import React, { useState } from 'react';
import { Layout, message } from 'antd';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';

import './App.css';

import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

// Components & Pages imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpacesGrid from './components/SpacesGrid';
import CeilingSection from './components/CeilingSection';
import BeforeAfter from './components/BeforeAfter';
import ProcessSection from './components/ProcessSection';
import FaqSection from './components/FaqSection';
import FooterContact from './components/FooterContact';
import InquiryModal from './components/InquiryModal';
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
import ClientStories from './components/ClientStories';

// --- IMPORT NEW POLICY PAGES HERE ---
// Make sure these files exist in your 'pages' folder
import TermsConditionPage from './pages/TermsConditionPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
// Support page ka link tha, agar uska alag page hai toh import karein,
// warna filhal ke liye ise comment ya remove kar sakte hain.
// import SupportPage from './pages/SupportPage'; 


const { Content } = Layout;

// --- SIMPLE PROTECTED ROUTE ---
const ProtectedRoute = ({ children }) => {

  const isAuthenticated =
    localStorage.getItem('adminAuth') === 'true';

  return isAuthenticated
   ? children
    : <Navigate to="/admin-login" replace />;
};

const LayoutContent = ({
  children,
  handleOpen,
  isModalOpen,
  handleClose,
  onFinish
}) => {

  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith('/admin');

  return (
    <Layout style={{ background: '#fff' }}>

      {!isAdminPage && (
        <Navbar onOpenForm={handleOpen} />
      )}

      <Content>
        {children}

        {!isAdminPage && <FooterContact />}
      </Content>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onFinish={onFinish}
      />

    </Layout>
  );
};

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);

  const handleClose = () => setIsModalOpen(false);

  const API_BASE_URL =
    window.location.hostname === 'localhost'
     ? 'http://localhost:5000'
      : 'https://urbaneliving.in/api';

  const onFinish = async (values, type = 'lead') => {

    try {

      const endpoint =
        type === 'design'
         ? '/api/designs/add'
          : '/api/save-lead';

      const res = await axios.post(
        `${API_BASE_URL}${endpoint}`,
        values
      );

      if (res.status === 200) {

        message.success(
          `${type === 'design'? 'Design' : 'Lead'} successfully saved!`
        );

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

      <div className="notice" style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <div className="notice-content" style={{ display: 'flex', width: '100%', maxWidth: '1100px', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
          {/* Item 1 */}
          <div className="notice-content-item" style={{ textAlign: 'center' }}>
            <picture style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {/* Icon size increased to 60px */}
              <img src="https://spaceinterio.co.in/wp-content/uploads/2024/07/Personalised-designs-e1720440694404.png" alt="Notice" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
              <figcaption style={{ fontSize: '16px', color: '#333333', fontWeight: 500 }}>Personalised designs</figcaption>
            </picture>
          </div>

          {/* Item 2 */}
          <div className="notice-content-item" style={{ textAlign: 'center' }}>
            <picture style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {/* Icon size increased to 60px */}
              <img src="https://spaceinterio.co.in/wp-content/uploads/2024/07/Personalised-designs-5-e1720442786627.png" alt="Notice" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
              <figcaption style={{ fontSize: '16px', color: '#333333', fontWeight: 500 }}>10-year warranty¹</figcaption>
            </picture>
          </div>

          {/* Item 3 */}
          <div className="notice-content-item" style={{ textAlign: 'center' }}>
            <picture style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {/* Icon size increased to 60px */}
              <img src="https://spaceinterio.co.in/wp-content/uploads/2024/07/Personalised-designs-6-e1720443121163.png" alt="Notice" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
              <figcaption style={{ fontSize: '16px', color: '#333333', fontWeight: 500 }}>Transparent pricing</figcaption>
            </picture>
          </div>

        </div>
      </div>

      <div className="brand-story-section" style={{ padding: '60px 20px', backgroundColor: '#f5f5f5', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#1a1a1a', marginBottom: '16px', lineHeight: 1.2 }}>
            Your Space, Your Story! Let It Shine
          </h2>

          <p style={{ fontSize: '16px', color: '#555555', lineHeight: 1.6, marginBottom: '28px', padding: '0 15px' }}>
            At Urbane Living, we craft living spaces that are both stylish and functional. With modern technology and quality materials, We design spaces that reflect you and stand the test of time, and also that last for years to come
          </p>

          <button 
            onClick={handleOpen} 
            style={{
              backgroundColor: '#ff0000',
              color: '#ffffff',
              lineHeight: 1,
              border: 'none',
              padding: '14px 22px',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: '100px 100px 100px 100px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#ff0000'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ff0000'}
          >
            BOOK FREE CONSULTATION
          </button>

        </div>
      </div>

      <div style={{ padding: '0px 0px 40px', backgroundColor: '#ffffff' }}>
        <SpacesGrid onOpenForm={handleOpen} />
      </div>

      <CeilingSection />
      <BeforeAfter />
      <MarketOfferings onOpenForm={handleOpen} />
      <GallerySection />

      <div className="blend-section-wrapper" style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <div style={{ 
          display: 'flex', 
          width: '100%', 
          maxWidth: '1100px', 
          background: '#f2f5e8', 
          borderRadius: '16px', 
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          
          {/* Left Side Content */}
          <div style={{ flex: '1', padding: '50px 40px', minWidth: '300px' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#111111', lineHeight: '1.2', marginBottom: '20px' }}>
              A blend of beauty and functionality
            </h2>
            <p style={{ fontSize: '16px', color: '#333333', lineHeight: '1.6', marginBottom: '35px', maxWidth: '450px' }}>
              Because nothing less than a tailor-made, luxurious experience with high-end finishes will do for your home.
            </p>
            <button 
              onClick={handleOpen} 
              style={{
                backgroundColor: '#ff0000',
                color: '#ffffff',
                border: 'none',
                padding: '14px 32px',
                fontSize: '15px',
                fontWeight: 700,
                borderRadius: '8px',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#d90000'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ff0000'}
            >
              GET FREE QUOTE
            </button>
          </div>

          {/* Right Side Video Section */}
          <div style={{ flex: '1', height: '380px', minWidth: '300px', position: 'relative', overflow: 'hidden', background: '#000' }}>
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src="https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778846969/AQPPPai3iDlmpoWAl2Do5RAPE5X-opF5dVERGYcK0KMopwZThd4xaz6sAKKnZPuHhL1767QbSXcO9pvrpYJ-1oC9QZJR5f_tiq89RE4_detdg9.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </div>

      <ProcessSection />
      <ClientStories onOpenForm={handleOpen} />
      <FaqSection />
    </>
  );

  return (
    <Router>

      <LayoutContent
        handleOpen={handleOpen}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        onFinish={onFinish}
      >

        <Routes>

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard onFinish={onFinish} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-login"
            element={<Login />}
          />

          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/false-ceiling"
            element={<FalseCeilingPage onOpenForm={handleOpen} />}
          />

          <Route
            path="/about"
            element={<AboutUsPage onOpenForm={handleOpen} />}
          />

          <Route
            path="/contact"
            element={<ContactPage onOpenForm={handleOpen} />}
          />

          <Route
            path="/blogs"
            element={<BlogPage />}
          />

          <Route
            path="/blog/:id"
            element={<BlogDetails />}
          />

          <Route
            path="/bedroom"
            element={<BedroomPage />}
          />

          <Route
            path="/living-hall"
            element={<LivingHallPage />}
          />

          <Route
            path="/kitchen"
            element={<KitchenPage />}
          />

          <Route
            path="/wardrobe"
            element={<WardrobePage />}
          />

          {/* --- ADDED ROUTES FOR POLICY PAGES --- */}
          <Route 
            path="/terms" 
            element={<TermsConditionPage />} 
          />
          <Route 
            path="/privacy" 
            element={<PrivacyPolicyPage />} 
          />
          <Route 
            path="/refund" 
            element={<RefundPolicyPage />} 
          />
          <Route 
            path="/shipping" 
            element={<ShippingPolicyPage />} 
          />
          {/* Agar Support page ka component hai toh ye line uncomment karein: */}
          {/* <Route path="/support" element={<SupportPage />} /> */}

        </Routes>

      </LayoutContent>

    </Router>
  );
}

export default App;