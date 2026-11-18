const express = require('express');
const router = express.Router();
const SiteImage = require('../models/SiteImage');
const { requireAdmin } = require('../adminAuth');

// Only our own image hosts are accepted, so nobody can point the site at a random URL
const ALLOWED = /^https:\/\/res\.cloudinary\.com\/(nzqefovs|diosq0s7w)\/image\/upload\//;
const KEY = /^[a-z0-9][a-z0-9.\-]{1,80}$/i;

// Public: every changed photo as { key: { url, alt } } (small, cached by browsers for 5 min)
router.get('/', async (req, res) => {
  try {
    const rows = await SiteImage.find({}, { key: 1, url: 1, alt: 1, _id: 0 }).lean();
    const map = Object.fromEntries(rows.map((r) => [r.key, { url: r.url, alt: r.alt || '' }]));
    res.set('Cache-Control', 'public, max-age=300');
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: 'Could not load site images' });
  }
});

// Admin: set the photo of one slot
router.put('/:key', requireAdmin, async (req, res) => {
  const { key } = req.params;
  const url = String(req.body.url || '').trim();
  const alt = String(req.body.alt || '').trim().slice(0, 200);
  if (!KEY.test(key)) return res.status(400).json({ error: 'Invalid slot' });
  if (!ALLOWED.test(url)) return res.status(400).json({ error: 'Use an image from our Cloudinary (res.cloudinary.com/nzqefovs/...)' });
  try {
    const saved = await SiteImage.findOneAndUpdate(
      { key },
      { key, url, alt, updatedBy: req.admin?.email || '', updatedAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Save failed' });
  }
});

// Admin: back to the default photo
router.delete('/:key', requireAdmin, async (req, res) => {
  try {
    await SiteImage.deleteOne({ key: req.params.key });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Reset failed' });
  }
});

module.exports = router;
