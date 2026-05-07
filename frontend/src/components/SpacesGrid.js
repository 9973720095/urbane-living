import React, { useState, useEffect } from 'react';
import { Carousel, Card, Button, Typography } from 'antd';
import './css/SpacesGrid.css';

const { Title, Paragraph } = Typography;

const SpacesGrid = ({ onOpenForm }) => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Manual width check function
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 992) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    // Pehli baar check karein
    handleResize();

    // Resize hone par update karein
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = [
    { 
      title: 'Elegant Living Spaces', 
      subtitle: 'Create a lasting first impression with designer ceilings that radiate warmth and luxury',
      img: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1776425448/Capture_0A2_turzho.jpg' 
    },
    { 
      title: 'Dreamy Bedroom Retrears', 
      subtitle: 'Experience ultimate comfort with ambient lighting and acoustic-friendly ceiling designs.',
      img: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1776425442/WhatsApp_Image_2020-09-22_at_1.16.34_PM_wosi2t.jpg' },
    { 
      title: 'Gourmet Style Kitchens', 
      subtitle:'Bright, moisture-resistant, and modern ceilings designed to make your cooking space feel spacious.',
      img: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1777033122/unnamed_thrqhe.jpg' },
    { 
      title: 'Scenic Balcony Views', 
      subtitle: 'Weather-resistant and stylish finishes that turn your balcony into a perfect relaxation spot.',
      img: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1777033698/unnamed_1_hnspbk.jpg' }
  ];

  if (!isClient) return null;

  return (
    <div className="spaces-section">
      <div className="section-header">
        <Title level={2}>
          Make a wow Statement with <span className="purple-text"> Your Ceiling </span> that reflect your signature style.
        </Title>
      </div>
      
      <Carousel 
        key={slidesToShow} // CRITICAL: Ye Carousel ko force-refresh karega jab screen change hogi
        autoplay 
        slidesToShow={slidesToShow} 
        dots={false}
        className="custom-carousel"
        infinite={true}
      >
        {items.map((item, index) => (
          <div key={index} className="card-outer-wrapper">
            <Card 
              hoverable 
              className="dream-home-card"
              cover={<img alt={item.title} src={item.img} className="card-img-top" />}
            >
              <div className="card-inner-body">
                <Title level={4}>{item.title}</Title>
                <Paragraph type="secondary" className="card-subtitle">
                  {item.subtitle}
                </Paragraph>
                <Button type="primary" block onClick={onOpenForm} className="quote-button">
                  GET FREE QUOTE
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SpacesGrid;