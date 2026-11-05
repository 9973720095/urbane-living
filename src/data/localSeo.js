import { cdn } from './config';

/*
  City × Service landing pages (local SEO), e.g. /false-ceiling/noida, /interior-designers/ghaziabad
  - Add a city here and all 4 service pages for it appear automatically (+ add them to public/sitemap.xml).
  - projects: add REAL work only (society + sector + what you did). The section shows only when filled.
*/

export const localServices = [
  {
    slug: 'interior-designers',
    name: 'Home Interiors',
    h1: (c) => `Home Interior Designers in ${c}`,
    title: (c) => `Home Interior Designers in ${c} | Urbane Living`,
    description: (c) =>
      `Full home interiors in ${c}: modular kitchens, wardrobes, false ceilings, TV units and lighting, designed in 3D and installed by one team. Book a free consultation.`,
    intro: (c) =>
      `From the first site visit to the final handover, our designers plan your complete home in ${c} in one 3D design, so every room matches and nothing is left to chance.`,
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583856/hf_20260512_054108_38408685-f67f-4515-a822-985d83019979_y6nnq9.png`,
    mainLink: { to: '/living-hall', label: 'See our living room designs' },
    includes: [
      { title: 'Modular kitchen', text: 'L, U, parallel or island kitchens with soft-close fittings.' },
      { title: 'Wardrobes', text: 'Sliding, hinged or walk-in, sized to your wall.' },
      { title: 'False ceiling & lights', text: 'Gypsum, POP or wooden ceilings with cove and profile lights.' },
      { title: 'Living & TV unit', text: 'TV wall, panelling, crockery and storage units.' },
      { title: 'Bedrooms & kids rooms', text: 'Bed back panels, study tables and smart storage.' },
      { title: 'Pooja unit & foyer', text: 'Mandir, shoe racks and entrance consoles.' },
    ],
    price: null,
    serviceType: 'Interior Design',
  },
  {
    slug: 'false-ceiling',
    name: 'False Ceiling',
    h1: (c) => `False Ceiling Design & Installation in ${c}`,
    title: (c) => `False Ceiling in ${c} | From ₹120/sqft | Urbane Living`,
    description: (c) =>
      `Gypsum, POP, PVC and wooden false ceilings in ${c} with cove and profile lighting. Rates from ₹120/sqft. Free design consultation and site visit.`,
    intro: (c) =>
      `We design and install gypsum, POP, PVC and wooden false ceilings across ${c}, with lighting planned together so the ceiling looks finished on day one.`,
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583839/ChatGPT_Image_May_12_2026_03_21_15_PM_eftzu7.png`,
    mainLink: { to: '/false-ceiling', label: 'Explore false ceiling designs & cost estimator' },
    includes: [
      { title: 'Gypsum ceiling', text: 'Smooth, crack-resistant finish for living rooms and bedrooms.' },
      { title: 'POP ceiling', text: 'Custom curves and mouldings for classic looks.' },
      { title: 'PVC & wooden', text: 'Moisture-friendly PVC and warm wooden panels.' },
      { title: 'Cove & profile lights', text: 'Lights planned with the ceiling, not added later.' },
      { title: 'Designer ceilings', text: 'Layered, CNC and statement designs.' },
      { title: 'Repair & redo', text: 'Old ceiling replaced or redesigned.' },
    ],
    price: { from: 120, to: 210, unit: 'sqft', label: 'From ₹120/sqft' },
    serviceType: 'False Ceiling Installation',
  },
  {
    slug: 'modular-kitchen',
    name: 'Modular Kitchen',
    h1: (c) => `Modular Kitchen Designers in ${c}`,
    title: (c) => `Modular Kitchen in ${c} | Design & Installation | Urbane Living`,
    description: (c) =>
      `Modular kitchens in ${c}: L-shaped, U-shaped, parallel and island designs with smart storage and easy-clean finishes. Free 3D design and site visit.`,
    intro: (c) =>
      `Your kitchen in ${c} is planned around how your family cooks: the right storage for every utensil, finishes that clean easily and fittings that last.`,
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_38_54_PM_v8bjr3.png`,
    mainLink: { to: '/kitchen', label: 'See our modular kitchen designs' },
    includes: [
      { title: 'All layouts', text: 'L-shaped, U-shaped, parallel, straight and island.' },
      { title: 'Smart storage', text: 'Tandem drawers, corner units, tall pantry and baskets.' },
      { title: 'Finishes', text: 'Laminate, acrylic, PU and membrane shutters.' },
      { title: 'Countertops', text: 'Granite, quartz and other worktops.' },
      { title: 'Appliance planning', text: 'Space for chimney, hob, oven and microwave.' },
      { title: 'Lighting', text: 'Under-cabinet and task lights over the counter.' },
    ],
    price: null,
    serviceType: 'Modular Kitchen Design',
  },
  {
    slug: 'wardrobe',
    name: 'Wardrobe',
    h1: (c) => `Wardrobe Designers in ${c}`,
    title: (c) => `Wardrobe Design in ${c} | Sliding & Hinged | Urbane Living`,
    description: (c) =>
      `Sliding, hinged and walk-in wardrobes in ${c}, made to your wall size with lofts, drawers and organisers. Free design consultation and site visit.`,
    intro: (c) =>
      `We build wardrobes in ${c} to your exact wall size, and plan the inside around what you actually store: clothes, shoes, bags and bed linen.`,
    image: `${cdn}/image/upload/q_auto/f_auto/v1778585454/ChatGPT_Image_May_12_2026_04_30_35_PM_ptqgea.png`,
    mainLink: { to: '/wardrobe', label: 'See our wardrobe designs' },
    includes: [
      { title: 'Sliding wardrobes', text: 'Space-saving doors for compact bedrooms.' },
      { title: 'Hinged wardrobes', text: 'Full-access doors with lofts.' },
      { title: 'Walk-in closets', text: 'Open or glass-front dressing areas.' },
      { title: 'Inside planning', text: 'Hanging, drawers, trouser racks and shoe pull-outs.' },
      { title: 'Finishes', text: 'Laminate, acrylic, mirror and glass shutters.' },
      { title: 'Lighting', text: 'Profile and sensor lights inside.' },
    ],
    price: null,
    serviceType: 'Wardrobe Design',
  },
];

/*
  Cities and their localities.
  localityInfo (optional, REAL details only), key = locality slug, e.g.
  'indirapuram': { about: '...', societies: ['Society name'], projects: [{ title, text, image }] }
  - about: replaces the default intro on the locality page
  - societies / projects: add ONLY real ones. Empty [] = that section stays hidden.
*/
export const localCities = [
  {
    slug: 'ghaziabad',
    name: 'Ghaziabad',
    region: 'Uttar Pradesh',
    intro:
      'Our office is in Vaishali, Ghaziabad, so homes in Indirapuram, Vaishali, Vasundhara and Raj Nagar Extension are just a short drive for our designers and site team.',
    localities: ['Indirapuram', 'Vaishali', 'Vasundhara', 'Kaushambi', 'Raj Nagar Extension', 'Crossings Republik', 'Siddharth Vihar', 'Kavi Nagar', 'Govindpuram', 'Shastri Nagar'],
    nearby: ['noida', 'delhi', 'greater-noida'],
    projects: [],
    localityInfo: {
      'vaishali': {
        about: 'Vaishali is home for us. Our office is right here, so most site visits happen the same day you call. We know the mix well: older sector apartments that need a full refresh, and builder floors where every room is a different shape. We design around what you already have, not around a showroom catalogue.',
        societies: [],
        projects: [],
      },
      'indirapuram': {
        about: 'Indirapuram flats are mostly 2 and 3 BHK apartments, many of them now 10–15 years old. That usually means tired kitchens, wardrobes that never had enough space, and ceilings that could use better lighting. We plan the whole home in one go, so the kitchen, bedrooms and living room feel like they belong together.',
        societies: [],
        projects: [],
      },
      'vasundhara': {
        about: 'Vasundhara has everything from compact sector flats to roomy builder floors. Smaller homes here need storage that does not eat up the room, so we lean on floor-to-ceiling wardrobes, loft storage and kitchens that use every corner. It is a short drive from our Vaishali office, so visits and installation checks are easy.',
        societies: [],
        projects: [],
      },
      'kaushambi': {
        about: 'Kaushambi sits right on the Delhi border, and many homes here are older apartments that families have lived in for years. Our job is usually to make them feel new without a messy, months-long renovation: a fresh modular kitchen, smarter wardrobes and a false ceiling with warm lighting. We plan the work room by room so you can keep living at home.',
        societies: [],
        projects: [],
      },
      'raj-nagar-extension': {
        about: 'Raj Nagar Extension is full of newer high-rise societies, and many of our clients here have just taken possession of their flat. That is the best time to do interiors: empty walls, no shifting hassle, one clean plan. We help you decide what to do now and what can wait, so the budget goes where it matters most.',
        societies: [],
        projects: [],
      },
      'crossings-republik': {
        about: 'Crossings Republik is a self-contained township, and flats here tend to share a few standard layouts. That makes it easy to show you what works: we have seen these floor plans before and know where storage fits best. We still design every home around the family living in it, not around a copy-paste template.',
        societies: [],
        projects: [],
      },
    },
  },
  {
    slug: 'noida',
    name: 'Noida',
    region: 'Uttar Pradesh',
    intro:
      'From compact flats to large apartments in Noida’s sectors, we design interiors that make the most of every wall and corner, with clear timelines for society work rules.',
    localities: ['Sector 50', 'Sector 62', 'Sector 75', 'Sector 76', 'Sector 78', 'Sector 93', 'Sector 128', 'Sector 137', 'Sector 143', 'Sector 150'],
    nearby: ['greater-noida', 'ghaziabad', 'delhi'],
    projects: [],
    localityInfo: {},
  },
  {
    slug: 'greater-noida',
    name: 'Greater Noida',
    region: 'Uttar Pradesh',
    intro:
      'Many homes in Greater Noida and Greater Noida West are new possessions. We help you go from bare flat to move-in ready, room by room, in one plan.',
    localities: ['Greater Noida West (Noida Extension)', 'Gaur City', 'Techzone 4', 'Alpha', 'Beta', 'Gamma', 'Omicron', 'Pari Chowk', 'Knowledge Park', 'Sector 1'],
    nearby: ['noida', 'ghaziabad', 'delhi'],
    projects: [],
    localityInfo: {},
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    region: 'Delhi',
    intro:
      'Builder floors, DDA flats or independent houses across Delhi: we plan interiors around older layouts, renovation needs and the way your family lives today.',
    localities: ['Dwarka', 'Rohini', 'Pitampura', 'Janakpuri', 'Laxmi Nagar', 'Mayur Vihar', 'Preet Vihar', 'Saket', 'Vasant Kunj', 'Greater Kailash'],
    nearby: ['noida', 'ghaziabad', 'gurgaon'],
    projects: [],
    localityInfo: {},
  },
  {
    slug: 'gurgaon',
    name: 'Gurgaon',
    region: 'Haryana',
    intro:
      'For apartments and builder floors across Gurgaon, we design modern interiors with premium finishes, planned in 3D before any work starts.',
    localities: ['DLF Phase 1–5', 'Golf Course Road', 'Golf Course Extension Road', 'Sohna Road', 'Dwarka Expressway', 'South City', 'Palam Vihar', 'Sector 56', 'Sector 57', 'New Gurgaon'],
    nearby: ['delhi', 'faridabad', 'noida'],
    projects: [],
    localityInfo: {},
  },
  {
    slug: 'faridabad',
    name: 'Faridabad',
    region: 'Haryana',
    intro:
      'From established sectors to new societies in Greater Faridabad, we design interiors that balance style, storage and budget for your family.',
    localities: ['Sector 15', 'Sector 21', 'Greater Faridabad (Neharpar)', 'Sector 81–89', 'NIT', 'Surajkund', 'Ballabgarh', 'Sector 37', 'Sector 46', 'Sector 9'],
    nearby: ['delhi', 'gurgaon', 'noida'],
    projects: [],
    localityInfo: {},
  },
];

// Process shown on every local page
export const localProcess = [
  { title: 'Free consultation', text: 'Tell us about your home, budget and style on a call or WhatsApp.' },
  { title: 'Site visit & measurement', text: 'Our designer visits, measures and understands your space.' },
  { title: '3D design & quote', text: 'See your home in 3D with a clear, item-wise quote.' },
  { title: 'Installation & handover', text: 'Our team installs, checks every detail and hands over.' },
];

// /interior-designers hub page
export const areasPage = {
  title: 'Interior Designers Across Delhi NCR | Areas We Serve | Urbane Living',
  description:
    'Urbane Living designs and installs home interiors, false ceilings, modular kitchens and wardrobes in Ghaziabad, Noida, Greater Noida, Delhi, Gurgaon and Faridabad.',
  h1: 'Interior designers across',
  highlight: 'Delhi NCR',
  text: 'Pick your city to see what we do there, the areas we cover and how to get a free consultation.',
};

// URL-safe slug: 'DLF Phase 1–5' -> 'dlf-phase-1-5', 'Greater Noida West (Noida Extension)' -> 'greater-noida-west-noida-extension'
export const slugify = (text) =>
  text.toLowerCase().replace(/[()]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Locality pages: /interior-designers/:city/:locality
export const localityPage = {
  h1: (l, c) => `Interior Designers in ${l}, ${c}`,
  title: (l, c) => `Interior Designers in ${l}, ${c} | Urbane Living`,
  description: (l, c) =>
    `Home interiors in ${l}, ${c}: modular kitchen, wardrobes, false ceiling and full home design in 3D, installed by one team. Free site visit and consultation.`,
  intro: (l, c) =>
    `Moving into or renovating a home in ${l}? Our designers visit your flat, measure every wall and plan your kitchen, wardrobes, ceilings and living spaces together in one 3D design for your ${c} home.`,
};

export const findLocality = (city, slug) => {
  const name = city?.localities.find((l) => slugify(l) === slug);
  if (!name) return null;
  return { name, slug, ...(city.localityInfo?.[slug] || {}) };
};

export const findLocalService = (slug) => localServices.find((s) => s.slug === slug);
export const findLocalCity = (slug) => localCities.find((c) => c.slug === slug);