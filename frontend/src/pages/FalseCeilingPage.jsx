import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Tag, Row, Col, Select } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

// Fixed Imports: Ensuring components are named correctly
import ThreeViews from "../components/FalseCeiling/ThreeViews";
import CostEstimator from "../components/FalseCeiling/CostEstimator"; 
import "./falseCeiling.css";

const { Option } = Select;

export default function FalseCeilingPage({ onOpenForm }) {
  // STATES
  const [designs, setDesigns] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    style: ""
  });

  // API
  const fetchDesigns = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/designs", {
        params: filters
      });
      setDesigns(res.data);
    } catch (err) {
      console.log("Error fetching designs:", err);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, [filters]);

  return (
    <div className="false-ceiling-page">
      {/* HERO SECTION */}
      <div className="hero">
        <div className="overlay">
          <h1>Turn Your Home Into Luxury in 7 Days</h1>
          <p>Premium False Ceiling Designs Starting ₹79/sqft</p>

          <div className="btn-group">
            <Button type="primary" size="large" onClick={onOpenForm}>
              Get Free Design
            </Button>
            <Button icon={<WhatsAppOutlined />} size="large">
              WhatsApp Now
            </Button>
          </div>
        </div>
      </div>

      {/* 3D VISUALIZER SECTION */}
      <ThreeViews />

      {/* COST CALCULATOR SECTION */}
      <CostEstimator />

      {/* FILTERS SECTION */}
      <div className="filters" style={{ padding: '40px 20px', textAlign: 'center',
        marginBottom: '0', background: '#f9f9f9' }}>
        <h2 style={{ marginBottom: 20 }}>Explore Our Designs</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col>
            <Select 
              placeholder="Room Type" 
              style={{ width: 180 }}
              onChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
            >
              <Option value="living">Living Room</Option>
              <Option value="bedroom">Bedroom</Option>
              <Option value="kitchen">Kitchen</Option>
            </Select>
          </Col>
          <Col>
            <Select 
              placeholder="Budget" 
              style={{ width: 180 }}
            >
              <Option value="low">₹50–₹100</Option>
              <Option value="high">₹100–₹200</Option>
              
            </Select>
          </Col>
          <Col>
            <Select 
              placeholder="Style" 
              style={{ width: 180 }} 
              onChange={(value) => setFilters((prev) => ({ ...prev, style: value }))}
            >
              <Option value="modern">Modern</Option>
              <Option value="luxury">Luxury</Option>
              <Option value="minimalist">Minimalist</Option>
            </Select>
          </Col>
        </Row>
      </div>

      {/* DESIGN CARDS GRID */}
      <div className="container filter-content" style={{ padding: '20px' }}>
        <Row gutter={[24, 24]}>
          {designs.map((item) => (
            <Col xs={12} md={12} lg={6} key={item._id || item.id}>
              <Card 
                hoverable
                cover={<img src={item.image} alt={item.title} style={{ height: 200, objectFit: 'cover' }} />}
              >
                <div style={{ marginBottom: 10 }}>
                  <h3 style={{ margin: 0 }}>{item.title}</h3>
                  <div style={{ marginTop: 5 }}>
                    <Tag style={{ color: 'blue', marginRight: 5}}>{item.style}</Tag>
                    <Tag color="purple">{item.category}</Tag>
                  </div>
                </div>
                <p style={{ fontWeight: "bold", fontSize: 18, color: '#1890ff' }}>₹{item.price}/sqft</p>
                <Button type="primary" block onClick={onOpenForm}>
                  Get Quote
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}