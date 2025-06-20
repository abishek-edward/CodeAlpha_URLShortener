const express = require('express');
const { nanoid } = require('nanoid');
const Url = require('../models/Url');
const router = express.Router();

// Create a short URL
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortId = nanoid(6);
  await Url.create({ shortId, originalUrl });
  res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
});

// Redirect short URL to original
router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const entry = await Url.findOne({ shortId });

  if (entry) {
    res.redirect(entry.originalUrl);
  } else {
    res.status(404).send('❌ URL not found');
  }
});

module.exports = router;
