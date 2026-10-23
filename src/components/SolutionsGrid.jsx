import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { solutions, siteUrl } from '../data/siteData';

/*
  Line icons (64x64). Grey/navy lines = currentColor, red details = the "accent" class.
  To add a service: add an icon here and an item in siteData.js -> solutions.items.
*/
const A = 'stroke-brand-red'; // accent stroke
const icons = {
  kitchen: (
    <>
      <path d="M26 6v6M20 18l6-6 6 6" className={A} />
      <rect x="8" y="12" width="10" height="5" rx="1" /><rect x="40" y="12" width="12" height="5" rx="1" />
      <rect x="8" y="28" width="48" height="26" rx="1.5" /><path d="M8 38h48M24 38v16M40 38v16" />
      <rect x="28" y="42" width="8" height="6" className={A} /><path d="M14 33h4M46 33h4" />
    </>
  ),
  wardrobe: (
    <>
      <rect x="10" y="6" width="28" height="50" rx="1.5" /><path d="M24 6v50" />
      <path d="M20 26v6M28 26v6" className={A} />
      <rect x="38" y="20" width="16" height="36" rx="1" /><path d="M38 32h16M38 44h16M44 26h4M44 38h4M44 50h4" />
    </>
  ),
  crockery: (
    <>
      <rect x="8" y="6" width="48" height="50" rx="1.5" /><path d="M8 22h48M8 38h48M24 6v16M40 6v16" />
      <path d="M14 34h8v-6M30 34v-8h6v8" className={A} /><path d="M26 46h12" className={A} />
    </>
  ),
  spaceSaving: (
    <>
      <rect x="20" y="6" width="24" height="12" rx="1.5" /><path d="M26 10h12" />
      <path d="M14 30h36" className={A} strokeWidth="3" />
      <path d="M18 30l-4 24M46 30l4 24M24 30v24M40 30v24" />
      <path d="M10 38h10v16M54 38H44v16" />
    </>
  ),
  tv: (
    <>
      <rect x="16" y="6" width="32" height="22" rx="1.5" /><path d="M32 28v6" />
      <rect x="8" y="34" width="48" height="20" rx="1.5" /><path d="M8 44h48M32 34v20" />
      <path d="M18 40h6M40 40h6" className={A} />
    </>
  ),
  study: (
    <>
      <rect x="8" y="6" width="18" height="12" rx="1" /><path d="M8 26h30M10 26v28M36 26v28M10 38h12M10 46h12" />
      <path d="M14 42h4M14 50h4" className={A} />
      <path d="M44 30h10v10H44zM49 40v10M43 54h12M49 50v4" />
      <path d="M30 26v-8a4 4 0 0 1 8 0" className={A} />
    </>
  ),
  ceiling: (
    <>
      <path d="M6 10h52M10 10v12h44V10" /><path d="M14 22l6 8h24l6-8" />
      <path d="M32 30v8M26 44l6-6 6 6M22 38h20" className={A} />
      <path d="M32 44v10" />
    </>
  ),
  lights: (
    <>
      <circle cx="32" cy="10" r="4" /><path d="M32 14v12" />
      <path d="M22 44l4-18h12l4 18z" /><path d="M16 50h32" />
      <path d="M28 44a4 4 0 0 0 8 0" className={A} />
    </>
  ),
  wallpaper: (
    <>
      <rect x="12" y="6" width="42" height="50" rx="1.5" /><circle cx="12" cy="20" r="5" /><path d="M7 20v18a5 5 0 0 0 10 0V20" />
      <path d="M22 12h2M30 12h2M38 12h2M46 12h2M26 20h2M34 20h2M42 20h2M22 28h2M30 28h2M38 28h2M46 28h2M26 36h2M34 36h2M42 36h2M30 44h2M38 44h2M46 44h2" className={A} />
    </>
  ),
  paint: (
    <>
      <rect x="18" y="6" width="34" height="12" rx="2" /><path d="M52 12h4v12H34v8" />
      <rect x="30" y="32" width="8" height="22" rx="1.5" />
      <path d="M18 10c-6 0-8 4-8 10s-2 10 0 18M14 26c-2 6 2 10 0 16" className={A} />
    </>
  ),
  bathroom: (
    <>
      <rect x="8" y="6" width="16" height="48" rx="1.5" /><path d="M16 6v48" />
      <path d="M40 8h8v14" /><path d="M44 26v2M40 30v2M48 30v2M44 34v2" className={A} />
      <path d="M24 40h34v6a8 8 0 0 1-8 8H32a8 8 0 0 1-8-8z" /><path d="M30 54l-2 4M52 54l2 4" />
    </>
  ),
  pooja: (
    <>
      <path d="M32 4v4M12 18l20-10 20 10" /><rect x="10" y="18" width="44" height="36" rx="1.5" />
      <path d="M18 54V34a14 14 0 0 1 28 0v20" />
      <path d="M24 46h16v8H24zM32 34v6" className={A} />
    </>
  ),
  foyer: (
    <>
      <rect x="32" y="6" width="22" height="48" rx="1.5" /><path d="M48 30v4" />
      <path d="M8 40h20v14H8zM8 47h20" /><path d="M14 43h4M14 51h4" className={A} />
      <path d="M12 40V28M10 28h4" /><path d="M54 54v-8M50 42h8" className={A} />
    </>
  ),
  movable: (
    <>
      <rect x="20" y="6" width="24" height="12" rx="1.5" /><path d="M26 10h12" />
      <path d="M14 30h36" className={A} strokeWidth="3" />
      <path d="M20 30v20M44 30v20M14 30l-4 24M50 30l4 24M26 40h12" />
      <circle cx="20" cy="54" r="2" /><circle cx="44" cy="54" r="2" />
    </>
  ),
  kids: (
    <>
      <path d="M10 6v50M54 6v50M10 24h44M10 44h44M10 34h44" />
      <path d="M18 24v32M26 24v32M18 30h8M18 38h8M18 48h8" className={A} />
      <path d="M48 12l4 4M44 16l4 4" /><circle cx="42" cy="40" r="2" />
    </>
  ),
};

