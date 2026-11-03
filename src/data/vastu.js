// Disha (Vastu score by Urbane Living): home page card, /vastu landing page and the /vastu/analyze floor plan tool.
// Room rules: ideal / avoid = zones for each room (every other zone counts as "okay").
// Zones: N, NE, E, SE, S, SW, W, NW and C (centre / Brahmasthan).

export const vastuRules = {
  zones: {
    N: 'North',
    NE: 'North-East',
    E: 'East',
    SE: 'South-East',
    S: 'South',
    SW: 'South-West',
    W: 'West',
    NW: 'North-West',
    C: 'Centre',
  },

  // Score bands (out of 100)
  ratings: [
    { min: 85, label: 'Excellent', text: 'Your home follows Vastu very well.' },
    { min: 70, label: 'Good', text: 'Mostly balanced, with a few easy improvements.' },
    { min: 50, label: 'Needs attention', text: 'Some rooms need simple remedies.' },
    { min: 0, label: 'Needs remedies', text: 'Several rooms need attention. Small changes can help a lot.' },
  ],

  rooms: [
    {
      id: 'entrance',
      name: 'Main entrance',
      short: 'Entry',
      ideal: ['N', 'NE', 'E'],
      avoid: ['S', 'SW', 'C'],
      good: 'A north or east entrance welcomes morning light and positive energy.',
      okay: 'Workable. Keep the entrance bright, clean and well lit.',
      remedy: 'Add a bright light and a nameplate at the door, keep the threshold clutter-free, and use a wooden door frame.',
    },
    {
      id: 'living',
      name: 'Living room',
      short: 'Living',
      ideal: ['N', 'NE', 'E'],
      avoid: ['SW', 'SE'],
      good: 'A north / east living room stays bright and feels open for guests.',
      okay: 'Fine for daily use. Keep heavy furniture on the south and west walls.',
      remedy: 'Place the sofa on the south or west wall, use light colours, and keep the north-east corner open and light.',
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      short: 'Kitchen',
      ideal: ['SE'],
      avoid: ['NE', 'SW', 'N', 'C'],
      good: 'South-east is the fire zone, the best place for cooking.',
      okay: 'Acceptable. Try to face east while cooking.',
      remedy: 'Place the stove in the south-east corner of the kitchen, cook facing east, and use warm colours like orange or red in small accents.',
    },
    {
      id: 'master',
      name: 'Master bedroom',
      short: 'Master',
      ideal: ['SW'],
      avoid: ['NE', 'SE', 'C'],
      good: 'South-west gives stability and good sleep to the head of the family.',
      okay: 'Workable. Keep the bed against the south or west wall.',
      remedy: 'Keep the bed headboard on the south or west wall, use earthy colours, and avoid mirrors facing the bed.',
    },
    {
      id: 'kids',
      name: 'Kids / guest bedroom',
      short: 'Kids',
      ideal: ['W', 'NW'],
      avoid: ['SW', 'SE'],
      good: 'West / north-west suits children and guests well.',
      okay: 'Fine. Keep the study table facing north or east.',
      remedy: 'Keep the study table facing north or east, use soft colours, and keep electronics away from the bed.',
    },
    {
      id: 'pooja',
      name: 'Pooja room',
      short: 'Pooja',
      ideal: ['NE'],
      avoid: ['S', 'SW', 'SE'],
      good: 'North-east (Ishan corner) is the most sacred zone for prayer.',
      okay: 'Acceptable. Face east or north while praying.',
      remedy: 'Place idols so you face east while praying, use white or light yellow, and keep it away from toilet walls.',
    },
    {
      id: 'toilet',
      name: 'Toilet / bathroom',
      short: 'Toilet',
      ideal: ['NW', 'W'],
      avoid: ['NE', 'SW', 'C'],
      good: 'North-west / west is the right zone for toilets and bathrooms.',
      okay: 'Workable. Keep it well ventilated and the door closed.',
      remedy: 'Keep the door closed, add an exhaust fan, use light colours, and place a small bowl of sea salt inside (change it weekly).',
    },
  ],

  // Always shown in the report's "Enhancements" list
  enhancements: [
    'Keep the north-east corner of every room light, open and clutter-free.',
    'Place heavy furniture and tall storage along the south and west walls.',
    'Keep the centre of the home (Brahmasthan) open, without heavy furniture or pillars.',
    'Use plenty of natural light from the north and east; add warm lights in the south-west.',
  ],

  // Shown while the report is being prepared
  tips: [
    { room: 'Bathroom', text: 'Bathrooms work best in the north-west, west or south. These zones allow proper energy flow without disturbing auspicious directions.' },
    { room: 'Kitchen', text: 'South-east is the fire zone. Cooking here while facing east is considered the most balanced placement.' },
    { room: 'Pooja room', text: 'The north-east (Ishan corner) is the most sacred zone. Keep it light, clean and free of heavy items.' },
    { room: 'Bedroom', text: 'A south-west master bedroom brings stability. Sleep with your head towards the south or east.' },
  ],
};

// Home page card ("Disha" = direction)
export const vastuBanner = {
  name: 'Disha',
  tagline: 'Vastu Score by Urbane Living',
  title: 'What’s your home’s Vastu score?',
  text: 'Upload your floor plan, point it north and tap your rooms. Disha shows how every room scores, with simple fixes that need no breaking.',
  chips: ['Floor plan or PDF', 'Exact north', 'Room-wise fixes'],
  button: 'Get my Vastu score',
  secondary: 'How it works',
  link: '/vastu',
  preview: {
    score: 82,
    label: 'Good balance',
    rows: [
      { room: 'Kitchen', zone: 'South-East', status: 'ideal' },
      { room: 'Pooja room', zone: 'North-East', status: 'ideal' },
      { room: 'Toilet', zone: 'North-East', status: 'avoid' },
    ],
  },
};

