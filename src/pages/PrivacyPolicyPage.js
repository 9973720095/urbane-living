import React from 'react';
import { Typography, Breadcrumb, Card } from 'antd';
import { HomeOutlined, FileProtectOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicyPage = () => {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Top Banner Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', 
        padding: '60px 20px', 
        textAlign: 'center', 
        color: '#ffffff' 
      }}>
        <FileProtectOutlined style={{ fontSize: '36px', marginBottom: '16px', opacity: 0.9 }} />
        <Title level={1} style={{ color: '#ffffff', fontSize: '36px', fontWeight: 800, margin: 0, letterSpacing: '0.5px' }}>
          PRIVACY POLICY
        </Title>
        <div style={{ width: '60px', height: '3px', backgroundColor: '#3b82f6', margin: '16px auto 0 auto' }}></div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Breadcrumb */}
        <div style={{ padding: '20px 0' }}>
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
        </div>

        {/* Main Content Box */}
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '16px', 
          padding: '40px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          border: '1px solid #f1f5f9',
          color: '#334155'
        }}>
          
          <Paragraph style={{ fontSize: '15px', color: '#64748b', marginBottom: '40px' }}>
            At Urbane Living, your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit <a href="https://urbaneliving.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>https://urbaneliving.in/</a> or use any of our services.
          </Paragraph>

          {/* Privacy Policy Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Section 1 */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>1. Information We Collect</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                When you interact with our website, we may collect the following information:
              </Paragraph>
              <ul style={{ paddingLeft: '20px', color: '#64748b', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>
                  <Text strong style={{ color: '#334155' }}>Personal Information:</Text> Your name, email address, phone number, shipping address, and payment details when you place an order or fill out a form.
                </li>
                <li>
                  <Text strong style={{ color: '#334155' }}>Non-Personal Information:</Text> Data such as your IP address, browser type, and browsing activity on our site.
                </li>
                <li>
                  <Text strong style={{ color: '#334155' }}>Cookies:</Text> We use cookies to improve your experience and gather insights about site usage. You can manage or disable cookies through your browser settings.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>2. How We Use Your Information</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                The information we collect may be used to:
              </Paragraph>
              <ul style={{ paddingLeft: '20px', color: '#64748b', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Text strong style={{ color: '#334155' }}>Process Orders:</Text> Manage payments, shipping, and order fulfillment.</li>
                <li><Text strong style={{ color: '#334155' }}>Provide Support:</Text> Respond to inquiries, resolve issues, and offer customer care.</li>
                <li><Text strong style={{ color: '#334155' }}>Marketing (Opt-in Only):</Text> Share updates, offers, and promotions if you have opted in.</li>
                <li><Text strong style={{ color: '#334155' }}>Improve Services:</Text> Analyze site usage and enhance our website experience.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>3. Data Protection</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                We take strong measures to protect your information, including:
              </Paragraph>
              <ul style={{ paddingLeft: '20px', color: '#64748b', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Text strong style={{ color: '#334155' }}>SSL Encryption:</Text> Secures sensitive data during online transmission.</li>
                <li><Text strong style={{ color: '#334155' }}>Restricted Access:</Text> Only authorized personnel can access your information, and they must keep it confidential.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>4. Sharing Your Information</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                We do not sell, trade, or rent your personal information. However, we may share it with trusted third-party service providers (such as payment processors or delivery partners) solely for the purpose of providing services. These providers are obligated to keep your data secure and confidential.
              </Paragraph>
            </div>

            {/* Section 5 */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>5. Third-Party Links</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Our site may contain links to external websites. Please note that Urbane Living is not responsible for the privacy policies or practices of third-party sites. We recommend reviewing their policies before sharing personal data.
              </Paragraph>
            </div>

            {/* Section 6 */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>6. Your Rights</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                You have the right to:
              </Paragraph>
              <ul style={{ paddingLeft: '20px', color: '#64748b', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Text strong style={{ color: '#334155' }}>Access, Update, or Delete Data:</Text> Request changes or deletion of your personal information.</li>
                <li><Text strong style={{ color: '#334155' }}>Opt-Out of Marketing:</Text> Unsubscribe from marketing communications at any time.</li>
                <li><Text strong style={{ color: '#334155' }}>Manage Cookies:</Text> Control cookie settings via your browser (though some features may be limited if disabled).</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>7. Data Retention</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                We retain your information only as long as necessary for business, legal, or regulatory purposes.
              </Paragraph>
            </div>

            {/* Section 8 */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>8. Updates to This Policy</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Urbane Living may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically to stay informed.
              </Paragraph>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '10px 0' }} />

            {/* Section 9 - Contact Us with Cards */}
            <div id="contact-us" style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '24px' }}>9. Contact Us</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
                For questions or concerns about this Privacy Policy or your personal information, please contact us at:
              </Paragraph>

              {/* Contact Cards Container */}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: '30px' 
              }}>
                
                {/* Email Card */}
                <Card style={{ 
                  width: '300px', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  border: '1px solid #f1f5f9' 
                }}>
                  <MailOutlined style={{ fontSize: '32px', color: '#1e3a8a', marginBottom: '20px' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Email Us</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>For privacy queries</p>
                  <a href="mailto:urbanelivingofficial@gmail.com" style={{ fontSize: '16px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>
                    urbanelivingofficial@gmail.com
                  </a>
                </Card>

                {/* Phone Card */}
                <Card style={{ 
                  width: '300px', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  border: '1px solid #f1f5f9' 
                }}>
                  <PhoneOutlined style={{ fontSize: '32px', color: '#1e3a8a', marginBottom: '20px' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Call Us</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Speak with our support team</p>
                  <a href="tel:+91 9105052454" style={{ fontSize: '16px', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>
                    +91 1800-123-6407
                  </a>
                </Card>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;