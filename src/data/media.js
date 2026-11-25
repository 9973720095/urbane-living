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
  // False Ceiling page banner (cove-lit ceiling, our Cloudinary account diosq0s7w, so a full url)
  ceilingHeroLiving: {
    url: 'https://res.cloudinary.com/diosq0s7w/image/upload/v1778583839/ChatGPT_Image_May_12_2026_03_21_15_PM_eftzu7.png',
    alt: 'Homeowner walking into her living room with a cove-lit false ceiling, recessed spot lights and beige sofas',
  },
  // Our own renders in Cloudinary account diosq0s7w (full links). Used while the "BEDROOMS" renders are
  // being uploaded again (they were deleted from nzqefovs on 25 Nov 2026).
  livingFlowerCeiling: {
    url: 'https://res.cloudinary.com/diosq0s7w/image/upload/v1778583856/hf_20260512_054108_38408685-f67f-4515-a822-985d83019979_y6nnq9.png',
    alt: 'Living room with a flower-shaped false ceiling panel, cove lights, TV unit and L-shaped sofa',
  },
  masterBedroomRound: {
    url: 'https://res.cloudinary.com/diosq0s7w/image/upload/v1778583838/ChatGPT_Image_May_12_2026_03_16_05_PM_pnlauy.png',
    alt: 'Master bedroom with a round cove-lit false ceiling, sitting area and dresser',
  },
  kidsBedroomBlue: {
    url: 'https://res.cloudinary.com/diosq0s7w/image/upload/v1778585454/ChatGPT_Image_May_12_2026_04_30_35_PM_ptqgea.png',
    alt: 'Kids bedroom with blue walls, a sun-shaped ceiling light, study table and wardrobe',
  },
  livingCoveCeiling: {
    url: 'https://res.cloudinary.com/diosq0s7w/image/upload/v1778583842/ChatGPT_Image_May_12_2026_03_38_54_PM_v8bjr3.png',
    alt: 'Living room with a layered cove-lit false ceiling, wall panels and TV unit',
  },
  livingRoundCeiling: {
    url: 'https://res.cloudinary.com/diosq0s7w/image/upload/v1778583842/ChatGPT_Image_May_12_2026_03_35_05_PM_tolwlu.png',
    alt: 'Living room with a round layered false ceiling, beige sofas and TV wall',
  },
  parentsBedroom: {
    url: 'https://res.cloudinary.com/diosq0s7w/image/upload/v1778583833/ChatGPT_Image_May_12_2026_02_40_56_PM_zkd6ex.png',
    alt: 'Parents bedroom with wooden ceiling panels, lit bed wall, TV unit and sofa',
  },
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

  // Kitchens (more kitchens further down)
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
  // Cloudinary root + folders "BEDROOMS" and "mr. aggarwal" (our renders, no other brand on them)
  galleyKitchen: {
    id: 'v1794306243/kiitchen.png',
    alt: 'Parallel modular kitchen with white and wood cabinets, steel fridge, built-in microwave and black counter',
  },
  uShapeKitchen: {
    id: 'v1794306120/Enscape_2026-08-06-05-55-47_kitchen_1.png',
    alt: 'U-shaped modular kitchen with walnut base cabinets, white wall units, glass shutters and black sink',
  },
  lShapeKitchenFridge: {
    id: 'v1794306121/Enscape_2026-08-06-05-55-47_kitchen_2.png',
    alt: 'L-shaped modular kitchen with a tall fridge unit, lit wooden display shelves and glass wall cabinets',
  },
  diningOpenKitchen: {
    id: 'v1794306121/dining_area_2.png',
    alt: 'Dining area with tan chairs, cluster pendant light and false ceiling, opening into the kitchen',
  },
  blushMasterBedroom: {
    id: 'v1794982143/IMG_20261112_174642.jpg.jpg',
    alt: 'Master bedroom with a blush pink headboard, floral wall panels, cove-lit false ceiling and wardrobe',
  },
  sageWardrobeBedroom: {
    id: 'v1794982146/Enscape_2026-11-16-12-53-25_MB_-1.png',
    alt: 'Bedroom with sage green wall panels, a full-height sage wardrobe and profile lights in the false ceiling',
  },
  sageTvBedroom: {
    id: 'v1794982145/Enscape_2026-11-16-12-53-25_MB-2.png',
    alt: 'Bedroom with sage green panelled walls, wooden TV unit and profile-lit false ceiling',
  },
  greyTvBedroom: {
    id: 'v1794982153/Enscape_2026-11-12-14-43-16_MB-2.png',
    alt: 'White bedroom with a grey upholstered bed, framed wall panels, wardrobe and wooden TV unit',
  },
  slidingWardrobeBedroom: {
    id: 'v1794982149/Enscape_2026-11-12-17-04-06_BEDROOM-1.1.png',
    alt: 'Bedroom with a pink upholstered wall, white sliding wardrobe with a glass shutter and framed panels',
  },
  pinkPanelBedroom: {
    id: 'v1794982150/Enscape_2026-11-12-17-04-06_BEDROOM_-1.png',
    alt: 'Bedroom with a pink panelled headboard, wooden slat detail and a white full-height wardrobe',
  },
  beigeWardrobeBedroom: {
    id: 'v1794982161/Enscape_2026-11-15-18-50-28_BEDROOM_-1.png',
    alt: 'Beige bedroom with a grey headboard, full-height wardrobe with black glass shutters and cove ceiling',
  },
  beigeWardrobeFront: {
    id: 'v1794982161/Enscape_2026-11-15-18-50-28_BEDROOM-1.1.png',
    alt: 'Bedroom wardrobe wall with beige shutters, black glass doors and long black handles',
  },
  studyGuestRoom: {
    id: 'v1794982158/Enscape_2026-11-15-18-50-28_Enscape_scene_5.png',
    alt: 'Guest room with a wall-mounted study desk, daybed and carved white pooja unit',
  },
  coffeeStation: {
    id: 'v1794982142/Warm_Minimalist_Coffee_Station_Interior.png',
    alt: 'Coffee and crockery station with lit glass shelves and beige base cabinets',
  },
  livingProfileCeiling: {
    id: 'v1794982157/Enscape_2026-11-15-18-50-28_Enscape_scene_7.png',
    alt: 'Living room with a cove-lit false ceiling, wardrobe wall, crockery unit and wooden slat TV wall',
  },
  bathroomStoneVanity: {
    id: 'v1794306116/Enscape_2026-08-11-18-07-53_Enscape_scene_6.png',
    alt: 'Bathroom with grey stone tiles, a backlit wavy mirror, vessel basin and glass shower',
  },
};

