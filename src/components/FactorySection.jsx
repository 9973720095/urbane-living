import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';
import { factoryHome } from '../data/siteData';

// Home page: "Our Factory" section. The whole card and the button open /factory (content: data/factory.js)
export default function FactorySection() {
  const f = factoryHome;
  return (
    <section aria-labelledby="factory-home-title" className="bg-white px-4 py-12 sm:px-6 lg:py-20">
      <Link
        to={f.button.to}
        className="group mx-auto grid max-w-[1200px] grid-cols-1 overflow-hidden rounded-3xl bg-brand-navy text-white no-underline shadow-card transition hover:shadow-card-hover lg:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
          <img
            src={f.image}
            alt={f.imageAlt}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <span className="mb-3 inline-block w-fit rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-gold">{f.tag}</span>
          <h2 id="factory-home-title" className="m-0 text-[26px] font-semibold leading-tight text-white sm:text-[34px]">
            {f.title} <span className="text-brand-gold">{f.highlight}</span>
          </h2>
          <p className="m-0 mt-4 text-[15px] leading-relaxed text-white/80 sm:text-base">{f.text}</p>
          <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2">
            {f.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2 text-[14px] text-white/90">
                <CheckCircleFilled className="mt-1 shrink-0 text-emerald-400" /> {pt}
              </li>
            ))}
          </ul>
          <span className="mt-7 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-brand-red px-7 text-[15px] font-semibold text-white shadow-cta transition group-hover:bg-brand-red-dark">
            {f.button.label} <ArrowRightOutlined className="transition group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </section>
  );
}
