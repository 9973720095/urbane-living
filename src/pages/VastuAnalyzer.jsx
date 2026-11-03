import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  CheckOutlined,
  CloseCircleFilled,
  CompassOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ExclamationCircleFilled,
  LoadingOutlined,
  PrinterOutlined,
  ReloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  StarOutlined,
  ThunderboltOutlined,
  UndoOutlined,
  UploadOutlined,
  WarningOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import useSeo from '../hooks/useSeo';
import { API_BASE_URL, contact, inquiryOptions, vastuRules, vastuTool } from '../data/siteData';
import { buildReport, readPlanFile, reportSummary, statusOf, zoneOf } from '../utils/vastuEngine';
import { trackEvent, trackLead } from '../utils/metaPixel';
import { CompassRing, DishaMark, ZoneOverlay } from '../components/vastu/VastuArt';

const { zones, rooms, enhancements, tips } = vastuRules;
const { steps, upload, direction, rooms: roomsText, analysing, report: reportText, seo } = vastuTool;

const MAX_MB = 10;
const FILE_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
const SIDES = [
  { label: 'Top', deg: 0 },
  { label: 'Right', deg: 90 },
  { label: 'Bottom', deg: 180 },
  { label: 'Left', deg: 270 },
];

const STATUS = {
  ideal: { label: 'Ideal', icon: <CheckCircleFilled />, text: 'text-emerald-600', bg: 'bg-emerald-500', ring: 'ring-emerald-200' },
  okay: { label: 'Okay', icon: <ExclamationCircleFilled />, text: 'text-amber-600', bg: 'bg-amber-500', ring: 'ring-amber-200' },
  avoid: { label: 'Avoid', icon: <CloseCircleFilled />, text: 'text-brand-red', bg: 'bg-brand-red', ring: 'ring-red-200' },
};

const field =
  'h-12 w-full rounded-xl border border-solid border-gray-200 bg-white px-4 text-[15px] text-brand-navy outline-none transition placeholder:text-gray-400 focus:border-brand-blue focus:ring-[3px] focus:ring-brand-blue/15';
const btnPrimary =
  'inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border-0 bg-brand-red px-5 text-[15px] font-semibold text-white transition hover:bg-brand-red-dark disabled:cursor-not-allowed';
const btnOff = 'disabled:bg-gray-200 disabled:text-gray-400';
const btnGhost =
  'inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-solid border-brand-red bg-white px-5 text-[15px] font-semibold text-brand-red transition hover:bg-red-50';
const btnSoft =
  'inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-solid border-gray-200 bg-white px-4 text-sm font-semibold text-brand-navy transition hover:bg-brand-soft';

const norm = (deg) => ((Math.round(deg) % 360) + 360) % 360;
const sideOf = (deg) => SIDES[Math.round(norm(deg) / 90) % 4].label.toLowerCase();

/* ---------- small pieces ---------- */

