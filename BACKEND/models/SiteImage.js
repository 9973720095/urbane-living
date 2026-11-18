const mongoose = require('mongoose');

// One photo slot of the website (changed from Admin -> Website Images).
// key = slot id from the website code, e.g. 'home.gallery.1' or 'bedroom.banner'
const siteImageSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true },
  url: { type: String, required: true, trim: true },
  alt: { type: String, trim: true, default: '' },
  updatedBy: String,
  updatedAt: { type: Date, default: Date.now },
}, { collection: 'site_images' });

module.exports = mongoose.model('SiteImage', siteImageSchema);
