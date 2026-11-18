/*
  Our own design photos (3D designs by the Urbane Living design team), all in ONE place.
  Cloudinary account: nzqefovs (ours). Never use photos from Google, Pinterest or other websites.

  photo('livingTvWall')        -> full width (1400 px), for big banners
  photo('livingTvWall', 640)   -> smaller copy for cards and thumbnails (faster site)
  alt('livingTvWall')          -> description for Google + screen readers

  Admin -> Website Images: every photo on the site sits in a named "slot" (slot / slotAlt below).
  The admin panel can put a different Cloudinary photo in any slot, page by page, section by section.
*/
const BASE = 'https://res.cloudinary.com/nzqefovs';

export const photos = {
  // Living rooms
  livingTvWall: {
    id: 'v1794306120/Enscape_2026-08-06-05-55-47_living_area__1.png',
    alt: 'Living room with a fluted TV wall, lit display units, layered false ceiling and crystal chandelier',
  },
  livingTvWallWide: {
    id: 'v1794306111/living_area__1.png',
    alt: 'Living room with a backlit TV wall, glass display units, cove-lit false ceiling and wall moulding',
  },
  livingSofa: {
    id: 'v1794306112/living_area__2.png',
    alt: 'Living room with a beige sectional sofa, slatted wooden partition, false ceiling and chandelier',
  },
  livingSofaAlt: {
    id: 'v1794306119/Enscape_2026-08-06-05-55-47_living_area__2.png',
    alt: 'Bright living room with an L-shaped sofa, TV wall and wooden slat partition',
  },
  livingArchway: {
    id: 'v1794306070/Warm_Modern_Living_Room_Archway_View.png',
    alt: 'Warm modern living room seen through a wooden archway, with a glass partition and open kitchen behind',
  },
  openPlanLiving: {
    id: 'v1794306070/Warm_Modern_Open-Plan_Living_Space.png',
    alt: 'Open-plan living and dining space with a sage green crockery unit, track lights and herringbone floor',
  },
  swingLounge: {
    id: 'v1794306245/living_area_7.png',
    alt: 'Lounge corner with a wooden ceiling, hanging swing, aquarium wall and cane chairs',
  },
  swingLoungeAlt: {
    id: 'v1794306242/Enscape_2026-09-29-17-47-24_living_area_7.png',
    alt: 'Living area with a hanging swing, built-in aquarium and decorative partition',
  },

  // Dining
  diningPendant: {
    id: 'v1794306123/dining_area_1.png',
    alt: 'Dining area with a six-seater table, globe pendant light, recessed false ceiling and wall art',
  },
  diningCrockery: {
    id: 'v1794306112/dining_area_3.png',
    alt: 'Dining area with a wooden crockery unit, cluster pendant light and false ceiling',
  },
  diningToKitchen: {
    id: 'v1794306120/dining_area_4.png',
    alt: 'Dining space opening into a modular kitchen, with a console table and wooden tall unit',
  },

  // Bedrooms
  plumBedroom: {
    id: 'v1794306069/Elegant_Plum-Panelled_Bedroom_Retreat.png',
    alt: 'Master bedroom with plum wall panels, a backlit arched bed wall, wooden bed and reading chairs',
  },
  guestRoom: {
    id: 'v1794306243/GUEST_ROOM_1.png',
    alt: 'Guest room with a tall wardrobe, wall-mounted study unit, panelled wall and wooden daybed',
  },
  kidsRoomJungle: {
    id: 'v1794306243/KIDS_ROOM_1.png',
    alt: 'Kids room with a green bunk bed, study table, white wardrobe and jungle wallpaper with lit shelves',
  },
  kidsRoomPink: {
    id: 'v1794306242/Enscape_2026-09-30-16-34-29_kids_bedroom_1.png',
    alt: 'Kids bedroom with a black bunk bed, study desk and soft pink walls',
  },

  // Kitchens (note: kitchen_1 / kitchen_2 / kitchen_3 were re-uploaded with other renders, so they are not used)
  kitchenLOpen: {
    id: 'v1794306120/Enscape_2026-08-06-05-55-47_kitchen_3.png',
    alt: 'Open modular kitchen with handle-less cabinets, opening into the living room',
  },

  // Bathrooms
  bathroomBeige: {
    id: 'v1794306070/Photorealistic_Modern_Beige_Bathroom_1.png',
    alt: 'Modern beige bathroom with a black vanity, vessel basin, niche shelf and glass shower',
  },
  bathroomBeigeAlt: {
    id: 'v1794306070/Photorealistic_Modern_Beige_Bathroom.png',
    alt: 'Beige bathroom with a wooden vanity, wall-hung toilet and backlit niche',
  },
  guestBathroom: {
    id: 'v1794306114/guest_bathroom__1.png',
    alt: 'Guest bathroom with grey tiles, a backlit mirror, floating vanity and glass shower',
  },
  guestBathroomShower: {
    id: 'v1794306116/guest_bathroom_1.2.png',
    alt: 'Guest bathroom shower area with a glass partition and marble walls',
  },
  guestBathroomVanity: {
    id: 'v1794306117/guest_bathroom_1.1.png',
    alt: 'Guest bathroom with a backlit mirror, wooden vanity and tiled shower wall',
  },
  bathroomVanity: {
    id: 'v1794306242/Enscape_2026-09-28-15-16-33_Enscape_scene_2.png',
    alt: 'Bathroom vanity with a dark wooden cabinet, vessel basin and patterned tiles',
  },
  // More of our own renders (Cloudinary folder "BEDROOMS", no other brand on them)
  sageBedroom: {
    id: 'v1794982143/IMG-20261112-WA0018.jpg.jpg',
    alt: 'Bedroom with a sage green panelled wall, wooden TV unit, full-height wardrobe and cove-lit ceiling',
  },
  sageBedroomFront: {
    id: 'v1794982142/IMG-20261112-WA0017.jpg.jpg',
    alt: 'Bedroom with a sage green panelled bed wall, landscape art and soft cove lighting',
  },
  goldArtBedroom: {
    id: 'v1794982151/Gold-Framed_Abstract_Bedroom_Artwork.png',
    alt: 'Bedroom with a panelled bed wall, gold abstract artwork and a white-and-wood wardrobe',
  },
  wardrobeBedroom: {
    id: 'v1794982148/Warm_Modern_Bedroom_Retreat.png',
    alt: 'Bedroom with a full-height white wardrobe, lit glass shelf and wooden TV panel',
  },
  pinkBedroom: {
    id: 'v1794982144/IMG-20261112-WA0013.jpg.jpg',
    alt: 'Bedroom with a blush pink headboard, framed wall panels and a sliding wardrobe',
  },
  beigeLiving: {
    id: 'v1794982147/Warm_Beige_Slatted_TV_Feature_Wall.png',
    alt: 'Living room with a beige L-shaped sofa, slatted TV wall, wall moulding and cove-lit ceiling',
  },
  crockeryUnit: {
    id: 'v1794982147/Warm-Lit_Cabinetry_with_Built-In_Microwave.png',
    alt: 'Crockery unit with lit glass shutters, open shelves and a built-in microwave space',
  },
  studyPrayerNook: {
    id: 'v1794982146/Warm_Wooden-Shutter_Prayer_Nook.png',
    alt: 'Study corner with a wall desk, floating shelves, window seat and a carved wooden pooja unit',
  },
  // Cloudinary folder "BEDROOMS/New folder" (our renders, no other brand on them)
  greyKitchen: {
    id: 'v1794982163/Enscape_2026-11-15-18-39-26.png',
    alt: 'Modular kitchen with grey handle-less cabinets, black granite counter, hob and tall fridge unit',
  },
  greyKitchenL: {
    id: 'v1794982159/Enscape_2026-11-15-18-50-28_Enscape_scene_3.png',
    alt: 'L-shaped modular kitchen with grey cabinets, glass wall units, marble backsplash and black sink',
  },
  greyKitchenSink: {
    id: 'v1794982159/Enscape_2026-11-15-18-50-28_Enscape_scene_4.png',
    alt: 'Compact modular kitchen with black glass wall cabinets, under-cabinet lights and black granite counter',
  },
  crockeryBar: {
    id: 'v1794982158/Enscape_2026-11-15-18-50-28_Enscape_scene_6.png',
    alt: 'Crockery and coffee unit with lit glass shelves next to an open kitchen and glass partition',
  },
  compactBedroom: {
    id: 'v1794982162/Enscape_2026-11-15-18-47-23_BEDROOM_-1.png',
    alt: 'Compact bedroom with a grey upholstered headboard, framed panels and a full-height wardrobe',
  },
  livingGlassPartition: {
    id: 'v1794982163/Enscape_2026-11-15-18-35-31.png',
    alt: 'Living room with fluted glass partition, beige sofa, wall moulding and cove-lit ceiling',
  },
  compactLiving: {
    id: 'v1794982160/Enscape_2026-11-15-18-50-28_Enscape_scene_1.png',
    alt: 'Compact living room with a beige L-shaped sofa, round centre table, TV wall and wall moulding',
  },
  livingWithKitchen: {
    id: 'v1794982160/Enscape_2026-11-15-18-50-28_Enscape_scene_2.png',
    alt: 'Living room with a beige sectional sofa and wall moulding, opening into a grey modular kitchen',
  },
};

