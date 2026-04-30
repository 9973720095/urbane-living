import React from 'react';
import { Typography, Row, Col, Image, Tag } from 'antd';
import './css/GallerySection.css';

const { Title, Paragraph } = Typography;

const GallerySection = () => {
  // Advanced Data Array
  const galleryData = [
    { src: "https://urbaneliving.in/wp-content/uploads/2024/11/Functional-Comfort-Kitchen-12.webp", title: "Modular Kitchen", category: "Modern" },
    { src: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1777364898/Capture_0A2_turzho_qpffdo.webp", title: "Luxury Living", category: "Premium" },
    { src: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1777365035/WhatsApp_Image_2020-09-22_at_1.16.34_PM_1_g0xszt_c6flzo.webp", title: "Minimalist Bedroom", category: "Cozy" },
    { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688", title: "Office Space", category: "Commercial" },
    { src: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1777366021/WhatsApp_Image_2020-09-23_at_6.09.20_PM_zhqh4p_e8h6bn.webp", title: "False Ceiling", category: "Exclusive" },
    { src: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1777366574/WhatsApp_Image_2020-09-22_at_1.06.25_PM_1_u1p5jh_arvloo.webp", title: "Dining Area", category: "Luxury" }
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