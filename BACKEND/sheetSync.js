// Google Sheet -> MongoDB sync (one tab per collection).
//
// Each tab's CSV link goes in .env:
//   SHEET_DESIGNS_CSV_URL  -> "Designs" tab -> False Ceiling page "Explore Our Designs"
//   SHEET_BLOGS_CSV_URL    -> "Blogs" tab   -> Blog page + blog details
//   SHEET_REVIEWS_CSV_URL  -> "Reviews" tab -> client reviews on the Blog page
//   SHEET_SYNC_MINUTES     -> how often to read the sheet (default 5)
// Every few minutes the server reads each tab and creates / updates / removes the rows that came
// from the sheet. Anything added by hand in the admin panel is never touched.
//
// "Designs" tab headers: ID | Title | Price | Category | Style | Image | Active
// "Blogs" tab headers:   ID | Title | Description | Content | Image | Category | Author | Date | Video | Active
// "Reviews" tab headers: ID | Name | Location | Rating | Review | Photo | Video | Project | Date | Active
//   ID     - your own unique code per row, e.g. D001 / B001 (required, never change it)
//   Active - "No" hides the row from the website and admin; empty / "Yes" shows it

const https = require('https');
const http = require('http');

// Download a URL as text, following Google's redirects
const fetchText = (url, redirects = 5) =>
  new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 20000 }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        res.resume();
        if (redirects <= 0) return reject(new Error('Too many redirects'));
        const next = new URL(res.headers.location, url).toString();
        return resolve(fetchText(next, redirects - 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`Sheet download failed (HTTP ${res.statusCode}) - is the sheet shared as "Anyone with the link"?`));
      }
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (/^\s*<(!doctype|html)/i.test(body)) {
          return reject(new Error('Got a web page instead of CSV - share the sheet as "Anyone with the link: Viewer"'));
        }
        return resolve(body);
      });
    });
    req.on('timeout', () => req.destroy(new Error('Sheet download timed out')));
    req.on('error', reject);
  });

// Minimal CSV parser (handles quotes, commas and new lines inside quotes)
const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const src = text.replace(/^\uFEFF/, '');

  for (let i = 0; i < src.length; i += 1) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"' && src[i + 1] === '"') { field += '"'; i += 1; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i += 1;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
};

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// YouTube / Vimeo / Google Drive / .mp4 link -> playable URL ('' if it is not a video link)
//   YouTube & Vimeo -> their embed player, Drive -> /preview player, .mp4/.webm -> the file itself
const videoUrl = (link) => {
  const url = (link || '').trim();
  const yt = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  const drive = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]{20,})/i);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;
  if (/^https?:\/\/\S+\.(mp4|webm|ogg|mov)(\?\S*)?$/i.test(url)) return url;
  return '';
};

const isFileVideo = (src) => /\.(mp4|webm|ogg|mov)(\?\S*)?$/i.test(src);

