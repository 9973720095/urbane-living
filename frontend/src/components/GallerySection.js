import React from 'react';
import { Typography, Row, Col, Image } from 'antd';
import './css/GallerySection.css';

const { Title, Paragraph } = Typography;

const GallerySection = () => {
  // Demo images array (Aap yahan apni baki images add kar sakte hain)
  const images = [
    "https://urbaneliving.in/wp-content/uploads/2024/11/Functional-Comfort-Kitchen-12.webp",
    "https://urbaneliving.in/wp-content/uploads/2024/11/Functional-Comfort-Kitchen-12.webp",
    "https://urbaneliving.in/wp-content/uploads/2024/11/Functional-Comfort-Kitchen-12.webp",
    "https://urbaneliving.in/wp-content/uploads/2024/11/Functional-Comfort-Kitchen-12.webp",
    "https://urbaneliving.in/wp-content/uploads/2024/11/Functional-Comfort-Kitchen-12.webp",
    "https://urbaneliving.in/wp-content/uploads/2024/11/Functional-Comfort-Kitchen-12.webp"
  ];

  return (
    <div className="gallery-wrapper">
      <div className="gallery-header">
        <Title level={2} className="gallery-title">OUR GALLERY</Title>
        <Paragraph className="gallery-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.
        </Paragraph>
      </div>

      {/* Image Preview Group se saari images click karne pe slide show ban jayengi */}
      <Image.PreviewGroup>
        <Row gutter={[16, 16]} className="gallery-row">
          {images.map((img, index) => (
            <Col xs={24} sm={12} md={8} lg={8} key={index}>
              <div className="gallery-img-container">
                <Image
                  src={img}
                  alt={`Gallery ${index}`}
                  className="gallery-item"
                  placeholder={
                    <div className="img-loader">Loading...</div>
                  }
                />
              </div>
            </Col>
          ))}
        </Row>
      </Image.PreviewGroup>
    </div>
  );
};

export default GallerySection;