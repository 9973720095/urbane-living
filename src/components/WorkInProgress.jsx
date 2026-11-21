import React, { useEffect, useRef } from 'react';

// Home page: "Work In Progress Sites" (real on-site videos from our Cloudinary).
// Use a DIFFERENT real video for each site, and only real locations.
// Videos are vertical (9:16). Desktop/tablet: 3 in one row. Phones: swipe sideways.
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
];

// Cloudinary: lighter video file, and a small still frame shown before the video starts
const videoSrc = (url) => url.replace('/video/upload/', '/video/upload/q_auto/');
const posterOf = (url, at = 1) => url.replace('/video/upload/', `/video/upload/so_${at},w_480,q_auto,f_jpg/`).replace(/\.[^/.]+$/, '.jpg');

// Plays only while on screen, so the home page does not download every video at once
function SiteVideo({ src, posterAt, label }) {
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
      className="block h-full w-full object-cover"
    />
  );
}

export default function WorkInProgress() {
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
            Real videos from our active sites: glass fitting, wardrobes and modular kitchens, made and installed by our own team.
          </p>
        </div>

        {/* Phones: swipe sideways. Tablet + desktop: all 3 in one row */}
        <ul className="-mx-5 m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-auto sm:grid sm:max-w-[1040px] sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {WIP_VIDEOS.map((item) => (
            <li
              key={item.id}
              className="w-[72%] shrink-0 snap-center overflow-hidden rounded-2xl border border-solid border-slate-200 bg-white shadow-md transition-transform duration-300 hover:-translate-y-1.5 sm:w-auto"
            >
              {/* Video Wrapper (9:16, same shape as the videos, so nothing is cut off) */}
              <div className="relative aspect-[9/16] w-full bg-slate-900">
                <SiteVideo src={item.videoUrl} posterAt={item.posterAt} label={`${item.title}, ${item.location} – site video by Urbane Living`} />
                <span className="absolute right-3 top-3 rounded-md bg-slate-900/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {item.status}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-4">
                <h3 className="m-0 mb-1 text-[15px] font-semibold text-slate-900">{item.title}</h3>
                <p className="m-0 text-[13px] leading-snug text-slate-600">{item.text}</p>
                <p className="m-0 mt-2 text-xs font-medium text-slate-500">📍 {item.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
