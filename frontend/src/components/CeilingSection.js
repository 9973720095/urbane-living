import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const CeilingSection = () => {
  return (
    <div 
      className="ceiling-section" 
      style={{ 
        padding: '100px 10%', 
        backgroundImage: "url('./images/marble-bg.png')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Row align="middle" gutter={[40, 40]}>
        <Col xs={24} md={12}>
          <Title level={2} style={{ fontSize: '32px' }}>
            The Art of Silence and Light: <br/> 
            <span className="purple-text" style={{ color: '#7b42f5' }}>Signature Ceilings</span>
          </Title>
          <Paragraph style={{ fontSize: '17px', color: '#444', lineHeight: '1.6' }}>
            Transform your overhead space into a captivating masterpiece with sculpted architectural depth and intimate, premium ambiance.
          </Paragraph>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ padding: '10px', background: '#fff', borderRadius: '12px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
            <img 
              src="/images/ceiling-main.png" 
              alt="Ceiling Design" 
              style={{ 
                width: '100%', 
                borderRadius: '8px',
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