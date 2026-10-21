// Single source for homepage content. Edit text, images, videos, phone numbers here;
// the components only read from this file.

export const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://urbane-living.onrender.com';

const cdn = 'https://res.cloudinary.com/diosq0s7w';

export const brand = {
  name: 'Urbane Living',
  tagline: 'Where Design Finds Its Home',
  logo: `${cdn}/image/upload/q_auto/f_auto/v1777899675/UrbaneLiving_Logo_6_1_dfh2r1.png`,
  logoIcon: `${cdn}/image/upload/q_auto/f_auto/v1778232393/urbane-logo-transparent-icon-removebg-preview_jepdln.png`,
  modalImage: `${cdn}/image/upload/q_auto/f_auto/v1778563293/urbaneLiving_l2vjuj.png`,
};

export const contact = {
  phoneDisplay: '+91-1800-123-6407',
  phoneHref: 'tel:+9118001236407',
  whatsappHref: 'https://wa.me/919105052454',
  email: 'urbanelivingofficial@gmail.com',
  address: 'G-12 Express Green Plaza, Sector-1, Vaishali, Ghaziabad',
};

export const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/urbaneliving.in', hover: 'hover:bg-[#1877f2]' },
  { name: 'YouTube', href: 'https://www.youtube.com/@urbaneliving-ncr', hover: 'hover:bg-[#ff0000]' },
  { name: 'X', href: 'https://x.com/UrbaneLiving001', hover: 'hover:bg-black' },
  { name: 'Instagram', href: 'https://www.instagram.com/urbaneliving.in', hover: 'hover:bg-[#E1306C]' },
];

export const navLinks = {
  services: [
    { label: 'Bedroom Design', to: '/bedroom' },
    { label: 'Living Hall', to: '/living-hall' },
    { label: 'Modular Kitchen', to: '/kitchen' },
    { label: 'Wardrobe Design', to: '/wardrobe' },
  ],
};

export const hero = {
  eyebrow: 'Interior & False Ceiling Experts · Delhi NCR',
  titleStart: 'Get Your False Ceiling',
  titleAccent: 'Just 7 Days*',
  subTitle: 'Click today move into your Dream Home Tomorrow.',
  video: `${cdn}/video/upload/q_auto/f_auto/v1778846969/AQPPPai3iDlmpoWAl2Do5RAPE5X-opF5dVERGYcK0KMopwZThd4xaz6sAKKnZPuHhL1767QbSXcO9pvrpYJ-1oC9QZJR5f_tiq89RE4_detdg9.mp4`,
  cta: { label: 'Explore Designs', to: '/false-ceiling' },
  formTitle: 'Beautiful Designs That Fit Your Budget',
  formSubtitle: 'Beauty That Works, Function That Inspires! Guaranteed,',
};

export const highlights = [
  { key: 'design', text: 'Personalised designs', icon: 'https://spaceinterio.co.in/wp-content/uploads/2024/07/Personalised-designs-e1720440694404.png' },
  { key: 'warranty', text: '10-year warranty¹', icon: 'https://spaceinterio.co.in/wp-content/uploads/2024/07/Personalised-designs-5-e1720442786627.png' },
  { key: 'pricing', text: 'Transparent pricing', icon: 'https://spaceinterio.co.in/wp-content/uploads/2024/07/Personalised-designs-6-e1720443121163.png' },
];

export const countryCodes = [
  { code: '+91', iso: 'in', name: 'India' },
  { code: '+971', iso: 'ae', name: 'UAE' },
  { code: '+1', iso: 'us', name: 'USA / Canada' },
  { code: '+44', iso: 'gb', name: 'UK' },
  { code: '+61', iso: 'au', name: 'Australia' },
  { code: '+65', iso: 'sg', name: 'Singapore' },
  { code: '+966', iso: 'sa', name: 'Saudi Arabia' },
  { code: '+974', iso: 'qa', name: 'Qatar' },
  { code: '+968', iso: 'om', name: 'Oman' },
  { code: '+965', iso: 'kw', name: 'Kuwait' },
  { code: '+977', iso: 'np', name: 'Nepal' },
];

export const inquiryOptions = {
  states: ['Delhi', 'Bihar', 'UP'],
  propertyTypes: ['Residential', 'Commercial'],
};

