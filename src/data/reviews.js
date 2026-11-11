// Google reviews section on the home page.
// LIVE: the backend (/api/google-reviews) brings rating + latest reviews straight from Google.
// The values below are only a backup, shown while Google is loading or if it is not set up yet.
// Never write reviews yourself: copy only real ones from Google if you add any here.
export const reviews = {
  eyebrow: 'GOOGLE REVIEWS',
  title: 'Homes our clients',
  highlight: 'love living in',
  subtitle: 'Designs we create, and what families across Delhi NCR say about us on Google.',

  // Backup rating (used only until live Google data arrives). Leave 0 to hide the number.
  rating: 0,
  totalReviews: 0,

  // Google Maps link of the business
  googleUrl: 'https://maps.app.goo.gl/Vmcg7suXMcbk7RMR9',
  // Filled automatically from Google when live data works; you can also paste your "Ask for reviews" link
  writeReviewUrl: '',

  // Right side text
  citiesTitle: 'Serving 6 cities across Delhi NCR',
  studio: 'Experience centre: Vaishali, Ghaziabad',

  // Backup reviews (real ones only). Format:
  // { name: 'Customer name', stars: 5, when: '2 weeks ago', text: 'Review text...' },
  items: [],
};