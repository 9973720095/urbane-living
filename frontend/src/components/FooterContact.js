import React from 'react';
import { Button, Typography } from 'antd';
import { PhoneFilled, WhatsAppOutlined } from '@ant-design/icons';
import './css/FooterContact.css';

const { Title, Paragraph } = Typography;

const FooterContact = () => {
  return (
    <div className="footer-contact" style={{ background: '#f0f2f5', padding: '60px 20px', textAlign: 'center' }}>
      <Title level={3}>Want quick assistance? Just give us a call!</Title>
      <Paragraph>Message us on WhatsApp or call directly for premium home design services.</Paragraph>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <Button className='call_now c-btn' type="primary" icon={<PhoneFilled />} size="large" style={{ background: '#006699', borderColor: '#006699' }}>
          CALL NOW
        </Button>
        <Button className='whatsapp_now c-btn' type="primary" icon={<WhatsAppOutlined />} size="large" style={{ background: '#25D366', borderColor: '#25D366' }}>
          WHATSAPP
        </Button>
      </div>
    </div>
  );
};

export default FooterContact;