export const brandStory = {
  title: 'Your Space, Your Story! Let It Shine',
  text: 'At Urbane Living, we craft living spaces that are both stylish and functional. With modern technology and quality materials, We design spaces that reflect you and stand the test of time, and also that last for years to come',
  cta: 'BOOK FREE CONSULTATION',
};

// Home page "spaces" slider. Each title / text describes what its own video shows.
export const spaces = {
  titleStart: 'Make a wow statement with',
  titleAccent: 'your ceiling',
  titleEnd: 'that reflects your signature style.',
  items: [
    {
      title: 'Bedrooms That Make You Smile',
      subtitle: 'Soft cove lighting and a designer ceiling turn a plain room into the happiest corner of your home.',
      tag: 'Bedroom',
      media: `${cdn}/video/upload/q_auto/f_auto/v1778839744/AQPhaRo_a-msuEzQOK7x3YpSYHWTfUY8uLWN4iQ3rkvvPp20GVJbk3BLFOJbalAv6GAPGRPDJ2sHF4zbGlqw5b2PWUeiH5jdTQm3bbE_nnrkk3.mp4`,
    },
    {
      title: 'A Living Room Worth Coming Home To',
      subtitle: 'Warm cove lights, a sleek TV unit and a ceiling that welcomes your family and guests every evening.',
      tag: 'Living Room',
      media: `${cdn}/video/upload/q_auto/f_auto/v1778841063/AQOPehEm1fYTPYDa4uXJixmnSPgh-IIRDGgy22OaHWrvmy_qMoE_nA8hNNERzHG2UUBlApGeUSSqUA7Ayifn9qfROxxfjDXmQ7-DbPY_xzkj0t.mp4`,
    },
    {
      title: 'Grand Circular Ceiling Designs',
      subtitle: 'A layered round ceiling with cove light and spotlights that makes your living & dining area the centre of attention.',
      tag: 'Living & Dining',
      media: `${cdn}/video/upload/q_auto/f_auto/v1778841286/AQNA7088aweDdCcEuRKBCuk-1P7DjMBbOT7Cy9UDB4ksu8_rW7u9Huj9tVBhkLGFqrhLFRWLJ4faJWexBLUi_3Uf-8FkOyqatmcOfFA_iy7qef.mp4`,
    },
    {
      title: 'Classic Cove-Lit Lounges',
      subtitle: 'A clean peripheral ceiling with hidden LED cove light, textured wallpaper and a matching TV wall for a luxe, hotel-like feel.',
      tag: 'Living Room',
      media: `${cdn}/video/upload/q_auto/f_auto/v1778841391/AQO8hYQEZeJXZRk2dob-Wm8mYUAdz8m0M6DNaQ0cgpOhN6T4KVjd0k_SxPE1iOFzHDdM1EGqrgNX3Z9gebC4mamYO0PBYMhgYMX95i8_soamkt.mp4`,
    },
  ],
};

export const ceiling = {
  eyebrow: 'Premium Interior Solutions',
  titleStart: 'The Art of Silence and Light:',
  titleAccent: 'Signature Ceilings',
  text: 'Transform your overhead space into a captivating masterpiece. Our UrbaneLiving-certified installations offer sculpted architectural depth and intimate, premium ambiance that lasts a lifetime.',
  points: ['100% Termite Proof', 'Fire Resistant Material', 'Seamless Lighting Integration'],
  video: `${cdn}/video/upload/q_auto/f_auto/v1778833113/AQNqIaCU_-L4b5BOQTJLKgQS--Dum1Q4v5A_VsmLok7fcxrt0B7m8mnjduJVZOBeoKRQV_evQOl-oh-CAhZy26yyijtUaXsydmb4uoM_ra27o7.mp4`,
};

export const beforeAfter = {
  title: 'Transforming homes with love',
  subtitle: 'Get a glimpse of our exceptional home designs.',
  before: `${cdn}/image/upload/v1786447286/UrbaneBefore_img_qemvxm.png`,
  after: `${cdn}/image/upload/v1786447179/Enscape_2026-08-06-05-55-47_dining_area_2_aiwq2x.png`,
};

