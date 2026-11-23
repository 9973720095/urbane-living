import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

/*
  App-style row of vertical (9:16) videos, used by Work In Progress (home) and the Factory page.
  - Phones (below 768px): swipe sideways, 2 cards + a peek of the next, title on the video, dots below.
  - Tablet & desktop: "story player": one video in a phone frame with story bars on top (moves to the
    next video by itself when one ends), and a playlist on the right to pick any video.
  - Always muted; a video plays only while it is on screen (saves data, keeps the page fast).
  items: [{ id, title, text, location, status, videoUrl, posterAt }]
*/

// Cloudinary: lighter video file + a small still frame shown before it plays
const videoSrc = (url) => url.replace('/video/upload/', '/video/upload/q_auto/');
export const posterOf = (url, at = 1, width = 480) =>
  url.replace('/video/upload/', `/video/upload/so_${at},w_${width},q_auto,f_jpg/`).replace(/\.[^/.]+$/, '.jpg');

function ReelVideo({ src, posterAt, label, loop = true, posterWidth, onTime, onEnded }) {
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
      poster={posterOf(src, posterAt, posterWidth)}
      muted
      loop={loop}
      onTimeUpdate={onTime ? (e) => onTime(e.currentTarget.duration ? e.currentTarget.currentTime / e.currentTarget.duration : 0) : undefined}
      onEnded={onEnded}
      playsInline
      disablePictureInPicture
      preload="none"
      aria-label={label}
      className="absolute inset-0 block h-full w-full object-cover"
    />
  );
}

// Tablet & desktop: one video in a phone frame + playlist
function StoryPlayer({ items, label }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const item = items[active];
  const go = (i) => {
    setProgress(0);
    setActive((i + items.length) % items.length);
  };
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="hidden items-center gap-8 rounded-[28px] bg-white p-5 shadow-card ring-1 ring-slate-200/70 md:grid md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 lg:p-8">
      {/* phone frame */}
      <div className="relative rounded-[30px] bg-brand-navy p-2 pt-[22px] shadow-[0_24px_50px_-20px_rgba(31,42,68,0.55)]">
  {/* story bars, in the frame above the video (so the logo stays clear) */}
      <div className="absolute inset-x-5 top-[9px] z-[1] flex gap-1" aria-hidden="true">
        {items.map((it, i) => (
          <span key={it.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
            <span
              className="block h-full rounded-full bg-white"
              style={{ width: i < active ? '100%' : i === active ? `${Math.round(progress * 100)}%` : '0%' }}
            />
          </span>
        ))}
      </div>
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[23px] bg-slate-900">
          <ReelVideo
            key={item.id}
            src={item.videoUrl}
            posterAt={item.posterAt}
            posterWidth={600}
            loop={items.length < 2}
            onTime={setProgress}
            onEnded={() => go(active + 1)}
            label={`${item.title}${item.location ? `, ${item.location}` : ''} – video by Urbane Living`}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-4 pt-16">
            {item.status && (
              <span className="mb-1.5 inline-block rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                {item.status}
              </span>
            )}
            <p className="m-0 text-[15px] font-semibold leading-snug text-white">{item.title}</p>
            {item.location && <p className="m-0 mt-0.5 truncate text-xs text-white/80">📍 {item.location}</p>}
          </div>
          {/* tap left / right half = previous / next, like stories */}
          <button type="button" aria-label="Previous video" onClick={() => go(active - 1)} className="absolute inset-y-0 left-0 z-[2] w-1/3 cursor-pointer border-0 bg-transparent p-0" />
          <button type="button" aria-label="Next video" onClick={() => go(active + 1)} className="absolute inset-y-0 right-0 z-[2] w-1/3 cursor-pointer border-0 bg-transparent p-0" />
        </div>
      </div>

      {/* playlist */}
      <div className="min-w-0">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            <span className="text-brand-red">{pad(active + 1)}</span> / {pad(items.length)}
          </p>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous video" onClick={() => go(active - 1)} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-solid border-slate-200 bg-white text-brand-navy transition hover:bg-brand-navy hover:text-white">
              <LeftOutlined />
            </button>
            <button type="button" aria-label="Next video" onClick={() => go(active + 1)} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-brand-red text-white transition hover:bg-brand-red-dark">
              <RightOutlined />
            </button>
          </div>
        </div>
        <ol aria-label={label} className="m-0 flex list-none flex-col gap-2 p-0">
          {items.map((it, i) => {
            const on = i === active;
            return (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={on ? 'true' : undefined}
                  className={`group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-solid p-2.5 pr-4 text-left transition ${on ? 'border-brand-red/25 bg-red-50/60 shadow-sm' : 'border-transparent bg-transparent hover:bg-slate-50'}`}
                >
                  <span className="relative h-[72px] w-[48px] shrink-0 overflow-hidden rounded-xl bg-slate-200">
                    <img src={posterOf(it.videoUrl, (it.posterAt || 1) + 2, 160)} alt="" loading="lazy" className="h-full w-full object-cover" />
                    {on && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/35 text-[11px] text-white" aria-hidden="true">▶</span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[15px] font-semibold leading-snug ${on ? 'text-brand-red' : 'text-brand-navy'}`}>{it.title}</span>
                    {it.text && <span className="mt-0.5 line-clamp-2 block text-[13px] leading-relaxed text-slate-500">{it.text}</span>}
                    {(it.location || it.status) && (
                      <span className="mt-1 block truncate text-[12px] text-slate-400">
                        {it.location ? `📍 ${it.location}` : ''}{it.location && it.status ? ' · ' : ''}{it.status}
                      </span>
                    )}
                  </span>
                  <span className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold lg:flex ${on ? 'bg-brand-red text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                    {pad(i + 1)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
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
    <>
    <StoryPlayer items={items} label={label} />
    <div className="relative md:hidden">
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
    </>
  );
}