// /vastu landing page
export const vastuPage = {
  hero: {
    eyebrow: 'Disha · Free Vastu score',
    title: 'Know your home’s',
    highlight: 'Vastu score in 2 minutes',
    text: 'Disha reads your floor plan the way a Vastu consultant does: true north first, then every room in its zone. You get a clear score, what already works, and easy fixes for the rest.',
    primary: 'Start with my floor plan',
    secondary: 'See how it works',
    trust: ['No sign-up', 'Your plan stays on your device', 'Made by interior designers'],
  },
  bento: {
    title: 'Built for real homes, not guesswork',
    text: 'Most Vastu tools guess. Disha uses your plan, your north and your rooms, so every zone is exact.',
    items: [
      { icon: 'compass', title: 'True-north precision', text: 'Turn the compass to your plot’s real north. Every room is placed into one of 9 zones (8 directions + Brahmasthan) from that.', wide: true },
      { icon: 'tap', title: 'Tap, don’t type', text: 'Tap where each room is on your plan. Live colour tells you instantly if it sits well.' },
      { icon: 'file', title: 'Any plan works', text: 'Builder brochure, architect PDF or a phone photo of your plan.' },
      { icon: 'shield', title: 'Private by design', text: 'Your floor plan never leaves your browser.' },
      { icon: 'tools', title: 'Fixes without breaking', text: 'Colours, placement, lights and simple changes our designers actually use in Delhi NCR homes.' },
    ],
  },
  steps: {
    title: 'Four steps to your Vastu score',
    items: [
      { title: 'Add your plan', text: 'Choose your city and upload an image or PDF of the floor plan.' },
      { title: 'Point it north', text: 'Drag the compass, or just tell us which side of the drawing faces north.' },
      { title: 'Tag your rooms', text: 'Tap the kitchen, bedrooms, pooja room, toilets and entrance on the plan.' },
      { title: 'Read your score', text: 'Get your score out of 100, room by room, with simple fixes.' },
    ],
  },
  report: {
    title: 'Your report, at a glance',
    text: 'A clear score, a colour for every room and practical next steps. Save it as a PDF or share it on WhatsApp.',
    points: [
      { tone: 'ideal', title: 'Working well', text: 'Rooms already in their best zone.' },
      { tone: 'avoid', title: 'Easy fixes', text: 'Rooms in a weak zone, with remedies that need no breaking.' },
      { tone: 'okay', title: 'Small upgrades', text: 'Optional ideas for light, balance and energy flow.' },
    ],
  },
  faqs: {
    title: 'Vastu questions, answered',
    items: [
      { q: 'Is the Disha Vastu check really free?', a: 'Yes. There is no sign-up and no charge. You only share your number if you want our designer to call you.' },
      { q: 'How do I find the north of my floor plan?', a: 'Most builder plans have a north arrow. If yours does not, stand at your main door with a phone compass and note the direction, then set the same on Disha.' },
      { q: 'Is my floor plan uploaded anywhere?', a: 'No. The plan opens only in your browser to place the rooms. It is not uploaded to our servers.' },
      { q: 'What if a room is in the wrong zone?', a: 'Most homes have one or two such rooms. Your report lists simple remedies, like colours, lighting and placement, that do not need any breaking.' },
      { q: 'Can Urbane Living design my home to follow Vastu?', a: 'Yes. Our designers plan layouts, furniture, colours and lighting to follow Vastu wherever your home allows, and show it to you in 3D first.' },
    ],
  },
  cta: {
    title: 'Ready to see your score?',
    text: 'It takes about two minutes. Keep your floor plan handy.',
    button: 'Check my home now',
  },
  note: 'Vastu tips are traditional guidance. Our designers plan layouts, colours and lighting to follow them wherever your home allows.',
  seo: {
    title: 'Free Vastu Score for Your Home | Floor Plan Vastu Check | Urbane Living',
    description:
      'Check the Vastu of your home for free with Disha: upload your floor plan, set true north and tap your rooms to get a Vastu score out of 100 with room-wise remedies.',
    path: '/vastu',
  },
};

// /vastu/analyze tool text
export const vastuTool = {
  name: 'Disha',
  steps: ['Your plan', 'Set north', 'Tag rooms', 'Score'],
  upload: {
    title: 'Add your floor plan',
    text: 'Choose your city, then add the plan you want checked.',
    tip: 'Crop the plan close to the outer walls for the most accurate zones.',
    drop: 'Drop your floor plan here',
    formats: ['PDF', 'PNG', 'JPEG', 'WebP'],
    limit: 'Up to 10MB · stays on your device',
    needCity: 'Choose your city first',
  },
  direction: {
    title: 'Point your plan north',
    text: 'Drag the ring until N matches your home’s true north, or pick a side below.',
    sideTitle: 'Which side of the drawing faces north?',
  },
  rooms: {
    title: 'Tag your rooms',
    text: 'Pick a room, then tap its spot on the plan. Skip anything your home does not have.',
  },
  analysing: {
    title: 'Reading your home',
    text: 'Placing each room in its zone and preparing your fixes...',
  },
  report: {
    title: 'Your Vastu score',
    leadTitle: 'Want a Vastu-friendly design for this plan?',
    leadText: 'Our designer will study your plan and show you a layout that follows Vastu, in 3D, free.',
    leadButton: 'Call me back',
    leadDone: 'Thank you! Our designer will call you shortly with ideas for your plan.',
  },
  seo: {
    title: 'Disha Vastu Checker: Upload Your Floor Plan | Urbane Living',
    description: 'Upload your floor plan, set true north and tag your rooms to get an instant Vastu score with remedies.',
    path: '/vastu/analyze',
  },
};
