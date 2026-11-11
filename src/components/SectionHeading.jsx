import React from 'react';

// One heading style for every home page section:
// small red pill (eyebrow) + navy title with a red highlight + grey subtitle.
// dark = for sections on a navy background.
export default function SectionHeading({ id, eyebrow, title, highlight, subtitle, dark = false, align = 'center', className = '' }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : 'text-left'} mb-8 max-w-[720px] lg:mb-10 ${className}`}>
      {eyebrow && (
        <span
          className={`mb-3 inline-block rounded-full px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] ${
            dark ? 'bg-white/10 text-brand-gold' : 'bg-brand-red/10 text-brand-red-dark'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className={`m-0 text-[26px] font-semibold leading-tight sm:text-[36px] lg:text-[40px] ${dark ? 'text-white' : 'text-brand-navy'}`}
      >
        {title}
        {highlight && <> <span className="whitespace-nowrap text-brand-red">{highlight}</span></>}
      </h2>
      {subtitle && (
        <p className={`m-0 mt-3 text-[15px] leading-relaxed sm:text-base ${dark ? 'text-white/75' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}