/*
  Design gallery on the room pages (/kitchen, /bedroom, /wardrobe, /living-hall).
  These show together with the designs added from the admin panel / Google Sheet.
  To add a photo: add it to `photos` above, then put its key (and a title) here.
*/
export const roomGalleries = {
  kitchen: [
    ['kitchenLOpen', 'Open kitchen facing the living room', 'Modern'],
    ['greyKitchenL', 'Grey kitchen with marble backsplash', 'Minimal'],
    ['greyKitchen', 'Grey kitchen with tall fridge unit', 'Minimal'],
    ['greyKitchenSink', 'Compact kitchen with black glass cabinets', 'Minimal'],
    ['diningToKitchen', 'Kitchen opening from the dining area', 'Modern'],
    ['crockeryUnit', 'Lit crockery unit with microwave space', 'Modern'],
  ],
  bedroom: [
    ['plumBedroom', 'Plum-panelled master bedroom', 'Luxury'],
    ['sageBedroom', 'Sage green bedroom with TV unit', 'Modern'],
    ['sageBedroomFront', 'Sage green panelled bed wall', 'Modern'],
    ['goldArtBedroom', 'Panelled bedroom with gold artwork', 'Luxury'],
    ['pinkBedroom', 'Blush pink bedroom', 'Modern'],
    ['wardrobeBedroom', 'Warm modern bedroom with TV panel', 'Modern'],
    ['kidsRoomJungle', 'Kids room with bunk bed', 'Kids'],
    ['kidsRoomPink', 'Pink kids bedroom with bunk bed', 'Kids'],
    ['guestRoom', 'Guest room with study and daybed', 'Minimal'],
    ['compactBedroom', 'Compact bedroom with full-height wardrobe', 'Minimal'],
    ['studyPrayerNook', 'Study corner with pooja unit', 'Modern'],
  ],
  wardrobe: [
    ['wardrobeBedroom', 'Full-height white wardrobe', 'Modern'],
    ['compactBedroom', 'Floor-to-ceiling wardrobe in a compact bedroom', 'Minimal'],
    ['goldArtBedroom', 'White and wood wardrobe', 'Luxury'],
    ['pinkBedroom', 'Sliding wardrobe with framed panels', 'Modern'],
    ['sageBedroom', 'Wardrobe with lit glass shelf', 'Modern'],
    ['guestRoom', 'Tall wardrobe in the guest room', 'Minimal'],
    ['kidsRoomJungle', 'Kids wardrobe with handle-less shutters', 'Kids'],
  ],
  living: [
    ['livingTvWall', 'Living room with fluted TV wall', 'Luxury'],
    ['livingTvWallWide', 'Backlit TV wall with display units', 'Luxury'],
    ['livingSofa', 'Beige sectional with slatted partition', 'Modern'],
    ['livingSofaAlt', 'Bright living room with L-shaped sofa', 'Modern'],
    ['livingArchway', 'Living room through a wooden archway', 'Modern'],
    ['openPlanLiving', 'Open-plan living and dining', 'Modern'],
    ['beigeLiving', 'Beige living room with slatted TV wall', 'Minimal'],
    ['livingGlassPartition', 'Living room with fluted glass partition', 'Minimal'],
    ['compactLiving', 'Compact living room with L-shaped sofa', 'Minimal'],
    ['livingWithKitchen', 'Living room opening into the kitchen', 'Minimal'],
    ['swingLounge', 'Lounge corner with a hanging swing', 'Luxury'],
    ['diningPendant', 'Dining area with recessed ceiling', 'Modern'],
    ['diningCrockery', 'Dining with wooden crockery unit', 'Modern'],
    ['crockeryBar', 'Crockery and coffee unit', 'Modern'],
  ],
};

