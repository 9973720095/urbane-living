import React, { useEffect, useRef } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { process } from '../data/siteData';

// Cloudinary: let it pick the best quality / format for each device (smaller downloads)
const optimise = (url = '') =>
  url.includes('res.cloudinary.com') && !/\/upload\/[^/]*q_auto/.test(url)
    ? url.replace('/upload/', '/upload/q_auto,f_auto/')
    : url;

// Plays only while on screen, so 4 reels don't all download and run at once
const StepVideo = ({ src, poster, label }) => {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !('IntersectionObserver' in window)) return undefined;
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
      src={optimise(src)}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
};

const ProcessSection = () => {
  const { steps } = process;

  return (
    <section aria-labelledby="process-title" className="overflow-hidden bg-white px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-10 max-w-[680px] text-center lg:mb-14">
          <h2 id="process-title" className="m-0 text-[26px] font-semibold leading-tight text-brand-navy sm:text-4xl lg:text-[42px]">
            {process.title} <span className="text-brand-red">{process.highlight}</span>
          </h2>
          {process.subtitle && <p className="m-0 mt-3 text-[15px] text-gray-500 sm:text-base">{process.subtitle}</p>}
        </div>

        {/* swipe on mobile, 2 per row on tablet, 4 in a line on desktop */}
        <ol className="-mx-4 m-0 flex list-none snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 p-0 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.stage} className="flex w-[72%] shrink-0 snap-center flex-col items-center text-center sm:w-auto">
              {/* Stage circle; the line joins it to the next stage on desktop */}
              <div className="relative mb-5 flex w-full justify-center">
                <div className="relative z-[2] flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full border-[1.5px] border-solid border-brand-red/35 bg-white shadow-[0_6px_16px_rgba(228,11,18,0.10)]">
                  <span className="text-lg font-semibold leading-none text-brand-red">{step.stage}</span>
                  <span className="mt-1 text-[10px] tracking-wide text-gray-400">STAGE</span>
                </div>
                {index < steps.length - 1 && (
                  <span aria-hidden="true" className="absolute left-1/2 top-1/2 z-[1] hidden h-px w-[calc(100%+24px)] bg-gradient-to-r from-brand-red/40 to-brand-blue/40 lg:block" />
                )}
              </div>

              <h3 className="m-0 text-lg font-semibold text-brand-navy">{step.heading}</h3>
              <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-500">
                <ClockCircleOutlined className="text-brand-red" /> {step.duration}
              </span>

              {/* 9:16 reel frame, nothing cropped on any screen */}
              <div className="relative mt-5 aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-2xl bg-brand-navy shadow-card">
                {step.video ? (
                  <StepVideo src={step.video} poster={step.img} label={`${step.heading} - false ceiling work in progress`} />
                ) : (
                  <img src={step.img} alt={step.heading} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                )}
              </div>
            </li>
          ))}
        </ol>

        {process.note && <p className="m-0 mt-6 text-center text-xs text-gray-400">{process.note}</p>}
      </div>
    </section>
  );
};

export default ProcessSection;