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
    color: '#4167B3'
  },
  {
    icon: <BuildOutlined />,
    title: 'Performance Drywalls',
    desc: 'Advanced drywall systems for better insulation.',
    color: '#E40B12'
  },
  {
    icon: <ThunderboltOutlined />,
    title: 'Wet Area Drywalls',
    desc: 'Moisture resistant solutions for bathrooms.',
    color: '#1F2A44'
  },
  {
    icon: <LayoutOutlined />,
    title: 'False Ceilings',
    desc: 'Standard gypsum ceilings for home & office.',
    color: '#4167B3'
  },
  {
    icon: <AppstoreOutlined />,
    title: 'Exterior Drywalls',
    desc: 'Weather resistant boards for external facades.',
    color: '#E40B12'
  },
  {
    icon: <HighlightOutlined />,
    title: 'Designer Ceilings',
    desc: 'Premium artistic designs for luxury spaces.',
    color: '#1F2A44'
  }
];

const MarketOfferings = ({ onOpenForm }) => {
  return (
    <section className="offerings-section">
      <div className="offerings-header">
        <Text className="offerings-tagline" style={{ color: 'var(--brand-red, #E40B12)' }}>Urbane Living Market Offerings</Text>
        <Title level={2} className="offerings-main-title">
          System solutions catering to need
        </Title>
      </div>

      <Row gutter={[24, 24]} className="offerings-grid">
        {offeringsData.map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <div 
              className="offering-modern-card" 
              // Safe check add kiya hai: agar onOpenForm function hai tabhi call ho
              onClick={() => typeof onOpenForm === 'function' && onOpenForm()} 
              style={{ '--accent-color': item.color, cursor: 'pointer' }}
            >
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