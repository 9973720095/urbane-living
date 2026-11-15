import React, { useRef, useState } from 'react';
import { ArrowRightOutlined, CaretRightFilled } from '@ant-design/icons';
import SectionHeading from './SectionHeading';

// Client video stories (edit here). Add more items and they appear automatically.
// coverAt = second of the video used as the cover photo (a frame where the client's face is clear).
const stories = [
  {
    id: 1,
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1792578318/1723703873641441_1.mp4',
    coverAt: 8,
    quote: 'We wanted our new home to reflect contemporary and modern styles, inspired by designs we loved, perfectly curated by UrbaneLiving.',
    author: 'Dr. Lipika and Dr. Satendra',
  },
  {
    id: 2,
    videoUrl: 'https://res.cloudinary.com/diosq0s7w/video/upload/v1792576908/urbane_living_logo_download_alxjjp.mp4',
    coverAt: 5,
    quote: 'Combining our family’s heritage with a modern look was our dream, and UrbaneLiving helped make it a reality.',
    author: 'Amrish',
  },
  {
    id: 3,
    videoUrl: 'https://res.cloudinary.com/diosq0s7w/video/upload/v1793003212/Saubhagya_Review_16x9_cyfxcb.mp4',
    coverAt: 5,
    quote: 'Thanks to UrbaneLiving, our new home seamlessly blends heritage beauty with modern style, reflecting our taste.',
    author: 'Mrs. Saubhagya',
  },
];

// Cloudinary makes a photo from any second of a video: add so_<sec> and swap .mp4 for .jpg
const coverOf = (url, sec = 0) =>
  url.includes('res.cloudinary.com')
    ? url.replace('/video/upload/', `/video/upload/so_${sec},w_800,q_auto/`).replace(/\.mp4$/, '.jpg')
    : undefined;
const initials = (name) => name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '').charAt(0).toUpperCase();

// One story: face cover + big play button, the video loads only when played
const StoryVideo = ({ story, onPlay }) => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    const v = ref.current;
    if (v) v.play().catch(() => {});
  };

  return (
    <div className="relative aspect-video overflow-hidden bg-brand-ink">
      <video
        ref={ref}
        src={story.videoUrl}
        poster={coverOf(story.videoUrl, story.coverAt)}
        controls={started}
        playsInline
        preload="none"
        onPlay={(e) => { setStarted(true); onPlay(e); }}
        className="block h-full w-full object-cover"
        aria-label={`Video review by ${story.author}`}
      />
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={`Play video review by ${story.author}`}
          className="group absolute inset-0 block cursor-pointer border-0 bg-brand-ink p-0"
        >
          {/* cover photo: the client's face from the video */}
          <img
            src={coverOf(story.videoUrl, story.coverAt)}
            alt={`${story.author}, Urbane Living client, sharing a video review`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" aria-hidden="true" />
          {/* name bottom-left, play button bottom-right, so the face stays visible */}
          <span className="absolute bottom-3 left-3 max-w-[70%] truncate rounded-full bg-black/60 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
            {story.author}
          </span>
          <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-[22px] text-white shadow-[0_8px_22px_rgba(228,11,18,0.45)] transition group-hover:scale-110">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-red/40" aria-hidden="true" />
            <CaretRightFilled className="relative ml-0.5" />
          </span>
        </button>
      )}
    </div>
  );
};

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
        <div className="flex flex-col items-center gap-2 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="stories-title"
            eyebrow="CLIENT STORIES"
            title="Heard from us? Now hear our"
            highlight="clients’ stories"
            className="lg:!mx-0 lg:!mb-0 lg:text-left"
          />
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
          className="-mx-4 mb-0 mt-2 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {stories.map((s) => (
            <li key={s.id} className="flex w-[85%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-solid border-gray-100 bg-white shadow-card sm:w-[60%] lg:w-auto">
              <StoryVideo story={s} onPlay={onPlay} />
              <figure className="m-0 flex flex-1 flex-col p-5">
                <span aria-hidden="true" className="h-6 font-serif text-5xl leading-none text-brand-red/40">“</span>
                <blockquote className="m-0 mt-1 flex-1 text-sm leading-relaxed text-gray-600">{s.quote}</blockquote>
                <figcaption className="mt-4 flex items-center gap-3 border-0 border-t border-solid border-gray-100 pt-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
                    {initials(s.author)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-navy">{s.author}</span>
                    <span className="block text-xs text-gray-500">Urbane Living client</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {/* Dots (phones / tablets): 24px tap area, small dot inside */}
        {stories.length > 1 && (
          <div className="mt-3 flex justify-center gap-1 lg:hidden">
            {stories.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Show story ${i + 1}`}
                aria-current={active === i ? 'true' : undefined}
                onClick={() => goTo(i)}
                className="flex h-6 min-w-6 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
              >
                <span className={`block h-2 rounded-full transition-all ${active === i ? 'w-6 bg-brand-red' : 'w-2 bg-gray-300'}`} />
              </button>
            ))}
          </div>
        )}

        {/* CTA on phones */}
        <div className="mt-6 text-center lg:hidden">
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