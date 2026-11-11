import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Select, Pagination } from "antd";
import CostEstimator from "../components/FalseCeiling/CostEstimator";
import CeilingEdge from "../components/FalseCeiling/CeilingEdge";
import CeilingTypes from "../components/FalseCeiling/CeilingTypes";
import CeilingCities from "../components/FalseCeiling/CeilingCities";
import CeilingFaq from "../components/FalseCeiling/CeilingFaq";
import Hero from "../components/Hero";
import ProcessSection from "../components/ProcessSection";
import SpacesGrid from "../components/SpacesGrid";
import SectionHeading from "../components/SectionHeading";
import useSeo from "../hooks/useSeo";
import { API_BASE_URL, banners, designFilters, seo } from "../data/siteData";
import { ceilingFaq } from "../data/ceilingGuide";
import { localCities } from "../data/localSeo";

const { Option } = Select;

// /false-ceiling: every section reads its content from data files
// (falseCeiling.js, ceilingGuide.js, localSeo.js), so text/prices change in one place.
export default function FalseCeilingPage({ onOpenForm }) {
  // SEO: page schema + FAQ schema (same questions as on the page) + all cities we serve
  const pageSeo = useMemo(() => {
    const [service, ...rest] = seo.falseCeiling.schema;
    return {
      ...seo.falseCeiling,
      schema: [
        { ...service, areaServed: localCities.map((c) => ({ '@type': 'City', name: c.name })) },
        ...rest,
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: ceilingFaq.items.map((i) => ({
            '@type': 'Question',
            name: i.q,
            acceptedAnswer: { '@type': 'Answer', text: i.a },
          })),
        },
      ],
    };
  }, []);
  useSeo(pageSeo);

  // STATES
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", style: "" });
  const [budget, setBudget] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [hasAnyDesign, setHasAnyDesign] = useState(null); // null = still checking

  // Responsive page size
  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      if (width < 576) setPageSize(4);      // Mobile: 2 x 2 cards
      else if (width < 992) setPageSize(4); // Tablet: 4 cards
      else setPageSize(8);                  // Desktop: 8 cards
    };
    updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/designs`, { params: filters });
        const list = Array.isArray(res.data) ? res.data : [];
        setDesigns(list);
        if (!filters.category && !filters.style) setHasAnyDesign(list.length > 0);
      } catch (err) {
        console.log("Error fetching designs:", err);
        if (!filters.category && !filters.style) setHasAnyDesign(false);
      } finally {
        setLoading(false);
      }
    };
    fetchDesigns();
    setCurrentPage(1);
  }, [filters]);

  // Budget filter (price per sq. ft., ranges from siteData)
  const selectedBudget = designFilters.budgets.find((b) => b.value === budget);
  const visibleDesigns = designs.filter((item) => {
    if (!selectedBudget || selectedBudget.min === undefined) return true;
    const price = Number(item.price);
    if (Number.isNaN(price)) return false;
    return price >= selectedBudget.min && (selectedBudget.max === undefined || price <= selectedBudget.max);
  });

  const handleBudgetChange = (value) => {
    setBudget(value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * pageSize;
  const currentItems = visibleDesigns.slice(indexOfLastItem - pageSize, indexOfLastItem);

  const selectClass = "!h-12 w-full sm:!w-[200px]";

  return (
    <div className="false-ceiling-page">
      {/* 1. Hero: same banner + lead form as the home page (content: falseCeiling.js -> banners.falseCeiling) */}
      <Hero
        title={banners.falseCeiling.title}
        highlight={banners.falseCeiling.highlight}
        subTitle={banners.falseCeiling.heroSubtitle}
        media={banners.falseCeiling.image}
        mediaAlt={banners.falseCeiling.imageAlt}
        formTitle={banners.falseCeiling.formTitle}
        formSubtitle={banners.falseCeiling.formSubtitle}
        formBadge={banners.falseCeiling.formBadge}
        formName="False ceiling hero form"
      />

      {/* 2. Types + "from" prices */}
      <CeilingTypes onOpenForm={onOpenForm} />

      {/* 3. Cost estimator */}
      <CostEstimator onOpenForm={onOpenForm} />

      {/* 4. Design videos */}
      <div className="bg-white pb-10">
        <SpacesGrid onOpenForm={onOpenForm} />
      </div>

      {/* 5. Designs from the admin panel (hidden when there are none yet) */}
      {hasAnyDesign !== false && (
        <section aria-labelledby="designs-title" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading
              id="designs-title"
              eyebrow="DESIGN GALLERY"
              title={designFilters.title}
              subtitle="Filter by room, budget and style. Tap any design to get its quote."
            />

            {/* Filters */}
            <div className="mx-auto mb-8 grid max-w-[720px] grid-cols-2 gap-3 rounded-2xl bg-white p-4 shadow-card sm:flex sm:justify-center sm:p-5">
              <Select
                placeholder="Room Type"
                aria-label="Room type"
                allowClear
                className={selectClass}
                onChange={(v) => setFilters((p) => ({ ...p, category: v || "" }))}
              >
                {designFilters.rooms.map((o) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
              </Select>
              <Select
                placeholder="Style"
                aria-label="Style"
                allowClear
                className={selectClass}
                onChange={(v) => setFilters((p) => ({ ...p, style: v || "" }))}
              >
                {designFilters.styles.map((o) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
              </Select>
              <Select
                value={budget}
                aria-label="Budget"
                className={`${selectClass} col-span-2 sm:col-span-1`}
                onChange={handleBudgetChange}
              >
                {designFilters.budgets.map((o) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
              </Select>
            </div>

            {/* Cards */}
            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4" aria-busy="true">
                {Array.from({ length: pageSize }).map((_, i) => (
                  <div key={i} className="h-[230px] animate-pulse rounded-2xl bg-white shadow-card sm:h-[280px]" />
                ))}
              </div>
            ) : currentItems.length === 0 ? (
              <p className="m-0 rounded-2xl bg-white px-6 py-10 text-center text-gray-500 shadow-card">
                No designs found for this filter. Try another room type, budget or style, or{' '}
                <button type="button" onClick={onOpenForm} className="cursor-pointer border-0 bg-transparent p-0 font-semibold text-brand-red underline">
                  ask our designer
                </button>.
              </p>
            ) : (
              <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-6 md:grid-cols-4">
                {currentItems.map((item) => (
                  <li key={item._id || item.id}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={item.image}
                          alt={`${item.title} - false ceiling design by Urbane Living`}
                          loading="lazy"
                          decoding="async"
                          className="block h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-3 sm:p-4">
                        <h3 className="m-0 line-clamp-2 text-[13.5px] font-semibold leading-snug text-brand-navy sm:text-[15px]">{item.title}</h3>
                        {item.price && <p className="m-0 mb-3 mt-1 text-[13px] font-semibold text-brand-blue sm:text-sm">₹{item.price}/sqft</p>}
                        <button
                          type="button"
                          onClick={onOpenForm}
                          className="mt-auto h-10 w-full cursor-pointer rounded-lg border-0 bg-brand-red text-[13px] font-semibold text-white transition hover:bg-brand-red-dark sm:text-sm"
                        >
                          Get Quote
                        </button>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}

            {visibleDesigns.length > pageSize && (
              <nav aria-label="Design pages" className="mt-8 flex justify-center">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={visibleDesigns.length}
                  onChange={(page) => setCurrentPage(page)}
                  simple={pageSize <= 4}
                  showSizeChanger={false}
                />
              </nav>
            )}
          </div>
        </section>
      )}

      {/* 6. Why Urbane Living (promises, comparison, anatomy) */}
      <CeilingEdge onOpenForm={onOpenForm} />

      {/* 7. 7-day process */}
      <ProcessSection />

      {/* 8. City pages (local SEO) */}
      <CeilingCities />

      {/* 9. FAQ */}
      <CeilingFaq />
    </div>
  );
}