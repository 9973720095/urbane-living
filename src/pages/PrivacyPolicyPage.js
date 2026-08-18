import React from 'react';
import { Typography, Breadcrumb, Card, Row, Col } from 'antd';
import { HomeOutlined, FileProtectOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicyPage = () => {
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
          <FileProtectOutlined style={{ fontSize: '36px', marginBottom: '16px', color: '#38bdf8' }} />
          <Title level={1} style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: '16px' }}>
            Privacy Policy
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
            At Urbane Living, your privacy matters to us. Learn how we collect, use, and protect your personal data.
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
                title: <span style={{ color: '#0f172a', fontWeight: 500 }}>Privacy Policy</span> 
              },
            ]}
          />
        </Card>

        {/* Content Card */}
        <Card style={{ borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }} bodyStyle={{ padding: 'clamp(24px, 5vw, 48px)' }}>
          
          <Paragraph style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7, marginBottom: '36px' }}>
            This Privacy Policy explains how we collect, use, and protect your personal information when you visit <a href="https://urbaneliving.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>https://urbaneliving.in/</a> or use any of our services.
          </Paragraph>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>

            {/* Section 1 */}
            <div>
              <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '12px' }}>1. Information We Collect</Title>
              <Paragraph style={{ marginBottom: '12px', color: '#334155' }}>When you interact with our website, we may collect the following information:</Paragraph>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#334155' }}>
                <li><Text strong style={{ color: '#0f172a' }}>Personal Information:</Text> Your name, email address, phone number, shipping address, and payment details when you place an order or fill out a form.</li>
                <li><Text strong style={{ color: '#0f172a' }}>Non-Personal Information:</Text> Data such as your IP address, browser type, and browsing activity on our site.</li>
                <li><Text strong style={{ color: '#0f172a' }}>Cookies:</Text> We use cookies to improve your experience and gather insights about site usage.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '12px' }}>2. How We Use Your Information</Title>
              <Paragraph style={{ marginBottom: '12px', color: '#334155' }}>The information we collect may be used to:</Paragraph>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#334155' }}>
                <li><Text strong style={{ color: '#0f172a' }}>Process Orders:</Text> Manage payments, shipping, and order fulfillment.</li>
                <li><Text strong style={{ color: '#0f172a' }}>Provide Support:</Text> Respond to inquiries, resolve issues, and offer customer care.</li>
                <li><Text strong style={{ color: '#0f172a' }}>Marketing (Opt-in Only):</Text> Share updates, offers, and promotions if you have opted in.</li>
                <li><Text strong style={{ color: '#0f172a' }}>Improve Services:</Text> Analyze site usage and enhance our website experience.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '12px' }}>3. Data Protection</Title>
              <Paragraph style={{ marginBottom: '12px', color: '#334155' }}>We take strong measures to protect your information, including:</Paragraph>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#334155' }}>
                <li><Text strong style={{ color: '#0f172a' }}>SSL Encryption:</Text> Secures sensitive data during online transmission.</li>
                <li><Text strong style={{ color: '#0f172a' }}>Restricted Access:</Text> Only authorized personnel can access your information securely.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '12px' }}>4. Sharing Your Information</Title>
              <Paragraph style={{ margin: 0, color: '#334155' }}>
                We do not sell, trade, or rent your personal information. However, we may share it with trusted third-party service providers (such as payment processors or delivery partners) solely for fulfilling services securely.
              </Paragraph>
            </div>

            {/* Section 5 */}
            <div>
              <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '12px' }}>5. Third-Party Links</Title>
              <Paragraph style={{ margin: 0, color: '#334155' }}>
                Our site may contain links to external websites. Urbane Living is not responsible for the privacy policies or practices of third-party sites.
              </Paragraph>
            </div>

            {/* Section 6 */}
            <div>
              <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '12px' }}>6. Your Rights</Title>
              <Paragraph style={{ marginBottom: '12px', color: '#334155' }}>You have the right to:</Paragraph>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#334155' }}>
                <li><Text strong style={{ color: '#0f172a' }}>Access, Update, or Delete Data:</Text> Request changes or deletion of your personal information.</li>
                <li><Text strong style={{ color: '#0f172a' }}>Opt-Out of Marketing:</Text> Unsubscribe from marketing communications anytime.</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '12px' }}>7. Data Retention</Title>
              <Paragraph style={{ margin: 0, color: '#334155' }}>
                We retain your information only as long as necessary for business, legal, or regulatory purposes.
              </Paragraph>
            </div>

            {/* Section 8 */}
            <div>
              <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '12px' }}>8. Updates to This Policy</Title>
              <Paragraph style={{ margin: 0, color: '#334155' }}>
                Urbane Living may update this Privacy Policy periodically. Any modifications will be updated directly on this page.
              </Paragraph>
            </div>

          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '36px 0' }} />

          {/* Section 9: Contact Us Cards */}
          <div id="contact-us">
            <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '16px', textAlign: 'center' }}>9. Contact Us</Title>
            <Paragraph style={{ color: '#334155', textAlign: 'center', marginBottom: '24px' }}>
              For questions or concerns about this Privacy Policy, please reach out to our team:
            </Paragraph>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px', height: '100%' }}>
                  <MailOutlined style={{ fontSize: '20px', color: '#2563eb' }} />
                  <div>
                    <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>Email Queries</Text>
                    <a href="mailto:sales1@urbaneliving.in" style={{ color: '#0f172a', fontWeight: 600 }}>sales1@urbaneliving.in</a>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px', height: '100%' }}>
                  <PhoneOutlined style={{ fontSize: '20px', color: '#16a34a' }} />
                  <div>
                    <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>Helpline Support</Text>
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

export default PrivacyPolicyPage;