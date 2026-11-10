import React from 'react';
import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';
import { blend } from '../data/siteData';

// Home page: "A blend of beauty and functionality" card.
// Phones: video on top, text below. Desktop: text left, video right.
export default function BlendSection({ onOpenForm }) {
  return (
    <section aria-labelledby="blend-title" className="bg-white px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto grid max-w-[1100px] overflow-hidden rounded-3xl bg-brand-navy shadow-card md:grid-cols-2">
        <div className="relative order-1 h-[220px] bg-brand-ink sm:h-[300px] md:order-2 md:h-auto md:min-h-[380px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 block h-full w-full object-cover"
          >
            <source src={blend.video} type="video/mp4" />
          </video>
        </div>

        <div className="order-2 px-6 py-8 sm:px-10 sm:py-12 md:order-1 md:self-center">
          {blend.eyebrow && (
            <span className="mb-3 inline-block rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-gold">
              {blend.eyebrow}
            </span>
          )}
          <h2 id="blend-title" className="m-0 text-[26px] font-semibold leading-tight text-white sm:text-[34px]">
            {blend.title} {blend.highlight && <span className="text-brand-gold">{blend.highlight}</span>}
          </h2>
          <p className="m-0 mt-3 text-[15px] leading-relaxed text-white/75 sm:text-base">{blend.text}</p>

          {blend.points?.length > 0 && (
            <ul className="m-0 mt-5 flex list-none flex-col gap-2.5 p-0">
              {blend.points.map((pt) => (
                <li key={pt} className="flex items-center gap-2.5 text-[14px] text-white/90">
                  <CheckCircleFilled className="text-brand-gold" /> {pt}
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={onOpenForm}
            className="mt-7 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-7 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(228,11,18,0.35)] transition hover:bg-brand-red-dark sm:w-auto"
          >
            {blend.cta} <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </section>
  );
}