// tone: which brand color the icon uses
export const offerings = {
  tagline: 'Urbane Living Market Offerings',
  title: 'System solutions catering to need',
  items: [
    { icon: 'FormatPainterOutlined', title: 'GYPSUM Plastering', desc: 'High-quality smooth finish for internal walls.', tone: 'blue' },
    { icon: 'BuildOutlined', title: 'Performance Drywalls', desc: 'Advanced drywall systems for better insulation.', tone: 'red' },
    { icon: 'ThunderboltOutlined', title: 'Wet Area Drywalls', desc: 'Moisture resistant solutions for bathrooms.', tone: 'navy' },
    { icon: 'LayoutOutlined', title: 'False Ceilings', desc: 'Standard gypsum ceilings for home & office.', tone: 'blue' },
    { icon: 'AppstoreOutlined', title: 'Exterior Drywalls', desc: 'Weather resistant boards for external facades.', tone: 'red' },
    { icon: 'HighlightOutlined', title: 'Designer Ceilings', desc: 'Premium artistic designs for luxury spaces.', tone: 'navy' },
  ],
};

export const gallery = {
  title: 'Our Masterpieces',
  subtitle: 'Transforming spaces into experiences. Explore our latest interior and ceiling projects.',
  items: [
    { src: `${cdn}/image/upload/q_auto/f_auto/v1778583856/hf_20260512_054108_38408685-f67f-4515-a822-985d83019979_y6nnq9.png`, title: 'Living Interior', category: 'Modern' },
    { src: `${cdn}/image/upload/q_auto/f_auto/v1778583838/ChatGPT_Image_May_12_2026_03_16_05_PM_pnlauy.png`, title: 'Master Bedroom Interior', category: 'Premium' },
    { src: `${cdn}/image/upload/q_auto/f_auto/v1778585454/ChatGPT_Image_May_12_2026_04_30_35_PM_ptqgea.png`, title: "Kid's Bedroom Interior", category: 'Cozy' },
    { src: `${cdn}/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_38_54_PM_v8bjr3.png`, title: 'Living Room Interior', category: 'Commercial' },
    { src: `${cdn}/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_35_05_PM_tolwlu.png`, title: 'Living Interior', category: 'Exclusive' },
    { src: `${cdn}/image/upload/q_auto/f_auto/v1778583833/ChatGPT_Image_May_12_2026_02_40_56_PM_zkd6ex.png`, title: 'Parents Room Interior', category: 'Luxury' },
  ],
};

export const blend = {
  title: 'A blend of beauty and functionality',
  text: 'Because nothing less than a tailor-made, luxurious experience with high-end finishes will do for your home.',
  cta: 'GET FREE QUOTE',
  video: hero.video,
};

// Home page "7 days" process. Vertical (9:16) reels; img is the still shown before the video loads.
export const process = {
  title: 'Gypsum False Ceiling done in',
  highlight: 'just 7* Days',
  subtitle: 'From bare slab to a finished designer ceiling, here is exactly what happens on your site.',
  steps: [
    {
      stage: '01',
      heading: 'Framing & Channels',
      duration: '2 days',
      video: 'https://res.cloudinary.com/nzqefovs/video/upload/v1792579434/framing-channels-reel-9x16.mp4',
      img: `${cdn}/image/upload/q_auto/f_auto/v1777092660/WhatsApp_Image_2026-04-24_at_15.40.28_1_xucjet.jpg`,
    },
    {
      stage: '02',
      heading: 'Board Installation',
      duration: '2 days',
      video: 'https://res.cloudinary.com/nzqefovs/video/upload/v1792579952/board-installation-reel-9x16.mp4',
      img: `${cdn}/image/upload/q_auto/f_auto/v1777092280/WhatsApp_Image_2026-04-24_at_15.43.19_1_jg1oxj.jpg`,
    },
    {
      stage: '03',
      heading: 'Finishing',
      duration: '3 days',
      video: 'https://res.cloudinary.com/nzqefovs/video/upload/v1792580151/finishing-reel-9x16.mp4',
      img: `${cdn}/image/upload/q_auto/f_auto/v1777092389/WhatsApp_Image_2026-04-24_at_15.43.20_l17xdz.jpg`,
    },
    {
      stage: '04',
      heading: 'Enjoy the new look',
      duration: 'Just 7* days',
      video: 'https://res.cloudinary.com/nzqefovs/video/upload/v1792580360/enjoy-new-look-reel-9x16.mp4',
      img: `${cdn}/image/upload/q_auto/f_auto/v1778583833/ChatGPT_Image_May_12_2026_02_42_01_PM_us9ay1.png`,
    },
  ],
  note: '*Typical timeline after design approval. Larger areas may take a little longer.',
};

