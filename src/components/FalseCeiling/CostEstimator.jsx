import React, { useState, useMemo } from 'react';
import { Slider, InputNumber, Tooltip } from 'antd';
import {
  CalculatorOutlined,
  CheckCircleFilled,
  InfoCircleOutlined,
  ThunderboltOutlined,
  BlockOutlined,
  WhatsAppOutlined,
  FileProtectOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { estimator, contact } from '../../data/siteData';

const formatINR = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

const CostEstimator = ({ onOpenForm }) => {
  const { materials, designTiers, lightRate } = estimator;

  // State for Calculator
  const [area, setArea] = useState(estimator.defaultArea);
  const [material, setMaterial] = useState(estimator.defaultMaterial);
  const [complexity, setComplexity] = useState(1.0); // 1.0: Basic, 1.2: Standard, 1.5: Luxury
  const [lightPoints, setLightPoints] = useState(estimator.defaultLightPoints);

  // Real-time Calculations
  const calculations = useMemo(() => {
    const safeArea = area || 0;
    const selectedRate = materials.find(m => m.name === material)?.rate || 0;
    const baseCost = safeArea * selectedRate * complexity;
    const lightingCost = (lightPoints || 0) * lightRate;
    const total = baseCost + lightingCost;

    return {
      base: Math.round(baseCost),
      lighting: Math.round(lightingCost),
      total: Math.round(total),
      perSqFt: safeArea ? Math.round(total / safeArea) : 0
    };
  }, [area, material, complexity, lightPoints, materials, lightRate]);

  const tierLabel = designTiers.find((t) => t.value === complexity)?.label || '';

  // WhatsApp opens with the customer's estimate already typed in
  const handleWhatsAppClick = () => {
    const text = `Hi Urbane Living, I used the false ceiling estimator:\n• Area: ${area} sq ft\n• Material: ${material}\n• Design: ${tierLabel}\n• LED points: ${lightPoints}\n• Estimate: ${formatINR(calculations.total)}\nPlease share the detailed quote.`;
    window.open(`${contact.whatsappHref}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const stepTitle = 'm-0 mb-4 block text-[15px] font-semibold text-brand-navy sm:text-base';

  return (
    <section aria-labelledby="estimator-title" className="bg-white px-4 py-12 sm:px-5 lg:py-16">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold tracking-wider text-brand-blue">
            <CalculatorOutlined /> {estimator.tag}
          </span>
          <h2 id="estimator-title" className="m-0 text-[28px] font-semibold text-brand-navy sm:text-4xl lg:text-[40px]">
            {estimator.title}
          </h2>
          <p className="m-0 mx-auto mt-3 max-w-[560px] text-[15px] text-gray-500 sm:text-lg">
            {estimator.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,15fr)_minmax(0,9fr)] lg:items-start lg:gap-10">
          {/* Left: controls */}
          <div className="rounded-3xl border border-solid border-[#edf2f7] bg-[#f8fafc] p-5 sm:p-8 lg:p-10">

            {/* 1. Area */}
            <div className="mb-9">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <label htmlFor="estimator-area" className="text-[15px] font-semibold text-brand-navy sm:text-base">
                  1. Define Total Area (Sq. Ft.)
                </label>
                <InputNumber
                  id="estimator-area"
                  min={estimator.minArea}
                  max={estimator.maxArea}
                  value={area}
                  onChange={setArea}
                  className="!w-[120px] !rounded-lg"
                  formatter={value => `${value} ft²`}
                  parser={value => (value || '').replace(/[^\d]/g, '')}
                />
              </div>
              <Slider
                min={estimator.minArea}
                max={estimator.sliderMax}
                step={10}
                value={area}
                onChange={setArea}
                aria-label="Area in square feet"
              />
            </div>

            {/* 2. Material */}
            <div className="mb-9">
              <span className={stepTitle}>
                2. Select Material Grade{' '}
                <Tooltip title="Rates vary based on durability and finish quality">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </span>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Material grade">
                {materials.map(m => {
                  const active = material === m.name;
                  return (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={active}
                      key={m.name}
                      onClick={() => setMaterial(m.name)}
                      className={`flex h-full cursor-pointer flex-col items-center rounded-2xl border-2 border-solid px-2.5 py-4 text-center transition ${
                        active ? 'border-brand-blue bg-brand-blue/10 shadow-card' : 'border-[#e2e8f0] bg-white hover:border-brand-blue/40'
                      }`}
                    >
                      <BlockOutlined className={`mb-2 text-2xl ${active ? 'text-brand-blue' : 'text-slate-400'}`} />
                      <span className="block text-xs font-semibold text-brand-navy">{m.name}</span>
                      <span className="text-[11px] text-gray-500">₹{m.rate}/sqft</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Design tier + 4. Electrical points */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <span className={stepTitle}>3. Design Tier</span>
                <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Design tier">
                  {designTiers.map(tier => {
                    const active = complexity === tier.value;
                    return (
                      <button
                        type="button"
                        role="radio"
                        aria-checked={active}
                        key={tier.label}
                        onClick={() => setComplexity(tier.value)}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border-[1.5px] border-solid px-5 py-3 text-left transition ${
                          active ? 'border-brand-blue bg-brand-blue/10' : 'border-[#e2e8f0] bg-white hover:border-brand-blue/40'
                        }`}
                      >
                        <span>
                          <span className="block text-sm font-semibold text-brand-navy">{tier.label}</span>
                          <span className="text-[11px] text-gray-500">{tier.sub}</span>
                        </span>
                        {active && <CheckCircleFilled className="text-brand-blue" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="estimator-lights" className={stepTitle}>4. Electrical Points</label>
                <div className="rounded-2xl border border-solid border-[#e2e8f0] bg-white p-6 text-center">
                  <ThunderboltOutlined className="mb-3 text-[32px] text-amber-500" />
                  <div className="flex items-center overflow-hidden rounded-lg border border-solid border-[#d9d9d9]">
                    <span className="whitespace-nowrap bg-[#fafafa] px-3 text-sm leading-[38px] text-gray-600">LED Points</span>
                    <InputNumber
                      id="estimator-lights"
                      min={0}
                      max={100}
                      value={lightPoints}
                      onChange={setLightPoints}
                      variant="borderless"
                      size="large"
                      className="!w-full"
                    />
                  </div>
                  <span className="mt-2.5 block text-[11px] text-gray-500">
                    Market average: ₹{lightRate} per point
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: quote summary (sticks under the header on large screens) */}
          <aside
            aria-label="Estimated investment"
            className="rounded-3xl bg-brand-navy px-6 py-8 text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:px-9 sm:py-11 lg:sticky lg:top-24"
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-sm">
              Estimated Investment
            </span>
            <div className="mt-2 flex items-baseline gap-2" aria-live="polite">
              <span className="text-[40px] font-bold leading-tight sm:text-[52px]">{formatINR(calculations.total)}</span>
              <span className="text-lg text-white/50">*</span>
            </div>
            <span className="block text-sm font-semibold text-emerald-400">
              Approx. ₹{calculations.perSqFt} per sq. ft.
            </span>

            <div className="my-7 h-px bg-white/10" />

            <dl className="m-0 flex flex-col gap-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-white/60">Ceiling Fabrication</dt>
                <dd className="m-0">{formatINR(calculations.base)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/60">Electrical &amp; Lights</dt>
                <dd className="m-0">{formatINR(calculations.lighting)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/60">GST (Estimated)</dt>
                <dd className="m-0">Included</dd>
              </div>
            </dl>

            <ul className="m-0 mt-8 flex list-none flex-col gap-3 rounded-2xl bg-white/5 p-5">
              {estimator.promises.map((p, i) => (
                <li key={p} className="flex items-center gap-3 text-xs sm:text-[13px]">
                  {i === 0
                    ? <FileProtectOutlined className="text-lg text-[#7da2e8]" />
                    : <CheckCircleFilled className="text-lg text-emerald-400" />}
                  {p}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => typeof onOpenForm === 'function' && onOpenForm()}
              className="mt-8 inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 bg-brand-red text-[15px] font-semibold text-white shadow-cta transition hover:bg-brand-red-dark"
            >
              Get Full PDF Breakdown <ArrowRightOutlined />
            </button>

            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="mt-3 inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-[1.5px] border-solid border-[#25d366] bg-transparent text-[15px] font-semibold text-[#25d366] transition hover:bg-[#25d366] hover:text-white"
            >
              <WhatsAppOutlined /> Chat with Expert
            </button>

            <p className="m-0 mt-5 text-center text-[11px] text-white/40">
              {estimator.disclaimer}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;