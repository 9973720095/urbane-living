import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightOutlined,
  WhatsAppOutlined,
  BulbFilled,
  SafetyCertificateFilled,
  TagFilled,
  CheckCircleFilled,
} from '@ant-design/icons';
import { contact } from '../data/siteData';

/*
  Reusable page banner. Every prop is optional except `title`.

  <PageBanner
    title="Turn Your Home Luxury in"
    highlight="7 Days"
    subtitle="Premium False Ceiling Designs Starting ₹95/sqft"
    image="https://..."            // or video="https://...mp4"
    primary={{ label: 'Get Free Design', onClick: onOpenForm }}   // or { to: '/contact' } / { href: 'https://...' }
    whatsappMessage="Hi, I want a false ceiling quote"
    eyebrow="False Ceiling Experts · Delhi NCR"     // small badge above the title
    highlights={highlights}        // trust points row (from siteData), like the home hero
    align="right"                  // 'center' | 'left' | 'right' (text block sits on the right half)
  />
*/

const heights = {
  sm: 'min-h-[260px] sm:min-h-[320px]',
  md: 'min-h-[360px] sm:min-h-[440px]',
  lg: 'min-h-[440px] sm:min-h-[560px] lg:min-h-[80vh]',
  full: 'min-h-[calc(100svh-60px)] lg:min-h-[calc(100vh-72px)]',
};

// Icons for siteData highlights (by key); anything else gets a tick
const highlightIcons = {
  design: <BulbFilled />,
  warranty: <SafetyCertificateFilled />,
  pricing: <TagFilled />,
};

const overlays = {
  dark: 'bg-[linear-gradient(180deg,rgba(15,22,40,0.55),rgba(15,22,40,0.75))]',
  // darker on the side where the text sits
  'dark-left': 'bg-[linear-gradient(180deg,rgba(15,22,40,0.65),rgba(15,22,40,0.80))] md:bg-[linear-gradient(90deg,rgba(15,22,40,0.88)_0%,rgba(15,22,40,0.60)_45%,rgba(15,22,40,0.15)_100%)]',
  'dark-right': 'bg-[linear-gradient(180deg,rgba(15,22,40,0.65),rgba(15,22,40,0.80))] md:bg-[linear-gradient(270deg,rgba(15,22,40,0.88)_0%,rgba(15,22,40,0.60)_45%,rgba(15,22,40,0.10)_100%)]',
  light: 'bg-white/70',
  none: '',
};

const btnBase =
  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold tracking-wide no-underline transition hover:-translate-y-0.5 sm:w-auto cursor-pointer border-0';

