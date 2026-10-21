import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftOutlined, ArrowRightOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import PageBanner from '../components/PageBanner';
import useSeo from '../hooks/useSeo';
import { API_BASE_URL, siteUrl, brand } from '../data/siteData';

// Default Image if blog.image is empty
const fallbackImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";

// YouTube / Vimeo / Google Drive / .mp4 link -> playable URL ('' if it is not a video link)
const videoUrl = (link) => {
  const url = (link || '').trim().replace(/&amp;/g, '&');
  const yt = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  const drive = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]{20,})/i);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;
  if (/^https?:\/\/\S+\.(mp4|webm|ogg|mov)(\?\S*)?$/i.test(url)) return url;
  return '';
};

const playerHtml = (link) => {
  const src = videoUrl(link);
  if (!src) return '';
  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(src)) {
    return `<video src="${src}" controls playsinline preload="metadata"></video>`;
  }
  return `<div class="blog-video"><iframe src="${src}" title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
};

/*
  Makes videos in the article playable, also for blogs added from the admin panel:
  - a video link alone in a paragraph / line / <a> becomes a player
  - YouTube watch / Drive "view" links inside an <iframe> are switched to their embed player
*/
const prepareContent = (html = '') =>
  html
    .replace(/<p[^>]*>\s*(?:<a[^>]*>)?\s*(https?:\/\/[^\s<"]+)\s*(?:<\/a>)?\s*<\/p>/gi, (m, link) => playerHtml(link) || m)
    .replace(/^[ \t]*(https?:\/\/\S+)[ \t]*$/gm, (m, link) => playerHtml(link) || m)
    .replace(/<iframe([^>]*?)src="([^"]+)"/gi, (m, attrs, src) => {
      const embed = videoUrl(src);
      return embed && !/\.(mp4|webm|ogg|mov)(\?|$)/i.test(embed) ? `<iframe${attrs}src="${embed}"` : m;
    });

// Article typography (headings, lists, images, videos) for the HTML that comes from the sheet / admin
const contentClass = [
  'text-[16px] leading-[1.9] text-gray-600 sm:text-[17px]',
  '[&_p]:my-5',
  '[&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:text-brand-navy sm:[&_h2]:text-[28px]',
  '[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:text-brand-navy sm:[&_h3]:text-[22px]',
  '[&_h4]:mb-2 [&_h4]:mt-6 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-brand-navy',
  '[&_a]:font-medium [&_a]:text-brand-blue [&_a]:underline',
  '[&_strong]:font-semibold [&_strong]:text-brand-navy [&_b]:font-semibold [&_b]:text-brand-navy',
  '[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5 [&_li]:pl-1',
  '[&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl',
  '[&_blockquote]:my-6 [&_blockquote]:rounded-r-xl [&_blockquote]:border-0 [&_blockquote]:border-l-4 [&_blockquote]:border-solid [&_blockquote]:border-brand-red [&_blockquote]:bg-brand-soft [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic',
  '[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-solid [&_td]:border-gray-200 [&_td]:p-2.5 [&_th]:border [&_th]:border-solid [&_th]:border-gray-200 [&_th]:bg-brand-soft [&_th]:p-2.5 [&_th]:text-left',
  // videos: always full width and 16:9, on every screen
  '[&_.blog-video]:relative [&_.blog-video]:my-8 [&_.blog-video]:aspect-video [&_.blog-video]:w-full [&_.blog-video]:overflow-hidden [&_.blog-video]:rounded-xl [&_.blog-video]:bg-black [&_.blog-video]:!p-0',
  '[&_iframe]:my-8 [&_iframe]:block [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:rounded-xl [&_iframe]:border-0',
  '[&_.blog-video_iframe]:!absolute [&_.blog-video_iframe]:inset-0 [&_.blog-video_iframe]:!m-0 [&_.blog-video_iframe]:!h-full',
  '[&_video]:my-8 [&_video]:block [&_video]:max-h-[80vh] [&_video]:w-full [&_video]:rounded-xl [&_video]:bg-black',
].join(' ');

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

const BlogDetails = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blog details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [id]);

  const blog = blogs.find((b) => b._id === id);
  const related = blogs.filter((b) => b._id !== id).slice(0, 3);
  const displayImage = blog?.image || fallbackImage;
  const content = useMemo(() => prepareContent(blog?.content), [blog?.content]);

  // SEO: title, description, canonical + BlogPosting / Breadcrumb structured data
  const path = `/blog/${id}`;
  const schema = useMemo(() => (blog ? [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.description,
      image: displayImage,
      datePublished: blog.createdAt,
      author: { '@type': 'Person', name: blog.author || brand.name },
      publisher: { '@type': 'Organization', name: brand.name, logo: { '@type': 'ImageObject', url: brand.logo } },
      mainEntityOfPage: `${siteUrl}${path}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blogs` },
        { '@type': 'ListItem', position: 3, name: blog.title, item: `${siteUrl}${path}` },
      ],
    },
  ] : undefined), [blog, displayImage, path]);

  useSeo(blog ? {
    title: `${blog.title} | ${brand.name} Blog`,
    description: blog.description,
    path,
    image: displayImage,
    schema,
  } : {});

  if (loading) {
    return (
      <div className="bg-white" aria-busy="true">
        <div className="h-[360px] animate-pulse bg-brand-navy/80 sm:h-[440px]" />
        <div className="mx-auto max-w-[820px] space-y-4 px-5 py-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 animate-pulse rounded bg-gray-100" style={{ width: `${95 - i * 7}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="m-0 text-2xl font-semibold text-brand-navy">Blog Not Found</h1>
        <p className="m-0 mt-2 text-gray-500">This article may have been moved or removed.</p>
        <Link to="/blogs" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white no-underline">
          <ArrowLeftOutlined /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pb-16">
      {/* --- 1. BANNER SECTION --- */}
      <PageBanner
        title={blog.title}
        subtitle={blog.description}
        eyebrow={blog.category}
        image={displayImage}
        imageAlt={blog.title}
        height="md"
        showWhatsApp={false}
      />

      {/* --- 2. BREADCRUMB & CONTENT SECTION --- */}
      <div className="mx-auto max-w-[860px] px-5 pt-8 sm:px-6 lg:pt-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-gray-500">
            <li><Link to="/" className="text-gray-500 no-underline hover:text-brand-red">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/blogs" className="text-gray-500 no-underline hover:text-brand-red">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="line-clamp-1 font-medium text-brand-navy">{blog.title}</li>
          </ol>
        </nav>

        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-0 border-b border-solid border-gray-100 pb-6 text-sm text-gray-500">
          <span className="inline-flex items-center gap-2"><UserOutlined className="text-brand-red" /> {blog.author || brand.name}</span>
          {blog.createdAt && (
            <time dateTime={blog.createdAt} className="inline-flex items-center gap-2">
              <CalendarOutlined className="text-brand-red" /> {formatDate(blog.createdAt)}
            </time>
          )}
        </div>

        {/* --- 3. ARTICLE BODY --- */}
        <article className={contentClass} dangerouslySetInnerHTML={{ __html: content }} />

        {/* Footer CTA */}
        <aside className="mt-14 rounded-3xl bg-brand-navy px-6 py-10 text-center text-white sm:px-10 sm:py-12">
          <h2 className="m-0 text-[22px] font-semibold sm:text-[28px]">Want a similar design for your home?</h2>
          <p className="m-0 mx-auto mt-3 max-w-[520px] text-[15px] text-white/75 sm:text-base">
            Our experts at Urbane Living are just a call away from making your dream home a reality.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red px-8 text-sm font-semibold text-white no-underline shadow-cta transition hover:bg-brand-red-dark">
              GET FREE QUOTE <ArrowRightOutlined />
            </Link>
            <Link to="/blogs" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-solid border-white/40 px-8 text-sm font-semibold text-white no-underline transition hover:bg-white hover:text-brand-navy">
              <ArrowLeftOutlined /> BACK TO BLOGS
            </Link>
          </div>
        </aside>
      </div>

      {/* More articles (internal links help SEO) */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mx-auto mt-16 max-w-[1200px] px-5 sm:px-6">
          <h2 id="related-title" className="m-0 mb-6 text-[22px] font-semibold text-brand-navy sm:text-[26px]">More Articles</h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item._id}>
                <Link to={`/blog/${item._id}`} className="group block h-full no-underline">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition group-hover:-translate-y-1 group-hover:shadow-card-hover">
                    <div className="h-[180px] overflow-hidden">
                      <img src={item.image || fallbackImage} alt={item.title} loading="lazy" className="block h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <h3 className="m-0 line-clamp-2 text-base font-semibold text-brand-navy group-hover:text-brand-red">{item.title}</h3>
                      <p className="m-0 mt-2 line-clamp-2 text-sm text-gray-500">{item.description}</p>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default BlogDetails;