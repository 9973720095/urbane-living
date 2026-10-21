const mongoose = require('mongoose');

// Client reviews (filled from the "Reviews" tab of the Google Sheet)
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String, required: true },
  photo: String,
  video: String, // YouTube / Vimeo / Drive embed URL or .mp4 file URL
  project: String,
  sheetKey: { type: String, index: true }, // Google Sheet "ID" column
  source: String,                          // 'sheet' when it came from Google Sheet
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);