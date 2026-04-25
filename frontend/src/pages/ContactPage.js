import React from "react";
import { Row, Col, Form, Input, Button, Card, Typography, Space } from "antd";
import { 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined, 
  WhatsAppOutlined, 
  MessageOutlined,
  SendOutlined 
} from "@ant-design/icons";
import "./ContactPage.css";

const { Title, Text } = Typography;

export default function ContactPage({ onOpenForm }) {
  const phoneNumber = "+919560555103";
  const whatsappNumber = "919560555103";
  const emailAddress = "saban.urbaneliving@gmail.com";

  // Creative Location Data
  const locations = [
    { 
      name: "DELHI", 
      mapUrl: "https://maps.google.com/maps?q=Interior%20Designers%20in%20Mandawali%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed",
      tags: ["Mandawali", "Laxmi Nagar", "Preet Vihar", "Mayur Vihar"],
      stats: "15+ Active Sites"
    },
    { 
      name: "NOIDA", 
      mapUrl: "https://maps.google.com/maps?q=Interior%20Designers%20in%20Noida%20Sector%2018&t=&z=13&ie=UTF8&iwloc=&output=embed",
      tags: ["Sector 15", "Sector 18", "Sector 62", "Greater Noida"],
      stats: "12+ Live Projects"
    },
    { 
      name: "GURUGRAM", 
      mapUrl: "https://maps.google.com/maps?q=Interior%20Designers%20in%20Gurugram%20Cyber%20City&t=&z=13&ie=UTF8&iwloc=&output=embed",
      tags: ["Cyber City", "Golf Course Rd", "Sohna Road", "DLF Ph-3"],
      stats: "10+ Ongoing Works"
    }
  ];

  return (
    <div className="contact-page">
      {/* HERO SECTION */}
      <div className="contact-hero">
        <Title level={1} className="hero-title">Get in Touch</Title>
        <Text className="hero-subtitle">Modern Designs, Professional Execution Across NCR.</Text>
      </div>

      <div className="container contact-container">
        <Row gutter={[32, 32]}>
          {/* LEFT: QUICK CONNECT */}
          <Col xs={24} lg={10}>
            <Space direction="vertical" size={20} style={{ width: "100%" }}>
              <a href={`tel:${phoneNumber}`} className="contact-link">
                <Card className="info-card call-card" hoverable>
                  <Space size={15}>
                    <div className="icon-circle"><PhoneOutlined /></div>
                    <div>
                      <Title level={4} style={{ margin: 0 }}>Call Us</Title>
                      <Text strong>{phoneNumber}</Text>
                    </div>
                  </Space>
                </Card>
              </a>

              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="contact-link">
                <Card className="info-card wa-card" hoverable>
                  <Space size={15}>
                    <div className="icon-circle wa-icon"><WhatsAppOutlined /></div>
                    <div>
                      <Title level={4} style={{ margin: 0 }}>WhatsApp</Title>
                      <Text strong>Instant Support</Text>
                    </div>
                  </Space>
                </Card>
              </a>

              <a href={`mailto:${emailAddress}`} className="contact-link">
                <Card className="info-card" hoverable>
                  <Space size={15}>
                    <div className="icon-circle mail-icon"><MailOutlined /></div>
                    <div>
                      <Title level={4} style={{ margin: 0 }}>Email Us</Title>
                      <Text strong>{emailAddress}</Text>
                    </div>
                  </Space>
                </Card>
              </a>
            </Space>
          </Col>

          {/* RIGHT: MESSAGE FORM */}
          <Col xs={24} lg={14}>
            <div className="contact-form-wrapper">
              <Title level={3} style={{ marginBottom: 20 }}>Send a Query</Title>
              <Form layout="vertical" size="large">
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Your Name">
                      <Input placeholder="Enter Name" className="modern-input" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Phone Number">
                      <Input placeholder="+91" className="modern-input" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Message">
                  <Input.TextArea rows={4} placeholder="How can we help?" className="modern-input" />
                </Form.Item>

                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  icon={<MessageOutlined />} 
                  className="contact-submit-btn"
                  onClick={() => window.location.href = `sms:${phoneNumber}?body=Hello Urbane Living, I am interested in your services.`}
                >
                  Send SMS Message
                </Button>
                
                <p style={{ textAlign: 'center', marginTop: 15 }}>
                  <Button type="link" onClick={onOpenForm}>Open Quick Quote Form</Button>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </div>

      {/* WORKING LOCATIONS SECTION */}
      <div className="working-locations-section">
        <div className="container">
          <Title level={2} className="section-title">Working Location</Title>
          <Row gutter={[24, 24]}>
            {locations.map((loc, index) => (
              <Col xs={24} md={8} key={index}>
                <Card 
                  className="location-card" 
                  hoverable
                  cover={
                    <div className="map-wrapper">
                      <iframe
                        title={loc.name}
                        src={loc.mapUrl}
                        width="100%"
                        height="280"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  }
                >
                  <div style={{ textAlign: 'center', padding: '10px' }}>
                    <Title level={4} className="city-name">{loc.name}</Title>
                    
                    {/* Modern Tags Layout */}
                    <div style={{ marginBottom: '12px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '5px' }}>
                      {loc.tags.map(tag => (
                        <span key={tag} className="location-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Live Status Badge */}
                    <div className="live-status-badge">
                      <Text strong className="live-status-text">
                        <span className="dot-blink"></span> {loc.stats}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}