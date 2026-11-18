// False Ceiling page: banner, design filters, SEO, "Urbane Ceiling Standard". No prices are shown on the website.
import { slot, slotAlt } from './media';
import { highlights } from './common';

// Page banners: use with <PageBanner {...banners.falseCeiling} primary={...} />
export const banners = {
  falseCeiling: {
    eyebrow: 'False Ceiling Experts · Gurugram & Delhi NCR',
    title: 'Get Your False Ceiling done in',
    highlight: 'Just 7 Days*',
    image: slot('falseCeiling.banner', 'livingTvWall', 1400, 'False Ceiling page › Top banner'),
    imageAlt: slotAlt('falseCeiling.banner', 'livingTvWall'),
    whatsappMessage: 'Hi Urbane Living, I want a free false ceiling design quote.',
    align: 'right',
    highlights,
        // Hero (same design as the home page hero, with the lead form)
    heroSubtitle: 'Gypsum, POP, PVC and wooden false ceilings with lights planned in, installed by our own team.',
    formBadge: 'Free Site Visit & 3D Design',
    formTitle: 'Get Your False Ceiling Quote',
    formSubtitle: 'Share your details, our ceiling expert will call you back.',
  },
};

// False ceiling design gallery filters (values must match the backend)
export const designFilters = {
  title: 'Explore Our Designs',
  rooms: [
    { value: 'living', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'kitchen', label: 'Kitchen' },
  ],
  styles: [
    { value: 'modern', label: 'Modern' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'minimalist', label: 'Minimalist' },
  ],
};

// Per-page SEO (title, description, canonical path, structured data)
export const seo = {
  falseCeiling: {
    title: 'False Ceiling in Gurugram & Delhi NCR | Design & Installation | Urbane Living',
    description:
      'Gypsum, POP, PVC and wooden false ceilings installed in 7 days* in Gurugram (Gurgaon), Delhi, Noida, Ghaziabad and Faridabad. 10-year anti-crack warranty, itemised quote and a free 3D design.',
    path: '/false-ceiling',
    image: slot('falseCeiling.banner', 'livingTvWall', 1400, 'False Ceiling page › Top banner'),
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'False Ceiling Design & Installation',
        serviceType: 'False Ceiling Installation',
        provider: { '@type': 'HomeAndConstructionBusiness', name: 'Urbane Living', url: 'https://urbaneliving.in/' },
        areaServed: ['Gurugram', 'Delhi', 'Noida', 'Greater Noida', 'Ghaziabad', 'Faridabad'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://urbaneliving.in/' },
          { '@type': 'ListItem', position: 2, name: 'False Ceiling', item: 'https://urbaneliving.in/false-ceiling' },
        ],
      },
    ],
  },
};

// False Ceiling page: "Why Urbane Living" section (promises, comparison, ceiling anatomy).
// Only keep promises you can actually deliver - customers will hold you to them.
export const ceilingEdge = {
  tag: 'THE URBANE CEILING STANDARD',
  title: 'Not Just a Ceiling.',
  highlight: 'A Promise You Can Check.',
  subtitle:
    'Most contractors sell you a design. We show you exactly what goes inside your ceiling, lock the price before work starts and stand behind it for 10 years.',
  promises: [
    { icon: 'clock', title: 'Ready in 7 Days*', text: 'Fixed timeline written in your quote, with a daily site update on WhatsApp.' },
    { icon: 'shield', title: '10-Year Anti-Crack Warranty', text: 'Written warranty on board joints and framing, not just a verbal promise.' },
    { icon: 'lock', title: 'Price Locked at Booking', text: 'Itemised quote per sq. ft. No surprise bills for "extra material" later.' },
    { icon: 'safety', title: 'Branded Material Only', text: 'Branded gypsum boards and GI framing with purchase invoice shared with you.' },
  ],
  compare: {
    title: 'How We Compare',
    columns: ['Urbane Living', 'Local Contractor', 'Big Design Firms'],
    rows: [
      { feature: 'Quote', values: [['Itemised, locked at booking', 'good'], ['Verbal, often revised', 'bad'], ['Itemised', 'good']] },
      { feature: 'Installation time', values: [['7 days*', 'good'], ['No fixed date', 'bad'], ['30 – 45 days (full home)', 'mid']] },
      { feature: 'Written warranty', values: [['10 years, anti-crack', 'good'], ['Rarely given', 'bad'], ['Yes', 'good']] },
      { feature: 'Free 3D design before work', values: [['Yes', 'good'], ['No', 'bad'], ['Yes', 'good']] },
      { feature: 'Material brand & invoice shared', values: [['Yes', 'good'], ['No', 'bad'], ['Partly', 'mid']] },
      { feature: 'Dedicated site supervisor', values: [['Yes', 'good'], ['No', 'bad'], ['Yes', 'good']] },
      { feature: 'Dust-free cleanup after work', values: [['Included', 'good'], ['Extra / not done', 'bad'], ['Included', 'good']] },
    ],
    note: '*Typical timeline for up to 1,000 sq. ft. of ceiling after design approval. Comparison is based on common market practice in Gurugram and Delhi NCR.',
  },
  anatomy: {
    title: "What's Inside Your Ceiling",
    subtitle: 'Tap a layer to see what we use and why it matters. Ask any contractor for this list.',
    layers: [
      { name: 'Finish Paint', spec: 'Primer + 2 coats of premium emulsion', why: 'Smooth, even finish with no patchy joints showing under lights.' },
      { name: 'Joint Tape & Compound', spec: 'Paper joint tape + jointing compound, 3-coat finish', why: 'This is where cheap ceilings crack. Proper taping is what makes the 10-year warranty possible.' },
      { name: 'Gypsum Board', spec: '12.5 mm branded gypsum board (moisture-resistant in kitchens & bathrooms)', why: 'Fire-resistant, sound-dampening and sag-free. Thin or local boards bend in 2–3 years.' },
      { name: 'GI Framing', spec: 'Galvanised iron ceiling sections, perimeter channels & intermediate channels', why: 'Rust-free metal frame holds the board perfectly level for years.' },
      { name: 'Anchor Fasteners', spec: 'Steel anchor fasteners into the slab at fixed spacing', why: 'Keeps the whole ceiling locked to the roof slab so it never sags or shakes.' },
      { name: 'Wiring & Lights', spec: 'Concealed wiring in conduit, planned LED / cove / profile light points', why: 'Lights are planned with the design, so no loose wires or extra cutting later.' },
    ],
  },
  cta: 'Get a Free Site Visit & 3D Design',
};
