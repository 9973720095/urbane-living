import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowRightOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  CheckCircleFilled,
  DesktopOutlined,
  BulbOutlined,
  AppstoreOutlined,
  BorderOuterOutlined,
  HomeOutlined,
  ExpandOutlined,
  InboxOutlined,
  ReadOutlined,
  SmileOutlined,
  SkinOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import PageBanner from '../components/PageBanner';
import useSeo from '../hooks/useSeo';
import { API_BASE_URL, siteUrl, contact } from '../data/siteData';

const PAGE = 9; // designs shown before "Load more"

const elementIcons = {
  tv: <DesktopOutlined />,
  ceiling: <BorderOuterOutlined />,
  panel: <AppstoreOutlined />,
  light: <BulbOutlined />,
  storage: <AppstoreOutlined />,
  foyer: <HomeOutlined />,
  bed: <HomeOutlined />,
  wardrobe: <InboxOutlined />,
  study: <ReadOutlined />,
  kids: <SmileOutlined />,
  dressing: <SkinOutlined />,
  appliance: <ThunderboltOutlined />,
  hardware: <ToolOutlined />,
};

const sectionTitle = 'm-0 text-[26px] font-semibold leading-tight text-brand-navy sm:text-[34px]';
const sectionSub = 'm-0 mt-3 text-[15px] text-gray-500 sm:text-base';

// Full-screen image viewer with next / previous and Esc to close
const Lightbox = ({ items, index, onClose, onMove, onQuote }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onMove]);

  const item = items[index];
  const nav = 'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-white/15 text-white backdrop-blur transition hover:bg-white hover:text-brand-navy';

  return (
    <div role="dialog" aria-modal="true" aria-label={item.title} className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <button type="button" aria-label="Close" onClick={onClose} className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white/15 text-lg text-white hover:bg-white hover:text-brand-navy">
        <CloseOutlined />
      </button>
      {items.length > 1 && (
        <>
          <button type="button" aria-label="Previous" onClick={(e) => { e.stopPropagation(); onMove(-1); }} className={`${nav} left-3 sm:left-6`}><LeftOutlined /></button>
          <button type="button" aria-label="Next" onClick={(e) => { e.stopPropagation(); onMove(1); }} className={`${nav} right-3 sm:right-6`}><RightOutlined /></button>
        </>
      )}
      <figure className="m-0 flex max-h-full max-w-[1100px] flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img src={item.image} alt={item.title} className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain" />
        <figcaption className="mt-4 flex flex-col items-center gap-3 text-center text-white sm:flex-row sm:gap-5">
          <span className="text-base font-semibold">{item.title}</span>
          <button type="button" onClick={onQuote} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border-0 bg-brand-red px-5 text-sm font-semibold text-white hover:bg-brand-red-dark">
            Get this design <ArrowRightOutlined />
          </button>
        </figcaption>
      </figure>
    </div>
  );
};