/*
  Design gallery on the room pages (/kitchen, /bedroom, /wardrobe, /living-hall).
  Only our own photos show here (admin / Google Sheet designs are off, see RoomPage showAdminDesigns).
  To add a photo: add it to `photos` above, then put its key (and a title) here.
*/
export const roomGalleries = {
  // Each page shows only its own room, and no photo twice. The page's top banner photo is not repeated here.
  // Near-copies of one render (livingTvWall/livingTvWallWide, livingSofa/livingSofaAlt, compactBedroom/beigeWardrobeBedroom,
  // bathroomBeige/bathroomBeigeAlt, crockeryUnit/coffeeStation) count as the same photo.
  // TEMPORARY (25 Nov 2026): the "BEDROOMS" renders were deleted from Cloudinary, so the lists below use the photos
  // that still exist. When they are uploaded again (same names), put back the lists from git commit 50f44ea.
  kitchen: [
    ['lShapeKitchenFridge', 'L-shaped kitchen with tall fridge unit', 'Modern'],
    ['kitchenLOpen', 'Open kitchen facing the living room', 'Modern'],
    ['galleyKitchen', 'Parallel kitchen with built-in microwave', 'Modern'],
    ['diningToKitchen', 'Kitchen opening from the dining area', 'Minimal'],
  ],
  bedroom: [
    ['masterBedroomRound', 'Master bedroom with round cove ceiling', 'Luxury'],
    ['parentsBedroom', 'Parents bedroom with wooden ceiling panels', 'Luxury'],
    ['kidsBedroomBlue', 'Blue kids bedroom with study table', 'Kids'],
    ['kidsRoomJungle', 'Kids room with bunk bed', 'Kids'],
    ['guestRoom', 'Guest room with study and daybed', 'Minimal'],
  ],
  wardrobe: [
    ['kidsRoomJungle', 'Kids wardrobe with handle-less shutters', 'Kids'],
    ['kidsBedroomBlue', 'Blue kids wardrobe beside the study table', 'Kids'],
  ],
  // False Ceiling page gallery: [key, title, style, room] (room + style power the filters on that page)
  falseCeiling: [
    ['livingFlowerCeiling', 'Flower-shaped ceiling panel with cove lights', 'luxury', 'living'],
    ['livingRoundCeiling', 'Round layered ceiling over the living room', 'minimalist', 'living'],
    ['openPlanLiving', 'Ceiling with track lights over open-plan living', 'modern', 'living'],
    ['diningPendant', 'Recessed ceiling over the dining table', 'modern', 'living'],
    ['diningOpenKitchen', 'Dining ceiling with cluster pendant light', 'modern', 'living'],
    ['masterBedroomRound', 'Round cove-lit ceiling in a master bedroom', 'luxury', 'bedroom'],
    ['plumBedroom', 'Bedroom ceiling with soft cove light', 'luxury', 'bedroom'],
    ['parentsBedroom', 'Wooden ceiling panels in a parents bedroom', 'modern', 'bedroom'],
    ['kidsBedroomBlue', 'Sun-shaped ceiling light in a kids bedroom', 'modern', 'bedroom'],
    ['uShapeKitchen', 'Kitchen ceiling with recessed lights', 'modern', 'kitchen'],
    ['kitchenLOpen', 'Clean flat ceiling in an open kitchen', 'minimalist', 'kitchen'],
  ],
  living: [
    ['livingSofa', 'Beige sectional with slatted partition', 'Modern'],
    ['livingArchway', 'Living room through a wooden archway', 'Modern'],
    ['livingFlowerCeiling', 'Living room with flower-shaped ceiling', 'Luxury'],
    ['livingRoundCeiling', 'Living room with round layered ceiling', 'Modern'],
    ['livingCoveCeiling', 'Living room with layered cove ceiling', 'Luxury'],
    ['openPlanLiving', 'Open-plan living with sage crockery unit', 'Modern'],
    ['swingLounge', 'Lounge corner with a hanging swing', 'Luxury'],
    ['swingLoungeAlt', 'Living area with swing and aquarium wall', 'Luxury'],
    ['diningPendant', 'Living-dining with globe pendant light', 'Minimal'],
  ],
};

