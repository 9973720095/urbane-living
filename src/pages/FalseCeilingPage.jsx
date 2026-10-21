import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Pagination } from "antd";
import CostEstimator from "../components/FalseCeiling/CostEstimator";
import PageBanner from "../components/PageBanner";
import useSeo from "../hooks/useSeo";
import { API_BASE_URL, banners, designFilters, seo } from "../data/siteData";
import CeilingEdge from "../components/FalseCeiling/CeilingEdge";

const { Option } = Select;

export default function FalseCeilingPage({ onOpenForm }) {
  useSeo(seo.falseCeiling);

  // STATES
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", style: "" });
  const [budget, setBudget] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Responsive PageSize Logic
  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      if (width < 576) setPageSize(2);      // Mobile: 2 cards
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
        setDesigns(res.data);
      } catch (err) {
        console.log("Error fetching designs:", err);
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

  // Pagination Slicing
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = visibleDesigns.slice(indexOfFirstItem, indexOfLastItem);

  const selectClass = "!h-12 w-full sm:!w-[200px]";

  return (
    <div className="false-ceiling-page">
      {/* HERO BANNER (content lives in siteData.js -> banners.falseCeiling) */}
      <PageBanner
        {...banners.falseCeiling}
        primary={{ label: 'Get Free Design', onClick: onOpenForm }}
      />

      <CostEstimator onOpenForm={onOpenForm} />
      {/* DESIGNS */}
      <section aria-labelledby="designs-title" className="bg-brand-soft px-4 py-12 sm:px-5 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="designs-title" className="m-0 mb-6 text-center text-[26px] font-semibold text-brand-navy sm:text-[34px]">
            {designFilters.title}
          </h2>

          {/* Filters */}
          <div className="mx-auto mb-8 flex max-w-[720px] flex-col gap-3 rounded-2xl bg-white p-4 shadow-card sm:flex-row sm:justify-center sm:p-5">
            <Select
              placeholder="Room Type"
              aria-label="Room type"
              className={selectClass}
              onChange={(v) => setFilters(p => ({...p, category: v}))}
            >
              {designFilters.rooms.map((o) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
            </Select>
            <Select
              value={budget}
              aria-label="Budget"
              className={selectClass}
              onChange={handleBudgetChange}
            >
              {designFilters.budgets.map((o) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
            </Select>
            <Select
              placeholder="Style"
              aria-label="Style"
              className={selectClass}
              onChange={(v) => setFilters(p => ({...p, style: v}))}
            >
              {designFilters.styles.map((o) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
            </Select>
          </div>

          {/* Cards */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-4 sm:gap-6" aria-busy="true">
              {Array.from({ length: pageSize }).map((_, i) => (
                <div key={i} className="h-[280px] animate-pulse rounded-2xl bg-white shadow-card" />
              ))}
            </div>
          ) : currentItems.length === 0 ? (
            <p className="m-0 rounded-2xl bg-white px-6 py-12 text-center text-gray-500 shadow-card">
              No designs found for this filter. Try another room type, budget or style, or{' '}
              <button type="button" onClick={onOpenForm} className="cursor-pointer border-0 bg-transparent p-0 font-semibold text-brand-red underline">
                ask our designer
              </button>.
            </p>
          ) : (
            <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 min-[420px]:grid-cols-2 md:grid-cols-4 sm:gap-6">
              {currentItems.map((item) => (
                <li key={item._id || item.id}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
                    <div className="h-[170px] overflow-hidden sm:h-[200px]">
                      <img
                        src={item.image}
                        alt={`${item.title} - false ceiling design by Urbane Living`}
                        loading="lazy"
                        className="block h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-3 sm:p-4">
                      <h3 className="m-0 truncate text-sm font-semibold text-brand-navy sm:text-[15px]">{item.title}</h3>
                      <p className="m-0 mb-3 mt-1 text-sm font-semibold text-brand-blue">₹{item.price}/sqft</p>
                      <button
                        type="button"
                        onClick={onOpenForm}
                        className="mt-auto h-10 w-full cursor-pointer rounded-lg border-0 bg-brand-red text-sm font-semibold text-white transition hover:bg-brand-red-dark"
                      >
                        Get Quote
                      </button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination Logic */}
          {visibleDesigns.length > pageSize && (
            <nav aria-label="Design pages" className="mt-8 flex justify-center">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={visibleDesigns.length}
                onChange={(page) => setCurrentPage(page)}
                simple={pageSize === 2}
                showSizeChanger={false}
              />
            </nav>
          )}
        </div>
      </section>
      <CeilingEdge onOpenForm={onOpenForm} /> 
    </div>
  );
}