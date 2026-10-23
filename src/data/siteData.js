// All website text, images and settings live in the files of this folder.
// Components keep importing from './data/siteData'; this file just collects everything.
//
//   config.js        backend URL, CDN, live domain
//   common.js        brand, contact, socials, nav, footer, form options
//   home.js          home page sections
//   styleQuiz.js     home page style quiz
//   homeFaq.js       home page FAQ
//   falseCeiling.js  False Ceiling page
//   blog.js          Blog page
//   rooms/*.js       Living Hall, Bedroom (add Kitchen, Wardrobe here)

export * from './config';
export * from './common';
export * from './home';
export * from './styleQuiz';
export * from './homeFaq';
export * from './falseCeiling';
export * from './blog';
export * from './rooms/living';
export * from './rooms/bedroom';
