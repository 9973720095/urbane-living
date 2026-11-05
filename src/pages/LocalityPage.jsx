import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  EnvironmentOutlined,
  HomeOutlined,
  PlusOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import useSeo from '../hooks/useSeo';
import NotFoundPage from './NotFoundPage';
import { brand, contact, siteUrl } from '../data/siteData';
import { localServices, localProcess, localityPage, findLocalCity, findLocality, findLocalService, slugify } from '../data/localSeo';

const btnRed =
  'inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-7 text-[15px] font-semibold text-white no-underline shadow-cta transition hover:bg-brand-red-dark';
const tag = 'mb-3 inline-block rounded-full bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-red-dark';
const h2 = 'm-0 text-[24px] font-semibold leading-tight text-brand-navy sm:text-[32px]';

const falseCeiling = findLocalService('false-ceiling');
const home = findLocalService('interior-designers');

// FAQs from data only (no made-up numbers)
const buildFaqs = (loc, city) => [
  {
    q: `Do you do home interiors in ${loc.name}, ${city.name}?`,
    a: loc.societies?.length
      ? `Yes. We work across ${loc.name}, including ${loc.societies.join(', ')}. Share your society and flat details to book a free site visit.`
      : `Yes. We design and install home interiors in ${loc.name} and across ${city.name}. Share your society and flat details to book a free site visit.`,
  },
  {
    q: `What can you design for my ${loc.name} home?`,
    a: `Modular kitchens, wardrobes, false ceilings with lighting, TV units, bedrooms, kids rooms, pooja units and foyers. Everything is planned together in one 3D design.`,
  },
  {
    q: `How much do interiors cost in ${loc.name}?`,
    a: `It depends on your home size, rooms and finishes. False ceilings start from ₹${falseCeiling.price.from}/sqft. For full interiors you get a clear, item-wise quote after the free site visit and 3D design.`,
  },
  {
    q: 'Where is your office?',
    a: `Our office is at ${contact.address}. Book a visit and our designer will come to your home in ${loc.name}.`,
  },
];

