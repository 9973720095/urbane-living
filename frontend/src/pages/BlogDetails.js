import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Typography, Spin } from 'antd';
import axios from 'axios';

const { Title } = Typography;

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

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>;
  if (!blog) return <div style={{ textAlign: 'center', padding: '100px' }}>Blog not found</div>;

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* 1. Hero Banner with Image URL background */}
      <div style={{ 
        height: '450px', 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${blog.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center'
      }}>
        <Title level={1} style={{ color: '#fff', fontSize: '38px', padding: '0 20px' }}>{blog.title}</Title>
      </div>

      <div style={{ padding: '30px 10%' }}>
        <Breadcrumb style={{ marginBottom: '30px' }}>
          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/blogs">Blog</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{blog.title}</Breadcrumb.Item>
        </Breadcrumb>

        {/* 3. Rendering HTML Code from Admin */}
        <div 
          className="blog-main-body" 
          style={{ fontSize: '18px', lineHeight: '1.8' }} 
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
      </div>
    </div>
  );
};

export default BlogDetails;