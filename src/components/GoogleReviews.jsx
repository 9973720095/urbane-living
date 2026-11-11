import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StarFilled, ArrowRightOutlined, EditOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { reviews } from '../data/reviews';
import { API_BASE_URL, gallery, contact } from '../data/siteData';
import { localCities } from '../data/localSeo';
import SectionHeading from './SectionHeading';

// Google "G" logo (brand colours)
const GoogleG = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.3 6.9-17.7z" />
    <path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.2 1.5-5 2.3-8.2 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z" />
  </svg>
);

// Stars with half-star support (4.5 -> 4 full + 1 half)
const Stars = ({ value, className = '' }) => (
  <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => {
      const fill = Math.max(0, Math.min(1, value - (n - 1)));
      return (
        <span key={n} className="relative inline-flex text-gray-200">
          <StarFilled />
          {fill > 0 && (
            <span className="absolute inset-0 overflow-hidden text-[#FBBC05]" style={{ width: `${Math.round(fill * 100)}%` }}>
              <StarFilled />
            </span>
          )}
        </span>
      );
    })}
  </span>
);

// Home page: project photos + live Google rating + cities + latest Google reviews.
export default function GoogleReviews({ onOpenForm }) {
  const [live, setLive] = useState(null);

  // Live data from our backend (which asks Google). Render can take ~30 sec to wake up.
  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 60000);
    fetch(`${API_BASE_URL}/api/google-reviews`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d && d.rating) setLive(d); })
      .catch(() => {})
      .finally(() => clearTimeout(timer));
    return () => { clearTimeout(timer); ctrl.abort(); };
  }, []);

  const rating = live?.rating || reviews.rating;
  const total = live?.total || reviews.totalReviews;
  const mapsUrl = live?.mapsUrl || reviews.googleUrl;
  const writeUrl = live?.writeReviewUrl || reviews.writeReviewUrl;
  const list = (live?.reviews?.length ? live.reviews : reviews.items).filter((r) => r && r.text && r.stars >= 4);
  const photos = gallery.items.slice(0, 5);

  return (
    <section aria-labelledby="reviews-title" className="bg-white px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          id="reviews-title"
          eyebrow={reviews.eyebrow}
          title={reviews.title}
          highlight={reviews.highlight}
          subtitle={reviews.subtitle}
        />

        <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          {/* Left: project photos + "your home next" tile */}
          <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3 sm:gap-3">
            {photos.map((p) => (
              <li key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-soft sm:aspect-[1/1]">
                <img src={p.src} alt={`${p.title} by Urbane Living`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 text-[12.5px] font-semibold text-white sm:text-[13px]">
                  {p.title}
                </span>
              </li>
            ))}
            <li className="aspect-[4/3] sm:aspect-[1/1]">
              <button
                type="button"
                onClick={onOpenForm}
                className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-0 bg-brand-red p-3 text-center text-white transition hover:bg-brand-red-dark"
              >
                <span className="text-[17px] font-bold leading-tight sm:text-[20px]">Your home next</span>
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/90">
                  Free consultation <ArrowRightOutlined />
                </span>
              </button>
            </li>
          </ul>

          {/* Right: Google rating + cities + studio */}
          <div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-solid border-gray-100 bg-white p-5 no-underline shadow-card transition hover:shadow-card-hover"
            >
              <GoogleG size={52} />
              <div className="min-w-0">
                {rating > 0 ? (
                  <>
                    <p className="m-0 text-[15px] text-gray-500">
                      <span className="text-[26px] font-bold text-brand-navy">{rating.toFixed(1)}</span>/5
                      {total > 0 && <span className="ml-1.5">({total} Google reviews)</span>}
                    </p>
                    <Stars value={rating} className="mt-1 text-[20px]" />
                  </>
                ) : (
                  <>
                    <p className="m-0 text-[18px] font-semibold text-brand-navy">Rated by our clients on Google</p>
                    <p className="m-0 mt-1 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-red">
                      Read our reviews <ArrowRightOutlined />
                    </p>
                  </>
                )}
              </div>
            </a>

            <h3 className="m-0 mt-7 text-[18px] font-semibold text-brand-navy sm:text-[20px]">{reviews.citiesTitle}</h3>
            <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
              {localCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/interior-designers/${c.slug}`}
                    className="inline-block rounded-full border border-solid border-gray-200 px-3.5 py-1.5 text-[13.5px] font-medium text-brand-navy no-underline transition hover:border-brand-red hover:text-brand-red"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="m-0 mt-6 flex items-start gap-2.5 text-[14.5px] leading-relaxed text-gray-600">
              <EnvironmentOutlined className="mt-1 text-brand-red" />
              <span>
                <span className="font-semibold text-brand-navy">{reviews.studio}</span>
                <br />
                {contact.address}
              </span>
            </p>
          </div>
        </div>

        {/* Latest Google reviews (live). Swipe on phones, grid on desktop */}
        {list.length > 0 && (
          <ul className="-mx-4 m-0 mt-10 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
            {list.map((r) => (
              <li
                key={`${r.name}-${r.when}`}
                className="flex w-[84%] shrink-0 snap-center flex-col rounded-2xl border border-solid border-gray-100 bg-brand-soft p-5 sm:w-auto"
              >
                <div className="flex items-center gap-3">
                  {r.photo ? (
                    <img src={r.photo} alt="" width="40" height="40" loading="lazy" referrerPolicy="no-referrer" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-[15px] font-semibold text-white">
                      {r.name.trim().charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    {r.authorUrl ? (
                      <a href={r.authorUrl} target="_blank" rel="noopener noreferrer" className="block truncate text-[15px] font-semibold text-brand-navy no-underline hover:underline">
                        {r.name}
                      </a>
                    ) : (
                      <p className="m-0 truncate text-[15px] font-semibold text-brand-navy">{r.name}</p>
                    )}
                    {r.when && <p className="m-0 text-xs text-gray-400">{r.when}</p>}
                  </div>
                  <GoogleG />
                </div>
                <Stars value={r.stars} className="mt-3 text-[14px]" />
                <p className="m-0 mt-2 line-clamp-6 text-[14.5px] leading-relaxed text-gray-600">{r.text}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Links to Google */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-6 text-[15px] font-semibold text-white no-underline transition hover:bg-brand-ink sm:w-auto"
          >
            <GoogleG /> Read all reviews on Google
          </a>
          {writeUrl && (
            <a
              href={writeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-solid border-brand-navy/20 bg-white px-6 text-[15px] font-semibold text-brand-navy no-underline transition hover:border-brand-navy sm:w-auto"
            >
              <EditOutlined /> Write a review
            </a>
          )}
        </div>
      </div>
    </section>
  );
}