// Bedroom page (/bedroom). Layout: components/RoomPage.jsx
import { cdn } from '../config';
import { highlights } from '../common';

// Bedroom page (/bedroom). Designs come from the database (admin "Bedroom" + sheet "bedroom").
export const bedroomPage = {
  api: '/api/bedroom',
  category: 'bedroom',
  service: 'Bedroom Interior Design',
  breadcrumb: 'Bedroom Interiors',
  altSuffix: 'bedroom interior design',
  faqTitle: 'Bedroom interior FAQs',
  banner: {
    eyebrow: 'Bedroom Interiors · Delhi NCR',
    title: 'Bedrooms designed for',
    highlight: 'better sleep',
    subtitle: 'Wardrobes, bed back panels, soft lighting and smart storage, planned in one 3D design around how you rest and live.',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583838/ChatGPT_Image_May_12_2026_03_16_05_PM_pnlauy.png`,
    imageAlt: 'Master bedroom with upholstered bed back panel, wardrobe and cove lighting by Urbane Living',
    whatsappMessage: 'Hi Urbane Living, I want a free 3D design for my bedroom.',
    align: 'left',
    highlights,
  },
  gallery: {
    title: 'Bedroom designs by Urbane Living',
    subtitle: 'Master bedrooms, kids rooms and guest rooms by our team. Tap any design to see it bigger.',
    empty: 'New bedroom designs are being added. Get a free 3D design made for your own bedroom.',
  },
  elements: {
    title: 'Everything your bedroom needs',
    subtitle: 'Choose what you need. We design it all together so your bedroom feels calm and complete.',
    items: [
      { icon: 'wardrobe', title: 'Wardrobes', text: 'Sliding or hinged wardrobes with lofts, drawers and organisers made to your wall size.', to: '/wardrobe' },
      { icon: 'bed', title: 'Bed & Back Panel', text: 'Storage beds with upholstered, fluted or wooden back panels and side tables.' },
      { icon: 'ceiling', title: 'Designer False Ceiling', text: 'Soft cove lighting that is easy on the eyes at night, with a fan-ready frame.', to: '/false-ceiling' },
      { icon: 'dressing', title: 'Dressing Unit', text: 'Mirror, drawers and lights for getting ready, even in small rooms.' },
      { icon: 'study', title: 'Study / Work Corner', text: 'A compact desk with shelves and wire management for work from home.' },
      { icon: 'kids', title: 'Kids & Guest Rooms', text: 'Bunk beds, study units and playful colours that grow with your child.' },
    ],
  },
  sizes: {
    title: 'Ideas for every bedroom',
    items: [
      {
        tag: 'Master',
        title: 'Master bedroom',
        points: ['Full-height wardrobe with a loft for extra storage', 'Upholstered bed back panel with side lights', 'Layered ceiling with warm cove light'],
      },
      {
        tag: 'Compact',
        title: 'Small bedrooms & flats',
        points: ['Hydraulic storage bed to hide bulky items', 'Sliding wardrobe doors to save walking space', 'Light colours and mirrors to open up the room'],
      },
      {
        tag: 'Kids',
        title: "Kids' bedroom",
        points: ['Study table with shelves at the right height', 'Bunk or trundle bed for sleepovers', 'Rounded edges and easy-clean finishes'],
      },
    ],
  },
  steps: {
    title: 'From idea to your new bedroom',
    items: [
      { title: 'Free consultation', text: 'Our designer visits, measures and understands your storage and comfort needs.' },
      { title: '3D design & quote', text: 'See your bedroom in 3D with an itemised quote before you decide.' },
      { title: 'Production', text: 'Wardrobes, beds and panels are made to size with branded materials.' },
      { title: 'Installation & handover', text: 'Our team installs, cleans up and hands over your new bedroom.' },
    ],
  },
  faqs: [
    { q: 'How much does bedroom interior design cost?', a: 'It depends on the room size and what you choose: wardrobe, bed, ceiling, dressing unit and lighting. After a free site visit you get an itemised quote with the cost of each item.' },
    { q: 'Sliding or hinged wardrobe: which is better for my bedroom?', a: 'Sliding wardrobes save space in small rooms because the doors do not open outwards. Hinged wardrobes cost less and give full access to the inside. Our designer will suggest the right one for your room.' },
    { q: 'Can you make a small bedroom feel bigger?', a: 'Yes. We use storage beds, sliding doors, wall-mounted units, light colours and mirrors to make small bedrooms feel open and clutter-free.' },
    { q: 'Will I see the design before work starts?', a: 'Yes. You get a 3D design of your bedroom first. Work starts only after you approve it.' },
    { q: 'Which areas do you serve?', a: 'We work across Delhi NCR: Delhi, Noida, Greater Noida, Ghaziabad, Gurgaon and Faridabad.' },
  ],
  cta: {
    title: 'Ready for a bedroom you love waking up in?',
    text: 'Book a free consultation and get a 3D design of your bedroom.',
    button: 'Get Free 3D Design',
  },
  seo: {
    title: 'Bedroom Interior Design in Delhi NCR | Wardrobes, Beds & Ceilings | Urbane Living',
    description:
      'Modern bedroom interior design in Delhi, Noida, Ghaziabad and Gurgaon. Wardrobes, storage beds, back panels, false ceilings and lighting with a free 3D design and itemised quote.',
    path: '/bedroom',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583838/ChatGPT_Image_May_12_2026_03_16_05_PM_pnlauy.png`,
  },
};
