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
import { localServices, localCities, localProcess, findLocalService, findLocalCity } from '../data/localSeo';

const btnRed =
  'inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-7 text-[15px] font-semibold text-white no-underline shadow-cta transition hover:bg-brand-red-dark';
const tag = 'mb-3 inline-block rounded-full bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-red-dark';
const h2 = 'm-0 text-[24px] font-semibold leading-tight text-brand-navy sm:text-[32px]';

// FAQs built from the service + city data (no made-up numbers)
const buildFaqs = (service, city) => {
  const areas = city.localities.slice(0, 5).join(', ');
  return [
    {
      q: `Do you provide ${service.name.toLowerCase()} services in ${areas}?`,
      a: `Yes. We work across ${city.name}, including ${areas} and nearby areas. Share your society or sector and we will confirm the visit.`,
    },
    {
      q: `How much does ${service.name.toLowerCase()} cost in ${city.name}?`,
      a: service.price
        ? `False ceiling rates usually start from ₹${service.price.from}/sqft for basic designs and go to ₹${service.price.to}+/sqft for premium and luxury work, depending on material, design and lighting. You get an exact, item-wise quote after the site visit.`
        : `The cost depends on your home size, materials and finishes. After a free site visit and 3D design, you get a clear, item-wise quote with no hidden charges.`,
    },
    {
      q: 'Is the consultation and site visit free?',
      a: 'Yes. The design consultation and site visit are free. You decide only after you see the design and quote.',
    },
    {
      q: 'Where is Urbane Living located?',
      a: `Our office is at ${contact.address}. Our team covers ${localCities.map((c) => c.name).join(', ')}.`,
    },
  ];
};

