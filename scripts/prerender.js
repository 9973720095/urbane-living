/*
  Pre-rendering for Google (run AFTER the normal build):

      node scripts/prerender.js

  What it does
  - Opens every page of the website in a hidden Chrome (the pages from public/sitemap.xml,
    plus the blogs added from the admin panel / Google Sheet) and saves the finished HTML:
        /                      -> build/index.html
        /false-ceiling         -> build/false-ceiling.html
        /interior-designers/x  -> build/interior-designers/x.html
  - Google then gets the real title, description, canonical link, text, links and
    structured data straight away, without waiting for JavaScript.
  - Visitors see the same website as before (React takes over after loading).
  - build/200.html = the empty app shell, used by .htaccess for all other URLs
    (admin, estimate, 404 ...), so those never show the home page HTML.

  First time only:  npm install --save-dev puppeteer
*/
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const BUILD = path.join(__dirname, '..', 'build');
const SITEMAP = path.join(__dirname, '..', 'public', 'sitemap.xml');
const SITE = 'https://urbaneliving.in';
const BLOG_SITEMAP_API = 'https://urbane-living.onrender.com/api/blogs/sitemap.xml';
const PORT = 45678;
const PARALLEL = 3;

// Requests that must never run while pre-rendering (no fake visits in Analytics / Meta)
const BLOCKED = /googletagmanager|google-analytics|analytics\.google|doubleclick|facebook\.(com|net)|fbcdn|clarity\.ms|hotjar/i;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp', '.txt': 'text/plain',
  '.xml': 'application/xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.map': 'application/json',
};

const log = (...a) => console.log('[prerender]', ...a);

// ---------- 1. Which pages ----------
const locsFrom = (xml) =>
  [...String(xml).matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(SITE))
    .map((u) => u.slice(SITE.length) || '/')
    .map((p) => (p.length > 1 ? p.replace(/\/+$/, '') : p));

const fetchText = (url, timeoutMs = 90000) =>
  new Promise((resolve) => {
    const req = https.get(url, { timeout: timeoutMs }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return resolve(''); }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => { body += c; });
      res.on('end', () => resolve(body));
    });
    req.on('timeout', () => req.destroy());
    req.on('error', () => resolve(''));
  });

// ---------- 2. Small local server for the build folder ----------
const startServer = (shellHtml) =>
  new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(BUILD, urlPath);
      const isAsset = path.extname(urlPath) && file.startsWith(BUILD) && fs.existsSync(file) && fs.statSync(file).isFile();
      if (isAsset) {
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
        fs.createReadStream(file).pipe(res);
        return;
      }
      // every page gets the empty app shell (like Hostinger's .htaccess)
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      res.end(shellHtml);
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });

// ---------- 3. Render one page ----------
const renderPage = async (browser, route) => {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1366, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 UrbanePrerender');
    await page.setRequestInterception(true);
    page.on('request', (r) => {
      const type = r.resourceType();
      if (BLOCKED.test(r.url()) || type === 'media' || type === 'image' || type === 'font') r.abort();
      else r.continue();
    });

    try {
      await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 90000 });
    } catch (e) {
      // a slow API (Render waking up) is fine, we still take what has rendered
    }
    // wait until the page has its content (no loading skeletons left)
    await page
      .waitForFunction(
        () => document.querySelector('#root h1') && !document.querySelector('#root [aria-busy="true"]'),
        { timeout: 30000 },
      )
      .catch(() => {});
    await new Promise((r) => setTimeout(r, 600));

    const expected = `${SITE}${route === '/' ? '/' : route}`;
    const result = await page.evaluate((pageUrl) => {
      // every saved page gets its own canonical link + og:url (the home page sets none itself)
      if (!document.querySelector('link[rel="canonical"]')) {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = pageUrl;
        document.head.appendChild(link);
      }
      if (!document.querySelector('meta[property="og:url"]')) {
        const og = document.createElement('meta');
        og.setAttribute('property', 'og:url');
        og.content = pageUrl;
        document.head.appendChild(og);
      }
      // things that must not be saved in the static HTML
      document.querySelectorAll(
        '.hero-video, .ant-message, .ant-notification, .ant-modal-root, .ant-select-dropdown, .ant-image-preview-root, #webpack-dev-server-client-overlay',
      ).forEach((el) => el.remove());
      // structured data added by the app (page schema, FAQ, services list) is added again when the
      // app starts: mark the saved copies so src/index.js removes them first (no duplicates).
      // The first one is the business schema written in public/index.html, it stays.
      const ld = [...document.head.querySelectorAll('script[type="application/ld+json"]')];
      ld.slice(1).forEach((s) => s.setAttribute('data-prerendered', 'true'));
      const robots = document.querySelector('meta[name="robots"]');
      return {
        html: `<!DOCTYPE html>\n${document.documentElement.outerHTML}`,
        title: document.title,
        h1: !!document.querySelector('#root h1'),
        noindex: !!(robots && /noindex/i.test(robots.content)),
        canonical: (document.querySelector('link[rel="canonical"]') || {}).href || '',
      };
    }, expected);
    return result;
  } finally {
    await page.close();
  }
};

