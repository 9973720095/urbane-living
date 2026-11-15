// Blog SEO helpers: URL slugs, FAQ parsing and the blog sitemap.
// Used by routes/blogRoutes.js (admin panel) and sheetSync.js (Google Sheet).

const SITE_URL = process.env.SITE_URL || 'https://urbaneliving.in';

// "False Ceiling Cost in Delhi NCR (2026)!" -> "false-ceiling-cost-in-delhi-ncr-2026"
const slugify = (text = '') =>
  String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // accents
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');

// Free slug for this blog: "my-post", else "my-post-2", "my-post-3"...
// excludeId = the blog being edited (it may keep its own slug)
const uniqueSlug = async (Blog, wanted, excludeId) => {
  const base = slugify(wanted) || 'post';
  let slug = base;
  for (let n = 2; n < 500; n += 1) {
    const query = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    // eslint-disable-next-line no-await-in-loop
    if (!(await Blog.exists(query))) return slug;
    slug = `${base}-${n}`;
  }
  return `${base}-${Date.now()}`;
};

// FAQ from the admin panel / sheet. Accepts an array [{ q, a }] or text, one question per line:
//   What is the cost? | It starts at ₹120 per sq. ft.
const parseFaq = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((f) => ({ q: String(f?.q || '').trim(), a: String(f?.a || '').trim() }))
      .filter((f) => f.q && f.a);
  }
  return String(value || '')
    .split(/\r?\n/)
    .map((line) => line.split('|'))
    .filter((parts) => parts.length >= 2)
    .map(([q, ...a]) => ({ q: q.trim(), a: a.join('|').trim() }))
    .filter((f) => f.q && f.a);
};

const xmlEscape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Sitemap of all blogs saved in MongoDB (admin panel + Google Sheet)
const blogSitemapXml = (blogs) => {
  const urls = blogs
    .filter((b) => b.slug)
    .map((b) => {
      const lastmod = new Date(b.updatedAt || b.createdAt || Date.now()).toISOString().slice(0, 10);
      return `  <url><loc>${xmlEscape(`${SITE_URL}/blog/${b.slug}`)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
    });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}${urls.length ? '\n' : ''}</urlset>\n`;
};

// Old blogs (saved before slugs existed) get a slug from their title
const assignMissingSlugs = async (Blog) => {
  const missing = await Blog.find({ $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }] }).select('_id title');
  for (const blog of missing) {
    // eslint-disable-next-line no-await-in-loop
    const slug = await uniqueSlug(Blog, blog.title, blog._id);
    // eslint-disable-next-line no-await-in-loop
    await Blog.updateOne({ _id: blog._id }, { $set: { slug } });
  }
  return missing.length;
};

module.exports = { slugify, uniqueSlug, parseFaq, blogSitemapXml, assignMissingSlugs, SITE_URL };