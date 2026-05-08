import React from 'react';
import { Button, Typography } from 'antd';
import './css/Hero.css';

const { Title } = Typography;

const Hero = ({ onOpenForm }) => {
  // Maine sirf essential parameters rakhe hain: eco quality aur auto format
  // Isse loading fast hogi aur video har jagah chalegi
  const videoUrl = "https://res.cloudinary.com/diosq0s7w/video/upload/q_auto:eco,f_auto,w_1280/v1778159582/1778158550903851_1_1_xyklz1.mp4";

  return (
    <div className="hero-video-wrapper">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hero-video-bg"
        poster="https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1777364630/UrbaneLivingHeroBanner_faocax.webp"
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback agar video load na ho sake */}
        Your browser does not support the video tag.
      </video>

      <div className="hero-overlay"></div>

      <div className="hero-content-video">
        <Title className="hero-title">Get Your False Ceiling in <br /> <span className='homehero_special_txt'>Just 7 Days*</span></Title>
        <p className="hero-subtitle">
          Click today move into your Dream Home Tomorrow.
        </p>
        <Button className="explore-btn" onClick={onOpenForm}>BOOK NOW</Button>
      </div>

      <div className="hero-gradient"></div>
    </div>
  );
};

export default Hero;