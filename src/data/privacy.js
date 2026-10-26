// Privacy Policy page (/privacy). Edit the text here; layout is in components/LegalPage.jsx.
// Keep it true to how the website really works, and change `updated` whenever you edit it.

export const privacyPage = {
  title: 'Privacy Policy',
  intro: 'At Urbane Living, your privacy matters to us. This policy explains what information we collect when you visit urbaneliving.in or use our services, how we use it and how we keep it safe.',
  updated: '26 October 2026',
  email: 'sales1@urbaneliving.in', // privacy questions go here; phone comes from common.js -> contact
  lead: 'This policy applies to urbaneliving.in and to the services Urbane Living provides. By using our website, you agree to this policy.',
  sections: [
    {
      id: 'information-we-collect',
      title: 'Information we collect',
      text: 'When you use our website or talk to our team, we may collect:',
      points: [
        { label: 'Details you share with us', text: 'Your name, mobile number, email, state, property type and any message you send through our enquiry, estimate or contact forms.' },
        { label: 'Project details', text: 'Your address, room measurements, photos and design preferences, when you book a site visit or ask for a quote.' },
        { label: 'Usage information', text: 'Basic technical data such as your browser, device and the pages you visit, which helps us understand how the site is used.' },
        { label: 'Cookies', text: 'Small files stored by your browser that keep the site working smoothly and help us improve it. You can block or delete cookies in your browser settings.' },
      ],
    },
    {
      id: 'how-we-use',
      title: 'How we use your information',
      text: 'We use your information only to serve you better:',
      points: [
        { label: 'Reply to your enquiry', text: 'Call, WhatsApp or email you about the service you asked for and plan a free consultation.' },
        { label: 'Design and deliver your project', text: 'Prepare your 3D design and quote, and carry out production and installation.' },
        { label: 'Customer support', text: 'Answer questions, handle service requests and follow up after handover.' },
        { label: 'Updates and offers (only if you agree)', text: 'Send design ideas or offers. You can ask us to stop at any time.' },
        { label: 'Improve our website', text: 'Understand which pages are useful and fix what is not working.' },
      ],
    },
    {
      id: 'sharing',
      title: 'Sharing your information',
      paragraphs: [
        'We do not sell, trade or rent your personal information to anyone.',
        'We share it only when needed to deliver your project, for example with our own installation team, material suppliers or delivery partners, and only the details they need for the job. We may also share information if the law requires it.',
      ],
    },
    {
      id: 'data-protection',
      title: 'How we protect your data',
      text: 'We take reasonable steps to keep your information safe:',
      points: [
        { label: 'Secure connection', text: 'Our website uses HTTPS (SSL), so data you send through our forms is encrypted on the way.' },
        { label: 'Limited access', text: 'Only authorised team members can view enquiries, and they use them only for work.' },
      ],
      note: 'No website is 100% secure, but we work to protect your information and fix any issue quickly.',
    },
    {
      id: 'third-party',
      title: 'Third-party links and services',
      paragraphs: [
        'Our website links to services such as WhatsApp, Google Maps, YouTube, Instagram and Facebook. When you open them, their own privacy policies apply. Urbane Living is not responsible for how those websites handle your data.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      text: 'You can contact us at any time to:',
      points: [
        { label: 'See your data', text: 'Ask what personal information we hold about you.' },
        { label: 'Correct or delete it', text: 'Ask us to update wrong details or delete your information.' },
        { label: 'Stop marketing messages', text: 'Tell us you do not want offers or updates, and we will stop.' },
      ],
    },
    {
      id: 'data-retention',
      title: 'How long we keep your data',
      paragraphs: [
        'We keep your information only as long as needed to serve you, support your project after handover, and meet legal, tax or accounting rules. After that, we delete it or keep it in a form that no longer identifies you.',
      ],
    },
    {
      id: 'children',
      title: "Children's privacy",
      paragraphs: [
        'Our services are meant for adults. We do not knowingly collect personal information from children under 18.',
      ],
    },
    {
      id: 'updates',
      title: 'Changes to this policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time. The latest version will always be on this page, with the date it was last updated at the top.',
      ],
    },
  ],
  contactTitle: 'Contact us',
  contactText: 'Questions about this Privacy Policy or your data? Reach out to our team:',
  seo: {
    title: 'Privacy Policy | Urbane Living',
    description:
      'Read how Urbane Living collects, uses and protects the personal information you share on urbaneliving.in, and how you can ask us to update or delete it.',
    path: '/privacy',
  },
};