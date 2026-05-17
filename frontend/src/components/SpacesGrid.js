import React, { useState, useEffect } from 'react';
import { Carousel, Card, Button, Typography } from 'antd';
import './css/SpacesGrid.css';

const { Title, Paragraph } = Typography;

const SpacesGrid = ({ onOpenForm }) => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 992) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = [
    { 
      title: 'Elegant Living Spaces', 
      subtitle: 'Create a lasting first impression with designer ceilings that radiate warmth and luxury',
      img: 'https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778839744/AQPhaRo_a-msuEzQOK7x3YpSYHWTfUY8uLWN4iQ3rkvvPp20GVJbk3BLFOJbalAv6GAPGRPDJ2sHF4zbGlqw5b2PWUeiH5jdTQm3bbE_nnrkk3.mp4' 
    },
    { 
      title: 'Dreamy Bedroom Retrears', 
      subtitle: 'Experience ultimate comfort with ambient lighting and acoustic-friendly ceiling designs.',
      img: 'https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778841063/AQOPehEm1fYTPYDa4uXJixmnSPgh-IIRDGgy22OaHWrvmy_qMoE_nA8hNNERzHG2UUBlApGeUSSqUA7Ayifn9qfROxxfjDXmQ7-DbPY_xzkj0t.mp4' },
    { 
      title: 'Gourmet Style Kitchens', 
      subtitle:'Bright, moisture-resistant, and modern ceilings designed to make your cooking space feel spacious.',
      img: 'https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778841286/AQNA7088aweDdCcEuRKBCuk-1P7DjMBbOT7Cy9UDB4ksu8_rW7u9Huj9tVBhkLGFqrhLFRWLJ4faJWexBLUi_3Uf-8FkOyqatmcOfFA_iy7qef.mp4' },
    { 
      title: 'Scenic Balcony Views', 
      subtitle: 'Weather-resistant and stylish finishes that turn your balcony into a perfect relaxation spot.',
      img: 'https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778841391/AQO8hYQEZeJXZRk2dob-Wm8mYUAdz8m0M6DNaQ0cgpOhN6T4KVjd0k_SxPE1iOFzHDdM1EGqrgNX3Z9gebC4mamYO0PBYMhgYMX95i8_soamkt.mp4' }
  ];

  if (!isClient) return null;

  return (
    <div className="spaces-section">
      <div className="section-header">
        <Title level={2}>
          Make a wow Statement with <span style={{ color: '#4267b2', fontWeight: '700'}}> Your Ceiling </span> that reflect your signature style.
        </Title>
      </div>
      
      <Carousel 
        key={slidesToShow} 
        autoplay 
        autoplaySpeed={5000}
        slidesToShow={slidesToShow} 
        dots={false}
        className="custom-carousel"
        infinite={true}
      >
        {items.map((item, index) => {
          const isVideo = item.img && item.img.includes('.mp4');

          return (
            <div key={index} className="card-outer-wrapper">
              <Card 
                hoverable 
                className="dream-home-card"
                cover={
                  isVideo ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      onCanPlayThrough={(e) => e.target.play()}
                      className="card-img-top"
                      style={{ objectFit: 'cover', height: '200px', display: 'block' }}
                    >
                      <source src={item.img} type="video/mp4" />
                    </video>
                  ) : (
                    <img alt={item.title} src={item.img} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                  )
                }
              >
                <div className="card-inner-body">
                  <Title level={4}>{item.title}</Title>
                  <Paragraph type="secondary" className="card-subtitle">
                    {item.subtitle}
                  </Paragraph>
                  <Button block onClick={onOpenForm} className="quote-button">
                    GET FREE QUOTE
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default SpacesGrid;