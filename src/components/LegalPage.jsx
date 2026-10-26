import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MailOutlined, PhoneFilled, WhatsAppOutlined, CheckCircleFilled, ArrowRightOutlined } from '@ant-design/icons';
import useSeo from '../hooks/useSeo';
import { brand, contact, siteUrl } from '../data/siteData';

/*
  Shared layout for Privacy Policy, Terms & Conditions and other legal pages.
  <LegalPage page={termsPage} icon={<BookOutlined />} />
  page: { title, intro, updated, email, lead, highlights, sections[{ id, title, text, paragraphs, points, note, link }], contactTitle, contactText, seo }
*/
export default function LegalPage({ page, icon }) {
  const { title, intro, updated, email, lead, highlights, sections, contactTitle, contactText, seo } = page;

  // SEO: web page + breadcrumb
  const schema = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      description: seo.description,
      url: `${siteUrl}${seo.path}`,
      dateModified: updated,
      publisher: { '@type': 'Organization', name: brand.name, logo: brand.logo },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: title, item: `${siteUrl}${seo.path}` },
      ],
    },
  ], [seo, title, updated]);
  useSeo({ ...seo, image: brand.logo, schema });

  const contactCards = [
    { icon: <MailOutlined />, label: 'Email', value: email, href: `mailto:${email}`, color: 'bg-brand-blue/10 text-brand-blue' },
    { icon: <PhoneFilled />, label: 'Call us', value: contact.phoneDisplay, href: contact.phoneHref, color: 'bg-brand-red/10 text-brand-red' },
    { icon: <WhatsAppOutlined />, label: 'WhatsApp', value: 'Chat with our team', href: contact.whatsappHref, color: 'bg-[#25D366]/10 text-[#25D366]', external: true },
  ];

  return (
    <div className="bg-brand-soft pb-16 lg:pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-brand-navy to-brand-ink px-4 pb-16 pt-12 text-center text-white sm:px-6 lg:pb-20 lg:pt-16">
        <div className="mx-auto max-w-[760px]">
          {icon && (
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl text-brand-gold">
              {icon}
            </span>
          )}
          <h1 className="m-0 text-[30px] font-bold leading-tight sm:text-[42px]">{title}</h1>
          <p className="m-0 mx-auto mt-4 max-w-[640px] text-[15px] leading-relaxed text-white/75 sm:text-base">{intro}</p>
          <p className="m-0 mt-4 text-sm text-white/60">Last updated: {updated}</p>
        </div>
      </header>

      <div className="relative z-[1] mx-auto -mt-8 max-w-[1100px] px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 rounded-2xl bg-white px-5 py-4 text-sm shadow-card">
          <ol className="m-0 flex list-none items-center gap-2 p-0 text-gray-500">
            <li><Link to="/" className="text-gray-500 no-underline hover:text-brand-red">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-brand-navy">{title}</li>
          </ol>
        </nav>

        {/* Key points */}
        {highlights?.length > 0 && (
          <ul className="m-0 mb-6 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
            {highlights.map((h) => (
              <li key={h.title} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-card">
                <CheckCircleFilled className="mt-1 text-lg text-emerald-500" />
                <span>
                  <span className="block text-[15px] font-semibold text-brand-navy">{h.title}</span>
                  <span className="block text-sm text-gray-500">{h.text}</span>
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* On this page (desktop) */}
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-24 rounded-2xl bg-white p-5 shadow-card">
              <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">On this page</p>
              <ol className="m-0 flex list-none flex-col gap-1 p-0">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block rounded-lg px-2 py-1.5 text-sm text-gray-600 no-underline transition hover:bg-brand-soft hover:text-brand-red">
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#contact-us" className="block rounded-lg px-2 py-1.5 text-sm text-gray-600 no-underline transition hover:bg-brand-soft hover:text-brand-red">
                    {sections.length + 1}. {contactTitle}
                  </a>
                </li>
              </ol>
            </nav>
          </aside>

          {/* Content */}
          <article className="rounded-3xl bg-white p-6 shadow-card sm:p-10">
            {lead && <p className="m-0 text-[15px] leading-relaxed text-gray-600 sm:text-base">{lead}</p>}

            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="mt-10 scroll-mt-24 first:mt-0">
                <h2 id={`${s.id}-title`} className="m-0 text-xl font-semibold text-brand-navy sm:text-[22px]">
                  <span className="text-brand-red">{i + 1}.</span> {s.title}
                </h2>
                {s.text && <p className="m-0 mt-3 text-[15px] leading-relaxed text-gray-600">{s.text}</p>}
                {s.paragraphs?.map((p) => (
                  <p key={p} className="m-0 mt-3 text-[15px] leading-relaxed text-gray-600">{p}</p>
                ))}
                {s.points && (
                  <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
                    {s.points.map((pt) => (
                      <li key={pt.label} className="flex items-start gap-3 text-[15px] leading-relaxed text-gray-600">
                        <CheckCircleFilled className="mt-1 shrink-0 text-emerald-500" />
                        <span><strong className="font-semibold text-brand-navy">{pt.label}:</strong> {pt.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.note && <p className="m-0 mt-4 rounded-xl bg-brand-soft px-4 py-3 text-sm text-gray-600">{s.note}</p>}
                {s.link && (
                  <Link to={s.link.to} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red no-underline hover:underline">
                    {s.link.label} <ArrowRightOutlined />
                  </Link>
                )}
              </section>
            ))}

            {/* Contact */}
            <section id="contact-us" aria-labelledby="contact-us-title" className="mt-12 scroll-mt-24 border-0 border-t border-solid border-gray-100 pt-10">
              <h2 id="contact-us-title" className="m-0 text-xl font-semibold text-brand-navy sm:text-[22px]">
                <span className="text-brand-red">{sections.length + 1}.</span> {contactTitle}
              </h2>
              <p className="m-0 mt-3 text-[15px] text-gray-600">{contactText}</p>
              <address className="mt-5 grid grid-cols-1 gap-3 not-italic sm:grid-cols-3">
                {contactCards.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-3 rounded-2xl border border-solid border-gray-100 bg-brand-soft p-4 text-brand-navy no-underline transition hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${c.color}`}>{c.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-xs text-gray-500">{c.label}</span>
                      <span className="block truncate text-sm font-semibold">{c.value}</span>
                    </span>
                  </a>
                ))}
              </address>
              <p className="m-0 mt-4 text-sm text-gray-500">{brand.name}, {contact.address}</p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}