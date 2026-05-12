import React from 'react';
import { Typography, Row, Col, Image, Tag } from 'antd';
import './css/GallerySection.css';

const { Title, Paragraph } = Typography;

const GallerySection = () => {
  // Advanced Data Array
  const galleryData = [
    { src: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583856/hf_20260512_054108_38408685-f67f-4515-a822-985d83019979_y6nnq9.png", title: "Living Ceiling", category: "Modern" },
    { src: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583838/ChatGPT_Image_May_12_2026_03_16_05_PM_pnlauy.png", title: "Master Bedroom Ceiling", category: "Premium" },
    { src: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778585454/ChatGPT_Image_May_12_2026_04_30_35_PM_ptqgea.png", title: "Kid's Bedroom", category: "Cozy" },
    { src: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_38_54_PM_v8bjr3.png", title: "Kitchen False Ceiling", category: "Commercial" },
    { src: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_35_05_PM_tolwlu.png", title: "False Ceiling", category: "Exclusive" },
    { src: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583833/ChatGPT_Image_May_12_2026_02_40_56_PM_zkd6ex.png", title: "Parents Room", category: "Luxury" }
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