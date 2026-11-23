// Home page "Room Explorer": tap the glowing points on each room photo.
// x / y = where the point sits on the photo, in % from the left / top edge.
// To find a spot: open the site on localhost, hold Alt and click the photo; the console prints x / y.
import { slot, slotAlt } from './media';

export const roomExplorer = {
  tag: 'Room Explorer',
  title: 'Explore your future home, room by room',
  subtitle: 'Tap the glowing points to see what we design in every room, from ceilings and lighting to storage and finishes.',
  cta: 'Get this look',
  rooms: [
    {
      id: 'living',
      name: 'Living Room',
      link: '/living-hall',
      image: slot('home.explorer.living', 'livingTvWall', 1400, 'Home › Room Explorer › Living Room tab (glowing points stay where they are)'),
      imageAlt: slotAlt('home.explorer.living', 'livingTvWall'),
      intro: 'Warm and welcoming, for family and guests.',
      spots: [
        { x: 40, y: 5, title: 'Cove-lit false ceiling', text: 'Hidden LED glow, no glare.' },
        { x: 50, y: 42, title: 'TV unit & storage', text: 'Fluted wall, backlit panel, closed storage.' },
        { x: 27, y: 35, title: 'Lit display units', text: 'Glass shelves with profile lights.' },
        { x: 45, y: 80, title: 'Sofa & centre table', text: 'Deep sofas, glass table, cosy rug.' },
        { x: 74, y: 14, title: 'Lighting plan', text: 'Chandelier, cove and spots for every mood.' },
      ],
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      link: '/bedroom',
      image: slot('home.explorer.bedroom', 'plumBedroom', 1400, 'Home › Room Explorer › Bedroom tab (glowing points stay where they are)'),
      imageAlt: slotAlt('home.explorer.bedroom', 'plumBedroom'),
      intro: 'Calm, cosy and planned for better sleep.',
      spots: [
        { x: 50, y: 25, title: 'Bed back wall', text: 'Arched panel with a soft hidden glow.' },
        { x: 30, y: 4, title: 'Ceiling & cove light', text: 'Soft light that feels calm and spacious.' },
        { x: 24, y: 47, title: 'Side tables & storage', text: 'Drawers for everyday things, close at hand.' },
        { x: 75, y: 58, title: 'Reading corner', text: 'Chairs by the window for tea and books.' },
      ],
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      link: '/kitchen',
      image: slot('home.explorer.kitchen', 'kitchenLOpen', 1400, 'Home › Room Explorer › Kitchen tab (glowing points stay where they are)'),
      imageAlt: slotAlt('home.explorer.kitchen', 'kitchenLOpen'),
      intro: 'Smart storage, easy-clean finishes.',
      spots: [
        { x: 50, y: 15, title: 'Wall cabinets', text: 'Handle-less, glossy, soft-close.' },
        { x: 15, y: 40, title: 'Hob & chimney', text: 'Built-in hob, chimney and ducting planned.' },
        { x: 60, y: 52, title: 'Sink & counter', text: 'Easy-clean stone, room to prep.' },
        { x: 55, y: 80, title: 'Drawers & baskets', text: 'Deep drawers, corner units, no wasted inch.' },
      ],
    },
    {
      id: 'kids',
      name: 'Kids Room',
      link: '/bedroom',
      image: slot('home.explorer.kids', 'kidsRoomJungle', 1400, 'Home › Room Explorer › Kids Room tab (glowing points stay where they are)'),
      imageAlt: slotAlt('home.explorer.kids', 'kidsRoomJungle'),
      intro: 'Fun, safe and made to grow with your child.',
      spots: [
        { x: 62, y: 50, title: 'Bunk bed', text: 'Safe ladder and rails, more floor to play.' },
        { x: 43, y: 64, title: 'Study table', text: 'Drawers, shelves and a warm lit niche.' },
        { x: 26, y: 55, title: 'Wardrobe', text: 'Full-height, handle-less, toy-friendly.' },
        { x: 85, y: 40, title: 'Lit display shelves', text: 'Arched shelves that light up toys and books.' },
      ],
    },
    {
      id: 'ceiling',
      name: 'False Ceiling',
      link: '/false-ceiling',
      image: slot('home.explorer.ceiling', 'diningPendant', 1400, 'Home › Room Explorer › False Ceiling tab (glowing points stay where they are)'),
      imageAlt: slotAlt('home.explorer.ceiling', 'diningPendant'),
      intro: 'Designer ceilings with a 10-year anti-crack warranty.',
      spots: [
        { x: 55, y: 4, title: 'Recessed ceiling', text: 'Raised over the table with a hidden LED cove.' },
        { x: 55, y: 24, title: 'Pendant light point', text: 'Planned right above the dining table.' },
        { x: 72, y: 5, title: 'Cove & spot lights', text: 'Hidden coves and spots, built in.' },
      ],
    },
  ],
};