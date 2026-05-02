const mongoose = require('mongoose');
const kitchenSchema = new mongoose.Schema({
    title: String, price: Number, image: String,
    category: { type: String, default: "Kitchen" },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'designs' });
module.exports = mongoose.model('Kitchen', kitchenSchema);