// Terms & Conditions page (/terms). Edit the text here; layout is in components/LegalPage.jsx.
// Your signed quote/agreement for a project always takes priority over these general terms.

export const termsPage = {
  title: 'Terms & Conditions',
  intro: 'Please read these terms carefully before using our website or booking our interior design and false ceiling services.',
  updated: '26 October 2026',
  email: 'sales1@urbaneliving.in', // questions about these terms; phone comes from common.js -> contact
  lead: 'These terms apply to urbaneliving.in and to all services provided by Urbane Living. By using our website or booking our services, you agree to these terms. For each project, the quote and agreement you approve also apply, and they take priority if anything differs.',
  highlights: [
    { title: 'Written quote', text: 'Every item and cost listed before work starts' },
    { title: 'Design approval first', text: 'Work begins only after you approve the 3D design' },
    { title: 'No hidden charges', text: 'Any extra work is added only with your approval' },
  ],
  sections: [
    {
      id: 'website-use',
      title: 'Using our website',
      points: [
        { label: 'Information only', text: 'Designs, prices, timelines and other content on this website are for general information and inspiration. They are not an offer or a binding quote.' },
        { label: 'Fair use', text: 'Please do not misuse the website, submit false details in our forms, or try to harm or disrupt it.' },
        { label: 'Accuracy', text: 'We try to keep everything correct and up to date, but colours, finishes and images on screen may look slightly different in real life.' },
      ],
    },
    {
      id: 'consultation',
      title: 'Consultation & estimates',
      paragraphs: [
        'Online estimates, calculator results and early price ranges are for initial planning only and are not a binding contract. The final price is confirmed in a written quote after our designer visits your site and takes measurements.',
      ],
    },
    {
      id: 'quote-agreement',
      title: 'Quotes & project agreement',
      points: [
        { label: 'Itemised quote', text: 'Your quote lists the scope of work, materials, finishes and cost of each item.' },
        { label: 'Validity', text: 'A quote is valid for the period written on it. Material prices may change after that.' },
        { label: 'Confirmation', text: 'A project is confirmed when you approve the quote and pay the booking amount mentioned in it.' },
      ],
    },
    {
      id: 'design-changes',
      title: 'Design approval & changes',
      paragraphs: [
        'We share a 3D design for your approval before production. Production starts only after you approve it in writing (email or WhatsApp is fine).',
        'Changes requested after approval or after production has started may add cost and time. We will tell you the extra cost and get your approval before making them.',
      ],
    },
    {
      id: 'payments',
      title: 'Payments',
      points: [
        { label: 'Payment schedule', text: 'Payments are made in stages, as written in your quote or agreement.' },
        { label: 'On time', text: 'Work moves to the next stage once the payment for the current stage is received.' },
        { label: 'Receipts', text: 'You get a receipt or invoice for every payment you make.' },
      ],
      note: 'Pay only to the official bank account or payment link shared by Urbane Living, and confirm with our team if you are unsure.',
    },
    {
      id: 'timeline',
      title: 'Project timeline',
      paragraphs: [
        'Your quote includes an estimated timeline. Timelines may change because of material availability, design changes, delays in payment, site readiness, society or building rules, or events outside our control such as weather or strikes. We will keep you updated if anything affects your timeline.',
      ],
    },
    {
      id: 'site-readiness',
      title: 'Site access & your responsibilities',
      points: [
        { label: 'Access', text: 'Please give our team access to the site during agreed working hours.' },
        { label: 'Ready site', text: 'Civil, plumbing and electrical work that is not in our scope should be completed as agreed before our installation starts.' },
        { label: 'Permissions', text: 'Any society, building or authority permissions needed for the work are the owner\'s responsibility, unless agreed otherwise.' },
        { label: 'Power & water', text: 'Electricity and water should be available at the site during work.' },
      ],
    },
    {
      id: 'materials',
      title: 'Materials & finishes',
      paragraphs: [
        'We use the materials and brands named in your quote. If a material is not available, we will suggest an equal or better option and use it only after your approval.',
        'Natural materials such as wood, stone and veneer can have small differences in colour and grain. Minor differences between samples, images and the final product are normal and are not considered a defect.',
      ],
    },
    {
      id: 'warranty',
      title: 'Warranty',
      paragraphs: [
        'Warranty on our work is as written in your quote or warranty card. It covers manufacturing and installation defects.',
        'It does not cover normal wear and tear, misuse, water leakage or seepage from the building, changes or repairs done by others, or damage from accidents or natural events.',
      ],
    },
    {
      id: 'cancellation',
      title: 'Cancellation & refunds',
      paragraphs: [
        'If you cancel a confirmed project, any refund depends on the work already done and the materials already ordered or made for you. Full details are in our Refund Policy.',
      ],
      link: { to: '/refund', label: 'Read our Refund Policy' },
    },
    {
      id: 'intellectual-property',
      title: 'Designs & intellectual property',
      paragraphs: [
        'All designs, drawings, 3D renders, photos and content created by Urbane Living, on this website or for your project, remain our property unless agreed otherwise in writing. You may use them for your own home, but please do not share them with other vendors to build from or reuse them commercially.',
        'We may use photos of completed projects (without your personal details) on our website and social media. Tell us if you would prefer we did not.',
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      paragraphs: [
        'We take care in every project, but Urbane Living is not responsible for indirect or consequential losses. Our total responsibility for any claim related to a project is limited to the amount you paid us for that project.',
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing law',
      paragraphs: [
        'These terms are governed by the laws of India. We will always try to resolve any concern by talking with you first. If a dispute cannot be resolved, it will be handled by the courts of Ghaziabad, Uttar Pradesh.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      paragraphs: [
        'We may update these terms from time to time. The latest version will always be on this page, with the date at the top. Projects already confirmed follow the terms in their approved quote or agreement.',
      ],
    },
  ],
  contactTitle: 'Contact us',
  contactText: 'Questions about these terms or your project? Reach out to our team:',
  seo: {
    title: 'Terms & Conditions | Urbane Living',
    description:
      'Terms and conditions for using urbaneliving.in and booking Urbane Living interior design and false ceiling services: quotes, design approval, payments, timelines and warranty.',
    path: '/terms',
  },
};