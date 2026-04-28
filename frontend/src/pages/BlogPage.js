import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Breadcrumb, Spin, Avatar, Pagination } from 'antd'; // Pagination add kiya
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BlogPage.css';

const { Title, Paragraph, Text } = Typography;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const pageSize = 12; // 12 cards ke baad pagination aayega

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://urbane-living.onrender.com';

  const bannerImg = "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1776425437/WhatsApp_Image_2020-09-23_at_6.09.20_PM_zhqh4p.jpg";

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

  // Pagination Change Handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' }); // Banner ke niche scroll karega
  };

  // Logic to slice blogs for current page
  const indexOfLastBlog = currentPage * pageSize;
  const indexOfFirstBlog = indexOfLastBlog - pageSize;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  if (loading) return <div className="loader-container"><Spin size="large" description="Loading Trends..." /></div>;

  const breadcrumbItems = [
    { title: <Link to="/">Home</Link> },
    { title: 'Blog' }
  ];

  return (
    <div className="blog-wrapper">
      <div className="modern-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bannerImg})` }}>
        <div className="hero-overlay-box">
          <Title level={1} className="hero-main-title">OUR BLOG</Title>
          <div className="hero-divider"></div>
          <Paragraph className="hero-sub-para">Upgrade your home with modern renovation ideas and expert tips.</Paragraph>
        </div>
      </div>

      <div className="container-padding">
        <Breadcrumb items={breadcrumbItems} className="modern-breadcrumb" />
        
        {/* currentBlogs map kar rahe hain pagination ke liye */}
        <Row gutter={[32, 48]}>
          {currentBlogs.map((blog) => (
            <Col xs={24} sm={12} md={8} key={blog._id}>
              <Link to={`/blog/${blog._id}`}>
                <Card
                  hoverable
                  className="premium-blog-card"
                  cover={
                    <div className="card-img-container">
                      <img alt={blog.title} src={blog.image || "https://via.placeholder.com/400x250"} className="modern-card-img" />
                      <div className="modern-ticker">{blog.category || 'Interior Design'}</div>
                    </div>
                  }
                >
                  <Title level={4} className="card-blog-title" ellipsis={{ rows: 2 }}>{blog.title}</Title>
                  <Paragraph className="card-blog-desc" ellipsis={{ rows: 3 }}>{blog.description}</Paragraph>
                  
                  <div className="card-footer-branding">
                    <div className="author-info">
                      <Avatar size="small" src="https://urbaneliving.in/wp-content/uploads/2024/07/cropped-Untitled-design-87-png.webp" />
                      <Text className="author-name">Urbane Living</Text>
                    </div>
                    <Text className="blog-date">{new Date(blog.createdAt).toLocaleDateString('en-GB')}</Text>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Pagination Section Center Mein */}
        {blogs.length > pageSize && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
            <Pagination
              current={currentPage}
              total={blogs.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;