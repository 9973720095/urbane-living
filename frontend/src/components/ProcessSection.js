import React from 'react';
import { Row, Col, Typography } from 'antd';
import './css/ProcessSection.css';

const { Title, Text } = Typography;

const ProcessSection = () => {
  const steps = [
    {
      stage: '01',
      heading: 'Framing & Channels',
      duration: 'Duration: 2 days',
      img: 'https://urbaneliving.in/wp-content/uploads/2024/11/Functional-Comfort-Kitchen-2-300x300.webp'
    },
    {
      stage: '02',
      heading: 'Board Installation & Plastering',
      duration: 'Duration: 2 days',
      img: 'https://urbaneliving.in/wp-content/uploads/2024/11/Untitled-design-2025-10-02T120251.508-300x300.webp'
    },
    {
      stage: '03',
      heading: 'Finishing',
      duration: 'Duration: 3 days',
      img: 'https://urbaneliving.in/wp-content/uploads/2024/11/Functional-Comfort-Kitchen-300x300.webp'
    },      
    {
      stage: '04',
      heading: 'Enjoy the new look',
      duration: 'Just 7* Days',
      img: 'https://urbaneliving.in/wp-content/uploads/2024/11/Functional-Comfort-Kitchen-4-300x300.webp'
    }
  ];

  return (
    <div className="process-container">
      <div className="process-header">
        <Title level={1}>Urbane Living False Ceiling in 7* days</Title>
      </div>

      <Row gutter={[32, 40]} justify="center">
        {steps.map((step, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <div className="step-card">
              {/* Stage Circle with line logic in CSS */}
              <div className="stage-wrapper">
                <div className="stage-circle">
                  <span className="stage-num">{step.stage}</span>
                  <span className="stage-text">STAGE</span>
                </div>
              </div>

              <div className="step-content">
                <Title level={4} className="step-heading">{step.heading}</Title>
                <Text type="secondary" className="step-duration">{step.duration}</Text>
              </div>

              <div className="step-img-box">
                <img src={step.img} alt={step.heading} />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProcessSection;