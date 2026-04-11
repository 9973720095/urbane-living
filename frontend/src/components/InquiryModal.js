import React from 'react';
import { Modal, Form, Input, Button, Typography, Row, Col, Select, message } from 'antd';
import './css/InquiryModal.css';

const { Title } = Typography;
const { Option } = Select;

const InquiryModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Live Render URL
      const response = await fetch('https://urbane-living.onrender.com/api/save-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      className='quick-inquiry' 
      title={<Title level={2} style={{ textAlign: 'center', color: '#7b42f5' }}>Get your Ceiling Designed</Title>} 
      open={isOpen} 
      onCancel={onClose} 
      footer={null} 
      centered
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginTop: '20px' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="First Name" name="name" rules={[{ required: true, message: 'Required!' }]}>
              <Input placeholder="Enter name" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="Enter email" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Mobile no" name="phone" rules={[{ required: true, pattern: /^[0-9]{10}$/ }]}>
              <Input placeholder="10 digit number" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="State" name="state" rules={[{ required: true }]}>
              <Select placeholder="Select State" size="large">
                <Option value="Delhi">Delhi</Option>
                <Option value="Bihar">Bihar</Option>
                <Option value="UP">Uttar Pradesh</Option>
                <Option value="Haryana">Haryana</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Type of Property" name="propertyType" rules={[{ required: true }]}>
          <Select placeholder="Select property type" size="large">
            <Option value="Residential">Residential</Option>
            <Option value="Commercial">Commercial</Option>
            <Option value="Office">Office</Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large" style={{ background: '#7b42f5', height: '50px', fontWeight: 'bold' }}>
          SUBMIT
        </Button>
      </Form>
    </Modal>
  );
};

export default InquiryModal;