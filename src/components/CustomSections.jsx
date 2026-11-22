import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import SectionHeading from './SectionHeading';
import { getSections, subscribePageSections } from '../utils/pageSections';
import { sizeCloudinary } from '../data/media';

/*
  Sections added from Admin -> Page Sections.
  Put <CustomSections page="home" at="after-gallery" /> at a spot of a page; the spots are listed in
  src/data/pageSections.js (so the admin can pick them). Shows nothing when no section is added there.
*/

// Phones: always 2 in a row (1 when the admin chose 1). Bigger screens: the admin's choice.
const GRID = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
};
// Odd number of items: the last one takes the whole row on phones (3 items = 2 + 1 wide; 4 items = 2 + 2)
const LAST_WIDE = { 2: 'col-span-2 sm:col-span-1', 3: 'col-span-2 sm:col-span-1', 4: 'col-span-2 md:col-span-1' };
const RATIO = { '4/3': 'aspect-[4/3]', '16/9': 'aspect-video', '1/1': 'aspect-square', '9/16': 'aspect-[9/16]' };
const BG = { white: 'bg-white', soft: 'bg-brand-soft', navy: 'bg-brand-navy' };

const isVideo = (url = '') => url.includes('/video/upload/');
const isInternal = (url = '') => url.startsWith('/');

// Cloudinary video: lighter file + a still frame shown before it plays
const videoSrc = (url) => url.replace('/video/upload/', '/video/upload/q_auto/');
const posterOf = (url) => url.replace('/video/upload/', '/video/upload/so_1,w_640,q_auto,f_jpg/').replace(/\.[^/.]+$/, '.jpg');

function LazyVideo({ src, label, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    video.muted = true;
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={videoSrc(src)}
      poster={posterOf(src)}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}

const SmartLink = ({ to, className, children }) =>
  isInternal(to) ? (
    <Link to={to} className={className}>{children}</Link>
  ) : (
    <a href={to} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  );

function Section({ s }) {
  const dark = s.background === 'navy';
  const cols = GRID[s.columns] || GRID[3];
  const ratio = RATIO[s.ratio] || RATIO['4/3'];
  const items = s.items || [];
  const headingId = `cs-${s._id}`;

  return (
    <section aria-labelledby={s.title ? headingId : undefined} className={`${BG[s.background] || BG.white} px-4 py-12 sm:px-6 lg:py-20`}>
      <div className="mx-auto max-w-[1200px]">
        {(s.title || s.subtitle || s.eyebrow) && (
          <SectionHeading id={headingId} eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} dark={dark} />
        )}

        {items.length > 0 && (
          <ul className={`m-0 grid list-none gap-3 p-0 sm:gap-6 ${cols}`}>
            {items.map((it, i) => {
              const hasText = it.title || it.text || (it.linkUrl && it.linkLabel);
              const wide = items.length % 2 === 1 && i === items.length - 1 && LAST_WIDE[s.columns];
              // a tall (9:16) photo / video stretched over the whole phone width would be huge: show it 4:5
              const shape = wide && s.ratio === '9/16' ? 'aspect-[4/5] sm:aspect-[9/16]' : ratio;
              const fit = wide && s.ratio === '9/16' ? 'object-top sm:object-center' : '';
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={i} className={`flex flex-col overflow-hidden rounded-2xl ${wide || ''} ${dark ? 'bg-white/5' : 'bg-white shadow-card'}`}>
                  {it.media && (
                    <div className={`${shape} w-full overflow-hidden bg-slate-200`}>
                      {isVideo(it.media) ? (
                        <LazyVideo src={it.media} label={it.alt || it.title || ''} className={fit} />
                      ) : (
                        <img
                          src={sizeCloudinary(it.media, s.columns === 1 ? 1400 : 720)}
                          alt={it.alt || ''}
                          loading="lazy"
                          decoding="async"
                          className={`block h-full w-full object-cover ${fit}`}
                        />
                      )}
                    </div>
                  )}
                  {hasText && (
                    <div className="flex flex-1 flex-col p-3 sm:p-5">
                      {it.title && <h3 className={`m-0 text-[14px] font-semibold leading-snug sm:text-[17px] ${dark ? 'text-white' : 'text-brand-navy'}`}>{it.title}</h3>}
                      {it.text && <p className={`m-0 mt-1 whitespace-pre-line text-[12.5px] leading-relaxed sm:mt-1.5 sm:text-[14px] ${dark ? 'text-white/75' : 'text-gray-600'}`}>{it.text}</p>}
                      {it.linkUrl && it.linkLabel && (
                        <SmartLink to={it.linkUrl} className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-semibold sm:text-sm text-brand-red no-underline hover:underline">
                          {it.linkLabel} <ArrowRightOutlined />
                        </SmartLink>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {s.buttonUrl && s.buttonLabel && (
          <div className="mt-8 text-center">
            <SmartLink
              to={s.buttonUrl}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red px-7 text-[15px] font-semibold text-white no-underline shadow-cta transition hover:bg-brand-red-dark"
            >
              {s.buttonLabel} <ArrowRightOutlined />
            </SmartLink>
          </div>
        )}
      </div>
    </section>
  );
}

export default function CustomSections({ page, at }) {
  const [, setVersion] = useState(0);
  useEffect(() => subscribePageSections(() => setVersion((v) => v + 1)), []);
  const list = getSections(page, at);
  if (!list.length) return null;
  return list.map((s) => <Section key={s._id} s={s} />);
}
