import React, { useState } from 'react';
import { Layout, Button, Menu, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './Navbar.css';

const { Header } = Layout;

const Navbar = ({ onOpenForm }) => {
  const [visible, setVisible] = useState(false);
  // Default active key '1' (Home) set ki gayi hai
  const [current, setCurrent] = useState('1');

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  // Click handler jo active state update karega
  const onClickMenu = (e) => {
    setCurrent(e.key);
  };

  const menuItems = [
    { key: '1', label: 'Home' },
    { key: '2', label: 'False Ceiling' },
  ];

  return (
    <Header className="custom-header">
      <a href="/" className='logo'>
        <img 
          src="https://urbaneliving.in/wp-content/uploads/2024/07/cropped-Untitled-design-87-png.webp"
          alt="Urbane Living Logo" 
          className="navbar-logo-img" 
        />
      </a>

      <Menu 
        mode="horizontal" 
        selectedKeys={[current]} // Active state highlight ke liye
        items={menuItems} 
        onClick={onClickMenu} 
        className="desktop-menu"
      />

      <div className="nav-right">
        <Button type="primary" className="book-btn hide-mobile" onClick={onOpenForm}>
          Book Now
        </Button>

        <Button 
          className="mobile-menu-icon" 
          type="text" 
          icon={<MenuOutlined />} 
          onClick={showDrawer} 
        />
      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={visible}
      >
        <Menu 
          mode="vertical" 
          selectedKeys={[current]} 
          items={menuItems} 
          onClick={(e) => { onClickMenu(e); onClose(); }}
        />
        <Button 
          type="primary" 
          block 
          style={{ marginTop: '20px', background: '#1890ff'}} 
          onClick={() => { onOpenForm(); onClose(); }}
        >
          Book Now
        </Button>
      </Drawer>
    </Header>
  );
};

export default Navbar;