// Video link -> responsive video player HTML for blog content ('' if it is not a video link)
const videoEmbed = (link) => {
  const src = videoUrl(link);
  if (!src) return '';
  if (isFileVideo(src)) {
    return `<video src="${src}" controls playsinline preload="metadata" style="width:100%;margin:24px 0;border-radius:12px;background:#000"></video>`;
  }
  return (
    `<div class="blog-video" style="position:relative;padding-top:56.25%;margin:24px 0;border-radius:12px;overflow:hidden;background:#000">` +
    `<iframe src="${src}" title="Video" style="position:absolute;inset:0;width:100%;height:100%;border:0" ` +
    `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
  );
};

const HTML_TAG = /<\/?(p|h[1-6]|ul|ol|li|br|strong|b|em|i|a|img|div|span|table|blockquote|iframe|video|source|figure)\b[^>]*>/i;

// Blog content: HTML is used as is; plain text becomes paragraphs (blank line = new paragraph).
// A paragraph that is only a YouTube / Vimeo / Drive / .mp4 link becomes a video player.
const toHtml = (text) => {
  if (HTML_TAG.test(text)) {
    // HTML content: a video link alone in a paragraph / link / line still becomes a player
    return text
      .replace(/<p[^>]*>\s*(?:<a[^>]*>)?\s*(https?:\/\/[^\s<"]+)\s*(?:<\/a>)?\s*<\/p>/gi, (m, link) => videoEmbed(link) || m)
      .replace(/^[ \t]*(https?:\/\/\S+)[ \t]*$/gm, (m, link) => videoEmbed(link) || m);
  }
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => videoEmbed(p) || `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('\n');
};

// "21/10/2026", "21-10-2026" or "2026-10-21" -> Date (empty / invalid -> null)
const parseDate = (text) => {
  if (!text) return null;
  const dmy = text.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  const d = dmy ? new Date(Date.UTC(+dmy[3], +dmy[2] - 1, +dmy[1])) : new Date(text);
  return Number.isNaN(d.getTime()) ? null : d;
};

// Website filters use lowercase values (living, bedroom, modern...); AppGallery keeps its case
const filterValue = (text) => (/^appgallery$/i.test(text) ? 'AppGallery' : text.toLowerCase());

// What each tab looks like. toDoc returns the fields to save, or a string = error message
const SHEETS = {
  designs: {
    label: 'Designs',
    env: ['SHEET_DESIGNS_CSV_URL', 'SHEET_CSV_URL'],
    required: ['id', 'title', 'price'],
    toDoc: (get) => {
      const price = Number(get('price').replace(/[₹,\s]/g, '').replace(/\/.*$/, ''));
      if (!get('title')) return 'Title is empty';
      if (!Number.isFinite(price) || price < 1 || price > 100000) {
        return `Price "${get('price')}" is not a valid per sq. ft. number`;
      }
      return {
        title: get('title'),
        price,
        category: filterValue(get('category')),
        style: filterValue(get('style')),
        image: get('image'),
      };
    },
  },
  blogs: {
    label: 'Blogs',
    env: ['SHEET_BLOGS_CSV_URL'],
    required: ['id', 'title', 'description', 'content', 'image', 'category'],
    toDoc: (get) => {
      const missing = ['title', 'description', 'content', 'image', 'category'].find((k) => !get(k));
      if (missing) return `${missing[0].toUpperCase()}${missing.slice(1)} is empty`;
      if (get('date') && !parseDate(get('date'))) return `Date "${get('date')}" is not valid (use DD/MM/YYYY)`;
      if (get('video') && !videoEmbed(get('video'))) return `Video "${get('video')}" is not a YouTube / Vimeo / Google Drive / .mp4 link`;
      const doc = {
        title: get('title'),
        description: get('description'),
        content: videoEmbed(get('video')) + toHtml(get('content')),
        image: get('image'),
        category: get('category'),
      };
      if (get('author')) doc.author = get('author');
      if (get('date')) doc.createdAt = parseDate(get('date'));
      return doc;
    },
  },
  reviews: {
    label: 'Reviews',
    env: ['SHEET_REVIEWS_CSV_URL'],
    required: ['id', 'name', 'rating', 'review'],
    toDoc: (get) => {
      const rating = Number(get('rating'));
      if (!get('name')) return 'Name is empty';
      if (!get('review')) return 'Review is empty';
      if (!Number.isFinite(rating) || rating < 1 || rating > 5) return `Rating "${get('rating')}" must be 1 to 5`;
      if (get('date') && !parseDate(get('date'))) return `Date "${get('date')}" is not valid (use DD/MM/YYYY)`;
      // a video link put in the Photo column is treated as the review video
      const photoIsVideo = Boolean(videoUrl(get('photo')));
      const videoLink = get('video') || (photoIsVideo ? get('photo') : '');
      if (videoLink && !videoUrl(videoLink)) return `Video "${videoLink}" is not a YouTube / Vimeo / Google Drive / .mp4 link`;
      const doc = {
        name: get('name'),
        location: get('location'),
        rating,
        review: get('review'),
        photo: photoIsVideo ? '' : get('photo'),
        video: videoUrl(videoLink),
        project: get('project'),
      };
      if (get('date')) doc.createdAt = parseDate(get('date'));
      return doc;
    },
  },
};

// Turn CSV rows into docs; returns { docs, errors, brokenKeys }
const toDocs = (rows, sheet) => {
  if (rows.length < 2) return { docs: [], errors: ['Sheet is empty'], brokenKeys: [] };
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const missingCols = sheet.required.filter((name) => !headers.includes(name));
  if (missingCols.length) {
    return { docs: [], errors: [`Missing columns: ${missingCols.join(', ')}`], brokenKeys: [] };
  }

  const docs = [];
  const errors = [];
  const seen = new Set();
  const brokenKeys = []; // rows with a typo stay on the site as they were until fixed

  rows.slice(1).forEach((r, i) => {
    const line = i + 2; // sheet row number
    const get = (name) => {
      const at = headers.indexOf(name);
      return at >= 0 ? (r[at] || '').trim() : '';
    };
    const sheetKey = get('id');
    if (!sheetKey) return errors.push(`Row ${line}: ID is empty`);
    if (seen.has(sheetKey)) return errors.push(`Row ${line}: ID "${sheetKey}" is used twice`);
    seen.add(sheetKey);

    const active = !/^(no|false|0|hide|hidden)$/i.test(get('active'));
    const doc = sheet.toDoc(get);
    if (typeof doc === 'string') {
      brokenKeys.push(sheetKey);
      return errors.push(`Row ${line}: ${doc}`);
    }
    docs.push({ sheetKey, active, fields: doc });
    return undefined;
  });

  return { docs, errors, brokenKeys };
};

const sheetUrl = (sheet) => sheet.env.map((name) => process.env[name]).find(Boolean);

const lastResults = {};
const running = {};

// Sync one tab into its mongoose model
const syncSheet = async (name, Model) => {
  const sheet = SHEETS[name];
  const url = sheetUrl(sheet);
  if (!url) throw new Error(`${sheet.env[0]} is not set in .env`);
  if (running[name]) return lastResults[name] || { skipped: true };
  running[name] = true;
  try {
    const { docs, errors, brokenKeys } = toDocs(parseCsv(await fetchText(url)), sheet);

    // A broken tab (no valid rows at all) must not wipe the website
    if (docs.length === 0) {
      lastResults[name] = { at: new Date(), created: 0, updated: 0, removed: 0, errors: errors.length ? errors : ['No valid rows'] };
      return lastResults[name];
    }

    let created = 0;
    let updated = 0;
    for (const { sheetKey, active, fields } of docs) {
      if (!active) continue;
      const res = await Model.updateOne(
        { sheetKey },
        { $set: { ...fields, source: 'sheet' } },
        { upsert: true },
      );
      if (res.upsertedCount) created += 1;
      else if (res.modifiedCount) updated += 1;
    }

    // Rows deleted from the sheet (or set Active = No) disappear from the site
    const keep = docs.filter((d) => d.active).map((d) => d.sheetKey).concat(brokenKeys);
    const del = await Model.deleteMany({ source: 'sheet', sheetKey: { $nin: keep } });

    lastResults[name] = { at: new Date(), created, updated, removed: del.deletedCount || 0, errors };
    return lastResults[name];
  } finally {
    running[name] = false;
  }
};

// Sync every tab that has a URL in .env. models = { designs: Design, blogs: Blog, reviews: Review }
const syncAll = async (models) => {
  const results = {};
  for (const [name, Model] of Object.entries(models)) {
    if (!SHEETS[name] || !sheetUrl(SHEETS[name])) continue;
    try {
      results[name] = await syncSheet(name, Model);
    } catch (err) {
      results[name] = { at: new Date(), error: err.message };
      lastResults[name] = results[name];
    }
  }
  return results;
};

// Start the timer (call once after MongoDB connects)
const startSheetSync = (models) => {
  const enabled = Object.keys(models).filter((name) => SHEETS[name] && sheetUrl(SHEETS[name]));
  if (!enabled.length) {
    console.log('ℹ️  Google Sheet sync off (no SHEET_*_CSV_URL in .env)');
    return;
  }
  const minutes = Math.max(1, Number(process.env.SHEET_SYNC_MINUTES) || 5);
  const run = () =>
    syncAll(models).then((results) => {
      Object.entries(results).forEach(([name, r]) => {
        if (r.error) return console.error(`❌ Sheet sync (${SHEETS[name].label}) failed:`, r.error);
        const errs = r.errors && r.errors.length ? `, ${r.errors.length} row errors: ${r.errors.join(' | ')}` : '';
        return console.log(`📄 Sheet sync (${SHEETS[name].label}): +${r.created} new, ${r.updated} updated, ${r.removed} removed${errs}`);
      });
    });
  run();
  setInterval(run, minutes * 60 * 1000);
  console.log(`📄 Google Sheet sync every ${minutes} min: ${enabled.map((n) => SHEETS[n].label).join(', ')}`);
};

const getLastSyncResult = () => lastResults;

module.exports = { startSheetSync, syncAll, syncSheet, getLastSyncResult, parseCsv, toDocs, SHEETS };