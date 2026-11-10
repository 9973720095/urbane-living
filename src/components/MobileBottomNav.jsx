import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer } from 'antd';
import {
  HomeOutlined,
  BulbOutlined,
  CalendarOutlined,
  CalculatorOutlined,
  AppstoreOutlined,
  CompassOutlined,
  RightOutlined,
  PhoneFilled,
  WhatsAppOutlined,
} from '@ant-design/icons';
import { mobileNav, contact } from '../data/siteData';
import './css/MobileBottomNav.css';

const ICONS = {
  home: <HomeOutlined />,
  ceiling: <BulbOutlined />,
  consult: <CalendarOutlined />,
  estimate: <CalculatorOutlined />,
  vastu: <CompassOutlined />,
  more: <AppstoreOutlined />,
};

// App-style bar fixed at the bottom on phones. Hidden on tablets / desktop (CSS).
export default function MobileBottomNav({ onOpenForm }) {
  const { pathname } = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  const renderItem = (item) => {
    const cls = `ul-bn-item${item.center ? ' is-center' : ''}${item.to && isActive(item.to) ? ' is-active' : ''}`;
    const body = (
      <>
        <span className="ul-bn-icon">
          {ICONS[item.icon] || <AppstoreOutlined />}
          {item.badge && <span className="ul-bn-badge">{item.badge}</span>}
        </span>
        <span className="ul-bn-label">{item.label}</span>
      </>
    );

    if (item.to) {
      return (
        <Link key={item.label} to={item.to} className={cls} aria-current={isActive(item.to) ? 'page' : undefined}>
          {body}
        </Link>
      );
    }
    const onClick = item.action === 'form' ? onOpenForm : () => setMoreOpen(true);
    return (
      <button key={item.label} type="button" className={cls} onClick={onClick}>
        {body}
      </button>
    );
  };

  return (
    <>
      {/* keeps the footer from hiding behind the bar */}
      <div className="ul-bn-spacer" aria-hidden="true" />

      <nav className="ul-bn" aria-label="Quick links">
        {mobileNav.items.map(renderItem)}
      </nav>

      <Drawer
        placement="bottom"
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        height="auto"
        title="Explore"
        className="ul-bn-sheet"
      >
        <ul className="ul-bn-sheet-list">
          {mobileNav.more.map((l) => (
            <li key={l.to}>
              <Link to={l.to} onClick={() => setMoreOpen(false)}>
                {l.label} <RightOutlined />
              </Link>
            </li>
          ))}
        </ul>
        <div className="ul-bn-sheet-actions">
          <a href={contact.phoneHref} className="ul-bn-sheet-call">
            <PhoneFilled /> Call {contact.phoneDisplay}
          </a>
          <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="ul-bn-sheet-wa">
            <WhatsAppOutlined /> WhatsApp
          </a>
        </div>
      </Drawer>
    </>
  );
}