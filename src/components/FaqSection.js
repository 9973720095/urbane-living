import React, { useEffect, useMemo, useState } from 'react';
import { PlusOutlined, SearchOutlined, PhoneFilled, WhatsAppOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { homeFaq, contact } from '../data/siteData';

const allItems = homeFaq.groups.flatMap((g) => g.items.map((item) => ({ ...item, group: g.key })));

// Home page FAQ: topic tabs, search, accordion and a "talk to a designer" card
const FaqSection = ({ onOpenForm }) => {
  const [tab, setTab] = useState(homeFaq.groups[0].key);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(0);

  const search = query.trim().toLowerCase();
  const items = useMemo(
    () => (search
      ? allItems.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(search))
      : allItems.filter((i) => i.group === tab)),
    [search, tab],
  );

  // FAQ structured data for Google (all questions, not just the open tab)
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allItems.map((i) => ({
        '@type': 'Question',
        name: i.q,
        acceptedAnswer: { '@type': 'Answer', text: i.a },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const chooseTab = (key) => {
    setTab(key);
    setQuery('');
    setOpen(0);
  };

  return (
    <section aria-labelledby="faq-title" className="bg-brand-soft px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-[720px] text-center lg:mb-10">
          <span className="mb-3 inline-block rounded-full bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-red">
            {homeFaq.tag}
          </span>
          <h2 id="faq-title" className="m-0 text-[26px] font-semibold leading-tight text-brand-navy sm:text-[36px] lg:text-[40px]">
            {homeFaq.title} <span className="text-brand-red">{homeFaq.highlight}</span>
          </h2>
          <p className="m-0 mt-3 text-[15px] text-gray-500 sm:text-base">{homeFaq.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
          <div>
            {/* Search */}
            <label className="mb-4 flex h-12 items-center gap-3 rounded-full border border-solid border-gray-200 bg-white px-5 shadow-card focus-within:border-brand-blue">
              <SearchOutlined className="text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOpen(0); }}
                placeholder="Search: cost, warranty, timeline…"
                aria-label="Search questions"
                className="h-full w-full border-0 bg-transparent text-[15px] text-brand-navy outline-none placeholder:text-gray-400"
              />
            </label>

            {/* Topic tabs (scroll sideways on mobile) */}
            {!search && (
              <div role="tablist" aria-label="FAQ topics" className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
                {homeFaq.groups.map((g) => {
                  const active = g.key === tab;
                  return (
                    <button
                      key={g.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => chooseTab(g.key)}
                      className={`shrink-0 cursor-pointer rounded-full border border-solid px-4 py-2 text-sm font-medium transition ${
                        active
                          ? 'border-brand-navy bg-brand-navy text-white'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-brand-navy hover:text-brand-navy'
                      }`}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Accordion */}
            {items.length === 0 ? (
              <p className="m-0 rounded-2xl bg-white px-6 py-10 text-center text-gray-500 shadow-card">
                No matching question. Ask our designer directly using the buttons alongside.
              </p>
            ) : (
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {items.map((item, i) => {
                  const isOpen = open === i;
                  const id = `faq-${item.group}-${i}`;
                  return (
                    <li
                      key={item.q}
                      className={`overflow-hidden rounded-2xl border border-solid bg-white transition ${
                        isOpen ? 'border-brand-blue/30 shadow-card' : 'border-gray-100'
                      }`}
                    >
                      <h3 className="m-0">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={id}
                          onClick={() => setOpen(isOpen ? -1 : i)}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-5 py-4 text-left text-[15px] font-semibold text-brand-navy sm:px-6 sm:py-5 sm:text-base"
                        >
                          <span>{item.q}</span>
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm transition duration-300 ${
                              isOpen ? 'rotate-45 bg-brand-red text-white' : 'bg-brand-soft text-brand-red'
                            }`}
                          >
                            <PlusOutlined />
                          </span>
                        </button>
                      </h3>
                      <div
                        id={id}
                        role="region"
                        className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                      >
                        <div className="overflow-hidden">
                          <p className="m-0 px-5 pb-5 text-[15px] leading-relaxed text-gray-600 sm:px-6">{item.a}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Talk to a designer */}
          <aside className="h-fit rounded-3xl bg-brand-navy p-6 text-white sm:p-8 lg:sticky lg:top-24">
            <h3 className="m-0 text-xl font-semibold sm:text-2xl">{homeFaq.helpTitle}</h3>
            <p className="m-0 mt-2 text-sm leading-relaxed text-white/70">{homeFaq.helpText}</p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => typeof onOpenForm === 'function' && onOpenForm()}
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-6 text-sm font-semibold text-white shadow-cta transition hover:bg-brand-red-dark"
              >
                Book Free Consultation <ArrowRightOutlined />
              </button>
              <a
                href={`${contact.whatsappHref}?text=${encodeURIComponent('Hi Urbane Living, I have a question about my home interiors.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white no-underline transition hover:brightness-95"
              >
                <WhatsAppOutlined /> Ask on WhatsApp
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-solid border-white/30 px-6 text-sm font-semibold text-white no-underline transition hover:bg-white hover:text-brand-navy"
              >
                <PhoneFilled /> Call Us
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;