// Living Hall page (/living-hall). Layout: components/RoomPage.jsx
import { cdn } from '../config';
import { highlights } from '../common';

// Living Hall page (/living-hall). Designs come from the database (admin "Living Hall" + sheet "living").
export const livingPage = {
  api: '/api/living',
  category: 'living',
  service: 'Living Room Interior Design',
  breadcrumb: 'Living Room Interiors',
  altSuffix: 'living room interior design',
  faqTitle: 'Living room interior FAQs',
  banner: {
    eyebrow: 'Living Room Interiors · Delhi NCR',
    title: 'Living rooms your guests',
    highlight: 'never forget',
    subtitle: 'TV units, designer ceilings, wall panels and lighting, planned together in one 3D design and installed by one team.',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583856/hf_20260512_054108_38408685-f67f-4515-a822-985d83019979_y6nnq9.png`,
    imageAlt: 'Modern living room with TV unit, cove-lit false ceiling and wall panelling by Urbane Living',
    whatsappMessage: 'Hi Urbane Living, I want a free 3D design for my living room.',
    align: 'left',
    highlights,
  },
  gallery: {
    title: 'Living room designs by Urbane Living',
    subtitle: 'Real designs from our team. Tap any design to see it bigger, or get the same look for your home.',
    empty: 'New living room designs are being added. Get a free 3D design made for your own living room.',
  },
  elements: {
    title: 'Everything your living room needs',
    subtitle: 'Pick what you want. We design it all together, so every piece matches.',
    items: [
      { icon: 'tv', title: 'TV Unit & Media Wall', text: 'Wall-mounted or floor units with hidden wiring, storage and back-lit panels.' },
      { icon: 'ceiling', title: 'Designer False Ceiling', text: 'Cove lights, profile lights and layered designs that set the mood of the room.', to: '/false-ceiling' },
      { icon: 'panel', title: 'Wall Panelling', text: 'Fluted, wooden, stone-finish or upholstered panels behind the TV or sofa.' },
      { icon: 'light', title: 'Lighting Plan', text: 'Warm, bright and accent lights planned for movie nights, guests and daily use.' },
      { icon: 'storage', title: 'Crockery & Bar Units', text: 'Glass-front display units and bar cabinets that keep things neat and stylish.' },
      { icon: 'foyer', title: 'Foyer & Partition', text: 'Shoe storage, mirror panels and jaali partitions for a grand entrance.' },
    ],
  },
  sizes: {
    title: 'Ideas for every living room size',
    items: [
      {
        tag: 'Compact',
        title: 'Small living rooms (1 BHK / flats)',
        points: ['Wall-mounted TV unit to free up floor space', 'Light colours and a flat ceiling with cove light', 'Mirrors and slim shelves to make the room feel bigger'],
      },
      {
        tag: 'Family',
        title: 'Medium living rooms (2–3 BHK)',
        points: ['TV wall with closed storage and display niches', 'Layered false ceiling to zone living and dining', 'Warm wood with one accent wall'],
      },
      {
        tag: 'Grand',
        title: 'Large living rooms (villas / duplex)',
        points: ['Double-height feature walls and statement lights', 'Separate lounge, bar and conversation zones', 'Marble-finish panels and designer ceilings'],
      },
    ],
  },
  steps: {
    title: 'From idea to your new living room',
    items: [
      { title: 'Free consultation', text: 'Our designer visits, measures and understands how your family uses the room.' },
      { title: '3D design & quote', text: 'See your living room in 3D with an itemised, room-wise quote.' },
      { title: 'Production', text: 'Furniture and panels are made to size with branded materials.' },
      { title: 'Installation & handover', text: 'Our team installs, cleans up and hands over your new living room.' },
    ],
  },
  faqs: [
    { q: 'How much does living room interior design cost?', a: 'It depends on the size of the room and what you choose: TV unit, ceiling, panelling, lighting and storage. After a free site visit you get an itemised quote so you know the cost of each item.' },
    { q: 'How long does a living room interior take?', a: 'It depends on the scope. Your quote includes a written timeline, and a false ceiling alone is typically ready in 7 days after design approval.' },
    { q: 'Can you design my living room in a small flat?', a: 'Yes. We use wall-mounted units, light colours, mirrors and smart storage to make small living rooms look bigger and stay clutter-free.' },
    { q: 'Will I see the design before work starts?', a: 'Yes. You get a 3D design of your living room first. Work starts only after you approve it.' },
    { q: 'Which areas do you serve?', a: 'We work across Delhi NCR: Delhi, Noida, Greater Noida, Ghaziabad, Gurgaon and Faridabad.' },
  ],
  cta: {
    title: 'Ready to transform your living room?',
    text: 'Book a free consultation and get a 3D design of your living room.',
    button: 'Get Free 3D Design',
  },
  seo: {
    title: 'Living Room Interior Design in Delhi NCR | TV Units, Ceilings & Panels | Urbane Living',
    description:
      'Modern living room interior design in Delhi, Noida, Ghaziabad and Gurgaon. TV units, false ceilings, wall panelling and lighting with a free 3D design and itemised quote.',
    path: '/living-hall',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583856/hf_20260512_054108_38408685-f67f-4515-a822-985d83019979_y6nnq9.png`,
  },
};
