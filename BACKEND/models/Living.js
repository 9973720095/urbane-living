const mongoose = require('mongoose');
const livingSchema = new mongoose.Schema({
    title: String, price: Number, image: String,
    category: { type: String, default: "Living Hall" },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'designs' });
module.exports = mongoose.model('Living', livingSchema);