import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  CompassOutlined,
  FilePdfOutlined,
  MinusCircleFilled,
  PlusOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
  AimOutlined,
} from '@ant-design/icons';
import useSeo from '../hooks/useSeo';
import { vastuPage, brand, siteUrl } from '../data/siteData';
import { DishaMark, CompassRing } from '../components/vastu/VastuArt';

const { hero, bento, steps, report, faqs, cta, note, seo } = vastuPage;
const TOOL = '/vastu/analyze';

const ICONS = {
  compass: <CompassOutlined />,
  tap: <AimOutlined />,
  file: <FilePdfOutlined />,
  shield: <SafetyCertificateOutlined />,
  tools: <ToolOutlined />,
};

const TONE = {
  ideal: { icon: <CheckCircleFilled />, ring: 'bg-emerald-50 text-emerald-600', bar: 'bg-emerald-500', w: '86%' },
  avoid: { icon: <CloseCircleFilled />, ring: 'bg-red-50 text-brand-red', bar: 'bg-brand-red', w: '38%' },
  okay: { icon: <MinusCircleFilled />, ring: 'bg-amber-50 text-amber-500', bar: 'bg-brand-gold', w: '62%' },
};

const btnRed =
  'inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-red px-8 text-base font-semibold text-white no-underline shadow-cta transition hover:bg-brand-red-dark';