// Our own site video: false ceiling being installed
export const videos = {
  ceilingInstall:
    'https://res.cloudinary.com/diosq0s7w/video/upload/q_auto,f_auto/v1778846966/AQOWluTfI93wZli3y8AblN3fSmqfTw4HQIb1xU_J9xyKMECYX8e02fW7RiHP80HDEeD2kCjj02xHN81LkiO7YHHE7xK-nsxhZNxIo1k_lsqepn.mp4',
};

const isUrl = (v) => typeof v === 'string' && /^https:\/\//.test(v);

// A photo by its key in `photos` above, or a full Cloudinary link, at the width it is shown
// eslint-disable-next-line no-use-before-define
export const photo = (key, width = 1400) => {
  if (isUrl(key)) return sizeCloudinary(key, width); // eslint-disable-line no-use-before-define
  return photos[key].url
    ? sizeCloudinary(photos[key].url, width) // eslint-disable-line no-use-before-define
    : `${BASE}/image/upload/q_auto,f_auto,w_${width},c_limit/${photos[key].id}`;
};

export const alt = (key) => (photos[key] ? `${photos[key].alt} by Urbane Living` : '');

/* ───────────── Slots and galleries (managed from Admin -> Website Images) ─────────────
   slot('bedroom.banner', 'plumBedroom', 1400, 'Bedroom page › Top banner')
   -> the admin's photo for 'bedroom.banner' if one is set, else our default photo.
   The default can be a key of `photos` or a full Cloudinary link (then pass its alt text too).
   gallery('kitchen.gallery', 'Modular Kitchen page › Design gallery', items)
   -> a list the admin can change: edit photo / title / alt, hide a photo, change the order, add new photos.
   Admin changes are loaded in src/index.js before the app starts (see utils/siteImages.js).
   Label format: 'Page › Section' (› Item). The admin page groups photos by page and section. */
