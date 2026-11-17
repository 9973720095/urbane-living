import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, Switch, message } from 'antd';
import { CloseOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { inquiryOptions } from '../data/siteData';
import { trackLead } from '../utils/metaPixel';
import './css/InquiryModal.css';

// Local backend on localhost, Render in production (same as the rest of the site)
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://urbane-living.onrender.com';

// Top banner photo (our own living-room shoot, first frame of the hero video)
const BANNER_IMG = 'https://res.cloudinary.com/nzqefovs/video/upload/so_0,q_auto,f_auto,w_800,h_340,c_fill/v1794816175/living-room-hero-4k.jpg';

const toOptions = (list) => list.map((v) => ({ value: v, label: v }));

// Phone keeps digits only, so a pasted "+91 98765 43210" still works
const cleanPhone = (e) => {
  let digits = e.target.value.replace(/\D/g, '');
  if (digits.length > 10 && digits.startsWith('91')) digits = digits.slice(2);
  return digits.slice(0, 10);
};

const IndiaPrefix = () => (
  <span className="ul-lead-prefix">
    <img src="https://flagcdn.com/w40/in.png" srcSet="https://flagcdn.com/w80/in.png 2x" width="22" height="15" alt="India" />
    <span>+91</span>
  </span>
);

const InquiryModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [sending, setSending] = useState(false);

  const onFinish = async (values) => {
    setSending(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/save-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone,
          city: values.city,
          message: `WhatsApp updates: ${values.whatsapp ? 'Yes' : 'No'}`,
          page: window.location.pathname,
        }),
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        trackLead({ leadId: data.leadId, city: values.city, form: 'Popup form' });
        messageApi.success('Thank you! Our designer will call you shortly.');
        form.resetFields();
        onClose();
      } else {
        messageApi.error('Server error. Please try again.');
      }
    } catch (error) {
      messageApi.error('Connection failed. Please try again or call us.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        className="ul-lead-modal"
        open={isOpen}
        onCancel={onClose}
        footer={null}
        closable={false}
        centered
        width={400}
        destroyOnHidden
      >
        <button type="button" className="ul-lead-close" onClick={onClose} aria-label="Close form">
          <CloseOutlined />
        </button>

        {/* Top banner: photo + headline */}
        <div className="ul-lead-banner">
          <img src={BANNER_IMG} alt="Living room designed by Urbane Living" width="400" height="170" />
          <div className="ul-lead-banner-text">
            <p className="ul-lead-banner-title">Dream home on your mind?</p>
            <p className="ul-lead-banner-sub">Urbane Living designers plan it with you, free of cost.</p>
          </div>
        </div>

        {/* Form */}
        <div className="ul-lead-body">
          <h2 className="ul-lead-title">Talk to a designer</h2>

          <Form
            form={form}
            onFinish={onFinish}
            initialValues={{ whatsapp: true }}
            requiredMark={false}
            className="ul-lead-form"
          >
            <Form.Item name="name" rules={[{ required: true, whitespace: true, message: 'Please enter your name' }]}>
              <Input placeholder="Enter your name" autoComplete="name" aria-label="Name" />
            </Form.Item>

            <Form.Item
              name="phone"
              getValueFromEvent={cleanPhone}
              rules={[{ required: true, pattern: /^[6-9][0-9]{9}$/, message: 'Enter a valid 10-digit mobile number' }]}
            >
              <Input
                prefix={<IndiaPrefix />}
                placeholder="Enter your mobile number"
                inputMode="numeric"
                autoComplete="tel-national"
                aria-label="Mobile number"
              />
            </Form.Item>

            <div className="ul-lead-whatsapp">
              <label htmlFor="ul-lead-wa">Send me updates on WhatsApp</label>
              <Form.Item name="whatsapp" valuePropName="checked" noStyle>
                <Switch id="ul-lead-wa" size="small" />
              </Form.Item>
            </div>

            <Form.Item name="city" rules={[{ required: true, message: 'Please select your city' }]}>
              <Select
                placeholder="Select your property city"
                options={toOptions(inquiryOptions.serviceAreas)}
                aria-label="Property city"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block loading={sending} className="ul-lead-submit">
              Book Free Consultation <ArrowRightOutlined />
            </Button>

            <p className="ul-lead-consent">
              By submitting, you agree to our{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a> and{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">terms of use</a>, and allow us to
              contact you about your request.
            </p>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default InquiryModal;
