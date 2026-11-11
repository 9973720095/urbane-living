import React, { useState } from 'react';
import { Typography, Select, message } from 'antd';
import axios from 'axios';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import './css/Hero.css';
import { trackLead } from '../utils/metaPixel';
import { inquiryOptions } from '../data/siteData';

const { Title } = Typography;

// Local backend on localhost, Render in production (same as the rest of the site)
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://urbane-living.onrender.com';

const EMPTY_FORM = { name: '', countryCode: '+91', phone: '', email: '', city: '', locality: '' };

// Home page values (other pages pass their own props)
const HOME_HERO = {
  title: 'Aapka Vision. Hamara Execution.',
  highlight: 'No Confusion!',
  subTitle: 'Click today move into your Dream Home Tomorrow.',
  media: 'https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778846969/AQPPPai3iDlmpoWAl2Do5RAPE5X-opF5dVERGYcK0KMopwZThd4xaz6sAKKnZPuHhL1767QbSXcO9pvrpYJ-1oC9QZJR5f_tiq89RE4_detdg9.mp4',
  mediaAlt: '',
  formTitle: 'Beautiful Designs That Fit Your Budget',
  formSubtitle: 'Beauty That Works, Function That Inspires! Guaranteed,',
  formBadge: 'Free Design Consultation',
  formName: 'Hero form',
};

