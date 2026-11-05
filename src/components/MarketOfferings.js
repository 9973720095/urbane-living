import React from 'react';
import {
  FormatPainterOutlined,
  BuildOutlined,
  ThunderboltOutlined,
  HighlightOutlined,
  AppstoreOutlined,
  LayoutOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

// Market offerings (edit here). tone = icon colour: blue | red | navy
const offeringsData = [
  { icon: <FormatPainterOutlined />, title: 'Gypsum Plastering', desc: 'High-quality smooth finish for internal walls.', tone: 'blue' },
  { icon: <BuildOutlined />, title: 'Performance Drywalls', desc: 'Advanced drywall systems for better insulation.', tone: 'red' },
  { icon: <ThunderboltOutlined />, title: 'Wet Area Drywalls', desc: 'Moisture resistant solutions for bathrooms.', tone: 'navy' },
  { icon: <LayoutOutlined />, title: 'False Ceilings', desc: 'Standard gypsum ceilings for home & office.', tone: 'blue' },
  { icon: <AppstoreOutlined />, title: 'Exterior Drywalls', desc: 'Weather resistant boards for external facades.', tone: 'red' },
  { icon: <HighlightOutlined />, title: 'Designer Ceilings', desc: 'Premium artistic designs for luxury spaces.', tone: 'navy' },
];

const TONES = {
  blue: 'bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white',
  red: 'bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white',
  navy: 'bg-brand-navy/10 text-brand-navy group-hover:bg-brand-navy group-hover:text-white',
};

// Phones: 2 cards per row. Tablet: 2, desktop: 3. Tapping a card opens the enquiry form.
const MarketOfferings = ({ onOpenForm }) => (
  <section aria-labelledby="offerings-title" className="offerings-section bg-brand-soft px-4 py-12 sm:px-6 lg:py-20">
    <div className="mx-auto max-w-[1200px]">
      {/* Header (same style as the other home sections) */}
      <div className="mx-auto mb-8 max-w-[720px] text-center lg:mb-10">
        <span className="mb-3 inline-block rounded-full bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-red">
          MARKET OFFERINGS
        </span>
        <h2 id="offerings-title" className="m-0 text-[26px] font-semibold leading-tight text-brand-navy sm:text-[36px] lg:text-[40px]">
          System solutions <span className="text-brand-red">for every need</span>
        </h2>
        <p className="m-0 mt-3 text-[15px] text-gray-500 sm:text-base">
          Walls, ceilings and drywall systems for homes and offices.
        </p>
      </div>

      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-3 lg:gap-6">
        {offeringsData.map((item) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => typeof onOpenForm === 'function' && onOpenForm()}
              aria-label={`${item.title}: get a free quote`}
              className="group flex h-full w-full cursor-pointer flex-col items-start rounded-2xl border border-solid border-gray-100 bg-white p-4 text-left shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-red/20 hover:shadow-card-hover sm:p-6 lg:flex-row lg:gap-5"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl transition duration-300 sm:h-14 sm:w-14 sm:text-2xl ${TONES[item.tone]}`}>
                {item.icon}
              </span>
              <span className="mt-3 flex min-w-0 flex-1 flex-col lg:mt-0">
                <span className="text-[14px] font-semibold leading-snug text-brand-navy sm:text-lg">{item.title}</span>
                <span className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">{item.desc}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-semibold text-brand-red sm:text-sm">
                  Get quote <ArrowRightOutlined className="transition group-hover:translate-x-1" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default MarketOfferings;