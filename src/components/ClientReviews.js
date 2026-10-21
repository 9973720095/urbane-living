import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { API_BASE_URL, blogPage } from '../data/siteData';

const { reviews: text } = blogPage;
const PAGE_SIZE = 6; // 2 rows of 3, then pagination

const Stars = ({ value, className = '' }) => (
  <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <StarFilled key={n} className={n <= Math.round(value) ? 'text-brand-gold' : 'text-gray-200'} />
    ))}
  </span>
);

// Review video: .mp4 file -> <video>, YouTube / Vimeo / Drive -> embedded player.
// Tall 4:5 frame so phone (vertical) videos show the full face; nothing is cropped.
const ReviewVideo = ({ src, name }) => (
  <div className="relative mb-5 aspect-[4/5] w-full overflow-hidden rounded-xl bg-black">
    {/\.(mp4|webm|ogg|mov)(\?|$)/i.test(src) ? (
      <video src={src} controls playsInline preload="metadata" className="absolute inset-0 h-full w-full object-contain" />
    ) : (
      <iframe
        src={src}
        title={`Video review by ${name}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    )}
  </div>
);

// Photo with a fallback to the first letter if the image link is broken
const Avatar = ({ photo, name }) => {
  const [failed, setFailed] = useState(false);
  if (photo && !failed) {
    return <img src={photo} alt={name} loading="lazy" onError={() => setFailed(true)} className="h-11 w-11 rounded-full object-cover" />;
  }
  return (
    <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-base font-semibold text-white">
      {name.charAt(0).toUpperCase()}
    </span>
  );
};

// Client reviews (data from the "Reviews" tab of the Google Sheet via /api/reviews)
const ClientReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/reviews`)
      .then((res) => setReviews(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error('Error fetching reviews:', err));
  }, []);

  // Nothing to show yet -> no empty section on the page
  if (!reviews.length) return null;

  const average = reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length;
  const visible = reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (next) => {
    setPage(next);
    document.getElementById('reviews-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section aria-labelledby="reviews-title" className="bg-brand-soft px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-red">
            {text.tag}
          </span>
          <h2 id="reviews-title" className="m-0 scroll-mt-28 text-[26px] font-semibold text-brand-navy sm:text-[34px]">
            {text.title}
          </h2>
          <p className="m-0 mt-2 max-w-[560px] text-[15px] text-gray-500 sm:text-base">{text.subtitle}</p>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-card">
            <span className="text-2xl font-bold text-brand-navy">{average.toFixed(1)}</span>
            <Stars value={average} className="text-lg" />
            <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
          </div>
        </div>

        {/* Cards: swipe on mobile, 3 in a row from tablet up */}
        <ul className="-mx-4 m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 lg:gap-6">
          {visible.map((r) => (
            <li key={r._id} className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto">
              <figure className="m-0 flex h-full flex-col rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover lg:p-6">
                {r.video && <ReviewVideo src={r.video} name={r.name} />}

                <div className="mb-4 flex items-center justify-between">
                  <Stars value={Number(r.rating)} />
                  <span aria-hidden="true" className="font-serif text-5xl leading-none text-brand-red/15">“</span>
                </div>

                <blockquote className="m-0 flex-1 text-[15px] leading-relaxed text-gray-600">
                  {r.review}
                </blockquote>

                {r.project && (
                  <span className="mt-4 self-start rounded-md bg-brand-blue/10 px-2.5 py-1 text-xs font-medium text-brand-blue">
                    {r.project}
                  </span>
                )}

                <figcaption className="mt-5 flex items-center gap-3 border-0 border-t border-solid border-gray-100 pt-5">
                  <Avatar photo={r.photo} name={r.name} />
                  <span className="flex flex-col">
                    <cite className="text-sm font-semibold not-italic text-brand-navy">{r.name}</cite>
                    {r.location && <span className="text-xs text-gray-500">{r.location}</span>}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {reviews.length > PAGE_SIZE && (
          <nav aria-label="Review pages" className="mt-8 flex justify-center">
            <Pagination
              current={page}
              total={reviews.length}
              pageSize={PAGE_SIZE}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </nav>
        )}
      </div>
    </section>
  );
};

export default ClientReviews;