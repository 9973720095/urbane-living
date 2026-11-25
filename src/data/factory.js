// Our Factory: home page section + /factory page. Layout: components/FactorySection.jsx, pages/FactoryPage.jsx
// Keep every line TRUE. If a machine, material or step is not in our factory, delete that line.
import { photo } from './media';

// Videos: real factory videos from our Cloudinary (muted, play only while on screen).

const CLD = 'https://res.cloudinary.com/nzqefovs/video/upload';
// TEMPORARY (25 Nov 2026): the 3 factory videos were deleted from Cloudinary. While false, the video parts are hidden
// (home factory card shows a kitchen photo, the factory page shows no video). Upload them again (same names), then set true.
export const FACTORY_VIDEOS_ONLINE = true; // videos uploaded again on 25 Nov 2026
// Factory videos (vertical 9:16). posterAt = second of the video used as the still frame.
const allFactoryVideos = [
  {
    id: 'cnc-cutting',
    title: 'CNC panel cutting',
    text: 'The cutting plan is set on the CNC screen, then every panel is cut to size and labelled for its room.',
    status: 'Our factory',
    posterAt: 4,
    videoUrl: `${CLD}/v1795345328/urbanelivingfactory4_logo_mute_1.mp4`,
  },
  {
    id: 'cnc-router',
    title: 'CNC router at work',
    text: 'Grooves and cut-outs routed on the CNC, with dust pulled away at the machine.',
    status: 'Our factory',
    posterAt: 9,
    videoUrl: `${CLD}/v1795345280/Urbane_Living_Logo_Overlay_Muted.mp4`,
  },
  {
    id: 'edge-banding',
    title: 'Edge banding machine',
    text: 'Panel edges sealed and trimmed on the edge bander, so moisture cannot get into the board.',
    status: 'Our factory',
    posterAt: 1.5,
    videoUrl: `${CLD}/v1795345318/urbanelivingfactory_logo_mute.mp4`,
  },
];
export const factoryVideos = FACTORY_VIDEOS_ONLINE ? allFactoryVideos : [];
const poster = (v, width = 1000) =>
  v.videoUrl.replace('/video/upload/', `/video/upload/so_${v.posterAt},w_${width},q_auto,f_jpg/`).replace(/\.[^/.]+$/, '.jpg');

// Home page section (short) with the button to /factory
export const factoryHome = {
  tag: 'OUR FACTORY',
  title: 'Made in our factory,',
  highlight: 'fitted by our team',
  text: 'Your kitchen, wardrobes and furniture are cut, edge-banded, drilled and finished on machines in our own factory, checked, and then installed at your home by our team.',
  points: [
    'CNC-cut panels for exact sizes',
    'Edges sealed on every side',
    'Quality check before dispatch',
    'Less dust and noise at your home',
  ],
  button: { label: 'See Our Factory', to: '/factory' },
  video: FACTORY_VIDEOS_ONLINE ? allFactoryVideos[0].videoUrl : '',
  poster: FACTORY_VIDEOS_ONLINE ? poster(allFactoryVideos[0], 900) : photo('lShapeKitchenFridge', 900),
  videoLabel: FACTORY_VIDEOS_ONLINE ? 'CNC panel cutting in the Urbane Living factory' : 'L-shaped modular kitchen designed by Urbane Living',
};

