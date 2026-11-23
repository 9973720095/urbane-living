// Shows visitors that a sideways list has more items (works on every page, no change needed in sections):
//  1. the edge where more items wait fades out (data-swipe="right" | "left" | "both", styles in index.css)
//  2. the first time a list comes into view, it peeks a little to the right and back (like mobile apps)
// Any element with Tailwind's `overflow-x-auto` that can scroll sideways is picked up automatically.

const SELECTOR = '[class*="overflow-x-auto"]';
const watched = new WeakSet();
const peeked = new WeakSet();
const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const canScroll = (el) => {
  const ox = getComputedStyle(el).overflowX;
  return (ox === 'auto' || ox === 'scroll') && el.scrollWidth - el.clientWidth > 8;
};

const update = (el) => {
  if (!canScroll(el)) {
    if (el.hasAttribute('data-swipe')) el.removeAttribute('data-swipe');
    return;
  }
  const left = el.scrollLeft > 4;
  const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
  const state = left && right ? 'both' : right ? 'right' : left ? 'left' : '';
  if (state) el.setAttribute('data-swipe', state);
  else el.removeAttribute('data-swipe');
};

// small nudge to the right and back, once per list
const peek = (el) => {
  if (peeked.has(el) || reduceMotion() || !canScroll(el) || el.scrollLeft > 4) return;
  peeked.add(el);
  const snap = el.style.scrollSnapType;
  el.style.scrollSnapType = 'none'; // snapping would jump to the next card instead of a small peek
  el.scrollTo({ left: Math.min(56, el.scrollWidth - el.clientWidth), behavior: 'smooth' });
  setTimeout(() => {
    el.scrollTo({ left: 0, behavior: 'smooth' });
    setTimeout(() => { el.style.scrollSnapType = snap; }, 500);
  }, 650);
};

let io;
const watch = (el) => {
  if (watched.has(el) || el.closest('.ul-tb, .admin-layout')) return;
  watched.add(el);
  el.addEventListener('scroll', () => update(el), { passive: true });
  if (io) io.observe(el);
};

const scan = () => {
  document.querySelectorAll(SELECTOR).forEach((el) => {
    watch(el);
    update(el);
  });
};

export const startSwipeHints = () => {
  if (typeof window === 'undefined' || window.location.hostname === '127.0.0.1') return; // not in the pre-render
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.6) setTimeout(() => peek(e.target), 400);
      }),
      { threshold: [0.6] },
    );
  }
  let timer;
  const later = () => { clearTimeout(timer); timer = setTimeout(scan, 250); };
  scan();
  window.addEventListener('resize', later);
  window.addEventListener('load', later);
  // pages and sections appear after route changes and data loads
  new MutationObserver(later).observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
};
