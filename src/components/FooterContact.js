import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneFilled,
  YoutubeFilled,
  InstagramOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import './css/FooterContact.css';

// Real brand logos (white), shown on each brand's own colour
const WhatsAppLogo = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const FacebookLogo = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.03.28-1.73 1.76-1.73Z" />
  </svg>
);

const XLogo = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// Footer content (edit here)
const footer = {
  brand: 'Urbane Living',
  tagline: 'Where Design Finds Its Home',
  about: 'Interior design and false ceiling experts for homes across Delhi NCR. Design, 3D and execution, all under one roof.',
  cta: {
    title: 'Want quick assistance?',
    text: 'Call or WhatsApp us for premium home design services.',
  },
  phone: { label: '1800-123-6407', href: 'tel:18001236407' }, // toll-free: dial without +91
  whatsapp: 'https://wa.me/919105052454',
  email: 'sales1@urbaneliving.in',
  address: 'G-12 Express Green Plaza, Sector-1, Vaishali, Ghaziabad',
  mapUrl: 'https://maps.app.goo.gl/Vmcg7suXMcbk7RMR9', // Google Maps link of the office
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
  // bg = the brand's own colour (Instagram uses its gradient)
  socials: [
    { label: 'WhatsApp', href: 'https://wa.me/919105052454', icon: <WhatsAppLogo />, bg: 'bg-[#25D366]' },
    { label: 'Facebook', href: 'https://www.facebook.com/urbaneliving.in', icon: <FacebookLogo />, bg: 'bg-[#1877F2]' },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/urbaneliving.in',
      icon: <InstagramOutlined className="text-[20px]" />,
      bg: 'bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]',
    },
    { label: 'YouTube', href: 'https://www.youtube.com/@urbaneliving-ncr', icon: <YoutubeFilled className="text-[20px]" />, bg: 'bg-[#FF0000]' },
    { label: 'X (Twitter)', href: 'https://x.com/UrbaneLiving001', icon: <XLogo />, bg: 'bg-black ring-1 ring-white/25' },
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
            <WhatsAppLogo size={18} /> WhatsApp
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
          {/* same round, real-colour icons as the social row */}
          <ul className="m-0 mt-4 flex list-none flex-col gap-3.5 p-0">
            {[
              { href: footer.phone.href, icon: <PhoneFilled className="text-[15px] [transform:scaleX(-1)]" />, bg: 'bg-[#1A73E8]', text: footer.phone.label, note: 'Toll free' },
              { href: footer.whatsapp, icon: <WhatsAppLogo size={17} />, bg: 'bg-[#25D366]', text: 'Chat on WhatsApp', external: true },
              { href: `mailto:${footer.email}`, icon: <MailOutlined className="text-[15px]" />, bg: 'bg-[#EA4335]', text: footer.email },
              { href: footer.mapUrl, icon: <EnvironmentOutlined className="text-[15px]" />, bg: 'bg-[#34A853]', text: footer.address, external: true },
            ].map((c) => (
              <li key={c.text}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-start gap-3 text-sm leading-snug text-white/75 no-underline transition hover:text-white"
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition group-hover:-translate-y-0.5 ${c.bg}`}>
                    {c.icon}
                  </span>
                  <span className="min-w-0 self-center [overflow-wrap:anywhere]">
                    {c.note && <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/60">{c.note}</span>}
                    {c.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white no-underline hover:text-white/80">
            Book a free site visit <ArrowRightOutlined />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col-reverse items-center gap-5 border-0 border-t border-solid border-white/10 pt-6 sm:flex-row sm:justify-between">
        <p className="m-0 text-center text-xs text-white/60 sm:text-sm">
          © {new Date().getFullYear()} {footer.brand}. All rights reserved.
        </p>
        {/* Social icons in their real brand colours */}
        <ul className="m-0 flex list-none items-center gap-3 p-0" aria-label="Follow Urbane Living">
          {footer.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-white no-underline shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:brightness-110 ${s.bg}`}
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default FooterContact;