const mongoose = require('mongoose');

// A section added from Admin -> Page Sections.
// page + position = the spot on the website (list: src/data/pageSections.js in the website code).
const itemSchema = new mongoose.Schema({
  media: { type: String, trim: true, default: '' }, // Cloudinary image or video
  alt: { type: String, trim: true, default: '' },
  title: { type: String, trim: true, default: '' },
  text: { type: String, trim: true, default: '' },
  linkLabel: { type: String, trim: true, default: '' },
  linkUrl: { type: String, trim: true, default: '' },
}, { _id: false });

const pageSectionSchema = new mongoose.Schema({
  page: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  order: { type: Number, default: 0 },
  eyebrow: { type: String, trim: true, default: '' },
  title: { type: String, trim: true, default: '' },
  subtitle: { type: String, trim: true, default: '' },
  columns: { type: Number, default: 3 },
  ratio: { type: String, default: '4/3' },
  background: { type: String, default: 'white' },
  buttonLabel: { type: String, trim: true, default: '' },
  buttonUrl: { type: String, trim: true, default: '' },
  items: { type: [itemSchema], default: [] },
  visible: { type: Boolean, default: true },
  updatedBy: String,
}, { collection: 'page_sections', timestamps: true });

module.exports = mongoose.model('PageSection', pageSectionSchema);
