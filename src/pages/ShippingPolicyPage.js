import React from 'react';
import { Typography, Breadcrumb, Card, Row, Col, Collapse } from 'antd';
import { 
  HomeOutlined, 
  CarOutlined, 
  ClockCircleOutlined, 
  DollarOutlined, 
  SafetyCertificateOutlined, 
  GlobalOutlined, 
  AimOutlined, 
  QuestionCircleOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const ShippingPolicyPage = () => {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        color: '#fff', 
        padding: '60px 20px', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title level={1} style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: '16px' }}>
            Shipping & Delivery
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
            At Urbane Living, we are dedicated to providing a smooth and reliable delivery experience, ensuring your carefully chosen items arrive safely and on time.
          </Paragraph>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div style={{ maxWidth: '1000px', margin: '-30px auto 0', padding: '0 20px', position: 'relative', zIndex: 2 }}>
        
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
                title: <span style={{ color: '#0f172a', fontWeight: 500 }}>Shipping & Delivery</span> 
              },
            ]}
          />
        </Card>

        {/* Content Card */}
        <Card style={{ borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }} bodyStyle={{ padding: 'clamp(24px, 5vw, 48px)' }}>
          
          {/* Section 1: Shipping Process */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '10px', color: '#2563eb' }}>
                <CarOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Shipping Process</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              Once your order is placed, our team carefully prepares your products for dispatch. Each item is securely packaged to maintain its quality and prevent damage during transit.
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 2: Delivery Timelines */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#f0fdf4', padding: '10px', borderRadius: '10px', color: '#16a34a' }}>
                <ClockCircleOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Delivery Timelines</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', display: 'flex', flexDirection: 'column', gap: '14px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              <div>
                <Text strong style={{ color: '#0f172a' }}>Standard Delivery: </Text>
                5–7 business days after order processing.
              </div>
              <div>
                <Text strong style={{ color: '#0f172a' }}>Express Delivery: </Text>
                2–3 business days after order processing (available for select locations).
              </div>
              <div>
                <Text strong style={{ color: '#0f172a' }}>Customized Furniture & Décor: </Text>
                Made-to-order pieces may require additional production and shipping time. Delivery timelines will be confirmed at the time of purchase.
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 3: Shipping Costs */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '10px', color: '#d97706' }}>
                <DollarOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Shipping Costs</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              Our shipping rates are competitive and based on the size, weight, and delivery location of your order. The exact shipping fee will be displayed during checkout.
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 4: White Glove Delivery */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#f3e8ff', padding: '10px', borderRadius: '10px', color: '#9333ea' }}>
                <SafetyCertificateOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>White Glove Delivery</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              For larger or delicate items, we offer White Glove Delivery. Our trained professionals will deliver, unpack, assemble, and place your items exactly where you want them—leaving your space ready without the hassle.
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 5: International Shipping */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#ccfbf1', padding: '10px', borderRadius: '10px', color: '#0d9488' }}>
                <GlobalOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>International Shipping</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              We provide international delivery to select countries. Shipping times and costs may vary depending on your location and applicable customs regulations.
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 6: Order Tracking */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '10px', color: '#0284c7' }}>
                <AimOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Order Tracking</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              Once your order is shipped, you will receive a confirmation email with tracking details. You can monitor your shipment’s progress directly through our delivery partners.
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 7: Delivery FAQs */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#fee2e2', padding: '10px', borderRadius: '10px', color: '#dc2626' }}>
                <QuestionCircleOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Delivery FAQs</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <Text strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>What if my order is delayed?</Text>
                <Paragraph style={{ color: '#334155', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                  We strive to deliver on time, but in rare cases, unforeseen circumstances may cause delays. We will notify you promptly if your delivery schedule changes.
                </Paragraph>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <Text strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>Can I change my delivery address?</Text>
                <Paragraph style={{ color: '#334155', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                  Yes, you can update your delivery address before your order is shipped by contacting our customer support team.
                </Paragraph>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <Text strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>What if my item arrives damaged?</Text>
                <Paragraph style={{ color: '#334155', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                  If your item arrives damaged, please contact us within 24 hours. We will arrange a replacement or refund depending on the extent of the damage.
                </Paragraph>
              </div>

            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Contact Support Cards */}
          <div>
            <Title level={4} style={{ margin: '0 0 16px', color: '#0f172a', fontWeight: 700 }}>Need Assistance With Your Delivery?</Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MailOutlined style={{ fontSize: '20px', color: '#2563eb' }} />
                  <div>
                    <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>Email Support</Text>
                    <a href="mailto:sales1@urbaneliving.in" style={{ color: '#0f172a', fontWeight: 600 }}>sales1@urbaneliving.in</a>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <PhoneOutlined style={{ fontSize: '20px', color: '#16a34a' }} />
                  <div>
                    <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>Toll-Free Helpline</Text>
                    <a href="tel:18001236407" style={{ color: '#0f172a', fontWeight: 600 }}>1800-123-6407</a>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

        </Card>
      </div>

    </div>
  );
};

export default ShippingPolicyPage;