// Big banner with a lead form. Used on the home page and on service pages (e.g. False Ceiling).
// media can be a video (.mp4) or an image.
const Hero = (props) => {
  const h = { ...HOME_HERO, ...props };
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    const digits = formData.phone.replace(/\D/g, '');
    if (!formData.name.trim()) next.name = 'Please enter your name';
    if (formData.countryCode === '+91' ? !/^[6-9]\d{9}$/.test(digits) : !/^\d{6,14}$/.test(digits)) {
      next.phone = 'Please enter a valid phone number';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) next.email = 'Please enter a valid email';
    if (!formData.city) next.city = 'Please select your city';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting || !validate()) return;

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/save-lead`, {
        name: formData.name.trim(),
        phone: `${formData.countryCode} ${formData.phone.replace(/\D/g, '')}`,
        email: formData.email.trim(),
        city: formData.city,
        locality: formData.locality.trim(),
        page: window.location.pathname,
      });
      trackLead({ leadId: res.data?.leadId, city: formData.city, form: h.formName });
      messageApi.success('Thank you! Our design expert will call you shortly.');
      setFormData(EMPTY_FORM);
    } catch (err) {
      messageApi.error('Could not send your request. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  // Country codes for the phone field (India first = default); flags from flagcdn.com
  const countryCodes = [
    { code: '+91', iso: 'in', name: 'India' },
    { code: '+971', iso: 'ae', name: 'UAE' },
    { code: '+1', iso: 'us', name: 'USA / Canada' },
    { code: '+44', iso: 'gb', name: 'UK' },
    { code: '+61', iso: 'au', name: 'Australia' },
    { code: '+65', iso: 'sg', name: 'Singapore' },
    { code: '+966', iso: 'sa', name: 'Saudi Arabia' },
    { code: '+974', iso: 'qa', name: 'Qatar' },
    { code: '+968', iso: 'om', name: 'Oman' },
    { code: '+965', iso: 'kw', name: 'Kuwait' },
    { code: '+977', iso: 'np', name: 'Nepal' },
  ];

  const flagImg = (iso) => (
    <img
      className="country-flag"
      src={`https://flagcdn.com/w40/${iso}.png`}
      srcSet={`https://flagcdn.com/w80/${iso}.png 2x`}
      alt=""
      width="20"
      height="15"
    />
  );

  const countryOptions = countryCodes.map((c) => ({
    value: c.code,
    searchText: `${c.name} ${c.code}`,
    label: <span className="country-option">{flagImg(c.iso)}{c.code}</span>,
    full: <span className="country-option">{flagImg(c.iso)}<span className="country-option-name">{c.name}</span><span className="country-option-code">{c.code}</span></span>,
  }));

  const isVideo = /\.mp4($|\?)/.test(h.media);

  return (
    <div className="hero-container-wrapper">
      {contextHolder}
      <div className="hero-banner">

        {isVideo ? (
          <video
            ref={(el) => {
              if (el) {
                el.play().catch(error => {
                  console.log("Autoplay prevented:", error);
                });
              }
            }}
            muted
            loop
            playsInline
            onCanPlayThrough={(e) => {
              e.target.play().catch(err => console.log("CanPlayThrough play error:", err));
            }}
            className="hero-bg-video"
          >
            <source src={h.media} type="video/mp4" />
          </video>
        ) : (
          <img src={h.media} alt={h.mediaAlt} className="hero-bg-video" fetchpriority="high" decoding="async" />
        )}

        <div className="hero-overlay"></div>

        <div className="hero-content-layout">
          {/* Left Side Text Content: soft dark shadow behind the heading */}
          <div className="hero-text-section">
            <div className="hero-text-glass">
              <Title className="hero-main-title">
                {h.title}
                {h.highlight && <>{' '}<span className="hero-title-accent">{h.highlight}</span></>}
              </Title>
              {h.subTitle && (
                <p className="hero-sub-text">
                  {h.subTitle}
                </p>
              )}
            </div>
          </div>

          <div className="hero-form-card">
            <span className="form-card-badge"><CheckCircleFilled /> {h.formBadge}</span>
            <h2 style={{ fontSize: 23, fontWeight: 600, color: '#1F2A44', margin: '0 0 6px', lineHeight: 1.3, fontFamily: 'inherit' }}>
              {h.formTitle}
            </h2>
            <p className="form-card-subtitle">{h.formSubtitle}</p>

            <form className="form-fake-inputs" onSubmit={handleSubmit} noValidate>
              <div className="hero-field">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={errors.name ? 'has-error' : ''}
                  autoComplete="given-name"
                  aria-label="Name"
                />
                {errors.name && <span className="hero-field-error">{errors.name}</span>}
              </div>

              <div className="hero-field">
                <div className={`phone-input-mock${errors.phone ? ' has-error' : ''}`}>
                  <Select
                    className="country-code-select"
                    classNames={{ popup: { root: 'country-code-dropdown' } }}
                    value={formData.countryCode}
                    onChange={(value) => updateField('countryCode', value)}
                    options={countryOptions}
                    optionRender={(option) => option.data.full}
                    showSearch={{ optionFilterProp: 'searchText' }}
                    popupMatchSelectWidth={240}
                    variant="borderless"
                    aria-label="Country code"
                  />
                  <input
                    type="tel"
                    placeholder="Number"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value.replace(/[^\d\s-]/g, ''))}
                    autoComplete="tel-national"
                    maxLength={15}
                    aria-label="Mobile number"
                  />
                </div>
                {errors.phone && <span className="hero-field-error">{errors.phone}</span>}
              </div>

              <div className="hero-field">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={errors.email ? 'has-error' : ''}
                  autoComplete="email"
                  aria-label="Email"
                />
                {errors.email && <span className="hero-field-error">{errors.email}</span>}
              </div>

              <div className="hero-field-row">
                <div className="hero-field">
                  <select
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className={`${errors.city ? 'has-error' : ''}${formData.city ? '' : ' is-empty'}`}
                    aria-label="City"
                  >
                    <option value="">City</option>
                    {inquiryOptions.serviceAreas.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.city && <span className="hero-field-error">{errors.city}</span>}
                </div>
                <div className="hero-field">
                  <input
                    type="text"
                    placeholder="Locality (optional)"
                    value={formData.locality}
                    onChange={(e) => updateField('locality', e.target.value)}
                    maxLength={120}
                    aria-label="Locality or society (optional)"
                  />
                </div>
              </div>

              <button className="hero-quote-btn" type="submit" disabled={submitting}>
                {submitting ? 'Sending…' : <>Get Free Quote <ArrowRightOutlined /></>}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;