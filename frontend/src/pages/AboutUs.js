import React from 'react';
import { Row, Col, Card, Typography, Button, Avatar } from 'antd';
import { 
  CheckCircleFilled, TeamOutlined, RocketOutlined, CrownOutlined, 
  StarFilled, SecurityScanOutlined 
} from '@ant-design/icons';
import "./aboutUs.css";

const { Title, Paragraph, Text } = Typography;

export default function AboutUsPage({ onOpenForm }) {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="hero-overlay-refined">
          <div className="hero-content-center">
            <h4 className="brand-subtitle">THE ART OF LUXURY</h4>
            <h1 className="brand-headline">Urbane Living</h1>
            <div className="hero-divider"></div>
            <p className="hero-tagline">Innovation meets elegance to transform your space into a masterpiece.</p>
          </div>
        </div>
      </section>

      <section className="usp-section-cards">
        <div className="container-custom">
          <Row gutter={[24, 24]} justify="center">
            {[
              { icon: <CrownOutlined />, title: "Premium Quality", desc: "Ultra-luxe finishes that stay flawless for years." },
              { icon: <RocketOutlined />, title: "Fast Delivery", desc: "Luxury transformation in just 7-10 working days." },
              { icon: <TeamOutlined />, title: "Expert Crew", desc: "In-house designers and certified master craftsmen." }
            ].map((item, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card className="modern-usp-card" bordered={false}>
                  <div className="icon-wrapper">{item.icon}</div>
                  <Title level={4}>{item.title}</Title>
                  <Text type="secondary">{item.desc}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="story-section">
        <div className="container-custom">
          <Row gutter={[60, 40]} align="middle">
            <Col xs={24} lg={12}>
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                alt="Modern Interior" className="story-img" 
              />
            </Col>
            <Col xs={24} lg={12}>
              <Title level={2}>Crafting Beyond Boundaries</Title>
              <Paragraph className="story-para">
                Urbane Living isn't just about interiors; it's about your identity. We combine moisture-resistant technology with laser-level precision to ensure every corner speaks luxury.
              </Paragraph>
              <div className="modern-list">
                <div className="list-item"><CheckCircleFilled className="check-icon" /> High-grade Moisture Resistant Materials</div>
                <div className="list-item"><CheckCircleFilled className="check-icon" /> 10-Year Warranty on Workmanship</div>
                <div className="list-item"><CheckCircleFilled className="check-icon" /> Laser-level precision installation</div>
              </div>
              {/* Saban: Click par form open hoga */}
              <Button type="primary" size="large" className="prime-btn" onClick={onOpenForm}>
                Explore Our Work
              </Button>
            </Col>
          </Row>
        </div>
      </section>

      <section className="quality-standards">
        <div className="container-custom">
          <div className="section-title-center"><Title level={2}>Why we are better than standard solutions</Title></div>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <div className="quality-item shadow-hover">
                <SecurityScanOutlined className="q-icon" />
                <div>
                  <Title level={4}>Zero Sagging Technology</Title>
                  <Text>Maintain structural integrity even in humid conditions.</Text>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="quality-item shadow-hover">
                <StarFilled className="q-icon" />
                <div>
                  <Title level={4}>Acoustic Comfort</Title>
                  <Text>Specialized sound-dampening layers to keep your home peaceful.</Text>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="testimonials">
        <div className="container-custom">
          <Title level={2} style={{ textAlign: 'center', marginBottom: 50 }}>Trusted by Homeowners</Title>
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} md={12} lg={8}>
              <Card className="testi-card shadow-hover">
                <Paragraph>"The speed and finishing of Urbane Living is unmatched."</Paragraph>
                <div className="user-info">
                  <Avatar src="https://i.pravatar.cc/100?u=1" /><div style={{ marginLeft: 12 }}><Text strong>Amit Sharma</Text><br /><Text type="secondary">Gurgaon</Text></div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card className="testi-card shadow-hover">
                <Paragraph>"Professionalism at its best. Very impressed."</Paragraph>
                <div className="user-info">
                  <Avatar src="https://i.pravatar.cc/100?u=2" /><div style={{ marginLeft: 12 }}><Text strong>Priya Verma</Text><br /><Text type="secondary">South Delhi</Text></div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
}