import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

// Home page: "Work In Progress Sites" (real on-site videos from our Cloudinary).
// Use a DIFFERENT real video for each site, and only real locations (leave location '' if unsure).
// Videos are vertical (9:16). Desktop: 4 in one row, arrows for the rest. Tablet: 3.
// Phones: 2 in a row; with an odd number of videos the last one takes the whole row.
const WIP_VIDEOS = [
  {
    id: 1,
    title: 'Glass Fitting & Sealing',
    text: 'Glass panels lifted with suction cups, set into the frame and sealed with silicone.',
    location: 'Sector 65, Gurugram',
    status: 'In Progress',
    posterAt: 9, // second of the video used as the still frame
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1795259598/urbanelivingfactory5_logo_mute.mp4',
  },
  {
    id: 2,
    title: 'Wardrobe with Profile Lights',
    text: 'Full-height wardrobe with LED profile lights, open shelves and a pull-out trouser rack.',
    location: 'Dwarka, New Delhi',
    status: 'Finishing Stage',
    posterAt: 4.5,
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1795260996/urbane_work_in_progress_v5_1.mp4',
  },
  {
    id: 3,
    title: 'Modular Kitchen Installation',
    text: 'Sink unit, drawers and soft-close hardware being fitted into the kitchen cabinets.',
    location: 'Sector 150, Noida',
    status: 'In Progress',
    posterAt: 10,
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1795262433/urbaneliving_work_in_progress_noface.mp4',
  },
  {
    id: 4,
    title: 'False Ceiling with Cove Lighting',
    text: 'Gypsum ceiling with blue cove LED lights and AC grilles, in a showroom with glass display shelves.',
    location: '',
    status: 'Finishing Stage',
    posterAt: 24,
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1795333886/urbaneliving_working_combined.mp4',
  },
  {
    id: 5,
    title: 'New Project: Carpentry Work',
    text: 'Cabinet frames assembled on site while the wall units and false ceiling come together.',
    location: '',
    status: 'In Progress',
    posterAt: 28.5,
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1795333907/urbane_working_new_project_logo_mute.mp4',
  },
];

// Cloudinary: lighter video file, and a small still frame shown before the video starts
const videoSrc = (url) => url.replace('/video/upload/', '/video/upload/q_auto/');
const posterOf = (url, at = 1) => url.replace('/video/upload/', `/video/upload/so_${at},w_480,q_auto,f_jpg/`).replace(/\.[^/.]+$/, '.jpg');

// Plays only while on screen, so the home page does not download every video at once
function SiteVideo({ src, posterAt, label, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    video.muted = true;
    if (!('IntersectionObserver' in window)) {
      video.play().catch(() => {});
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
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
      preload="none"
      aria-label={label}
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}

const arrowClass =
  'absolute top-[38%] z-[2] hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-solid border-slate-200 bg-white text-brand-navy shadow-md transition hover:bg-brand-navy hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:flex';

export default function WorkInProgress() {
  const trackRef = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges]);

  // move by one card
  const slide = (dir) => {
    const el = trackRef.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' });
  };

  return (
    <section className="bg-slate-50 px-5 py-16" aria-labelledby="wip-title">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#4267b2]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#4267b2]">
            ● Live Site Updates
          </span>
          <h2 id="wip-title" className="mb-2.5 text-3xl font-bold text-slate-900 md:text-4xl">
            Work In Progress Sites
          </h2>
          <p className="mx-auto max-w-xl text-sm text-slate-500 md:text-base">
            Real videos from our active sites: false ceilings, glass fitting, wardrobes, kitchens and carpentry, made and installed by our own team.
          </p>
        </div>

        <div className="relative">
          <button type="button" aria-label="Previous videos" onClick={() => slide(-1)} disabled={edge.start} className={`${arrowClass} -left-3 lg:-left-5`}>
            <LeftOutlined />
          </button>

          {/* Phones: 2 in a row (odd last one = full row). Tablet 3 and desktop 4 in one sliding row */}
          <ul
            ref={trackRef}
            onScroll={updateEdges}
            className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:flex sm:snap-x sm:snap-mandatory sm:gap-5 sm:overflow-x-auto sm:pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {WIP_VIDEOS.map((item, i) => {
              // odd number of videos: the last one takes the whole row on phones (shown 4:5, top kept)
              const wide = WIP_VIDEOS.length % 2 === 1 && i === WIP_VIDEOS.length - 1;
              return (
                <li
                  key={item.id}
                  className={`overflow-hidden rounded-2xl border border-solid border-slate-200 bg-white shadow-md sm:w-[calc((100%-40px)/3)] sm:shrink-0 sm:snap-start lg:w-[calc((100%-60px)/4)] ${wide ? 'col-span-2' : ''}`}
                >
                  {/* Video Wrapper (9:16, same shape as the videos, so nothing is cut off) */}
                  <div className={`relative w-full bg-slate-900 ${wide ? 'aspect-[4/5] sm:aspect-[9/16]' : 'aspect-[9/16]'}`}>
                    <SiteVideo
                      src={item.videoUrl}
                      posterAt={item.posterAt}
                      className={wide ? 'object-top sm:object-center' : ''}
                      label={`${item.title}${item.location ? `, ${item.location}` : ''} – site video by Urbane Living`}
                    />
                    <span className="absolute bottom-2 left-2 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm sm:bottom-auto sm:left-auto sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[11px]">
                      {item.status}
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="p-3 sm:p-4">
                    <h3 className="m-0 mb-1 text-[13.5px] font-semibold leading-snug text-slate-900 sm:text-[15px]">{item.title}</h3>
                    <p className="m-0 text-[12px] leading-snug text-slate-600 sm:text-[13px]">{item.text}</p>
                    {item.location && <p className="m-0 mt-2 text-[11px] font-medium text-slate-500 sm:text-xs">📍 {item.location}</p>}
                  </div>
                </li>
              );
            })}
          </ul>

          <button type="button" aria-label="Next videos" onClick={() => slide(1)} disabled={edge.end} className={`${arrowClass} -right-3 lg:-right-5`}>
            <RightOutlined />
          </button>
        </div>
      </div>
    </section>
  );
}
