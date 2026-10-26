// Contact page (/contact). Phone, WhatsApp, email and address come from common.js -> contact.
import { cdn } from './config';

export const contactPage = {
  banner: {
    eyebrow: 'Contact Urbane Living',
    title: "Let's design your",
    highlight: 'dream home',
    subtitle: 'Call, WhatsApp or send us your details. A designer will get back to you to plan a free site visit.',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_35_05_PM_tolwlu.png`,
    imageAlt: 'Designer living room by Urbane Living',
    whatsappMessage: 'Hi Urbane Living, I want to discuss my home interior project.',
    height: 'sm',
    align: 'center',
  },
  form: {
    title: 'Send us your details',
    subtitle: 'Tell us a little about your home. We will call you back to plan a free consultation.',
    button: 'Request a Call Back',
    success: 'Thank you! Your details have been received. Our designer will contact you soon.',
    services: ['Full Home Interior', 'False Ceiling', 'Modular Kitchen', 'Wardrobe', 'Living Room', 'Bedroom', 'Other'],
  },
  cards: {
    callTitle: 'Call us',
    whatsappTitle: 'WhatsApp',
    whatsappText: 'Chat with a designer',
    emailTitle: 'Email',
    officeTitle: 'Office',
  },
  areas: {
    title: 'Areas we serve',
    subtitle: 'We take up projects across Delhi NCR.',
    items: ['Delhi', 'Noida', 'Greater Noida', 'Ghaziabad', 'Gurgaon', 'Faridabad'],
  },
  map: {
    title: 'Find our office',
    // Google Maps embed of the office address (no API key needed)
    embed: 'https://maps.google.com/maps?q=G-12%20Express%20Green%20Plaza%2C%20Sector-1%2C%20Vaishali%2C%20Ghaziabad&z=15&output=embed',
    link: 'https://www.google.com/maps/search/?api=1&query=G-12+Express+Green+Plaza+Sector-1+Vaishali+Ghaziabad',
  },
  seo: {
    title: 'Contact Urbane Living | Interior Designers & False Ceiling Experts in Delhi NCR',
    description:
      'Contact Urbane Living for interior design and false ceiling work in Delhi, Noida, Ghaziabad, Gurgaon and Faridabad. Call, WhatsApp or request a free consultation.',
    path: '/contact',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_35_05_PM_tolwlu.png`,
  },
};