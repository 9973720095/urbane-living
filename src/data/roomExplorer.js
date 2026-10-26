// Home page "Room Explorer": tap the glowing points on each room photo.
// x / y = where the point sits on the photo, in % from the left / top edge.
// To find a spot: open the site on localhost, hold Alt and click the photo; the console prints x / y.
import { cdn } from './config';

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
      image: `${cdn}/image/upload/q_auto/f_auto,w_1400/v1778583856/hf_20260512_054108_38408685-f67f-4515-a822-985d83019979_y6nnq9.png`,
      imageAlt: 'Modern living room with TV unit, cove-lit false ceiling and wall panelling by Urbane Living',
      intro: 'A warm, welcoming space for family time and guests.',
      spots: [
        { x: 50, y: 12, title: 'Cove-lit false ceiling', text: 'Layered gypsum ceiling with hidden LED strips for soft, glare-free light.' },
        { x: 30, y: 52, title: 'TV unit & storage', text: 'Wall-mounted TV unit with closed storage that hides wires and clutter.' },
        { x: 72, y: 42, title: 'Wall panelling', text: 'Fluted or textured panels that add depth behind the TV or sofa.' },
        { x: 18, y: 18, title: 'Lighting plan', text: 'Spot, cove and profile lights placed for reading, movies and parties.' },
      ],
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      link: '/bedroom',
      image: `${cdn}/image/upload/q_auto/f_auto,w_1400/v1778583838/ChatGPT_Image_May_12_2026_03_16_05_PM_pnlauy.png`,
      imageAlt: 'Master bedroom with upholstered bed back panel, wardrobe and cove lighting by Urbane Living',
      intro: 'Calm, cosy and planned for better sleep.',
      spots: [
        { x: 50, y: 40, title: 'Bed back panel', text: 'Upholstered or wooden panel behind the bed with built-in reading lights.' },
        { x: 50, y: 10, title: 'Ceiling & cove light', text: 'Soft ambient lighting that makes the room feel bigger and calmer.' },
        { x: 85, y: 50, title: 'Wardrobe', text: 'Sliding or hinged wardrobe sized for your clothes, shoes and bags.' },
        { x: 20, y: 65, title: 'Side tables & storage', text: 'Bedside storage with drawers so everyday things stay within reach.' },
      ],
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      link: '/kitchen',
      image: `${cdn}/image/upload/q_auto/f_auto,w_1400/v1778583842/ChatGPT_Image_May_12_2026_03_38_54_PM_v8bjr3.png`,
      imageAlt: 'Modern modular kitchen with handle-less cabinets and under-cabinet lighting by Urbane Living',
      intro: 'Smart storage and easy-clean finishes for daily cooking.',
      spots: [
        { x: 40, y: 28, title: 'Wall cabinets', text: 'Handle-less upper cabinets with lift-up or soft-close shutters.' },
        { x: 45, y: 50, title: 'Under-cabinet lighting', text: 'LED strips that light up your counter for chopping and cooking.' },
        { x: 55, y: 72, title: 'Drawers & baskets', text: 'Deep drawers, cutlery trays and corner units that use every inch.' },
        { x: 82, y: 40, title: 'Tall unit & pantry', text: 'Pull-out pantry for dry rations, planned around your appliances.' },
      ],
    },
    {
      id: 'wardrobe',
      name: 'Wardrobe',
      link: '/wardrobe',
      image: `${cdn}/image/upload/q_auto/f_auto,w_1400/v1778585454/ChatGPT_Image_May_12_2026_04_30_35_PM_ptqgea.png`,
      imageAlt: 'Bedroom with a full-height custom wardrobe by Urbane Living',
      intro: 'Made to your wall size, planned around what you store.',
      spots: [
        { x: 55, y: 35, title: 'Full-height shutters', text: 'Floor-to-ceiling wardrobe that uses the loft space too.' },
        { x: 55, y: 60, title: 'Inside organisers', text: 'Hanging, shelves, drawers and accessory trays planned for you.' },
        { x: 40, y: 15, title: 'Profile lighting', text: 'Slim lights in the shutters or inside, so you find things easily.' },
      ],
    },
    {
      id: 'ceiling',
      name: 'False Ceiling',
      link: '/false-ceiling',
      image: `${cdn}/image/upload/q_auto/f_auto,w_1400/v1778583839/ChatGPT_Image_May_12_2026_03_21_15_PM_eftzu7.png`,
      imageAlt: 'Luxury living room with a designer false ceiling by Urbane Living',
      intro: 'Designer ceilings with a 10-year anti-crack warranty.',
      spots: [
        { x: 50, y: 10, title: 'Designer ceiling', text: 'Peripheral, island or layered designs in gypsum or POP.' },
        { x: 25, y: 22, title: 'Cove & spot lights', text: 'Hidden LED coves and spotlights planned with the ceiling design.' },
        { x: 75, y: 22, title: 'Fan & AC planning', text: 'Ceiling designed around fans, AC ducts and sprinklers from day one.' },
      ],
    },
  ],
};