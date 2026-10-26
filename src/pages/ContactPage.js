import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  PhoneFilled,
  WhatsAppOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CheckCircleFilled,
  ArrowRightOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import PageBanner from '../components/PageBanner';
import useSeo from '../hooks/useSeo';
import { API_BASE_URL, contactPage, contact, brand, inquiryOptions, socials, siteUrl } from '../data/siteData';

const { banner, form, cards, areas, map, seo } = contactPage;

const EMPTY = { name: '', phone: '', email: '', city: '', locality: '', propertyType: '', service: '', message: '' };

const field =
  'h-12 w-full rounded-xl border border-solid border-gray-200 bg-white px-4 text-[15px] text-brand-navy outline-none transition placeholder:text-gray-400 focus:border-brand-blue focus:ring-[3px] focus:ring-brand-blue/15';
const label = 'mb-1.5 block text-sm font-medium text-brand-navy';

export default function ContactPage() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  // Phone keeps digits only, so "98765 43210" or a pasted "+91 98765 43210" both work
  const cleanPhone = (text) => {
    let digits = text.replace(/\D/g, '');
    if (digits.length > 10 && digits.startsWith('91')) digits = digits.slice(2);
    return digits.slice(0, 10);
  };

  const set = (key) => (e) => {
    const value = key === 'phone' ? cleanPhone(e.target.value) : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (values.name.trim().length < 2) next.name = 'Please enter your name';
    if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\D/g, ''))) next.phone = 'Please enter a valid 10-digit mobile number';
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Saves the enquiry as a lead (same API as the other forms on the site)
  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      await axios.post(`${API_BASE_URL}/api/save-lead`, {
        name: values.name.trim(),
        phone: `+91 ${values.phone.replace(/\D/g, '')}`,
        email: values.email.trim(),
        city: values.city,
        locality: values.locality.trim(),
        propertyType: values.propertyType,
        message: [values.service && `Service: ${values.service}`, values.message.trim()].filter(Boolean).join(' | '),
        page: window.location.pathname,
      });
      setStatus('done');
      setValues(EMPTY);
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
    }
  };

  // SEO: Contact page + business contact details
  const schema = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: seo.title,
      url: `${siteUrl}${seo.path}`,
      mainEntity: {
        '@type': 'HomeAndConstructionBusiness',
        name: brand.name,
        url: `${siteUrl}/`,
        logo: brand.logo,
        telephone: contact.phoneHref.replace('tel:', ''),
        email: contact.email,
        address: { '@type': 'PostalAddress', streetAddress: contact.address, addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
        areaServed: areas.items,
        sameAs: socials.map((s) => s.href),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}${seo.path}` },
      ],
    },
  ], []);
  useSeo({ ...seo, schema });

  const whatsappHref = `${contact.whatsappHref}?text=${encodeURIComponent(banner.whatsappMessage)}`;
  const cardClass = 'group flex items-center gap-4 rounded-2xl border border-solid border-gray-100 bg-white p-5 text-brand-navy no-underline shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover';
  const iconClass = 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl';

  return (
    <div className="bg-white">
      {/* 1. Hero */}
      <PageBanner {...banner} showWhatsApp />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1200px] px-4 pt-6 text-sm sm:px-6">
        <ol className="m-0 flex list-none items-center gap-2 p-0 text-gray-500">
          <li><Link to="/" className="text-gray-500 no-underline hover:text-brand-red">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-brand-navy">Contact</li>
        </ol>
      </nav>

      {/* 2. Contact cards + enquiry form */}
      <section className="px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          {/* Quick contact */}
          <address className="flex flex-col gap-4 not-italic">
            <a href={contact.phoneHref} className={cardClass}>
              <span className={`${iconClass} bg-brand-red/10 text-brand-red transition group-hover:bg-brand-red group-hover:text-white`}><PhoneFilled /></span>
              <span><span className="block text-sm text-gray-500">{cards.callTitle}</span><span className="text-lg font-semibold">{contact.phoneDisplay}</span></span>
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={cardClass}>
              <span className={`${iconClass} bg-[#25D366]/10 text-[#25D366] transition group-hover:bg-[#25D366] group-hover:text-white`}><WhatsAppOutlined /></span>
              <span><span className="block text-sm text-gray-500">{cards.whatsappTitle}</span><span className="text-lg font-semibold">{cards.whatsappText}</span></span>
            </a>
            <a href={`mailto:${contact.email}`} className={cardClass}>
              <span className={`${iconClass} bg-brand-blue/10 text-brand-blue transition group-hover:bg-brand-blue group-hover:text-white`}><MailOutlined /></span>
              <span className="min-w-0"><span className="block text-sm text-gray-500">{cards.emailTitle}</span><span className="block truncate text-lg font-semibold">{contact.email}</span></span>
            </a>
            <a href={map.link} target="_blank" rel="noopener noreferrer" className={cardClass}>
              <span className={`${iconClass} bg-brand-navy/10 text-brand-navy transition group-hover:bg-brand-navy group-hover:text-white`}><EnvironmentOutlined /></span>
              <span><span className="block text-sm text-gray-500">{cards.officeTitle}</span><span className="font-semibold">{contact.address}</span></span>
            </a>
          </address>

          {/* Enquiry form */}
          <div className="rounded-3xl bg-brand-soft p-6 sm:p-8">
            <h2 className="m-0 text-[24px] font-semibold text-brand-navy sm:text-[28px]">{form.title}</h2>
            <p className="m-0 mt-2 text-[15px] text-gray-500">{form.subtitle}</p>

            {status === 'done' ? (
              <div role="status" className="mt-6 flex flex-col items-center rounded-2xl bg-white px-6 py-10 text-center shadow-card">
                <CheckCircleFilled className="text-5xl text-emerald-500" />
                <p className="m-0 mt-4 text-base font-medium text-brand-navy">{form.success}</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-5 cursor-pointer border-0 bg-transparent p-0 text-sm font-semibold text-brand-red underline">
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className={label}>Name *</label>
                  <input id="c-name" autoComplete="name" value={values.name} onChange={set('name')} placeholder="Your name" aria-invalid={!!errors.name} className={`${field} ${errors.name ? '!border-brand-red' : ''}`} />
                  {errors.name && <span className="mt-1 block text-xs text-brand-red">{errors.name}</span>}
                </div>
                <div>
                  <label htmlFor="c-phone" className={label}>Mobile number *</label>
                  <div className={`flex items-center overflow-hidden rounded-xl border border-solid bg-white focus-within:border-brand-blue focus-within:ring-[3px] focus-within:ring-brand-blue/15 ${errors.phone ? 'border-brand-red' : 'border-gray-200'}`}>
                    <span className="border-0 border-r border-solid border-gray-200 px-3 text-[15px] text-gray-500">+91</span>
                    <input id="c-phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={values.phone} onChange={set('phone')} placeholder="10-digit number" aria-invalid={!!errors.phone} className="h-12 w-full border-0 bg-transparent px-3 text-[15px] text-brand-navy outline-none placeholder:text-gray-400" />
                  </div>
                  {errors.phone && <span className="mt-1 block text-xs text-brand-red">{errors.phone}</span>}
                </div>
                <div>
                  <label htmlFor="c-email" className={label}>Email</label>
                  <input id="c-email" type="email" autoComplete="email" value={values.email} onChange={set('email')} placeholder="you@example.com" aria-invalid={!!errors.email} className={`${field} ${errors.email ? '!border-brand-red' : ''}`} />
                  {errors.email && <span className="mt-1 block text-xs text-brand-red">{errors.email}</span>}
                </div>
                <div>
                  <label htmlFor="c-service" className={label}>Interested in</label>
                  <select id="c-service" value={values.service} onChange={set('service')} className={field}>
                    <option value="">Select a service</option>
                    {form.services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-city" className={label}>City</label>
                  <select id="c-city" value={values.city} onChange={set('city')} className={field}>
                    <option value="">Select city</option>
                    {inquiryOptions.serviceAreas.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-locality" className={label}>Locality / Society</label>
                  <input id="c-locality" value={values.locality} onChange={set('locality')} placeholder="e.g. Sector 62, Gaur City" className={field} />
                </div>
                <div>
                  <label htmlFor="c-type" className={label}>Property type</label>
                  <select id="c-type" value={values.propertyType} onChange={set('propertyType')} className={field}>
                    <option value="">Select type</option>
                    {inquiryOptions.propertyTypes.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className={label}>Message</label>
                  <textarea id="c-message" rows={4} value={values.message} onChange={set('message')} placeholder="Tell us about your home, rooms and timeline (optional)" className={`${field} h-auto resize-y py-3`} />
                </div>

                {status === 'error' && (
                  <p role="alert" className="m-0 rounded-xl bg-red-50 px-4 py-3 text-sm text-brand-red sm:col-span-2">
                    Could not send right now. Please try again, or call / WhatsApp us directly.
                  </p>
                )}

                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                  <button type="submit" disabled={status === 'sending'} className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-7 text-[15px] font-semibold text-white shadow-cta transition hover:bg-brand-red-dark disabled:cursor-wait disabled:opacity-70">
                    {status === 'sending' ? <><LoadingOutlined /> Sending…</> : <>{form.button} <ArrowRightOutlined /></>}
                  </button>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[15px] font-semibold text-white no-underline transition hover:brightness-95">
                    <WhatsAppOutlined /> WhatsApp instead
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Areas + office map */}
      <section aria-labelledby="contact-areas" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-10">
          <div>
            <h2 id="contact-areas" className="m-0 text-[26px] font-semibold text-brand-navy sm:text-[32px]">{areas.title}</h2>
            <p className="m-0 mt-2 text-[15px] text-gray-500">{areas.subtitle}</p>
            <ul className="m-0 mt-6 flex list-none flex-wrap gap-2.5 p-0">
              {areas.items.map((a) => (
                <li key={a} className="inline-flex items-center gap-1.5 rounded-full border border-solid border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-navy">
                  <EnvironmentOutlined className="text-brand-red" /> {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl bg-white shadow-card">
            <iframe
              title={`${brand.name} office location`}
              src={map.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[320px] w-full border-0 sm:h-[380px]"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <span className="text-sm font-semibold text-brand-navy">{map.title}</span>
              <a href={map.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red no-underline">
                Get directions <ArrowRightOutlined />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
