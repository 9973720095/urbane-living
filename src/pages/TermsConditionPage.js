import React from 'react';
import { Typography, Breadcrumb } from 'antd';
import { HomeOutlined, BookOutlined, SafetyCertificateOutlined, EyeOutlined, CreditCardOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const TermsConditionPage = () => {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Top Banner Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', 
        padding: '60px 20px', 
        textAlign: 'center', 
        color: '#ffffff' 
      }}>
        <BookOutlined style={{ fontSize: '36px', marginBottom: '16px', opacity: 0.9 }} />
        <Title level={1} style={{ color: '#ffffff', fontSize: '36px', fontWeight: 800, margin: 0, letterSpacing: '0.5px' }}>
          TERMS & CONDITIONS
        </Title>
        <div style={{ width: '60px', height: '3px', backgroundColor: '#3b82f6', margin: '16px auto 0 auto' }}></div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Breadcrumb */}
        <div style={{ padding: '20px 0' }}>
          <Breadcrumb
            items={[
              { title: <><HomeOutlined /> Home</> },
              { title: 'Terms & Conditions' },
            ]}
          />
        </div>

        {/* Top 3 Feature Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px', 
          marginBottom: '40px' 
        }}>
          {/* Card 1 */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <SafetyCertificateOutlined style={{ fontSize: '28px', color: '#0f172a', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0', color: '#1e293b' }}>Data Security</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>100% confidential</p>
          </div>

          {/* Card 2 */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <EyeOutlined style={{ fontSize: '28px', color: '#0f172a', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0', color: '#1e293b' }}>Transparency</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>No hidden terms</p>
          </div>

          {/* Card 3 */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <CreditCardOutlined style={{ fontSize: '28px', color: '#0f172a', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0', color: '#1e293b' }}>Secure Process</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Trusted payments</p>
          </div>
        </div>

        {/* Main Content Box */}
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '16px', 
          padding: '40px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          border: '1px solid #f1f5f9'
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>
            Terms & Conditions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#334155' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>1. Consultation</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Estimates provided are for initial planning purposes only and do not constitute a binding contract.
              </Paragraph>
            </div>

            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>2. Intellectual Property Rights</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                All designs, 3D renders, and images shared by Urbane Living remain our property unless specified otherwise.
              </Paragraph>
            </div>

            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>3. Project Timeline</h4>
              <Paragraph style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Delivery timelines are estimates and may vary based on material procurement and site readiness.
              </Paragraph>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '30px 0 20px 0' }} />

          {/* Footer Info inside card */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '13px', color: '#94a3b8' }}>
            <span>Last updated: May 23, 2026</span>
            <span>For queries: it@urbaneliving.in</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TermsConditionPage;