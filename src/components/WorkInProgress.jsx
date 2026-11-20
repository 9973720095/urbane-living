import React, { useEffect, useRef } from 'react';

// Home page: "Work In Progress Sites" (real on-site videos from our Cloudinary).
// Use a DIFFERENT real video for each site, and only real locations.
const WIP_VIDEOS = [
  {
    id: 1,
    title: '3BHK False Ceiling & Lighting',
    location: 'Sector 65, Gurugram',
    status: 'In Progress',
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/f_auto,q_auto/v1792578997/video_20260922_194112_1.mp4',
  },
  {
    id: 2,
    title: 'Modular Kitchen & Wardrobe Work',
    location: 'Dwarka, New Delhi',
    status: 'In Progress',
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/f_auto,q_auto/v1792578997/video_20260922_194112_1.mp4',
  },
  {
    id: 3,
    title: 'Living Room Wall Paneling',
    location: 'Sector 150, Noida',
    status: 'Finishing Stage',
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/f_auto,q_auto/v1792578997/video_20260922_194112_1.mp4',
  },
  {
    id: 4,
    title: 'Full Home Interior Execution',
    location: 'Indirapuram, Ghaziabad',
    status: 'In Progress',
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/f_auto,q_auto/v1792578997/video_20260922_194112_1.mp4',
  },
];

// Small still frame shown before the video starts (keeps the page fast)
const posterOf = (url) =>
  url.replace('/video/upload/f_auto,q_auto/', '/video/upload/so_1,w_480,q_auto,f_jpg/').replace(/\.[^/.]+$/, '.jpg');

// Plays only while on screen, so the home page does not download 4 videos at once
function SiteVideo({ src, label }) {
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
      src={src}
      poster={posterOf(src)}
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
            Watch real on-site execution and craftsmanship happening right now across our active projects.
          </p>
        </div>

        {/* 4-Column Video Grid (Mobile: 1, Tablet: 2, Desktop: 4) */}
        <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {WIP_VIDEOS.map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-2xl border border-solid border-slate-200 bg-white shadow-md transition-transform duration-300 hover:-translate-y-1.5"
            >
              {/* Video Wrapper */}
              <div className="relative aspect-[9/14] w-full bg-slate-900">
                <SiteVideo src={item.videoUrl} label={`${item.title}, ${item.location} – site video by Urbane Living`} />
                <span className="absolute left-3 top-3 rounded-md bg-slate-900/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {item.status}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-4">
                <h3 className="m-0 mb-1 text-[15px] font-semibold text-slate-900">{item.title}</h3>
                <p className="m-0 text-xs text-slate-500">{item.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