// Our own site video: false ceiling being installed
export const videos = {
  ceilingInstall:
    'https://res.cloudinary.com/diosq0s7w/video/upload/q_auto,f_auto/v1778846966/AQOWluTfI93wZli3y8AblN3fSmqfTw4HQIb1xU_J9xyKMECYX8e02fW7RiHP80HDEeD2kCjj02xHN81LkiO7YHHE7xK-nsxhZNxIo1k_lsqepn.mp4',
};

export const photo = (key, width = 1400) =>
  `${BASE}/image/upload/q_auto,f_auto,w_${width},c_limit/${photos[key].id}`;

export const alt = (key) => `${photos[key].alt} by Urbane Living`;

/* ───────────── Slots (changed from Admin -> Website Images) ─────────────
   slot('bedroom.banner', 'plumBedroom', 1400, 'Bedroom page › Top banner')
   -> the admin's photo for 'bedroom.banner' if one is set, else our default photo.
   Overrides are loaded in src/index.js before the app starts (see loadImageOverrides). */
const overrides = {};
const registry = new Map();

export const setImageOverrides = (map) => {
  if (map && typeof map === 'object') Object.assign(overrides, map);
};

// Cloudinary photo at the size it is shown (keeps the site fast)
export const sizeCloudinary = (url, width) =>
  /\/image\/upload\/v\d+\//.test(url)
    ? url.replace('/image/upload/', `/image/upload/q_auto,f_auto,w_${width},c_limit/`)
    : url;

