const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  q: { type: String, trim: true },
  a: { type: String, trim: true },
}, { _id: false });

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // short summary for cards + Google description
  content: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: "Urbane Living" },

  // SEO
  slug: { type: String, trim: true, lowercase: true, unique: true, sparse: true }, // URL: /blog/<slug> (auto from title when empty)
  seoTitle: { type: String, trim: true },  // Google title (optional, default = title)
  faq: { type: [faqSchema], default: [] }, // questions shown under the post + FAQ rich result

  sheetKey: { type: String, index: true }, // Google Sheet "ID" column (empty for admin-added blogs)
  source: String,                          // 'sheet' when it came from Google Sheet
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

module.exports = mongoose.model('Blog', blogSchema);