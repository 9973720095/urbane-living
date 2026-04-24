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
  const emailAddress = "contact@urbaneliving.in";

  // City-wise Map Data (Optimized for 2026 Premium Look)
  const locations = [
    { 
      name: "DELHI", 
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112081.77353916964!2d77.165100!3d28.613939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b7187896444!2sDelhi!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin",
      desc: "Mandawali, West Vinod Nagar"
    },
    { 
      name: "NOIDA", 
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56066.38950548174!2d77.311749!3d28.535516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30cdd7fdc4!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1712345678902!5m2!1sen!2sin",
      desc: "Sectors 15, 18 & 62"
    },
    { 
      name: "GURUGRAM", 
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56122.999566373!2d77.010375!3d28.459497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5e815c328e3!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1712345678903!5m2!1sen!2sin",
      desc: "Cyber City & Golf Course Rd"
    }
  ];

  return (
    <div className="contact-page">
      {/* HERO SECTION */}
      <div className="contact-hero">
        <Title level={1} className="hero-title">Get in Touch</Title>
        <Text className="hero-subtitle">Modern Designs, Professional Execution.</Text>
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
                  onClick={() => window.location.href = `sms:${phoneNumber}?body=Hello Urbane Living, I need a consultation.`}
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
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                      ></iframe>
                    </div>
                  }
                >
                  <div style={{ textAlign: 'center' }}>
                    <Title level={4} className="city-name">{loc.name}</Title>
                    <EnvironmentOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                    <Text type="secondary">{loc.desc}</Text>
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