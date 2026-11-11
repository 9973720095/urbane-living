import React from 'react';
import { CheckCircleFilled, ArrowRightOutlined } from '@ant-design/icons';
import { estimator } from '../../data/siteData';
import { ceilingTypes } from '../../data/ceilingGuide';
import SectionHeading from '../SectionHeading';

// False Ceiling page: the 4 ceiling types with "from" price (taken from the estimator rates)
const CeilingTypes = ({ onOpenForm }) => {
  const rateOf = (name) => estimator.materials.find((m) => m.name === name)?.rate;

  return (
    <section aria-labelledby="types-title" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          id="types-title"
          eyebrow={ceilingTypes.eyebrow}
          title={ceilingTypes.title}
          highlight={ceilingTypes.highlight}
          subtitle={ceilingTypes.subtitle}
        />

        {/* phones: swipe sideways; tablet / desktop: grid */}
        <ul className="-mx-4 m-0 flex list-none snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {ceilingTypes.items.map((t) => {
            const rate = rateOf(t.material);
            return (
              <li key={t.title} className="relative flex w-[82%] shrink-0 snap-center flex-col rounded-2xl border border-solid border-gray-100 bg-white p-5 shadow-card sm:w-auto">
                {t.tag && (
                  <span className="absolute right-4 top-4 rounded-full bg-brand-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-navy">
                    {t.tag}
                  </span>
                )}
                <h3 className="m-0 pr-24 text-[17px] font-semibold text-brand-navy">{t.title}</h3>
                {rate && (
                  <p className="m-0 mt-2 text-[14px] text-gray-500">
                    From <span className="text-[22px] font-bold text-brand-red">₹{rate}</span>/sq. ft.
                  </p>
                )}
                <p className="m-0 mt-2 text-[13px] text-gray-500">
                  <span className="font-semibold text-brand-navy">Best for:</span> {t.bestFor}
                </p>
                <ul className="m-0 mt-3 flex list-none flex-col gap-1.5 p-0">
                  {t.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[14px] text-gray-600">
                      <CheckCircleFilled className="mt-1 text-[13px] text-emerald-500" /> {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <button
                    type="button"
                    onClick={() => typeof onOpenForm === 'function' && onOpenForm()}
                    className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-0 bg-brand-navy text-[14px] font-semibold text-white transition hover:bg-brand-ink"
                  >
                    Get {t.title.replace(' False Ceiling', '')} quote <ArrowRightOutlined />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="m-0 mt-4 text-center text-[12.5px] text-gray-500 sm:mt-5 sm:text-[13px]">{ceilingTypes.note}</p>
      </div>
    </section>
  );
};

export default CeilingTypes;