const Icon = ({ name }) => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    className="h-14 w-14 text-brand-navy/70 transition duration-300 group-hover:-translate-y-1 group-hover:text-brand-navy sm:h-16 sm:w-16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {icons[name] || icons.ceiling}
  </svg>
);

// Home page: grid of every interior service, each linking to its page or opening the form
const SolutionsGrid = ({ onOpenForm }) => {
  // Structured data: the list of services offered (helps Google show your services)
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: solutions.title,
      itemListElement: solutions.items.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: s.label,
          provider: { '@type': 'HomeAndConstructionBusiness', name: 'Urbane Living' },
          ...(s.to ? { url: `${siteUrl}${s.to}` } : {}),
        },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const card =
    'group flex h-full w-full cursor-pointer flex-col items-center justify-start gap-3 rounded-2xl border border-solid border-transparent bg-transparent px-2 py-5 text-center no-underline transition duration-300 hover:border-gray-100 hover:bg-white hover:shadow-card sm:py-6';
  const text = 'text-[13px] font-medium leading-snug text-gray-700 transition group-hover:text-brand-red sm:text-[15px]';

  return (
    <section aria-labelledby="solutions-title" className="bg-white px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-8 max-w-[680px] text-center lg:mb-12">
          <h2 id="solutions-title" className="m-0 text-[26px] font-semibold text-brand-navy sm:text-[34px]">
            {solutions.title}
          </h2>
          {solutions.subtitle && <p className="m-0 mt-3 text-[15px] text-gray-500 sm:text-base">{solutions.subtitle}</p>}
        </div>

        <ul className="m-0 grid list-none grid-cols-3 gap-x-2 gap-y-2 p-0 sm:grid-cols-4 sm:gap-x-4 lg:grid-cols-5 lg:gap-y-4">
          {solutions.items.map((s) => (
            <li key={s.label}>
              {s.to ? (
                <Link to={s.to} className={card} aria-label={`${s.label} designs`}>
                  <Icon name={s.icon} />
                  <span className={text}>{s.label}</span>
                </Link>
              ) : (
                <button type="button" onClick={onOpenForm} className={card} aria-label={`Get a quote for ${s.label}`}>
                  <Icon name={s.icon} />
                  <span className={text}>{s.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center lg:mt-12">
          <button
            type="button"
            onClick={onOpenForm}
            className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-brand-red px-8 text-[15px] font-semibold tracking-wide text-white shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-red-dark sm:w-auto"
          >
            {solutions.cta} <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;