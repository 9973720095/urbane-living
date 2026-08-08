import React from 'react';
import { Card, Row, Col, Typography, Button, Breadcrumb, Divider , Space } from 'antd';
import { 
  PhoneOutlined, 
  WhatsAppOutlined, 
  SafetyCertificateOutlined, 
  BookOutlined, 
  CreditCardOutlined,
  HomeOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const LegalPage = ({ type = "LEGAL INFORMATION" }) => {

  const pageData = {
    'Privacy Policy': {
      icon: <SafetyCertificateOutlined />,
      content: (
        <>
          <Title level={3}>Privacy Policy</Title>
          <Paragraph>
            At <Text strong>Urbane Living</Text>, we value your privacy and are committed to protecting your personal data.
          </Paragraph>
          <Title level={4}>Information We Collect</Title>
          <ul>
            <li>Name, contact number, and email address</li>
            <li>Project requirements submitted through our online estimator</li>
            <li>Site location and preferences for design consultation</li>
          </ul>
          <Title level={4}>How We Use Your Data</Title>
          <Paragraph>
            We use your information only to provide services, improve our offerings, and communicate with you. 
            We do not sell, trade, or rent your personal data to third parties.
          </Paragraph>
        </>
      )
    },
    'Disclaimer': {
      icon: <FileTextOutlined />,
      content: (
        <>
          <Title level={3}>Disclaimer</Title>
          <Paragraph>
            The budget estimates provided by our online tool are indicative and based on standard market rates as of May 2026.
          </Paragraph>
          <Title level={4}>Important Notes</Title>
          <ul>
            <li>Final project costs may vary depending on site conditions</li>
            <li>Material selection and availability can impact pricing</li>
            <li>Labor costs differ by location and project complexity</li>
            <li>GST and other taxes are calculated separately</li>
          </ul>
        </>
      )
    },
    'Terms & Conditions': {
      icon: <BookOutlined />,
      content: (
        <>
          <Title level={3}>Terms & Conditions</Title>
          <Title level={4}>1. Consultation</Title>
          <Paragraph>Estimates provided are for initial planning purposes only and do not constitute a binding contract.</Paragraph>
          
          <Title level={4}>2. Intellectual Property Rights</Title>
          <Paragraph>All designs, 3D renders, and images shared by Urbane Living remain our property unless specified otherwise.</Paragraph>
          
          <Title level={4}>3. Project Timeline</Title>
          <Paragraph>Delivery timelines are estimates and may vary based on material procurement and site readiness.</Paragraph>
        </>
      )
    },
    'Refund Policy': {
      icon: <CreditCardOutlined />,
      content: (
        <>
          <Title level={3}>Refund Policy</Title>
          <Title level={4}>Non-Refundable Items</Title>
          <ul>
            <li>Booking advance once material procurement has commenced</li>
            <li>Custom furniture that has entered production</li>
            <li>Site measurement and design consultation fees</li>
          </ul>
          <Title level={4}>Refundable Cases</Title>
          <Paragraph>
            100% refund if project is cancelled before any material purchase. Processing time: 7-10 business days.
          </Paragraph>
        </>
      )
    }
  };

  const currentPage = pageData[type] || pageData['Disclaimer'];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section - Dark Blue */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgb(0 26 41 / 46%) 0%, rgb(0, 51, 102) 100%)', 
        padding: '80px 24px 60px', // Top padding badhaya for fixed navbar
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', color: '#fff', marginBottom: '16px' }}>
          {currentPage.icon}
        </div>
        <Title level={1} style={{ color: '#fff', margin: 0, letterSpacing: '1px', fontSize: 'clamp(28px, 5vw, 42px)' }}>
          {type.toUpperCase()}
        </Title>
        <div style={{ width: '80px', height: '4px', background: '#006699', margin: '16px auto' }}></div>
      </div>

      {/* Breadcrumb - Hero ke just niche */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
          <Breadcrumb
            items={[
              { title: <Link to="/"><HomeOutlined /> Home</Link> },
              { title: type },
            ]}
          />
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
        <Row gutter={[16, 16]} justify="center">
          {[
            { icon: <SafetyCertificateOutlined />, title: "Data Security", desc: "100% confidential" },
            { icon: <BookOutlined />, title: "Transparency", desc: "No hidden terms" },
            { icon: <CreditCardOutlined />, title: "Secure Process", desc: "Trusted payments" }
          ].map((item, index) => (
            <Col xs={24} sm={8} key={index}>
              <Card 
                hoverable 
                style={{ 
                  textAlign: 'center', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: 'none',
                  height: '100%'
                }}
                bodyStyle={{ padding: '24px 16px' }}
              >
                <div style={{ fontSize: '36px', color: '#006699', marginBottom: '12px' }}>{item.icon}</div>
                <Title level={5} style={{ margin: '8px 0 4px' }}>{item.title}</Title>
                <Text type="secondary">{item.desc}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Main Content */}
      <Row justify="center" style={{ padding: '0 24px 60px' }}>
        <Col xs={24} lg={18} xl={16}>
          <Card 
            style={{ 
              borderRadius: '16px', 
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              border: '1px solid #e5e7eb'
            }}
            bodyStyle={{ padding: '40px' }}
          >
            <div style={{ fontSize: '16px', color: '#374151', lineHeight: '1.8' }}>
              {currentPage.content}
            </div>
            
            <Divider />
            
            <Text type="secondary" style={{ fontSize: '14px' }}>
              Last updated: May 23, 2026 | For queries: support@urbaneliving.in
            </Text>
          </Card>
        </Col>
      </Row>

      {/* CTA Section */}
      
    </div>
  );
};

export default LegalPage;