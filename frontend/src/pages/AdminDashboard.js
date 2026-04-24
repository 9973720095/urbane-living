import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Table, Button, Modal, Form, Input, InputNumber, Select, message, Popconfirm, Drawer } from 'antd';
import { DashboardOutlined, PlusOutlined, LogoutOutlined, SolutionOutlined, MenuOutlined } from '@ant-design/icons';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Content, Sider, Header } = Layout;
const { Option } = Select;

const AdminDashboard = ({ onFinish }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  // States
  const [designs, setDesigns] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalDesigns: 0, totalLeads: 0 });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [drawerVisible, setDrawerVisible] = useState(false);

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
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/designs/${id}`);
      message.success("Design deleted.");
      fetchData();
    } catch (err) {
      message.error("Delete failed.");
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => { navigate('/admin-login'); });
  };

  // Pagination Logic for 1 Row
  const paginationConfig = {
    pageSize: 5,
    position: ['bottomCenter'],
    showSizeChanger: false,
    responsive: true,
    showLessItems: true,
  };

  const MenuItems = (
    <Menu theme="dark" selectedKeys={[activeTab]} mode="inline" onClick={(e) => { setActiveTab(e.key); setDrawerVisible(false); }}>
      <Menu.Item key="1" icon={<DashboardOutlined />}>Designs & Stats</Menu.Item>
      <Menu.Item key="2" icon={<SolutionOutlined />}>Customer Leads</Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: '#ff4d4f' }}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar for Desktop */}
      <Sider breakpoint="lg" collapsedWidth="0" theme="dark" className="desktop-sider">
        <div style={{ padding: '20px', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>URBANE ADMIN</div>
        {MenuItems}
      </Sider>

      {/* Drawer for Mobile */}
      <Drawer title="URBANE ADMIN" placement="left" onClose={() => setDrawerVisible(false)} open={drawerVisible} bodyStyle={{ padding: 0, background: '#001529' }} headerStyle={{ background: '#001529', color: '#fff' }}>
        {MenuItems}
      </Drawer>

      <Layout>
        {/* Fixed Header with Flex Wrap to prevent breaking */}
        <Header style={{ background: '#fff', padding: '0 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px #f0f1f2', position: 'sticky', top: 0, zIndex: 10, height: 'auto', minHeight: '64px', flexWrap: 'wrap' }}>
           <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
             <Button type="text" icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} className="mobile-menu-btn" style={{ fontSize: '20px', marginRight: '8px' }} />
             <h3 style={{ margin: 0, fontWeight: 600, fontSize: 'clamp(14px, 4vw, 18px)', whiteSpace: 'nowrap' }}>
               {activeTab === '1' ? 'Dashboard' : 'Inquiries'}
             </h3>
           </div>
           {activeTab === '1' && (
             <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} size="middle">
               Add New
             </Button>
           )}
        </Header>

        <Content style={{ margin: window.innerWidth < 600 ? '10px' : '24px' }}>
          {activeTab === '1' ? (
            <>
              {/* Responsive Stats */}
              <Row gutter={[12, 12]} style={{ marginBottom: '16px' }}>
                <Col xs={12} sm={12} md={12}>
                  <Card bordered={false} bodyStyle={{ padding: '12px' }}>
                    <Statistic title={<span style={{ fontSize: '12px' }}>Live Designs</span>} value={stats.totalDesigns} valueStyle={{ color: '#3f8600', fontSize: '20px' }} />
                  </Card>
                </Col>
                <Col xs={12} sm={12} md={12}>
                  <Card bordered={false} bodyStyle={{ padding: '12px' }}>
                    <Statistic title={<span style={{ fontSize: '12px' }}>Inquiries</span>} value={stats.totalLeads} valueStyle={{ color: '#1890ff', fontSize: '20px' }} />
                  </Card>
                </Col>
              </Row>

              <Card title="Manage Content" bodyStyle={{ padding: window.innerWidth < 600 ? '0px' : '16px' }}>
                <Table 
                  dataSource={designs} 
                  rowKey="_id" 
                  loading={loading}
                  scroll={{ x: 500 }} // Horizontal scroll prevent "fatt-na"
                  pagination={paginationConfig}
                  columns={[
                    { title: 'Img', dataIndex: 'image', width: 60, render: (u) => <img src={u} width="40" height="40" style={{ borderRadius: 4, objectFit: 'cover' }} onError={(e) => e.target.src='https://via.placeholder.com/40'} /> },
                    { title: 'Name', dataIndex: 'title' },
                    { title: 'Price', dataIndex: 'price', render: (p) => `₹${p}` },
                    { title: 'Action', render: (_, r) => (
                      <Popconfirm title="Delete?" onConfirm={() => handleDelete(r._id)}><Button type="link" danger size="small">Del</Button></Popconfirm>
                    )}
                  ]}
                />
              </Card>
            </>
          ) : (
            <Card title="Leads List" bodyStyle={{ padding: window.innerWidth < 600 ? '0px' : '16px' }}>
              <Table 
                dataSource={leads} 
                rowKey="_id" 
                scroll={{ x: 600 }}
                pagination={paginationConfig}
                columns={[
                  { title: 'Name', dataIndex: 'name' },
                  { title: 'Phone', dataIndex: 'phone' },
                  { title: 'Property', dataIndex: 'propertyType' }
                ]}
              />
            </Card>
          )}
        </Content>
      </Layout>

      <Modal title="Add Design" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} width={window.innerWidth < 600 ? '95%' : 500} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAddDesign}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Select><Option value="False Ceiling">False Ceiling</Option><Option value="AppGallery">App Gallery</Option></Select>
          </Form.Item>
          <Form.Item label="Image URL" name="image" rules={[{ required: true }]}><Input placeholder="Paste URL" /></Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>Publish</Button>
        </Form>
      </Modal>

      <style>{`
        .ant-table-pagination.ant-pagination { justify-content: center !important; width: 100% !important; flex-wrap: nowrap !important; margin: 16px 0 !important; }
        @media (min-width: 992px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 991px) { .desktop-sider { display: none !important; } }
        .ant-card { box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; }
      `}</style>
    </Layout>
  );
};

export default AdminDashboard;