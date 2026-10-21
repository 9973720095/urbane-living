import { useEffect } from 'react';
import { siteUrl } from '../data/siteData';

// Finds (or creates) a <meta>/<link> tag in <head> and remembers its old value
const upsert = (selector, create, attr, value, restore) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
    restore.push(() => el.remove());
  } else {
    const old = el.getAttribute(attr);
    restore.push(() => el.setAttribute(attr, old));
  }
  el.setAttribute(attr, value);
};

const meta = (key, value, restore, isProperty = false) => {
  const attr = isProperty ? 'property' : 'name';
  upsert(
    `meta[${attr}="${key}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute(attr, key);
      return m;
    },
    'content',
    value,
    restore,
  );
};

/*
  Per-page SEO for this single-page app.
  useSeo({ title, description, path, image, schema })
  Values are restored when the page unmounts, so other pages keep the defaults from index.html.
*/
const useSeo = ({ title, description, path = '/', image, schema } = {}) => {
  useEffect(() => {
    const restore = [];
    const url = `${siteUrl}${path}`;

    if (title) {
      const oldTitle = document.title;
      document.title = title;
      restore.push(() => { document.title = oldTitle; });
      meta('og:title', title, restore, true);
      meta('twitter:title', title, restore);
    }
    if (description) {
      meta('description', description, restore);
      meta('og:description', description, restore, true);
      meta('twitter:description', description, restore);
    }
    if (image) {
      meta('og:image', image, restore, true);
      meta('twitter:image', image, restore);
    }
    meta('og:url', url, restore, true);
    upsert(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link');
        l.setAttribute('rel', 'canonical');
        return l;
      },
      'href',
      url,
      restore,
    );

    // Structured data (JSON-LD) for Google rich results
    (schema || []).forEach((data) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-page-seo', path);
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      restore.push(() => s.remove());
    });

    return () => restore.reverse().forEach((fn) => fn());
  }, [title, description, path, image, schema]);
};

export default useSeo;