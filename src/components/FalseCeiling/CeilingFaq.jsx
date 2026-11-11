import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { ceilingFaq } from '../../data/ceilingGuide';
import SectionHeading from '../SectionHeading';

// False Ceiling page FAQ (the FAQPage schema is added by the page through useSeo)
const CeilingFaq = () => {
  const [open, setOpen] = useState(0);

  return (
    <section aria-labelledby="fc-faq-title" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[860px]">
        <SectionHeading
          id="fc-faq-title"
          eyebrow={ceilingFaq.eyebrow}
          title={ceilingFaq.title}
          highlight={ceilingFaq.highlight}
        />
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {ceilingFaq.items.map((item, i) => {
            const isOpen = open === i;
            const id = `fc-faq-${i}`;
            return (
              <li
                key={item.q}
                className={`overflow-hidden rounded-2xl border border-solid bg-white transition ${isOpen ? 'border-brand-blue/30 shadow-card' : 'border-gray-100'}`}
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
                <div id={id} role="region" className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="m-0 px-5 pb-5 text-[15px] leading-relaxed text-gray-600 sm:px-6">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default CeilingFaq;