export const stories = {
  title: 'Heard from us? Now it’s time to hear our clients’ stories',
  cta: 'BOOK FREE CONSULTATION',
  itemsPerPage: 3,
  items: [
    { id: 1, videoUrl: 'https://www.youtube.com/embed/evkW_kZdf2s', quote: '"We wanted our new home to reflect contemporary and modern styles, inspired by designs we loved, perfectly curated by UrbaneLiving."', author: 'Dr. Lipika and Dr. Satendra' },
    { id: 2, videoUrl: 'https://www.youtube.com/embed/ICvpClnA7Ts', quote: '"Combining our family’s heritage with a modern look was our dream, and UrbaneLiving helped make it a reality."', author: 'Amrish' },
    { id: 3, videoUrl: 'https://www.youtube.com/embed/WpdoW7NXsbU', quote: '"Thanks to UrbaneLiving, our new home seamlessly blends heritage beauty with modern style, reflecting our taste."', author: 'Neha and Manish' },
  ],
};

export const faqs = [
  { key: '1', question: 'Why should I do up the ceiling at my home?', answer: 'Ceilings enhance the aesthetics, provide better lighting options, and help in thermal insulation.' },
  { key: '2', question: 'What are the key benefits of Designer Ceilings?', answer: 'Designer ceilings hide messy wiring, reduce noise levels, and give a premium finish to your rooms.' },
  { key: '3', question: 'How long designer ceilings last?', answer: 'With high-quality materials like Urbane Living, designer ceilings can easily last for 15-20 years with minimal maintenance.' },
  { key: '4', question: 'Are False Ceiling Installations costly?', answer: 'It depends on the design, but basic designs are quite affordable and add significant value to your property.' },
  { key: '5', question: 'Why Should I do up my ceiling with Urbane Living?', answer: 'Urbane Living provides superior fire resistance, durability, and a smooth finish compared to local materials.' },
];

export const footer = {
  ctaTitle: 'Want quick assistance? Just give us a call!',
  ctaText: 'Message us on WhatsApp or call directly for premium home design services.',
  columns: [
    { title: 'Company', links: [{ label: 'About Us', to: '/about' }, { label: 'Contact', to: '/contact' }, { label: 'Blogs', to: '/blogs' }, { label: 'Estimate', to: '/estimate' }] },
    { title: 'Services', links: [{ label: 'False Ceiling', to: '/false-ceiling' }, { label: 'Modular Kitchen', to: '/kitchen' }, { label: 'Wardrobe', to: '/wardrobe' }, { label: 'Bedroom Interiors', to: '/bedroom' }] },
    { title: 'Legal', newTab: true, links: [{ label: 'Privacy Policy', to: '/privacy' }, { label: 'Terms & Conditions', to: '/terms' }, { label: 'Refund Policy', to: '/refund' }, { label: 'Disclaimer', to: '/disclaimer' }] },
  ],
};

