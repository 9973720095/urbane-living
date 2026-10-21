import React, { useState } from 'react';
import {
  ClockCircleFilled,
  SafetyCertificateFilled,
  LockFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  MinusCircleFilled,
  ArrowRightOutlined,
  ExperimentFilled,
} from '@ant-design/icons';
import { ceilingEdge } from '../../data/siteData';

const icons = {
  clock: <ClockCircleFilled />,
  shield: <SafetyCertificateFilled />,
  lock: <LockFilled />,
  safety: <ExperimentFilled />,
};

const tones = {
  good: { icon: <CheckCircleFilled className="text-emerald-500" />, text: 'text-brand-navy font-semibold' },
  mid: { icon: <MinusCircleFilled className="text-amber-400" />, text: 'text-gray-600' },
  bad: { icon: <CloseCircleFilled className="text-gray-300" />, text: 'text-gray-500' },
};

const Cell = ({ value: [label, tone] }) => (
  <span className="inline-flex items-start gap-2">
    <span className="mt-0.5 shrink-0">{tones[tone].icon}</span>
    <span className={tones[tone].text}>{label}</span>
  </span>
);

// "Why Urbane Living" section: promises, comparison table and an interactive ceiling anatomy
const CeilingEdge = ({ onOpenForm }) => {
  const { promises, compare, anatomy } = ceilingEdge;
  const [layer, setLayer] = useState(1); // start on "Joint Tape" - where most ceilings fail
  const active = anatomy.layers[layer];

  return (
    <section aria-labelledby="edge-title" className="relative overflow-hidden bg-brand-ink px-4 py-14 text-white sm:px-6 lg:py-20">
      {/* soft brand glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-brand-red/20 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-brand-blue/25 blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-[760px] text-center lg:mb-14">
          <span className="mb-4 inline-block rounded-full border border-solid border-white/15 bg-white/5 px-3.5 py-1 text-[11px] font-semibold tracking-[0.18em] text-brand-gold">
            {ceilingEdge.tag}
          </span>
          <h2 id="edge-title" className="m-0 text-[28px] font-semibold leading-tight sm:text-[38px] lg:text-[44px]">
            {ceilingEdge.title}{' '}
            <span className="text-brand-gold">{ceilingEdge.highlight}</span>
          </h2>
          <p className="m-0 mt-4 text-[15px] leading-relaxed text-white/70 sm:text-lg">{ceilingEdge.subtitle}</p>
        </div>

        {/* 1. Promises */}
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <li key={p.title} className="rounded-2xl border border-solid border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-brand-gold/40 hover:bg-white/[0.07]">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red text-xl text-white shadow-cta">
                {icons[p.icon]}
              </span>
              <h3 className="m-0 text-base font-semibold">{p.title}</h3>
              <p className="m-0 mt-1.5 text-sm leading-relaxed text-white/65">{p.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
          {/* 2. Comparison */}
          <div className="rounded-3xl bg-white p-5 text-brand-navy sm:p-7">
            <h3 className="m-0 mb-5 text-xl font-semibold sm:text-2xl">{compare.title}</h3>

            {/* Table (tablet / desktop) */}
            <div className="hidden overflow-hidden rounded-2xl border border-solid border-gray-100 sm:block">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="bg-gray-50 p-3.5 font-medium text-gray-500">Feature</th>
                    {compare.columns.map((c, i) => (
                      <th key={c} scope="col" className={`p-3.5 font-semibold ${i === 0 ? 'bg-brand-red text-white' : 'bg-gray-50 text-gray-600'}`}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compare.rows.map((row) => (
                    <tr key={row.feature} className="border-0 border-t border-solid border-gray-100">
                      <th scope="row" className="p-3.5 font-medium text-gray-700">{row.feature}</th>
                      {row.values.map((v, i) => (
                        <td key={i} className={`p-3.5 align-top ${i === 0 ? 'bg-brand-red/[0.04]' : ''}`}>
                          <Cell value={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards (mobile): Urbane vs the usual local contractor */}
            <ul className="m-0 flex list-none flex-col gap-3 p-0 sm:hidden">
              {compare.rows.map((row) => (
                <li key={row.feature} className="rounded-2xl border border-solid border-gray-100 p-4">
                  <p className="m-0 mb-2.5 text-xs font-semibold uppercase tracking-wider text-gray-400">{row.feature}</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between gap-3 rounded-lg bg-brand-red/[0.05] px-3 py-2">
                      <span className="font-semibold text-brand-red">{compare.columns[0]}</span>
                      <Cell value={row.values[0]} />
                    </div>
                    <div className="flex justify-between gap-3 px-3">
                      <span className="text-gray-500">{compare.columns[1]}</span>
                      <Cell value={row.values[1]} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="m-0 mt-4 text-[11px] leading-relaxed text-gray-400">{compare.note}</p>
          </div>

          {/* 3. Ceiling anatomy (interactive) */}
          <div className="flex flex-col rounded-3xl border border-solid border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:p-7">
            <h3 className="m-0 text-xl font-semibold sm:text-2xl">{anatomy.title}</h3>
            <p className="m-0 mt-1.5 text-sm text-white/60">{anatomy.subtitle}</p>

            {/* stacked layers, the selected one lifts and glows */}
            <div className="mt-6 flex flex-col gap-1.5" role="tablist" aria-label="Ceiling layers">
              {anatomy.layers.map((l, i) => {
                const on = i === layer;
                return (
                  <button
                    key={l.name}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="layer-detail"
                    onClick={() => setLayer(i)}
                    style={{ marginLeft: `${i * 6}px`, marginRight: `${(anatomy.layers.length - 1 - i) * 6}px` }}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border border-solid px-4 py-2.5 text-left text-sm transition ${
                      on
                        ? 'border-brand-gold bg-brand-gold text-brand-ink shadow-[0_10px_30px_rgba(255,184,0,0.25)]'
                        : 'border-white/10 bg-white/[0.06] text-white/80 hover:bg-white/[0.12]'
                    }`}
                  >
                    <span className="font-semibold">{l.name}</span>
                    <span className={`text-[11px] ${on ? 'text-brand-ink/70' : 'text-white/40'}`}>Layer {i + 1}</span>
                  </button>
                );
              })}
            </div>

            <div id="layer-detail" role="tabpanel" aria-live="polite" className="mt-5 flex-1 rounded-2xl bg-white/[0.06] p-5">
              <p className="m-0 text-[11px] font-semibold uppercase tracking-wider text-brand-gold">What we use</p>
              <p className="m-0 mt-1 text-[15px] font-medium">{active.spec}</p>
              <p className="m-0 mt-4 text-[11px] font-semibold uppercase tracking-wider text-brand-gold">Why it matters</p>
              <p className="m-0 mt-1 text-sm leading-relaxed text-white/70">{active.why}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => typeof onOpenForm === 'function' && onOpenForm()}
            className="inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-8 text-[15px] font-semibold text-white shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-red-dark"
          >
            {ceilingEdge.cta} <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CeilingEdge;