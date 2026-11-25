// Admin only: every photo in our Cloudinary, for the photo picker in Admin -> Website Images / page tabs.
// Uses the Cloudinary Search API with the account's API key. The key NEVER goes in code or chat:
// Render -> Environment:
//   CLOUDINARY_URL = cloudinary://<api_key>:<api_secret>@nzqefovs      (copy it from Cloudinary -> Settings -> API Keys)
//   or CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET
// No extra npm package: plain https.
const express = require('express');
const https = require('https');
const { requireAdmin } = require('../adminAuth');

const router = express.Router();

const config = () => {
  const m = /^cloudinary:\/\/([^:]+):([^@]+)@([a-z0-9_-]+)/i.exec(process.env.CLOUDINARY_URL || '');
  if (m) return { key: m[1], secret: m[2], cloud: m[3] };
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!key || !secret) return null;
  return { key, secret, cloud: process.env.CLOUDINARY_CLOUD_NAME || 'nzqefovs' };
};

// one page (max 500) of the Search API
const searchPage = (cfg, cursor) => new Promise((resolve, reject) => {
  const body = JSON.stringify({
    expression: 'resource_type:image',
    max_results: 500,
    sort_by: [{ created_at: 'desc' }],
    with_field: ['tags'],
    ...(cursor ? { next_cursor: cursor } : {}),
  });
  const req = https.request({
    hostname: 'api.cloudinary.com',
    path: `/v1_1/${encodeURIComponent(cfg.cloud)}/resources/search`,
    method: 'POST',
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      Authorization: `Basic ${Buffer.from(`${cfg.key}:${cfg.secret}`).toString('base64')}`,
    },
  }, (res) => {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', (c) => { data += c; });
    res.on('end', () => {
      if (res.statusCode !== 200) return reject(new Error(`Cloudinary HTTP ${res.statusCode}`));
      try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
    });
  });
  req.on('timeout', () => req.destroy(new Error('Cloudinary timeout')));
  req.on('error', reject);
  req.end(body);
});

let cache = { at: 0, list: null };
const CACHE_MS = 5 * 60 * 1000;

const loadAll = async (cfg) => {
  const list = [];
  let cursor;
  for (let i = 0; i < 10; i += 1) { // up to 5000 photos
    const page = await searchPage(cfg, cursor); // eslint-disable-line no-await-in-loop
    (page.resources || []).forEach((r) => list.push({
      url: r.secure_url,
      name: r.display_name || r.public_id.split('/').pop(),
      id: r.public_id,
      folder: r.asset_folder || r.folder || '',
      tags: r.tags || [],
      width: r.width,
      height: r.height,
      format: r.format,
      created: r.created_at,
    }));
    cursor = page.next_cursor;
    if (!cursor) break;
  }
  return list;
};

// GET /api/cloudinary/images?refresh=1  -> { photos: [...], count }
router.get('/images', requireAdmin, async (req, res) => {
  const cfg = config();
  if (!cfg) return res.status(503).json({ error: 'Cloudinary key not set on the server (CLOUDINARY_URL in Render -> Environment).' });
  try {
    if (!cache.list || Date.now() - cache.at > CACHE_MS || req.query.refresh) {
      cache = { at: Date.now(), list: await loadAll(cfg) };
    }
    res.set('Cache-Control', 'no-store');
    res.json({ cloud: cfg.cloud, count: cache.list.length, photos: cache.list });
  } catch (err) {
    res.status(502).json({ error: 'Could not load photos from Cloudinary. Check the key in Render -> Environment.' });
  }
});

module.exports = router;
