// Live Google reviews for the website (Google Places API - New).
// Needs 2 environment variables (Render -> Environment, never in code or chat):
//   GOOGLE_PLACES_API_KEY = API key with "Places API (New)" enabled
//   GOOGLE_PLACE_ID       = Place ID of Urbane Living on Google Maps
// Optional:
//   GOOGLE_REVIEWS_CACHE_MINUTES = keep the answer in memory for this long (default 30, 0 = no cache)
// Google returns at most 5 reviews per place.
const express = require('express');

const router = express.Router();

let cache = { at: 0, data: null };

router.get('/', async (req, res) => {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) {
    return res.status(503).json({ error: 'Google reviews are not set up yet' });
  }

  const cacheMs = Number(process.env.GOOGLE_REVIEWS_CACHE_MINUTES ?? 30) * 60 * 1000;
  if (cache.data && Date.now() - cache.at < cacheMs) {
    return res.json(cache.data);
  }

  try {
    const r = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
      },
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('Google reviews error', r.status, detail.slice(0, 300));
      return res.status(502).json({ error: 'Could not load Google reviews' });
    }
    const place = await r.json();

    const data = {
      rating: place.rating || 0,
      total: place.userRatingCount || 0,
      mapsUrl: place.googleMapsUri || '',
      writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
      reviews: (place.reviews || [])
        .filter((rv) => (rv.rating || 0) >= 4 && (rv.text?.text || rv.originalText?.text))
        .map((rv) => ({
          name: rv.authorAttribution?.displayName || 'Google user',
          authorUrl: rv.authorAttribution?.uri || '',
          photo: rv.authorAttribution?.photoUri || '',
          stars: rv.rating,
          when: rv.relativePublishTimeDescription || '',
          text: rv.text?.text || rv.originalText?.text || '',
        })),
    };

    cache = { at: Date.now(), data };
    return res.json(data);
  } catch (err) {
    console.error('Google reviews error', err.message);
    return res.status(502).json({ error: 'Could not load Google reviews' });
  }
});

module.exports = router;