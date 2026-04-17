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

  // Logic: Jab page refresh ho, toh URL dekh kar sahi menu highlight kare
  useEffect(() => {
    if (location.pathname === '/false-ceiling') {
      setCurrent('2');
    } else {
      setCurrent('1');
    }
  }, [location.pathname]);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const onClickMenu = (e) => {
    setCurrent(e.key);
  };

  const menuItems = [
    { 
      key: '1', 
      label: <Link to="/">Home</Link> 
    },
    { 
      key: '2', 
      label: <Link to="/false-ceiling">False Ceiling</Link> 
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