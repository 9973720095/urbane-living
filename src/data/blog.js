// Blog page: banner, SEO and client reviews text.
import { cdn } from './config';

// Blog page: banner, SEO and client reviews section text
export const blogPage = {
  banner: {
    eyebrow: 'Interior Ideas & Expert Tips',
    title: 'Our',
    highlight: 'Blog',
    subtitle: 'Upgrade your home with modern renovation ideas and expert tips.',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778246216/blog-banner-1-urbane-living_d7ru3y.jpg`,
    imageAlt: 'Modern interior design ideas by Urbane Living',
    primary: { label: 'Explore False Ceiling', to: '/false-ceiling' },
    whatsappMessage: 'Hi Urbane Living, I read your blog and want a free design consultation.',
    height: 'md',
    align: 'center',
  },
  listTitle: 'Latest Articles',
  seo: {
    title: 'Interior Design & False Ceiling Blog | Ideas, Costs & Tips | Urbane Living',
    description:
      'Read expert interior design ideas, false ceiling designs, costs and home renovation tips for Delhi NCR homes from the Urbane Living team.',
    path: '/blogs',
    image: `${cdn}/image/upload/q_auto/f_auto/v1778246216/blog-banner-1-urbane-living_d7ru3y.jpg`,
  },
  reviews: {
    tag: 'Client Reviews',
    title: 'What Our Clients Say',
    subtitle: 'Real homes, real families across Delhi NCR.',
  },
};
