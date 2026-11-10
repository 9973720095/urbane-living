import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  CompassOutlined,
  MenuOutlined,
  CloseOutlined,
  RightOutlined,
  PhoneFilled,
  WhatsAppOutlined,
} from '@ant-design/icons';
import { mobileNav, contact, solutions } from '../data/siteData';
import { icons as designIcons } from './SolutionsGrid';
import './css/MobileBottomNav.css';

const ICONS = {
  home: <HomeOutlined />,
  designs: <AppstoreOutlined />,
  consult: <CalendarOutlined />,
  vastu: <CompassOutlined />,
  more: <MenuOutlined />,
};

// Same line icons as the home page "End-to-end interior solutions" grid
const DesignIcon = ({ name }) => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    className="ul-bn-design-svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {designIcons[name] || designIcons.ceiling}
  </svg>
);

// App-style bar fixed at the bottom on phones. Hidden on tablets / desktop (CSS).
export default function MobileBottomNav({ onOpenForm }) {
  const { pathname } = useLocation();
  const [panel, setPanel] = useState(null); // 'designs' | 'more' | null

  // close the panel when the page changes
  useEffect(() => { setPanel(null); }, [pathname]);

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));
  const close = () => setPanel(null);

  const renderItem = (item) => {
    const open = panel && item.action === panel;
    const cls = `ul-bn-item${item.center ? ' is-center' : ''}${(item.to && isActive(item.to)) || open ? ' is-active' : ''}`;
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
    const onClick = () => {
      if (item.action === 'form') { close(); onOpenForm(); return; }
      setPanel(open ? null : item.action);
    };
    return (
      <button key={item.label} type="button" className={cls} onClick={onClick} aria-expanded={item.action !== 'form' ? Boolean(open) : undefined}>
        {body}
      </button>
    );
  };

  return (
    <>
      {/* keeps the footer from hiding behind the bar */}
      <div className="ul-bn-spacer" aria-hidden="true" />

      {/* Panel that opens above the bar (Designs / More) */}
      {panel && (
        <>
          <div className="ul-bn-backdrop" onClick={close} aria-hidden="true" />
          <div className="ul-bn-panel" role="dialog" aria-label={panel === 'designs' ? 'Designs' : 'More'}>
            <button type="button" className="ul-bn-panel-close" onClick={close} aria-label="Close">
              <CloseOutlined />
            </button>

            {panel === 'designs' && (
              <>
                <p className="ul-bn-panel-title">Explore designs</p>
                <div className="ul-bn-design-grid">
                  {solutions.items.map((s) =>
                    s.to ? (
                      <Link key={s.label} to={s.to} className="ul-bn-design" onClick={close}>
                        <DesignIcon name={s.icon} />
                        <span>{s.label}</span>
                      </Link>
                    ) : (
                      <button key={s.label} type="button" className="ul-bn-design" onClick={() => { close(); onOpenForm(); }}>
                        <DesignIcon name={s.icon} />
                        <span>{s.label}</span>
                      </button>
                    )
                  )}
                </div>
              </>
            )}

            {panel === 'more' && (
              <>
                <p className="ul-bn-panel-title">Explore</p>
                <ul className="ul-bn-more-list">
                  {mobileNav.more.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} onClick={close}>
                        {l.label} <RightOutlined />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="ul-bn-more-actions">
                  <a href={contact.phoneHref} className="ul-bn-more-call">
                    <PhoneFilled /> Call {contact.phoneDisplay}
                  </a>
                  <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="ul-bn-more-wa">
                    <WhatsAppOutlined /> WhatsApp
                  </a>
                </div>
              </>
            )}
          </div>
        </>
      )}

      <nav className="ul-bn" aria-label="Quick links">
        {mobileNav.items.map(renderItem)}
      </nav>
    </>
  );
}