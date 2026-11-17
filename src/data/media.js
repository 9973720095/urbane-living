/*
  Our own design photos (3D designs by the Urbane Living design team), all in ONE place.
  Cloudinary account: nzqefovs (ours). Never use photos from Google, Pinterest or other websites.

  photo('livingTvWall')        -> full width (1400 px), for big banners
  photo('livingTvWall', 640)   -> smaller copy for cards and thumbnails (faster site)
  alt('livingTvWall')          -> description for Google + screen readers
*/
const BASE = 'https://res.cloudinary.com/nzqefovs';

export const photos = {
  // Living rooms
  livingTvWall: {
    id: 'v1794306120/Enscape_2026-08-06-05-55-47_living_area__1',
    alt: 'Living room with a fluted TV wall, lit display units, layered false ceiling and crystal chandelier',
  },
  livingTvWallWide: {
    id: 'v1794306111/living_area__1',
    alt: 'Living room with a backlit TV wall, glass display units, cove-lit false ceiling and wall moulding',
  },
  livingSofa: {
    id: 'v1794306112/living_area__2',
    alt: 'Living room with a beige sectional sofa, slatted wooden partition, false ceiling and chandelier',
  },
  livingSofaAlt: {
    id: 'v1794306119/Enscape_2026-08-06-05-55-47_living_area__2',
    alt: 'Bright living room with an L-shaped sofa, TV wall and wooden slat partition',
  },
  livingArchway: {
    id: 'v1794306070/Warm_Modern_Living_Room_Archway_View',
    alt: 'Warm modern living room seen through a wooden archway, with a glass partition and open kitchen behind',
  },
  openPlanLiving: {
    id: 'v1794306070/Warm_Modern_Open-Plan_Living_Space',
    alt: 'Open-plan living and dining space with a sage green crockery unit, track lights and herringbone floor',
  },
  swingLounge: {
    id: 'v1794306245/living_area_7',
    alt: 'Lounge corner with a wooden ceiling, hanging swing, aquarium wall and cane chairs',
  },
  swingLoungeAlt: {
    id: 'v1794306242/Enscape_2026-09-29-17-47-24_living_area_7',
    alt: 'Living area with a hanging swing, built-in aquarium and decorative partition',
  },

  // Dining
  diningPendant: {
    id: 'v1794306123/dining_area_1',
    alt: 'Dining area with a six-seater table, globe pendant light, recessed false ceiling and wall art',
  },
  diningCrockery: {
    id: 'v1794306112/dining_area_3',
    alt: 'Dining area with a wooden crockery unit, cluster pendant light and false ceiling',
  },
  diningToKitchen: {
    id: 'v1794306120/dining_area_4',
    alt: 'Dining space opening into a modular kitchen, with a console table and wooden tall unit',
  },

  // Bedrooms
  plumBedroom: {
    id: 'v1794306069/Elegant_Plum-Panelled_Bedroom_Retreat',
    alt: 'Master bedroom with plum wall panels, a backlit arched bed wall, wooden bed and reading chairs',
  },
  guestRoom: {
    id: 'v1794306243/GUEST_ROOM_1',
    alt: 'Guest room with a tall wardrobe, wall-mounted study unit, panelled wall and wooden daybed',
  },
  kidsRoomJungle: {
    id: 'v1794306243/KIDS_ROOM_1',
    alt: 'Kids room with a green bunk bed, study table, white wardrobe and jungle wallpaper with lit shelves',
  },
  kidsRoomPink: {
    id: 'v1794306242/Enscape_2026-09-30-16-34-29_kids_bedroom_1',
    alt: 'Kids bedroom with a black bunk bed, study desk and soft pink walls',
  },

  // Kitchens
  kitchenIsland: {
    id: 'v1794306244/kitchen_1',
    alt: 'Modular kitchen with an island counter, pendant lights and a wooden archway entrance',
  },
  kitchenL: {
    id: 'v1794306112/kitchen_2',
    alt: 'L-shaped modular kitchen with wooden base units, glossy wall cabinets and a lit glass display unit',
  },
  kitchenLAlt: {
    id: 'v1794306113/kitchen_3',
    alt: 'L-shaped modular kitchen with a hob, chimney, wooden drawers and grey stone counter',
  },
  kitchenLOpen: {
    id: 'v1794306120/Enscape_2026-08-06-05-55-47_kitchen_3',
    alt: 'Open modular kitchen with handle-less cabinets, opening into the living room',
  },

  // Bathrooms
  bathroomBeige: {
    id: 'v1794306070/Photorealistic_Modern_Beige_Bathroom_1',
    alt: 'Modern beige bathroom with a black vanity, vessel basin, niche shelf and glass shower',
  },
  bathroomBeigeAlt: {
    id: 'v1794306070/Photorealistic_Modern_Beige_Bathroom',
    alt: 'Beige bathroom with a wooden vanity, wall-hung toilet and backlit niche',
  },
  guestBathroom: {
    id: 'v1794306114/guest_bathroom__1',
    alt: 'Guest bathroom with grey tiles, a backlit mirror, floating vanity and glass shower',
  },
  guestBathroomShower: {
    id: 'v1794306116/guest_bathroom_1.2',
    alt: 'Guest bathroom shower area with a glass partition and marble walls',
  },
  guestBathroomVanity: {
    id: 'v1794306117/guest_bathroom_1.1',
    alt: 'Guest bathroom with a backlit mirror, wooden vanity and tiled shower wall',
  },
  bathroomVanity: {
    id: 'v1794306242/Enscape_2026-09-28-15-16-33_Enscape_scene_2',
    alt: 'Bathroom vanity with a dark wooden cabinet, vessel basin and patterned tiles',
  },
};

// Our own site video: false ceiling being installed
export const videos = {
  ceilingInstall:
    'https://res.cloudinary.com/diosq0s7w/video/upload/q_auto,f_auto/v1778846966/AQOWluTfI93wZli3y8AblN3fSmqfTw4HQIb1xU_J9xyKMECYX8e02fW7RiHP80HDEeD2kCjj02xHN81LkiO7YHHE7xK-nsxhZNxIo1k_lsqepn.mp4',
};

export const photo = (key, width = 1400) =>
  `${BASE}/image/upload/q_auto,f_auto,w_${width},c_limit/${photos[key].id}.png`;

export const alt = (key) => `${photos[key].alt} by Urbane Living`;
