import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Table, Button, Modal, Form, Input, InputNumber, Select, message, Popconfirm, Drawer, Space } from 'antd';
import { DashboardOutlined, PlusOutlined, LogoutOutlined, SolutionOutlined, MenuOutlined, EditOutlined } from '@ant-design/icons';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';

const { Content, Sider, Header } = Layout;
const { Option } = Select;

const AdminDashboard = ({ onFinish }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [blogForm] = Form.useForm();
  
  // Existing States
  const [designs, setDesigns] = useState([]);
  const [leads, setLeads] = useState([]);
  const [blogs, setBlogs] = useState([]); 
  const [stats, setStats] = useState({ totalDesigns: 0, totalLeads: 0 });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBlogModalVisible, setIsBlogModalVisible] = useState(false); 
  const [activeTab, setActiveTab] = useState('1');
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Blog Specific States (New Logic)
  const [blogContent, setBlogContent] = useState(''); 
  const [editingBlog, setEditingBlog] = useState(null);
  const [isPreview, setIsPreview] = useState(false); // This acts as "Source Code" toggle

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://urbane-living.onrender.com';

  const fetchData = async () => {
    setLoading(true);
    try {
      const [designRes, leadRes, statRes, blogRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/designs?platform=app`),
        axios.get(`${API_BASE_URL}/api/leads`),
        axios.get(`${API_BASE_URL}/api/admin/stats`),
        axios.get(`${API_BASE_URL}/api/blogs`) 
      ]);
      setDesigns(designRes.data);
      setLeads(leadRes.data);
      setStats(statRes.data);
      setBlogs(blogRes.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // Design Logic (Untouched)
  const handleAddDesign = async (values) => {
    setLoading(true);
    const success = await onFinish(values, 'design');
    if (success) {
      setIsModalVisible(false);
      form.resetFields();
      fetchData(); 
    }
    setLoading(false);
  };

  // BLOG LOGIC (ANS Commerce Style - HTML Support)
  const handleOpenBlogModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setBlogContent(blog.content);
      blogForm.setFieldsValue(blog);
    } else {
      setEditingBlog(null);
      setBlogContent('');
      blogForm.resetFields();
    }
    setIsPreview(false); // Default to rich text editor
    setIsBlogModalVisible(true);
  };

  const handleSaveBlog = async (values) => {
    setLoading(true);
    try {
      const finalBlogData = { ...values, content: blogContent };
      
      if (editingBlog) {
        await axios.put(`${API_BASE_URL}/api/blogs/${editingBlog._id}`, finalBlogData);
        message.success("✅ Blog Updated Successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/api/blogs/add`, finalBlogData);
        message.success("✅ Blog Published Successfully!");
      }

      setIsBlogModalVisible(false);
      fetchData();
    } catch (err) {
      message.error("Action failed. Check console.");
    }
    setLoading(false);
  };

  const handleDelete = async (id, type) => {
    try {
      const endpoint = type === 'blog' ? `/api/blogs/${id}` : `/api/designs/${id}`;
      await axios.delete(`${API_BASE_URL}${endpoint}`); 
      message.success("Deleted successfully.");
      fetchData();
    } catch (err) {
      message.error("Delete failed.");
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => { navigate('/admin-login'); });
  };

  const MenuItems = (
    <Menu theme="dark" selectedKeys={[activeTab]} mode="inline" onClick={(e) => { setActiveTab(e.key); setDrawerVisible(false); }}>
      <Menu.Item key="1" icon={<DashboardOutlined />}>Designs & Stats</Menu.Item>
      <Menu.Item key="2" icon={<SolutionOutlined />}>Customer Leads</Menu.Item>
      <Menu.Item key="4" icon={<EditOutlined />}>Manage Blogs</Menu.Item> 
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: '#ff4d4f' }}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" theme="dark" className="desktop-sider">
        <div style={{ padding: '20px', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>URBANE ADMIN</div>
        {MenuItems}
      </Sider>

      <Drawer title="URBANE ADMIN" placement="left" onClose={() => setDrawerVisible(false)} open={drawerVisible}>
        {MenuItems}
      </Drawer>

      <Layout>
        <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button type="text" icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} className="mobile-menu-btn" />
            <h3 style={{ margin: 0 }}>{activeTab === '4' ? 'Blog Management' : 'Admin Panel'}</h3>
            {activeTab === '1' && <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>Add Design</Button>}
            {activeTab === '4' && <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenBlogModal()}>Create Blog</Button>}
        </Header>

        <Content style={{ margin: '24px' }}>
          {activeTab === '1' && (
            <>
              <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={12}><Card><Statistic title="Total Designs" value={stats.totalDesigns} /></Card></Col>
                <Col span={12}><Card><Statistic title="Active Leads" value={stats.totalLeads} /></Card></Col>
              </Row>
              <Card title="Designs List">
                <Table dataSource={designs} rowKey="_id" columns={[
                  { title: 'Title', dataIndex: 'title' },
                  { title: 'Price', dataIndex: 'price' },
                  { title: 'Action', render: (_, r) => <Button type="link" danger onClick={() => handleDelete(r._id, 'design')}>Del</Button> }
                ]} />
              </Card>
            </>
          )}

          {activeTab === '2' && (
            <Card title="Customer Leads">
              <Table dataSource={leads} rowKey="_id" columns={[{ title: 'Name', dataIndex: 'name' },{ title: 'Phone', dataIndex: 'phone' },{ title: 'Date', dataIndex: 'createdAt', render: (d) => new Date(d).toLocaleDateString() }]} />
            </Card>
          )}

          {activeTab === '4' && (
            <Card title="All Blogs">
              <Table dataSource={blogs} rowKey="_id" loading={loading} columns={[
                  { title: 'Preview', dataIndex: 'image', render: (img) => <img src={img} width="45" height="45" style={{ borderRadius: 4, objectFit: 'cover' }} /> },
                  { title: 'Title', dataIndex: 'title' },
                  { title: 'Category', dataIndex: 'category' },
                  { title: 'Action', render: (_, r) => (
                    <Space>
                      <Button type="link" onClick={() => handleOpenBlogModal(r)}>Edit</Button>
                      <Popconfirm title="Delete this blog?" onConfirm={() => handleDelete(r._id, 'blog')}>
                        <Button type="link" danger>Delete</Button>
                      </Popconfirm>
                    </Space>
                  )}
              ]} />
            </Card>
          )}
        </Content>
      </Layout>

      {/* DESIGN MODAL (Untouched) */}
      <Modal title="Add Design" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddDesign}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item label="Image URL" name="image" rules={[{ required: true }]}><Input /></Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>Publish</Button>
        </Form>
      </Modal>

      {/* BLOG MODAL (Updated for HTML Source Code & Description) */}
      <Modal 
        title={editingBlog ? "Edit Blog Content" : "Create New Blog"} 
        open={isBlogModalVisible} 
        onCancel={() => setIsBlogModalVisible(false)} 
        footer={null} 
        width={900}
      >
        <Form form={blogForm} layout="vertical" onFinish={handleSaveBlog}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item label="Blog Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Category" name="category" initialValue="Interior Design">
                <Select>
                  <Option value="False Ceiling">False Ceiling</Option>
                  <Option value="Interior Design">Interior Design</Option>
                  <Option value="Modern Kitchen">Modern Kitchen</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Short Description (Appears on Listing Card)" name="description" rules={[{ required: true }]}>
            <Input.TextArea rows={2} placeholder="Brief summary of the blog..." />
          </Form.Item>

          <Form.Item label="Featured Image (Banner) URL" name="image" rules={[{ required: true }]}><Input /></Form.Item>
          
          <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Blog Body Content:</span>
            <Button size="small" type={isPreview ? "primary" : "default"} onClick={() => setIsPreview(!isPreview)}>
              {isPreview ? "✍️ Switch to Visual Editor" : "📂 Open HTML Source Mode"}
            </Button>
          </div>

          {/* HTML / Source Code Logic */}
          {isPreview ? (
            <Input.TextArea 
              value={blogContent} 
              onChange={(e) => setBlogContent(e.target.value)} 
              style={{ height: '350px', fontFamily: 'monospace', background: '#f5f5f5', border: '1px solid #d9d9d9' }} 
              placeholder="Paste your HTML code here (tags like <div>, <img>, <section> are supported)..."
            />
          ) : (
            <ReactQuill 
              theme="snow" 
              value={blogContent} 
              onChange={setBlogContent} 
              style={{ height: '300px', marginBottom: '50px' }} 
            />
          )}

          <Button type="primary" htmlType="submit" block loading={loading} style={{ marginTop: '20px', height: '45px' }}>
            {editingBlog ? "Save & Update Blog" : "Publish Blog Now"}
          </Button>
        </Form>
      </Modal>

      <style>{`
        @media (min-width: 992px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 991px) { .desktop-sider { display: none !important; } }
        .ant-layout-header { line-height: 64px !important; }
      `}</style>
    </Layout>
  );
};

export default AdminDashboard;