// Renders a <Link>, <a> or <button> depending on what the action has
const ActionButton = ({ action, className, children }) => {
  if (action.to) return <Link to={action.to} className={className}>{children}</Link>;
  if (action.href) {
    const external = /^https?:/.test(action.href);
    return (
      <a href={action.href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    );
  }
  return <button type="button" onClick={action.onClick} className={className}>{children}</button>;
};

const PageBanner = ({
  title,
  highlight,
  subtitle,
  eyebrow,
  image,
  video,
  primary,
  secondary,
  showWhatsApp = true,
  whatsappLabel = 'WhatsApp Now',
  whatsappMessage,
  align = 'center',
  height = 'lg',
  overlay = 'dark',
  as: Heading = 'h1',
  imageAlt = '',
  highlights,
  children,
}) => {
  const isLight = overlay === 'light';
  const centered = align === 'center';
  // dark overlay follows the text side
  const overlayKey = overlay === 'dark' && align !== 'center' ? `dark-${align}` : overlay;
  const blockAlign = {
    center: 'items-center text-center',
    left: 'items-center text-center md:items-start md:text-left',
    right: 'items-center text-center md:ml-auto md:max-w-[620px] md:items-start md:text-left',
  }[align] || 'items-center text-center';

  const whatsappHref = whatsappMessage
    ? `${contact.whatsappHref}?text=${encodeURIComponent(whatsappMessage)}`
    : contact.whatsappHref;

  return (
    <section
      className={`relative flex w-full items-center overflow-hidden bg-brand-navy ${heights[height] || heights.lg}`}
      aria-label={typeof title === 'string' ? title : undefined}
    >
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={image}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : image ? (
        <img
          src={image}
          alt={imageAlt}
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {overlay !== 'none' && <div className={`absolute inset-0 ${overlays[overlayKey] || overlays.dark}`} />}

      <div className="relative z-[1] mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8">
      <div className={`flex w-full flex-col ${blockAlign}`}>
        {eyebrow && (
          <span
            className={`mb-4 inline-flex items-center gap-2 rounded-full border border-solid px-3.5 py-1.5 text-xs font-medium tracking-wide backdrop-blur sm:text-[13px] ${
              isLight ? 'border-brand-navy/15 bg-white/60 text-brand-navy' : 'border-white/25 bg-white/10 text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-brand-red" />
            {eyebrow}
          </span>
        )}

        <Heading
          className={`m-0 max-w-[820px] text-[30px] font-semibold leading-[1.15] tracking-tight sm:text-[38px] lg:text-[48px] xl:text-[54px] ${
            isLight ? 'text-brand-navy' : 'text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.35)]'
          }`}
        >
          {title}
          {highlight && (
            <>
              {' '}
              <span className={isLight ? 'text-brand-red' : 'text-brand-gold'}>{highlight}</span>
            </>
          )}
        </Heading>

        {subtitle && (
          <p className={`m-0 mt-3 max-w-[640px] text-base leading-relaxed sm:mt-4 sm:text-lg ${isLight ? 'text-gray-700' : 'text-white/90'}`}>
            {subtitle}
          </p>
        )}

        {(primary || secondary || showWhatsApp) && (
          <div className={`mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row ${centered ? 'sm:justify-center' : 'sm:justify-center md:justify-start'}`}>
            {primary && (
              <ActionButton action={primary} className={`${btnBase} bg-brand-red !text-white shadow-cta hover:bg-brand-red-dark`}>
                {primary.label} <ArrowRightOutlined />
              </ActionButton>
            )}
            {secondary && (
              <ActionButton
                action={secondary}
                className={`${btnBase} border border-solid ${
                  isLight
                    ? 'border-brand-navy/20 bg-white !text-brand-navy hover:border-brand-navy'
                    : 'border-white/60 bg-white/10 !text-white backdrop-blur hover:bg-white hover:!text-brand-navy'
                }`}
              >
                {secondary.label}
              </ActionButton>
            )}
            {showWhatsApp && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnBase} bg-[#25D366] !text-white shadow-[0_10px_24px_rgba(37,211,102,0.30)] hover:brightness-95`}
              >
                <WhatsAppOutlined /> {whatsappLabel}
              </a>
            )}
          </div>
        )}

        {highlights && highlights.length > 0 && (
          <ul className={`m-0 mt-7 flex list-none flex-wrap gap-x-6 gap-y-2.5 p-0 sm:mt-8 ${centered ? 'justify-center' : 'justify-center md:justify-start'}`}>
            {highlights.map((item) => {
              const text = typeof item === 'string' ? item : item.text;
              const icon = (typeof item === 'object' && highlightIcons[item.key]) || <CheckCircleFilled />;
              return (
                <li key={text} className={`inline-flex items-center gap-2 text-[13px] font-medium sm:text-sm ${isLight ? 'text-brand-navy' : 'text-white/90'}`}>
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[13px] ${isLight ? 'bg-brand-navy/5 text-brand-red' : 'bg-white/10 text-[#FFC93C]'}`}>
                    {icon}
                  </span>
                  {text}
                </li>
              );
            })}
          </ul>
        )}

        {children}
      </div>
      </div>
    </section>
  );
};

export default PageBanner;