// /interior-designers/:city/:locality
export default function LocalityPage({ onOpenForm }) {
  const { city: citySlug, locality: locSlug } = useParams();
  const city = findLocalCity(citySlug);
  const loc = findLocality(city, locSlug);
  const [open, setOpen] = useState(0);

  const path = city && loc ? `/interior-designers/${city.slug}/${loc.slug}` : '/404';
  const faqs = useMemo(() => (city && loc ? buildFaqs(loc, city) : []), [city, loc]);

  const schema = useMemo(() => {
    if (!city || !loc) return [];
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: localityPage.h1(loc.name, city.name),
        serviceType: 'Interior Design',
        url: `${siteUrl}${path}`,
        areaServed: {
          '@type': 'Place',
          name: `${loc.name}, ${city.name}`,
          containedInPlace: { '@type': 'City', name: city.name },
        },
        provider: {
          '@type': 'HomeAndConstructionBusiness',
          name: brand.name,
          url: `${siteUrl}/`,
          logo: brand.logo,
          telephone: contact.phoneDisplay,
          address: { '@type': 'PostalAddress', streetAddress: contact.address, addressCountry: 'IN' },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Areas we serve', item: `${siteUrl}/interior-designers` },
          { '@type': 'ListItem', position: 3, name: city.name, item: `${siteUrl}/interior-designers/${city.slug}` },
          { '@type': 'ListItem', position: 4, name: loc.name, item: `${siteUrl}${path}` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ];
  }, [city, loc, faqs, path]);

  useSeo(
    city && loc
      ? {
          title: localityPage.title(loc.name, city.name),
          description: localityPage.description(loc.name, city.name),
          path,
          image: home.image,
          schema,
        }
      : { path: '/404', noindex: true }
  );

  if (!city || !loc) return <NotFoundPage />;

  const openForm = () => typeof onOpenForm === 'function' && onOpenForm();
  const whatsapp = `${contact.whatsappHref}?text=${encodeURIComponent(`Hi Urbane Living, I need interiors for my home in ${loc.name}, ${city.name}. Please share details.`)}`;
  const otherLocalities = city.localities.filter((l) => l !== loc.name);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy px-4 pb-12 pt-8 text-white sm:px-6 lg:pb-16 lg:pt-12">
        <img src={home.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/60" />
        <div className="relative mx-auto max-w-[1200px]">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 sm:text-sm">
            <Link to="/" className="text-white/60 no-underline hover:text-white"><HomeOutlined /> Home</Link>
            <span className="mx-2">/</span>
            <Link to="/interior-designers" className="text-white/60 no-underline hover:text-white">Areas</Link>
            <span className="mx-2">/</span>
            <Link to={`/interior-designers/${city.slug}`} className="text-white/60 no-underline hover:text-white">{city.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{loc.name}</span>
          </nav>

          <div className="mt-6 max-w-[720px]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.14em] text-white">
              <EnvironmentOutlined /> {loc.name.toUpperCase()}, {city.name.toUpperCase()}
            </span>
            <h1 className="m-0 mt-4 text-[28px] font-bold leading-tight sm:text-[42px]">{localityPage.h1(loc.name, city.name)}</h1>
            <p className="m-0 mt-4 text-[15px] leading-relaxed text-white/80 sm:text-base">{loc.about || localityPage.intro(loc.name, city.name)}</p>
            <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm text-white/85">
              {['Free site visit', '3D design before work starts', 'One team, start to finish'].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5"><CheckCircleFilled className="text-emerald-400" /> {t}</li>
              ))}
            </ul>
            <div className="mt-7 grid grid-cols-1 gap-3 sm:flex">
              <button type="button" onClick={openForm} className={btnRed}>Book Free Consultation <ArrowRightOutlined /></button>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#15803D] px-7 text-[15px] font-semibold text-white no-underline transition hover:bg-[#166534]">
                <WhatsAppOutlined /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services for this locality */}
      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-[720px] text-center">
            <span className={tag}>WHAT WE DO IN {loc.name.toUpperCase()}</span>
            <h2 className={h2}>Interiors for <span className="text-brand-red">{loc.name}</span> homes</h2>
            <p className="m-0 mt-3 text-[15px] text-gray-500">{city.intro}</p>
          </div>
          <ul className="m-0 mt-8 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-4">
            {localServices.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/${s.slug}/${city.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-solid border-gray-100 bg-white text-left no-underline shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <img src={s.image} alt={`${s.name} by Urbane Living in ${city.name}`} loading="lazy" className="block aspect-[4/3] w-full bg-brand-soft object-cover" />
                  <span className="flex flex-1 flex-col p-4">
                    <span className="text-[14px] font-semibold text-brand-navy sm:text-base">{s.name}</span>
                    <span className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">{s.includes.slice(0, 3).map((i) => i.title).join(' · ')}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-semibold text-brand-red sm:text-sm">
                      {s.price?.label || 'Free 3D design'} <ArrowRightOutlined className="transition group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Societies (only when added in data) */}
      {loc.societies?.length > 0 && (
        <section className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-[1200px] text-center">
            <span className={tag}>SOCIETIES WE HAVE WORKED IN</span>
            <h2 className={h2}>Trusted in <span className="text-brand-red">{loc.name}</span></h2>
            <ul className="m-0 mx-auto mt-6 flex max-w-[900px] list-none flex-wrap justify-center gap-2 p-0">
              {loc.societies.map((s) => (
                <li key={s} className="rounded-full border border-solid border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-navy">{s}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Real projects (only when added in data) */}
      {loc.projects?.length > 0 && (
        <section className="px-4 py-12 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-[1200px]">
            <h2 className={`${h2} text-center`}>Recent work in <span className="text-brand-red">{loc.name}</span></h2>
            <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {loc.projects.map((p) => (
                <li key={p.title} className="overflow-hidden rounded-2xl border border-solid border-gray-100 bg-white shadow-card">
                  {p.image && <img src={p.image} alt={`${p.title} in ${loc.name}, ${city.name} by Urbane Living`} loading="lazy" className="block aspect-[4/3] w-full object-cover" />}
                  <div className="p-4">
                    <span className="block font-semibold text-brand-navy">{p.title}</span>
                    {p.text && <span className="mt-1 block text-sm text-gray-500">{p.text}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <span className={tag}>HOW IT WORKS</span>
            <h2 className={h2}>From first call to <span className="text-brand-red">handover</span></h2>
          </div>
          <ol className="m-0 mt-8 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-4">
            {localProcess.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white p-4 shadow-card sm:p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">{i + 1}</span>
                <span className="mt-3 block text-[14px] font-semibold text-brand-navy sm:text-base">{s.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-gray-500 sm:text-sm">{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[860px]">
          <div className="text-center">
            <span className={tag}>FAQS</span>
            <h2 className={h2}>Interiors in {loc.name}: <span className="text-brand-red">your questions</span></h2>
          </div>
          <ul className="m-0 mt-8 flex list-none flex-col gap-3 p-0">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="rounded-2xl bg-white shadow-card">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border-0 bg-transparent px-5 py-4 text-left text-[15px] font-semibold text-brand-navy"
                  >
                    {f.q}
                    <PlusOutlined className={`shrink-0 text-brand-red transition ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                  {isOpen && <p className="m-0 px-5 pb-5 text-sm leading-relaxed text-gray-600">{f.a}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Nearby localities (internal links) */}
      <section className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-16">
        <nav aria-label={`Other areas in ${city.name}`} className="mx-auto max-w-[1200px] text-center">
          <h2 className="m-0 text-lg font-semibold text-brand-navy sm:text-xl">Interior designers in other areas of {city.name}</h2>
          <ul className="m-0 mt-5 flex list-none flex-wrap justify-center gap-2 p-0">
            {otherLocalities.map((l) => (
              <li key={l}>
                <Link to={`/interior-designers/${city.slug}/${slugify(l)}`} className="inline-flex items-center gap-1.5 rounded-full border border-solid border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-navy no-underline transition hover:border-brand-red hover:text-brand-red">
                  <EnvironmentOutlined className="text-brand-red" /> {l}
                </Link>
              </li>
            ))}
          </ul>
          <Link to={`/interior-designers/${city.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red no-underline hover:underline">
            All of {city.name} <ArrowRightOutlined />
          </Link>
        </nav>
      </section>

      {/* CTA */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 rounded-[28px] bg-gradient-to-r from-brand-navy to-brand-blue px-6 py-10 text-center text-white sm:px-12 lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="m-0 text-[24px] font-bold sm:text-[30px]">Planning interiors in {loc.name}?</p>
            <p className="m-0 mt-2 text-white/75">Get a free consultation and a 3D design for your home.</p>
          </div>
          <button type="button" onClick={openForm} className={`${btnRed} shrink-0`}>Book Free Consultation <ArrowRightOutlined /></button>
        </div>
      </section>
    </div>
  );
}