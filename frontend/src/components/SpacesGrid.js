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
    { title: 'New York Loft', img: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1775823384/ChatGPT_Image_Apr_10_2026_05_45_07_PM_kwsvlf.png' },
    { title: 'Sydney Opera House', img: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1775826207/IMG_5562_n2vu5j.jpg' },
    { title: 'Melbourne City', img: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1775826251/IMG_5560_jncyvh.jpg' },
    { title: 'Great Barrier Reef', img: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1775826281/IMG_5565_ksoelf.jpg' }
  ];

  if (!isClient) return null;

  return (
    <div className="spaces-section">
      <div className="section-header">
        <Title level={2}>
          A Click Today Brings Your <span className="purple-text">Dream Home Closer.</span>
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
                <Paragraph type="secondary">
                  Because only the finest designs will satisfy your desire for perfection.
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