function Stepper({ step }) {
  return (
    <ol className="m-0 grid w-full list-none grid-cols-4 gap-1.5 p-0 sm:gap-2" aria-label="Progress">
      {steps.map((s, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={s} aria-current={active ? 'step' : undefined} className="min-w-0">
            <span className={`block h-1.5 rounded-full transition ${done ? 'bg-brand-gold' : active ? 'bg-brand-red' : 'bg-white/15'}`} />
            <span className={`mt-2 flex items-center gap-1.5 truncate text-[11px] font-semibold sm:text-xs ${active ? 'text-white' : done ? 'text-brand-gold' : 'text-white/45'}`}>
              <span className="hidden sm:inline">{done ? <CheckOutlined /> : `0${i + 1}`}</span> {s}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function ScoreRing({ score }) {
  const ring = 2 * Math.PI * 52;
  const color = score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#E40B12';
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#EEF0F5" strokeWidth="10" />
        <circle
          cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={ring} strokeDashoffset={ring * (1 - score / 100)}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-brand-navy">{score}</span>
        <span className="text-xs text-gray-500">out of 100</span>
      </div>
    </div>
  );
}

/* Plan with zone guide and room markers; clickable in the "rooms" step */
function MarkedPlan({ plan, north, marks, activeRoom, onMark, maxH = 'max-h-[70vh]' }) {
  const handleClick = (e) => {
    if (!onMark) return;
    const r = e.currentTarget.getBoundingClientRect();
    onMark({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };
  return (
    <div className="relative mx-auto w-fit max-w-full">
      <img
        src={plan}
        alt="Your floor plan"
        draggable={false}
        onClick={handleClick}
        className={`block w-auto max-w-full select-none rounded-lg ${maxH} ${onMark && activeRoom ? 'cursor-crosshair' : ''}`}
      />
      <ZoneOverlay north={north} />
      {rooms.filter((r) => marks[r.id]).map((r) => {
        const m = marks[r.id];
        const st = STATUS[statusOf(r, zoneOf(m.x, m.y, north))];
        return (
          <span
            key={r.id}
            className={`pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[11px] font-semibold text-white shadow-lg ring-4 ${st.bg} ${st.ring}`}
            style={{ left: `${m.x * 100}%`, top: `${m.y * 100}%` }}
          >
            {r.short}
          </span>
        );
      })}
      {/* north badge */}
      <span className="pointer-events-none absolute -right-3 -top-3 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-white/95 text-brand-red shadow-card">
        <span className="block text-base leading-none" style={{ transform: `rotate(${north}deg)` }}>▲</span>
        <span className="text-[10px] font-bold leading-none">N</span>
      </span>
    </div>
  );
}

/* ---------- page ---------- */

export default function VastuAnalyzer() {
  useSeo(seo);

  const [step, setStep] = useState(0);
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [plan, setPlan] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileState, setFileState] = useState({ loading: false, error: '' });
  const [dragOver, setDragOver] = useState(false);
  const [north, setNorth] = useState(0);
  const [marks, setMarks] = useState({});
  const [skipped, setSkipped] = useState({});
  const [active, setActive] = useState(rooms[0].id);
  const [analysingNow, setAnalysingNow] = useState(false);
  const [tipIdx, setTipIdx] = useState(0);
  const [lead, setLead] = useState({ name: '', phone: '' });
  const [leadState, setLeadState] = useState('idle'); // idle | sending | done | error

  const topRef = useRef(null);
  const fileInput = useRef(null);
  const dialRef = useRef(null);
  const dragging = useRef(false);

  const report = useMemo(() => (step === 3 ? buildReport(marks, north) : null), [step, marks, north]);

  // keep the tool in view when the step changes (phones)
  useEffect(() => {
    if (topRef.current && topRef.current.getBoundingClientRect().top < 0) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step, analysingNow]);

  // short "analysing" moment with rotating Vastu tips
  useEffect(() => {
    if (!analysingNow) return undefined;
    const t = setInterval(() => setTipIdx((i) => (i + 1) % tips.length), 1200);
    const done = setTimeout(() => setAnalysingNow(false), 2600);
    return () => { clearInterval(t); clearTimeout(done); };
  }, [analysingNow]);

  useEffect(() => {
    if (report && !analysingNow) trackEvent('ViewContent', { content_name: 'Vastu report', value: report.score });
  }, [report, analysingNow]);

  /* upload */
  const takeFile = async (file) => {
    if (!file) return;
    if (!FILE_TYPES.includes(file.type)) return setFileState({ loading: false, error: 'Please upload a PDF, PNG, JPEG or WebP file.' });
    if (file.size > MAX_MB * 1024 * 1024) return setFileState({ loading: false, error: `File is larger than ${MAX_MB}MB.` });
    setFileState({ loading: true, error: '' });
    try {
      setPlan(await readPlanFile(file));
      setFileName(file.name);
      setMarks({});
      setSkipped({});
      setFileState({ loading: false, error: '' });
    } catch (err) {
      setFileState({ loading: false, error: 'Could not open this file. Please try an image (PNG / JPEG) of the plan.' });
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (city) takeFile(e.dataTransfer.files?.[0]);
  };

  /* compass drag */
  const angleFromPointer = (e) => {
    const r = dialRef.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    return norm((Math.atan2(dx, -dy) * 180) / Math.PI);
  };
  const dialDown = (e) => { dragging.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); setNorth(angleFromPointer(e)); };
  const dialMove = (e) => { if (dragging.current) setNorth(angleFromPointer(e)); };
  const dialUp = () => { dragging.current = false; };

  /* rooms */
  const nextRoom = (doneId, nextMarks, nextSkipped) =>
    rooms.find((r) => r.id !== doneId && !nextMarks[r.id] && !nextSkipped[r.id])?.id || null;

  const markRoom = (pos) => {
    if (!active) return;
    const m = { ...marks, [active]: pos };
    const s = { ...skipped, [active]: false };
    setMarks(m);
    setSkipped(s);
    setActive(nextRoom(active, m, s));
  };

  const skipRoom = (id) => {
    const m = { ...marks };
    delete m[id];
    const s = { ...skipped, [id]: true };
    setMarks(m);
    setSkipped(s);
    setActive(nextRoom(id, m, s));
  };

  const markedCount = Object.keys(marks).length;

  const analyse = () => {
    setStep(3);
    setAnalysingNow(true);
  };

  const restart = () => {
    setStep(0);
    setPlan(null);
    setFileName('');
    setNorth(0);
    setMarks({});
    setSkipped({});
    setActive(rooms[0].id);
    setLeadState('idle');
  };

  /* lead */
  const sendLead = async (e) => {
    e.preventDefault();
    const phone = lead.phone.replace(/\D/g, '').slice(-10);
    if (lead.name.trim().length < 2 || !/^[6-9]\d{9}$/.test(phone)) return setLeadState('invalid');
    setLeadState('sending');
    try {
      const res = await axios.post(`${API_BASE_URL}/api/save-lead`, {
        name: lead.name.trim(),
        phone: `+91 ${phone}`,
        city,
        locality: locality.trim(),
        message: reportSummary(report),
        page: window.location.pathname,
      });
      trackLead({ leadId: res.data?.leadId, city, form: 'Vastu report' });
      setLeadState('done');
    } catch (err) {
      setLeadState('error');
    }
  };

  const whatsappHref = report
    ? `${contact.whatsappHref}?text=${encodeURIComponent(`Hi Urbane Living, here is my Vastu report.\n${reportSummary(report).split(' | ').join('\n')}\nCity: ${city}${locality ? `, ${locality}` : ''}\nI will share my floor plan here for an expert review.`)}`
    : contact.whatsappHref;

  /* ---------- render ---------- */

  const leftCard = 'flex flex-col self-start lg:sticky lg:top-24 lg:min-h-[600px] rounded-3xl border border-solid border-gray-100 bg-white p-5 shadow-card sm:p-6';
  const rightCard = 'rounded-3xl border border-solid border-gray-100 bg-white p-4 shadow-card sm:p-6';

  return (
    <div ref={topRef} className="scroll-mt-24 bg-brand-soft px-4 py-6 sm:px-6 lg:py-10">
      {/* tool header: brand + progress */}
      <div className="relative mx-auto mb-5 max-w-[1240px] overflow-hidden rounded-3xl bg-brand-ink px-5 py-4 text-white sm:px-6">
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-brand-red/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 right-0 h-40 w-56 rounded-full bg-brand-blue/30 blur-3xl" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
          <div className="flex items-center justify-between gap-3 lg:shrink-0">
            <Link to="/vastu" className="inline-flex items-center gap-2.5 text-white no-underline">
              <DishaMark className="h-9 w-9" />
              <span>
                <span className="block text-lg font-bold leading-none">{vastuTool.name}</span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-brand-gold">Vastu score</span>
              </span>
            </Link>
            <Link to="/vastu#how-it-works" className="text-xs font-medium text-white/70 no-underline hover:text-white lg:hidden">How it works</Link>
          </div>
          <Stepper step={step} />
          <Link to="/vastu#how-it-works" className="hidden shrink-0 text-sm font-medium text-white/70 no-underline hover:text-white lg:inline">How it works</Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-6">
        {/* ===== LEFT ===== */}
        <aside className={`${leftCard} lg:col-start-2 lg:row-start-1`}>

          {step === 0 && (
            <>
              <h1 className="m-0 text-2xl font-semibold text-brand-navy">{upload.title}</h1>
              <p className="m-0 mt-1.5 text-[15px] text-gray-600">{upload.text}</p>
              <label htmlFor="v-city" className="mt-5 block text-sm font-semibold text-brand-navy">Property location</label>
              <div className="relative mt-2">
                <EnvironmentOutlined className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <select id="v-city" value={city} onChange={(e) => setCity(e.target.value)} className={`${field} cursor-pointer pl-10 ${city ? '' : 'text-gray-400'}`}>
                  <option value="">Select your city</option>
                  {inquiryOptions.serviceAreas.map((c) => <option key={c} value={c} className="text-brand-navy">{c}</option>)}
                </select>
              </div>
              <input
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="Society / sector (optional)"
                maxLength={120}
                aria-label="Society or sector (optional)"
                className={`${field} mt-3`}
              />
              <p className="m-0 mt-4 rounded-xl border-0 border-l-4 border-solid border-brand-gold bg-brand-soft px-4 py-3 text-sm text-gray-700"><strong>Tip:</strong> {upload.tip}</p>
              <div className="mt-auto pt-6">
                <button type="button" disabled={!city || !plan} onClick={() => setStep(1)} className={`${btnPrimary} ${btnOff} w-full`}>
                  Continue to direction <ArrowRightOutlined />
                </button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="m-0 text-2xl font-semibold text-brand-navy">{direction.title}</h1>
              <p className="m-0 mt-1.5 text-[15px] text-gray-600">{direction.text}</p>
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-brand-soft px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-brand-red"><CompassOutlined /></span>
                <span>
                  <span className="block font-semibold text-brand-navy">North at {north}°</span>
                  <span className="block text-xs text-gray-500">North is towards the <strong>{sideOf(north)}</strong> of your plan</span>
                </span>
              </div>
              <p className="m-0 mt-5 text-sm font-semibold text-brand-navy">Rotate the compass</p>
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={() => setNorth(norm(north - 15))} className={`${btnSoft} flex-1`}><RotateLeftOutlined /> Left</button>
                <button type="button" onClick={() => setNorth(norm(north + 15))} className={`${btnSoft} flex-1`}><RotateRightOutlined /> Right</button>
                <button type="button" onClick={() => setNorth(0)} aria-label="Reset" className={btnSoft}><UndoOutlined /></button>
              </div>
              <p className="m-0 mt-5 text-sm font-semibold text-brand-navy">{direction.sideTitle}</p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {SIDES.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setNorth(s.deg)}
                    className={`h-10 cursor-pointer rounded-lg border border-solid text-sm font-medium transition ${
                      north === s.deg ? 'border-brand-red bg-red-50 text-brand-red' : 'border-gray-200 bg-white text-brand-navy hover:border-brand-red'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="mt-auto flex gap-3 pt-6">
                <button type="button" onClick={() => setStep(0)} className={btnGhost}><ArrowLeftOutlined /> Back</button>
                <button type="button" onClick={() => setStep(2)} className={`${btnPrimary} flex-1`}>Confirm <ArrowRightOutlined /></button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="m-0 text-2xl font-semibold text-brand-navy">{roomsText.title}</h1>
              <p className="m-0 mt-1.5 text-[15px] text-gray-600">{roomsText.text}</p>
              <ol className="m-0 mt-4 flex list-none flex-col gap-1.5 p-0">
                {rooms.map((r, i) => {
                  const m = marks[r.id];
                  const zone = m ? zoneOf(m.x, m.y, north) : null;
                  const st = zone ? statusOf(r, zone) : null;
                  const isActive = active === r.id;
                  return (
                    <li key={r.id} className={`flex items-center gap-2 rounded-xl border border-solid px-3 py-2 transition ${isActive ? 'border-brand-red bg-red-50/60' : 'border-gray-100'}`}>
                      <button type="button" onClick={() => setActive(r.id)} className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left">
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${st ? `${STATUS[st].bg} text-white` : 'bg-gray-100 text-gray-500'}`}>
                          {st ? STATUS[st].icon : i + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-brand-navy">{r.name}</span>
                          <span className={`block text-xs ${st ? STATUS[st].text : 'text-gray-400'}`}>
                            {skipped[r.id] ? 'Not in my home' : zone ? `${zones[zone]} · ${STATUS[st].label}` : isActive ? 'Tap its place on the plan' : 'Not marked'}
                          </span>
                        </span>
                      </button>
                      {!skipped[r.id] && (
                        <button type="button" onClick={() => skipRoom(r.id)} className="shrink-0 cursor-pointer border-0 bg-transparent p-1 text-xs text-gray-400 underline hover:text-brand-red">
                          Skip
                        </button>
                      )}
                    </li>
                  );
                })}
              </ol>
              <div className="mt-auto flex gap-3 pt-6">
                <button type="button" onClick={() => setStep(1)} className={btnGhost}><ArrowLeftOutlined /> Back</button>
                <button type="button" disabled={!markedCount} onClick={analyse} className={`${btnPrimary} ${btnOff} flex-1`}>Analyse my home <ArrowRightOutlined /></button>
              </div>
            </>
          )}

          {step === 3 && analysingNow && (
            <>
              <h1 className="m-0 text-2xl font-semibold text-brand-navy">{analysing.title}</h1>
              <p className="m-0 mt-1.5 text-[15px] text-gray-600">{analysing.text}</p>
              <p className="m-0 mt-5 rounded-xl border-0 border-l-4 border-solid border-brand-gold bg-brand-soft px-4 py-3 text-sm text-gray-700">Keep this page open. Your report opens automatically.</p>
            </>
          )}

          {step === 3 && !analysingNow && report && (
            <>
              <h1 className="m-0 text-2xl font-semibold text-brand-navy">{reportText.title}</h1>
              <div className="mt-4 flex flex-col items-center text-center">
                <ScoreRing score={report.score} />
                <p className="m-0 mt-2 text-xl font-semibold text-brand-navy">{report.rating.label}</p>
                <p className="m-0 mt-1 text-sm text-gray-600">{report.rating.text}</p>
                <p className="m-0 mt-1 text-xs text-gray-400">{report.list.length} rooms checked · {city}{locality ? `, ${locality}` : ''}</p>
              </div>
              <ul className="m-0 mt-5 grid list-none grid-cols-3 gap-2 p-0 text-center">
                <li className="rounded-xl bg-emerald-50 px-2 py-3"><span className="block text-xl font-bold text-emerald-600">{report.strengths.length}</span><span className="text-xs text-gray-600">Strengths</span></li>
                <li className="rounded-xl bg-red-50 px-2 py-3"><span className="block text-xl font-bold text-brand-red">{report.warnings.length}</span><span className="text-xs text-gray-600">Remedies</span></li>
                <li className="rounded-xl bg-amber-50 px-2 py-3"><span className="block text-xl font-bold text-amber-600">{report.okay.length + enhancements.length}</span><span className="text-xs text-gray-600">Enhancements</span></li>
              </ul>
              <div className="mt-5 grid grid-cols-2 gap-2 print:hidden">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="col-span-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-[15px] font-semibold text-white no-underline transition hover:brightness-95">
                  <WhatsAppOutlined /> Send report on WhatsApp
                </a>
                <button type="button" onClick={() => window.print()} className={btnSoft}><PrinterOutlined /> Save PDF</button>
                <button type="button" onClick={() => setStep(2)} className={btnSoft}><EditOutlined /> Edit rooms</button>
                <button type="button" onClick={restart} className="col-span-2 mt-1 cursor-pointer border-0 bg-transparent p-1 text-sm font-medium text-gray-500 underline hover:text-brand-red">
                  <ReloadOutlined /> Check another floor plan
                </button>
              </div>
            </>
          )}
        </aside>

        {/* ===== RIGHT ===== */}
        <section className={`${rightCard} min-h-[420px] lg:col-start-1 lg:row-start-1 lg:min-h-[600px] ${step === 1 || step === 2 ? 'order-first lg:order-none' : ''}`} aria-live="polite">
          {step === 0 && (
            <div
              onDragOver={(e) => { e.preventDefault(); if (city) setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition lg:min-h-[550px] ${
                dragOver ? 'border-brand-red bg-red-50/50' : 'border-gray-200 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:18px_18px]'
              }`}
            >
              <input ref={fileInput} type="file" accept=".pdf,.png,.jpg,.jpeg,.webp" className="hidden" onChange={(e) => takeFile(e.target.files?.[0])} />
              {fileState.loading ? (
                <p className="m-0 flex items-center gap-2 text-brand-navy"><LoadingOutlined /> Opening your plan...</p>
              ) : plan ? (
                <>
                  <img src={plan} alt="Uploaded floor plan" className="block max-h-[440px] max-w-full rounded-lg shadow-card" />
                  <p className="m-0 mt-4 flex items-center gap-2 text-sm text-brand-navy"><CheckCircleFilled className="text-emerald-500" /> {fileName}</p>
                  <button type="button" onClick={() => fileInput.current?.click()} className="mt-2 cursor-pointer border-0 bg-transparent p-1 text-sm font-semibold text-brand-red underline">Change file</button>
                </>
              ) : (
                <>
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-ink text-2xl text-white shadow-card"><UploadOutlined /></span>
                  <p className="m-0 mt-4 text-lg font-semibold text-brand-navy">{upload.drop}</p>
                  <ul className="m-0 mt-3 flex list-none flex-wrap justify-center gap-1.5 p-0">
                    {upload.formats.map((f) => (
                      <li key={f} className="rounded-md bg-brand-soft px-2 py-1 text-[11px] font-bold tracking-wider text-brand-navy">{f}</li>
                    ))}
                  </ul>
                  <p className="m-0 mt-2 text-xs text-gray-500">{upload.limit}</p>
                  <button type="button" disabled={!city} onClick={() => fileInput.current?.click()} className={`${btnPrimary} mt-5 w-full max-w-[240px] disabled:bg-red-200`}>
                    <UploadOutlined /> Browse files
                  </button>
                  {!city && <p className="m-0 mt-3 flex items-center gap-2 text-sm text-gray-600"><WarningOutlined className="text-amber-500" /> {upload.needCity}</p>}
                </>
              )}
              {fileState.error && <p className="m-0 mt-3 text-sm text-brand-red">{fileState.error}</p>}
            </div>
          )}

          {step === 1 && plan && (
            <div className="flex h-full flex-col items-center justify-center">
              <div
                ref={dialRef}
                onPointerDown={dialDown}
                onPointerMove={dialMove}
                onPointerUp={dialUp}
                onPointerCancel={dialUp}
                className="relative aspect-square w-full max-w-[600px] cursor-grab touch-none select-none active:cursor-grabbing"
              >
                <CompassRing north={north} className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-[24%] flex items-center justify-center">
                  <img src={plan} alt="Your floor plan" draggable={false} className="block max-h-full max-w-full rounded shadow-card" />
                </div>
              </div>
              <p className="m-0 mt-3 text-center text-sm text-gray-500">Drag the compass to rotate it, or use the controls</p>
            </div>
          )}

          {step === 2 && plan && (
            <div className="flex h-full flex-col items-center">
              <p className="m-0 mb-3 rounded-full bg-brand-soft px-4 py-2 text-center text-sm font-medium text-brand-navy">
                {active ? <>Tap where your <strong className="text-brand-red">{rooms.find((r) => r.id === active).name.toLowerCase()}</strong> is</> : 'All rooms done. Tap “Analyse my home”.'}
              </p>
              <MarkedPlan plan={plan} north={north} marks={marks} activeRoom={active} onMark={markRoom} />
              <p className="m-0 mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-500">
                {Object.entries(STATUS).map(([k, s]) => (
                  <span key={k} className="inline-flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-full ${s.bg}`} /> {s.label}</span>
                ))}
                <span>Dotted lines = Vastu zones · box = centre</span>
              </p>
            </div>
          )}

          {step === 3 && analysingNow && (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
              <DishaMark className="h-20 w-20 animate-spin [animation-duration:3s]" />
              <p className="m-0 mt-5 text-2xl font-semibold text-brand-navy">{analysing.title}</p>
              <p className="m-0 mt-2 max-w-[480px] text-[15px] text-gray-600">{analysing.text}</p>
              <div className="mt-6 max-w-[520px] rounded-2xl border border-solid border-red-100 bg-white px-5 py-4 text-left shadow-card">
                <p className="m-0 text-xs font-semibold text-brand-red">TIP · {tips[tipIdx].room}</p>
                <p className="m-0 mt-1 text-sm text-gray-700">{tips[tipIdx].text}</p>
              </div>
            </div>
          )}

          {step === 3 && !analysingNow && report && (
            <div>
              <MarkedPlan plan={plan} north={north} marks={marks} maxH="max-h-[420px]" />

              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <h2 className="m-0 flex items-center gap-2 text-lg font-semibold text-brand-navy"><ThunderboltOutlined className="text-emerald-500" /> Strengths</h2>
                  <ul className="m-0 mt-3 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2">
                    {report.strengths.length ? report.strengths.map(({ room, zone }) => (
                      <li key={room.id} className="rounded-xl bg-emerald-50 p-3 text-sm">
                        <strong className="text-brand-navy">{room.name}</strong> <span className="text-gray-500">· {zones[zone]}</span>
                        <p className="m-0 mt-1 text-gray-700">{room.good}</p>
                      </li>
                    )) : <li className="text-sm text-gray-500">No room is in its ideal zone yet. The remedies below will help.</li>}
                  </ul>
                </div>
                <div>
                  <h2 className="m-0 flex items-center gap-2 text-lg font-semibold text-brand-navy"><WarningOutlined className="text-brand-red" /> Warnings & remedies</h2>
                  <ul className="m-0 mt-3 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2">
                    {report.warnings.length ? report.warnings.map(({ room, zone }) => (
                      <li key={room.id} className="rounded-xl bg-red-50 p-3 text-sm">
                        <strong className="text-brand-navy">{room.name}</strong> <span className="text-gray-500">· {zones[zone]}</span>
                        <p className="m-0 mt-1 text-gray-700">{room.remedy}</p>
                        <p className="m-0 mt-1 text-xs text-gray-500">Best zone: {room.ideal.map((z) => zones[z]).join(' / ')}</p>
                      </li>
                    )) : <li className="text-sm text-gray-500">No major concerns. Great!</li>}
                  </ul>
                </div>
                <div>
                  <h2 className="m-0 flex items-center gap-2 text-lg font-semibold text-brand-navy"><StarOutlined className="text-amber-500" /> Enhancements</h2>
                  <ul className="m-0 mt-3 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2">
                    {report.okay.map(({ room, zone }) => (
                      <li key={room.id} className="rounded-xl bg-amber-50 p-3 text-sm">
                        <strong className="text-brand-navy">{room.name}</strong> <span className="text-gray-500">· {zones[zone]}</span>
                        <p className="m-0 mt-1 text-gray-700">{room.okay}</p>
                      </li>
                    ))}
                    {enhancements.map((t) => (
                      <li key={t} className="rounded-xl bg-brand-soft p-3 text-sm text-gray-700">{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* lead */}
              <div className="mt-6 rounded-2xl bg-brand-navy p-5 text-white sm:p-6 print:hidden">
                {leadState === 'done' ? (
                  <p className="m-0 flex items-center gap-2 text-base font-medium"><CheckCircleFilled className="text-emerald-400" /> {reportText.leadDone}</p>
                ) : (
                  <form noValidate onSubmit={sendLead} className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
                    <div className="md:col-span-4">
                      <p className="m-0 text-lg font-semibold">{reportText.leadTitle}</p>
                      <p className="m-0 mt-1 text-sm text-white/70">{reportText.leadText}</p>
                    </div>
                    <input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Your name" autoComplete="name" aria-label="Your name" className={field} />
                    <input value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value.replace(/[^\d+\s]/g, '') })} placeholder="10-digit mobile" inputMode="numeric" autoComplete="tel-national" aria-label="Mobile number" className={field} />
                    <input value={city} readOnly aria-label="City" className={`${field} bg-white/90 text-gray-500`} />
                    <button type="submit" disabled={leadState === 'sending'} className={`${btnPrimary} whitespace-nowrap px-6 disabled:opacity-70`}>
                      {leadState === 'sending' ? <LoadingOutlined /> : null} {reportText.leadButton}
                    </button>
                    {leadState === 'invalid' && <p className="m-0 text-sm text-red-300 md:col-span-4">Please enter your name and a valid 10-digit mobile number.</p>}
                    {leadState === 'error' && <p className="m-0 text-sm text-red-300 md:col-span-4">Could not send right now. Please try WhatsApp instead.</p>}
                  </form>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
