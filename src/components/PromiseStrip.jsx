import React from 'react';
import { BgColorsOutlined, SafetyCertificateOutlined, TagOutlined } from '@ant-design/icons';

// Our 3 promises, shown in one row right below the hero (edit text here)
const promises = [
  { icon: <BgColorsOutlined />, title: 'Personalised designs', text: 'Made for your space and budget', tone: 'bg-red-50 text-brand-red' },
  { icon: <SafetyCertificateOutlined />, title: '10-year warranty¹', text: 'Peace of mind, terms apply', tone: 'bg-blue-50 text-brand-blue' },
  { icon: <TagOutlined />, title: 'Transparent pricing', text: 'Clear quote, no hidden costs', tone: 'bg-amber-50 text-amber-600' },
];

export default function PromiseStrip() {
  return (
    <section aria-label="Why Urbane Living" className="bg-white px-3 py-5 sm:px-6 sm:py-8">
      <ul className="m-0 mx-auto grid max-w-[1100px] list-none grid-cols-3 rounded-2xl border border-solid border-gray-100 bg-white p-0 shadow-card">
        {promises.map((p, i) => (
          <li
            key={p.title}
            className={`flex flex-col items-center gap-2 px-1.5 py-4 text-center sm:flex-row sm:gap-4 sm:px-6 sm:py-5 sm:text-left ${
              i ? 'border-0 border-l border-solid border-gray-100' : ''
            }`}
          >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg sm:h-12 sm:w-12 sm:text-xl ${p.tone}`}>
              {p.icon}
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold leading-tight text-brand-navy sm:text-base">{p.title}</span>
              <span className="mt-0.5 hidden text-sm text-gray-500 sm:block">{p.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}