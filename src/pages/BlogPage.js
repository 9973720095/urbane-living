import React, { useState, useEffect, useMemo } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PageBanner from '../components/PageBanner';
import ClientReviews from '../components/ClientReviews';
import useSeo from '../hooks/useSeo';
import { API_BASE_URL, blogPage, siteUrl } from '../data/siteData';

const pageSize = 6; // 6 cards ke baad pagination aayega

const formatDate = (date) => (date ? new Date(date).toLocaleDateString('en-GB') : '');

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // SEO: page meta + Blog / Breadcrumb structured data (blog list from the API)
  const schema = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: blogPage.seo.title,
      url: `${siteUrl}${blogPage.seo.path}`,
      blogPost: blogs.slice(0, 20).map((blog) => ({
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.description,
        image: blog.image,
        datePublished: blog.createdAt,
        author: { '@type': 'Person', name: blog.author || 'Urbane Living' },
        url: `${siteUrl}/blog/${blog._id}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}${blogPage.seo.path}` },
      ],
    },
  ], [blogs]);
  useSeo({ ...blogPage.seo, schema });

  // Pagination Change Handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById('blog-list')?.scrollIntoView({ behavior: 'smooth' }); // Banner ke niche scroll karega
  };

  // Logic to slice blogs for current page
  const indexOfLastBlog = currentPage * pageSize;
  const indexOfFirstBlog = indexOfLastBlog - pageSize;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="bg-[#fdfdfd]">
      <PageBanner {...blogPage.banner} />

      <section id="blog-list" aria-labelledby="blog-list-title" className="scroll-mt-20 px-4 pb-16 pt-8 sm:px-6 lg:px-[8%] lg:pt-12">
        <div className="mx-auto max-w-[1300px]">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm">
            <ol className="m-0 flex list-none items-center gap-2 p-0 text-gray-500">
              <li><Link to="/" className="text-gray-500 no-underline hover:text-brand-red">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-brand-navy">Blog</li>
            </ol>
          </nav>

          <h2 id="blog-list-title" className="m-0 mb-8 text-[24px] font-semibold text-brand-navy sm:text-[30px]">
            {blogPage.listTitle}
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" aria-busy="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[420px] animate-pulse rounded-2xl bg-white shadow-card" />
              ))}
            </div>
          ) : currentBlogs.length === 0 ? (
            <p className="m-0 rounded-2xl bg-white px-6 py-12 text-center text-gray-500 shadow-card">
              New articles are coming soon.
            </p>
          ) : (
            <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {currentBlogs.map((blog) => (
                <li key={blog._id}>
                  <Link to={`/blog/${blog._id}`} className="group block h-full no-underline">
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition duration-500 group-hover:-translate-y-2 group-hover:shadow-card-hover">
                      <div className="relative h-[210px] overflow-hidden sm:h-[230px] lg:h-[250px]">
                        <img
                          src={blog.image || "https://via.placeholder.com/400x250"}
                          alt={blog.title}
                          loading="lazy"
                          className="block h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        <span className="absolute left-4 top-4 rounded-md bg-brand-red px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-cta">
                          {blog.category || 'Interior Design'}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="m-0 mb-2.5 line-clamp-2 min-h-[2.6em] text-lg font-semibold leading-snug text-brand-navy transition group-hover:text-brand-red sm:text-xl">
                          {blog.title}
                        </h3>
                        <p className="m-0 line-clamp-3 min-h-[4.5em] flex-1 text-sm leading-relaxed text-gray-500">
                          {blog.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between border-0 border-t border-solid border-gray-100 pt-4">
                          <span className="flex items-center gap-2 text-[13px] font-semibold text-gray-700">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">UL</span>
                            Urbane Living
                          </span>
                          <time dateTime={blog.createdAt} className="text-xs text-gray-400">{formatDate(blog.createdAt)}</time>
                        </div>
                      </div>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination Section Center Mein */}
          {blogs.length > pageSize && (
            <nav aria-label="Blog pages" className="mt-12 flex justify-center">
              <Pagination
                current={currentPage}
                total={blogs.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </nav>
          )}
        </div>
      </section>

      <ClientReviews />
    </div>
  );
};

export default BlogPage;