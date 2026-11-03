import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { vastuBanner } from '../data/siteData';
import { DishaMark } from './vastu/VastuArt';

const TONE = {
  ideal: { icon: <CheckCircleFilled />, text: 'text-emerald-400', label: 'Ideal' },
  avoid: { icon: <CloseCircleFilled />, text: 'text-red-400', label: 'Fix' },
};

// Home page card that opens Disha, the free Vastu score tool (/vastu)
export default function VastuBanner() {
  const { name, tagline, title, text, chips, button, secondary, link, preview } = vastuBanner;
  const ring = 2 * Math.PI * 34;

  return (
    <section aria-labelledby="disha-title" className="bg-white px-4 py-12 sm:px-6 lg:py-16">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-brand-ink px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
        {/* glows in the logo colours */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-red/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-brand-blue/30 blur-3xl" />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <div className="flex items-center gap-3">
              <DishaMark className="h-12 w-12 animate-[spin_24s_linear_infinite] motion-reduce:animate-none" />
              <span>
                <span className="block text-xl font-bold leading-none">{name}</span>
                <span className="block text-xs font-medium uppercase tracking-[0.18em] text-brand-gold">{tagline}</span>
              </span>
            </div>

            <h2 id="disha-title" className="m-0 mt-6 text-[28px] font-semibold leading-tight sm:text-[38px]">{title}</h2>
            <p className="m-0 mt-3 max-w-[560px] text-[15px] leading-relaxed text-white/70 sm:text-base">{text}</p>

            <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
              {chips.map((c, i) => (
                <li key={c} className="inline-flex items-center gap-2 rounded-full border border-solid border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold">{i + 1}</span>
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to={link}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red px-7 text-[15px] font-semibold text-white no-underline shadow-cta transition hover:bg-brand-red-dark"
              >
                {button} <ArrowRightOutlined />
              </Link>
              <Link
                to={`${link}#how-it-works`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-solid border-white/25 px-7 text-[15px] font-semibold text-white no-underline transition hover:border-white hover:bg-white/5"
              >
                {secondary}
              </Link>
            </div>
          </div>

          {/* mini report preview */}
          <div className="relative mx-auto w-full max-w-[380px]" aria-hidden="true">
            <div className="rotate-[-2deg] rounded-3xl bg-white p-5 text-brand-navy shadow-2xl transition duration-500 hover:rotate-0">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0">
                  <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#EEF0F5" strokeWidth="8" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeDasharray={ring} strokeDashoffset={ring * (1 - preview.score / 100)} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">{preview.score}</span>
                </div>
                <div>
                  <p className="m-0 text-xs font-semibold uppercase tracking-wider text-gray-400">Vastu score</p>
                  <p className="m-0 text-lg font-semibold">{preview.label}</p>
                </div>
              </div>
              <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
                {preview.rows.map((r) => (
                  <li key={r.room} className="flex items-center justify-between rounded-xl bg-brand-soft px-3 py-2.5 text-sm">
                    <span className="font-medium">{r.room} <span className="text-gray-400">· {r.zone}</span></span>
                    <span className={`inline-flex items-center gap-1 rounded-full bg-brand-ink px-2 py-0.5 text-xs font-semibold ${TONE[r.status].text}`}>
                      {TONE[r.status].icon} {TONE[r.status].label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute -right-2 -top-4 rounded-2xl bg-brand-gold px-3 py-2 text-xs font-bold text-brand-ink shadow-lg sm:-right-5">
              Free · 2 min
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
