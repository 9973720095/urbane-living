const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Naya description field
  content: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: "Urbane Living" },
  sheetKey: { type: String, index: true }, // Google Sheet "ID" column (empty for admin-added blogs)
  source: String,                          // 'sheet' when it came from Google Sheet
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);