import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, EnvironmentOutlined } from '@ant-design/icons';
import useSeo from '../hooks/useSeo';
import { siteUrl } from '../data/siteData';
import { localServices, localCities, areasPage, slugify } from '../data/localSeo';

// /interior-designers: hub page linking every city × service page and every locality
export default function AreasPage() {
  const schema = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Areas we serve', item: `${siteUrl}/interior-designers` },
      ],
    },
  ], []);
  useSeo({ title: areasPage.title, description: areasPage.description, path: '/interior-designers', schema });

  return (
    <div className="bg-white">
      <section className="bg-brand-navy px-4 py-12 text-center text-white sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[760px]">
          <h1 className="m-0 text-[28px] font-bold leading-tight sm:text-[42px]">
            {areasPage.h1} <span className="text-brand-gold">{areasPage.highlight}</span>
          </h1>
          <p className="m-0 mt-4 text-[15px] text-white/80 sm:text-base">{areasPage.text}</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <ul className="m-0 mx-auto grid max-w-[1200px] list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {localCities.map((c) => (
            <li key={c.slug} className="rounded-2xl border border-solid border-gray-100 bg-white p-5 shadow-card sm:p-6">
              <h2 className="m-0 flex items-center gap-2 text-xl font-semibold text-brand-navy">
                <EnvironmentOutlined className="text-brand-red" /> {c.name}
              </h2>
              <p className="m-0 mt-1 text-xs text-gray-500">{c.localities.length} areas covered</p>
              <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
                {localServices.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/${s.slug}/${c.slug}`} className="group flex items-center justify-between rounded-xl bg-brand-soft px-4 py-2.5 text-sm font-medium text-brand-navy no-underline transition hover:bg-brand-red hover:text-white">
                      {s.name} in {c.name}
                      <ArrowRightOutlined className="text-xs text-brand-red group-hover:text-white" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-5 text-xs font-semibold uppercase tracking-wider text-gray-500">Areas in {c.name}</p>
              <ul className="m-0 mt-2 flex list-none flex-wrap gap-x-3 gap-y-1.5 p-0">
                {c.localities.map((l) => (
                  <li key={l}>
                    <Link to={`/interior-designers/${c.slug}/${slugify(l)}`} className="text-[13px] text-brand-navy underline decoration-gray-300 underline-offset-2 hover:text-brand-red">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}