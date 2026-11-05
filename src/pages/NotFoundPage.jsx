import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, HomeOutlined } from '@ant-design/icons';
import Seo from '../components/Seo';
import { pageSeo } from '../data/pageSeo';

const links = [
  { label: 'False Ceiling', to: '/false-ceiling' },
  { label: 'Modular Kitchen', to: '/kitchen' },
  { label: 'Bedroom Interiors', to: '/bedroom' },
  { label: 'Vastu Score', to: '/vastu' },
  { label: 'Contact Us', to: '/contact' },
];

// Shown for any URL that does not exist (route path="*"); noindex so Google drops it
export default function NotFoundPage() {
  return (
    <section className="bg-brand-soft px-4 py-20 sm:px-6 lg:py-28">
      <Seo {...pageSeo.notFound} />
      <div className="mx-auto max-w-[640px] text-center">
        <p className="m-0 text-[72px] font-bold leading-none text-brand-red sm:text-[96px]">404</p>
        <h1 className="m-0 mt-4 text-[26px] font-semibold text-brand-navy sm:text-[34px]">This page could not be found</h1>
        <p className="m-0 mt-3 text-[15px] text-gray-500">The link may be old or mistyped. Try one of these instead:</p>
        <ul className="m-0 mt-6 flex list-none flex-wrap justify-center gap-2 p-0">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="inline-flex items-center gap-1.5 rounded-full border border-solid border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-navy no-underline transition hover:border-brand-red hover:text-brand-red">
                {l.label} <ArrowRightOutlined className="text-xs" />
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red px-7 text-[15px] font-semibold text-white no-underline shadow-cta transition hover:bg-brand-red-dark">
          <HomeOutlined /> Back to home
        </Link>
      </div>
    </section>
  );
}