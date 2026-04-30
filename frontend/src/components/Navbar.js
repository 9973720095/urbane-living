import React, { useState, useEffect } from 'react';
import { Layout, Button, Menu, Drawer } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const { Header } = Layout;

const Navbar = ({ onOpenForm }) => {
  const [visible, setVisible] = useState(false);
  const location = useLocation(); 
  const [current, setCurrent] = useState('1');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setCurrent('1');
    else if (path === '/false-ceiling') setCurrent('2');
    else if (['/bedroom', '/living-hall', '/kitchen', '/wardrobe'].includes(path)) setCurrent('sub1');
    else if (path === '/about') setCurrent('3');
    else if (path === '/contact') setCurrent('4'); 
    else if (path.startsWith('/blog')) setCurrent('5'); 
    else setCurrent('');
  }, [location.pathname]);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);
  const onClickMenu = (e) => setCurrent(e.key);

  const serviceItems = [
    { key: 's1', label: <Link to="/bedroom">Bedroom Design</Link> },
    { key: 's2', label: <Link to="/living-hall">Living Hall</Link> },
    { key: 's3', label: <Link to="/kitchen">Modular Kitchen</Link> },
    { key: 's4', label: <Link to="/wardrobe">Wardrobe Design</Link> },
  ];

  const menuItems = [
    { key: '1', label: <Link to="/">Home</Link> },
    { key: '2', label: <Link to="/false-ceiling">False Ceiling</Link> },
    { 
      key: 'sub1', 
      label: <span>Services <DownOutlined style={{ fontSize: '10px' }} /></span>,
      children: serviceItems 
    },
    { key: '3', label: <Link to="/about">About Us</Link> },
    { key: '4', label: <Link to="/contact">Contact</Link> },
    { key: '5', label: <Link to="/blogs">Blog</Link> },
  ];

  return (
    <Header className="custom-header">
      <Link to="/" className='logo'>
        <img 
          src="https://urbaneliving.in/wp-content/uploads/2024/07/cropped-Untitled-design-87-png.webp"
          alt="Urbane Living Logo" 
          className="navbar-logo-img" 
        />
      </Link>

      <Menu 
        mode="horizontal" 
        selectedKeys={[current]} 
        items={menuItems} 
        onClick={onClickMenu} 
        className="desktop-menu"
      />

      <div className="nav-right">
        <Button type="primary" className="book-btn hide-mobile" onClick={onOpenForm}>Get Free Quote</Button>
        <Button className="mobile-menu-icon" type="text" icon={<MenuOutlined />} onClick={showDrawer} />
      </div>

      <Drawer title="Menu" placement="right" onClose={onClose} open={visible}>
        <Menu mode="inline" selectedKeys={[current]} items={menuItems} onClick={(e) => { if(!e.keyPath.includes('sub1')) { onClickMenu(e); onClose(); } }} />
        <Button type="primary" block style={{ marginTop: '20px' }} onClick={() => { onOpenForm(); onClose(); }}>Enquiry Now</Button>
      </Drawer>
    </Header>
  );
};

export default Navbar;