export default function LocalServicePage({ serviceSlug, onOpenForm }) {
  const { city: citySlug } = useParams();
  const service = findLocalService(serviceSlug);
  const city = findLocalCity(citySlug);
  const [open, setOpen] = useState(0);

  const faqs = useMemo(() => (service && city ? buildFaqs(service, city) : []), [service, city]);
  const path = service && city ? `/${service.slug}/${city.slug}` : '/404';

  const schema = useMemo(() => {
    if (!service || !city) return [];
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.h1(city.name),
        serviceType: service.serviceType,
        url: `${siteUrl}${path}`,
        areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: city.region } },
        provider: {
          '@type': 'HomeAndConstructionBusiness',
          name: brand.name,
          url: `${siteUrl}/`,
          logo: brand.logo,
          telephone: contact.phoneDisplay,
          address: { '@type': 'PostalAddress', streetAddress: contact.address, addressCountry: 'IN' },
        },
        ...(service.price && {
          offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: String(service.price.from), highPrice: String(service.price.to), unitText: `per ${service.price.unit}` },
        }),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Areas we serve', item: `${siteUrl}/interior-designers` },
          { '@type': 'ListItem', position: 3, name: service.h1(city.name), item: `${siteUrl}${path}` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ];
  }, [service, city, faqs, path]);

  useSeo(
    service && city
      ? { title: service.title(city.name), description: service.description(city.name), path, image: service.image, schema }
      : { path: '/404', noindex: true }
  );

  if (!service || !city) return <NotFoundPage />;

  const openForm = () => typeof onOpenForm === 'function' && onOpenForm();
  const whatsapp = `${contact.whatsappHref}?text=${encodeURIComponent(`Hi Urbane Living, I need ${service.name.toLowerCase()} for my home in ${city.name}. Please share details.`)}`;
  const otherServices = localServices.filter((s) => s.slug !== service.slug);
  const nearbyCities = city.nearby.map(findLocalCity).filter(Boolean);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy px-4 pb-12 pt-8 text-white sm:px-6 lg:pb-16 lg:pt-12">
        <img src={service.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/60" />
        <div className="relative mx-auto max-w-[1200px]">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 sm:text-sm">
            <Link to="/" className="text-white/60 no-underline hover:text-white"><HomeOutlined /> Home</Link>
            <span className="mx-2">/</span>
            <Link to="/interior-designers" className="text-white/60 no-underline hover:text-white">Areas we serve</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.name}</span>
          </nav>

          <div className="mt-6 max-w-[720px]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.14em] text-white">
              <EnvironmentOutlined /> {city.name.toUpperCase()}, {city.region.toUpperCase()}
            </span>
            <h1 className="m-0 mt-4 text-[28px] font-bold leading-tight sm:text-[42px]">{service.h1(city.name)}</h1>
            <p className="m-0 mt-4 text-[15px] leading-relaxed text-white/80 sm:text-base">{service.intro(city.name)}</p>
            <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm text-white/85">
              {[service.price?.label, 'Free site visit', '3D design before work starts', 'One team, start to finish'].filter(Boolean).map((t) => (
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

      {/* City intro + what we do */}
      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <span className={tag}>WHY {city.name.toUpperCase()} HOMES CHOOSE US</span>
            <h2 className={h2}>{service.name} in <span className="text-brand-red">{city.name}</span></h2>
            <p className="m-0 mt-4 text-[15px] leading-relaxed text-gray-600">{city.intro}</p>
            <Link to={service.mainLink.to} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red no-underline hover:underline">
              {service.mainLink.label} <ArrowRightOutlined />
            </Link>
          </div>
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4">
            {service.includes.map((i) => (
              <li key={i.title} className="rounded-2xl border border-solid border-gray-100 bg-brand-soft p-4 sm:p-5">
                <span className="block text-[14px] font-semibold text-brand-navy sm:text-base">{i.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-gray-500 sm:text-sm">{i.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Areas covered */}
      <section className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[1200px] text-center">
          <span className={tag}>AREAS WE COVER</span>
          <h2 className={h2}>{service.name} across {city.name}</h2>
          <ul className="m-0 mx-auto mt-6 flex max-w-[900px] list-none flex-wrap justify-center gap-2 p-0">
            {city.localities.map((l) => (
              <li key={l} className="inline-flex items-center gap-1.5 rounded-full border border-solid border-gray-200 bg-white px-3.5 py-1.5 text-sm text-brand-navy">
                <EnvironmentOutlined className="text-brand-red" /> {l}
              </li>
            ))}
          </ul>
          <p className="m-0 mt-4 text-sm text-gray-500">Not in the list? We likely cover your society too. Just ask.</p>
        </div>
      </section>

      {/* Real projects (only when added in data) */}
      {city.projects.length > 0 && (
        <section className="px-4 py-12 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-[1200px]">
            <h2 className={`${h2} text-center`}>Recent work in <span className="text-brand-red">{city.name}</span></h2>
            <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {city.projects.map((p) => (
                <li key={p.title} className="overflow-hidden rounded-2xl border border-solid border-gray-100 bg-white shadow-card">
                  {p.image && <img src={p.image} alt={`${p.title} in ${city.name} by Urbane Living`} loading="lazy" className="block aspect-[4/3] w-full object-cover" />}
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
      <section className="px-4 py-12 sm:px-6 lg:py-16">
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
      <section className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[860px]">
          <div className="text-center">
            <span className={tag}>FAQS</span>
            <h2 className={h2}>{service.name} in {city.name}: <span className="text-brand-red">your questions</span></h2>
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

      {/* Internal links: other services here + same service nearby */}
      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-2">
          <nav aria-label={`More services in ${city.name}`}>
            <h2 className="m-0 text-lg font-semibold text-brand-navy">More services in {city.name}</h2>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link to={`/${s.slug}/${city.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-4 py-2 text-sm font-medium text-brand-navy no-underline transition hover:bg-brand-red hover:text-white">
                    {s.name} in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={`${service.name} in nearby cities`}>
            <h2 className="m-0 text-lg font-semibold text-brand-navy">{service.name} in nearby cities</h2>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
              {nearbyCities.map((c) => (
                <li key={c.slug}>
                  <Link to={`/${service.slug}/${c.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-4 py-2 text-sm font-medium text-brand-navy no-underline transition hover:bg-brand-red hover:text-white">
                    {service.name} in {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-14 sm:px-6">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 rounded-[28px] bg-gradient-to-r from-brand-navy to-brand-blue px-6 py-10 text-center text-white sm:px-12 lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="m-0 text-[24px] font-bold sm:text-[30px]">Planning {service.name.toLowerCase()} in {city.name}?</p>
            <p className="m-0 mt-2 text-white/75">Get a free consultation and a 3D design for your home.</p>
          </div>
          <button type="button" onClick={openForm} className={`${btnRed} shrink-0`}>Book Free Consultation <ArrowRightOutlined /></button>
        </div>
      </section>
    </div>
  );
}