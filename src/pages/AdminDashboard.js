import React, { useState, useEffect } from 'react';
//... (All your existing imports)
import { Layout, Menu, Card, Row, Col, Statistic, Table, Button, Modal, Form, Input, Select, message, Popconfirm, Drawer, Space, Tag } from 'antd';
import { DashboardOutlined, PlusOutlined, LogoutOutlined, SolutionOutlined, MenuOutlined, EditOutlined, HomeOutlined, CoffeeOutlined, LayoutOutlined, BorderInnerOutlined, PictureOutlined, AppstoreAddOutlined, GlobalOutlined, BulbOutlined, InfoCircleOutlined, PhoneOutlined, ToolOutlined, ReadOutlined, EnvironmentOutlined, FormOutlined } from '@ant-design/icons';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth'; // Added onAuthStateChanged
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { isAdminEmail } from '../config/admins';
import '../utils/adminApi'; // sends the admin login token to the backend
import WebsiteImages from './admin/WebsiteImages'; // change any photo on the website, page / section wise
import PageSections from './admin/PageSections'; // add new sections to any page, at any position
import PageTab, { ADMIN_PAGES, findAdminPage } from './admin/PageTab'; // one tab per website page (photos + sections + designs)

const { Content, Sider, Header } = Layout;

const PAGE_ICONS = {
  'page:home': <HomeOutlined />,
  'page:false-ceiling': <BulbOutlined />,
  Bedroom: <HomeOutlined />,
  'Living Hall': <LayoutOutlined />,
  Kitchen: <CoffeeOutlined />,
  Wardrobe: <BorderInnerOutlined />,
  'page:about': <InfoCircleOutlined />,
  'page:contact': <PhoneOutlined />,
  'page:factory': <ToolOutlined />,
  'page:blog': <ReadOutlined />,
  'page:city': <EnvironmentOutlined />,
  'page:popup': <FormOutlined />,
};
const { Option } = Select;

