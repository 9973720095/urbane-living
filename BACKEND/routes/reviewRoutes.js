const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get All Reviews (newest first)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;