// Page banners: use with <PageBanner {...banners.falseCeiling} primary={...} />
export const banners = {
  falseCeiling: {
    eyebrow: 'False Ceiling Experts · Delhi NCR',
    title: 'Get Your False Ceiling done in',
    highlight: 'Just 7 Days*',
    // subtitle: 'Premium False Ceiling Designs Starting ₹120/sqft',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583839/ChatGPT_Image_May_12_2026_03_21_15_PM_eftzu7.png`,
    imageAlt: 'Luxury living room with a designer false ceiling by Urbane Living',
    whatsappMessage: 'Hi Urbane Living, I want a free false ceiling design quote.',
    align: 'right',
    highlights,
  },
};
// False ceiling cost estimator: rates and options (₹)
export const estimator = {
  tag: 'SMART PRICING ENGINE',
  title: 'Instant Cost Estimator',
  subtitle: 'Get a transparent, itemized quote for your interior ceiling project.',
  defaultArea: 350,
  minArea: 50,
  maxArea: 5000,
  sliderMax: 2500,
  defaultMaterial: 'Premium Gypsum',
  defaultLightPoints: 10,
  lightRate: 450,
  materials: [
    { name: 'Standard POP', rate: 120 },
    { name: 'Premium Gypsum', rate: 120 },
    { name: 'PVC Panel', rate: 200 },
    { name: 'Luxe Wooden', rate: 210 },
  ],
  designTiers: [
    { label: 'Basic', sub: 'Single Level', value: 1.0 },
    { label: 'Standard', sub: 'Cove Lights', value: 1.2 },
    { label: 'Luxury', sub: 'Multi-Tier', value: 1.5 },
  ],
  promises: ['10 Year Anti-Crack Warranty', 'Installation in 7-10 Working Days'],
  disclaimer: '*Actual costs may vary based on site conditions and final measurements.',
};

// False ceiling design gallery filters (values must match the backend)
export const designFilters = {
  title: 'Explore Our Designs',
  rooms: [
    { value: 'living', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'kitchen', label: 'Kitchen' },
  ],
    // Budget per sq. ft. (filters the cards by their price on this page)
  budgets: [
    { value: 'all', label: 'Any Budget' },
    { value: 'basic', label: '₹120–₹150 /sqft', min: 120, max: 150 },
    { value: 'premium', label: '₹151–₹210 /sqft', min: 151, max: 210 },
    { value: 'luxury', label: '₹210+ /sqft', min: 211 },
  ],
  styles: [
    { value: 'modern', label: 'Modern' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'minimalist', label: 'Minimalist' },
  ],
};

// Per-page SEO (title, description, canonical path, structured data)
export const siteUrl = 'https://urbaneliving.in';

export const seo = {
  falseCeiling: {
    title: 'False Ceiling Design & Installation in Delhi NCR | From ₹120/sqft | Urbane Living',
    description:
      'Gypsum, POP, PVC and wooden false ceilings installed in just 7 days in Delhi, Noida, Ghaziabad and Gurgaon. Starting ₹120/sqft with a 10-year anti-crack warranty. Use our instant cost estimator and get a free design.',
    path: '/false-ceiling',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583839/ChatGPT_Image_May_12_2026_03_21_15_PM_eftzu7.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'False Ceiling Design & Installation',
        serviceType: 'False Ceiling Installation',
        provider: { '@type': 'HomeAndConstructionBusiness', name: 'Urbane Living', url: 'https://urbaneliving.in/' },
        areaServed: ['Delhi', 'Noida', 'Ghaziabad', 'Gurgaon', 'Faridabad'],
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: '120',
          highPrice: '210',
          unitText: 'per sq. ft.',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://urbaneliving.in/' },
          { '@type': 'ListItem', position: 2, name: 'False Ceiling', item: 'https://urbaneliving.in/false-ceiling' },
        ],
      },
    ],
  },
};
// Blog page: banner, SEO and client reviews section text
export const blogPage = {
  banner: {
    eyebrow: 'Interior Ideas & Expert Tips',
    title: 'Our',
    highlight: 'Blog',
    subtitle: 'Upgrade your home with modern renovation ideas and expert tips.',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778246216/blog-banner-1-urbane-living_d7ru3y.jpg`,
    imageAlt: 'Modern interior design ideas by Urbane Living',
    primary: { label: 'Explore False Ceiling', to: '/false-ceiling' },
    whatsappMessage: 'Hi Urbane Living, I read your blog and want a free design consultation.',
    height: 'md',
    align: 'center',
  },
  listTitle: 'Latest Articles',
  seo: {
    title: 'Interior Design & False Ceiling Blog | Ideas, Costs & Tips | Urbane Living',
    description:
      'Read expert interior design ideas, false ceiling designs, costs and home renovation tips for Delhi NCR homes from the Urbane Living team.',
    path: '/blogs',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778246216/blog-banner-1-urbane-living_d7ru3y.jpg`,
  },
  reviews: {
    tag: 'Client Reviews',
    title: 'What Our Clients Say',
    subtitle: 'Real homes, real families across Delhi NCR.',
  },
};

