const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Blog = require('../models/Blog');
const { uniqueSlug, parseFaq, blogSitemapXml, assignMissingSlugs } = require('../blogSeo');

// Old blogs (saved before slugs existed) get their slug once, on the first request after a restart
let slugsReady = null;
const ensureSlugs = () => {
  if (!slugsReady) {
    slugsReady = assignMissingSlugs(Blog)
      .then((n) => { if (n) console.log(`🔗 Blog slugs given to ${n} old posts`); })
      .catch((err) => { slugsReady = null; console.error('Blog slug backfill failed:', err.message); });
  }
  return slugsReady;
};

// Clean the fields that come from the admin panel
const blogFields = (body = {}) => {
  const fields = { ...body };
  delete fields._id;
  delete fields.sheetKey;
  delete fields.source;
  if ('faq' in fields) fields.faq = parseFaq(fields.faq);
  if ('seoTitle' in fields) fields.seoTitle = String(fields.seoTitle || '').trim();
  return fields;
};

// Add Blog (slug is made from the title when it is left empty)
router.post('/add', async (req, res) => {
  try {
    const fields = blogFields(req.body);
    fields.slug = await uniqueSlug(Blog, fields.slug || fields.title);
    fields.updatedAt = new Date();
    const saved = await new Blog(fields).save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Get All Blogs (newest first). ?lite=1 leaves out the article body (faster for blog cards)
router.get('/', async (req, res) => {
  try {
    await ensureSlugs();
    let query = Blog.find().sort({ createdAt: -1 });
    if (req.query.lite) query = query.select('-content -faq');
    const blogs = await query.lean();
    res.json(blogs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Sitemap of all blogs in MongoDB (read by blog-sitemap.php on Hostinger)
router.get('/sitemap.xml', async (req, res) => {
  try {
    await ensureSlugs();
    const blogs = await Blog.find().select('slug createdAt updatedAt').sort({ createdAt: -1 }).lean();
    res.type('application/xml').send(blogSitemapXml(blogs));
  } catch (err) { res.status(500).type('text/plain').send(err.message); }
});

// One blog by slug (or by its old id, for links shared before slugs existed)
router.get('/:slug', async (req, res) => {
  try {
    await ensureSlugs();
    const key = String(req.params.slug).toLowerCase();
    let blog = await Blog.findOne({ slug: key }).lean();
    if (!blog && mongoose.isValidObjectId(req.params.slug)) blog = await Blog.findById(req.params.slug).lean();
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    return res.json(blog);
  } catch (err) { return res.status(500).json({ error: err.message }); }
});

// Update Blog (Edit functionality)
router.put('/:id', async (req, res) => {
  try {
    const current = await Blog.findById(req.params.id);
    if (!current) return res.status(404).json({ error: 'Blog not found' });
    const fields = blogFields(req.body);
    // keep the old URL unless a new slug was typed (changing URLs hurts Google ranking)
    const wanted = fields.slug || current.slug || fields.title || current.title;
    fields.slug = await uniqueSlug(Blog, wanted, current._id);
    fields.updatedAt = new Date();
    const updated = await Blog.findByIdAndUpdate(req.params.id, fields, { new: true, runValidators: true });
    return res.json(updated);
  } catch (err) { return res.status(400).json({ error: err.message }); }
});

// Delete Blog
router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;