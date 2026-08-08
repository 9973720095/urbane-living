import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Typography, Spin, Avatar, Divider } from 'antd';
import axios from 'axios';

const { Title, Paragraph, Text } = Typography;

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://urbane-living.onrender.com';

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        const found = res.data.find(b => b._id === id);
        setBlog(found);
      } catch (err) {
        console.error("Error fetching blog details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, API_BASE_URL]);

  if (loading) return <div style={{ display: 'flex', height: '80vh', justifyContent: 'center', alignItems: 'center' }}><Spin size="large" description="Opening Design Details..." /></div>;
  if (!blog) return <div style={{ textAlign: 'center', padding: '100px' }}><Title level={3}>Blog Not Found</Title></div>;

  const breadcrumbItems = [
    { title: <Link to="/">Home</Link> },
    { title: <Link to="/blogs">Blog</Link> },
    { title: blog.title }
  ];

  // Default Image if blog.image is empty
  const displayImage = blog.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* --- 1. BANNER SECTION (FIXED) --- */}
      <div style={{ 
        height: '550px', 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${displayImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        padding: '0 20px',
        width: '100%'
      }}>
        <Title level={1} style={{ color: '#fff', fontSize: '48px', maxWidth: '900px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: '800' }}>
          {blog.title}
        </Title>
        <Paragraph style={{ color: '#f0f0f0', fontSize: '20px', maxWidth: '750px', marginBottom: '25px', lineHeight: '1.6' }}>
          {blog.description}
        </Paragraph>
      </div>

      {/* --- 2. BREADCRUMB & CONTENT SECTION --- */}
      <div style={{ padding: '50px 12%', maxWidth: '1400px', margin: '0 auto' }}>
        <Breadcrumb items={breadcrumbItems} style={{ marginBottom: '50px', fontSize: '15px' }} />

        {/* --- 3. PREMIUM ZIG-ZAG BODY DESIGN --- */}
        <div 
          className="blog-content-container" 
          style={{ 
            fontSize: '18px', 
            lineHeight: '2.1', 
            color: '#444',
            fontFamily: "'Poppins', sans-serif"
          }} 
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
        
        <Divider style={{ margin: '80px 0' }} />
        
        {/* Footer CTA */}
        <div style={{ textAlign: 'center', background: '#f9f9f9', padding: '50px', borderRadius: '20px' }}>
          <Title level={3} style={{ marginBottom: '10px' }}>Want a similar design for your home?</Title>
          <Paragraph style={{ color: '#777', fontSize: '16px', marginBottom: '30px' }}>Our experts at Urbane Living are just a call away from making your dream home a reality.</Paragraph>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Link to="/contact" style={{ background: '#ff3b30', color: '#fff', padding: '15px 35px', borderRadius: '8px', fontWeight: '700', boxShadow: '0 10px 20px rgba(255,59,48,0.3)' }}>
              GET FREE QUOTE
            </Link>
            <Link to="/blogs" style={{ border: '2px solid #333', color: '#333', padding: '13px 35px', borderRadius: '8px', fontWeight: '700' }}>
              BACK TO BLOGS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;