// False Ceiling page: "Why Urbane Living" section (promises, comparison, ceiling anatomy).
// Only keep promises you can actually deliver - customers will hold you to them.
export const ceilingEdge = {
  tag: 'THE URBANE CEILING STANDARD',
  title: 'Not Just a Ceiling.',
  highlight: 'A Promise You Can Check.',
  subtitle:
    'Most contractors sell you a design. We show you exactly what goes inside your ceiling, lock the price before work starts and stand behind it for 10 years.',
  promises: [
    { icon: 'clock', title: 'Ready in 7 Days*', text: 'Fixed timeline written in your quote, with a daily site update on WhatsApp.' },
    { icon: 'shield', title: '10-Year Anti-Crack Warranty', text: 'Written warranty on board joints and framing, not just a verbal promise.' },
    { icon: 'lock', title: 'Price Locked at Booking', text: 'Itemised quote per sq. ft. No surprise bills for "extra material" later.' },
    { icon: 'safety', title: 'Branded Material Only', text: 'Branded gypsum boards and GI framing with purchase invoice shared with you.' },
  ],
  compare: {
    title: 'How We Compare',
    columns: ['Urbane Living', 'Local Contractor', 'Big Design Firms'],
    rows: [
      { feature: 'Price per sq. ft.', values: [['₹120 – ₹210', 'good'], ['Varies, often revised', 'bad'], ['Premium pricing', 'mid']] },
      { feature: 'Installation time', values: [['7 days*', 'good'], ['No fixed date', 'bad'], ['30 – 45 days (full home)', 'mid']] },
      { feature: 'Written warranty', values: [['10 years, anti-crack', 'good'], ['Rarely given', 'bad'], ['Yes', 'good']] },
      { feature: 'Free 3D design before work', values: [['Yes', 'good'], ['No', 'bad'], ['Yes', 'good']] },
      { feature: 'Material brand & invoice shared', values: [['Yes', 'good'], ['No', 'bad'], ['Partly', 'mid']] },
      { feature: 'Dedicated site supervisor', values: [['Yes', 'good'], ['No', 'bad'], ['Yes', 'good']] },
      { feature: 'Dust-free cleanup after work', values: [['Included', 'good'], ['Extra / not done', 'bad'], ['Included', 'good']] },
    ],
    note: '*Typical timeline for up to 1,000 sq. ft. of ceiling after design approval. Comparison is based on common market practice in Delhi NCR.',
  },
  anatomy: {
    title: "What's Inside Your Ceiling",
    subtitle: 'Tap a layer to see what we use and why it matters. Ask any contractor for this list.',
    layers: [
      { name: 'Finish Paint', spec: 'Primer + 2 coats of premium emulsion', why: 'Smooth, even finish with no patchy joints showing under lights.' },
      { name: 'Joint Tape & Compound', spec: 'Paper joint tape + jointing compound, 3-coat finish', why: 'This is where cheap ceilings crack. Proper taping is what makes the 10-year warranty possible.' },
      { name: 'Gypsum Board', spec: '12.5 mm branded gypsum board (moisture-resistant in kitchens & bathrooms)', why: 'Fire-resistant, sound-dampening and sag-free. Thin or local boards bend in 2–3 years.' },
      { name: 'GI Framing', spec: 'Galvanised iron ceiling sections, perimeter channels & intermediate channels', why: 'Rust-free metal frame holds the board perfectly level for years.' },
      { name: 'Anchor Fasteners', spec: 'Steel anchor fasteners into the slab at fixed spacing', why: 'Keeps the whole ceiling locked to the roof slab so it never sags or shakes.' },
      { name: 'Wiring & Lights', spec: 'Concealed wiring in conduit, planned LED / cove / profile light points', why: 'Lights are planned with the design, so no loose wires or extra cutting later.' },
    ],
  },
  cta: 'Get a Free Site Visit & 3D Design',
};
// Home page: "Find your design style" quiz. Each option gives points to one style (key).
// Swap the result images for your own project photos of that style.
export const styleQuiz = {
  tag: '60-SECOND STYLE QUIZ',
  title: 'Not sure what your home should look like?',
  highlight: 'Find your design style.',
  subtitle: 'Answer 3 quick questions and get a style made for how your family actually lives.',
  questions: [
    {
      q: 'Your perfect weekend at home looks like…',
      options: [
        { label: 'Movie night on a cosy sofa', emoji: '🍿', style: 'modern' },
        { label: 'Hosting friends & family dinners', emoji: '🥂', style: 'luxury' },
        { label: 'Quiet reading, clutter-free corners', emoji: '📖', style: 'minimal' },
        { label: 'Festivals, pooja & big family gatherings', emoji: '🪔', style: 'classic' },
      ],
    },
    {
      q: 'Pick the colour mood you love most',
      options: [
        { label: 'Warm wood & beige', colors: ['#C8A27A', '#EADBC8', '#7A5C43'], style: 'modern' },
        { label: 'Black, gold & marble', colors: ['#1C1C1C', '#C9A227', '#E9E6E1'], style: 'luxury' },
        { label: 'White, grey & light oak', colors: ['#F5F5F2', '#BFC3C7', '#D9C3A0'], style: 'minimal' },
        { label: 'Teal, maroon & brass', colors: ['#1F5F63', '#7B2D35', '#B88A3B'], style: 'classic' },
      ],
    },
    {
      q: 'What matters most in your new home?',
      options: [
        { label: 'Comfort for everyday living', emoji: '🛋️', style: 'modern' },
        { label: 'A wow factor guests remember', emoji: '✨', style: 'luxury' },
        { label: 'Smart storage & easy cleaning', emoji: '🗄️', style: 'minimal' },
        { label: 'Our roots, with a modern touch', emoji: '🏛️', style: 'classic' },
      ],
    },
  ],
  styles: {
    modern: {
      name: 'Warm Modern',
      text: 'Clean lines softened with warm woods, cove lighting and textured fabrics. Stylish, but made to be lived in every day.',
      palette: ['#C8A27A', '#EADBC8', '#7A5C43', '#2F2F2F'],
      features: ['Cove-lit gypsum ceiling', 'Wooden wall panelling', 'Soft-close modular kitchen', 'Layered warm lighting'],
      image: `${cdn}/image/upload/q_auto/f_auto/v1778583856/hf_20260512_054108_38408685-f67f-4515-a822-985d83019979_y6nnq9.png`,
    },
    luxury: {
      name: 'Modern Luxe',
      text: 'Marble textures, fluted panels, gold accents and statement lights. Every room feels like a 5-star hotel suite.',
      palette: ['#1C1C1C', '#C9A227', '#E9E6E1', '#5B4636'],
      features: ['Designer ceiling with profile lights', 'Marble-finish feature wall', 'Fluted wardrobe shutters', 'Statement chandelier'],
      image: `${cdn}/image/upload/q_auto/f_auto/v1778583833/ChatGPT_Image_May_12_2026_02_40_56_PM_zkd6ex.png`,
    },
    minimal: {
      name: 'Calm Minimal',
      text: 'Light colours, hidden storage and nothing extra. A calm, airy home that is easy to keep clean.',
      palette: ['#F5F5F2', '#BFC3C7', '#D9C3A0', '#3C4043'],
      features: ['Flat ceiling with hidden lights', 'Handle-less wardrobes', 'Full-height storage', 'Light oak & white finishes'],
      image: `${cdn}/image/upload/q_auto/f_auto/v1778585454/ChatGPT_Image_May_12_2026_04_30_35_PM_ptqgea.png`,
    },
    classic: {
      name: 'Indian Contemporary',
      text: 'Rich colours, carved details and a beautiful pooja unit, blended with modern comfort and smart storage.',
      palette: ['#1F5F63', '#7B2D35', '#B88A3B', '#F1E6D6'],
      features: ['Designer pooja unit', 'Jaali & CNC panel details', 'Brass-finish accents', 'Traditional-modern ceiling'],
      image: `${cdn}/image/upload/q_auto/f_auto/v1778583838/ChatGPT_Image_May_12_2026_03_16_05_PM_pnlauy.png`,
    },
  },
  cta: 'Get This Look: Free 3D Design',
};