import React from 'react';
import { Carousel, Button, Typography } from 'antd';
import './css/Hero.css';

const { Title } = Typography;

const Hero = ({ onOpenForm }) => {
  const slides = [
    { 
      id: 1, 
      title: "Imagine a world of USA", 
      img: "https://res.cloudinary.com/diosq0s7w/image/upload/v1775817803/Gemini_Generated_Image_e760mue760mue760_hs7raz.png" 
    },
    { 
      id: 2, 
      title: "Luxury Redefined", 
      img: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1775818743/Gemini_Generated_Image_e760mue760mue760_1_aprjnf.png" 
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
              <Title style={{ color: '#7b42f5', fontSize: '52px' }}>{slide.title}</Title>
              <p style={{fontSize: '18px', maxWidth: '750px', margin: '0 auto 30px' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
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