/*
  Shared room page (living room, bedroom, kitchen, ...). All text comes from a siteData config:
  { banner, gallery, elements, sizes, steps, faqs, faqTitle, cta, seo, service, breadcrumb, api, category, altSuffix }
  Designs = admin items from `api` (e.g. /api/bedroom) + items with `category` from /api/designs (Google Sheet).
*/
const RoomPage = ({ page, onOpenForm }) => {
  const { banner, gallery, elements, sizes, steps, faqs, faqTitle, cta, seo, service, breadcrumb, api, category, altSuffix } = page;
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [shown, setShown] = useState(PAGE);
  const [viewer, setViewer] = useState(-1);
  const [openFaq, setOpenFaq] = useState(0);

  const openForm = () => typeof onOpenForm === 'function' && onOpenForm();

  // Admin items + Google Sheet items for this room, without duplicates
  useEffect(() => {
    Promise.allSettled([
      axios.get(`${API_BASE_URL}${api}`),
      axios.get(`${API_BASE_URL}/api/designs`, { params: { category } }),
    ])
      .then((results) => {
        const seen = new Set();
        const merged = results
          .filter((r) => r.status === 'fulfilled' && Array.isArray(r.value.data))
          .flatMap((r) => r.value.data)
          .filter((d) => d && d.image && !seen.has(d._id) && seen.add(d._id))
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setDesigns(merged);
      })
      .finally(() => setLoading(false));
  }, [api, category]);

  // Style chips come from the designs themselves (modern, luxury, ...)
  const styles = useMemo(
    () => [...new Set(designs.map((d) => (d.style || '').toLowerCase()).filter(Boolean))],
    [designs],
  );
  const filtered = filter === 'all' ? designs : designs.filter((d) => (d.style || '').toLowerCase() === filter);
  const visible = filtered.slice(0, shown);

  // SEO: meta, Service + Breadcrumb + FAQ structured data
  const schema = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service,
      serviceType: service,
      provider: { '@type': 'HomeAndConstructionBusiness', name: 'Urbane Living', url: `${siteUrl}/` },
      areaServed: ['Delhi', 'Noida', 'Greater Noida', 'Ghaziabad', 'Gurgaon', 'Faridabad'],
      url: `${siteUrl}${seo.path}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: breadcrumb, item: `${siteUrl}${seo.path}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ], [service, breadcrumb, seo.path, faqs]);
  useSeo({ ...seo, schema });

  const chip = (active) =>
    `shrink-0 cursor-pointer rounded-full border border-solid px-4 py-2 text-sm font-medium capitalize transition ${
      active ? 'border-brand-navy bg-brand-navy text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-brand-navy hover:text-brand-navy'
    }`;

  return (
    <div className="bg-white">
      {/* 1. Hero */}
      <PageBanner {...banner} primary={{ label: 'Get Free 3D Design', onClick: openForm }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1200px] px-4 pt-6 text-sm sm:px-6">
        <ol className="m-0 flex list-none items-center gap-2 p-0 text-gray-500">
          <li><Link to="/" className="text-gray-500 no-underline hover:text-brand-red">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-brand-navy">{breadcrumb}</li>
        </ol>
      </nav>

      {/* 2. Design gallery (from the database) */}
      <section aria-labelledby="living-gallery" className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[640px]">
              <h2 id="living-gallery" className={sectionTitle}>{gallery.title}</h2>
              <p className={sectionSub}>{gallery.subtitle}</p>
            </div>
            {styles.length > 1 && (
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter by style">
                {['all', ...styles].map((s) => (
                  <button key={s} type="button" aria-pressed={filter === s} onClick={() => { setFilter(s); setShown(PAGE); }} className={chip(filter === s)}>
                    {s === 'all' ? 'All styles' : s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-brand-soft" />)}
            </div>
          ) : visible.length === 0 ? (
            <div className="rounded-2xl bg-brand-soft px-6 py-12 text-center">
              <p className="m-0 text-gray-600">{gallery.empty}</p>
              <button type="button" onClick={openForm} className="mt-5 inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border-0 bg-brand-red px-6 text-sm font-semibold text-white">
                Get Free 3D Design <ArrowRightOutlined />
              </button>
            </div>
          ) : (
            <>
              <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((d, i) => (
                  <li key={d._id}>
                    <article className="group relative overflow-hidden rounded-2xl bg-brand-navy shadow-card">
                      <button type="button" onClick={() => setViewer(i)} aria-label={`View ${d.title} larger`} className="block w-full cursor-zoom-in border-0 bg-transparent p-0">
                        <img
                          src={d.image}
                          alt={`${d.title} - ${altSuffix} by Urbane Living`}
                          loading="lazy"
                          className="block aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </button>
                      <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-navy opacity-0 transition group-hover:opacity-100">
                        <ExpandOutlined />
                      </span>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pt-14">
                        <div className="min-w-0">
                          <h3 className="m-0 truncate text-base font-semibold text-white">{d.title}</h3>
                          {d.style && <span className="text-xs capitalize text-white/70">{d.style}</span>}
                        </div>
                        <button type="button" onClick={openForm} className="pointer-events-auto shrink-0 cursor-pointer rounded-full border-0 bg-brand-red px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-red-dark">
                          Get Quote
                        </button>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
              {filtered.length > shown && (
                <div className="mt-8 text-center">
                  <button type="button" onClick={() => setShown((n) => n + PAGE)} className="h-11 cursor-pointer rounded-full border border-solid border-brand-navy/20 bg-white px-7 text-sm font-semibold text-brand-navy transition hover:border-brand-red hover:text-brand-red">
                    Load more designs ({filtered.length - shown} more)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 3. What we design */}
      <section aria-labelledby="living-elements" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto mb-8 max-w-[640px] text-center lg:mb-10">
            <h2 id="living-elements" className={sectionTitle}>{elements.title}</h2>
            <p className={sectionSub}>{elements.subtitle}</p>
          </div>
          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {elements.items.map((e) => {
              const body = (
                <>
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-xl text-brand-red transition group-hover:bg-brand-red group-hover:text-white">
                    {elementIcons[e.icon]}
                  </span>
                  <h3 className="m-0 text-lg font-semibold text-brand-navy">{e.title}</h3>
                  <p className="m-0 mt-1.5 text-sm leading-relaxed text-gray-500">{e.text}</p>
                  {e.to && <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red">Explore <ArrowRightOutlined /></span>}
                </>
              );
              const box = 'group block h-full rounded-2xl border border-solid border-white bg-white p-6 text-left no-underline transition hover:-translate-y-1 hover:shadow-card-hover';
              return (
                <li key={e.title}>
                  {e.to ? <Link to={e.to} className={box}>{body}</Link> : <div className={box}>{body}</div>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 4. Ideas by size / layout */}
      <section aria-labelledby="living-sizes" className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="living-sizes" className={`${sectionTitle} mb-8 text-center lg:mb-10`}>{sizes.title}</h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
            {sizes.items.map((s, i) => (
              <li key={s.title} className={`rounded-2xl p-6 sm:p-7 ${i === 1 ? 'bg-brand-navy text-white' : 'border border-solid border-gray-100 bg-white'}`}>
                <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${i === 1 ? 'bg-brand-gold text-brand-ink' : 'bg-brand-red/10 text-brand-red'}`}>{s.tag}</span>
                <h3 className={`m-0 mt-4 text-lg font-semibold ${i === 1 ? 'text-white' : 'text-brand-navy'}`}>{s.title}</h3>
                <ul className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
                  {s.points.map((p) => (
                    <li key={p} className={`flex items-start gap-2 text-sm leading-relaxed ${i === 1 ? 'text-white/80' : 'text-gray-600'}`}>
                      <CheckCircleFilled className="mt-1 text-emerald-500" /> {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Process */}
      <section aria-labelledby="living-steps" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="living-steps" className={`${sectionTitle} mb-8 text-center lg:mb-10`}>{steps.title}</h2>
          <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.items.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl bg-white p-6 shadow-card">
                <span className="text-4xl font-bold text-brand-red/15">0{i + 1}</span>
                <h3 className="m-0 mt-1 text-lg font-semibold text-brand-navy">{s.title}</h3>
                <p className="m-0 mt-1.5 text-sm leading-relaxed text-gray-500">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. FAQ */}
      <section aria-labelledby="living-faq" className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[860px]">
          <h2 id="living-faq" className={`${sectionTitle} mb-8 text-center`}>{faqTitle}</h2>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <li key={f.q} className={`overflow-hidden rounded-2xl border border-solid bg-white transition ${isOpen ? 'border-brand-blue/30 shadow-card' : 'border-gray-100'}`}>
                  <h3 className="m-0">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`living-faq-${i}`}
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-5 py-4 text-left text-[15px] font-semibold text-brand-navy sm:px-6 sm:py-5 sm:text-base"
                    >
                      <span>{f.q}</span>
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm transition duration-300 ${isOpen ? 'rotate-45 bg-brand-red text-white' : 'bg-brand-soft text-brand-red'}`}>
                        <PlusOutlined />
                      </span>
                    </button>
                  </h3>
                  <div id={`living-faq-${i}`} role="region" className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="m-0 px-5 pb-5 text-[15px] leading-relaxed text-gray-600 sm:px-6">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 rounded-3xl bg-brand-navy px-6 py-10 text-center text-white sm:px-10 lg:flex-row lg:justify-between lg:py-12 lg:text-left">
          <div>
            <h2 className="m-0 text-[24px] font-semibold sm:text-[30px]">{cta.title}</h2>
            <p className="m-0 mt-2 text-[15px] text-white/70">{cta.text}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button type="button" onClick={openForm} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-7 text-sm font-semibold text-white shadow-cta transition hover:bg-brand-red-dark">
              {cta.button} <ArrowRightOutlined />
            </button>
            <a
              href={`${contact.whatsappHref}?text=${encodeURIComponent(banner.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 text-sm font-semibold text-white no-underline transition hover:brightness-95"
            >
              <WhatsAppOutlined /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {viewer >= 0 && visible[viewer] && (
        <Lightbox
          items={visible}
          index={viewer}
          onClose={() => setViewer(-1)}
          onMove={(dir) => setViewer((v) => (v + dir + visible.length) % visible.length)}
          onQuote={() => { setViewer(-1); openForm(); }}
        />
      )}
    </div>
  );
};

export default RoomPage;