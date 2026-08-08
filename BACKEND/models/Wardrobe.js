const mongoose = require('mongoose');
const wardrobeSchema = new mongoose.Schema({
    title: String, price: Number, image: String,
    category: { type: String, default: "Wardrobe" },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'designs' });
module.exports = mongoose.model('Wardrobe', wardrobeSchema);