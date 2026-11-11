import React from 'react';
import { Link } from 'react-router-dom';
import { EnvironmentOutlined, RightOutlined } from '@ant-design/icons';
import { localCities } from '../../data/localSeo';
import { ceilingCities } from '../../data/ceilingGuide';
import SectionHeading from '../SectionHeading';

// False Ceiling page: links to the city pages (/false-ceiling/noida ...). Good for local SEO.
const CeilingCities = () => (
  <section aria-labelledby="fc-cities-title" className="bg-white px-4 py-12 sm:px-6 lg:py-20">
    <div className="mx-auto max-w-[1000px]">
      <SectionHeading
        id="fc-cities-title"
        eyebrow={ceilingCities.eyebrow}
        title={ceilingCities.title}
        highlight={ceilingCities.highlight}
        subtitle={ceilingCities.subtitle}
      />
      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
        {localCities.map((c) => (
          <li key={c.slug}>
            <Link
              to={`/false-ceiling/${c.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-solid border-gray-100 bg-brand-soft p-3.5 no-underline transition hover:border-brand-red/40 hover:bg-white hover:shadow-card sm:p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-red shadow-card">
                <EnvironmentOutlined />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold leading-tight text-brand-navy group-hover:text-brand-red-dark">
                  {c.name}
                  <span className="sr-only"> false ceiling</span>
                </span>
                <span className="block text-[12px] text-gray-500">{c.localities.length} areas covered</span>
              </span>
              <RightOutlined className="hidden text-[11px] text-gray-400 sm:inline" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default CeilingCities;