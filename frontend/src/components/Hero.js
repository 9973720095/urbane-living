import React from 'react';
import { Carousel, Button, Typography } from 'antd';
import './css/Hero.css';

const { Title } = Typography;

const Hero = ({ onOpenForm }) => {
  const slides = [
    { 
      id: 1, 
      title: <>Get Your False Ceiling in <span style={{ color: '#fecb29' }}>Just 7 Days*</span></>, 
      img: "https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778846969/AQPPPai3iDlmpoWAl2Do5RAPE5X-opF5dVERGYcK0KMopwZThd4xaz6sAKKnZPuHhL1767QbSXcO9pvrpYJ-1oC9QZJR5f_tiq89RE4_detdg9.mp4"
    },
    {
      id: 2, 
      title: <>Make a <span style={{ color: '#fecb29' }}>wow Statement</span> with your ceiling</>, 
      img: "https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778846966/AQNHzwpwFyeQBl1fShnnPsNy3YfsgzRTAldYRiVOJY_FP4-CUXJvJR_4lwdAhitU4kF17i4k35Wvr2r8CTCrFICqWmV1LIyus9G2NMI_qudu19.mp4" 
    },
    { 
      id: 3, 
      title: <>Make a <span style={{ color: '#fecb29' }}>wow Statement</span> with your ceiling</>, 
      img: "https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778846977/AQMIut8uyLZ2ImjMQcND2FjYafA-KGUlgXJrVxy1cC68xgtTed8f1iES_Ljg1kpCHagXZxCjMw9qRTtwHgXxm_BvBuN1behbl1mC8YY_m5e37i.mp4" 
    },
    { 
      id: 4, 
      title: <>Make a <span style={{ color: '#fecb29' }}>wow Statement</span> with your ceiling</>, 
      img: "https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778846971/AQNqIaCU_-L4b5BOQTJLKgQS--Dum1Q4v5A_VsmLok7fcxrt0B7m8mnjduJVZOBeoKRQV_evQOl-oh-CAhZy26yyijtUaXsydmb4uoM_olmkpr.mp4" 
    }
  ];

  return (
    <Carousel 
      className='hero_carousel' 
      dots={false} 
      arrows={false} 
      autoplay={true} 
      autoplaySpeed={5000} 
      effect="fade"
    >
      {slides.map(slide => {
        const isVideo = slide.img.endsWith('.mp4');

        return (
          <div key={slide.id}>
            <div className="hero-banner" style={{ 
              position: 'relative',
              height: '550px',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              textAlign: 'center', 
              color: '#fff',
              overflow: 'hidden',
              backgroundImage: !isVideo ? `url('${slide.img}')` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              
              {isVideo && (
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  onCanPlayThrough={(e) => e.target.play()} 
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1
                  }}
                >
                  <source src={slide.img} type="video/mp4" />
                </video>
              )}

              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', zIndex: 0 }}></div>

              <div className="hero-content" style={{ zIndex: 1 }}>
                <Title style={{ 
                  color: '#ffffff', fontSize: '56px', fontWeight: 700, lineHeight: 1.2, textShadow: '0 4px 20px rgba(0,0,0,0.5)', marginBottom: '16px'
                }}>
                  {slide.title}
                </Title>
                <p style={{ fontSize: '19px', maxWidth: '750px', margin: '0 auto 32px', color: 'rgba(255,255,255,0.95)', textShadow: '0 2px 10px rgba(0,0,0,0.6)', lineHeight: 1.6 }}>
                  Click today move into your Dream Home Tomorrow.
                </p>
                {<Button className="explore-btn" onClick={onOpenForm}>Explore Package</Button>}
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Hero;