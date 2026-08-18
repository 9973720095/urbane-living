import React from 'react';
import { Typography, Breadcrumb, Card, Row, Col } from 'antd';
import { 
  HomeOutlined, 
  ReloadOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  SwapOutlined, 
  ClockCircleOutlined, 
  CarOutlined, 
  StopOutlined, 
  MailOutlined, 
  PhoneOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const RefundPolicyPage = () => {
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
            Refund & Return Policy
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
            At Urbane Living, we are committed to ensuring you are satisfied with our products and services. If you are not entirely happy with your purchase, our policies are here to help.
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
                title: <span style={{ color: '#0f172a', fontWeight: 500 }}>Refund Policy</span> 
              },
            ]}
          />
        </Card>

        {/* Content Card */}
        <Card style={{ borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }} bodyStyle={{ padding: 'clamp(24px, 5vw, 48px)' }}>
          
          {/* Section 1: Returns */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '10px', color: '#2563eb' }}>
                <ReloadOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>1. Returns</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', display: 'flex', flexDirection: 'column', gap: '14px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              <div>
                <Text strong style={{ color: '#0f172a' }}>Eligibility: </Text>
                You have 7 days from the date of delivery to request a return. Items must be unused, in their original condition, and returned in the original packaging.
              </div>
              <div>
                <Text strong style={{ color: '#0f172a' }}>Non-Returnable Items: </Text>
                Customized or personalized items, clearance or sale products, and gift cards cannot be returned.
              </div>
              <div>
                <Text strong style={{ color: '#0f172a' }}>Return Process: </Text>
                To request a return, please contact us at <a href="mailto:sales1@urbaneliving.in" style={{ color: '#2563eb' }}>sales1@urbaneliving.in</a> or <a href="tel:18001236407" style={{ color: '#2563eb' }}>1800-123-6407</a> with your order number and reason. Our team will guide you through the next steps.
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 2: Refunds */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#f0fdf4', padding: '10px', borderRadius: '10px', color: '#16a34a' }}>
                <CheckCircleOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>2. Refunds</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', display: 'flex', flexDirection: 'column', gap: '14px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              <div>
                <Text strong style={{ color: '#0f172a' }}>Eligibility: </Text>
                Once we receive and inspect your returned item, we will notify you of approval or rejection. If approved, refunds will be processed within 5-7 business days to your original payment method.
              </div>
              <div>
                <Text strong style={{ color: '#0f172a' }}>Partial Refunds: </Text>
                In some cases, partial refunds may be issued (e.g., items with signs of use or damage not caused by us).
              </div>
              <div>
                <Text strong style={{ color: '#0f172a' }}>Non-Refundable Items: </Text>
                Shipping charges are non-refundable. If a refund is issued, the original shipping fee will be deducted.
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 3: Exchanges */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '10px', color: '#d97706' }}>
                <SwapOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>3. Exchanges</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              We replace items only if they are defective or damaged. To request an exchange for the same product, please contact us at <a href="mailto:sales1@urbaneliving.in" style={{ color: '#2563eb' }}>sales1@urbaneliving.in</a> or <a href="tel:18001236407" style={{ color: '#2563eb' }}>1800-123-6407</a>.
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 4: Late or Missing Refunds */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#f3e8ff', padding: '10px', borderRadius: '10px', color: '#9333ea' }}>
                <ClockCircleOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>4. Late or Missing Refunds</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', display: 'flex', flexDirection: 'column', gap: '10px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              <Paragraph style={{ margin: 0 }}>If you haven’t received your refund within the stated timeframe, please follow these steps:</Paragraph>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Check your bank account again.</li>
                <li>Contact your credit card company (posting delays may occur).</li>
                <li>Contact your bank (processing times may vary).</li>
              </ul>
              <Paragraph style={{ margin: '8px 0 0' }}>
                If you still haven’t received your refund, please contact us at <a href="mailto:sales1@urbaneliving.in" style={{ color: '#2563eb' }}>sales1@urbaneliving.in</a>.
              </Paragraph>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 5: Shipping Returns */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#ccfbf1', padding: '10px', borderRadius: '10px', color: '#0d9488' }}>
                <CarOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>5. Shipping Returns</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', display: 'flex', flexDirection: 'column', gap: '12px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              <div>
                <Text strong style={{ color: '#0f172a' }}>Return Address: </Text>
                To return a product, please mail it to our designated operations address. Customers are responsible for return shipping costs.
              </div>
              <div>
                We recommend using a trackable shipping service or purchasing shipping insurance, as we cannot guarantee receipt of returned items.
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 6: Cancellations */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#fee2e2', padding: '10px', borderRadius: '10px', color: '#dc2626' }}>
                <StopOutlined style={{ fontSize: '20px' }} />
              </div>
              <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>6. Cancellations</Title>
            </div>
            
            <div style={{ paddingLeft: '44px', display: 'flex', flexDirection: 'column', gap: '14px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
              <div>
                If you need to cancel an order, please contact us immediately.
              </div>
              <div>
                <Text strong style={{ color: '#0f172a' }}>Before Processing/Shipping: </Text>
                Orders can be canceled, and a full refund will be issued.
              </div>
              <div>
                <Text strong style={{ color: '#0f172a' }}>After Shipping: </Text>
                Orders cannot be canceled. In this case, our standard return policy applies.
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0' }} />

          {/* Section 7: Contact Us */}
          <div>
            <Title level={3} style={{ margin: '0 0 16px', color: '#0f172a', fontWeight: 700 }}>7. Contact Us</Title>
            <Paragraph style={{ color: '#334155', lineHeight: 1.7, fontSize: '15px', marginBottom: '20px' }}>
              If you have any questions regarding our Refund & Return Policy, please reach us at:
            </Paragraph>

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

export default RefundPolicyPage;