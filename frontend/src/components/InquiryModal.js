import React from 'react';
import { Modal, Form, Input, Button, Typography, Row, Col, Select } from 'antd';
import './css/InquiryModal.css';

const { Title } = Typography;
const { Option } = Select;

const InquiryModal = ({ isOpen, onClose, onFinish }) => {
  return (
    <Modal 
      className='quick-inquiry' 
      title={<Title level={2} style={{ textAlign: 'center', color: '#7b42f5' }}>Get your Ceiling Designed</Title>} 
      open={isOpen} 
      onCancel={onClose} 
      footer={null} 
      centered
      width={700} // Width thodi badha di hai dropdowns ke liye
    >
      <Form layout="vertical" onFinish={onFinish} style={{ marginTop: '20px' }}>
        
        {/* Row 1: First Name & Email */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              label="First Name" 
              name="name" 
              rules={[
                { required: true, message: 'First Name is required!' },
                { pattern: /^[a-zA-Z\s]*$/, message: 'Numbers are not allowed!' }
              ]}
            >
              <Input placeholder="Enter name here" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="Email" 
              name="email" 
              rules={[
                { required: true, message: 'Email ID is required!' },
                { type: 'email', message: 'Enter a valid email ID!' }
              ]}
            >
              <Input placeholder="Enter email ID here" size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 2: Mobile No & State */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              label="Mobile no" 
              name="phone" 
              rules={[
                { required: true, message: 'Mobile number is required!' },
                { pattern: /^[0-9]{10}$/, message: 'Must be exactly 10 digits!' }
              ]}
            >
              <Input placeholder="Enter mobile no here" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="State" 
              name="state" 
              rules={[{ required: true, message: 'Please select a state!' }]}
            >
              <Select placeholder="Select State" size="large">
                <Option value="delhi">Delhi</Option>
                <Option value="bihar">Bihar</Option>
                <Option value="up">Uttar Pradesh</Option>
                <Option value="haryana">Haryana</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Row 3: Type of Property */}
        <Form.Item 
          label="Type of Property" 
          name="propertyType" 
          rules={[{ required: true, message: 'Please select property type!' }]}
        >
          <Select placeholder="Select property type" size="large">
            <Option value="residential">Residential</Option>
            <Option value="commercial">Commercial</Option>
            <Option value="office">Office</Option>
          </Select>
        </Form.Item>

        <Button 
          type="primary" 
          htmlType="submit" 
          block 
          size="large" 
          style={{ 
            background: '#7b42f5', 
            height: '50px', 
            fontSize: '18px', 
            fontWeight: '600',
            marginTop: '20px' 
          }}
        >
          SUBMIT
        </Button>
      </Form>
    </Modal>
  );
};

export default InquiryModal;