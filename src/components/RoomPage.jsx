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
  EnvironmentOutlined,
} from '@ant-design/icons';
import Hero from './Hero';
import SectionHeading from './SectionHeading';
import useSeo from '../hooks/useSeo';
import { API_BASE_URL, siteUrl, contact } from '../data/siteData';
import { localCities, localServices } from '../data/localSeo';

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

// Which city pages to link to from each room page (/modular-kitchen/noida, /wardrobe/delhi, ...)
const cityServiceFor = { kitchen: 'modular-kitchen', wardrobe: 'wardrobe' };

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
  Shared room page (living room, bedroom, ...). All text comes from a siteData config:
  { banner, gallery, elements, sizes, steps, faqs, faqTitle, cta, seo, service, breadcrumb, api, category, altSuffix }
  Designs = admin items from `api` (e.g. /api/bedroom) + items with `category` from /api/designs (Google Sheet).
  Hero = the same banner + lead form as the home page (optional banner.formTitle / formSubtitle / formBadge).
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
      areaServed: localCities.map((c) => ({ '@type': 'City', name: c.name })),
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

  // City pages for this service (local SEO links)
  const cityService = localServices.find((x) => x.slug === (page.cityService || cityServiceFor[category] || 'interior-designers'));

  const chip = (active) =>
    `shrink-0 cursor-pointer rounded-full border border-solid px-4 py-2 text-sm font-medium capitalize transition ${
      active ? 'border-brand-navy bg-brand-navy text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-brand-navy hover:text-brand-navy'
    }`;

  return (
    <div className="bg-white">
      {/* 1. Hero: same banner + lead form as the home page */}
      <Hero
        title={banner.title}
        highlight={banner.highlight}
        subTitle={banner.subtitle}
        media={banner.image}
        mediaAlt={banner.imageAlt}
        formBadge={banner.formBadge || 'Free 3D Design'}
        formTitle={banner.formTitle || 'Get Your Free Design & Quote'}
        formSubtitle={banner.formSubtitle || 'Share your details, our designer will call you back.'}
        formName={`${service} hero form`}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1200px] px-4 pt-6 text-sm sm:px-6">
        <ol className="m-0 flex list-none items-center gap-2 p-0 text-gray-500">
          <li><Link to="/" className="text-gray-500 no-underline hover:text-brand-red">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-brand-navy">{breadcrumb}</li>
        </ol>
      </nav>

      {/* 2. Design gallery (from the database) - hidden until designs are added */}
      {(loading || designs.length > 0) && (
        <section aria-labelledby="living-gallery" className="px-4 py-12 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                id="living-gallery"
                eyebrow="DESIGN GALLERY"
                title={gallery.title}
                subtitle={gallery.subtitle}
                align="left"
                className="!mx-0 !mb-4"
              />
              {styles.length > 1 && (
                <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:mb-10 [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter by style">
                  {['all', ...styles].map((s) => (
                    <button key={s} type="button" aria-pressed={filter === s} onClick={() => { setFilter(s); setShown(PAGE); }} className={chip(filter === s)}>
                      {s === 'all' ? 'All styles' : s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3" aria-busy="true">
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
                <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-5 lg:grid-cols-3">
                  {visible.map((d, i) => (
                    <li key={d._id}>
                      <article className="group relative overflow-hidden rounded-2xl bg-brand-navy shadow-card">
                        <button type="button" onClick={() => setViewer(i)} aria-label={`View ${d.title} larger`} className="block w-full cursor-zoom-in border-0 bg-transparent p-0">
                          <img
                            src={d.image}
                            alt={`${d.title} - ${altSuffix} by Urbane Living`}
                            loading="lazy"
                            decoding="async"
                            className="block aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        </button>
                        <span className="pointer-events-none absolute right-3 top-3 hidden h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-navy opacity-0 transition group-hover:opacity-100 sm:flex">
                          <ExpandOutlined />
                        </span>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-12 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:p-4 sm:pt-14">
                          <div className="min-w-0">
                            <h3 className="m-0 truncate text-[13.5px] font-semibold text-white sm:text-base">{d.title}</h3>
                            {d.style && <span className="text-xs capitalize text-white/80">{d.style}</span>}
                          </div>
                          <button type="button" onClick={openForm} className="pointer-events-auto shrink-0 cursor-pointer self-start rounded-full border-0 bg-brand-red px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-red-dark sm:self-auto sm:px-4 sm:py-2">
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
      )}

      {/* 3. What we design */}
      <section aria-labelledby="living-elements" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading id="living-elements" eyebrow="WHAT WE DESIGN" title={elements.title} subtitle={elements.subtitle} />
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-3 lg:gap-6">
            {elements.items.map((e) => {
              const body = (
                <>
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 text-lg text-brand-red transition group-hover:bg-brand-red group-hover:text-white sm:mb-4 sm:h-12 sm:w-12 sm:text-xl">
                    {elementIcons[e.icon]}
                  </span>
                  <h3 className="m-0 text-[14.5px] font-semibold leading-snug text-brand-navy sm:text-lg">{e.title}</h3>
                  <p className="m-0 mt-1.5 text-[12.5px] leading-relaxed text-gray-600 sm:text-sm">{e.text}</p>
                  {e.to && <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red-dark">Explore <ArrowRightOutlined /></span>}
                </>
              );
              const box = 'group block h-full rounded-2xl border border-solid border-white bg-white p-4 text-left no-underline transition hover:-translate-y-1 hover:shadow-card-hover sm:p-6';
              return (
                <li key={e.title}>
                  {e.to ? <Link to={e.to} className={box}>{body}</Link> : <div className={box}>{body}</div>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 4. Ideas by size */}
      <section aria-labelledby="living-sizes" className="px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading id="living-sizes" eyebrow="PLAN YOUR SPACE" title={sizes.title} />
          {/* phones: swipe sideways; tablet / desktop: 3 columns */}
          <ul className="-mx-4 m-0 flex list-none snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {sizes.items.map((s, i) => (
              <li key={s.title} className={`w-[82%] shrink-0 snap-center rounded-2xl p-6 sm:p-7 md:w-auto ${i === 1 ? 'bg-brand-navy text-white' : 'border border-solid border-gray-100 bg-white shadow-card'}`}>
                <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${i === 1 ? 'bg-brand-gold text-brand-ink' : 'bg-brand-red/10 text-brand-red-dark'}`}>{s.tag}</span>
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
      <section aria-labelledby="living-steps" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading id="living-steps" eyebrow="HOW IT WORKS" title={steps.title} />
          <ol className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {steps.items.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl bg-white p-4 shadow-card sm:p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-[13px] font-bold text-white sm:h-10 sm:w-10 sm:text-sm">0{i + 1}</span>
                <h3 className="m-0 mt-3 text-[14.5px] font-semibold leading-snug text-brand-navy sm:text-lg">{s.title}</h3>
                <p className="m-0 mt-1.5 text-[12.5px] leading-relaxed text-gray-600 sm:text-sm">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. City pages (local SEO links) */}
      {cityService && (
        <section aria-labelledby="room-cities" className="px-4 py-12 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-[1000px]">
            <SectionHeading
              id="room-cities"
              eyebrow="AREAS WE SERVE"
              title={`${cityService.name} in`}
              highlight="your city"
              subtitle="Our designers and site team work across Delhi NCR. Pick your city for local details."
            />
            <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
              {localCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/${cityService.slug}/${c.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-solid border-gray-100 bg-brand-soft p-3.5 no-underline transition hover:border-brand-red/40 hover:bg-white hover:shadow-card sm:p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-red shadow-card">
                      <EnvironmentOutlined />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-tight text-brand-navy group-hover:text-brand-red-dark">
                        {c.name}
                        <span className="sr-only"> {cityService.name.toLowerCase()}</span>
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
      )}

      {/* 7. FAQ */}
      <section aria-labelledby="living-faq" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[860px]">
          <SectionHeading id="living-faq" eyebrow="FAQs" title={faqTitle} />
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

      {/* 8. Final CTA */}
      <section className="bg-brand-soft px-4 pb-16 sm:px-6">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 rounded-3xl bg-brand-navy px-6 py-10 text-center text-white sm:px-10 lg:flex-row lg:justify-between lg:py-12 lg:text-left">
          <div>
            <h2 className="m-0 text-[24px] font-semibold sm:text-[30px]">{cta.title}</h2>
            <p className="m-0 mt-2 text-[15px] text-white/75">{cta.text}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button type="button" onClick={openForm} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-7 text-sm font-semibold text-white shadow-cta transition hover:bg-brand-red-dark">
              {cta.button} <ArrowRightOutlined />
            </button>
            <a
              href={`${contact.whatsappHref}?text=${encodeURIComponent(banner.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#15803D] px-7 text-sm font-semibold text-white no-underline transition hover:bg-[#166534]"
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