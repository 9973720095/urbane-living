// Admin -> Page Sections: where an admin can add a new section on the website.
// Each page lists its "positions" (spots between the existing sections). In the page code the spot
// is marked with <CustomSections page="home" at="after-gallery" />.
// To add a new spot: add it here AND put <CustomSections ... /> at that place in the page.
export const sectionPages = [
  {
    key: 'home',
    label: 'Home page',
    positions: [
      ['after-hero', 'After the top banner'],
      ['after-brand-story', 'After "Our Story"'],
      ['after-gallery', 'After "Our Masterpieces" gallery'],
      ['after-before-after', 'After Before / After'],
      ['after-work-in-progress', 'After Work In Progress + Our Factory'],
      ['after-room-explorer', 'After Room Explorer'],
      ['after-style-quiz', 'After Style Quiz'],
      ['after-client-stories', 'After Client Stories'],
      ['after-google-reviews', 'After Google Reviews'],
      ['before-faq', 'Before FAQ'],
      ['end', 'End of the page'],
    ],
  },
  {
    key: 'false-ceiling',
    label: 'False Ceiling page',
    positions: [
      ['after-hero', 'After the top banner'],
      ['after-types', 'After "Types of false ceiling"'],
      ['after-estimator', 'After the cost estimator'],
      ['after-gallery', 'After the design gallery'],
      ['after-edge', 'After "Urbane Ceiling Standard"'],
      ['before-faq', 'Before FAQ'],
      ['end', 'End of the page'],
    ],
  },
  ...[
    ['kitchen', 'Modular Kitchen page'],
    ['bedroom', 'Bedroom page'],
    ['wardrobe', 'Wardrobe page'],
    ['living', 'Living Hall page'],
  ].map(([key, label]) => ({
    key,
    label,
    positions: [
      ['after-hero', 'After the top banner'],
      ['after-gallery', 'After the design gallery'],
      ['after-elements', 'After "Everything your room needs"'],
      ['after-sizes', 'After the ideas / layouts'],
      ['before-faq', 'Before FAQ'],
      ['end', 'End of the page'],
    ],
  })),
  {
    key: 'about',
    label: 'About Us page',
    positions: [
      ['after-hero', 'After the top banner'],
      ['after-story', 'After "Our story"'],
      ['after-reviews', 'After client reviews'],
      ['end', 'End of the page'],
    ],
  },
  {
    key: 'contact',
    label: 'Contact page',
    positions: [
      ['after-form', 'After the enquiry form'],
      ['end', 'End of the page'],
    ],
  },
  {
    key: 'factory',
    label: 'Our Factory page',
    positions: [
      ['after-hero', 'After the top banner'],
      ['after-process', 'After "From your 3D design to your home"'],
      ['after-machines', 'After the machines'],
      ['before-faq', 'Before FAQ'],
      ['end', 'End of the page'],
    ],
  },
  {
    key: 'city',
    label: 'All city pages (e.g. /false-ceiling/gurgaon)',
    positions: [
      ['after-intro', 'After the city intro'],
      ['before-faq', 'Before FAQ'],
      ['end', 'End of the page'],
    ],
  },
];

export const findSectionPage = (key) => sectionPages.find((p) => p.key === key);

export const sectionLayouts = {
  columns: [1, 2, 3, 4], // items in one row on desktop
  backgrounds: [
    ['white', 'White'],
    ['soft', 'Light grey'],
    ['navy', 'Dark blue'],
  ],
};
