import React from 'react';
import { Typography, Breadcrumb, Card } from 'antd';
import { HomeOutlined, BookOutlined, SafetyCertificateOutlined, EyeOutlined, CreditCardOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const TermsConditionPage = () => {
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
          <BookOutlined style={{ fontSize: '36px', marginBottom: '16px', color: '#38bdf8' }} />
          <Title level={1} style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: '16px' }}>
            Terms & Conditions
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
            Please read these terms and conditions carefully before using our website or engaging our interior design services.
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
                title: <span style={{ color: '#0f172a', fontWeight: 500 }}>Terms & Conditions</span> 
              },
            ]}
          />
        </Card>

        {/* Feature Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} bodyStyle={{ padding: '20px', textAlign: 'center' }}>
            <SafetyCertificateOutlined style={{ fontSize: '24px', color: '#2563eb', marginBottom: '8px' }} />
            <Text strong style={{ display: 'block', color: '#0f172a', fontSize: '15px' }}>Data Security</Text>
            <Text type="secondary" style={{ fontSize: '13px' }}>100% confidential processes</Text>
          </Card>
          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} bodyStyle={{ padding: '20px', textAlign: 'center' }}>
            <EyeOutlined style={{ fontSize: '24px', color: '#16a34a', marginBottom: '8px' }} />
            <Text strong style={{ display: 'block', color: '#0f172a', fontSize: '15px' }}>Transparency</Text>
            <Text type="secondary" style={{ fontSize: '13px' }}>No hidden terms or charges</Text>
          </Card>
          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} bodyStyle={{ padding: '20px', textAlign: 'center' }}>
            <CreditCardOutlined style={{ fontSize: '24px', color: '#9333ea', marginBottom: '8px' }} />
            <Text strong style={{ display: 'block', color: '#0f172a', fontSize: '15px' }}>Secure Process</Text>
            <Text type="secondary" style={{ fontSize: '13px' }}>Trusted transactions</Text>
          </Card>
        </div>

        {/* Content Card */}
        <Card style={{ borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }} bodyStyle={{ padding: 'clamp(24px, 5vw, 48px)' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#334155', lineHeight: 1.7, fontSize: '15px' }}>
            <div>
              <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '8px' }}>1. Consultation</Title>
              <Paragraph style={{ margin: 0, color: '#334155' }}>
                Estimates provided are for initial planning purposes only and do not constitute a binding contract.
              </Paragraph>
            </div>

            <div>
              <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '8px' }}>2. Intellectual Property Rights</Title>
              <Paragraph style={{ margin: 0, color: '#334155' }}>
                All designs, 3D renders, and images shared by Urbane Living remain our property unless specified otherwise.
              </Paragraph>
            </div>

            <div>
              <Title level={4} style={{ color: '#0f172a', fontWeight: 700, marginBottom: '8px' }}>3. Project Timeline</Title>
              <Paragraph style={{ margin: 0, color: '#334155' }}>
                Delivery timelines are estimates and may vary based on material procurement and site readiness.
              </Paragraph>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '36px 0 24px 0' }} />

          {/* Footer Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '13px', color: '#64748b' }}>
            <span>Last updated: May 23, 2026</span>
            <span>For queries: <a href="mailto:sales1@urbaneliving.in" style={{ color: '#2563eb' }}>sales1@urbaneliving.in</a></span>
          </div>

        </Card>
      </div>
    </div>
  );
};

export default TermsConditionPage;