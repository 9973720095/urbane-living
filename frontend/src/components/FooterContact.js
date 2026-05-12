import React from 'react';
import { Button, Typography } from 'antd';
import {
  PhoneFilled,
  WhatsAppOutlined,
  FacebookFilled,
  YoutubeFilled,
  LinkedinFilled,
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
          href="tel:+919560555103"
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
          href="https://wa.me/919560555103"
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

      {/* --- SOCIAL - EXACT LIKE REF-1 --- */}
      <div style={{ marginTop: "40px" }}>
        <div className="social-icons">
          <a href="#">
            <FacebookFilled />
          </a>
          <a href="#">
            <YoutubeFilled />
          </a>
          <a href="#">
            <LinkedinFilled />
          </a>
          <a href="#">
            <InstagramOutlined />
          </a>
        </div>
      </div>
    </div>
  );
};

const iconStyle = {
  width: '36px',
  height: '36px',
  background: '#2d3748',
  color: '#fff',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  transition: 'all 0.2s',
  textDecoration: 'none'
};

export default FooterContact;