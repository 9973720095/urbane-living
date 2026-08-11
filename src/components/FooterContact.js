import React from 'react';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom'; // Route connect karne ke liye
import {
  PhoneFilled,
  WhatsAppOutlined,
  FacebookFilled,
  YoutubeFilled,
  TwitterOutlined,
  InstagramOutlined
} from '@ant-design/icons';
import './css/FooterContact.css';

const { Title, Paragraph } = Typography;

const FooterContact = () => {
  return (
    <div
      className="footer-contact"
      style={{
        background: "#f0f2f5",
        padding: "60px 20px",
        textAlign: "center",
      }}
    >
      <Title level={3} style={{ marginBottom: "8px" }}>
        Want quick assistance? Just give us a call!
      </Title>
      <Paragraph style={{ color: "#555", marginBottom: "24px" }}>
        Message us on WhatsApp or call directly for premium home design
        services.
      </Paragraph>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <Button
          type="primary"
          icon={<PhoneFilled />}
          size="large"
          href="tel:+91 1800-123-6407"
          style={{
            background: "#006699",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
          }}
        >
          CALL NOW
        </Button>

        <Button
          type="primary"
          icon={<WhatsAppOutlined />}
          size="large"
          href="https://wa.me/9105052454"
          target="_blank"
          style={{
            background: "#25D366",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
          }}
        >
          WHATSAPP
        </Button>
      </div>

      {/* --- SOCIAL ICONS --- */}
      <div style={{ marginTop: "40px" }}>
        <div className="social-icons">
          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/urbaneliving.in">
            <FacebookFilled />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@urbaneliving-ncr">
            <YoutubeFilled />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://x.com/UrbaneLiving001">
            <TwitterOutlined />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/urbanelivingindia/">
            <InstagramOutlined />
          </a>
        </div>
      </div>

      {/* --- NEW POLICY LINKS ROW --- */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        <Link to="/terms" style={{ color: "#333" }}>Terms & Conditions</Link>
        <Link to="/support" style={{ color: "#333" }}>Support page</Link>
        <Link to="/shipping" style={{ color: "#333" }}>Shipping & Delivery</Link>
        <Link to="/refund" style={{ color: "#333" }}>Refund Policy</Link>
        <Link to="/privacy" style={{ color: "#333" }}>Privacy Policy</Link>
      </div>
    </div>
  );
};

export default FooterContact;