// Blog page: banner, SEO and client reviews text.
import { cdn } from './config';
import { slot, slotAlt } from './media';

const BLOG_BANNER = `${cdn}/image/upload/v1778246216/blog-banner-1-urbane-living_d7ru3y.jpg`;
const BLOG_BANNER_ALT = 'Modern interior design ideas by Urbane Living';

// Blog page: banner, SEO and client reviews section text
export const blogPage = {
  banner: {
    eyebrow: 'Interior Ideas & Expert Tips',
    title: 'Our',
    highlight: 'Blog',
    subtitle: 'Upgrade your home with modern renovation ideas and expert tips.',
    image: slot('blogPage.banner', BLOG_BANNER, 1400, 'Blog page › Top banner', { alt: BLOG_BANNER_ALT }),
    imageAlt: slotAlt('blogPage.banner', '', BLOG_BANNER_ALT),
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
    image: slot('blogPage.banner', BLOG_BANNER, 1400, 'Blog page › Top banner'),
  },
  reviews: {
    tag: 'Client Reviews',
    title: 'What Our Clients Say',
    subtitle: 'Real homes, real families across Delhi NCR.',
  },
};
