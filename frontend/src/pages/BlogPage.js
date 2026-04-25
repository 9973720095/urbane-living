import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Breadcrumb, Tag, Spin } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BlogPage.css';

const { Title, Paragraph } = Typography;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://urbane-living.onrender.com';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [API_BASE_URL]);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><Spin size="large" /></div>;

  return (
    <div className="blog-page-main">
      {/* 2. Hero Banner (Gyproc Style Analysis) */}
      <div className="blog-hero-section">
        <Title level={1} className="hero-title">
          Upgrade your home in no time with these quick renovation ideas
        </Title>
        <Paragraph className="hero-subtitle">
          Most of us do not take up home renovation projects as they are time-consuming. But, with the right planning and some creative interior design ideas, you can transform your home in no time.
        </Paragraph>
      </div>

      <div className="blog-content-wrapper">
        {/* 1. Breadcrumb */}
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Blog</Breadcrumb.Item>
        </Breadcrumb>

        <Row gutter={[32, 32]}>
          {blogs.map((blog) => (
            <Col xs={24} sm={12} md={8} key={blog._id}>
              <Link to={`/blog/${blog._id}`}>
                <Card
                  hoverable
                  className="blog-item-card"
                  cover={<img alt={blog.title} src={blog.image} className="card-img" />}
                >
                  {/* 4. Category Display */}
                  <Tag color="blue" className="blog-tag">{blog.category}</Tag>
                  
                  <Title level={4} className="blog-item-title">{blog.title}</Title>
                  
                  {/* 5. Description logic (Automatic 2.5 rows) */}
                  <Paragraph 
                    className="blog-item-desc"
                    ellipsis={{ rows: 2, expandable: false, symbol: '...' }}
                  >
                    {blog.description}
                  </Paragraph>
                  
                  <div className="blog-item-date">
                    {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default BlogPage;