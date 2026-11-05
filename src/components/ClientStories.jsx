import React, { useRef, useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';

// Client video stories (edit here). Add more items and they appear automatically.
const stories = [
  {
    id: 1,
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1792578318/1723703873641441_1.mp4',
    quote: 'We wanted our new home to reflect contemporary and modern styles, inspired by designs we loved, perfectly curated by UrbaneLiving.',
    author: 'Dr. Lipika and Dr. Satendra',
  },
  {
    id: 2,
    videoUrl: 'https://res.cloudinary.com/diosq0s7w/video/upload/v1792576908/urbane_living_logo_download_alxjjp.mp4',
    quote: 'Combining our family’s heritage with a modern look was our dream, and UrbaneLiving helped make it a reality.',
    author: 'Amrish',
  },
  {
    id: 3,
    videoUrl: 'https://res.cloudinary.com/diosq0s7w/video/upload/v1793003212/Saubhagya_Review_16x9_cyfxcb.mp4',
    quote: 'Thanks to UrbaneLiving, our new home seamlessly blends heritage beauty with modern style, reflecting our taste.',
    author: 'Mrs. Saubhagya',
  },
];

// Cloudinary gives a free thumbnail when .mp4 is swapped for .jpg
const posterOf = (url) => (url.includes('res.cloudinary.com') ? url.replace(/\.mp4$/, '.jpg') : undefined);
const initials = (name) => name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '').charAt(0).toUpperCase();

// Phones: swipe one story at a time (with dots). Desktop: all 3 side by side.
const ClientStories = ({ onOpenForm }) => {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  // which card is in view while swiping
  const onScroll = (e) => {
    const el = e.currentTarget;
    const card = el.firstElementChild;
    if (!card) return;
    setActive(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
  };

  const goTo = (i) => {
    const el = trackRef.current;
    const card = el?.children[i];
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };

  // only one video plays at a time
  const onPlay = (e) => {
    trackRef.current?.querySelectorAll('video').forEach((v) => { if (v !== e.currentTarget) v.pause(); });
  };

  return (
    <section aria-labelledby="stories-title" className="bg-white px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Header (same style as the other home sections) */}
        <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-[640px]">
            <span className="mb-3 inline-block rounded-full bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-red">
              CLIENT STORIES
            </span>
            <h2 id="stories-title" className="m-0 text-[24px] font-semibold leading-tight text-brand-navy sm:text-[36px] lg:text-[40px]">
              Heard from us? Now hear our <span className="text-brand-red">clients’ stories</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => typeof onOpenForm === 'function' && onOpenForm()}
            className="hidden h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-7 text-[15px] font-semibold text-white shadow-cta transition hover:bg-brand-red-dark lg:inline-flex"
          >
            Book Free Consultation <ArrowRightOutlined />
          </button>
        </div>

        {/* Stories */}
        <ul
          ref={trackRef}
          onScroll={onScroll}
          className="-mx-4 mb-0 mt-8 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {stories.map((s) => (
            <li key={s.id} className="flex w-[85%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-solid border-gray-100 bg-white shadow-card sm:w-[60%] lg:w-auto">
              <div className="aspect-video bg-brand-ink">
                <video
                  src={s.videoUrl}
                  poster={posterOf(s.videoUrl)}
                  controls
                  playsInline
                  preload="none"
                  onPlay={onPlay}
                  className="block h-full w-full object-contain"
                  aria-label={`Video review by ${s.author}`}
                />
              </div>
              <figure className="m-0 flex flex-1 flex-col p-5">
                <span aria-hidden="true" className="h-6 font-serif text-5xl leading-none text-brand-red/40">“</span>
                <blockquote className="m-0 mt-1 flex-1 text-sm leading-relaxed text-gray-600">{s.quote}</blockquote>
                <figcaption className="mt-4 flex items-center gap-3 border-0 border-t border-solid border-gray-100 pt-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
                    {initials(s.author)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-navy">{s.author}</span>
                    <span className="block text-xs text-gray-400">Urbane Living client</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {/* Dots (phones / tablets) */}
        {stories.length > 1 && (
          <div className="mt-5 flex justify-center gap-2 lg:hidden">
            {stories.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Show story ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 cursor-pointer rounded-full border-0 p-0 transition-all ${active === i ? 'w-6 bg-brand-red' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </div>
        )}

        {/* CTA on phones */}
        <div className="mt-8 text-center lg:hidden">
          <button
            type="button"
            onClick={() => typeof onOpenForm === 'function' && onOpenForm()}
            className="inline-flex h-12 w-full max-w-[360px] cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-7 text-[15px] font-semibold text-white shadow-cta transition hover:bg-brand-red-dark"
          >
            Book Free Consultation <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientStories;