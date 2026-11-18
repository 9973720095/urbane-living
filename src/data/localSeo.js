import { slot } from './media';

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
    image: slot('city.interior-designers.banner', 'livingArchway', 1400, 'City pages (Noida, Gurugram...) › Home Interiors › Top banner'),
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
    title: (c) => `False Ceiling in ${c} | Design & Installation | Urbane Living`,
    description: (c) =>
      `Gypsum, POP, PVC and wooden false ceilings in ${c} with cove and profile lighting. Lights planned in, our own installation team. Free design consultation and site visit.`,
    intro: (c) =>
      `We design and install gypsum, POP, PVC and wooden false ceilings across ${c}, with lighting planned together so the ceiling looks finished on day one.`,
    image: slot('city.false-ceiling.banner', 'livingTvWallWide', 1400, 'City pages (Noida, Gurugram...) › False Ceiling › Top banner'),
    mainLink: { to: '/false-ceiling#cost-estimator', label: 'See designs & work out your cost' },
    includes: [
      { title: 'Gypsum ceiling', text: 'Smooth, crack-resistant finish for living rooms and bedrooms.' },
      { title: 'POP ceiling', text: 'Custom curves and mouldings for classic looks.' },
      { title: 'PVC & wooden', text: 'Moisture-friendly PVC and warm wooden panels.' },
      { title: 'Cove & profile lights', text: 'Lights planned with the ceiling, not added later.' },
      { title: 'Designer ceilings', text: 'Layered, CNC and statement designs.' },
      { title: 'Repair & redo', text: 'Old ceiling replaced or redesigned.' },
    ],
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
    image: slot('city.modular-kitchen.banner', 'lShapeKitchenFridge', 1400, 'City pages (Noida, Gurugram...) › Modular Kitchen › Top banner'),
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
    image: slot('city.wardrobe.banner', 'slidingWardrobeBedroom', 1400, 'City pages (Noida, Gurugram...) › Wardrobe › Top banner'),
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
    // Main focus city. Slug stays 'gurgaon' so the old URLs (already on Google) keep working.
    slug: 'gurgaon',
    name: 'Gurugram',
    region: 'Haryana',
    intro:
      'Gurugram (Gurgaon) is our main focus in Delhi NCR. From premium apartments on Golf Course Road to new possessions on Dwarka Expressway and Sohna Road, we plan every site visit in advance and give you one designer and one site supervisor from 3D design to handover.',
    localities: ['DLF Phase 1–5', 'Golf Course Road', 'Golf Course Extension Road', 'Sohna Road', 'Dwarka Expressway', 'South City', 'Palam Vihar', 'Sector 56', 'Sector 57', 'New Gurgaon'],
    nearby: ['delhi', 'faridabad', 'noida'],
    projects: [],
    localityInfo: {
      'dlf-phase-1-5': {
        about: 'DLF Phases 1 to 5 range from independent builder floors in the older phases to premium high-rise apartments in Phase 5. Builder floors usually need a full refresh with a new kitchen, wardrobes and ceilings, while newer apartments need interiors that match their premium finish. We plan both around the space you already have.',
        societies: [],
        projects: [],
      },
      'golf-course-road': {
        about: 'Homes on Golf Course Road are mostly large, premium apartments with big living rooms, ducted AC and high expectations on finish. We plan the false ceiling around AC ducts and sprinklers, use branded materials named in your quote and keep the design clean and timeless.',
        societies: [],
        projects: [],
      },
      'golf-course-extension-road': {
        about: 'Golf Course Extension Road has many newer high-rise societies, and a lot of owners here have just taken possession. That is the best time to do interiors: we plan the whole flat in one 3D design, so the kitchen, wardrobes, ceilings and living room are done in one go.',
        societies: [],
        projects: [],
      },
      'sohna-road': {
        about: 'Sohna Road has a wide mix of societies, from established apartments to new towers. Whether you are refreshing an older flat or doing up a new one, we give you an itemised quote so you can decide what to do now and what can wait.',
        societies: [],
        projects: [],
      },
      'dwarka-expressway': {
        about: 'Dwarka Expressway is one of the busiest new-possession areas in Gurugram, with many bare flats waiting for their first interiors. We help you go from bare flat to move-in ready: false ceiling, modular kitchen, wardrobes and lighting, planned together and installed by one team.',
        societies: [],
        projects: [],
      },
      'south-city': {
        about: 'South City I and II are established neighbourhoods with many builder floors and independent homes. Older layouts here often need smarter storage and better lighting. We redesign room by room, so you can keep living at home while the work goes on.',
        societies: [],
        projects: [],
      },
      'palam-vihar': {
        about: 'Palam Vihar has plotted houses and builder floors, many of them lived in for years. We usually help families here with a full refresh: a new modular kitchen, made-to-size wardrobes and a false ceiling with warm, modern lighting.',
        societies: [],
        projects: [],
      },
      'sector-56': {
        about: 'Sector 56 has group housing societies and plotted homes close to Golf Course Road. Many flats here are 10 to 20 years old, so a new kitchen, wardrobes and ceiling make the biggest difference. We plan the work around your society rules.',
        societies: [],
        projects: [],
      },
      'sector-57': {
        about: 'Sector 57 has a mix of apartments and builder floors near Golf Course Road and Sohna Road. We design interiors that make older layouts feel open and bright, with storage planned for how your family lives today.',
        societies: [],
        projects: [],
      },
      'new-gurgaon': {
        about: 'New Gurgaon covers the newer sectors along NH-48 and the Dwarka Expressway side, where many families are moving into their first flat. We help you plan a complete home within budget, with a clear 3D design and an itemised quote before any work starts.',
        societies: [],
        projects: [],
      },
    },
  },
  {
    slug: 'ghaziabad',
    name: 'Ghaziabad',
    region: 'Uttar Pradesh',
    intro:
      'Our office is in Vaishali, Ghaziabad, so homes in Indirapuram, Vaishali, Vasundhara and Raj Nagar Extension are just a short drive for our designers and site team.',
    localities: ['Indirapuram', 'Vaishali', 'Vasundhara', 'Kaushambi', 'Raj Nagar Extension', 'Crossings Republik', 'Siddharth Vihar', 'Kavi Nagar', 'Govindpuram', 'Shastri Nagar'],
    nearby: ['noida', 'delhi', 'gurgaon'],
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
    nearby: ['gurgaon', 'greater-noida', 'ghaziabad', 'delhi'],
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
    nearby: ['gurgaon', 'noida', 'ghaziabad'],
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
    nearby: ['gurgaon', 'delhi', 'noida'],
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

  // ── GURUGRAM (main focus) ──────────────────────────────────────
  'false-ceiling/gurgaon': {
    guide: {
      tag: 'FALSE CEILING GUIDE FOR GURUGRAM HOMES',
      title: 'Planning a false ceiling for your Gurugram home',
      paragraphs: [
        'Homes in Gurugram (Gurgaon) range from premium apartments on Golf Course Road and Golf Course Extension Road to new possessions on Dwarka Expressway, Sohna Road and New Gurgaon, plus builder floors in DLF Phases, South City and Palam Vihar. Each needs a different ceiling plan, so we start with a site visit, not a catalogue.',
        'Many premium Gurugram apartments have ducted or VRV air conditioning, sprinklers and smoke detectors in the ceiling. We mark every duct, grille and sprinkler before framing, so the design fits around them and the AC service panels stay reachable. In builder floors with beams, we use peripheral designs that keep the centre of the room high.',
        'For most Gurugram homes we suggest 12.5 mm branded gypsum board on rust-free GI framing, with cove, profile and spot lights planned together. POP works for curves and mouldings, PVC for balconies and wet areas, and wooden panels for a warm accent over the TV wall or dining table.',
      ],
      points: [
        'Design planned around ducted / VRV AC and sprinklers',
        'Cove, profile and spot lights planned with the ceiling',
        '12.5 mm branded gypsum board on rust-free GI framing',
        'Itemised quote per sq. ft., price locked at booking',
        'Written 10-year anti-crack warranty',
        'Installation in 7–10 working days for most homes',
      ],
    },
    ideas: {
      tag: 'DESIGN IDEAS',
      title: 'False ceiling ideas for Gurugram homes',
      items: [
        { title: 'Large living room', text: 'A layered gypsum ceiling with cove lighting, spot lights over the sofa and a chandelier point over the centre table. Ideal for the big living rooms in Golf Course Road apartments.', image: '' },
        { title: 'Master bedroom', text: 'A soft cove or a wooden strip above the bed, dimmable lights and the AC grille hidden neatly inside the ceiling line.', image: '' },
        { title: 'Dining area', text: 'A raised panel or wooden accent over the table, with a pendant light point planned in the ceiling.', image: '' },
        { title: 'Builder floor with beams', text: 'A peripheral ceiling that hides the beams and wiring but keeps the centre high, so the room never feels low.', image: '' },
        { title: 'Kitchen', text: 'Moisture-resistant gypsum or PVC with bright, even lighting over the counter and space kept for the chimney duct.', image: '' },
        { title: 'Balcony & terrace', text: 'PVC or wooden-look panels that handle sun and rain, with warm lights for the evening.', image: '' },
      ],
    },
    society: {
      tag: 'WORKING IN GURUGRAM SOCIETIES',
      title: 'We follow your society’s rules',
      text: 'Most Gurugram societies have strict rules for interior work. We plan around them, so you never have to deal with the maintenance office or neighbours.',
      points: [
        'Work only in the society’s allowed hours',
        'Material and lift booking done with the maintenance office',
        'Floors and lift covered while material moves in',
        'Debris cleared from site regularly, not left in corridors',
        'RWA / maintenance paperwork arranged before work starts',
      ],
    },
    projects: [],
    faqs: [
      {
        q: 'How long does a false ceiling take in a Gurugram flat?',
        a: 'Most 2, 3 and 4 BHK homes are done in 7–10 working days, depending on the number of rooms, the design and your society’s working hours. The timeline is written in your quote.',
      },
      {
        q: 'Can the false ceiling be designed around ducted or VRV AC?',
        a: 'Yes. We mark every duct, grille, sprinkler and service panel at the site visit and design the ceiling around them, so the AC can still be serviced easily.',
      },
      {
        q: 'Gypsum or POP: which is better for a Gurugram apartment?',
        a: 'For most homes we suggest gypsum: it is quicker to install, gives a smooth finish and, with proper framing and joint tape, does not crack. POP is better when you want curves or detailed mouldings.',
      },
      {
        q: 'Do you cover Dwarka Expressway, Sohna Road and Golf Course Extension Road?',
        a: 'Yes. We work across Gurugram, including DLF Phases, Golf Course Road, Golf Course Extension Road, Sohna Road, Dwarka Expressway, South City, Palam Vihar and New Gurgaon.',
      },
    ],
  },

  'interior-designers/gurgaon': {
    guide: {
      tag: 'HOME INTERIORS IN GURUGRAM',
      title: 'Complete home interiors for Gurugram homes',
      paragraphs: [
        'Whether you have just taken possession of a flat on Dwarka Expressway or Golf Course Extension Road, or want to refresh a builder floor in DLF Phases or South City, we plan your whole home in one 3D design. Kitchen, wardrobes, false ceiling, TV unit, lighting and storage are designed together, so every room matches.',
        'Gurugram homes often come with large living rooms, multiple balconies and ducted AC. We design around all of it: TV walls that hide wiring, ceilings planned around AC ducts, and storage in every room so the home stays clutter-free.',
        'You get an itemised quote that names every material and brand, a written timeline and one point of contact from the first site visit to the final handover.',
      ],
      points: [
        'Free site visit and 3D design before you decide',
        'Itemised quote with every material and brand named',
        'Kitchen, wardrobes, ceiling and lighting by one team',
        'Written timeline and regular site updates',
        'Work planned around your society rules',
      ],
    },
    ideas: {
      tag: 'WHAT WE DESIGN',
      title: 'Room-by-room interiors in Gurugram',
      items: [
        { title: 'Living room', text: 'TV wall with closed storage, wall panelling, a layered false ceiling and a lighting plan for guests and movie nights.', image: '' },
        { title: 'Modular kitchen', text: 'L, U, parallel or island kitchens with soft-close fittings and space planned for every appliance.', image: '' },
        { title: 'Bedrooms', text: 'Full-height wardrobes, bed back panels, study corners and soft cove lighting for better sleep.', image: '' },
        { title: 'Kids room', text: 'Bunk or study beds, safe rounded edges and storage that grows with your child.', image: '' },
        { title: 'Dining & crockery unit', text: 'Glass-front crockery units, a bar or coffee corner and a pendant light over the table.', image: '' },
        { title: 'Pooja unit & foyer', text: 'A compact mandir, shoe storage and an entrance console that welcomes guests.', image: '' },
      ],
    },
    society: {
      tag: 'WORKING IN GURUGRAM SOCIETIES',
      title: 'We follow your society’s rules',
      text: 'We plan material delivery, lift booking and working hours with your maintenance office, so your neighbours stay happy and work keeps moving.',
      points: [
        'Work only in the society’s allowed hours',
        'Material and lift booking done with the maintenance office',
        'Floors and lift covered while material moves in',
        'Debris cleared from site regularly',
      ],
    },
    projects: [],
    faqs: [
      {
        q: 'How much does a full home interior cost in Gurugram?',
        a: 'It depends on the size of your home and what you choose: kitchen, wardrobes, ceiling, TV unit, lighting and finishes. After a free site visit and 3D design, you get an itemised quote with the cost of every item.',
      },
      {
        q: 'Do you do interiors for new possession flats on Dwarka Expressway?',
        a: 'Yes. Many of our Gurugram enquiries are new possessions. We plan the whole flat in one 3D design so the work is done in one go.',
      },
      {
        q: 'Can I do my home in stages?',
        a: 'Yes. We can start with the kitchen and wardrobes and add the false ceiling, TV unit and other rooms later, all from one design so everything matches.',
      },
    ],
  },

  'modular-kitchen/gurgaon': {
    guide: {
      tag: 'MODULAR KITCHENS IN GURUGRAM',
      title: 'A kitchen planned for how your family cooks',
      paragraphs: [
        'Kitchens in Gurugram apartments come in every shape: compact parallel kitchens in new towers, L and U-shaped kitchens in larger flats, and open kitchens that face the living room in premium apartments. We measure your kitchen first and then suggest the layout that gives you the most storage and counter space.',
        'Every cabinet is planned around what you store: tall pantry units for dry rations, deep drawers for pots and pressure cookers, corner units that use every inch, and space and power points for chimney, hob, oven, microwave and dishwasher.',
        'You choose the finish (laminate, acrylic or PU) and the countertop, and your quote names every material and fitting brand.',
      ],
      points: [
        'L, U, parallel, straight and island layouts',
        'Soft-close drawers and hinges',
        'Appliance and power-point planning',
        'Under-cabinet lighting over the counter',
        'Free 3D design and itemised quote',
      ],
    },
    projects: [],
    faqs: [
      {
        q: 'Which kitchen layout suits a Gurugram apartment?',
        a: 'L-shaped suits most medium kitchens, U-shaped gives the most storage, and parallel layouts work best in narrow kitchens. Open kitchens in premium apartments often get an island or breakfast counter. Our designer suggests the best one after measuring.',
      },
      {
        q: 'Can you replace my old kitchen without breaking the platform?',
        a: 'In many cases, yes. We check the existing platform, plumbing and electrical points at the site visit and tell you clearly what can stay and what should change.',
      },
    ],
  },

  'wardrobe/gurgaon': {
    guide: {
      tag: 'WARDROBES IN GURUGRAM',
      title: 'Wardrobes made to your wall size',
      paragraphs: [
        'Bedrooms in Gurugram homes vary a lot, from compact rooms in new towers to large master bedrooms with walk-in space. We measure every wall and build sliding, hinged or walk-in wardrobes that fit exactly, including corners, beams and lofts.',
        'Inside, we plan long and short hanging, drawers with dividers, shoe pull-outs, trouser racks and loft storage for bed linen and suitcases. Profile or sensor lights help you find things easily.',
      ],
      points: [
        'Sliding, hinged and walk-in wardrobes',
        'Inside planned around what you store',
        'Laminate, acrylic, glass and fluted shutters',
        'Soft-close fittings and inside lighting',
        'Free 3D design and itemised quote',
      ],
    },
    projects: [],
    faqs: [
      {
        q: 'Sliding or hinged wardrobe for a Gurugram bedroom?',
        a: 'Sliding wardrobes save space in compact rooms because the doors do not open outwards. Hinged wardrobes open fully and usually cost less. Our designer suggests the right one after seeing your room.',
      },
    ],
  },
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
    'Urbane Living designs and installs home interiors, false ceilings, modular kitchens and wardrobes in Gurugram (Gurgaon), Delhi, Noida, Greater Noida, Ghaziabad and Faridabad.',
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