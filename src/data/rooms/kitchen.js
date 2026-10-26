// Modular Kitchen page (/kitchen). Layout: components/RoomPage.jsx
import { cdn } from '../config';
import { highlights } from '../common';

export const kitchenPage = {
  api: '/api/kitchen',
  category: 'kitchen',
  service: 'Modular Kitchen Design',
  breadcrumb: 'Modular Kitchens',
  altSuffix: 'modular kitchen design',
  faqTitle: 'Modular kitchen FAQs',
  banner: {
    eyebrow: 'Modular Kitchens · Delhi NCR',
    title: 'A kitchen that makes',
    highlight: 'cooking easy',
    subtitle: 'Smart storage, easy-clean finishes and soft-close fittings, designed around how your family cooks and made to fit your space.',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_38_54_PM_v8bjr3.png`,
    imageAlt: 'Modern modular kitchen with handle-less cabinets and under-cabinet lighting by Urbane Living',
    whatsappMessage: 'Hi Urbane Living, I want a free 3D design for my modular kitchen.',
    align: 'left',
    highlights,
  },
  gallery: {
    title: 'Modular kitchen designs by Urbane Living',
    subtitle: 'Kitchens designed by our team. Tap any design to see it bigger, or get the same look for your home.',
    empty: 'New kitchen designs are being added. Get a free 3D design made for your own kitchen.',
  },
  elements: {
    title: 'Everything your kitchen needs',
    subtitle: 'Choose what you need. Every unit is designed together, so your kitchen works as one smooth space.',
    items: [
      { icon: 'storage', title: 'Base & Wall Cabinets', text: 'Drawers, baskets and shelves planned for pots, plates, spices and daily groceries.' },
      { icon: 'wardrobe', title: 'Tall Unit & Pantry', text: 'Pull-out pantry and tall storage to keep dry rations organised and easy to reach.' },
      { icon: 'appliance', title: 'Appliance Planning', text: 'Space and power points planned for chimney, hob, oven, microwave, fridge and dishwasher.' },
      { icon: 'hardware', title: 'Soft-Close Fittings', text: 'Smooth, quiet drawers and hinges, corner units and organisers for every cabinet.' },
      { icon: 'panel', title: 'Finishes & Countertop', text: 'Laminate, acrylic or PU finishes with a matching countertop and backsplash.' },
      { icon: 'light', title: 'Kitchen Lighting', text: 'Under-cabinet and ceiling lights so your work area is always bright.' },
    ],
  },
  sizes: {
    title: 'Pick the right layout for your kitchen',
    items: [
      {
        tag: 'L-Shaped',
        title: 'L-shaped kitchen',
        points: ['Best for small and medium kitchens', 'Easy work triangle between sink, hob and fridge', 'Corner units use every inch of space'],
      },
      {
        tag: 'U-Shaped',
        title: 'U-shaped kitchen',
        points: ['Maximum counter space and storage', 'Ideal for families who cook a lot', 'Separate zones for prep, cooking and washing'],
      },
      {
        tag: 'Parallel',
        title: 'Parallel & straight kitchen',
        points: ['Perfect for narrow kitchens and flats', 'Two counters for cooking and washing', 'Straight layout works well for compact homes'],
      },
    ],
  },
  steps: {
    title: 'From idea to your new kitchen',
    items: [
      { title: 'Free consultation', text: 'Our designer visits, measures your kitchen and understands how you cook.' },
      { title: '3D design & quote', text: 'See your kitchen in 3D with an itemised quote for cabinets, fittings and finishes.' },
      { title: 'Production', text: 'Cabinets and shutters are made to size with branded materials and fittings.' },
      { title: 'Installation & handover', text: 'Our team installs, checks every drawer and hinge, cleans up and hands over.' },
    ],
  },
  faqs: [
    { q: 'How much does a modular kitchen cost?', a: 'It depends on the size and layout of your kitchen, the material, the finish and the fittings you choose. After a free site visit you get an itemised quote so you know the cost of every unit.' },
    { q: 'Which material is best for a kitchen?', a: 'Our designer suggests moisture-resistant boards for kitchen cabinets and helps you choose a finish (laminate, acrylic or PU) that fits your budget and look. Your quote names every material and brand.' },
    { q: 'Which layout is right for my kitchen?', a: 'L-shaped suits most small and medium kitchens, U-shaped gives the most storage, and parallel or straight layouts work best in narrow spaces. Our designer will suggest the best one after measuring your kitchen.' },
    { q: 'How long does a modular kitchen take?', a: 'It depends on the size and finish. Your quote includes a written timeline from design approval to installation.' },
    { q: 'Will I see the design before work starts?', a: 'Yes. You get a 3D design of your kitchen first. Work starts only after you approve it.' },
    { q: 'Which areas do you serve?', a: 'We work across Delhi NCR: Delhi, Noida, Greater Noida, Ghaziabad, Gurgaon and Faridabad.' },
  ],
  cta: {
    title: 'Ready for a kitchen you love cooking in?',
    text: 'Book a free consultation and get a 3D design of your modular kitchen.',
    button: 'Get Free 3D Design',
  },
  seo: {
    title: 'Modular Kitchen Design in Delhi NCR | L, U & Parallel Kitchens | Urbane Living',
    description:
      'Modular kitchen design in Delhi, Noida, Ghaziabad and Gurgaon. Smart storage, soft-close fittings and easy-clean finishes with a free 3D design and itemised quote.',
    path: '/kitchen',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_38_54_PM_v8bjr3.png`,
  },
};