import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  PlusOutlined,
  WhatsAppOutlined,
  AppstoreOutlined,
  InboxOutlined,
  DesktopOutlined,
  HomeOutlined,
  TableOutlined,
  StarOutlined,
  ReadOutlined,
  ShopOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import PageBanner from '../components/PageBanner';
import CustomSections from '../components/CustomSections';
import VideoReels from '../components/VideoReels';
import useSeo from '../hooks/useSeo';
import { factoryPage, factoryVideos, brand, contact, siteUrl } from '../data/siteData';

// /factory: our factory (content: data/factory.js)
const { banner, intro, videos, process, products, machines, materials, quality, compare, faqs, cta, seo } = factoryPage;

const productIcons = {
  kitchen: <AppstoreOutlined />,
  wardrobe: <InboxOutlined />,
  tv: <DesktopOutlined />,
  bed: <HomeOutlined />,
  crockery: <TableOutlined />,
  pooja: <StarOutlined />,
  study: <ReadOutlined />,
  foyer: <ShopOutlined />,
};

const tag = 'mb-3 inline-block rounded-full bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-red-dark';
const h2 = 'm-0 text-[26px] font-semibold leading-tight text-brand-navy sm:text-[34px]';

export default function FactoryPage({ onOpenForm }) {
  const openForm = () => typeof onOpenForm === 'function' && onOpenForm();

  const schema = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      description: seo.description,
      url: `${siteUrl}${seo.path}`,
      publisher: { '@type': 'Organization', name: brand.name, logo: brand.logo },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Our Factory', item: `${siteUrl}${seo.path}` },
      ],
    },
    ...factoryVideos.map((v) => ({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: `${v.title} | ${brand.name} factory`,
      description: v.text,
      thumbnailUrl: v.videoUrl.replace('/video/upload/', `/video/upload/so_${v.posterAt},w_720,q_auto,f_jpg/`).replace(/\.[^/.]+$/, '.jpg'),
      contentUrl: v.videoUrl,
      uploadDate: '2026-11-23',
    })),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ], []);
  useSeo({ ...seo, schema });

  return (
    <div className="bg-white">
      {/* 1. Banner */}
      <PageBanner {...banner} primary={{ label: 'Book Free Consultation', onClick: openForm }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1200px] px-4 pt-6 text-sm sm:px-6">
        <ol className="m-0 flex list-none items-center gap-2 p-0 text-gray-500">
          <li><Link to="/" className="text-gray-500 no-underline hover:text-brand-red">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-brand-navy">Our Factory</li>
        </ol>
      </nav>

      <CustomSections page="factory" at="after-hero" />

      {/* 2. Why a factory */}
      <section aria-labelledby="factory-intro" className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[900px] text-center">
          <span className={tag}>{intro.tag}</span>
          <h2 id="factory-intro" className={h2}>{intro.title}</h2>
          {intro.paragraphs.map((p) => (
            <p key={p} className="m-0 mt-4 text-[15px] leading-relaxed text-gray-600 sm:text-base">{p}</p>
          ))}
        </div>
      </section>

      {/* Factory videos (muted, play while on screen) */}
      <section aria-labelledby="factory-videos" className="bg-white px-4 pb-12 sm:px-6 lg:pb-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-7 text-center sm:mb-10">
            <span className={tag}>{videos.tag}</span>
            <h2 id="factory-videos" className={h2}>{videos.title}</h2>
            <p className="m-0 mx-auto mt-3 max-w-[620px] text-[15px] text-gray-500 sm:text-base">{videos.subtitle}</p>
          </div>
          <VideoReels items={factoryVideos} desktop={3} label="Factory videos" />
        </div>
      </section>

      {/* 3. Process */}
      <section aria-labelledby="factory-process" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 text-center lg:mb-10">
            <span className={tag}>{process.tag}</span>
            <h2 id="factory-process" className={h2}>{process.title}</h2>
          </div>
          <ol className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-5 lg:grid-cols-4">
            {process.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white p-4 shadow-card sm:p-6">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-[15px] font-bold text-white">{i + 1}</span>
                <h3 className="m-0 text-[14px] font-semibold leading-snug text-brand-navy sm:text-[16px]">{s.title}</h3>
                <p className="m-0 mt-1.5 text-[12.5px] leading-relaxed text-gray-600 sm:text-[14px]">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CustomSections page="factory" at="after-process" />

      {/* 4. What we make */}
      <section aria-labelledby="factory-products" className="px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 text-center lg:mb-10">
            <span className={tag}>{products.tag}</span>
            <h2 id="factory-products" className={h2}>{products.title}</h2>
          </div>
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-5 lg:grid-cols-4">
            {products.items.map((p) => {
              const body = (
                <>
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy/5 text-xl text-brand-navy">{productIcons[p.icon]}</span>
                  <span className="block text-[14px] font-semibold text-brand-navy sm:text-[16px]">{p.title}</span>
                  <span className="mt-1 block text-[12.5px] leading-relaxed text-gray-600 sm:text-[14px]">{p.text}</span>
                  {p.to && <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-red">See designs <ArrowRightOutlined /></span>}
                </>
              );
              return (
                <li key={p.title}>
                  {p.to ? (
                    <Link to={p.to} className="block h-full rounded-2xl border border-solid border-gray-100 bg-white p-4 no-underline shadow-card transition hover:-translate-y-1 hover:shadow-card-hover sm:p-6">{body}</Link>
                  ) : (
                    <div className="h-full rounded-2xl border border-solid border-gray-100 bg-white p-4 shadow-card sm:p-6">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 5. Machines */}
      <section aria-labelledby="factory-machines" className="bg-brand-navy px-4 py-12 text-white sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 text-center lg:mb-10">
            <span className="mb-3 inline-block rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-gold">{machines.tag}</span>
            <h2 id="factory-machines" className="m-0 text-[26px] font-semibold leading-tight text-white sm:text-[34px]">{machines.title}</h2>
          </div>
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-5 lg:grid-cols-3">
            {machines.items.map((m, i) => (
              <li key={m.title} className={`rounded-2xl bg-white/5 p-4 sm:p-6 ${machines.items.length % 2 === 1 && i === machines.items.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}>
                <ToolOutlined className="text-xl text-brand-gold" />
                <h3 className="m-0 mt-3 text-[14px] font-semibold sm:text-[16px]">{m.title}</h3>
                <p className="m-0 mt-1.5 text-[12.5px] leading-relaxed text-white/75 sm:text-[14px]">{m.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CustomSections page="factory" at="after-machines" />

      {/* 6. Materials + quality */}
      <section aria-labelledby="factory-materials" className="px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div>
            <span className={tag}>{materials.tag}</span>
            <h2 id="factory-materials" className={h2}>{materials.title}</h2>
            <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
              {materials.items.map((m) => (
                <li key={m.title} className="rounded-xl border border-solid border-gray-100 bg-brand-soft p-4">
                  <span className="block text-[15px] font-semibold text-brand-navy">{m.title}</span>
                  <span className="mt-1 block text-[13.5px] leading-relaxed text-gray-600">{m.text}</span>
                </li>
              ))}
            </ul>
            <p className="m-0 mt-4 text-[13px] text-gray-500">{materials.note}</p>
          </div>
          <div className="rounded-3xl bg-brand-soft p-6 sm:p-8">
            <span className={tag}>{quality.tag}</span>
            <h2 className="m-0 text-[22px] font-semibold leading-tight text-brand-navy sm:text-[26px]">{quality.title}</h2>
            <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
              {quality.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-gray-700">
                  <CheckCircleFilled className="mt-1 shrink-0 text-emerald-500" /> {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Factory vs site carpentry */}
      <section aria-labelledby="factory-compare" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[900px]">
          <h2 id="factory-compare" className={`${h2} text-center`}>{compare.title}</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-card">
            <table className="w-full min-w-[520px] border-collapse text-left text-[14px] sm:text-[15px]">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-5"><span className="sr-only">Point</span></th>
                  {compare.columns.map((c) => <th key={c} scope="col" className="px-4 py-3 font-semibold sm:px-5">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {compare.rows.map(([label, good, bad], i) => (
                  <tr key={label} className={i % 2 ? 'bg-brand-soft' : 'bg-white'}>
                    <th scope="row" className="px-4 py-3 font-semibold text-brand-navy sm:px-5">{label}</th>
                    <td className="px-4 py-3 text-gray-700 sm:px-5"><CheckCircleFilled className="mr-2 text-emerald-500" />{good}</td>
                    <td className="px-4 py-3 text-gray-500 sm:px-5"><CloseCircleFilled className="mr-2 text-gray-400" />{bad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CustomSections page="factory" at="before-faq" />

      {/* 8. FAQ */}
      <section aria-labelledby="factory-faq" className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[860px]">
          <h2 id="factory-faq" className={`${h2} text-center`}>Factory FAQs</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-solid border-gray-200 bg-white px-5 py-4 open:border-brand-red/30 open:bg-brand-soft">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15.5px] font-semibold text-brand-navy [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <PlusOutlined className="mt-1 shrink-0 text-brand-red transition group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="m-0 mt-3 text-[15px] leading-relaxed text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-[1000px] rounded-3xl bg-brand-navy px-6 py-10 text-center text-white sm:px-10 sm:py-12">
          <h2 className="m-0 text-[24px] font-semibold sm:text-[30px]">{cta.title}</h2>
          <p className="m-0 mx-auto mt-3 max-w-[560px] text-[15px] text-white/75 sm:text-base">{cta.text}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={openForm} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-8 text-sm font-semibold text-white shadow-cta transition hover:bg-brand-red-dark">
              {cta.button} <ArrowRightOutlined />
            </button>
            <a
              href={`${contact.whatsappHref}?text=${encodeURIComponent(banner.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 text-sm font-semibold text-white no-underline transition hover:bg-[#1EBE5D]"
            >
              <WhatsAppOutlined /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <CustomSections page="factory" at="end" />
    </div>
  );
}
