// Wardrobe page (/wardrobe). Layout: components/RoomPage.jsx
import { cdn } from '../config';
import { highlights } from '../common';

export const wardrobePage = {
  api: '/api/wardrobe',
  category: 'wardrobe',
  service: 'Wardrobe Design',
  breadcrumb: 'Wardrobes',
  altSuffix: 'wardrobe design',
  faqTitle: 'Wardrobe FAQs',
  banner: {
    eyebrow: 'Wardrobes · Delhi NCR',
    title: 'Wardrobes that fit',
    highlight: 'everything you own',
    subtitle: 'Sliding, hinged or walk-in wardrobes made to your wall size, with smart inside storage planned around your clothes, shoes and bags.',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778585454/ChatGPT_Image_May_12_2026_04_30_35_PM_ptqgea.png`,
    imageAlt: 'Bedroom with a full-height custom wardrobe by Urbane Living',
    whatsappMessage: 'Hi Urbane Living, I want a free 3D design for my wardrobe.',
    align: 'left',
    highlights,
  },
  gallery: {
    title: 'Wardrobe designs by Urbane Living',
    subtitle: 'Wardrobes designed by our team. Tap any design to see it bigger, or get the same look for your home.',
    empty: 'New wardrobe designs are being added. Get a free 3D design made for your own wardrobe.',
  },
  elements: {
    title: 'Plan the inside, not just the doors',
    subtitle: 'A good wardrobe is about what is inside. We plan every section around what you actually store.',
    items: [
      { icon: 'wardrobe', title: 'Hanging & Shelves', text: 'Long and short hanging, shelves and a loft, sized for your clothes and bed linen.' },
      { icon: 'storage', title: 'Drawers & Organisers', text: 'Drawers with dividers for accessories, plus pull-out trays, tie and belt racks.' },
      { icon: 'hardware', title: 'Soft-Close Fittings', text: 'Smooth sliding tracks, soft-close hinges and drawers that run quietly every day.' },
      { icon: 'dressing', title: 'Mirror & Dresser', text: 'Full-length mirror shutters or a built-in dresser so you get ready in one place.' },
      { icon: 'panel', title: 'Shutter Finishes', text: 'Laminate, acrylic, glass, fluted or cane shutters to match your bedroom style.' },
      { icon: 'light', title: 'Inside Lighting', text: 'Sensor or profile lights inside the wardrobe so you can find things easily.' },
    ],
  },
  sizes: {
    title: 'Which wardrobe is right for you?',
    items: [
      {
        tag: 'Sliding',
        title: 'Sliding wardrobe',
        points: ['Saves space: doors do not open outwards', 'Great for small bedrooms and flats', 'Mirror or glass shutters make the room feel bigger'],
      },
      {
        tag: 'Hinged',
        title: 'Hinged wardrobe',
        points: ['Opens fully, so you see everything at once', 'Budget-friendly and easy to maintain', 'Works with most bedroom layouts'],
      },
      {
        tag: 'Walk-in',
        title: 'Walk-in wardrobe',
        points: ['A dedicated dressing room for large homes', 'Open shelves, island drawers and shoe racks', 'Built-in lighting and full-length mirrors'],
      },
    ],
  },
  steps: {
    title: 'From idea to your new wardrobe',
    items: [
      { title: 'Free consultation', text: 'Our designer visits, measures the wall and understands what you need to store.' },
      { title: '3D design & quote', text: 'See your wardrobe inside and out in 3D, with an itemised quote.' },
      { title: 'Production', text: 'Carcass, shutters and fittings are made to size with branded materials.' },
      { title: 'Installation & handover', text: 'Our team installs, aligns every door and drawer, cleans up and hands over.' },
    ],
  },
  faqs: [
    { q: 'How much does a wardrobe cost?', a: 'It depends on the size, the type (sliding, hinged or walk-in), the inside fittings and the shutter finish. After a free site visit you get an itemised quote with the cost of each part.' },
    { q: 'Sliding or hinged wardrobe: which should I choose?', a: 'Sliding wardrobes save space in small rooms because the doors do not open outwards. Hinged wardrobes open fully and usually cost less. Our designer will suggest the right one after seeing your room.' },
    { q: 'Can you make a wardrobe for an odd-sized wall or corner?', a: 'Yes. Every wardrobe is made to your exact wall size, including corners, alcoves and sloping or beam-heavy ceilings.' },
    { q: 'Will I see the design before work starts?', a: 'Yes. You get a 3D design of your wardrobe first, inside and out. Work starts only after you approve it.' },
    { q: 'Which areas do you serve?', a: 'We work across Delhi NCR: Delhi, Noida, Greater Noida, Ghaziabad, Gurgaon and Faridabad.' },
  ],
  cta: {
    title: 'Ready for a wardrobe with a place for everything?',
    text: 'Book a free consultation and get a 3D design of your wardrobe.',
    button: 'Get Free 3D Design',
  },
  seo: {
    title: 'Wardrobe Design in Delhi NCR | Sliding, Hinged & Walk-in Wardrobes | Urbane Living',
    description:
      'Custom wardrobe design in Delhi, Noida, Ghaziabad and Gurgaon. Sliding, hinged and walk-in wardrobes made to size with smart inside storage, a free 3D design and itemised quote.',
    path: '/wardrobe',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778585454/ChatGPT_Image_May_12_2026_04_30_35_PM_ptqgea.png`,
  },
};