// SEO for pages that do not set their own (used in App.js with <Seo />).
// noindex: true keeps private tools and the 404 page out of Google.
export const pageSeo = {
  support: {
    title: 'Customer Support & Help Center | Urbane Living',
    description: 'Get help with your Urbane Living interior or false ceiling project. Call, WhatsApp or email our support team, see office hours and quick answers to common questions.',
    path: '/support',
  },
  shipping: {
    title: 'Shipping & Delivery Policy | Urbane Living',
    description: 'How Urbane Living delivers and installs furniture, modular kitchens, wardrobes and ceiling materials across Delhi NCR: timelines, costs and site delivery process.',
    path: '/shipping',
  },
  estimate: { title: 'Estimate | Urbane Living', path: '/estimate', noindex: true },
  adminLogin: { title: 'Admin Login | Urbane Living', path: '/admin-login', noindex: true },
  adminDashboard: { title: 'Admin Dashboard | Urbane Living', path: '/admin-dashboard', noindex: true },
  notFound: {
    title: 'Page not found | Urbane Living',
    description: 'The page you are looking for does not exist. Explore our interior design and false ceiling services instead.',
    path: '/404',
    noindex: true,
  },
};