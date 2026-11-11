// False Ceiling page: extra SEO sections (types & prices, cities, FAQ).
// Prices come from the estimator in falseCeiling.js, so they always match.
// Only write what is true for your work - customers and Google both read this.

export const ceilingTypes = {
  eyebrow: 'TYPES & PRICES',
  title: 'Which false ceiling is',
  highlight: 'right for your room?',
  subtitle: 'Every type has its place. Here is where each one works best, so you can choose with confidence.',
  // material = name in estimator.materials (price is picked from there)
  items: [
    {
      material: 'Premium Gypsum',
      title: 'Gypsum False Ceiling',
      bestFor: 'Living rooms, bedrooms, offices',
      points: ['Smooth, seamless finish', 'Quick and clean to install', 'Fire-resistant and light'],
      tag: 'Most popular',
    },
    {
      material: 'Standard POP',
      title: 'POP False Ceiling',
      bestFor: 'Curved and detailed designs',
      points: ['Custom shapes and mouldings', 'Classic, handcrafted look', 'Good for repairs and add-ons'],
    },
    {
      material: 'PVC Panel',
      title: 'PVC False Ceiling',
      bestFor: 'Bathrooms, balconies, kitchens',
      points: ['Moisture and termite resistant', 'Easy to clean', 'Ready-made panel finishes'],
    },
    {
      material: 'Luxe Wooden',
      title: 'Wooden False Ceiling',
      bestFor: 'Living rooms, dining, statement areas',
      points: ['Warm, premium look', 'Pairs well with cove lights', 'Panels, slats or full wood'],
    },
  ],
  note: 'Final price depends on your design, area and lighting. You get an itemised quote after a free site visit.',
};

export const ceilingCities = {
  eyebrow: 'AREAS WE SERVE',
  title: 'False ceiling in',
  highlight: 'your city',
  subtitle: 'Our site team installs false ceilings across Delhi NCR. Pick your city for local details.',
};

export const ceilingFaq = {
  eyebrow: 'FALSE CEILING FAQs',
  title: 'Questions people ask',
  highlight: 'before they start',
  items: [
    {
      q: 'What is the false ceiling cost per sq. ft. in Delhi NCR?',
      a: 'With Urbane Living, false ceilings start from ₹120 per sq. ft. Gypsum and POP start at ₹120, PVC at about ₹200 and wooden at about ₹210 per sq. ft. Lights, design levels and site conditions change the final price, so you get an itemised quote after a free site visit.',
    },
    {
      q: 'How long does false ceiling work take?',
      a: 'A typical false ceiling of up to about 1,000 sq. ft. is ready in around 7 days after the design is approved: framing, board fixing, then jointing, putty and paint. Larger areas take a little longer, and the timeline is written in your quote.',
    },
    {
      q: 'Gypsum or POP: which false ceiling is better?',
      a: 'For most homes gypsum is the better choice. It is faster to install, cleaner on site, lighter and less likely to crack. POP is useful for very detailed curved designs and mouldings.',
    },
    {
      q: 'Do you give a warranty on false ceiling work?',
      a: 'Yes. Our false ceilings come with a 10-year anti-crack warranty on board joints and framing, written in your quote.',
    },
    {
      q: 'Can a false ceiling be installed in a bathroom or kitchen?',
      a: 'Yes. We use moisture-resistant gypsum boards or PVC panels in wet areas like bathrooms and kitchens, so the ceiling does not sag or get damaged by steam.',
    },
    {
      q: 'Will a false ceiling make my room look smaller?',
      a: 'Not when it is planned well. We keep the drop to only what the lights and wiring need, and use cove lighting and peripheral designs that make the room feel taller and brighter.',
    },
    {
      q: 'Do you plan the lights along with the ceiling?',
      a: 'Yes. Cove lights, profile lights and spotlights are planned in the 3D design together with the ceiling, so wiring and cut-outs are done in one go and nothing has to be broken later.',
    },
    {
      q: 'Is the design and site visit free?',
      a: 'Yes. The consultation, site visit and 3D design are free. Work starts only after you approve the design and the quote.',
    },
  ],
};