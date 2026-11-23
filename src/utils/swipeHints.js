// Shows visitors that a sideways list has more items (works on every page, no change needed in sections):
//  1. the edge where more items wait fades out (data-swipe="right" | "left" | "both", styles in index.css)
//  2. the first time a list comes into view, it peeks a little to the right and back (like mobile apps)
//  3. a small round arrow sits on the right edge while more items wait (tap = slide on)
// Any element with Tailwind's `overflow-x-auto` that can scroll sideways is picked up automatically.

const SELECTOR = '[class*="overflow-x-auto"]';
const watched = new WeakSet();
const peeked = new WeakSet();
const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const canScroll = (el) => {
  const ox = getComputedStyle(el).overflowX;
  return (ox === 'auto' || ox === 'scroll') && el.scrollWidth - el.clientWidth > 8;
};

const arrows = new WeakMap();
const CHEVRON =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

// the arrow lives next to the list (not inside it), so it stays put while the list scrolls
const arrowFor = (el) => {
  if (arrows.has(el)) return arrows.get(el);
  const parent = el.parentElement;
  if (!parent) return null;
  // lists that already have their own arrow buttons (e.g. video reels on bigger screens) skip it there
  const own = parent.querySelector(':scope > button[aria-label^="Next"]');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `ul-swipe-arrow${own ? ' ul-swipe-arrow--phone' : ''}`;
  btn.setAttribute('aria-hidden', 'true'); // swiping and keyboard scrolling already work; this is a visual hint
  btn.tabIndex = -1;
  btn.innerHTML = CHEVRON;
  btn.addEventListener('click', () => el.scrollBy({ left: Math.max(160, el.clientWidth * 0.7), behavior: 'smooth' }));
  if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
  parent.appendChild(btn);
  arrows.set(el, btn);
  return btn;
};

const placeArrow = (el, show) => {
  const btn = show ? arrowFor(el) : arrows.get(el);
  if (!btn) return;
  btn.classList.toggle('is-on', show);
  if (!show) return;
  const s = el.getBoundingClientRect();
  const p = el.parentElement.getBoundingClientRect();
  btn.style.top = `${s.top - p.top + s.height / 2}px`;
  btn.style.right = `${Math.max(p.right - s.right, -12) + 6}px`;
};

const update = (el) => {
  if (!canScroll(el)) {
    if (el.hasAttribute('data-swipe')) el.removeAttribute('data-swipe');
    placeArrow(el, false);
    return;
  }
  const left = el.scrollLeft > 4;
  const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
  const state = left && right ? 'both' : right ? 'right' : left ? 'left' : '';
  if (state) el.setAttribute('data-swipe', state);
  else el.removeAttribute('data-swipe');
  placeArrow(el, right);
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
