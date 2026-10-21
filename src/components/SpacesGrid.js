import React, { useEffect, useRef, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { spaces } from '../data/siteData';

// Cloudinary video -> still frame (shown until the video starts)
const posterOf = (url) =>
  url.includes('res.cloudinary.com') ? url.replace('/upload/', '/upload/so_1/').replace(/\.mp4(\?.*)?$/, '.jpg') : undefined;

// Plays only while on screen, so the slider doesn't download every video at once
const LazyVideo = ({ src, label }) => {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={posterOf(src)}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
    />
  );
};

const SpacesGrid = ({ onOpenForm }) => {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  // Move one card left / right; wraps around at the ends
  const slide = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 24 : track.clientWidth;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    const atStart = track.scrollLeft <= 8;
    if (dir > 0 && atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir < 0 && atStart) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    else track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  // Autoplay every 5s, paused while the visitor hovers or touches the slider
  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => slide(1), 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const arrow =
    'absolute top-[120px] z-10 hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white text-brand-navy shadow-card transition hover:bg-brand-red hover:text-white sm:flex';

  return (
    <section aria-labelledby="spaces-title" className="bg-white px-4 pt-6 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <h2 id="spaces-title" className="m-0 mx-auto mb-8 max-w-[900px] text-center text-2xl font-semibold leading-snug text-brand-navy sm:text-3xl lg:text-[36px]">
          {spaces.titleStart} <span className="text-brand-red">{spaces.titleAccent}</span> {spaces.titleEnd}
        </h2>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <button type="button" aria-label="Previous" onClick={() => slide(-1)} className={`${arrow} -left-3 lg:-left-5`}>
            <LeftOutlined />
          </button>
          <button type="button" aria-label="Next" onClick={() => slide(1)} className={`${arrow} -right-3 lg:-right-5`}>
            <RightOutlined />
          </button>

          {/* 1 card (+ peek) on mobile, 2 on tablet, 3 on desktop */}
          <ul
            ref={trackRef}
            className="m-0 flex list-none snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth p-0 pb-12 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {spaces.items.map((item) => {
              const isVideo = /\.mp4(\?|$)/.test(item.media);
              return (
                <li key={item.title} className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]">
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-solid border-[#eef0f5] bg-white shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                    <div className="relative h-[230px] overflow-hidden bg-brand-navy sm:h-[250px]">
                      {isVideo ? (
                        <LazyVideo src={item.media} label={item.title} />
                      ) : (
                        <img src={item.media} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      )}
                      {item.tag && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-navy backdrop-blur">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="m-0 mb-2 text-lg font-semibold text-brand-navy">{item.title}</h3>
                      <p className="m-0 mb-5 text-sm leading-relaxed text-gray-500">{item.subtitle}</p>
                      <button
                        type="button"
                        onClick={onOpenForm}
                        className="mt-auto h-[46px] w-full cursor-pointer rounded-lg border-0 bg-brand-red text-sm font-semibold tracking-wide text-white transition hover:bg-brand-red-dark"
                      >
                        GET FREE QUOTE
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SpacesGrid;