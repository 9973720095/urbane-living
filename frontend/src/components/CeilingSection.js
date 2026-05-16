import React from 'react';
import { Row, Col, Typography, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;

const CeilingSection = () => {
  return (
    <div
      className="ceiling-section"
      style={{
        padding: "40px 5%", // Mobile friendly padding
        // backgroundImage: "url('/images/marble-bg.png')", // Path updated
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundAttachment: 'fixed',
        background: "rgb(235 235 235)",
        overflow: "hidden",
      }}
    >
      <Row
        align="middle"
        gutter={[40, 40]}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <Col xs={24} md={12}>
          <Space direction="vertical" size="middle">
            <Text
              strong
              style={{
                color: "#fecb29",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Premium Interior Solutions
            </Text>
            <Title
              level={2}
              style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: "1", marginTop: '0px' }}
            >
              The Art of Silence and Light: <br />
              <span style={{ color: "#fecb29" }}>Signature Ceilings</span>
            </Title>
            <Paragraph
              style={{ fontSize: "18px", color: "#555", lineHeight: "1.8" }}
            >
              Transform your overhead space into a captivating masterpiece. Our
              UrbaneLiving-certified installations offer sculpted architectural
              depth and intimate, premium ambiance that lasts a lifetime.
            </Paragraph>
            <ul
              style={{ color: "#666", paddingLeft: "20px", fontSize: "16px" }}
            >
              <li>100% Termite Proof</li>
              <li>Fire Resistant Material</li>
              <li>Seamless Lighting Integration</li>
            </ul>
          </Space>
        </Col>

        <Col xs={24} md={12}>
          <div
            style={{
              padding: "12px",
              background: "#fff",
              borderRadius: "20px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
              transition: "transform 0.3s ease",
            }}
            className="hover-zoom"
          >
            {/* <img 
              src="https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778833113/AQNqIaCU_-L4b5BOQTJLKgQS--Dum1Q4v5A_VsmLok7fcxrt0B7m8mnjduJVZOBeoKRQV_evQOl-oh-CAhZy26yyijtUaXsydmb4uoM_ra27o7.mp4" 
              alt="Premium Ceiling Design" 
              style={{ 
                width: '100%', 
                borderRadius: '12px',
                display: 'block'
              }}
            /> */}
            <video
  autoPlay
  muted
  loop
  playsInline
  onCanPlayThrough={(e) => e.target.play()} // Ye line video ko normally chalne par majboor karegi
  style={{
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 1, // Isse 1 kar do taaki image box ke upar dikhe
    borderRadius: "12px", // Border radius yahan bhi add kar do clean look ke liye
  }}
>
  <source src="https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778833113/AQNqIaCU_-L4b5BOQTJLKgQS--Dum1Q4v5A_VsmLok7fcxrt0B7m8mnjduJVZOBeoKRQV_evQOl-oh-CAhZy26yyijtUaXsydmb4uoM_ra27o7.mp4" />
</video>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CeilingSection;