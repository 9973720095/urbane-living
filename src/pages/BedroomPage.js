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

// Exact Bedroom data matching the required format with 3-line modal descriptions (Limited to 2 pages = 18 items)
const allBedrooms = [
  { 
    id: 1, 
    title: "Bamboo Sanctuary Bedroom", 
    img: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=600&q=80", 
    desc: "A soothing bamboo-inspired sanctuary designed to offer ultimate relaxation.\nSeamlessly blends organic textures with modern minimalistic bedroom aesthetics.\nCrafted to maximize comfort while keeping your sleeping space airy and peaceful." 
  },
  { 
    id: 2, 
    title: "Bohemian Stone Escape", 
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80", 
    desc: "A charming bohemian escape featuring earthy stone tones and natural elements.\nRich textures and warm finishes bring a cozy yet graceful look to your interiors.\nOffers a tranquil atmosphere designed for restful nights and peaceful mornings." 
  },
  { 
    id: 3, 
    title: "Bohemian Vibe Bedroom", 
    img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80", 
    desc: "Boho-chic bedroom layout offering a natural, breathable, and artistic aesthetic.\nCrafted using high-grade eco-friendly materials and plush bedding elements.\nAdds a touch of organic warmth and vibrant character to contemporary homes." 
  },
  { 
    id: 4, 
    title: "Bold Wood Panel Bedroom", 
    img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80", 
    desc: "Sophisticated wood panel accent wall paired with contemporary lighting elements.\nFeatures rich architectural details that anchor the room with stunning depth.\nA timeless statement piece that infuses luxury and warmth into your home decor." 
  },
  { 
    id: 5, 
    title: "Botanical Dream Escape Bedroom", 
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80", 
    desc: "Nature-themed botanical aesthetics that bring the outdoors right into your room.\nEngineered for high aesthetic appeal and a calming, green-inspired environment.\nTransforms ordinary sleeping quarters into an ultra-refreshing private retreat." 
  },
  { 
    id: 6, 
    title: "Calming Harmony Bedroom", 
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80", 
    desc: "An artistic fusion of soothing color palettes and premium upholstered furniture.\nIdeal for unwinding after a long day in an environment built for tranquility.\nBrings architectural grace and sophisticated styling to your personal space." 
  },
  { 
    id: 7, 
    title: "Chic Expedition Bedroom", 
    img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80", 
    desc: "Sleek contemporary bedroom setup featuring stylish upholstered headboards.\nBuilt with premium textures, plush layers, and durable furniture finishes.\nKeeps your personal sanctuary looking immaculately organized and inviting." 
  },
  { 
    id: 8, 
    title: "Floral Bliss Bedroom", 
    img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80", 
    desc: "A cozy nook setup combining gentle floral tones, soft lighting, and plush textiles.\nDesigned meticulously to turn compact rooms into high-utility comfort zones.\nBlends traditional elegance and modern luxury for a seamless daily routine." 
  },
  { 
    id: 9, 
    title: "Minimalist Zen Bedroom", 
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80", 
    desc: "Luxurious minimalist layout highlighted by clean lines and neutral tones.\nCombines high-end simplicity with supreme spatial openness and clarity.\nAn absolute masterpiece that redefines peace and opulent bedroom styling." 
  },
  // Page 2 items (9 items to make total 18 items for exactly 2 pages)
  { 
    id: 10, 
    title: "Modern Scandinavian Bedroom", 
    img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80", 
    desc: "Light wood tones and crisp white fabrics tailored for bright modern homes.\nSmooth layouts with clutter-free surfaces and functional bedside integration.\nOffers maximum relaxation with a clean and airy Scandinavian vibe." 
  },
  { 
    id: 11, 
    title: "Royal Velvet Luxe Bedroom", 
    img: "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=600&q=80", 
    desc: "Rich velvet headboard panels paired with elegant metallic gold accents.\nProvides a five-star boutique hotel feel right inside your master bedroom.\nConstructed with premium padding and high-end luxury upholstery." 
  },
  { 
    id: 12, 
    title: "Urban Industrial Bedroom", 
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80", 
    desc: "Exposed architectural features paired with warm leather and matte black iron.\nIncludes clever hidden lighting and sturdy multi-functional framing.\nDesigned for ultimate modern attitude and urban lifestyle appeal." 
  },
  { 
    id: 13, 
    title: "Pristine White Haven Bedroom", 
    img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80", 
    desc: "All-white monochrome layering that amplifies natural light and spaciousness.\nBrings timeless purity, serenity, and robust durability to your quarters.\nEquipped with soft fabric finishes for a peaceful resting experience." 
  },
  { 
    id: 14, 
    title: "Warm Walnut Contemporary Bedroom", 
    img: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=600&q=80", 
    desc: "Rich walnut wood grains matched with ambient warm LED strip lighting.\nReflects a sophisticated earthy tone that grounds the entire bedroom decor.\nMinimalist design philosophy tailored for high-end urban residences." 
  },
  { 
    id: 15, 
    title: "Classic Vintage Haven Bedroom", 
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80", 
    desc: "Classic tufted paneling ensuring an aura of timeless vintage elegance.\nCombines heritage architectural appeal with modern structural comfort.\nHand-finished carpentry details for an authentic and cozy atmosphere." 
  },
  { 
    id: 16, 
    title: "Compact Urban Suite Bedroom", 
    img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80", 
    desc: "Smart multi-utility furniture layout built specifically for compact apartments.\nIntegrates smart storage beds and streamlined wall units compactly.\nMaximizes floor space utilization without compromising on style." 
  },
  { 
    id: 17, 
    title: "Fluted Panel Luxe Bedroom", 
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80", 
    desc: "Trendy vertical fluted wall panels creating stunning visual depth.\nAn exquisite statement design that elevates modern bedroom architecture.\nBuilt with high-density materials for long-lasting structural stability." 
  },
  { 
    id: 18, 
    title: "Monochrome Elegance Bedroom", 
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80", 
    desc: "Deep charcoal and crisp cream contrasts framed with subtle metallic inlay.\nExudes pure opulence and high-end contemporary interior styling.\nTailored precisely for luxury villas and upscale modern homes." 
  }
];

const BedroomPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBedroom, setSelectedBedroom] = useState(null);

  const pageSize = 9;

  const sortedBedrooms = [...allBedrooms].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.id - b.id;
    if (sortBy === 'price-high-low') return b.id - a.id;
    return 0;
  });

  const currentData = sortedBedrooms.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const showQuickView = (bedroom) => {
    setSelectedBedroom(bedroom);
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    console.log('Form Submitted values:', values);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Hero Banner */}
      <div style={{ 
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 40%)), url(https://spaceinterio.co.in/wp-content/uploads/2024/11/Untitled-design-2024-11-16T131922.387-jpg.webp)',
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
                Bedroom Designs
              </Title>
              <Paragraph style={{ color: '#e2e8f0', fontSize: '16px', lineHeight: 1.6, margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                Your bedroom should be more than just a place to sleep, it's your personal sanctuary, a reflection of your style and comfort. At Urbane Living, we craft bedroom designs that combine elegance, functionality, and warmth, ensuring your space feels uniquely yours.
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
                title: <span style={{ color: '#0f172a', fontWeight: 500 }}>Bedroom</span> 
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
                          <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>1. Customized Layouts</Text>
                          <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                              Whether you want a minimalistic modern vibe or a cozy, traditional feel, we design bedrooms to suit your preferences.
                          </Paragraph>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <SafetyCertificateOutlined style={{ fontSize: '20px', color: '#16a34a', marginTop: '4px' }} />
                        <div>
                          <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>2. Smart Storage Solutions</Text>
                          <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                              From built-in wardrobes to hidden compartments, we optimize space while maintaining aesthetics.
                          </Paragraph>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <RocketOutlined style={{ fontSize: '20px', color: '#d97706', marginTop: '4px' }} />
                        <div>
                          <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>3. Premium Materials</Text>
                          <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                              We use high-quality materials to ensure durability and long-lasting beauty.
                          </Paragraph>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <CheckCircleOutlined style={{ fontSize: '20px', color: '#9333ea', marginTop: '4px' }} />
                        <div>
                          <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>4. Soothing Ambiance</Text>
                          <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                              Our designs incorporate calming color palettes and innovative lighting to create a relaxing environment.
                          </Paragraph>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>

        {/* Catalog Control Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <Text type="secondary" style={{ fontSize: '14px', fontWeight: 500 }}>
            Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, allBedrooms.length)} of {allBedrooms.length} results
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

        {/* Grid of Bedroom Cards */}
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
            total={allBedrooms.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>

      </div>

      {/* Quick View Modal with 3-Line Attractive Description */}
      <Modal
        title={<span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{selectedBedroom?.title}</span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={700}
      >
        {selectedBedroom && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px 0' }}>
            <img 
              src={selectedBedroom.img} 
              alt={selectedBedroom.title} 
              style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '10px' }} 
            />
            <div style={{ backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #16a34a' }}>
              <Paragraph style={{ color: '#334155', fontSize: '15px', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line', fontWeight: 500 }}>
                {selectedBedroom.desc}
              </Paragraph>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default BedroomPage;