import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Table, Button, Modal, Form, Input, InputNumber, Select, message, Popconfirm } from 'antd';
import { DashboardOutlined, PlusOutlined, LogoutOutlined, BuildOutlined, SolutionOutlined } from '@ant-design/icons';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Content, Sider, Header } = Layout;
const { Option } = Select;

// 1. DHYAN SE DEKHO: Yahan { onFinish } likhna bahut zaroori hai
const AdminDashboard = ({ onFinish }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const [designs, setDesigns] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalDesigns: 0, totalLeads: 0 });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://urbane-living.onrender.com';

  const fetchData = async () => {
    setLoading(true);
    try {
      const [designRes, leadRes, statRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/designs?platform=app`),
        axios.get(`${API_BASE_URL}/api/leads`),
        axios.get(`${API_BASE_URL}/api/admin/stats`)
      ]);
      setDesigns(designRes.data);
      setLeads(leadRes.data);
      setStats(statRes.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      // message.error("Data fetch karne mein dikkat aayi!"); // Debugging ke liye ise abhi comment kar sakte ho
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. YAHAN CHANGES KIYE HAIN: handleAddDesign ko simplify kiya hai
  const handleAddDesign = async (values) => {
    setLoading(true);
    try {
        // App.js wale onFinish ko call kar rahe hain
        const success = await onFinish(values, 'design');
        if (success) {
          setIsModalVisible(false);
          form.resetFields();
          fetchData(); 
        }
    } catch (error) {
        message.error("Function call fail!");
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/designs/${id}`);
      message.success("Design deleted.");
      fetchData();
    } catch (err) {
      message.error("Delete fail!");
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      message.success("Logged out!");
      navigate('/admin-login');
    });
  };

  const designColumns = [
    { 
      title: 'Image', 
      dataIndex: 'image', 
      key: 'image', 
      render: (url) => (
        <img src={url} alt="Ceiling" style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} />
      )
    },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Price (₹)', dataIndex: 'price', key: 'price' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { 
      title: 'Action', 
      key: 'action', 
      render: (_, record) => (
        <Popconfirm title="Pakka?" onConfirm={() => handleDelete(record._id)}>
          <Button type="link" danger>Delete</Button>
        </Popconfirm>
      ) 
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark">
        <div style={{ padding: '20px', color: '#fff', fontWeight: 'bold', fontSize: '18px', textAlign: 'center' }}>
          URBANE ADMIN
        </div>
        <Menu theme="dark" selectedKeys={[activeTab]} mode="inline" onClick={(e) => setActiveTab(e.key)}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>Designs & Stats</Menu.Item>
          <Menu.Item key="2" icon={<SolutionOutlined />}>Customer Leads</Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: '#ff4d4f' }}>Logout</Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h2 style={{ margin: 0 }}>{activeTab === '1' ? 'Admin Panel' : 'Customer Leads'}</h2>
           {activeTab === '1' && (
             <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>Add New Design</Button>
           )}
        </Header>

        <Content style={{ margin: '24px' }}>
          {activeTab === '1' ? (
            <>
              <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={12}>
                  <Card><Statistic title="Designs" value={stats.totalDesigns} /></Card>
                </Col>
                <Col span={12}>
                  <Card><Statistic title="Leads" value={stats.totalLeads} /></Card>
                </Col>
              </Row>
              <Card title="Live Designs List">
                <Table dataSource={designs} columns={designColumns} rowKey="_id" loading={loading} />
              </Card>
            </>
          ) : (
            <Card title="Customer Inquiry List">
              <Table dataSource={leads} rowKey="_id" columns={[
                  { title: 'Name', dataIndex: 'name' },
                  { title: 'Phone', dataIndex: 'phone' },
                  { title: 'Email', dataIndex: 'email' },
                  { title: 'Property', dataIndex: 'propertyType' }
                ]}
              />
            </Card>
          )}
        </Content>
      </Layout>

      <Modal 
        title="Add New Design" 
        open={isModalVisible} 
        onCancel={() => setIsModalVisible(false)} 
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleAddDesign}>
          <Form.Item label="Design Title" name="title" rules={[{ required: true }]}><Input placeholder="Modern Gypsum Ceiling" /></Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Select>
              <Option value="False Ceiling">False Ceiling</Option>
              <Option value="AppGallery">App Gallery</Option>
              <Option value="Interior">Interior</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Image URL" name="image" rules={[{ required: true }]}><Input placeholder="Paste image link here" /></Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>Publish Now</Button>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminDashboard;