import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  BulbOutlined,
  TagOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  PhoneFilled,
  MailOutlined,
  EnvironmentOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import PageBanner from '../components/PageBanner';
import SolutionsGrid from '../components/SolutionsGrid';
import ClientReviews from '../components/ClientReviews';
import useSeo from '../hooks/useSeo';
import { aboutPage, brand, contact, socials, siteUrl } from '../data/siteData';

const { banner, story, values, steps, visit, seo } = aboutPage;

const valueIcons = {
  design: <BulbOutlined />,
  price: <TagOutlined />,
  time: <ClockCircleOutlined />,
  quality: <SafetyCertificateOutlined />,
};

const sectionTitle = 'm-0 text-[26px] font-semibold leading-tight text-brand-navy sm:text-[34px]';

export default function AboutUsPage({ onOpenForm }) {
  const openForm = () => typeof onOpenForm === 'function' && onOpenForm();

  // SEO: About page + company details (name, logo, address, phone, social profiles)
  const schema = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: seo.title,
      url: `${siteUrl}${seo.path}`,
      mainEntity: {
        '@type': 'HomeAndConstructionBusiness',
        name: brand.name,
        slogan: brand.tagline,
        url: `${siteUrl}/`,
        logo: brand.logo,
        telephone: contact.phoneHref.replace('tel:', ''),
        email: contact.email,
        address: { '@type': 'PostalAddress', streetAddress: contact.address, addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
        areaServed: ['Delhi', 'Noida', 'Greater Noida', 'Ghaziabad', 'Gurgaon', 'Faridabad'],
        sameAs: socials.map((s) => s.href),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'About Us', item: `${siteUrl}${seo.path}` },
      ],
    },
  ], []);
  useSeo({ ...seo, schema });

  return (
    <div className="bg-white">
      {/* 1. Hero */}
      <PageBanner {...banner} primary={{ label: 'Book Free Consultation', onClick: openForm }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1200px] px-4 pt-6 text-sm sm:px-6">
        <ol className="m-0 flex list-none items-center gap-2 p-0 text-gray-500">
          <li><Link to="/" className="text-gray-500 no-underline hover:text-brand-red">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-brand-navy">About Us</li>
        </ol>
      </nav>

      {/* 2. Our story */}
      <section aria-labelledby="about-story" className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative">
            <img
              src={story.image}
              alt={story.imageAlt}
              loading="lazy"
              className="block aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
            />
            <div className="absolute -bottom-5 right-5 rounded-2xl bg-brand-red px-5 py-4 text-white shadow-cta sm:right-8">
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/80">{brand.name}</span>
              <span className="block text-sm font-semibold">{brand.tagline}</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">{story.tag}</span>
            <h2 id="about-story" className={`${sectionTitle} mt-2`}>{story.title}</h2>
            {story.paragraphs.map((p) => (
              <p key={p} className="m-0 mt-4 text-[15px] leading-relaxed text-gray-600 sm:text-base">{p}</p>
            ))}
            <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
              {story.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[15px] text-brand-navy">
                  <CheckCircleFilled className="mt-1 text-emerald-500" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/false-ceiling" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red px-7 text-sm font-semibold text-white no-underline shadow-cta transition hover:bg-brand-red-dark">
                Explore Our Work <ArrowRightOutlined />
              </Link>
              <button type="button" onClick={openForm} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-solid border-brand-navy/20 bg-white px-7 text-sm font-semibold text-brand-navy transition hover:border-brand-red hover:text-brand-red">
                Talk to a Designer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Values */}
      <section aria-labelledby="about-values" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="about-values" className={`${sectionTitle} mb-8 text-center lg:mb-10`}>{values.title}</h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {values.items.map((v) => (
              <li key={v.title} className="group rounded-2xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-xl text-brand-red transition group-hover:bg-brand-red group-hover:text-white">
                  {valueIcons[v.icon]}
                </span>
                <h3 className="m-0 text-lg font-semibold text-brand-navy">{v.title}</h3>
                <p className="m-0 mt-1.5 text-sm leading-relaxed text-gray-500">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. What we do (same grid as the home page) */}
      <SolutionsGrid onOpenForm={openForm} />

      {/* 5. How we work */}
      <section aria-labelledby="about-steps" className="bg-brand-navy px-4 py-12 text-white sm:px-6 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="about-steps" className="m-0 mb-8 text-center text-[26px] font-semibold sm:text-[34px] lg:mb-10">{steps.title}</h2>
          <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.items.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-solid border-white/10 bg-white/[0.05] p-6">
                <span className="text-4xl font-bold text-brand-gold/40">0{i + 1}</span>
                <h3 className="m-0 mt-1 text-lg font-semibold">{s.title}</h3>
                <p className="m-0 mt-1.5 text-sm leading-relaxed text-white/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Real client reviews (Google Sheet "Reviews" tab) */}
      <ClientReviews />

      {/* 7. Visit / contact */}
      <section aria-labelledby="about-visit" className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 rounded-3xl bg-brand-soft p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="about-visit" className={sectionTitle}>{visit.title}</h2>
            <p className="m-0 mt-3 text-[15px] text-gray-500 sm:text-base">{visit.text}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={openForm} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-7 text-sm font-semibold text-white shadow-cta transition hover:bg-brand-red-dark">
                Book Free Consultation <ArrowRightOutlined />
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
          <address className="flex flex-col gap-3 not-italic">
            <a href={contact.phoneHref} className="flex items-center gap-4 rounded-2xl bg-white p-4 text-brand-navy no-underline shadow-card transition hover:shadow-card-hover">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red"><PhoneFilled /></span>
              <span><span className="block text-xs text-gray-500">Call us</span><span className="font-semibold">{contact.phoneDisplay}</span></span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-4 rounded-2xl bg-white p-4 text-brand-navy no-underline shadow-card transition hover:shadow-card-hover">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red"><MailOutlined /></span>
              <span className="min-w-0"><span className="block text-xs text-gray-500">Email</span><span className="block truncate font-semibold">{contact.email}</span></span>
            </a>
            <a href={visit.mapHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl bg-white p-4 text-brand-navy no-underline shadow-card transition hover:shadow-card-hover">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red"><EnvironmentOutlined /></span>
              <span><span className="block text-xs text-gray-500">Office (open in Google Maps)</span><span className="font-semibold">{contact.address}</span></span>
            </a>
          </address>
        </div>
      </section>
    </div>
  );
}