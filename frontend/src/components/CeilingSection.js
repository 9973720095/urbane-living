import React from 'react';
import { Row, Col, Typography, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;

const CeilingSection = () => {
  return (
    <div 
      className="ceiling-section" 
      style={{ 
        padding: '80px 5%', // Mobile friendly padding
        backgroundImage: "url('/images/marble-bg.png')", // Path updated
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden'
      }}
    >
      <Row align="middle" gutter={[40, 40]} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Col xs={24} md={12}>
          <Space direction="vertical" size="middle">
            <Text strong style={{ color: '#7b42f5', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Premium Interior Solutions
            </Text>
            <Title level={2} style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.2' }}>
              The Art of Silence and Light: <br/> 
              <span style={{ color: '#7b42f5' }}>Signature Ceilings</span>
            </Title>
            <Paragraph style={{ fontSize: '18px', color: '#555', lineHeight: '1.8' }}>
              Transform your overhead space into a captivating masterpiece. Our Gyproc-certified 
              installations offer sculpted architectural depth and intimate, premium ambiance 
              that lasts a lifetime.
            </Paragraph>
            <ul style={{ color: '#666', paddingLeft: '20px', fontSize: '16px' }}>
              <li>100% Termite Proof</li>
              <li>Fire Resistant Material</li>
              <li>Seamless Lighting Integration</li>
            </ul>
          </Space>
        </Col>

        <Col xs={24} md={12}>
          <div style={{ 
            padding: '12px', 
            background: '#fff', 
            borderRadius: '20px', 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
            transition: 'transform 0.3s ease'
          }}
          className="hover-zoom"
          >
            <img 
              src="/images/ceiling-main.png" 
              alt="Premium Ceiling Design" 
              style={{ 
                width: '100%', 
                borderRadius: '12px',
                display: 'block'
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CeilingSection;