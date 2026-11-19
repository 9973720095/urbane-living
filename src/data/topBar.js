// Top bar above the navbar: a strip that keeps sliding right -> left.
// - icon: one of the keys in ICONS (components/TopBar.jsx)
// - tag (optional): small pill before the text, e.g. 'Free', 'New'
// - to (optional): makes the item a link
// Only write what is true. Add / remove items freely; the strip adjusts itself.
export const topBar = {
  phone: { label: '1800-123-6407', href: 'tel:18001236407' }, // toll-free number shown in the red button
  speed: 45, // seconds for one full loop (bigger = slower)
  items: [
    { icon: 'consult', tag: 'Free', text: 'Design consultation & site visit', to: '/contact' },
    { icon: 'ceiling', text: 'False ceiling in just 7 days*', to: '/false-ceiling' },
    { icon: 'cube', text: 'See your home in 3D before work starts', to: '/contact' },
    { icon: 'compass', tag: 'New', text: 'Check your home’s Vastu score', to: '/vastu' },
    { icon: 'kitchen', text: 'Modular kitchens, wardrobes & full home interiors', to: '/kitchen' },
    { icon: 'pin', text: 'Gurugram · Delhi · Noida · Ghaziabad · Faridabad', to: '/interior-designers' },
  ],
};