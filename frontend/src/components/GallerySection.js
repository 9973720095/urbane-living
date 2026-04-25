import React from 'react';
import { Typography, Row, Col, Image, Tag } from 'antd';
import './css/GallerySection.css';

const { Title, Paragraph } = Typography;

const GallerySection = () => {
  // Advanced Data Array
  const galleryData = [
    { src: "https://urbaneliving.in/wp-content/uploads/2024/11/Functional-Comfort-Kitchen-12.webp", title: "Modular Kitchen", category: "Modern" },
    { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6", title: "Luxury Living", category: "Premium" },
    { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f", title: "Minimalist Bedroom", category: "Cozy" },
    { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688", title: "Office Space", category: "Commercial" },
    { src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36", title: "False Ceiling", category: "Exclusive" },
    { src: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88", title: "Dining Area", category: "Luxury" }
  ];

  return (
    <div className="gallery-wrapper">
      <div className="gallery-header">
        <Title level={2} className="gallery-title">OUR MASTERPIECES</Title>
        <div className="title-underline"></div>
        <Paragraph className="gallery-subtitle">
          Transforming spaces into experiences. Explore our latest interior and ceiling projects.
        </Paragraph>
      </div>

      <Image.PreviewGroup>
        <Row gutter={[24, 24]} className="gallery-row">
          {galleryData.map((item, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <div className="gallery-card">
                <div className="image-container">
                  <Image
                    src={item.src}
                    alt={item.title}
                    className="gallery-main-img"
                    preview={{ mask: <div className="custom-mask">VIEW PROJECT</div> }}
                  />
                  {/* Floating Info Overlay */}
                  <div className="item-details">
                    <Tag color="gold" className="category-tag">{item.category}</Tag>
                    <h4 className="item-title">{item.title}</h4>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Image.PreviewGroup>
    </div>
  );
};

export default GallerySection;