import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneFilled,
  WhatsAppOutlined,
  FacebookFilled,
  YoutubeFilled,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import './css/FooterContact.css';

// Footer content (edit here)
const footer = {
  brand: 'Urbane Living',
  tagline: 'Where Design Finds Its Home',
  about: 'Interior design and false ceiling experts for homes across Delhi NCR. Design, 3D and execution, all under one roof.',
  cta: {
    title: 'Want quick assistance?',
    text: 'Call or WhatsApp us for premium home design services.',
  },
  phone: { label: '1800-123-6407', href: 'tel:+9118001236407' },
  whatsapp: 'https://wa.me/919105052454',
  email: 'sales1@urbaneliving.in',
  address: 'G-12 Express Green Plaza, Sector-1, Vaishali, Ghaziabad',
  columns: [
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/about' },
        { label: 'Contact', to: '/contact' },
        { label: 'Blogs', to: '/blogs' },
        { label: 'Vastu Score', to: '/vastu' },
        { label: 'Areas We Serve', to: '/interior-designers' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'False Ceiling', to: '/false-ceiling' },
        { label: 'Modular Kitchen', to: '/kitchen' },
        { label: 'Wardrobe', to: '/wardrobe' },
        { label: 'Bedroom Interiors', to: '/bedroom' },
        { label: 'Living Hall', to: '/living-hall' },
      ],
    },
    {
      title: 'Legal',
      inline: true, // one wrapped row on phones
      links: [
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms & Conditions', to: '/terms' },
        { label: 'Refund Policy', to: '/refund' },
        { label: 'Disclaimer', to: '/disclaimer' },
      ],
    },
  ],
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/urbaneliving.in', icon: <FacebookFilled /> },
    { label: 'YouTube', href: 'https://www.youtube.com/@urbaneliving-ncr', icon: <YoutubeFilled /> },
    { label: 'X (Twitter)', href: 'https://x.com/UrbaneLiving001', icon: <TwitterOutlined /> },
    { label: 'Instagram', href: 'https://www.instagram.com/urbaneliving.in', icon: <InstagramOutlined /> },
  ],
};

const linkCls = 'text-sm text-white/65 no-underline transition hover:text-white';

const FooterContact = () => (
  <footer className="footer-contact bg-brand-navy px-4 pb-6 pt-10 text-white sm:px-6 lg:pt-14">
    <div className="mx-auto max-w-[1200px]">
      {/* CTA card */}
      <div className="rounded-3xl border border-solid border-white/10 bg-white/5 px-5 py-7 sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-10">
        <div>
          <p className="m-0 text-xl font-bold sm:text-2xl">{footer.cta.title}</p>
          <p className="m-0 mt-1 text-sm text-white/70 sm:text-[15px]">{footer.cta.text}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 lg:mt-0 lg:flex lg:shrink-0">
          <a href={footer.phone.href} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red px-5 text-sm font-semibold text-white no-underline transition hover:bg-brand-red-dark sm:text-[15px]">
            <PhoneFilled /> Call now
          </a>
          <a href={footer.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#15803D] px-5 text-sm font-semibold text-white no-underline transition hover:bg-[#166534] sm:text-[15px]">
            <WhatsAppOutlined /> WhatsApp
          </a>
        </div>
      </div>

      {/* Links */}
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr] lg:gap-10">
        <div className="col-span-2 lg:col-span-1">
          <p className="m-0 text-lg font-bold">{footer.brand}</p>
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{footer.tagline}</p>
          <p className="m-0 mt-3 max-w-[340px] text-sm leading-relaxed text-white/60">{footer.about}</p>
        </div>

        {footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className={col.inline ? 'col-span-2 sm:col-span-1' : ''}>
            <p className="m-0 text-sm font-semibold uppercase tracking-wider text-white">{col.title}</p>
            <ul className={`m-0 mt-4 flex list-none gap-3 p-0 ${col.inline ? 'flex-row flex-wrap gap-x-5 gap-y-2.5 sm:flex-col sm:gap-3' : 'flex-col'}`}>
              {col.links.map((l) => (
                <li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-2 sm:col-span-1 lg:col-span-1">
          <p className="m-0 text-sm font-semibold uppercase tracking-wider text-white">Connect</p>
          <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
            <li>
              <a href={footer.phone.href} className={`${linkCls} inline-flex items-center gap-2.5`}>
                <PhoneFilled className="text-brand-red" /> {footer.phone.label}
              </a>
            </li>
            <li>
              <a href={`mailto:${footer.email}`} className={`${linkCls} inline-flex items-center gap-2.5 [overflow-wrap:anywhere]`}>
                <MailOutlined className="text-brand-red" /> {footer.email}
              </a>
            </li>
            <li className="flex gap-2.5 text-sm leading-relaxed text-white/65">
              <EnvironmentOutlined className="mt-1 text-brand-red" /> {footer.address}
            </li>
          </ul>
          <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white no-underline hover:text-white/80">
            Book a free site visit <ArrowRightOutlined />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col-reverse items-center gap-4 border-0 border-t border-solid border-white/10 pt-6 sm:flex-row sm:justify-between">
        <p className="m-0 text-center text-xs text-white/50 sm:text-sm">
          © {new Date().getFullYear()} {footer.brand}. All rights reserved.
        </p>
        <div className="social-icons !m-0 [&_a]:!bg-white/10">
          {footer.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default FooterContact;