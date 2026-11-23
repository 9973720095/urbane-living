const express = require('express');
const router = express.Router();
const SiteImage = require('../models/SiteImage');
const { requireAdmin } = require('../adminAuth');

// Only our own image hosts are accepted, so nobody can point the site at a random URL
const ALLOWED = /^https:\/\/res\.cloudinary\.com\/(nzqefovs|diosq0s7w)\/image\/upload\//;
const KEY = /^[a-z0-9][a-z0-9.\-_]{1,100}$/i;
const COLLECTION = /^[a-z0-9][a-z0-9.\-_]{1,60}$/i;
const SHORT = /^[a-z0-9 &\-]{0,30}$/i; // style / room / category values
const clean = (v, max) => String(v == null ? '' : v).replace(/[<>]/g, '').trim().slice(0, max);

// Public: every admin change as { key: { url, alt, title, hidden, order, extra, collection, style, room, category } }
router.get('/', async (req, res) => {
  try {
    const rows = await SiteImage.find({}, { _id: 0, __v: 0, updatedBy: 0, updatedAt: 0 }).lean();
    const map = {};
    rows.forEach((r) => {
      const v = {};
      ['url', 'alt', 'title', 'collection', 'style', 'room', 'category'].forEach((f) => { if (r[f]) v[f] = r[f]; });
      if (r.hidden) v.hidden = true;
      if (r.extra) v.extra = true;
      if (typeof r.order === 'number') v.order = r.order;
      map[r.key] = v;
    });
    res.set('Cache-Control', 'public, max-age=300');
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: 'Could not load site images' });
  }
});

// Admin: save one photo (change photo / alt / title / hide / order), or add a photo to a gallery
router.put('/:key', requireAdmin, async (req, res) => {
  const { key } = req.params;
  const b = req.body || {};
  if (!KEY.test(key)) return res.status(400).json({ error: 'Invalid photo id' });

  const url = clean(b.url, 500);
  const doc = {
    key,
    url,
    alt: clean(b.alt, 200),
    title: clean(b.title, 120),
    hidden: !!b.hidden,
    extra: !!b.extra,
    collection: clean(b.collection, 60),
    style: clean(b.style, 30),
    room: clean(b.room, 30),
    category: clean(b.category, 30),
    updatedBy: req.admin?.email || '',
    updatedAt: new Date(),
  };
  if (b.order !== undefined && b.order !== null && b.order !== '') {
    const n = Number(b.order);
    if (!Number.isFinite(n) || n < -10000 || n > 100000) return res.status(400).json({ error: 'Position must be a number' });
    doc.order = Math.round(n);
  }

  if (url && !ALLOWED.test(url)) return res.status(400).json({ error: 'Use an image from our Cloudinary (res.cloudinary.com/nzqefovs/...)' });
  if (url && doc.alt.length < 5) return res.status(400).json({ error: 'Please describe the photo (alt text, at least 5 letters)' });
  if (![doc.style, doc.room, doc.category].every((v) => SHORT.test(v))) return res.status(400).json({ error: 'Style / room / category: letters only' });
  if (doc.extra) {
    if (!COLLECTION.test(doc.collection) || !key.startsWith(`${doc.collection}.x-`)) return res.status(400).json({ error: 'Invalid gallery' });
    if (!url) return res.status(400).json({ error: 'Please choose a photo' });
  } else {
    doc.collection = '';
    // nothing to change at all
    if (!url && !doc.alt && !doc.title && !doc.hidden && doc.order === undefined && !doc.style && !doc.room && !doc.category) {
      return res.status(400).json({ error: 'Nothing to save' });
    }
  }

  try {
    const update = { $set: doc };
    if (doc.order === undefined) update.$unset = { order: 1 };
    const saved = await SiteImage.findOneAndUpdate({ key }, update, { upsert: true, new: true, setDefaultsOnInsert: true });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Save failed' });
  }
});

// Admin: back to the default photo (or remove a photo the admin added)
router.delete('/:key', requireAdmin, async (req, res) => {
  try {
    await SiteImage.deleteOne({ key: req.params.key });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Reset failed' });
  }
});

module.exports = router;