const AdminDashboard = ({ onFinish }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [blogForm] = Form.useForm();
  const [leadForm] = Form.useForm();

  const [designs, setDesigns] = useState([]);
  const [leads, setLeads] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({ totalDesigns: 0, totalLeads: 0 });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBlogModalVisible, setIsBlogModalVisible] = useState(false);
  const [isLeadModalVisible, setIsLeadModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [blogContent, setBlogContent] = useState('');
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingDesign, setEditingDesign] = useState(null);
  const [editingLead, setEditingLead] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const API_BASE_URL = window.location.hostname === 'localhost'
   ? 'http://localhost:5000'
    : 'https://urbane-living.onrender.com';

  // --- AUTH CHECK (only emails in src/config/admins.js) ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || !isAdminEmail(user.email)) { // admin list: src/config/admins.js
        signOut(auth);
        navigate('/admin-login');
      } else {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

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

  //... (Rest of your existing functions: handleOpenDesignModal, handleAddDesign, handleSaveLead, etc. - UNTOUCHED)

  const handleOpenDesignModal = (design = null) => {
    if (design) {
      setEditingDesign(design);
      form.setFieldsValue(design);
    } else {
      setEditingDesign(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleAddDesign = async (values) => {
    setLoading(true);
    try {
      if (editingDesign) {
        await axios.put(`${API_BASE_URL}/api/designs/${editingDesign._id}`, values);
        message.success("✅ Design Updated!");
      } else {
        await onFinish(values, 'design');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchData();
    } catch (err) {
      message.error("Action failed.");
    }
    setLoading(false);
  };

  const handleOpenLeadModal = (lead) => {
    setEditingLead(lead);
    leadForm.setFieldsValue(lead);
    setIsLeadModalVisible(true);
  };

  const handleSaveLead = async (values) => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/api/leads/${editingLead._id}`, values);
      message.success("✅ Lead Updated Successfully!");
      setIsLeadModalVisible(false);
      fetchData();
    } catch (err) {
      message.error("Failed to update lead.");
    }
    setLoading(false);
  };

  const handleOpenBlogModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setBlogContent(blog.content);
      // FAQ list -> "Question | Answer" lines for the text box
      blogForm.setFieldsValue({ ...blog, faq: (blog.faq || []).map((f) => `${f.q} | ${f.a}`).join('\n') });
    } else {
      setEditingBlog(null);
      setBlogContent('');
      blogForm.resetFields();
    }
    setIsPreview(false);
    setIsBlogModalVisible(true);
  };

  const handleSaveBlog = async (values) => {
    setLoading(true);
    try {
      // slug, SEO title and FAQ are optional: the backend makes the slug from the title when empty
      const finalBlogData = {...values, content: blogContent, faq: values.faq || '' };
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
      message.error("Action failed.");
    }
    setLoading(false);
  };

  const handleDelete = async (id, type) => {
    try {
      const endpoint = type === 'blog'? `/api/blogs/${id}` : type === 'lead'? `/api/leads/${id}` : `/api/designs/${id}`;
      await axios.delete(`${API_BASE_URL}${endpoint}`);
      message.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully.`);
      fetchData();
    } catch (err) {
      message.error("Delete failed. Check API endpoint.");
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => { navigate('/admin-login'); });
  };

  const filteredDesigns = (category) => {
    return designs.filter(d => d.category === category);
  };

  const MenuItems = (
    <Menu
      theme="dark"
      selectedKeys={[activeTab]}
      mode="inline"
      onClick={(e) => { setActiveTab(e.key); setDrawerVisible(false); }}
    >
      <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
      <Menu.Item key="Leads" icon={<SolutionOutlined />}>Leads</Menu.Item>
      <Menu.Item key="Blogs" icon={<EditOutlined />}>Blogs</Menu.Item>
      {/* one tab per website page: its photos, extra sections and app designs (admin/PageTab.jsx) */}
      <Menu.ItemGroup key="pages" title={<span style={{ color: 'rgba(255,255,255,.45)', fontSize: 11, letterSpacing: '.12em' }}>WEBSITE PAGES</span>}>
        {ADMIN_PAGES.map((p) => (
          <Menu.Item key={p.key} icon={PAGE_ICONS[p.key] || <GlobalOutlined />}>{p.label}</Menu.Item>
        ))}
      </Menu.ItemGroup>
      <Menu.ItemGroup key="all" title={<span style={{ color: 'rgba(255,255,255,.45)', fontSize: 11, letterSpacing: '.12em' }}>ALL PAGES</span>}>
        <Menu.Item key="Website Images" icon={<PictureOutlined />}>All Photos (search)</Menu.Item>
        <Menu.Item key="Page Sections" icon={<AppstoreAddOutlined />}>All Sections</Menu.Item>
      </Menu.ItemGroup>
      <Menu.Item key="Logout" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: '#ff4d4f' }}>Logout</Menu.Item>
    </Menu>
  );

  const renderDesignTable = (data, title) => (
    <Card title={title} styles={{ body: { padding: '8px' } }}>
      <Table
        dataSource={data}
        rowKey="_id"
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 8 }}
        columns={[
          { title: 'Img', dataIndex: 'image', render: (img) => <img src={img} alt="" width="40" height="40" style={{ borderRadius: 4, objectFit: 'cover' }} />, width: 60 },
          { title: 'Title', dataIndex: 'title', width: 150 },
          {
            title: 'Action',
            render: (_, r) => (
              <Space>
                <Button type="link" size="small" onClick={() => handleOpenDesignModal(r)}>Edit</Button>
                <Popconfirm title="Delete?" onConfirm={() => handleDelete(r._id, 'design')}>
                  <Button type="link" danger size="small">Del</Button>
                </Popconfirm>
              </Space>
            ),
            width: 120
          }
        ]}
      />
    </Card>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" theme="dark" className="desktop-sider" width={220}>
        <div style={{ padding: '20px', color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: '18px' }}>URBANE ADMIN</div>
        {MenuItems}
      </Sider>

      <Drawer title="URBANE ADMIN" placement="left" onClose={() => setDrawerVisible(false)} open={drawerVisible} styles={{ body: { padding: 0 } }} width={250}>
        <div style={{ background: '#001529', height: '100%' }}>{MenuItems}</div>
      </Drawer>

      <Layout>
        <Header style={{ background: '#fff', padding: '0 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 8px #f0f1f2' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button type="text" icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} className="mobile-menu-btn" style={{ marginRight: 8 }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{findAdminPage(activeTab) ? `${findAdminPage(activeTab).label} page` : activeTab === 'Website Images' ? 'All Photos' : activeTab === 'Page Sections' ? 'All Sections' : activeTab}</h3>
            </div>
            <Space>
                {['Dashboard', 'Bedroom', 'Living Hall', 'Kitchen', 'Wardrobe'].includes(activeTab) &&
                  <Button type="primary" size="middle" icon={<PlusOutlined />} onClick={() => handleOpenDesignModal()}>Add Design</Button>}
                {activeTab === 'Blogs' && <Button type="primary" size="middle" icon={<PlusOutlined />} onClick={() => handleOpenBlogModal()}>Create Blog</Button>}
            </Space>
        </Header>

        <Content style={{ margin: window.innerWidth < 768? '12px' : '24px' }}>
          {activeTab === 'Dashboard' && (
            <>
              <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={12} sm={12} md={12}><Card bordered={false} className="stat-card"><Statistic title="Designs" value={stats.totalDesigns} valueStyle={{ color: '#1890ff' }} /></Card></Col>
                <Col xs={12} sm={12} md={12}><Card bordered={false} className="stat-card"><Statistic title="Leads" value={stats.totalLeads} valueStyle={{ color: '#52c41a' }} /></Card></Col>
              </Row>
              <Card title="All Designs" styles={{ body: { padding: '8px' } }}>
                <Table
                    dataSource={designs}
                    rowKey="_id"
                    scroll={{ x: 'max-content' }}
                    columns={[
                        { title: 'Img', dataIndex: 'image', render: (img) => <img src={img} alt="" width="40" height="40" style={{ borderRadius: 4, objectFit: 'cover' }} />, width: 60 },
                        { title: 'Title', dataIndex: 'title', width: 150 },
                        { title: 'Category', dataIndex: 'category', render: (cat) => <Tag color="blue">{cat || 'N/A'}</Tag>, width: 120 },
                                      {
                          title: 'Action',
                          render: (_, r) => (
                            <Space>
                              <Button type="link" size="small" onClick={() => handleOpenDesignModal(r)}>Edit</Button>
                              <Popconfirm title="Delete Design?" onConfirm={() => handleDelete(r._id, 'design')}>
                                <Button type="link" danger size="small">Del</Button>
                              </Popconfirm>
                            </Space>
                          ),
                          width: 120
                        }
                    ]}
                />
              </Card>
            </>
          )}

          {/* website page tabs: Photos | Extra sections | App designs (room pages) */}
          {findAdminPage(activeTab) && (
            <PageTab
              key={activeTab}
              page={findAdminPage(activeTab)}
              apiBase={API_BASE_URL}
              onOpenAllPhotos={() => setActiveTab('Website Images')}
              designsTable={findAdminPage(activeTab).designs
                ? renderDesignTable(filteredDesigns(findAdminPage(activeTab).designs), `${findAdminPage(activeTab).label} Designs (app)`)
                : null}
            />
          )}

          {activeTab === 'Website Images' && <WebsiteImages apiBase={API_BASE_URL} onOpenSections={() => setActiveTab('Page Sections')} />}
          {activeTab === 'Page Sections' && <PageSections apiBase={API_BASE_URL} />}

          {activeTab === 'Leads' && (
            <Card title="Customer Leads" styles={{ body: { padding: '8px' } }}>
              <Table
                dataSource={leads}
                rowKey="_id"
                loading={loading}
                scroll={{ x: 'max-content' }}
                columns={[
                    { title: 'Lead ID', dataIndex: 'leadId', width: 100 },
                    { title: 'Name', dataIndex: 'name', width: 130 },
                    { title: 'Phone', dataIndex: 'phone', width: 130 },
                    { title: 'City', render: (_, r) => [r.city || r.state, r.locality].filter(Boolean).join(', ') || 'N/A', width: 160 },
                    { title: 'Property', dataIndex: 'propertyType', width: 110 },
                    {
                        title: 'Date',
                        dataIndex: 'date',
                        render: (d) => d? new Date(d).toLocaleDateString() : 'N/A',
                        width: 100
                    },
                    {
                      title: 'Action',
                      fixed: 'right',
                      render: (_, r) => (
                        <Space>
                          <Button type="link" size="small" onClick={() => handleOpenLeadModal(r)}>Edit</Button>
                          <Popconfirm title="Delete Lead?" onConfirm={() => handleDelete(r._id, 'lead')}>
                            <Button type="link" danger size="small">Delete</Button>
                          </Popconfirm>
                        </Space>
                      ),
                      width: 120
                    }
                ]}
              />
            </Card>
          )}

          {activeTab === 'Blogs' && (
            <Card title="All Blogs" styles={{ body: { padding: '8px' } }}>
              <Table
                dataSource={blogs}
                rowKey="_id"
                loading={loading}
                scroll={{ x: 'max-content' }}
                columns={[
                  { title: 'Img', dataIndex: 'image', render: (img) => <img src={img} alt="" width="40" height="40" style={{ borderRadius: 4, objectFit: 'cover' }} />, width: 60 },
                  { title: 'Title', dataIndex: 'title', width: 200 },
                  { title: 'URL', dataIndex: 'slug', width: 180, render: (slug, r) => (
                    <a href={`/blog/${slug || r._id}`} target="_blank" rel="noopener noreferrer">/blog/{slug || r._id}</a>
                  ) },
                  { title: 'From', dataIndex: 'source', width: 70, render: (src) => <Tag color={src === 'sheet' ? 'green' : 'blue'}>{src === 'sheet' ? 'Sheet' : 'Admin'}</Tag> },
                  { title: 'Action', render: (_, r) => (
                    <Space>
                      <Button type="link" size="small" onClick={() => handleOpenBlogModal(r)}>Edit</Button>
                      <Popconfirm title="Delete?" onConfirm={() => handleDelete(r._id, 'blog')}>
                        <Button type="link" size="small" danger>Del</Button>
                      </Popconfirm>
                    </Space>
                  ), width: 120 }
              ]} />
            </Card>
          )}
        </Content>
      </Layout>

      {/* --- LEAD EDIT MODAL --- */}
      <Modal title="Edit Lead Info" open={isLeadModalVisible} onCancel={() => setIsLeadModalVisible(false)} footer={null}>
        <Form form={leadForm} layout="vertical" onFinish={handleSaveLead}>
          <Form.Item label="Customer Name" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}><Input /></Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>Update Lead</Button>
        </Form>
      </Modal>

      {/* --- DESIGN MODAL --- */}
      <Modal title={editingDesign? "Edit Design" : "Add New Design"} open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} width={500}>
        <Form form={form} layout="vertical" onFinish={handleAddDesign}>
          <Form.Item label="Design Title" name="title" rules={[{ required: true }]}><Input placeholder="E.g. Luxury Bedroom" /></Form.Item>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                <Select placeholder="Select Category">
                  <Option value="Bedroom">Bedroom</Option>
                  <Option value="Living Hall">Living Hall</Option>
                  <Option value="Kitchen">Kitchen</Option>
                  <Option value="Wardrobe">Wardrobe</Option>
                  <Option value="False Ceiling">False Ceiling</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Image URL" name="image" rules={[{ required: true }]}><Input placeholder="Cloudinary or Unsplash link" /></Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading} size="large">{editingDesign? "Update Design" : "Publish to Website"}</Button>
        </Form>
      </Modal>

      {/* --- BLOG MODAL --- */}
      <Modal title={editingBlog? "Edit Blog" : "New Blog"} open={isBlogModalVisible} onCancel={() => setIsBlogModalVisible(false)} footer={null} width={800}>
        <Form form={blogForm} layout="vertical" onFinish={handleSaveBlog}>
          <Form.Item label="Blog Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Short Description (for Cards)" name="description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="Write a short summary..." />
          </Form.Item>
          <Row gutter={16}>
             <Col span={12}><Form.Item label="Category" name="category" rules={[{ required: true }]}><Input placeholder="E.g. Interior Design" /></Form.Item></Col>
             <Col span={12}><Form.Item label="Featured Image URL" name="image" rules={[{ required: true }]}><Input /></Form.Item></Col>
          </Row>
          <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '500' }}>Content:</span>
            <Button size="small" onClick={() => setIsPreview(!isPreview)}>{isPreview? "Editor View" : "HTML View"}</Button>
          </div>
          {isPreview? (
            <Input.TextArea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} style={{ height: '300px', fontFamily: 'monospace' }} />
          ) : (
            <div className="quill-wrapper">
                <ReactQuill theme="snow" value={blogContent} onChange={setBlogContent} style={{ height: '250px', marginBottom: '40px' }} />
            </div>
          )}
          {/* SEO (optional) */}
          <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col xs={24} md={12}>
              <Form.Item label="URL Slug (optional)" name="slug" extra="Empty = made from the title. Example: false-ceiling-cost-noida. Don't change it after publishing.">
                <Input addonBefore="/blog/" placeholder="auto from title" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="SEO Title for Google (optional)" name="seoTitle" extra="About 50–60 characters with the main keyword. Empty = Blog Title.">
                <Input maxLength={70} showCount />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="FAQ (optional)" name="faq" extra="One question per line:  Question? | Answer. Shown under the blog and sent to Google.">
            <Input.TextArea rows={4} placeholder={'Do you give a free site visit? | Yes, the site visit and 3D design are free.\nHow long does it take? | About 7 working days.'} />
          </Form.Item>
          {editingBlog?.source === 'sheet' && (
            <p style={{ color: '#b45309', margin: '0 0 8px' }}>This blog comes from the Google Sheet. Edit it in the sheet, or your changes here will be replaced at the next sync.</p>
          )}
          <Button type="primary" htmlType="submit" block loading={loading} style={{ marginTop: '8px' }} size="large">Save & Sync</Button>
        </Form>
      </Modal>

      <style>{`
       .ant-table { font-size: 13px!important; }
       .desktop-sider { height: 100vh; position: sticky; top: 0; left: 0; }
       .stat-card { box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-radius: 8px; }
        @media (min-width: 992px) {.mobile-menu-btn { display: none!important; } }
        @media (max-width: 991px) {.desktop-sider { display: none!important; } }
      `}</style>
    </Layout>
  );
};

export default AdminDashboard;