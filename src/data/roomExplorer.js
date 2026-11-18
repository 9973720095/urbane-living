// Home page "Room Explorer": tap the glowing points on each room photo.
// x / y = where the point sits on the photo, in % from the left / top edge.
// To find a spot: open the site on localhost, hold Alt and click the photo; the console prints x / y.
import { photo, alt as photoAlt } from './media';

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
      image: photo('livingTvWall'),
      imageAlt: photoAlt('livingTvWall'),
      intro: 'A warm, welcoming space for family time and guests.',
      spots: [
        { x: 40, y: 5, title: 'Cove-lit false ceiling', text: 'Layered gypsum ceiling with hidden LED strips for soft, glare-free light.' },
        { x: 50, y: 42, title: 'TV unit & storage', text: 'Fluted TV wall with a backlit stone panel and closed storage below.' },
        { x: 27, y: 35, title: 'Lit display units', text: 'Glass display shelves with profile lights for decor and books.' },
        { x: 45, y: 80, title: 'Sofa & centre table', text: 'Deep sofas and a glass centre table on a rug, planned around the TV wall.' },
        { x: 74, y: 14, title: 'Lighting plan', text: 'Chandelier, pendants, cove and spot lights placed for every mood.' },
      ],
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      link: '/bedroom',
      image: photo('plumBedroom'),
      imageAlt: photoAlt('plumBedroom'),
      intro: 'Calm, cosy and planned for better sleep.',
      spots: [
        { x: 50, y: 25, title: 'Bed back wall', text: 'Arched panel with hidden cove light behind the bed, framed by plum fluted panels.' },
        { x: 30, y: 4, title: 'Ceiling & cove light', text: 'Soft ambient lighting that makes the room feel bigger and calmer.' },
        { x: 24, y: 47, title: 'Side tables & storage', text: 'Bedside storage with drawers so everyday things stay within reach.' },
        { x: 75, y: 58, title: 'Reading corner', text: 'Chairs and a side table by the window for tea and reading.' },
      ],
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      link: '/kitchen',
      image: photo('kitchenLOpen'),
      imageAlt: photoAlt('kitchenLOpen'),
      intro: 'Smart storage and easy-clean finishes for daily cooking.',
      spots: [
        { x: 50, y: 15, title: 'Wall cabinets', text: 'Glossy, handle-less upper cabinets with soft-close shutters.' },
        { x: 15, y: 40, title: 'Hob & chimney', text: 'Built-in hob with a chimney above, planned with power points and ducting.' },
        { x: 60, y: 52, title: 'Sink & counter', text: 'Easy-clean stone counter with the sink and enough space for daily prep.' },
        { x: 55, y: 80, title: 'Drawers & baskets', text: 'Deep wooden drawers, cutlery trays and corner units that use every inch.' },
      ],
    },
    {
      id: 'kids',
      name: 'Kids Room',
      link: '/bedroom',
      image: photo('kidsRoomJungle'),
      imageAlt: photoAlt('kidsRoomJungle'),
      intro: 'Fun, safe and full of storage, made to grow with your child.',
      spots: [
        { x: 62, y: 50, title: 'Bunk bed', text: 'Bunk bed with a safe ladder and rails, saving floor space for play.' },
        { x: 43, y: 64, title: 'Study table', text: 'Study desk with drawers, shelves and a warm lit niche above.' },
        { x: 26, y: 55, title: 'Wardrobe', text: 'Full-height wardrobe with handle-less shutters, sized for kids clothes and toys.' },
        { x: 85, y: 40, title: 'Lit display shelves', text: 'Arched shelves with profile lights for toys and books.' },
      ],
    },
    {
      id: 'ceiling',
      name: 'False Ceiling',
      link: '/false-ceiling',
      image: photo('diningPendant'),
      imageAlt: photoAlt('diningPendant'),
      intro: 'Designer ceilings with a 10-year anti-crack warranty.',
      spots: [
        { x: 55, y: 4, title: 'Recessed ceiling', text: 'Raised ceiling over the dining table with a hidden LED cove.' },
        { x: 55, y: 24, title: 'Pendant light point', text: 'Light point planned in the ceiling right above the table.' },
        { x: 72, y: 5, title: 'Cove & spot lights', text: 'Hidden coves and spotlights planned with the ceiling design.' },
      ],
    },
  ],
};