const outFile = (route) => (route === '/' ? path.join(BUILD, 'index.html') : path.join(BUILD, `${route.replace(/^\//, '')}.html`));

// ---------- main ----------
(async () => {
  if (!fs.existsSync(path.join(BUILD, 'index.html'))) {
    console.error('[prerender] build/index.html not found. Run the build first.');
    process.exit(1);
  }

  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch (e) {
    console.error('[prerender] Puppeteer is missing. Run once:  npm install --save-dev puppeteer');
    process.exit(1);
  }

  // empty app shell: always taken from a fresh build (never from an already pre-rendered file)
  const shellPath = path.join(BUILD, '200.html');
  const indexHtml = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
  if (!indexHtml.includes('data-prerendered-page')) fs.writeFileSync(shellPath, indexHtml);
  const shellHtml = fs.readFileSync(shellPath, 'utf8');

  const routes = new Set(locsFrom(fs.readFileSync(SITEMAP, 'utf8')));
  log('Pages in sitemap.xml:', routes.size);
  log('Getting admin / sheet blogs from the backend (can take up to a minute if it is asleep)...');
  const blogXml = await fetchText(BLOG_SITEMAP_API);
  const blogRoutes = locsFrom(blogXml);
  blogRoutes.forEach((r) => routes.add(r));
  log('Blogs from backend:', blogRoutes.length);

  const server = await startServer(shellHtml);
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    // --disable-web-security: this hidden Chrome runs on 127.0.0.1, which the backend's CORS list
    // does not include. Without it, data from the backend (admin / sheet blogs, designs) can't load.
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-web-security'],
  });

  const list = [...routes];
  const done = [];
  const failed = [];
  let next = 0;

  const worker = async () => {
    while (next < list.length) {
      const route = list[next];
      next += 1;
      try {
        const r = await renderPage(browser, route);
        const expected = `${SITE}${route === '/' ? '/' : route}`;
        if (!r.title) throw new Error('no title');
        if (!r.h1 || r.noindex) throw new Error(r.noindex ? 'page is noindex / not found' : 'no H1 rendered');
        if (r.canonical && r.canonical !== expected) throw new Error(`canonical is ${r.canonical}`);
        const html = r.html.replace('<html', '<html data-prerendered-page="true"');
        const file = outFile(route);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
        done.push(route);
        log(`✔ ${route}  (${r.title})`);
      } catch (err) {
        failed.push(`${route}: ${err.message}`);
        log(`✖ ${route}  ${err.message}`);
      }
    }
  };

  await Promise.all(Array.from({ length: PARALLEL }, worker));
  await browser.close();
  server.close();

  log('');
  log(`Done: ${done.length} pages saved, ${failed.length} skipped.`);
  if (failed.length) {
    log('Skipped pages still work normally (the app loads them), they just are not pre-rendered:');
    failed.forEach((f) => log('  -', f));
  }
  log('Upload the WHOLE build folder to Hostinger (including the new .html files and folders).');
})();