export const slot = (id, defaultKey, width = 1400, label = id) => {
  if (!registry.has(id)) registry.set(id, { id, defaultKey, width, label });
  const o = overrides[id];
  return o && o.url ? sizeCloudinary(o.url, width) : photo(defaultKey, width);
};

export const slotAlt = (id, defaultKey) => {
  const o = overrides[id];
  return o && o.url && o.alt ? `${o.alt} by Urbane Living` : alt(defaultKey);
};

// Every slot on the website, for the admin page: [{ id, defaultKey, width, label, page, section, current }]
export const imageSlots = () => {
  roomGallery('kitchen'); // make sure the gallery slots are listed too
  return [...registry.values()].map((r) => {
    const [page, ...rest] = r.label.split(' › ');
    return { ...r, page, section: rest.join(' › '), default: photo(r.defaultKey, 640), current: overrides[r.id] || null };
  });
};

// Room page galleries (built once, so every photo is listed in the admin page)
const galleryNames = { kitchen: 'Modular Kitchen page', bedroom: 'Bedroom page', wardrobe: 'Wardrobe page', living: 'Living Hall page' };
// built on first use (after the admin overrides are loaded in src/index.js)
let builtGalleries = null;
const buildGalleries = () => Object.fromEntries(
  Object.entries(roomGalleries).map(([category, list]) => [
    category,
    list.map(([key, title, style], n) => {
      const id = `${category}.gallery.${n + 1}`;
      const label = `${galleryNames[category]} › Design gallery › Photo ${n + 1} (${title})`;
      return {
        _id: `own-${category}-${n + 1}`,
        title,
        style,
        image: slot(id, key, 1400, label),
        thumb: slot(id, key, 720, label),
        alt: slotAlt(id, key),
      };
    }),
  ]),
);

// Gallery items in the same shape as the admin designs: { _id, title, image, thumb, style, alt }
export const roomGallery = (category) => {
  if (!builtGalleries) builtGalleries = buildGalleries();
  return builtGalleries[category] || [];
};
