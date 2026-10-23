// Home page sections.
import { cdn } from './config';

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
    { id: 3, videoUrl: 'https://res.cloudinary.com/diosq0s7w/video/upload/v1792572358/urbane_review_clean_audio_gyaq4s.mp4', quote: '"Thanks to UrbaneLiving, our new home seamlessly blends heritage beauty with modern style, reflecting our taste."', author: 'Mrs. Saubhagya' },
  ],
};

export const faqs = [
  { key: '1', question: 'Why should I do up the ceiling at my home?', answer: 'Ceilings enhance the aesthetics, provide better lighting options, and help in thermal insulation.' },
  { key: '2', question: 'What are the key benefits of Designer Ceilings?', answer: 'Designer ceilings hide messy wiring, reduce noise levels, and give a premium finish to your rooms.' },
  { key: '3', question: 'How long designer ceilings last?', answer: 'With high-quality materials like Urbane Living, designer ceilings can easily last for 15-20 years with minimal maintenance.' },
  { key: '4', question: 'Are False Ceiling Installations costly?', answer: 'It depends on the design, but basic designs are quite affordable and add significant value to your property.' },
  { key: '5', question: 'Why Should I do up my ceiling with Urbane Living?', answer: 'Urbane Living provides superior fire resistance, durability, and a smooth finish compared to local materials.' },
];

// Home page "End-to-end interior solutions" grid. icon = key from components/SolutionsGrid.jsx.
// `to` opens that page; items without `to` open the free consultation form.
// Keep only the services you actually offer.
export const solutions = {
  title: 'End-to-end interior solutions',
  subtitle: 'From one wardrobe to a complete home, designed, made and installed by one team.',
  cta: 'BOOK FREE DESIGN SESSION',
  items: [
    { label: 'Modular Kitchen', icon: 'kitchen', to: '/kitchen' },
    { label: 'Storage & Wardrobe', icon: 'wardrobe', to: '/wardrobe' },
    { label: 'Crockery Units', icon: 'crockery' },
    { label: 'Space Saving Furniture', icon: 'spaceSaving' },
    { label: 'TV Units', icon: 'tv', to: '/living-hall' },
    { label: 'Study Tables', icon: 'study' },
    { label: 'False Ceiling', icon: 'ceiling', to: '/false-ceiling' },
    { label: 'Lights', icon: 'lights' },
    { label: 'Wallpaper', icon: 'wallpaper' },
    { label: 'Wall Paint', icon: 'paint' },
    { label: 'Bathroom', icon: 'bathroom' },
    { label: 'Pooja Unit', icon: 'pooja' },
    { label: 'Foyer Designs', icon: 'foyer' },
    { label: 'Movable Furniture', icon: 'movable' },
    { label: 'Kids Bedroom', icon: 'kids', to: '/bedroom' },
  ],
};