// /vastu: Disha landing page (the tool itself is /vastu/analyze)
export default function VastuPage() {
  const [open, setOpen] = useState(0);

  const schema = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `Disha by ${brand.name}`,
      url: `${siteUrl}${seo.path}`,
      description: seo.description,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      provider: { '@type': 'Organization', name: brand.name, logo: brand.logo },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to check the Vastu score of your floor plan',
      step: steps.items.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Vastu Score', item: `${siteUrl}${seo.path}` },
      ],
    },
  ], []);
  useSeo({ ...seo, schema });

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-ink px-4 pb-16 pt-12 text-white sm:px-6 lg:pb-24 lg:pt-16">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-blue/30 blur-3xl" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        />

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-solid border-white/15 bg-white/5 py-1 pl-1 pr-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
              <DishaMark className="h-7 w-7" /> {hero.eyebrow}
            </span>
            <h1 className="m-0 mt-5 text-[32px] font-bold leading-[1.1] sm:text-[48px] lg:text-[54px]">
              {hero.title}{' '}
              <span className="bg-gradient-to-r from-brand-red via-[#ff5a3c] to-brand-gold bg-clip-text text-transparent">{hero.highlight}</span>
            </h1>
            <p className="m-0 mt-5 max-w-[580px] text-[15px] leading-relaxed text-white/70 sm:text-[17px]">{hero.text}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={TOOL} className={btnRed}>
                {hero.primary} <ArrowRightOutlined />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex h-14 items-center justify-center rounded-full border border-solid border-white/25 px-8 text-base font-semibold text-white no-underline transition hover:border-white hover:bg-white/5"
              >
                {hero.secondary}
              </a>
            </div>

            <ul className="m-0 mt-8 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-sm text-white/75">
              {hero.trust.map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <CheckCircleFilled className="text-brand-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* compass + floating score card */}
          <div className="relative mx-auto w-full max-w-[420px]" aria-hidden="true">
            <CompassRing north={-18} className="w-full drop-shadow-2xl" />
            <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full bg-brand-ink text-center ring-4 ring-white/10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Score</span>
              <span className="text-5xl font-bold leading-none sm:text-6xl">82</span>
              <span className="mt-1 text-xs font-semibold text-emerald-400">Good balance</span>
            </div>
            <div className="absolute -left-2 bottom-6 rounded-2xl bg-white px-4 py-3 text-brand-navy shadow-2xl sm:-left-8">
              <p className="m-0 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Kitchen · SE</p>
              <p className="m-0 flex items-center gap-1.5 text-sm font-semibold"><CheckCircleFilled className="text-emerald-500" /> Fire zone, ideal</p>
            </div>
            <div className="absolute -right-2 top-6 rounded-2xl bg-white px-4 py-3 text-brand-navy shadow-2xl sm:-right-6">
              <p className="m-0 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Toilet · NE</p>
              <p className="m-0 flex items-center gap-1.5 text-sm font-semibold"><ToolOutlined className="text-brand-red" /> 3 easy fixes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento */}
      <section aria-labelledby="disha-why" className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end">
            <h2 id="disha-why" className="m-0 text-[28px] font-bold leading-tight text-brand-navy sm:text-[40px]">{bento.title}</h2>
            <p className="m-0 text-[15px] leading-relaxed text-gray-600 sm:text-base lg:pb-2">{bento.text}</p>
          </div>
          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
            {bento.items.map((b, i) => (
              <li
                key={b.title}
                className={`group relative overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-1 ${
                  b.wide ? 'md:col-span-2' : ''
                } ${i === 0 ? 'bg-brand-navy text-white' : 'border border-solid border-gray-200 bg-brand-soft text-brand-navy'}`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl transition group-hover:rotate-[-8deg] ${
                    i === 0 ? 'bg-brand-red text-white' : 'bg-white text-brand-red shadow-card'
                  }`}
                >
                  {ICONS[b.icon]}
                </span>
                <h3 className="m-0 mt-5 text-xl font-semibold">{b.title}</h3>
                <p className={`m-0 mt-2 max-w-[520px] text-sm leading-relaxed ${i === 0 ? 'text-white/70' : 'text-gray-600'}`}>{b.text}</p>
                {i === 0 && (
                  <CompassRing north={0} className="pointer-events-none absolute -bottom-24 -right-16 w-64 opacity-30" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works: timeline */}
      <section id="how-it-works" aria-labelledby="disha-steps" className="scroll-mt-24 bg-brand-soft px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="disha-steps" className="m-0 text-center text-[28px] font-bold text-brand-navy sm:text-[40px]">{steps.title}</h2>
          <ol className="relative m-0 mt-12 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-4 md:gap-6">
            <span aria-hidden="true" className="absolute left-6 top-6 h-[calc(100%-48px)] w-0.5 bg-gradient-to-b from-brand-red to-brand-blue md:left-[12%] md:right-[12%] md:h-0.5 md:w-auto md:bg-gradient-to-r" />
            {steps.items.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-ink text-base font-bold text-white ring-8 ring-brand-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="m-0 text-lg font-semibold text-brand-navy md:mt-4">{s.title}</h3>
                  <p className="m-0 mt-1.5 text-sm leading-relaxed text-gray-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <Link to={TOOL} className={btnRed}>
              {hero.primary} <ArrowRightOutlined />
            </Link>
          </div>
        </div>
      </section>

      {/* Report preview */}
      <section aria-labelledby="disha-report" className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 id="disha-report" className="m-0 text-[28px] font-bold leading-tight text-brand-navy sm:text-[40px]">{report.title}</h2>
            <p className="m-0 mt-4 max-w-[520px] text-[15px] leading-relaxed text-gray-600 sm:text-base">{report.text}</p>
            <ul className="m-0 mt-8 flex list-none flex-col gap-4 p-0">
              {report.points.map((p) => (
                <li key={p.title} className="flex items-start gap-4">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${TONE[p.tone].ring}`}>{TONE[p.tone].icon}</span>
                  <span>
                    <span className="block text-base font-semibold text-brand-navy">{p.title}</span>
                    <span className="block text-sm text-gray-600">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-brand-red/10 via-transparent to-brand-blue/15" />
            <div className="relative rounded-3xl border border-solid border-gray-200 bg-white p-6 shadow-card-hover sm:p-8">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                  <DishaMark className="h-7 w-7" /> Disha report
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">82 / 100</span>
              </div>
              <ul className="m-0 mt-6 flex list-none flex-col gap-4 p-0">
                {[
                  ['Kitchen', 'South-East', 'ideal'],
                  ['Pooja room', 'North-East', 'ideal'],
                  ['Living room', 'West', 'okay'],
                  ['Toilet', 'North-East', 'avoid'],
                ].map(([room, zone, tone]) => (
                  <li key={room}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-brand-navy">{room}</span>
                      <span className="text-gray-500">{zone}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100">
                      <div className={`h-full rounded-full ${TONE[tone].bar}`} style={{ width: TONE[tone].w }} />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-brand-soft p-4 text-sm text-gray-700">
                <span className="font-semibold text-brand-navy">Fix for Toilet: </span>
                Keep the door closed, add an exhaust fan and use light colours.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="disha-faq" className="bg-brand-soft px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-[860px]">
          <h2 id="disha-faq" className="m-0 text-center text-[28px] font-bold text-brand-navy sm:text-[40px]">{faqs.title}</h2>
          <ul className="m-0 mt-10 flex list-none flex-col gap-3 p-0">
            {faqs.items.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="rounded-2xl bg-white shadow-card">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border-0 bg-transparent px-5 py-4 text-left text-base font-semibold text-brand-navy sm:px-6"
                  >
                    {f.q}
                    <PlusOutlined className={`shrink-0 text-brand-red transition ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                  {isOpen && <p className="m-0 px-5 pb-5 text-sm leading-relaxed text-gray-600 sm:px-6">{f.a}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA band */}
      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-6 overflow-hidden rounded-[28px] bg-gradient-to-r from-brand-navy to-brand-blue px-6 py-12 text-center text-white sm:px-12 lg:flex-row lg:justify-between lg:text-left">
          <DishaMark className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-20" />
          <div className="relative">
            <h2 className="m-0 text-[26px] font-bold sm:text-[34px]">{cta.title}</h2>
            <p className="m-0 mt-2 text-white/75">{cta.text}</p>
          </div>
          <Link to={TOOL} className={`${btnRed} relative shrink-0`}>
            {cta.button} <ArrowRightOutlined />
          </Link>
        </div>
        <p className="m-0 mx-auto mt-6 max-w-[680px] text-center text-xs leading-relaxed text-gray-500">{note}</p>
      </section>
    </div>
  );
}
