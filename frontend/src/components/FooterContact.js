import React from 'react';
import { Button, Typography, Row, Col, Divider } from 'antd';
import {
  PhoneFilled,
  WhatsAppOutlined,
  FacebookFilled,
  YoutubeFilled,
  LinkedinFilled,
  InstagramOutlined,
  MailOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './css/FooterContact.css';

const { Title, Paragraph, Text } = Typography;

const FooterContact = () => {
  return (
    <div
      className="footer-contact"
      style={{
        background: "#001529",
        color: "#fff",
        padding: "60px 20px 20px",
      }}
    >
      {/* CTA Section */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <Title level={3} style={{ marginBottom: "8px", color: "#fff" }}>
          Want quick assistance? Just give us a call!
        </Title>
        <Paragraph style={{ color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>
          Message us on WhatsApp or call directly for premium home design services.
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
              height: '48px'
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
              height: '48px'
            }}
          >
            WHATSAPP
          </Button>
        </div>
      </div>

      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          <Col xs={12} sm={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>Company</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/about" style={linkStyle}>About Us</Link>
              <Link to="/contact" style={linkStyle}>Contact</Link>
              <Link to="/blogs" style={linkStyle}>Blogs</Link>
            </div>
          </Col>

          <Col xs={12} sm={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>Services</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/false-ceiling" style={linkStyle}>False Ceiling</Link>
              <Link to="/kitchen" style={linkStyle}>Modular Kitchen</Link>
              <Link to="/wardrobe" style={linkStyle}>Wardrobe</Link>
              <Link to="/bedroom" style={linkStyle}>Bedroom Interiors</Link>
            </div>
          </Col>

          <Col xs={12} sm={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>Legal</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link target='_blank' to="/privacy-policy" style={linkStyle}>Privacy Policy</Link>
              <Link target='_blank' to="/terms-conditions" style={linkStyle}>Terms & Conditions</Link>
              <Link target='_blank' to="/refund-policy" style={linkStyle}>Refund Policy</Link>
              <Link target='_blank' to="/disclaimer" style={linkStyle}>Disclaimer</Link>
            </div>
          </Col>

          <Col xs={12} sm={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>Connect</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <a href="tel:+919560555103" style={linkStyle}>
                <PhoneFilled style={{ marginRight: '8px' }} />+91 95605 55103
              </a>
              <a href="mailto:urbanelivingofficial@gmail.com" style={linkStyle}>
                <MailOutlined style={{ marginRight: '8px' }} />urbanelivingofficial@gmail.com
              </a>
              <Text style={linkStyle}>Express Green Plaza , Sector-1, Vaishali, Ghaziabad</Text>
            </div>
          </Col>
        </Row>
      </div>

      <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0 24px' }} />

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
          © 2026 Urbane Living. All rights reserved.
        </Text>

        <div className="social-icons" style={{ display: 'flex', gap: '12px' }}>
          <a target='_blank' rel="noopener noreferrer" href="https://www.facebook.com/urbaneliving.in" style={iconStyle}> 
            <FacebookFilled />
          </a>
          <a target='_blank' rel="noopener noreferrer" href="https://www.youtube.com/@urbaneliving-ncr" style={iconStyle}>
            <YoutubeFilled />
          </a>
          <a target='_blank' rel="noopener noreferrer" href="https://www.linkedin.com/company/urbaneliving" style={iconStyle}>
            <LinkedinFilled />
          </a>
          <a target='_blank' rel="noopener noreferrer" href="https://www.instagram.com/urbaneliving.in" style={iconStyle}> 
            <InstagramOutlined />
          </a>
        </div>
      </div>
    </div>
  );
};

const linkStyle = {
  color: 'rgba(255,255,255,0.7)',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'color 0.3s',
  display: 'flex',
  alignItems: 'center'
};

const iconStyle = {
  width: '36px',
  height: '36px',
  background: 'rgba(255,255,255,0.1)',
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