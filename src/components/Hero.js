import React from 'react';
import { Typography } from 'antd';
import './css/Hero.css';

const { Title } = Typography;

const Hero = ({ onOpenForm }) => {
  // Single static content (Slider removed)
  const slide = { 
    id: 1, 
    title: <>Get Your False Ceiling <br />in <span style={{ color: '#FFB800' }}>Just 7 Days*</span></>, 
    subTitle: "Click today move into your Dream Home Tomorrow.",
    img: "https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778846969/AQPPPai3iDlmpoWAl2Do5RAPE5X-opF5dVERGYcK0KMopwZThd4xaz6sAKKnZPuHhL1767QbSXcO9pvrpYJ-1oC9QZJR5f_tiq89RE4_detdg9.mp4" 
  };

  const isVideo = slide.img.endsWith('.mp4');

  return (
    <div className="hero-container-wrapper">
      <div className="hero-banner" style={{ 
        backgroundImage: !isVideo ? `url('${slide.img}')` : 'none',
      }}>
        
        {isVideo && (
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
            <source src={slide.img} type="video/mp4" />
          </video>
        )}

        <div className="hero-overlay"></div>

        <div className="hero-content-layout">
          {/* Left Side Text Content */}
          <div className="hero-text-section">
            <Title className="hero-main-title">
              {slide.title}
            </Title>
            <p className="hero-sub-text">
              {slide.subTitle}
            </p>
          </div>

          <div className="hero-form-card">
            <h3>Beautiful Designs That Fit Your Budget</h3>
            <p className="form-card-subtitle">Beauty That Works, Function That Inspires! Guaranteed,</p>
            
            <div className="form-fake-inputs">
              <input type="text" placeholder="First Name" />
              <div className="phone-input-mock">
                <span className="flag-icon">🇮🇳 ▼</span>
                <input type="text" placeholder="Phone Number" />
              </div>
              <input type="email" placeholder="Enter Your Email" />
              <button className="hero-quote-btn" type="button" onClick={onOpenForm}>Get Free Quote</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;