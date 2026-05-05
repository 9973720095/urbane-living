import React, { useState, useEffect } from 'react';
import { Layout, Button, Menu, Drawer } from 'antd';
import { MenuOutlined, DownOutlined, CloseOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const { Header } = Layout;

const Navbar = ({ onOpenForm }) => {
  const [visible, setVisible] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      // hero is 80vh, switch after 70vh
      const heroThreshold = window.innerHeight * 0.7;
      setIsPastHero(window.scrollY > heroThreshold);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      label: <span>Services </span>,
      children: serviceItems 
    },
    { key: '3', label: <Link to="/about">About Us</Link> },
    { key: '4', label: <Link to="/contact">Contact</Link> },
    { key: '5', label: <Link to="/blogs">Blog</Link> },
  ];

  return (
    <Header className={`custom-header ${isPastHero ? 'is-old' : 'is-transparent'}`}>
      <Link to="/" className='logo relative inline-block overflow-hidden rounded-md'>
        <img 
          src="https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1777899675/UrbaneLiving_Logo_6_1_dfh2r1.png"
          alt="Urbane Living Logo" 
          className="navbar-logo-img relative z-10 w-[188px] h-auto block" 
        />
       {/* <video 
    autoPlay 
    muted 
    loop 
    playsInline 
    className="logo-bg"
  >
    <source src="https://res.cloudinary.com/diosq0s7w/video/upload/v1777902877/12214_zxuypo.mp4" type="video/mp4" />
  </video> */}
    <div className='logo-bg'></div>
      </Link>

      {isPastHero ? (
        <>
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
        </>
      ) : (
        <div className="nav-right">
          <button className="menu-trigger" onClick={showDrawer}>
            Menu <span className="menu-dot"></span>
          </button>
        </div>
      )}

      <Drawer 
        title={isPastHero ? "Menu" : ""} 
        placement="right" 
        onClose={onClose} 
        open={visible}
        width={420}
        className={`custom-drawer ${isPastHero ? 'drawer-old' : 'drawer-transparent'}`}
        closeIcon={<CloseOutlined />}
      >
        {!isPastHero ? (
          <>
            <div className="drawer-menu-list">
              <div className="drawer-menu-item"><Link to="/" onClick={onClose}>Home</Link></div>
              <div className="drawer-menu-item"><Link to="/false-ceiling" onClick={onClose}>False Ceiling</Link></div>
              <div className="drawer-menu-group">
                <div className="drawer-menu-item">Services</div>
                <div className="drawer-submenu">
                  <div className="drawer-submenu-item"><Link to="/bedroom" onClick={onClose}>Bedroom Design</Link></div>
                  <div className="drawer-submenu-item"><Link to="/living-hall" onClick={onClose}>Living Hall</Link></div>
                  <div className="drawer-submenu-item"><Link to="/kitchen" onClick={onClose}>Modular Kitchen</Link></div>
                  <div className="drawer-submenu-item"><Link to="/wardrobe" onClick={onClose}>Wardrobe Design</Link></div>
                </div>
              </div>
              <div className="drawer-menu-item"><Link to="/about" onClick={onClose}>About Us</Link></div>
              <div className="drawer-menu-item"><Link to="/contact" onClick={onClose}>Contact</Link></div>
              <div className="drawer-menu-item"><Link to="/blogs" onClick={onClose}>Blog</Link></div>
            </div>
            <Button type="primary" block className="drawer-quote-btn" onClick={() => { onOpenForm(); onClose(); }}>
              Get Free Quote
            </Button>
          </>
        ) : (
          <>
            <Menu mode="inline" selectedKeys={[current]} items={menuItems} onClick={(e) => { if(!e.keyPath.includes('sub1')) { onClickMenu(e); onClose(); } }} />
            <Button type="primary" block style={{ marginTop: '20px' }} onClick={() => { onOpenForm(); onClose(); }}>Enquiry Now</Button>
          </>
        )}
      </Drawer>
    </Header>
  );
};

export default Navbar;