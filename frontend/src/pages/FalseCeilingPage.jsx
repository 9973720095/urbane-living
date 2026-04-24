import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Tag, Row, Col, Select, Pagination } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import ThreeViews from "../components/FalseCeiling/ThreeViews";
import CostEstimator from "../components/FalseCeiling/CostEstimator"; 
import "./falseCeiling.css";

const { Option } = Select;

export default function FalseCeilingPage({ onOpenForm }) {
  // STATES
  const [designs, setDesigns] = useState([]);
  const [filters, setFilters] = useState({ category: "", style: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); 

  // Dynamic API URL for Local/Mobile connectivity
  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://urbane-living.onrender.com';

  // Responsive PageSize Logic
  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      if (width < 576) setPageSize(2);      // Mobile: 2 cards
      else if (width < 992) setPageSize(4); // Tablet: 4 cards
      else setPageSize(8);                  // Desktop: 8 cards
    };
    updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  const fetchDesigns = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/designs`, { params: filters });
      setDesigns(res.data);
    } catch (err) {
      console.log("Error fetching designs:", err);
    }
  };

  useEffect(() => {
    fetchDesigns();
    setCurrentPage(1); 
  }, [filters]);

  // Pagination Slicing
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = designs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="false-ceiling-page">
      {/* HERO SECTION */}
      <div className="hero">
        <div className="overlay">
          <h1>Turn Your Home Into Luxury in 7 Days</h1>
          <p>Premium False Ceiling Designs Starting ₹79/sqft</p>
          <div className="btn-group">
            <Button type="primary" size="large" onClick={onOpenForm}>Get Free Design</Button>
            <Button icon={<WhatsAppOutlined />} size="large">WhatsApp Now</Button>
          </div>
        </div>
      </div>

      <ThreeViews />
      <CostEstimator />

      {/* FILTERS SECTION - All Original Options Restored */}
      <div className="filters" style={{ padding: '40px 20px', textAlign: 'center', background: '#f9f9f9' }}>
        <h2 style={{ marginBottom: 20 }}>Explore Our Designs</h2>
        <Row gutter={[12, 12]} justify="center">
          <Col xs={24} sm={8}>
            <Select 
              placeholder="Room Type" 
              style={{ width: '100%', maxWidth: 180 }} 
              onChange={(v) => setFilters(p => ({...p, category: v}))}
            >
              <Option value="living">Living Room</Option>
              <Option value="bedroom">Bedroom</Option>
              <Option value="kitchen">Kitchen</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <Select placeholder="Budget" style={{ width: '100%', maxWidth: 180 }}>
              <Option value="low">₹50–₹100</Option>
              <Option value="high">₹100–₹200</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <Select 
              placeholder="Style" 
              style={{ width: '100%', maxWidth: 180 }} 
              onChange={(v) => setFilters(p => ({...p, style: v}))}
            >
              <Option value="modern">Modern</Option>
              <Option value="luxury">Luxury</Option>
              <Option value="minimalist">Minimalist</Option>
            </Select>
          </Col>
        </Row>
      </div>

      {/* DESIGN CARDS GRID - Fixed for 2 cards on mobile */}
      <div className="container filter-content" style={{ padding: '20px' }}>
        <Row gutter={[16, 16]}>
          {currentItems.map((item) => (
            <Col xs={12} sm={12} md={6} key={item._id || item.id}> 
              <Card 
                hoverable
                cover={<img src={item.image} alt={item.title} style={{ height: window.innerWidth < 576 ? 130 : 200, objectFit: 'cover' }} />}
                bodyStyle={{ padding: '10px' }}
              >
                <h4 style={{ fontSize: '14px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h4>
                <p style={{ fontWeight: "bold", color: '#1890ff', margin: '5px 0' }}>₹{item.price}/sqft</p>
                <Button type="primary" block size="small" onClick={onOpenForm}>Get Quote</Button>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination Logic */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Pagination 
            current={currentPage} 
            pageSize={pageSize} 
            total={designs.length} 
            onChange={(page) => setCurrentPage(page)}
            simple={window.innerWidth < 576} // Clean UI for mobile
          />
        </div>
      </div>
    </div>
  );
}