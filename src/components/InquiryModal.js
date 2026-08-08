import React from 'react';
import { Modal, Form, Input, Button, Typography, Row, Col, Select, message } from 'antd';
import './css/InquiryModal.css';

const { Title, Text } = Typography;
const { Option } = Select;

const InquiryModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch('https://urbane-living.onrender.com/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Design request sent successfully!");
        form.resetFields();
        onClose(); 
      } else {
        message.error("Server error. Please try again.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      message.error("Backend connection failed!");
    }
  };

  return (
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
              <Col span={24}>
                <Form.Item label="First Name" name="name" rules={[{ required: true }]}>
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={24}>
                <Form.Item label="Mobile no" name="phone" rules={[{ required: true, pattern: /^[0-9]{10}$/ }]}>
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="State" name="state" rules={[{ required: true }]}>
                  <Select placeholder="State">
                    <Option value="Delhi">Delhi</Option>
                    <Option value="Bihar">Bihar</Option>
                    <Option value="UP">UP</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Property Type" name="propertyType" rules={[{ required: true }]}>
              <Select placeholder="Residential/Commercial">
                <Option value="Residential">Residential</Option>
                <Option value="Commercial">Commercial</Option>
              </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="ref-submit-btn">
              SUBMIT
            </Button>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default InquiryModal;