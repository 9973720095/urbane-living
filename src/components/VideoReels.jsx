import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

/*
  App-style row of vertical (9:16) videos, used by Work In Progress (home) and the Factory page.
  - Phones: swipe sideways, 2 cards + a peek of the next, title on the video, dots below.
  - Tablet: 3 in view. Desktop: `desktop` in view (3 or 4), arrows when there are more.
  - Always muted; a video plays only while it is on screen (saves data, keeps the page fast).
  items: [{ id, title, text, location, status, videoUrl, posterAt }]
*/

// Cloudinary: lighter video file + a small still frame shown before it plays
const videoSrc = (url) => url.replace('/video/upload/', '/video/upload/q_auto/');
export const posterOf = (url, at = 1, width = 480) =>
  url.replace('/video/upload/', `/video/upload/so_${at},w_${width},q_auto,f_jpg/`).replace(/\.[^/.]+$/, '.jpg');

function ReelVideo({ src, posterAt, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    video.muted = true;
    video.defaultMuted = true;
    if (!('IntersectionObserver' in window)) {
      video.play().catch(() => {});
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={videoSrc(src)}
      poster={posterOf(src, posterAt)}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload="none"
      aria-label={label}
      className="absolute inset-0 block h-full w-full object-cover"
    />
  );
}

const WIDTH = {
  3: 'w-[44%] sm:w-[calc((100%-40px)/3)]',
  4: 'w-[44%] sm:w-[calc((100%-40px)/3)] lg:w-[calc((100%-60px)/4)]',
};

const arrowClass =
  'absolute top-[42%] z-[2] hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-solid border-slate-200 bg-white text-brand-navy shadow-md transition hover:bg-brand-navy hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:flex';

export default function VideoReels({ items, desktop = 4, label = 'Videos' }) {
  const trackRef = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [active, setActive] = useState(0);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    const card = el.querySelector('li');
    if (card) setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / (card.offsetWidth + 12))));
  }, [items.length]);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const slide = (dir) => {
    const el = trackRef.current;
    const card = el?.querySelector('li');
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' });
  };

  const goTo = (i) => {
    const el = trackRef.current;
    const card = el?.querySelectorAll('li')[i];
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <button type="button" aria-label="Previous videos" onClick={() => slide(-1)} disabled={edge.start} className={`${arrowClass} -left-3 lg:-left-5`}>
        <LeftOutlined />
      </button>

      <ul
        ref={trackRef}
        onScroll={update}
        aria-label={label}
        className="-mx-4 m-0 flex list-none snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:gap-5 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li key={item.id} className={`shrink-0 snap-start ${WIDTH[desktop] || WIDTH[4]}`}>
            {/* video card: the title sits on the video (like a reel) */}
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-slate-900 shadow-md ring-1 ring-black/5">
              <ReelVideo
                src={item.videoUrl}
                posterAt={item.posterAt}
                label={`${item.title}${item.location ? `, ${item.location}` : ''} – video by Urbane Living`}
              />
              {/* status, title and place sit at the bottom of the video, so the logo at the top stays clear */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3 pb-3 pt-14 sm:px-4 sm:pb-4">
                {item.status && (
                  <span className="mb-1.5 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm sm:text-[11px]">
                    {item.status}
                  </span>
                )}
                <h3 className="m-0 text-[13px] font-semibold leading-snug text-white sm:text-[15px]">{item.title}</h3>
                {item.location && <p className="m-0 mt-0.5 truncate text-[11px] text-white/80 sm:text-xs">📍 {item.location}</p>}
              </div>
            </div>
            {/* longer text under the card on bigger screens */}
            {item.text && <p className="m-0 mt-3 hidden text-[13.5px] leading-relaxed text-slate-600 sm:block">{item.text}</p>}
          </li>
        ))}
      </ul>

      {/* dots (phones) */}
      {items.length > 2 && (
        <div className="mt-4 flex justify-center gap-1.5 sm:hidden" aria-hidden="true">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              tabIndex={-1}
              onClick={() => goTo(i)}
              className={`h-1.5 cursor-pointer rounded-full border-0 p-0 transition-all ${i === active ? 'w-5 bg-brand-red' : 'w-1.5 bg-slate-300'}`}
            />
          ))}
        </div>
      )}

      <button type="button" aria-label="Next videos" onClick={() => slide(1)} disabled={edge.end} className={`${arrowClass} -right-3 lg:-right-5`}>
        <RightOutlined />
      </button>
    </div>
  );
}
