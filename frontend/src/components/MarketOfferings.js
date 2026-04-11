import React from 'react';
import { Row, Col, Typography } from 'antd';
import { 
  FormatPainterOutlined, 
  BuildOutlined, 
  ThunderboltOutlined, 
  HighlightOutlined, 
  AppstoreOutlined, 
  LayoutOutlined 
} from '@ant-design/icons';
import './css/MarketOfferings.css';

const { Title, Text } = Typography;

const offeringsData = [
  {
    icon: <FormatPainterOutlined />,
    title: 'GYPSUM Plastering',
    desc: 'High-quality smooth finish for internal walls.',
    color: '#0066b2'
  },
  {
    icon: <BuildOutlined />,
    title: 'Performance Drywalls',
    desc: 'Advanced drywall systems for better insulation.',
    color: '#00cc66'
  },
  {
    icon: <ThunderboltOutlined />,
    title: 'Wet Area Drywalls',
    desc: 'Moisture resistant solutions for bathrooms.',
    color: '#e31e24'
  },
  {
    icon: <LayoutOutlined />,
    title: 'False Ceilings',
    desc: 'Standard gypsum ceilings for home & office.',
    color: '#ffcc00'
  },
  {
    icon: <AppstoreOutlined />,
    title: 'Exterior Drywalls',
    desc: 'Weather resistant boards for external facades.',
    color: '#7b42f5'
  },
  {
    icon: <HighlightOutlined />,
    title: 'Designer Ceilings',
    desc: 'Premium artistic designs for luxury spaces.',
    color: '#ff66ff'
  }
];

const MarketOfferings = () => {
  return (
    <section className="offerings-section">
      <div className="offerings-header">
        <Text className="offerings-tagline">Urbane Living Market Offerings</Text>
        <Title level={2} className="offerings-main-title">
          System solutions catering to need
        </Title>
      </div>

      <Row gutter={[24, 24]} className="offerings-grid">
        {offeringsData.map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <div className="offering-modern-card" style={{ '--accent-color': item.color }}>
              <div className="offering-icon-box">
                {item.icon}
              </div>
              <div className="offering-text">
                <Title level={4}>{item.title}</Title>
                <Text type="secondary">{item.desc}</Text>
              </div>
              <div className="card-decoration"></div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default MarketOfferings;