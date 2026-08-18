import React, { useState } from 'react';
import { Typography, Breadcrumb, Card, Row, Col, Select, Modal, Pagination, Input, Button, Form } from 'antd';
import { 
  HomeOutlined, 
  AppstoreOutlined, 
  CheckCircleOutlined, 
  SafetyCertificateOutlined, 
  RocketOutlined, 
  EyeOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

// Mock data for 21 modular kitchen designs
const allKitchens = [
  { id: 1, title: "Functional Comfort Kitchen", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80", desc: "A practical and cozy kitchen designed for everyday family needs with optimal storage." },
  { id: 2, title: "Functional Comfort Kitchen", img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80", desc: "Sleek and minimalist layout offering a seamless cooking experience." },
  { id: 3, title: "Bold Red Kitchen Charm", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", desc: "A vibrant luxury kitchen featuring bold red cabinetry and modern accents." },
  { id: 4, title: "Bold Green Cabinets with Marble Countertops", img: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=600&q=80", desc: "A luxurious kitchen featuring bold green cabinets, gold accents, and marble countertops." },
  { id: 5, title: "Bold Red Kitchen Charm", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80", desc: "Striking red finish with high-gloss styling and advanced modular storage." },
  { id: 6, title: "Bright & Stylish Kitchen Retreat", img: "https://images.unsplash.com/photo-1556911261-6bd341186b2f?auto=format&fit=crop&w=600&q=80", desc: "Bright lighting combined with stylish light-grey matte finish cabinets." },
  { id: 7, title: "Contemporary Culinary Kitchen", img: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=600&q=80", desc: "Modern architectural design tailored for contemporary urban apartments." },
  { id: 8, title: "Elegant Harmony Kitchen", img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80", desc: "Subtle pastel tones and flawless handle-less cabinet integration." },
  { id: 9, title: "Functional Comfort Kitchen", img: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80", desc: "Engineered for maximum space utilization and effortless workflow." },
  { id: 10, title: "Orange Breeze Kitchen", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80", desc: "Warm and inviting tones designed to uplift your cooking space." },
  { id: 11, title: "Sleek & Functional Kitchen Design", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80", desc: "Streamlined layout maximizing utility with hidden storage options." },
  { id: 12, title: "Sleek Green Kitchen Design", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80", desc: "Soothing sage green aesthetic coupled with durable hardware." },
  { id: 13, title: "Sleek Modern Elegance Kitchen", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80", desc: "Sophisticated styling that delivers both visual charm and utility." },
  { id: 14, title: "Sleek Modern Minimalist Kitchen", img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80", desc: "Clean lines and zero clutter for a truly modern lifestyle." },
  { id: 15, title: "Sleek Modern Minimalist Kitchen", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", desc: "Understated luxury with premium soft-close mechanisms." },
  { id: 16, title: "Sleek Sapphire Kitchen", img: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=600&q=80", desc: "Deep sapphire blue finishes paired with metallic gold profile handles." },
  { id: 17, title: "Stylish Open Shelf Kitchen", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80", desc: "Features open display shelving for quick access and chic decor styling." },
  { id: 18, title: "Stylish Two-tone Kitchen Design", img: "https://images.unsplash.com/photo-1556911261-6bd341186b2f?auto=format&fit=crop&w=600&q=80", desc: "A balanced contrast of dark base units and light upper wall cabinets." },
  { id: 19, title: "Teal Copper Fusion Kitchen", img: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=600&q=80", desc: "Exotic teal color styling accented with brushed copper fixtures." },
  { id: 20, title: "Vibrant Kitchen Design with a Modern Touch", img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80", desc: "Energetic layout designed to brighten up your cooking routines." },
  { id: 21, title: "Warm Modern Kitchen Oasis", img: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80", desc: "Warm wooden finishes creating a serene and welcoming kitchen environment." }
];

const ModularKitchenPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKitchen, setSelectedKitchen] = useState(null);

  const pageSize = 9;

  const sortedKitchens = [...allKitchens].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.id - b.id;
    if (sortBy === 'price-high-low') return b.id - a.id;
    return 0;
  });

  const currentData = sortedKitchens.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const showQuickView = (kitchen) => {
    setSelectedKitchen(kitchen);
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    console.log('Form Submitted values:', values);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
        <div style={{ 
            backgroundImage: 'url(https://spaceinterio.co.in/wp-content/uploads/2024/11/Untitled-design-2024-11-16T130028.315-jpg.webp)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[30, 30]} align="middle">
            
            {/* Left Column: Heading and description */}
            <Col xs={24} lg={14}>
              <AppstoreOutlined style={{ fontSize: '36px', marginBottom: '16px', color: '#38bdf8' }} />
              <Title level={1} style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: '16px' }}>
                Modular Kitchen Designs
              </Title>
              <Paragraph style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
                At Urbane Living, we believe the kitchen is the heart of your home—a place where functionality meets style. Discover our exclusive range of custom-crafted layouts.
              </Paragraph>
            </Col>

            {/* Right Column: Lead Capture Form */}
            <Col xs={24} lg={10}>
              <Card 
                style={{ 
                  borderRadius: '16px', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)', 
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
        {/* Breadcrumb Card */}
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
                title: <span style={{ color: '#0f172a', fontWeight: 500 }}>Modular Kitchen</span> 
              },
            ]}
          />
        </Card>
        {/* Why Choose Our Modular Kitchens Section */}
        <Card style={{ borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '32px' }} bodyStyle={{ padding: 'clamp(24px, 4vw, 40px)' }}>
            <Title level={3} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '20px' }}>
                Why Choose Our Modular Kitchens?
            </Title>
          
            <Row gutter={[20, 20]}>
                <Col xs={24} md={12}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <CheckCircleOutlined style={{ fontSize: '20px', color: '#2563eb', marginTop: '4px' }} />
                        <div>
                        <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>Personalised Designs</Text>
                        <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                            We tailor each kitchen to your specific needs, ensuring a perfect blend of aesthetics and practicality.
                        </Paragraph>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <SafetyCertificateOutlined style={{ fontSize: '20px', color: '#16a34a', marginTop: '4px' }} />
                        <div>
                        <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>Premium Materials</Text>
                        <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                            Utilizing high-quality materials, our kitchens are built to withstand daily use and stand the test of time.
                        </Paragraph>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <RocketOutlined style={{ fontSize: '20px', color: '#d97706', marginTop: '4px' }} />
                        <div>
                        <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>Innovative Storage Solutions</Text>
                        <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                            Maximize your kitchen’s potential with smart storage options that keep everything within easy reach.
                        </Paragraph>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <CheckCircleOutlined style={{ fontSize: '20px', color: '#9333ea', marginTop: '4px' }} />
                        <div>
                        <Text strong style={{ color: '#0f172a', fontSize: '15px', display: 'block', marginBottom: '4px' }}>Seamless Integration</Text>
                        <Paragraph style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                            Our designs accommodate modern appliances, ensuring a cohesive and clutter-free environment.
                        </Paragraph>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>

        {/* Catalog Control Bar (Results count & Sorting) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <Text type="secondary" style={{ fontSize: '14px', fontWeight: 500 }}>
            Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, allKitchens.length)} of {allKitchens.length} results
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

        {/* Grid of Kitchen Cards */}
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

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={allKitchens.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>

      </div>

      {/* Quick View Modal */}
      <Modal
        title={selectedKitchen?.title}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={700}
      >
        {selectedKitchen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <img 
              src={selectedKitchen.img} 
              alt={selectedKitchen.title} 
              style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '8px' }} 
            />
            <Paragraph style={{ color: '#334155', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
              {selectedKitchen.desc}
            </Paragraph>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default ModularKitchenPage;