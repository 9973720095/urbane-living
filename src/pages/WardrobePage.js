import React, { useState } from 'react';
import { Typography, Breadcrumb, Card, Row, Col, Select, Modal, Pagination, Input, Button, Form } from 'antd';
import { 
  HomeOutlined, 
  AppstoreOutlined, 
  CheckCircleOutlined, 
  SafetyCertificateOutlined, 
  RocketOutlined, 
  EyeOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

// Exact Wardrobe data with precise matching wardrobe images and 3-line modal descriptions (Limited to 2 pages = 18 items)
const allWardrobes = [
  { 
    id: 1, 
    title: "Beige Wardrobe with Mirror", 
    img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80", 
    desc: "A sophisticated beige wardrobe featuring an integrated full-length mirror.\nIt seamlessly blends modern utility with minimalist bedroom aesthetics.\nDesigned to maximize storage while keeping your room looking spacious and bright." 
  },
  { 
    id: 2, 
    title: "Blue Alcove Wardrobe", 
    img: "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=600&q=80", 
    desc: "A charming blue alcove wardrobe custom-built to utilize awkward corner spaces.\nRich tone and clean finishes bring a bold yet graceful look to your interiors.\nOffers specialized compartments for organized and clutter-free clothing storage." 
  },
  { 
    id: 3, 
    title: "Cane Panel Wardrobe", 
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80", 
    desc: "Boho-chic cane panel wardrobe offering a natural, breathable, and airy aesthetic.\nCrafted using high-grade eco-friendly materials and sturdy wooden framing.\nAdds a touch of organic warmth and elegance to contemporary bedrooms." 
  },
  { 
    id: 4, 
    title: "Classic Green Wardrobe", 
    img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80", 
    desc: "Sophisticated deep green finish paired with classic metallic hardware accents.\nFeatures ample compartmentalized storage for apparel, accessories, and shoes.\nA timeless statement piece that infuses royal charm into modern home decor." 
  },
  { 
    id: 5, 
    title: "Clean-lined Storage with Pop of Color and Statement Lighting", 
    img: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=600&q=80", 
    desc: "Modern clean lines accented with a vibrant pop of color and warm integrated lighting.\nEngineered for high efficiency and smart organization of your everyday wardrobe.\nTransforms ordinary wall space into an ultra-modern luxury dressing zone." 
  },
  { 
    id: 6, 
    title: "Contemporary Bookcase with Arches", 
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80", 
    desc: "An artistic fusion of concealed wardrobe storage and contemporary arched open shelving.\nIdeal for displaying books, artifacts, and personal luxury collectibles.\nBrings architectural grace and sophisticated styling to your living space." 
  },
  { 
    id: 7, 
    title: "Contemporary Wardrobe with Shelf", 
    img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80", 
    desc: "Sleek contemporary wardrobe configuration featuring highly functional display shelving.\nBuilt with premium smooth-glide tracks and durable scratch-resistant panels.\nKeeps your frequently used essentials neatly organized and instantly accessible." 
  },
  { 
    id: 8, 
    title: "Cozy Nook Closet with Mirror", 
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80", 
    desc: "A cozy nook setup combining custom seating, specialized storage, and a stylish mirror.\nDesigned meticulously to utilize compact alcoves into high utility dressing corners.\nBlends comfort and luxury for a seamless daily styling routine." 
  },
  { 
    id: 9, 
    title: "Elegant Modern Wardrobe with Arched Design", 
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80", 
    desc: "Luxurious modern wardrobe highlighted by graceful arched door panel moldings.\nCombines high-end craftsmanship with supreme internal hardware durability.\nAn absolute masterpiece that redefines elegance and opulent bedroom styling." 
  },
  // Page 2 items (9 items to make total 18 items for exactly 2 pages)
  { 
    id: 10, 
    title: "Minimalist Sliding Wardrobe", 
    img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80", 
    desc: "Space-saving sliding doors designed for compact modern bedrooms.\nSmooth sliding mechanism with sleek aluminum edge profiles.\nOffers maximum internal hanging and drawer capacity." 
  },
  { 
    id: 11, 
    title: "Lustrous Glass Door Wardrobe", 
    img: "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=600&q=80", 
    desc: "Transparent tinted glass doors with integrated LED strip lighting.\nProvides a boutique-like display feel for your luxury attire.\nConstructed with reinforced safety glass and sturdy framing." 
  },
  { 
    id: 12, 
    title: "Matte Finish Walk-in Closet", 
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80", 
    desc: "Expansive walk-in wardrobe system with premium matte laminate finish.\nIncludes dedicated shoe racks, tie pull-outs, and jewelry trays.\nDesigned for ultimate luxury and seamless clothing accessibility." 
  },
  { 
    id: 13, 
    title: "Dual Tone Wooden Wardrobe", 
    img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80", 
    desc: "Beautiful combination of light oak and dark walnut wooden textures.\nBrings natural warmth and robust durability to your sleeping quarters.\nEquipped with soft-close hinges for a silent, premium experience." 
  },
  { 
    id: 14, 
    title: "Glossy White Handleless Wardrobe", 
    img: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=600&q=80", 
    desc: "Clean push-to-open mechanism with high-gloss pristine white finish.\nReflects natural light to make smaller bedrooms look bigger and brighter.\nMinimalist design philosophy tailored for contemporary apartments." 
  },
  { 
    id: 15, 
    title: "Vintage Louvered Door Wardrobe", 
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80", 
    desc: "Classic louvered shutter design ensuring natural ventilation inside.\nCombines vintage architectural appeal with modern internal shelving.\nHand-finished carpentry details for an authentic heritage look." 
  },
  { 
    id: 16, 
    title: "Compact Studio Apartment Closet", 
    img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80", 
    desc: "Smart multi-utility storage unit built specifically for studio homes.\nIntegrates loft storage, clothing racks, and side drawers compactly.\nMaximizes vertical space utilization without feeling bulky." 
  },
  { 
    id: 17, 
    title: "Fluted Panel Accent Wardrobe", 
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80", 
    desc: "Trendy vertical fluted wooden slats creating stunning visual texture.\nAn exquisite statement piece that elevates modern interior styling.\nBuilt with high-density engineered wood for long-lasting stability." 
  },
  { 
    id: 18, 
    title: "Royal Metallic Trim Wardrobe", 
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80", 
    desc: "Deep charcoal matte panels framed with brushed gold metallic inlay.\n exudes pure opulence and high-end architectural craftsmanship.\nTailored for luxury villas and upscale modern residences." 
  }
];

const WardrobePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWardrobe, setSelectedWardrobe] = useState(null);

  const pageSize = 9;

  const sortedWardrobes = [...allWardrobes].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.id - b.id;
    if (sortBy === 'price-high-low') return b.id - a.id;
    return 0;
  });

  const currentData = sortedWardrobes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const showQuickView = (wardrobe) => {
    setSelectedWardrobe(wardrobe);
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    console.log('Form Submitted values:', values);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Hero Banner */}
      <div style={{ 
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 40%)), url(https://spaceinterio.co.in/wp-content/uploads/2024/11/Untitled-design-2024-11-16T131546.776-jpg.webp)',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '60px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[30, 30]} align="middle">
            
            <Col xs={24} lg={14}>
              <AppstoreOutlined style={{ fontSize: '36px', marginBottom: '16px', color: '#38bdf8' }} />
              <Title level={1} style={{ color: '#ffffff', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                Wardrobe Interior Design
              </Title>
              <Paragraph style={{ color: '#e2e8f0', fontSize: '16px', lineHeight: 1.6, margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                We specialize in transforming ordinary spaces into extraordinary living environments, offering wardrobes that effortlessly blend style and practicality. With bespoke designs, our wardrobe solutions redefine organization, incorporating modern aesthetics and smart storage options tailored to your unique lifestyle.
              </Paragraph>
            </Col>

            <Col xs={24} lg={10}>
              <Card 
                style={{ 
                  borderRadius: '16px', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)', 
                  border: 'none',
                  backgroundColor: '#ffffff'
                }} 
                bodyStyle={{ padding: '24px' }}
              >
                <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '16px', textAlign: 'center', fontSize: '18px' }}>
                  Beautiful Designs That Fit Your Budget
                </Title>
                
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input placeholder="First Name" size="large" style={{ borderRadius: '8px' }} />
                  </Form.Item>

                  <Form.Item name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                    <Input 
                      addonBefore="+91" 
                      placeholder="Phone Number" 
                      size="large" 
                      style={{ borderRadius: '8px' }} 
                    />
                  </Form.Item>

                  <Form.Item name="email" rules={[{ type: 'email', message: 'Please enter a valid email!' }, { required: true, message: 'Please input your email!' }]}>
                    <Input placeholder="Enter Your Email" size="large" style={{ borderRadius: '8px' }} />
                  </Form.Item>

                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      size="large" 
                      block 
                      style={{ backgroundColor: '#dc2626', borderColor: '#dc2626', fontWeight: 700, borderRadius: '8px', height: '45px' }}
                    >
                      Get Free Quote
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

          </Row>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '0 20px' }}> 
        
        <Card style={{ marginBottom: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }} bodyStyle={{ padding: '16px 24px' }}>
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', textDecoration: 'none' }}>
                    <HomeOutlined /> Home
                  </Link>
                ),
              },
              { 
                title: <span style={{ color: '#0f172a', fontWeight: 500 }}>Wardrobe</span> 
              },
            ]}
          />
        </Card>

        <Card style={{ borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '32px' }} bodyStyle={{ padding: 'clamp(24px, 4vw, 40px)' }}>
            <Title level={3} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '20px' }}>
                Why Urbane Living Stands Out
            </Title>
          
            <Row gutter={[20, 20]}>
                <Col xs={24} md={12}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <CheckCircleOutlined style={{ fontSize: '20px', color: '#2563eb', marginTop: '4px' }} />
                        <div>
                          <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>1. Innovative Designs</Text>
                          <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                              Wardrobes that combine cutting edge technology with timeless style.
                          </Paragraph>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <SafetyCertificateOutlined style={{ fontSize: '20px', color: '#16a34a', marginTop: '4px' }} />
                        <div>
                          <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>2. Quality You Can Trust</Text>
                          <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                              Every wardrobe is built to last, using top notch materials and expert craftsmanship.
                          </Paragraph>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <RocketOutlined style={{ fontSize: '20px', color: '#d97706', marginTop: '4px' }} />
                        <div>
                          <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>3. Affordable Luxury</Text>
                          <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                              High end wardrobe solutions designed to fit your budget.
                          </Paragraph>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <CheckCircleOutlined style={{ fontSize: '20px', color: '#9333ea', marginTop: '4px' }} />
                        <div>
                          <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>4. On-Time Delivery</Text>
                          <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                              Your dream wardrobe, delivered and installed without delays.
                          </Paragraph>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>

        {/* Catalog Control Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <Text type="secondary" style={{ fontSize: '14px', fontWeight: 500 }}>
            Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, allWardrobes.length)} of {allWardrobes.length} results
          </Text>
          
          <Select
            defaultValue="default"
            style={{ width: 200 }}
            onChange={(value) => setSortBy(value)}
            options={[
              { value: 'default', label: 'Default sorting' },
              { value: 'price-low-high', label: 'Sort by price: low to high' },
              { value: 'price-high-low', label: 'Sort by price: high to low' },
            ]}
          />
        </div>

        {/* Grid of Wardrobe Cards */}
        <Row gutter={[20, 20]} style={{ marginBottom: '40px' }}>
          {currentData.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.id}>
              <Card
                hoverable
                style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', height: '100%' }}
                cover={
                  <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                    <img 
                      alt={item.title} 
                      src={item.img} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div 
                      onClick={() => showQuickView(item)}
                      style={{ 
                        position: 'absolute', 
                        bottom: '12px', 
                        right: '12px', 
                        backgroundColor: '#16a34a', 
                        color: '#fff', 
                        padding: '6px 12px', 
                        borderRadius: '6px', 
                        fontSize: '12px', 
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    >
                      <EyeOutlined /> Quick View
                    </div>
                  </div>
                }
                bodyStyle={{ padding: '20px' }}
              >
                <Title level={5} style={{ color: '#0f172a', fontWeight: 700, margin: 0 }}>
                  {item.title}
                </Title>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination restricted to 2 pages */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={allWardrobes.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>

      </div>

      {/* Quick View Modal with 3-Line Attractive Description */}
      <Modal
        title={<span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{selectedWardrobe?.title}</span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={700}
      >
        {selectedWardrobe && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px 0' }}>
            <img 
              src={selectedWardrobe.img} 
              alt={selectedWardrobe.title} 
              style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '10px' }} 
            />
            <div style={{ backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #16a34a' }}>
              <Paragraph style={{ color: '#334155', fontSize: '15px', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line', fontWeight: 500 }}>
                {selectedWardrobe.desc}
              </Paragraph>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default WardrobePage;