export const factoryPage = {
  banner: {
    eyebrow: 'Our Factory',
    title: 'Made in our own factory,',
    highlight: 'fitted by our own team',
    subtitle: 'Modular kitchens, wardrobes and furniture for your full home interior, made on machines to your exact site measurements and installed by the same team.',
    // CNC router video plays behind the banner text (muted); the still frame shows first
    video: FACTORY_VIDEOS_ONLINE ? allFactoryVideos[1].videoUrl.replace('/video/upload/', '/video/upload/q_auto/') : undefined,
    image: FACTORY_VIDEOS_ONLINE ? poster(allFactoryVideos[1], 1400) : undefined,
    imageAlt: 'CNC router cutting a panel in the Urbane Living factory',
    whatsappMessage: 'Hi Urbane Living, I want to know more about your factory-made modular interiors.',
    height: 'md',
    align: 'center',
  },

  intro: {
    tag: 'WHY A FACTORY',
    title: 'Why factory-made interiors last longer',
    paragraphs: [
      'Most site carpentry is cut by hand in your flat, with dust, noise and sizes that are hard to keep exact. In our factory, every panel is cut on machines from your approved 3D design and site measurements, so doors line up, drawers run smoothly and edges stay sealed.',
      'Only fitting happens at your home. That means less dust and noise for your family and your neighbours, and the work finishes faster.',
    ],
  },

  videos: {
    tag: 'INSIDE OUR FACTORY',
    title: 'See our factory in action',
    subtitle: 'Real videos from our factory floor: CNC cutting, routing and edge banding.',
  },

  // Steps from approved design to your home
  process: {
    tag: 'HOW IT IS MADE',
    title: 'From your 3D design to your home',
    steps: [
      { title: 'Design approval & site measurement', text: 'Your 3D design is final and the site is measured again before anything is cut.' },
      { title: 'Cutting list', text: 'Every panel, shutter and shelf is listed with its exact size, board and finish.' },
      { title: 'CNC panel cutting', text: 'Boards are cut on a CNC machine from the design file, for straight, exact sizes.' },
      { title: 'Edge banding', text: 'Edges are sealed with edge band so moisture cannot get into the board.' },
      { title: 'Drilling & grooving', text: 'Holes for hinges, channels and fittings are drilled and grooved by the CNC, in the right place every time.' },
      { title: 'Finishing', text: 'Laminate, acrylic, PU or other finish as chosen in your design.' },
      { title: 'Quality check & packing', text: 'Sizes, edges, finish and hardware are checked, then every part is packed and labelled.' },
      { title: 'Delivery & installation', text: 'Our team fits everything at your home, tests every door and drawer, and cleans up.' },
    ],
  },

  // What is made in the factory (link = our page about it)
  products: {
    tag: 'WHAT WE MAKE',
    title: 'Everything for your full home interior',
    items: [
      { icon: 'kitchen', title: 'Modular kitchens', text: 'Base and wall cabinets, tall units and drawers.', to: '/kitchen' },
      { icon: 'wardrobe', title: 'Wardrobes', text: 'Sliding, hinged and walk-in wardrobes with lofts.', to: '/wardrobe' },
      { icon: 'tv', title: 'TV units & wall panels', text: 'TV walls, back panels and display units.', to: '/living-hall' },
      { icon: 'bed', title: 'Beds & bedroom storage', text: 'Storage beds, side tables and dressers.', to: '/bedroom' },
      { icon: 'crockery', title: 'Crockery & bar units', text: 'Glass-front crockery, bar and coffee units.' },
      { icon: 'pooja', title: 'Pooja units', text: 'Compact and full-height pooja units.' },
      { icon: 'study', title: 'Study & kids furniture', text: 'Study tables, bunk beds and book shelves.' },
      { icon: 'foyer', title: 'Shoe racks & foyer units', text: 'Shoe storage and entrance consoles.' },
    ],
  },

  // Machines and work areas
  machines: {
    tag: 'INSIDE THE FACTORY',
    title: 'Machines that make the difference',
    items: [
      { title: 'CNC nesting machine', text: 'Cuts, grooves and drills every panel from the design file, so sizes and hole positions are exact.' },
      { title: 'Edge banding machine', text: 'Seals and trims board edges cleanly and evenly, keeping out moisture.' },
      { title: 'Dust extraction', text: 'Dust is pulled away right at the machine, keeping panels and the factory clean.' },
      { title: 'Press for laminates', text: 'Bonds laminate and veneer to boards evenly, without bubbles.' },
      { title: 'Finishing area', text: 'For acrylic, PU and other finishes, kept clean and dust-free.' },
      { title: 'Assembly & quality check area', text: 'Parts are checked and dry-fitted before they leave the factory.' },
    ],
  },

  materials: {
    tag: 'MATERIALS',
    title: 'Materials we work with',
    note: 'The exact board, finish and hardware for your home are named in your itemised quote.',
    items: [
      { title: 'BWP plywood', text: 'Boiling-water-proof board for sink units and wet areas.' },
      { title: 'BWR / MR plywood', text: 'Strong, moisture-resistant board for kitchens and wardrobes.' },
      { title: 'HDHMR board', text: 'Dense, moisture-resistant engineered board, good value.' },
      { title: 'Laminates', text: 'Matte, gloss, textured and wood-grain finishes.' },
      { title: 'Acrylic & PU', text: 'High-gloss and smooth painted finishes.' },
      { title: 'Glass & profile shutters', text: 'Glass, fluted and aluminium profile shutters.' },
      { title: 'Soft-close hardware', text: 'Hinges, channels, baskets and lift-ups.' },
    ],
  },

  quality: {
    tag: 'QUALITY CHECKS',
    title: 'Checked before it leaves the factory',
    points: [
      'Moisture-safe board used for sink units and wet areas',
      'All edges sealed with edge band',
      'Every size checked against the site measurement',
      'Hinges, channels and fittings tested',
      'Finish checked for scratches, bubbles and colour match',
      'Parts packed and labelled room by room for safe delivery',
    ],
  },

  compare: {
    title: 'Factory-made vs site carpentry',
    columns: ['Factory-made (Urbane Living)', 'Typical site carpentry'],
    rows: [
      ['Cutting', 'Machine-cut, exact sizes', 'Hand-cut at site'],
      ['Edges', 'Sealed on every side', 'Often left open or uneven'],
      ['Finish', 'Even laminate / acrylic / PU', 'Depends on the worker'],
      ['At your home', 'Fitting only, less dust and noise', 'Weeks of cutting and dust'],
      ['Quality check', 'Before dispatch', 'Usually none'],
    ],
  },

  faqs: [
    { q: 'What is made in your factory?', a: 'Modular kitchens, wardrobes, TV units and wall panels, beds and bedroom storage, crockery units, pooja units, study and kids furniture, and shoe racks: the furniture for a full home interior.' },
    { q: 'Why is factory-made furniture better than site carpentry?', a: 'Panels are cut on a CNC machine and edge-banded on an edge bander, so sizes are exact and edges are sealed against moisture. Only fitting happens at your home, so there is less dust and noise and the work finishes faster.' },
    { q: 'Which materials do you use?', a: 'BWP plywood for sink units and wet areas, BWR/MR plywood or HDHMR for other cabinets, with laminate, acrylic, PU or glass finishes and soft-close hardware. Your quote names the exact board, finish and hardware.' },
    { q: 'How long does production take?', a: 'It depends on what you order and the finish you choose. Your quote includes a written timeline from design approval to installation.' },
  ],

  cta: {
    title: 'Get your home made in our factory',
    text: 'Book a free consultation and 3D design. You see exactly what will be made before production starts.',
    button: 'Get Free 3D Design',
  },

  seo: {
    title: 'Our Factory | Modular Kitchens, Wardrobes & Furniture Made In-House | Urbane Living',
    description:
      'Modular kitchens, wardrobes and furniture for full home interiors, machine-cut, edge-banded and finished in the Urbane Living factory, then installed by our own team in Gurugram and Delhi NCR.',
    path: '/factory',
    image: FACTORY_VIDEOS_ONLINE ? poster(allFactoryVideos[1], 1200) : photo('uShapeKitchen', 1200),
  },
};