const overrides = {};
const registry = new Map(); // every single photo (slot) used on the website
const galleries = new Map(); // every list of photos the admin can add to

export const setImageOverrides = (map) => {
  if (map && typeof map === 'object') Object.assign(overrides, map);
};
export const getImageOverrides = () => overrides;
// admin page: replace all changes at once (so a removed change is gone too)
export const replaceImageOverrides = (map) => {
  Object.keys(overrides).forEach((k) => { delete overrides[k]; });
  setImageOverrides(map);
};

// Cloudinary photo at the size it is shown (keeps the site fast)
export const sizeCloudinary = (url, width) =>
  /\/image\/upload\/v\d+\//.test(url)
    ? url.replace('/image/upload/', `/image/upload/q_auto,f_auto,w_${width},c_limit/`)
    : url;

const register = (id, info) => {
  const prev = registry.get(id);
  registry.set(id, { ...(prev || {}), id, ...info });
};

// opts: { alt, title } = default alt text / title when the default is a full link (or a caption is shown)
export const slot = (id, defaultKey, width = 1400, label = id, opts = {}) => {
  if (!registry.has(id) || opts.alt || opts.title) register(id, { defaultKey, width, label, defaultAlt: opts.alt, defaultTitle: opts.title });
  const o = overrides[id];
  return o && o.url ? sizeCloudinary(o.url, width) : photo(defaultKey, width);
};

export const slotAlt = (id, defaultKey, defaultAlt = '') => {
  const o = overrides[id];
  if (o && o.alt) return `${o.alt} by Urbane Living`;
  return alt(defaultKey) || defaultAlt;
};

export const slotTitle = (id, defaultTitle = '') => {
  const o = overrides[id];
  return (o && o.title) || defaultTitle;
};

/* A list of photos the admin can manage.
   items: [{ key | url, id?, title?, alt?, style?, room?, category? }]
   fields: extra fields the admin can set for this list, e.g. ['style'] or ['style', 'room'] or ['category']
   Returns [{ id, key, title, alt, style, room, category, extra, src(width) }] in the admin's order. */
