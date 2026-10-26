import React from 'react';
import { Modal, Form, Input, Button, Typography, Row, Col, Select, message } from 'antd';
import { inquiryOptions } from '../data/siteData';
import './css/InquiryModal.css';

const { Title } = Typography;

// Local backend on localhost, Render in production (same as the rest of the site)
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://urbane-living.onrender.com';

const toOptions = (list) => list.map((v) => ({ value: v, label: v }));

const InquiryModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // Phone keeps digits only, so a pasted "+91 98765 43210" still works
  const cleanPhone = (e) => {
    let digits = e.target.value.replace(/\D/g, '');
    if (digits.length > 10 && digits.startsWith('91')) digits = digits.slice(2);
    return digits.slice(0, 10);
  };

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/save-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          locality: (values.locality || '').trim(),
          page: window.location.pathname,
        }),
      });

      if (response.ok) {
        messageApi.success("Thank you! Our designer will call you shortly.");
        form.resetFields();
        onClose(); 
      } else {
        messageApi.error("Server error. Please try again.");
      }
    } catch (error) {
      messageApi.error("Backend connection failed!");
    }
  };

  return (
    <>
    {contextHolder}
    <Modal 
      className='quick-inquiry-modern' 
      open={isOpen} 
      onCancel={onClose} 
      footer={null} 
      centered
      width={850}
    >
      <Row className="modal-container">
        {/* Left Side Image - As per Reference */}
        <Col xs={24} md={10} className="modal-image-side">
          <div className="image-content">
            <img 
              src='https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778232393/urbane-logo-transparent-icon-removebg-preview_jepdln.png' 
              alt="form-img" 
            />
          </div>
        </Col>

        {/* Right Side Form - As per Reference Background & Style */}
        <Col xs={24} md={14} className="modal-form-side">
          <div className="form-header">
            <Title level={3}>Book Free Design Consultation</Title>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish} className="ref-style-form">
            <Row gutter={12}>
              <Col xs={24} sm={12}>
                <Form.Item label="Name" name="name" rules={[{ required: true, whitespace: true, message: 'Please enter your name' }]}>
                  <Input placeholder="Your name" autoComplete="name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Mobile no"
                  name="phone"
                  getValueFromEvent={cleanPhone}
                  rules={[{ required: true, pattern: /^[6-9][0-9]{9}$/, message: 'Enter a valid 10-digit mobile number' }]}
                >
                  <Input placeholder="10-digit mobile" inputMode="numeric" autoComplete="tel-national" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input placeholder="you@example.com" autoComplete="email" />
            </Form.Item>

            <Row gutter={12}>
              <Col xs={24} sm={12}>
                <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please select your city' }]}>
                  <Select placeholder="Select city" options={toOptions(inquiryOptions.serviceAreas)} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Property Type" name="propertyType" rules={[{ required: true, message: 'Please select property type' }]}>
                  <Select placeholder="Residential/Commercial" options={toOptions(inquiryOptions.propertyTypes)} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Locality / Society (optional)" name="locality">
              <Input placeholder="e.g. Sector 62, Gaur City" maxLength={120} />
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="ref-submit-btn">
              SUBMIT
            </Button>
          </Form>
        </Col>
      </Row>
    </Modal>
    </>
  );
};

export default InquiryModal;
