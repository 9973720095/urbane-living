import React from 'react';
import { Carousel, Button, Typography } from 'antd';
import './css/Hero.css';

const { Title } = Typography;

const Hero = ({ onOpenForm }) => {
  const slides = [
    { 
      id: 1, 
      title: "Get Your False Ceiling in Just 7 Days*", 
      img: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_35_05_PM_tolwlu.png"
    },
    { 
      id: 2, 
      title: "Make a wow Statement with your ceiling", 
      img: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583840/ChatGPT_Image_May_12_2026_03_30_19_PM_mp1xmh.png" 
    },
    { 
      id: 3, 
      title: "Make a wow Statement with your ceiling", 
      img: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583840/ChatGPT_Image_May_12_2026_03_30_11_PM_ksdh8h.png" 
    },
    { 
      id: 4, 
      title: "Make a wow Statement with your ceiling", 
      img: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583833/ChatGPT_Image_May_12_2026_02_44_34_PM_pm4iga.png" 
    }
  ];

  return (
    <Carousel className='hero_carousel'
      dots={false} 
      arrows={true} 
      autoplay effect="fade">
      {slides.map(slide => (
        <div key={slide.id}>
          <div className="hero-banner" style={{ 
            backgroundImage: `url('${slide.img}')`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '550px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center', 
            color: '#fff'
          }}>
            <div className="hero-content">
              <Title style={{ 
                color: '#ffffff', 
                fontSize: '56px',
                fontWeight: 700,
                fontFamily: "'Poppins', 'Inter', sans-serif",
                lineHeight: 1.2,
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                marginBottom: '16px',
                letterSpacing: '-0.5px'
              }}>
                {slide.title}
              </Title>
              <p style={{
                fontSize: '19px', 
                maxWidth: '750px', 
                margin: '0 auto 32px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                lineHeight: 1.6
              }}>
                Click today move into your Dream Home Tomorrow.
              </p>
              <Button className="explore-btn" onClick={onOpenForm}>Explore Package</Button>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Hero;