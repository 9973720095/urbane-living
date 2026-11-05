import React, { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined, ReloadOutlined, WhatsAppOutlined, CheckCircleFilled } from '@ant-design/icons';
import { styleQuiz } from '../data/styleQuiz';
import { contact } from '../data/siteData';

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
    <section aria-labelledby="quiz-title" className="bg-[radial-gradient(ellipse_at_top,_#F3F6FC,_#ffffff_70%)] px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mx-auto mb-6 max-w-[700px] text-center sm:mb-8 lg:mb-10">
          <span className="mb-3 inline-block rounded-full bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-red">
            {styleQuiz.tag}
          </span>
          <h2 id="quiz-title" className="m-0 text-[22px] font-semibold leading-tight text-brand-navy sm:text-[36px] lg:text-[40px]">
            {styleQuiz.title} <span className="text-brand-red">{styleQuiz.highlight}</span>
          </h2>
          <p className="m-0 mt-2 text-sm text-gray-500 sm:mt-3 sm:text-base">{styleQuiz.subtitle}</p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(31,42,68,0.25)]">
          {!done ? (
            <div className="p-4 sm:p-8 lg:p-10">
              {/* Progress */}
              <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
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
                <legend className="mb-4 p-0 text-[17px] font-semibold leading-snug text-brand-navy sm:mb-6 sm:text-2xl">{questions[step].q}</legend>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  {questions[step].options.map((o) => (
                    <button
                      key={o.label}
                      type="button"
                      onClick={() => choose(o.style)}
                      className="group flex cursor-pointer flex-col items-start gap-2.5 rounded-2xl border-2 border-solid border-gray-100 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-brand-red hover:shadow-card sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                    >
                      {o.colors ? (
                        <span className="flex shrink-0 overflow-hidden rounded-xl shadow-inner">
                          {o.colors.map((c) => <span key={c} className="h-9 w-6 sm:h-14 sm:w-7" style={{ background: c }} />)}
                        </span>
                      ) : (
                        <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-xl transition group-hover:scale-110 sm:h-14 sm:w-14 sm:text-2xl">
                          {o.emoji}
                        </span>
                      )}
                      <span className="flex-1 text-[13px] font-medium leading-snug text-brand-navy sm:text-[15px]">{o.label}</span>
                      <ArrowRightOutlined className="hidden text-gray-300 transition sm:inline-block group-hover:translate-x-1 group-hover:text-brand-red" />
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          ) : (
            <div className="grid animate-fade-up grid-cols-1 md:grid-cols-2" aria-live="polite">
              <div className="relative h-[200px] overflow-hidden bg-brand-navy sm:h-[340px] md:h-auto md:min-h-[460px]">
                <img src={result.image} alt={`${result.name} interior design`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-5">
                  <div className="flex gap-1.5">
                    {result.palette.map((c) => <span key={c} title={c} className="h-6 w-6 rounded-full border-2 border-solid border-white sm:h-7 sm:w-7" style={{ background: c }} />)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-5 sm:p-8 lg:p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Your home style is</span>
                <h3 className="m-0 mt-1 text-[26px] font-semibold text-brand-red sm:text-[36px]">{result.name}</h3>
                <p className="m-0 mt-2 text-sm leading-relaxed text-gray-600 sm:mt-3 sm:text-[15px]">{result.text}</p>

                <p className="m-0 mt-5 text-sm font-semibold text-brand-navy sm:mt-6">Must-haves for your home</p>
                <ul className="m-0 mt-3 grid list-none grid-cols-2 gap-x-3 gap-y-2 p-0">
                  {result.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-[13px] leading-snug text-gray-600 sm:gap-2 sm:text-sm">
                      <CheckCircleFilled className="mt-0.5 text-emerald-500" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-2.5 sm:gap-3 md:mt-auto md:pt-8">
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