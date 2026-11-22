// Sections added from Admin -> Page Sections. Loaded before the app starts (same way as the
// Website Images: src/utils/siteImages.js), so pages can show them straight away:
//   1. this browser's saved copy from the last visit
//   2. the copy baked into the pre-rendered page at build time (window.__PAGE_SECTIONS__)
// A fresh copy is fetched in the background and saved for the next visit.
// The pre-render script waits for the fresh copy, so Google gets the sections in the page itself.
import { API_BASE_URL } from '../data/config';

const CACHE_KEY = 'ul_page_sections';
const isPrerender = () => window.location.hostname === '127.0.0.1';

let sections = [];
const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());

// Pages re-draw their sections when a fresh copy arrives (no rebuild needed for new sections)
export const subscribePageSections = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

const fetchSections = (timeoutMs) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), timeoutMs);
    fetch(`${API_BASE_URL}/api/page-sections`)
      .then((r) => (r.ok ? r.json() : null))
      .then((list) => { clearTimeout(timer); resolve(Array.isArray(list) ? list : null); })
      .catch(() => { clearTimeout(timer); resolve(null); });
  });

export const savePageSections = (list) => {
  const next = Array.isArray(list) ? list : [];
  const changed = JSON.stringify(next) !== JSON.stringify(sections);
  sections = next;
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(sections)); } catch (e) { /* storage blocked */ }
  if (changed) notify();
};

const readSaved = () => {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (e) { return null; }
};

const bakeIntoPage = (list) => {
  const el = document.createElement('script');
  el.id = 'page-sections';
  el.textContent = `window.__PAGE_SECTIONS__=${JSON.stringify(list).replace(/</g, '\\u003c')};`;
  document.head.appendChild(el);
};

export const loadPageSections = async () => {
  if (isPrerender()) {
    const fresh = window.__PAGE_SECTIONS__ || (await fetchSections(15000)) || [];
    sections = fresh;
    bakeIntoPage(fresh);
    return;
  }
  const saved = readSaved();
  sections = Array.isArray(saved) ? saved : (window.__PAGE_SECTIONS__ || []);
  fetchSections(20000).then((fresh) => fresh && savePageSections(fresh));
};

// Visible sections for one spot of one page, in order
export const getSections = (page, at) =>
  sections
    .filter((s) => s.page === page && s.position === at && s.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
