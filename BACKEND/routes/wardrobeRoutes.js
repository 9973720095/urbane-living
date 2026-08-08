const express = require('express');
const router = express.Router();
const Wardrobe = require('../models/Wardrobe');
router.get('/', async (req, res) => {
    const data = await Wardrobe.find({ category: "Wardrobe" });
    res.json(data);
});
module.exports = router;