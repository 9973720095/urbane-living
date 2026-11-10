import React from 'react';
import { WhatsAppOutlined, PhoneFilled } from '@ant-design/icons';
import { contact } from '../data/siteData';
import { trackEvent } from '../utils/metaPixel';
import './css/FloatingContact.css';

// WhatsApp + call buttons floating on the right side of every page.
export default function FloatingContact() {
  const waHref = contact.whatsappText
    ? `${contact.whatsappHref}?text=${encodeURIComponent(contact.whatsappText)}`
    : contact.whatsappHref;

  return (
    <div className="ul-float" aria-label="Contact us">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="ul-float-btn ul-float-wa"
        aria-label="Chat with us on WhatsApp"
        onClick={() => trackEvent('Contact', { method: 'whatsapp', page: window.location.pathname })}
      >
        <WhatsAppOutlined />
        <span className="ul-float-label">Chat with us</span>
      </a>
      <a
        href={contact.phoneHref}
        className="ul-float-btn ul-float-call"
        aria-label={`Call us on ${contact.phoneDisplay}`}
        onClick={() => trackEvent('Contact', { method: 'call', page: window.location.pathname })}
      >
        <PhoneFilled />
        <span className="ul-float-label">{contact.phoneDisplay}</span>
      </a>
    </div>
  );
}