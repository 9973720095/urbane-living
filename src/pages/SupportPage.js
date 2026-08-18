import React from 'react';
import { Typography, Breadcrumb, Card, Row, Col } from 'antd';
import { 
  HomeOutlined, 
  CustomerServiceOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined, 
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const SupportPage = () => {
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
            Customer Support & Help Center
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
            We are here to help! Whether you have questions about our interior design services, orders, shipping, or warranties, our team is ready to assist you.
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
                title: <span style={{ color: '#0f172a', fontWeight: 500 }}>Support</span> 
              },
            ]}
          />
        </Card>

        {/* Content Card */}
        <Card style={{ borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }} bodyStyle={{ padding: 'clamp(24px, 5vw, 48px)' }}>
          
          {/* Section 1: Get in Touch (Contact Cards) */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '10px', color: '#2563eb' }}>
                <CustomerServiceOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Get in Touch With Us</Title>
            </div>
            
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px', height: '100%' }}>
                  <div style={{ background: '#dbeafe', padding: '12px', borderRadius: '10px', color: '#2563eb' }}>
                    <PhoneOutlined style={{ fontSize: '24px' }} />
                  </div>
                  <div>
                    <Text type="secondary" style={{ display: 'block', fontSize: '12px', fontWeight: 500 }}>Toll-Free Helpline</Text>
                    <a href="tel:18001236407" style={{ color: '#0f172a', fontWeight: 700, fontSize: '16px' }}>1800-123-6407</a>
                    <Text type="secondary" style={{ display: 'block', fontSize: '11px', marginTop: '2px' }}>Mon - SUN (9:30 AM - 6:30 PM)</Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px', height: '100%' }}>
                  <div style={{ background: '#dcfce7', padding: '12px', borderRadius: '10px', color: '#16a34a' }}>
                    <MailOutlined style={{ fontSize: '24px' }} />
                  </div>
                  <div>
                    <Text type="secondary" style={{ display: 'block', fontSize: '12px', fontWeight: 500 }}>Email Support</Text>
                    <a href="mailto:sales1@urbaneliving.in" style={{ color: '#0f172a', fontWeight: 700, fontSize: '15px' }}>sales1@urbaneliving.in</a>
                    <Text type="secondary" style={{ display: 'block', fontSize: '11px', marginTop: '2px' }}>We reply within 24 hours</Text>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 2: Office & Business Hours */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#f0fdf4', padding: '10px', borderRadius: '10px', color: '#16a34a' }}>
                <EnvironmentOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Our Office & Working Hours</Title>
            </div>
            
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', height: '100%' }}>
                  <Text strong style={{ color: '#0f172a', display: 'block', marginBottom: '8px', fontSize: '15px' }}>Corporate Headquarters</Text>
                  <Paragraph style={{ color: '#334155', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                    G12 Express Green Plaza, Sector 1, Vaishali Ghaziabad
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', height: '100%' }}>
                  <Text strong style={{ color: '#0f172a', display: 'block', marginBottom: '8px', fontSize: '15px' }}>Business Hours</Text>
                  <Paragraph style={{ color: '#334155', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                    Monday – Saturday: 9:30 AM – 6:30 PM<br />
                    Sunday: Closed / By Appointment Only
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 3: Frequently Asked Questions (Quick Help) */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '10px', color: '#d97706' }}>
                <QuestionCircleOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Frequently Asked Support Questions</Title>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <Text strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>How can I book a free consultation for interior design?</Text>
                <Paragraph style={{ color: '#334155', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                  You can easily book a free consultation by clicking on the "Book Free Consultation" button anywhere on our website or by contacting our support team directly via phone or email.
                </Paragraph>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <Text strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>What is the warranty period for Urbane Living products?</Text>
                <Paragraph style={{ color: '#334155', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                  We offer a comprehensive 10-year warranty on our standard modular installations and manufacturing components. Terms and conditions apply based on the specific project scope.
                </Paragraph>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <Text strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>How do I track my customized furniture order?</Text>
                <Paragraph style={{ color: '#334155', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                  Once your order is dispatched, you will receive tracking updates via email and SMS. You can also reach out to our support desk with your order number for real-time updates.
                </Paragraph>
              </div>

            </div>
          </div>

        </Card>
      </div>

    </div>
  );
};

export default SupportPage;