export const gallery = (gid, label, items, { fields = [], options = {}, width = 1400 } = {}) => {
  galleries.set(gid, { id: gid, label, fields, options });
  const list = items.map((d, n) => {
    const id = `${gid}.${d.id || d.key || n + 1}`;
    const def = d.key || d.url;
    slot(id, def, width, `${label} › ${d.title || `Photo ${n + 1}`}`, { alt: d.alt, title: d.title });
    const o = overrides[id] || {};
    return {
      id,
      default: def,
      title: o.title || d.title || '',
      alt: slotAlt(id, def, d.alt ? `${d.alt}` : ''),
      style: o.style || d.style || '',
      room: o.room || d.room || '',
      category: o.category || d.category || '',
      hidden: !!o.hidden,
      order: Number.isFinite(o.order) ? o.order : (n + 1) * 10,
      extra: false,
      url: o.url || '',
    };
  });
  // photos the admin added to this list
  Object.entries(overrides)
    .filter(([, o]) => o && o.extra && o.collection === gid && o.url)
    .forEach(([id, o], n) => list.push({
      id,
      default: o.url,
      title: o.title || '',
      alt: o.alt ? `${o.alt} by Urbane Living` : '',
      style: o.style || '',
      room: o.room || '',
      category: o.category || '',
      hidden: !!o.hidden,
      order: Number.isFinite(o.order) ? o.order : 1000 + n,
      extra: true,
      url: o.url,
    }));
  return list
    .filter((x) => !x.hidden)
    .sort((a, b) => a.order - b.order)
    .map((x) => ({ ...x, src: (w = width) => (x.url ? sizeCloudinary(x.url, w) : photo(x.default, w)) }));
};

// For the admin page: every single photo slot [{ id, label, page, section, item, default, defaultAlt, collection, ... }]
export const imageSlots = () => {
  roomGallery('kitchen'); // make sure the room gallery slots are listed too
  return [...registry.values()].map((r) => {
    const [page, ...rest] = r.label.split(' › ');
    const gid = [...galleries.keys()].find((g) => r.id.startsWith(`${g}.`));
    // 'Page › Section › Photo': photos of one section sit together in the admin page
    const section = gid ? galleries.get(gid).label.split(' › ').slice(1).join(' › ') : rest[0] || '';
    return {
      ...r,
      page,
      section,
      item: gid ? rest.slice(section.split(' › ').length).join(' › ') : rest.slice(1).join(' › '),
      collection: gid || '',
      default: photo(r.defaultKey, 640),
      defaultAlt: r.defaultAlt || (photos[r.defaultKey] ? photos[r.defaultKey].alt : ''),
      current: overrides[r.id] || null,
    };
  });
};

// For the admin page: every list the admin can add photos to [{ id, label, page, section, fields, options }]
export const imageGalleries = () => {
  roomGallery('kitchen');
  return [...galleries.values()].map((g) => {
    const [page, ...rest] = g.label.split(' › ');
    return { ...g, page, section: rest.join(' › ') };
  });
};

// Room page galleries (built once, after the admin changes are loaded in src/index.js)
const galleryNames = { kitchen: 'Modular Kitchen page', bedroom: 'Bedroom page', wardrobe: 'Wardrobe page', living: 'Living Hall page', falseCeiling: 'False Ceiling page' };
export const galleryOptions = {
  style: ['Modern', 'Luxury', 'Minimal', 'Kids'],
  falseCeilingStyle: ['modern', 'luxury', 'minimalist'],
  room: ['living', 'bedroom', 'kitchen'],
};
let builtGalleries = null;
const buildGalleries = () => Object.fromEntries(
  Object.entries(roomGalleries).map(([category, list]) => {
    const fc = category === 'falseCeiling';
    const items = gallery(
      `${category}.gallery`,
      `${galleryNames[category]} › Design gallery`,
      list.map(([key, title, style, room]) => ({ key, title, style, room })),
      {
        fields: fc ? ['style', 'room'] : ['style'],
        options: fc ? { style: galleryOptions.falseCeilingStyle, room: galleryOptions.room } : { style: galleryOptions.style },
      },
    );
    return [
      category,
      items.map((x) => ({
        _id: `own-${x.id}`,
        title: x.title,
        style: x.style,
        category: x.room || category,
        image: x.src(1400),
        thumb: x.src(720),
        alt: x.alt,
      })),
    ];
  }),
);

// Gallery items in the same shape as the admin designs: { _id, title, image, thumb, style, category, alt }
export const roomGallery = (category) => {
  if (!builtGalleries) builtGalleries = buildGalleries();
  return builtGalleries[category] || [];
};
