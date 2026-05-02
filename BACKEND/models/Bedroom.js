const mongoose = require('mongoose');
const bedroomSchema = new mongoose.Schema({
    title: String, price: Number, image: String,
    category: { type: String, default: "Bedroom" },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'designs' }); // Database folder 'designs'
module.exports = mongoose.model('Bedroom', bedroomSchema);