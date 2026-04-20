import React, { useState, useEffect } from 'react';
import { Layout, Button, Menu, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const { Header } = Layout;

const Navbar = ({ onOpenForm }) => {
  const [visible, setVisible] = useState(false);
  const location = useLocation(); // URL track karne ke liye
  const [current, setCurrent] = useState('1');

  // Logic: Jab page refresh ho ya URL badle, toh sahi menu highlight kare
  useEffect(() => {
    if (location.pathname === '/false-ceiling') {
      setCurrent('2');
    } else if (location.pathname === '/about') {
      setCurrent('3'); // About Us page highlight karne ke liye
    } else {
      setCurrent('1');
    }
  }, [location.pathname]);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const onClickMenu = (e) => {
    setCurrent(e.key);
  };

  // Centralized Menu Items
  const menuItems = [
    { 
      key: '1', 
      label: <Link to="/">Home</Link> 
    },
    { 
      key: '2', 
      label: <Link to="/false-ceiling">False Ceiling</Link> 
    },
    { 
      key: '3', 
      label: <Link to="/about">About Us</Link> 
    },
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

      {/* Desktop Menu */}
      <Menu 
        mode="horizontal" 
        selectedKeys={[current]} 
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

      {/* Mobile Drawer */}
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
          Enquery Now
        </Button>
      </Drawer>
    </Header>
  );
};

export default Navbar;