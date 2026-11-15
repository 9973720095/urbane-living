// One list of blog posts from all 3 places:
//   1. src/data/blogPosts.js  (articles inside the website code, always online)
//   2. Admin panel            (saved in MongoDB)
//   3. Google Sheet "Blogs"   (synced into MongoDB every few minutes)
// Every post opens at /blog/<slug>. A post saved in the admin panel / sheet with the same slug
// as a website article replaces it, so any article can be edited from the admin panel.
import axios from 'axios';
import { API_BASE_URL, sortedBlogPosts, blogAuthor } from '../data/siteData';

// website article -> same shape as a MongoDB post
export const fromStatic = (p) => p && ({
  ...p,
  _id: p.slug,
  key: p.slug,
  url: `/blog/${p.slug}`,
  createdAt: p.date,
  updatedAt: p.updated || p.date,
  author: blogAuthor,
  builtIn: true,
});

// MongoDB post (admin panel / sheet)
export const fromApi = (b) => ({
  ...b,
  key: b._id,
  url: `/blog/${b.slug || b._id}`,
  imageAlt: b.imageAlt || b.title,
  faq: Array.isArray(b.faq) ? b.faq : [],
});

export const staticPosts = sortedBlogPosts.map(fromStatic);

const newestFirst = (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0);

// website articles + API posts, no duplicate URLs, newest first
export const mergePosts = (apiPosts = []) => {
  const api = apiPosts.map(fromApi);
  const apiSlugs = new Set(api.map((b) => b.slug).filter(Boolean));
  return [...staticPosts.filter((p) => !apiSlugs.has(p.slug)), ...api].sort(newestFirst);
};

// blog cards (without article body). Short cache so going back to /blogs is instant
let listCache = null;
export const fetchBlogList = async () => {
  if (listCache && Date.now() - listCache.at < 60 * 1000) return listCache.data;
  const res = await axios.get(`${API_BASE_URL}/api/blogs`, { params: { lite: 1 } });
  const data = Array.isArray(res.data) ? res.data : [];
  listCache = { at: Date.now(), data };
  return data;
};

// one post by slug (or old id). Returns null when it does not exist
export const fetchBlog = async (slugOrId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/blogs/${encodeURIComponent(slugOrId)}`);
    if (res.data && res.data._id) return fromApi(res.data);
  } catch (err) {
    if (!err.response || err.response.status !== 404) throw err;
  }
  // fallback: look it up in the full list (also works with an older backend)
  const all = await axios.get(`${API_BASE_URL}/api/blogs`);
  const found = (Array.isArray(all.data) ? all.data : []).find((b) => b.slug === slugOrId || b._id === slugOrId);
  return found ? fromApi(found) : null;
};