const mongoose = require('mongoose');

// One photo of the website, managed from Admin -> Website Images.
// key = photo id from the website code, e.g. 'home.gallery.livingTvWall' or 'bedroom.banner'.
// A photo the admin ADDED to a gallery has extra: true, collection = the gallery id
// (e.g. 'kitchen.gallery') and key = '<collection>.x-<random>'.
const siteImageSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true },
  url: { type: String, trim: true, default: '' }, // empty = keep the website's default photo
  alt: { type: String, trim: true, default: '' },
  title: { type: String, trim: true, default: '' },
  hidden: { type: Boolean, default: false }, // hide this photo from its gallery
  order: { type: Number }, // position in its gallery (smaller = first)
  extra: { type: Boolean, default: false },
  collection: { type: String, trim: true, default: '' },
  style: { type: String, trim: true, default: '' },
  room: { type: String, trim: true, default: '' },
  category: { type: String, trim: true, default: '' },
  updatedBy: String,
  updatedAt: { type: Date, default: Date.now },
}, { collection: 'site_images' });

module.exports = mongoose.model('SiteImage', siteImageSchema);
