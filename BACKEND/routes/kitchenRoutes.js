const express = require('express');
const router = express.Router();
const Kitchen = require('../models/Kitchen');
router.get('/', async (req, res) => {
    const data = await Kitchen.find({ category: "Kitchen" });
    res.json(data);
});
module.exports = router;