import React, { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined, ReloadOutlined, WhatsAppOutlined, CheckCircleFilled } from '@ant-design/icons';
import { styleQuiz, contact } from '../data/siteData';

const { questions, styles } = styleQuiz;

// Highest score wins; on a tie the earlier answer's style wins
const pickStyle = (answers) => {
  const score = {};
  answers.forEach((key, i) => { score[key] = (score[key] || 0) + 1 + (answers.length - i) * 0.01; });
  return Object.keys(score).sort((a, b) => score[b] - score[a])[0];
};

// Home page: 3-question "find your design style" quiz that ends in a lead CTA
const StyleQuiz = ({ onOpenForm }) => {
  const [answers, setAnswers] = useState([]);
  const step = answers.length;
  const done = step === questions.length;
  const result = done ? styles[pickStyle(answers)] : null;

  const choose = (style) => setAnswers((prev) => [...prev, style]);
  const back = () => setAnswers((prev) => prev.slice(0, -1));
  const restart = () => setAnswers([]);

  const whatsappHref = result
    ? `${contact.whatsappHref}?text=${encodeURIComponent(`Hi Urbane Living, my home style quiz result is "${result.name}". I'd like a free 3D design for my home.`)}`
    : contact.whatsappHref;

  return (
    <section aria-labelledby="quiz-title" className="bg-[radial-gradient(ellipse_at_top,_#F3F6FC,_#ffffff_70%)] px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-[700px] text-center lg:mb-10">
          <span className="mb-3 inline-block rounded-full bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-red">
            {styleQuiz.tag}
          </span>
          <h2 id="quiz-title" className="m-0 text-[26px] font-semibold leading-tight text-brand-navy sm:text-[36px] lg:text-[40px]">
            {styleQuiz.title} <span className="text-brand-red">{styleQuiz.highlight}</span>
          </h2>
          <p className="m-0 mt-3 text-[15px] text-gray-500 sm:text-base">{styleQuiz.subtitle}</p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(31,42,68,0.25)]">
          {!done ? (
            <div className="p-5 sm:p-8 lg:p-10">
              {/* Progress */}
              <div className="mb-6 flex items-center gap-4">
                <span className="shrink-0 text-xs font-semibold text-gray-400">
                  {step + 1} / {questions.length}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-red to-brand-gold transition-all duration-500"
                    style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                  />
                </div>
                {step > 0 && (
                  <button type="button" onClick={back} className="inline-flex shrink-0 cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-xs font-semibold text-gray-500 hover:text-brand-red">
                    <ArrowLeftOutlined /> Back
                  </button>
                )}
              </div>

              <fieldset key={step} className="m-0 animate-fade-up border-0 p-0">
                <legend className="mb-6 p-0 text-xl font-semibold text-brand-navy sm:text-2xl">{questions[step].q}</legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  {questions[step].options.map((o) => (
                    <button
                      key={o.label}
                      type="button"
                      onClick={() => choose(o.style)}
                      className="group flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-solid border-gray-100 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-brand-red hover:shadow-card sm:p-5"
                    >
                      {o.colors ? (
                        <span className="flex shrink-0 overflow-hidden rounded-xl shadow-inner">
                          {o.colors.map((c) => <span key={c} className="h-12 w-6 sm:h-14 sm:w-7" style={{ background: c }} />)}
                        </span>
                      ) : (
                        <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-2xl transition group-hover:scale-110 sm:h-14 sm:w-14">
                          {o.emoji}
                        </span>
                      )}
                      <span className="flex-1 text-[15px] font-medium text-brand-navy">{o.label}</span>
                      <ArrowRightOutlined className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-brand-red" />
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          ) : (
            <div className="grid animate-fade-up grid-cols-1 md:grid-cols-2" aria-live="polite">
              <div className="relative h-[260px] overflow-hidden bg-brand-navy sm:h-[340px] md:h-auto md:min-h-[460px]">
                <img src={result.image} alt={`${result.name} interior design`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                  <div className="flex gap-1.5">
                    {result.palette.map((c) => <span key={c} title={c} className="h-7 w-7 rounded-full border-2 border-solid border-white" style={{ background: c }} />)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Your home style is</span>
                <h3 className="m-0 mt-1 text-[30px] font-semibold text-brand-red sm:text-[36px]">{result.name}</h3>
                <p className="m-0 mt-3 text-[15px] leading-relaxed text-gray-600">{result.text}</p>

                <p className="m-0 mt-6 text-sm font-semibold text-brand-navy">Must-haves for your home</p>
                <ul className="m-0 mt-3 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2">
                  {result.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircleFilled className="mt-0.5 text-emerald-500" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 md:mt-auto md:pt-8">
                  <button
                    type="button"
                    onClick={() => typeof onOpenForm === 'function' && onOpenForm()}
                    className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-brand-red px-6 text-sm font-semibold text-white shadow-cta transition hover:bg-brand-red-dark"
                  >
                    {styleQuiz.cta} <ArrowRightOutlined />
                  </button>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white no-underline transition hover:brightness-95"
                  >
                    <WhatsAppOutlined /> Share on WhatsApp
                  </a>
                </div>
                <button type="button" onClick={restart} className="mt-4 inline-flex cursor-pointer items-center justify-center gap-1.5 self-center border-0 bg-transparent p-0 text-xs font-semibold text-gray-500 hover:text-brand-red md:self-start">
                  <ReloadOutlined /> Retake quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StyleQuiz;