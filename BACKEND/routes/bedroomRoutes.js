const express = require('express');
const router = express.Router();
const Bedroom = require('../models/Bedroom');
router.get('/', async (req, res) => {
    const data = await Bedroom.find({ category: "Bedroom" });
    res.json(data);
});
module.exports = router;