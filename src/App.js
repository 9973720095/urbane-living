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

// Backend URL: localhost -> http://localhost:5000, live -> Render (from siteData.js)
import { API_BASE_URL } from './data/siteData';

import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

// Components & Pages imports
import ScrollToTop from './components/ScrollToTop';
import MetaPixel from './components/MetaPixel';
import TopBar from './components/TopBar';
import useAutoPopup from './hooks/useAutoPopup';
import FloatingContact from './components/FloatingContact';
import MobileBottomNav from './components/MobileBottomNav';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromiseStrip from './components/PromiseStrip';
import Seo from './components/Seo';
import NotFoundPage from './pages/NotFoundPage';
import LocalServicePage from './pages/LocalServicePage';
import AreasPage from './pages/AreasPage';
import LocalityPage from './pages/LocalityPage';
import { localServices } from './data/localSeo';
import { pageSeo } from './data/pageSeo';
// import SpacesGrid from './components/SpacesGrid';
// import CeilingSection from './components/CeilingSection';
import GallerySection from './components/GallerySection';
import BeforeAfter from './components/BeforeAfter';
import BrandStory from './components/BrandStory';
import BlendSection from './components/BlendSection';
// import ProcessSection from './components/ProcessSection';
import FaqSection from './components/FaqSection';
import FooterContact from './components/FooterContact';
import InquiryModal from './components/InquiryModal';
import MarketOfferings from './components/MarketOfferings';
// import PageBanner from './components/PageBanner';
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
import GoogleReviews from './components/GoogleReviews';
import TermsConditionPage from './pages/TermsConditionPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import SupportPage from './pages/SupportPage';
import EstimatePage from './pages/Estimate';
import StyleQuiz from './components/StyleQuiz';
import SolutionsGrid from './components/SolutionsGrid';
import RoomExplorer from './components/RoomExplorer';
import VastuBanner from './components/VastuBanner';
import VastuPage from './pages/VastuPage';
import VastuAnalyzer from './pages/VastuAnalyzer';


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

  // Auto-open the free consultation form (timing in data/autoPopup.js)
  useAutoPopup({ isOpen: isModalOpen, open: handleOpen, pathname: location.pathname });

  return (
    <Layout style={{ background: '#fff' }}>

      {/* Top bar: rotating offers + call button (hidden on admin pages) */}
      {!isAdminPage && <TopBar />}

      {!isAdminPage && (
        <Navbar onOpenForm={handleOpen} />
      )}

      <Content>
        {children}
        {!isAdminPage && <FooterContact />}
      </Content>

      {/* WhatsApp + call buttons and the phone app bar (not on admin pages) */}
      {!isAdminPage && <FloatingContact />}
      {!isAdminPage && <MobileBottomNav onOpenForm={handleOpen} />}

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
      <PromiseStrip />

      <BrandStory onOpenForm={handleOpen} />

      <GallerySection />
      <BeforeAfter />
      <RoomExplorer onOpenForm={handleOpen} />
      <VastuBanner />
      <StyleQuiz onOpenForm={handleOpen} />
      <MarketOfferings onOpenForm={handleOpen} />

      <BlendSection onOpenForm={handleOpen} />
      {/* <ProcessSection /> */}
      {/* <PageBanner /> */}
      <ClientStories onOpenForm={handleOpen} />
      <GoogleReviews onOpenForm={handleOpen} />
      <SolutionsGrid onOpenForm={handleOpen} />
      <FaqSection />
    </>
  );

  return (
    <Router>

      <ScrollToTop />
      <MetaPixel />
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
                <Seo {...pageSeo.adminDashboard} />
                <AdminDashboard onFinish={onFinish} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-login"
            element={<><Seo {...pageSeo.adminLogin} /><Login /></>}
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
            element={<BedroomPage onOpenForm={handleOpen} />}
          />

          <Route
            path="/living-hall"
            element={<LivingHallPage onOpenForm={handleOpen} />}
          />

          <Route
            path="/kitchen"
            element={<KitchenPage onOpenForm={handleOpen} />}
          />

          <Route
            path="/wardrobe"
            element={<WardrobePage onOpenForm={handleOpen} />}
          />

          <Route path="/terms" element={<TermsConditionPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/refund" element={<RefundPolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/vastu" element={<VastuPage />} />
          <Route path="/vastu/analyze" element={<VastuAnalyzer />} />

          <Route
            path="/shipping"
            element={<><Seo {...pageSeo.shipping} /><ShippingPolicyPage /></>}
          />
          <Route
            path="/support"
            element={<><Seo {...pageSeo.support} /><SupportPage /></>}
          />
          <Route
            path="/estimate"
            element={<><Seo {...pageSeo.estimate} /><EstimatePage onOpenForm={handleOpen} /></>}
          />

          {/* Local SEO: /interior-designers, /false-ceiling/noida, /interior-designers/ghaziabad/indirapuram ... */}
          <Route path="/interior-designers" element={<AreasPage />} />
          <Route path="/interior-designers/:city/:locality" element={<LocalityPage onOpenForm={handleOpen} />} />
          {localServices.map((s) => (
            <Route
              key={s.slug}
              path={`/${s.slug}/:city`}
              element={<LocalServicePage serviceSlug={s.slug} onOpenForm={handleOpen} />}
            />
          ))}

          {/* Any unknown URL: 404 page (noindex) - always keep this LAST */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </LayoutContent>

    </Router>
  );
}

export default App;