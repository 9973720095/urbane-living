import React, { useMemo, useState } from 'react';
import { Slider, InputNumber } from 'antd';
import {
  CalculatorOutlined,
  CheckCircleFilled,
  ThunderboltOutlined,
  WhatsAppOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { estimator, contact } from '../../data/siteData';

// False Ceiling page: the customer works out their own cost.
// Rates are never printed: only the customer's own estimate (as a range), after pressing "Calculate".
const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;
const round1000 = (n) => Math.max(1000, Math.round(n / 1000) * 1000);

const PhotoCard = ({ active, onClick, image, imageAlt, title, sub, role = 'radio' }) => (
  <button
    type="button"
    role={role}
    aria-checked={active}
    onClick={onClick}
    className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-solid bg-white p-0 text-left transition ${
      active ? 'border-brand-red shadow-card' : 'border-[#e2e8f0] hover:border-brand-red/40'
    }`}
  >
    <img
      src={image}
      alt={imageAlt}
      loading="lazy"
      decoding="async"
      width="480"
      height="300"
      className="block aspect-[16/10] h-auto w-full object-cover transition duration-500 group-hover:scale-105"
    />
    <span className="block px-2 py-2 sm:px-3 sm:py-2.5">
      <span className="block text-[12.5px] font-semibold leading-tight text-brand-navy sm:text-sm">{title}</span>
      <span className="mt-0.5 block text-[11px] leading-snug text-gray-600 sm:text-xs">{sub}</span>
    </span>
    {active && <CheckCircleFilled className="absolute right-1.5 top-1.5 rounded-full bg-white text-lg text-brand-red sm:right-2 sm:top-2 sm:text-xl" />}
  </button>
);

const CostEstimator = ({ onOpenForm }) => {
  const { materials, designTiers, roomPresets, lightRate, rangeSpread } = estimator;

  const [area, setArea] = useState(estimator.defaultArea);
  const [materialKey, setMaterialKey] = useState(materials[0].key);
  const [tierKey, setTierKey] = useState(designTiers[1].key);
  const [lightPoints, setLightPoints] = useState(estimator.defaultLightPoints);
  const [shown, setShown] = useState(false); // estimate appears only after "Calculate"

  const material = materials.find((m) => m.key === materialKey) || materials[0];
  const tier = designTiers.find((t) => t.key === tierKey) || designTiers[0];

  const result = useMemo(() => {
    const ceiling = (area || 0) * material.rate * tier.value;
    const lights = (lightPoints || 0) * lightRate;
    const total = ceiling + lights;
    return {
      low: round1000(total * (1 - rangeSpread)),
      high: round1000(total * (1 + rangeSpread)),
      ceilingShare: total ? Math.round((ceiling / total) * 100) : 0,
    };
  }, [area, material, tier, lightPoints, lightRate, rangeSpread]);

  const pickPreset = (p) => {
    setArea(p.area);
    setLightPoints(p.lights);
  };

  const summary = `${area} sq. ft. · ${material.name} · ${tier.label} · ${lightPoints} light points`;

  const handleWhatsApp = () => {
    const text = `Hi Urbane Living, I used the false ceiling cost estimator:\n• ${summary}\n• My estimate: ${inr(result.low)} – ${inr(result.high)}\nPlease share the exact quote and a free site visit.`;
    window.open(`${contact.whatsappHref}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const step = 'm-0 mb-3 block text-[15px] font-semibold text-brand-navy sm:text-base';

  return (
    <section id={estimator.id} aria-labelledby="estimator-title" className="scroll-mt-24 bg-white px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 text-center sm:mb-12">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold tracking-wider text-brand-red">
            <CalculatorOutlined /> {estimator.tag}
          </span>
          <h2 id="estimator-title" className="m-0 text-[26px] font-semibold leading-tight text-brand-navy sm:text-[36px] lg:text-[40px]">
            {estimator.title} <span className="text-brand-red">{estimator.highlight}</span>
          </h2>
          <p className="m-0 mx-auto mt-3 max-w-[620px] text-[15px] text-gray-600 sm:text-lg">{estimator.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,15fr)_minmax(0,9fr)] lg:items-start lg:gap-10">
          {/* Left: the customer's choices */}
          <div className="rounded-3xl border border-solid border-[#edf2f7] bg-brand-soft p-4 sm:p-8">
            {/* 1. Area */}
            <div className="mb-8">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <label htmlFor="estimator-area" className="text-[15px] font-semibold text-brand-navy sm:text-base">
                  1. Ceiling area (sq. ft.)
                </label>
                <InputNumber
                  id="estimator-area"
                  min={estimator.minArea}
                  max={estimator.maxArea}
                  value={area}
                  onChange={(v) => setArea(v || estimator.minArea)}
                  className="!w-[130px] !rounded-lg"
                  formatter={(v) => `${v} ft²`}
                  parser={(v) => (v || '').replace(/[^\d]/g, '')}
                />
              </div>
              <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {roomPresets.map((p) => {
                  const active = area === p.area;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => pickPreset(p)}
                      className={`cursor-pointer rounded-xl border-[1.5px] border-solid px-2 py-2 text-center transition ${
                        active ? 'border-brand-red bg-brand-red/5' : 'border-[#e2e8f0] bg-white hover:border-brand-red/40'
                      }`}
                    >
                      <span className="block text-[13px] font-semibold text-brand-navy">{p.label}</span>
                      <span className="block text-[11px] text-gray-600">{p.sub}</span>
                    </button>
                  );
                })}
              </div>
              <Slider
                min={estimator.minArea}
                max={estimator.sliderMax}
                step={10}
                value={Math.min(area, estimator.sliderMax)}
                onChange={setArea}
                ariaLabelForHandle="Ceiling area in square feet"
              />
              <p className="m-0 text-[12px] text-gray-600">Tip: room length × width = ceiling area. A 12 × 14 ft room is 168 sq. ft.</p>
            </div>

            {/* 2. Material */}
            <div className="mb-8">
              <span className={step}>2. Material</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3" role="radiogroup" aria-label="Material">
                {materials.map((m) => (
                  <PhotoCard
                    key={m.key}
                    active={materialKey === m.key}
                    onClick={() => setMaterialKey(m.key)}
                    image={m.image}
                    imageAlt={m.imageAlt}
                    title={m.name}
                    sub={m.note}
                  />
                ))}
              </div>
            </div>

            {/* 3. Design */}
            <div className="mb-8">
              <span className={step}>3. Design</span>
              <div className="grid grid-cols-3 gap-2 sm:gap-3" role="radiogroup" aria-label="Design">
                {designTiers.map((t) => (
                  <PhotoCard
                    key={t.key}
                    active={tierKey === t.key}
                    onClick={() => setTierKey(t.key)}
                    image={t.image}
                    imageAlt={t.imageAlt}
                    title={t.label}
                    sub={t.sub}
                  />
                ))}
              </div>
            </div>

            {/* 4. Lights */}
            <div>
              <label htmlFor="estimator-lights" className={step}>4. Light points</label>
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-solid border-[#e2e8f0] bg-white p-4">
                <ThunderboltOutlined className="text-2xl text-amber-500" />
                <InputNumber id="estimator-lights" min={0} max={200} value={lightPoints} onChange={(v) => setLightPoints(v || 0)} className="!w-[110px]" />
                <span className="text-[12.5px] text-gray-600">Spotlights, panels and LED strip points. A bedroom usually needs 4–6, a living room 8–12.</span>
              </div>
            </div>
          </div>

          {/* Right: result (only after Calculate) */}
          <aside
            aria-label="Your false ceiling estimate"
            className="rounded-3xl bg-brand-navy px-6 py-8 text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:px-9 sm:py-10 lg:sticky lg:top-24"
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-sm">Your selection</span>
            <p className="m-0 mt-2 text-[15px] leading-relaxed text-white">{summary}</p>

            <div className="my-6 h-px bg-white/10" />

            <div aria-live="polite">
              {shown ? (
                <>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-sm">Estimated cost</span>
                  <span className="mt-1 block text-[30px] font-bold leading-tight sm:text-[38px]">
                    {inr(result.low)} – {inr(result.high)}
                  </span>
                  <span className="mt-1 block text-[13px] text-white/75">
                    About {result.ceilingShare}% ceiling work, the rest lights and wiring.
                  </span>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setShown(true)}
                  className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 bg-brand-gold text-[16px] font-semibold text-brand-navy transition hover:brightness-95"
                >
                  <CalculatorOutlined /> Calculate my estimate
                </button>
              )}
            </div>

            <ul className="m-0 mt-6 flex list-none flex-col gap-2.5 rounded-2xl bg-white/5 p-5">
              {estimator.promises.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[13px]">
                  <CheckCircleFilled className="text-lg text-emerald-400" /> {p}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => typeof onOpenForm === 'function' && onOpenForm()}
              className="mt-6 inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 bg-brand-red text-[15px] font-semibold text-white shadow-cta transition hover:bg-brand-red-dark"
            >
              Get Exact Quote & Free Site Visit <ArrowRightOutlined />
            </button>

            {shown && (
              <button
                type="button"
                onClick={handleWhatsApp}
                className="mt-3 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-[1.5px] border-solid border-[#25d366] bg-transparent text-[15px] font-semibold text-[#25d366] transition hover:bg-[#25d366] hover:text-white"
              >
                <WhatsAppOutlined /> Send my estimate on WhatsApp
              </button>
            )}

            {shown && (
              <button
                type="button"
                onClick={() => setShown(false)}
                className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 border-0 bg-transparent text-[13px] text-white/70 underline hover:text-white"
              >
                <ReloadOutlined /> Hide estimate
              </button>
            )}

            <p className="m-0 mt-5 text-center text-[11.5px] leading-relaxed text-white/70">{estimator.disclaimer}</p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
