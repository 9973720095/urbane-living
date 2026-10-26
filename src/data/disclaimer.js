// Disclaimer page (/disclaimer). Edit the text here; layout is in components/LegalPage.jsx.

export const disclaimerPage = {
  title: 'Disclaimer',
  intro: 'Please read this disclaimer to understand how the information, designs and prices on our website should be used.',
  updated: '26 October 2026',
  email: 'sales1@urbaneliving.in', // questions about this page; phone comes from common.js -> contact
  lead: 'The content on urbaneliving.in is shared by Urbane Living for general information and design inspiration. By using this website, you accept this disclaimer.',
  highlights: [
    { title: 'For inspiration', text: 'Website designs are ideas, not a final offer' },
    { title: 'Prices are estimates', text: 'Final cost comes in your written quote' },
    { title: 'Your quote decides', text: 'Scope, materials and warranty are as quoted' },
  ],
  sections: [
    {
      id: 'general-information',
      title: 'General information',
      paragraphs: [
        'We try to keep everything on this website accurate and up to date, but we do not guarantee that all content is complete, current or free of errors. Information may change without notice.',
      ],
    },
    {
      id: 'designs-images',
      title: 'Designs & images',
      points: [
        { label: 'Inspiration', text: 'Designs, 3D renders and photos show ideas and past work. Your final design is made for your own space and may look different.' },
        { label: 'Colours & finishes', text: 'Colours, textures and finishes can look different on different screens and in different lighting. Please check physical samples before you decide.' },
        { label: 'Representative images', text: 'Some images are 3D renders or representative pictures used to explain a style or product.' },
      ],
    },
    {
      id: 'prices-estimates',
      title: 'Prices, estimates & calculators',
      paragraphs: [
        'Prices, price ranges, the cost estimator and the false ceiling calculator give an approximate idea only. The actual cost depends on your site measurements, design, materials, finishes and fittings, and is confirmed only in a written quote after a site visit.',
      ],
    },
    {
      id: 'timelines-claims',
      title: 'Timelines, warranty & offers',
      paragraphs: [
        'Timelines, warranty details and offers mentioned on the website are general. The timeline, warranty and price that apply to your project are the ones written in your approved quote or agreement. Offers may have their own conditions and end dates.',
      ],
    },
    {
      id: 'professional-advice',
      title: 'Not professional advice',
      paragraphs: [
        'Blog articles, tips and FAQs are for general guidance. They are not a substitute for a site inspection or advice from a qualified architect, structural engineer or electrician. Please do not make structural or electrical changes based only on website content.',
      ],
    },
    {
      id: 'reviews',
      title: 'Reviews & testimonials',
      paragraphs: [
        'Reviews and testimonials share the experience of individual customers. Every home and project is different, so your results may vary.',
      ],
    },
    {
      id: 'brands',
      title: 'Brand names & trademarks',
      paragraphs: [
        'Brand names of materials, fittings and appliances mentioned on this website belong to their owners. Mentioning them does not mean those brands endorse Urbane Living.',
      ],
    },
    {
      id: 'external-links',
      title: 'External links',
      paragraphs: [
        'Our website links to other websites such as WhatsApp, Google Maps, YouTube, Instagram and Facebook. We do not control them and are not responsible for their content, availability or privacy practices.',
      ],
      link: { to: '/privacy', label: 'Read our Privacy Policy' },
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      paragraphs: [
        'Urbane Living is not responsible for any loss or damage caused by relying only on the information on this website. Your project is governed by your approved quote, agreement and our Terms & Conditions.',
      ],
      link: { to: '/terms', label: 'Read our Terms & Conditions' },
    },
  ],
  contactTitle: 'Contact us',
  contactText: 'Found something on the website that looks wrong, or have a question? Reach out to our team:',
  seo: {
    title: 'Disclaimer | Urbane Living',
    description:
      'Disclaimer for urbaneliving.in: designs, images, prices and estimates on the Urbane Living website are for general information and inspiration. Your final quote decides cost and scope.',
    path: '/disclaimer',
  },
};