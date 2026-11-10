// Shared on every page: brand, contact details, social links, nav, footer, form options.
import { cdn } from './config';

export const brand = {
  name: 'Urbane Living',
  tagline: 'Where Design Finds Its Home',
  logo: `${cdn}/image/upload/q_auto/f_auto/v1777899675/UrbaneLiving_Logo_6_1_dfh2r1.png`,
  logoIcon: `${cdn}/image/upload/q_auto/f_auto/v1778232393/urbane-logo-transparent-icon-removebg-preview_jepdln.png`,
  modalImage: `${cdn}/image/upload/q_auto/f_auto/v1778563293/urbaneLiving_l2vjuj.png`,
};

export const contact = {
  phoneDisplay: '1800-123-6407',
  phoneHref: 'tel:18001236407', // toll-free number: dial without +91
  whatsappHref: 'https://wa.me/919105052454',
  whatsappText: 'Hi Urbane Living, I want a free design consultation for my home.',
  email: 'urbanelivingofficial@gmail.com',
  address: 'G-12 Express Green Plaza, Sector-1, Vaishali, Ghaziabad',
};

export const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/urbaneliving.in', hover: 'hover:bg-[#1877f2]' },
  { name: 'YouTube', href: 'https://www.youtube.com/@urbaneliving-ncr', hover: 'hover:bg-[#ff0000]' },
  { name: 'X', href: 'https://x.com/UrbaneLiving001', hover: 'hover:bg-black' },
  { name: 'Instagram', href: 'https://www.instagram.com/urbaneliving.in', hover: 'hover:bg-[#E1306C]' },
];

export const navLinks = {
  services: [
    { label: 'Bedroom Design', to: '/bedroom' },
    { label: 'Living Hall', to: '/living-hall' },
    { label: 'Modular Kitchen', to: '/kitchen' },
    { label: 'Wardrobe Design', to: '/wardrobe' },
  ],
};

// Mobile "app" bar at the bottom of every page (phones only).
// icon = key in components/MobileBottomNav.jsx. action: 'form' opens the free consultation form,
// 'designs' opens the design grid (same list as the home page "End-to-end interior solutions"),
// 'more' opens the menu sheet. The middle item is the big round button.
export const mobileNav = {
  items: [
    { label: 'Home', icon: 'home', to: '/' },
    { label: 'Designs', icon: 'designs', action: 'designs' },
    { label: 'Free Consult', icon: 'consult', action: 'form', center: true, badge: 'Free' },
    { label: 'Vastu', icon: 'vastu', to: '/vastu' },
    { label: 'More', icon: 'more', action: 'more' },
  ],
  // Links inside the "More" sheet
  more: [
    { label: 'Modular Kitchen', to: '/kitchen' },
    { label: 'Wardrobe Design', to: '/wardrobe' },
    { label: 'Bedroom Design', to: '/bedroom' },
    { label: 'Living Hall', to: '/living-hall' },
    { label: 'False Ceiling', to: '/false-ceiling' },
    { label: 'Areas We Serve', to: '/interior-designers' },
    { label: 'Blog', to: '/blogs' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
};

export const highlights = [
  { key: 'design', text: 'Personalised designs', icon: 'https://spaceinterio.co.in/wp-content/uploads/2024/07/Personalised-designs-e1720440694404.png' },
  { key: 'warranty', text: '10-year warranty¹', icon: 'https://spaceinterio.co.in/wp-content/uploads/2024/07/Personalised-designs-5-e1720442786627.png' },
  { key: 'pricing', text: 'Transparent pricing', icon: 'https://spaceinterio.co.in/wp-content/uploads/2024/07/Personalised-designs-6-e1720443121163.png' },
];

export const countryCodes = [
  { code: '+91', iso: 'in', name: 'India' },
  { code: '+971', iso: 'ae', name: 'UAE' },
  { code: '+1', iso: 'us', name: 'USA / Canada' },
  { code: '+44', iso: 'gb', name: 'UK' },
  { code: '+61', iso: 'au', name: 'Australia' },
  { code: '+65', iso: 'sg', name: 'Singapore' },
  { code: '+966', iso: 'sa', name: 'Saudi Arabia' },
  { code: '+974', iso: 'qa', name: 'Qatar' },
  { code: '+968', iso: 'om', name: 'Oman' },
  { code: '+965', iso: 'kw', name: 'Kuwait' },
  { code: '+977', iso: 'np', name: 'Nepal' },
];

export const inquiryOptions = {
  // Cities we work in (lead forms); "Other" lets anyone outside these still send a request
  serviceAreas: ['Ghaziabad', 'Noida', 'Greater Noida', 'Delhi', 'Faridabad', 'Gurgaon', 'Other'],
  states: ['Delhi', 'Bihar', 'UP'],
  propertyTypes: ['Residential', 'Commercial'],
};

export const footer = {
  ctaTitle: 'Want quick assistance? Just give us a call!',
  ctaText: 'Message us on WhatsApp or call directly for premium home design services.',
  columns: [
    { title: 'Company', links: [{ label: 'About Us', to: '/about' }, { label: 'Contact', to: '/contact' }, { label: 'Blogs', to: '/blogs' }, { label: 'Vastu Score', to: '/vastu' }] },
    { title: 'Services', links: [{ label: 'False Ceiling', to: '/false-ceiling' }, { label: 'Modular Kitchen', to: '/kitchen' }, { label: 'Wardrobe', to: '/wardrobe' }, { label: 'Bedroom Interiors', to: '/bedroom' }] },
    { title: 'Legal', newTab: true, links: [{ label: 'Privacy Policy', to: '/privacy' }, { label: 'Terms & Conditions', to: '/terms' }, { label: 'Refund Policy', to: '/refund' }, { label: 'Disclaimer', to: '/disclaimer' }] },
  ],
};