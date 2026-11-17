import { photo } from './media';

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
    image: photo('livingArchway'),
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
    image: photo('livingTvWallWide'),
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
    image: photo('kitchenL'),
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
    image: photo('guestRoom'),
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

/*
  Extra content for ONE service in ONE city (deeper page = better Google ranking for that search).
  Key = 'service-slug/city-slug', e.g. 'false-ceiling/noida' -> /false-ceiling/noida
  Every part is optional. A section shows only when it has content.
  - images: leave '' until you have a REAL photo of that work; the card then shows text only.
  - projects: REAL work only (sector / society + what was done + photo).
*/
export const serviceCityContent = {
  'false-ceiling/noida': {
    guide: {
      tag: 'FALSE CEILING GUIDE FOR NOIDA HOMES',
      title: 'Planning a false ceiling for your Noida flat',
      paragraphs: [
        'Most Noida homes are flats in high-rise societies, from older sectors like 50 and 62 to newer towers along the Noida–Greater Noida Expressway in Sectors 75, 128, 137, 143 and 150. These flats usually come with a plain concrete slab, a few bare light points and AC pipes running along the walls. A false ceiling hides all of that and lets you plan lighting room by room, instead of one tube light in the middle.',
        'Before the first board goes up, our designer checks the ceiling height, beam positions, AC and exhaust points and where your furniture will sit. That way cove lights fall where they look best, the ceiling does not drop too low in rooms with beams, and fan and light points line up with your bed, sofa and dining table.',
        'For most Noida flats we suggest gypsum board ceilings: they are smooth, do not crack when fitted with proper GI framing and joint tape, and suit both 2 BHK and large 4 BHK apartments. POP works well for curved or classic designs, PVC for balconies and bathrooms, and wooden panels when you want a warm accent over the dining or TV area.',
      ],
      points: [
        'Lighting planned with the ceiling: cove, profile and spot lights',
        'Ceiling height and beams checked at the site visit',
        'AC, fan and exhaust points marked before framing',
        '12.5 mm branded gypsum board on rust-free GI framing',
        'Written 10-year anti-crack warranty',
        'Installation in 7–10 working days for most homes',
      ],
    },
    rates: {
      tag: 'FALSE CEILING COST IN NOIDA',
      title: 'False ceiling rates in Noida',
      text: 'Rates are per sq. ft. of ceiling area. Your final, item-wise quote comes after the free site visit and 3D design, and the price is locked when you book.',
      rows: [
        { type: 'Gypsum false ceiling', rate: 'From ₹120/sqft', bestFor: 'Living rooms, bedrooms, full home' },
        { type: 'POP false ceiling', rate: 'From ₹120/sqft', bestFor: 'Curves, mouldings, classic designs' },
        { type: 'PVC panel ceiling', rate: 'From ₹200/sqft', bestFor: 'Balconies, bathrooms, damp areas' },
        { type: 'Wooden ceiling', rate: 'From ₹210/sqft', bestFor: 'Accent over TV wall or dining' },
        { type: 'Light points', rate: '₹450 per point', bestFor: 'Spot, cove and profile lights' },
      ],
      example: {
        title: 'Example: living room in a Noida 3 BHK',
        text: 'A 12 × 16 ft living room (192 sq. ft.) with a gypsum ceiling and cove lighting, plus 8 light points, works out to about ₹31,000. Plain single-level designs cost less; multi-level and wooden designs cost more.',
      },
      note: '*Indicative rates. The exact price depends on design, material, lighting and site conditions.',
    },
    ideas: {
      tag: 'DESIGN IDEAS',
      title: 'False ceiling ideas for every room',
      items: [
        { title: 'Living room', text: 'A peripheral gypsum ceiling with warm cove lighting and a few spot lights over the sofa and TV wall. It makes standard Noida living rooms feel taller and more finished.', image: '' },
        { title: 'Master bedroom', text: 'A soft cove or a wooden strip above the bed, with dimmable lights for night-time. Fan point stays centred over the bed.', image: '' },
        { title: 'Kids room', text: 'Simple shapes, bright profile lights and easy-to-clean paint. We keep designs playful but timeless, so they still work as children grow.', image: '' },
        { title: 'Dining area', text: 'A raised panel or wooden accent right above the table, with a pendant light point planned in the ceiling.', image: '' },
        { title: 'Kitchen', text: 'Moisture-resistant gypsum or PVC with bright, even lighting over the counter and space kept for the chimney duct.', image: '' },
        { title: 'Balcony', text: 'PVC or wooden-look panels that handle sun and rain, with one or two warm lights for the evening.', image: '' },
      ],
    },
    society: {
      tag: 'WORKING IN NOIDA SOCIETIES',
      title: 'We follow your society’s rules',
      text: 'Most Noida societies have rules for interior work. We plan around them, so you never have to deal with complaints from the maintenance office or neighbours.',
      points: [
        'Work only in the society’s allowed hours',
        'Material and lift booking done with the maintenance office',
        'Floors and lift covered while material moves in',
        'Debris cleared from site regularly, not left in corridors',
        'Your RWA / maintenance paperwork arranged before work starts',
      ],
    },
    projects: [],
    faqs: [
      {
        q: 'How long does a false ceiling take in a Noida flat?',
        a: 'Most 2 and 3 BHK flats are done in 7–10 working days, depending on the number of rooms, design and your society’s working hours. The timeline is written in your quote.',
      },
      {
        q: 'Gypsum or POP: which is better for a Noida apartment?',
        a: 'For most flats we suggest gypsum: it is quicker to install, gives a smooth finish and, with proper framing and joint tape, does not crack. POP is better when you want curves or detailed mouldings.',
      },
      {
        q: 'Will a false ceiling make my room look smaller?',
        a: 'Not when it is planned well. We check the ceiling height at the site visit and usually suggest a peripheral design that drops only around the edges, so the centre stays high and the room feels taller with cove lighting.',
      },
      {
        q: 'Do I need permission from my Noida society for false ceiling work?',
        a: 'Most societies only need you to inform the maintenance office and follow their working hours and material rules. We help with the paperwork and plan the work around those rules.',
      },
    ],
  },
};

export const findServiceCityContent = (serviceSlug, citySlug) => serviceCityContent[`${serviceSlug}/${citySlug}`] || null;

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