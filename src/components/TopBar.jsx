import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneFilled,
  WhatsAppOutlined,
  CalendarOutlined,
  BulbOutlined,
  CodeSandboxOutlined,
  CompassOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
  StarFilled,
} from '@ant-design/icons';
import { topBar } from '../data/topBar';
import { contact } from '../data/siteData';
import './css/TopBar.css';

const ICONS = {
  consult: <CalendarOutlined />,
  ceiling: <BulbOutlined />,
  cube: <CodeSandboxOutlined />,
  compass: <CompassOutlined />,
  kitchen: <AppstoreOutlined />,
  pin: <EnvironmentOutlined />,
};

// One item of the strip. Copies (hidden = true) are skipped by screen readers and Tab.
function Item({ item, hidden }) {
  const body = (
    <>
      <span className="ul-tb-icon">{ICONS[item.icon] || <StarFilled />}</span>
      {item.tag && <span className="ul-tb-tag">{item.tag}</span>}
      <span className="ul-tb-text">{item.text}</span>
    </>
  );
  return (
    <li className="ul-tb-item">
      {item.to ? (
        <Link to={item.to} tabIndex={hidden ? -1 : undefined}>{body}</Link>
      ) : (
        <span>{body}</span>
      )}
      <span className="ul-tb-sep" aria-hidden="true" />
    </li>
  );
}

// Thin brand bar above the navbar: endless right -> left strip + WhatsApp + call.
export default function TopBar() {
  const { items, phone, speed } = topBar;

  return (
    <div className="ul-tb" role="region" aria-label="Offers and contact">
      <div className="ul-tb-inner">
        <div className="ul-tb-marquee" style={{ '--ul-tb-speed': `${speed}s` }}>
          <div className="ul-tb-track">
            <ul className="ul-tb-list">
              {items.map((item) => <Item key={item.text} item={item} />)}
            </ul>
            {/* second copy so the loop has no gap */}
            <ul className="ul-tb-list" aria-hidden="true">
              {items.map((item) => <Item key={item.text} item={item} hidden />)}
            </ul>
          </div>
        </div>

        <div className="ul-tb-actions">
          {contact?.whatsappHref && (
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ul-tb-wa"
              aria-label="Chat with us on WhatsApp"
            >
              <WhatsAppOutlined />
            </a>
          )}
          <a href={phone.href} className="ul-tb-call" aria-label={`Call us on ${phone.label}`}>
            <span className="ul-tb-call-ring" aria-hidden="true">
              <PhoneFilled />
            </span>
            <span className="ul-tb-call-text">
              <span className="ul-tb-call-small">Toll free</span>
              <span className="ul-tb-call-number">{phone.label}</span>
            </span>
          </a>
        </div>
      </div>
      <span className="ul-tb-stripe" aria-hidden="true" />
    </div>
  );
}