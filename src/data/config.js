// Site-wide settings: backend URL, image CDN, live domain.

export const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://urbane-living.onrender.com';

export const cdn = 'https://res.cloudinary.com/diosq0s7w';

// Live website address (used for canonical links and SEO)
export const siteUrl = 'https://urbaneliving.in';

// Meta (Facebook / Instagram) Pixel ID from Events Manager. Leave '' to switch the pixel off.
export const metaPixelId = '823791606495029';