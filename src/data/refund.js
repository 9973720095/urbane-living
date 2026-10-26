// Refund & Cancellation Policy page (/refund). Edit the text here; layout is in components/LegalPage.jsx.
// Your approved quote/agreement for a project always takes priority over this general policy.

export const refundPage = {
  title: 'Refund & Cancellation Policy',
  intro: 'We want you to be happy with your home. This policy explains how cancellations, refunds and replacements work for our interior design and false ceiling projects.',
  updated: '26 October 2026',
  email: 'sales1@urbaneliving.in', // refund questions go here; phone comes from common.js -> contact
  lead: 'Most of our work is custom-made to your measurements and design, so refunds depend on how far your project has progressed. If your approved quote or agreement says something different, the quote or agreement applies.',
  highlights: [
    { title: 'Free consultation', text: 'No charge to talk to us or get a site visit' },
    { title: 'Clear deductions', text: 'Only work done and materials ordered are deducted' },
    { title: 'Refund in 5-7 days', text: 'Business days after your refund is approved' },
  ],
  sections: [
    {
      id: 'consultation',
      title: 'Consultation & quotes',
      paragraphs: [
        'Talking to us, the site visit and your first quote are free. You can decide not to go ahead at that stage without paying anything.',
      ],
    },
    {
      id: 'cancellation',
      title: 'Cancelling a confirmed project',
      text: 'Please tell us as soon as possible by email, phone or WhatsApp. What you get back depends on the stage of your project:',
      points: [
        { label: 'Before design work starts', text: 'Your booking amount is refunded, minus any charges written in your quote.' },
        { label: 'After design work, before production', text: 'Design and planning charges for the work already done are deducted, and the rest of your payment is refunded.' },
        { label: 'After production or material ordering has started', text: 'The cost of materials already ordered and work already done (cut boards, made shutters, custom fittings) is deducted. Anything left over is refunded.' },
        { label: 'After installation', text: 'Installed work is made to fit your home and cannot be cancelled or returned. Any issue is handled under your warranty.' },
      ],
      note: 'Before we process any cancellation, we share a written breakup of the work done and amounts deducted, so you know exactly how your refund is calculated.',
    },
    {
      id: 'non-refundable',
      title: 'What cannot be refunded',
      points: [
        { label: 'Custom-made items', text: 'Furniture, cabinets, shutters and ceilings made to your design and size, once production has started.' },
        { label: 'Special-order materials', text: 'Materials, fittings or finishes ordered specially for your project that the supplier will not take back.' },
        { label: 'Completed work', text: 'Design, site and installation work already completed.' },
      ],
    },
    {
      id: 'defects',
      title: 'Defects, damage & replacements',
      paragraphs: [
        'If anything we supply or install is defective or damaged when it reaches you, tell us within 7 days of delivery or installation, with photos if possible. We will inspect it and repair or replace it at no extra cost.',
        'After that, defects are covered as per the warranty in your quote or warranty card.',
      ],
    },
    {
      id: 'ready-products',
      title: 'Ready-made products',
      paragraphs: [
        'For ready-made items we supply (not made to your design), you can request a return within 7 days of delivery if the item is unused, in its original condition and in its original packaging. Clearance or sale items cannot be returned.',
      ],
    },
    {
      id: 'refund-process',
      title: 'How refunds are paid',
      points: [
        { label: 'Approval', text: 'We confirm your refund amount in writing after checking the work done and materials ordered.' },
        { label: 'Timeline', text: 'Approved refunds are processed within 5-7 business days.' },
        { label: 'Payment method', text: 'Refunds go back to the original payment method, or to a bank account in the name of the person who paid.' },
      ],
    },
    {
      id: 'late-refunds',
      title: 'Late or missing refunds',
      text: 'If you have not received your refund within the stated time:',
      points: [
        { label: 'Check your account', text: 'Look at your bank account or card statement again.' },
        { label: 'Ask your bank', text: 'Banks and card companies sometimes take a few extra days to show a refund.' },
        { label: 'Contact us', text: 'If it still has not arrived, email or call us and we will check it with you.' },
      ],
    },
    {
      id: 'terms',
      title: 'Related terms',
      paragraphs: [
        'This policy is part of our Terms & Conditions, which cover quotes, payments, timelines and warranty.',
      ],
      link: { to: '/terms', label: 'Read our Terms & Conditions' },
    },
  ],
  contactTitle: 'Contact us',
  contactText: 'To cancel a project, report a defect or ask about a refund, reach out to our team:',
  seo: {
    title: 'Refund & Cancellation Policy | Urbane Living',
    description:
      'How cancellations, refunds and replacements work for Urbane Living interior design and false ceiling projects in Delhi NCR, including refund timelines and what is non-refundable.',
    path: '/refund',
  },
};