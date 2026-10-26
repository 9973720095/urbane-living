// About Us page (/about). Keep every promise here true: customers and Google read it.
import { cdn } from './config';

export const aboutPage = {
  banner: {
    eyebrow: 'About Urbane Living',
    title: 'We design homes that',
    highlight: 'feel like you',
    subtitle: 'An interior and false ceiling team from Delhi NCR that designs, builds and installs your home, with one point of contact from the first visit to handover.',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583833/ChatGPT_Image_May_12_2026_02_40_56_PM_zkd6ex.png`,
    imageAlt: 'Elegant living room designed by Urbane Living',
    whatsappMessage: 'Hi Urbane Living, I would like to know more about your interior design services.',
    height: 'md',
    align: 'center',
  },
  story: {
    tag: 'Our Story',
    title: 'Crafting spaces that are stylish, practical and built to last',
    paragraphs: [
      'At Urbane Living, we believe your home should reflect who you are. We design everything from designer false ceilings to complete homes: modular kitchens, wardrobes, living rooms, bedrooms and more.',
      'Every project gets a 3D design before work starts, an itemised quote with no hidden costs, and one team that handles design, production and installation. That way, what you approve is exactly what you get.',
    ],
    points: [
      'Free consultation and 3D design before you decide',
      'Itemised quote: you see the cost of every item',
      'Branded materials, named in your quote',
      '10-year anti-crack warranty on our false ceilings',
    ],
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583856/hf_20260512_054108_38408685-f67f-4515-a822-985d83019979_y6nnq9.png`,
    imageAlt: 'Living room with designer false ceiling and TV unit by Urbane Living',
  },
  values: {
    title: 'What we stand for',
    items: [
      { icon: 'design', title: 'Personalised Design', text: 'Every home is designed around your family, your space and your budget, never copied from a catalogue.' },
      { icon: 'price', title: 'Transparent Pricing', text: 'An itemised quote before work starts. Anything new is added only after you approve it.' },
      { icon: 'time', title: 'On-Time Delivery', text: 'A written timeline in your quote, with regular updates from our site team.' },
      { icon: 'quality', title: 'Quality You Can Check', text: 'Branded materials and careful finishing, checked before we hand over your home.' },
    ],
  },
  steps: {
    title: 'How we work',
    items: [
      { title: 'Meet & measure', text: 'A designer visits your home, takes measurements and understands your needs.' },
      { title: 'Design in 3D', text: 'You see your home in 3D and get an itemised quote. Changes are welcome.' },
      { title: 'Build', text: 'Furniture and ceilings are made to size with branded materials.' },
      { title: 'Install & hand over', text: 'Our team installs, cleans up and hands over your finished home.' },
    ],
  },
  visit: {
    title: 'Visit or talk to us',
    text: 'Have a question or want to see materials in person? Call, WhatsApp or drop by our office.',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=G-12+Express+Green+Plaza+Sector-1+Vaishali+Ghaziabad',
  },
  seo: {
    title: 'About Urbane Living | Interior Design & False Ceiling Company in Delhi NCR',
    description:
      'Urbane Living is an interior design and false ceiling company in Delhi NCR. Free 3D design, itemised quotes, branded materials and one team from design to installation.',
    path: '/about',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583833/ChatGPT_Image_May_12_2026_02_40_56_PM_zkd6ex.png`,
  },
};