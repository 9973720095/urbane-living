const express = require('express');
const router = express.Router();
const Living = require('../models/Living');
router.get('/', async (req, res) => {
    const data = await Living.find({ category: "Living Hall" });
    res.json(data);
});
module.exports = router;