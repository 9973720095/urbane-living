const express = require('express');
const router = express.Router();
const PageSection = require('../models/PageSection');
const { requireAdmin } = require('../adminAuth');

// Only our own Cloudinary photos / videos; links only to our pages or https sites
const MEDIA = /^https:\/\/res\.cloudinary\.com\/(nzqefovs|diosq0s7w)\/(image|video)\/upload\//;
const SLUG = /^[a-z0-9][a-z0-9-]{0,40}$/;
const LINK = /^(\/[^\s]*|https:\/\/[^\s]+)$/;
const RATIOS = ['4/3', '16/9', '1/1', '9/16'];
const BACKGROUNDS = ['white', 'soft', 'navy'];

const str = (v, max) => String(v == null ? '' : v).trim().slice(0, max);

// Checks and cleans what the admin sent. Returns { data } or { error }.
const clean = (body = {}) => {
  const page = str(body.page, 41);
  const position = str(body.position, 41);
  if (!SLUG.test(page) || !SLUG.test(position)) return { error: 'Choose a page and a position.' };

  const buttonUrl = str(body.buttonUrl, 300);
  if (buttonUrl && !LINK.test(buttonUrl)) return { error: 'Button link must start with / (our page) or https://' };

  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 24) : [];
  const items = [];
  for (let i = 0; i < rawItems.length; i += 1) {
    const it = rawItems[i] || {};
    const media = str(it.media, 500);
    const alt = str(it.alt, 200);
    const linkUrl = str(it.linkUrl, 300);
    if (media && !MEDIA.test(media)) return { error: `Item ${i + 1}: use a photo or video from our Cloudinary.` };
    if (media && alt.length < 5) return { error: `Item ${i + 1}: write the alt text (what is in the photo).` };
    if (linkUrl && !LINK.test(linkUrl)) return { error: `Item ${i + 1}: link must start with / or https://` };
    const item = { media, alt, title: str(it.title, 120), text: str(it.text, 1000), linkLabel: str(it.linkLabel, 60), linkUrl };
    if (item.media || item.title || item.text) items.push(item);
  }

  const data = {
    page,
    position,
    order: Number.isFinite(Number(body.order)) ? Math.max(0, Math.min(99, Math.round(Number(body.order)))) : 0,
    eyebrow: str(body.eyebrow, 60),
    title: str(body.title, 160),
    subtitle: str(body.subtitle, 400),
    columns: [1, 2, 3, 4].includes(Number(body.columns)) ? Number(body.columns) : 3,
    ratio: RATIOS.includes(body.ratio) ? body.ratio : '4/3',
    background: BACKGROUNDS.includes(body.background) ? body.background : 'white',
    buttonLabel: str(body.buttonLabel, 60),
    buttonUrl,
    items,
    visible: body.visible !== false,
  };
  if (!data.title && !items.length) return { error: 'Add a title or at least one item.' };
  return { data };
};

const FIELDS = { updatedBy: 0, __v: 0, createdAt: 0 };

// Public: every visible section (the website reads this once and keeps a copy)
router.get('/', async (req, res) => {
  try {
    const list = await PageSection.find({ visible: true }, FIELDS).sort({ page: 1, position: 1, order: 1 }).lean();
    res.set('Cache-Control', 'public, max-age=300');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Could not load sections' });
  }
});

// Admin: every section, also hidden ones
router.get('/all', requireAdmin, async (req, res) => {
  try {
    const list = await PageSection.find({}, { __v: 0 }).sort({ page: 1, position: 1, order: 1 }).lean();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Could not load sections' });
  }
});

router.post('/', requireAdmin, async (req, res) => {
  const { data, error } = clean(req.body);
  if (error) return res.status(400).json({ error });
  try {
    const saved = await PageSection.create({ ...data, updatedBy: req.admin?.email || '' });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Save failed' });
  }
});

router.put('/:id', requireAdmin, async (req, res) => {
  const { data, error } = clean(req.body);
  if (error) return res.status(400).json({ error });
  try {
    const saved = await PageSection.findByIdAndUpdate(req.params.id, { ...data, updatedBy: req.admin?.email || '' }, { new: true });
    if (!saved) return res.status(404).json({ error: 'Section not found' });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Save failed' });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await PageSection.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
