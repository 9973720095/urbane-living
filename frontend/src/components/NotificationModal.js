import React, { useState, useEffect } from 'react';
import { Modal, Typography } from 'antd';
import './css/NotificationModal.css';

const { Title, Paragraph, Text } = Typography;

const NotificationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Website load hone par modal dikhane ke liye
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1500); // 1.5 seconds ke baad popup aayega
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleClose}
      footer={null}
      centered
      width={600}
      className="promo-modal"
    >
      <div className="modal-content-wrapper">
        <div className="modal-header-logo">
          <h2 style={{ color: '#e31e24', fontWeight: 'bold' }}>URBANE LIVING</h2>
        </div>

        <div className="modal-body-text">
          <Paragraph>
            For your safety, <Text strong>watch out for counterfeits</Text>.<br />
            Check that your installer is an official Urbane Living® partner.
          </Paragraph>

          <Title level={5}>Discover :</Title>
          <ul className="promo-list">
            <li>Our <Text type="danger">eco-friendly solutions</Text> with certified quality.</li>
            <li>Our <Text type="danger">Smart Lighting</Text> solutions with up to 30% energy savings.</li>
            <li><Text strong>Aura</Text>, a premium finish that enhances light and space.</li>
            <li>Matte and Translucent materials made with 100% recyclable components.</li>
          </ul>

          <Paragraph style={{ marginTop: '20px' }}>
            Authenticate your ceiling and <Text type="danger" 
            style={{ cursor: 'pointer', textDecoration: 'underline' }}>register your warranty</Text>.
          </Paragraph>

          <Text type="secondary">Do not hesitate to contact us for more information.</Text>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;