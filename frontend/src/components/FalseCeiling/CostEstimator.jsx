import React, { useState, useMemo } from 'react';
import { 
  Slider, 
  InputNumber, 
  Row, 
  Col, 
  Card, 
  Typography, 
  Divider, 
  Button, 
  Tag, 
  Tooltip 
} from 'antd';
import { 
  CalculatorOutlined, 
  CheckCircleFilled, 
  InfoCircleOutlined, 
  ThunderboltOutlined,
  BlockOutlined,
  WhatsAppOutlined,
  FileProtectOutlined
} from '@ant-design/icons';
import '../FalseCeilingCSS/CostEstimator.css';


const { Title, Text, Paragraph } = Typography;

const CostEstimator = () => {
  // State for Calculator
  const [area, setArea] = useState(350);
  const [material, setMaterial] = useState('Premium Gypsum');
  const [complexity, setComplexity] = useState(1.0); // 1.0: Basic, 1.2: Standard, 1.5: Luxury
  const [lightPoints, setLightPoints] = useState(10);

  // Configuration Constants
  const materials = [
    { name: 'Standard POP', rate: 95, color: '#f0f2f5' },
    { name: 'Premium Gypsum', rate: 115, color: '#e6f7ff' },
    { name: 'PVC Panel', rate: 145, color: '#f6ffed' },
    { name: 'Luxe Wooden', rate: 210, color: '#fff7e6' }
  ];

  const designTiers = [
    { label: 'Basic', sub: 'Single Level', value: 1.0 },
    { label: 'Standard', sub: 'Cove Lights', value: 1.2 },
    { label: 'Luxury', sub: 'Multi-Tier', value: 1.5 }
  ];

  const LIGHT_RATE = 450;

  // Real-time Calculations
  const calculations = useMemo(() => {
    const selectedRate = materials.find(m => m.name === material)?.rate || 0;
    const baseCost = area * selectedRate * complexity;
    const lightingCost = lightPoints * LIGHT_RATE;
    const total = baseCost + lightingCost;
    
    return {
      base: Math.round(baseCost),
      lighting: Math.round(lightingCost),
      total: Math.round(total),
      perSqFt: Math.round(total / area)
    };
  }, [area, material, complexity, lightPoints]);

  return (
    <div style={{ padding: '60px 20px', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <Tag color="blue" icon={<CalculatorOutlined />} style={{ padding: '4px 12px', borderRadius: 4, marginBottom: 16 }}>
            SMART PRICING ENGINE
          </Tag>
          <Title level={2} style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>
            Instant Cost Estimator
          </Title>
          <Paragraph type="secondary" style={{ fontSize: 18, marginTop: 10 }}>
            Get a transparent, itemized quote for your interior ceiling project.
          </Paragraph>
        </div>

        <Row gutter={[40, 40]}>
          {/* Left Column: Controls */}
          <Col xs={24} lg={15}>
            <div style={{ background: '#f8fafc', padding: 40, borderRadius: 32, border: '1px solid #edf2f7' }}>
              
              {/* Step 1: Area Selection */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                  <Text strong style={{ fontSize: 16 }}>1. Define Total Area (Sq. Ft.)</Text>
                  <InputNumber 
                    min={50} 
                    max={5000} 
                    value={area} 
                    onChange={setArea} 
                    style={{ borderRadius: 8, width: 100 }}
                    formatter={value => `${value} ft²`}
                  />
                </div>
                <Slider 
                  min={50} 
                  max={2500} 
                  step={10} 
                  value={area} 
                  onChange={setArea}
                  trackStyle={{ background: '#1890ff', height: 6 }}
                  handleStyle={{ borderColor: '#1890ff', height: 20, width: 20 }}
                />
              </div>

              {/* Step 2: Material Selection */}
              <div style={{ marginBottom: 40 }}>
                <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 20 }}>
                  2. Select Material Grade <Tooltip title="Rates vary based on durability and finish quality"><InfoCircleOutlined /></Tooltip>
                </Text>
                <Row gutter={[12, 12]}>
                  {materials.map(m => (
                    <Col xs={12} sm={6} key={m.name}>
                      <div 
                        onClick={() => setMaterial(m.name)}
                        style={{
                          background: material === m.name ? m.color : '#fff',
                          border: `2px solid ${material === m.name ? '#1890ff' : '#e2e8f0'}`,
                          padding: '16px 10px',
                          borderRadius: 16,
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          height: '100%'
                        }}
                      >
                        <BlockOutlined style={{ fontSize: 24, color: material === m.name ? '#1890ff' : '#94a3b8', marginBottom: 8 }} />
                        <Text strong style={{ display: 'block', fontSize: 12 }}>{m.name}</Text>
                        <Text type="secondary" style={{ fontSize: 10 }}>₹{m.rate}/sqft</Text>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Step 3: Design Complexity & Lighting */}
              <Row className='designer_electrical_m-view' gutter={32}>
                <Col span={12} xs={24} md={12}>
                  <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 20 }}>3. Design Tier</Text>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {designTiers.map(tier => (
                      <div 
                        key={tier.label}
                        onClick={() => setComplexity(tier.value)}
                        style={{
                          padding: '12px 20px',
                          borderRadius: 12,
                          border: '1.5px solid',
                          borderColor: complexity === tier.value ? '#1890ff' : '#e2e8f0',
                          background: complexity === tier.value ? '#e6f7ff' : '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <Text strong style={{ display: 'block' }}>{tier.label}</Text>
                          <Text type="secondary" style={{ fontSize: 11 }}>{tier.sub}</Text>
                        </div>
                        {complexity === tier.value && <CheckCircleFilled style={{ color: '#1890ff' }} />}
                      </div>
                    ))}
                  </div>
                </Col>
                <Col span={12} xs={24} md={12}>
                  <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 20 }}>4. Electrical Points</Text>
                  <div style={{ background: '#fff', padding: 25, borderRadius: 20, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <ThunderboltOutlined style={{ fontSize: 32, color: '#faad14', marginBottom: 15 }} />
                    <InputNumber 
                      min={0} 
                      max={100} 
                      value={lightPoints} 
                      onChange={setLightPoints} 
                      style={{ width: '100%', borderRadius: 8 }}
                      size="large"
                      addonBefore="LED Points"
                    />
                    <Text type="secondary" style={{ fontSize: 11, marginTop: 10, display: 'block' }}>
                      Market average: ₹450 per point
                    </Text>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Right Column: Quote Summary */}
          <Col xs={24} lg={9}>
            <div style={{ 
              background: '#001529', 
              borderRadius: 32, 
              padding: '45px 35px', 
              color: 'white', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'sticky',
              top: 100
            }}>
              <Title level={4} style={{ color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1, fontSize: 14 }}>
                Estimated Investment
              </Title>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 10 }}>
                <span style={{ fontSize: 56, fontWeight: 800 }}>₹{calculations.total.toLocaleString()}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18 }}>*</span>
              </div>
              <Text style={{ color: '#52c41a', display: 'block', marginTop: -5, fontWeight: 600 }}>
                Approx. ₹{calculations.perSqFt} per sq. ft.
              </Text>

              <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '30px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'rgba(255,255,255,0.6)' }}>Ceiling Fabrication</Text>
                  <Text style={{ color: '#fff' }}>₹{calculations.base.toLocaleString()}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'rgba(255,255,255,0.6)' }}>Electrical & Lights</Text>
                  <Text style={{ color: '#fff' }}>₹{calculations.lighting.toLocaleString()}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'rgba(255,255,255,0.6)' }}>GST (Estimated)</Text>
                  <Text style={{ color: '#fff' }}>Included</Text>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: '20px', marginTop: 35 }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <FileProtectOutlined style={{ color: '#1890ff', fontSize: 20 }} />
                  <Text style={{ color: '#fff', fontSize: 12 }}>Lifetime Anti-Crack Warranty</Text>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <CheckCircleFilled style={{ color: '#52c41a', fontSize: 20 }} />
                  <Text style={{ color: '#fff', fontSize: 12 }}>Installation in 7-10 Working Days</Text>
                </div>
              </div>

              <Button 
                block 
                type="primary" 
                size="large" 
                style={{ 
                  height: 60, 
                  borderRadius: 15, 
                  marginTop: 35, 
                  fontWeight: 700, 
                  fontSize: 16,
                  background: '#1890ff',
                  border: 'none',
                  boxShadow: '0 10px 20px rgba(24,144,255,0.3)'
                }}
              >
                Get Full PDF Breakdown
              </Button>

              <Button 
                block 
                icon={<WhatsAppOutlined />}
                size="large" 
                style={{ 
                  height: 60, 
                  borderRadius: 15, 
                  marginTop: 15, 
                  fontWeight: 600, 
                  background: 'transparent',
                  color: '#25d366',
                  borderColor: '#25d366'
                }}
              >
                Chat with Expert
              </Button>

              <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 20, fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                *Actual costs may vary based on site conditions and final measurements.
              </Text>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CostEstimator;