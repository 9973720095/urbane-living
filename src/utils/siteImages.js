// Photos changed from Admin -> Website Images (page / section wise).
// They must be known BEFORE the app starts, because the page data (data/*.js) picks its photos
// when it loads. Order of sources:
//   1. this browser's saved copy from the last visit (freshest)
//   2. the copy baked into the pre-rendered page at build time (window.__SITE_IMAGES__)
// A fresh copy is then fetched in the background and saved for the next visit.
// The pre-render script (scripts/prerender.js, runs on 127.0.0.1) waits for the fresh copy instead,
// so Google and first-time visitors get the admin's photos in the page itself.
import { setImageOverrides } from '../data/media';
import { API_BASE_URL } from '../data/config';

const CACHE_KEY = 'ul_site_images';
const isPrerender = () => window.location.hostname === '127.0.0.1';

const fetchOverrides = (timeoutMs) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), timeoutMs);
    fetch(`${API_BASE_URL}/api/site-images`)
      .then((r) => (r.ok ? r.json() : null))
      .then((map) => { clearTimeout(timer); resolve(map && typeof map === 'object' ? map : null); })
      .catch(() => { clearTimeout(timer); resolve(null); });
  });

export const saveImageOverrides = (map) => {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(map || {})); } catch (e) { /* storage blocked */ }
};

const readSaved = () => {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (e) { return null; }
};

// Bake the photos into the saved (pre-rendered) HTML
const bakeIntoPage = (map) => {
  const el = document.createElement('script');
  el.id = 'site-images';
  el.textContent = `window.__SITE_IMAGES__=${JSON.stringify(map).replace(/</g, '\\u003c')};`;
  document.head.appendChild(el);
};

export const loadImageOverrides = async () => {
  if (isPrerender()) {
    // scripts/prerender.js fetches the photos once and hands them over (window.__SITE_IMAGES__)
    const fresh = window.__SITE_IMAGES__ || (await fetchOverrides(15000)) || {};
    setImageOverrides(fresh);
    bakeIntoPage(fresh);
    return;
  }
  setImageOverrides(readSaved() || window.__SITE_IMAGES__ || {});
  // refresh in the background for the next visit (never blocks the page)
  fetchOverrides(20000).then((fresh) => fresh && saveImageOverrides(fresh));
};
