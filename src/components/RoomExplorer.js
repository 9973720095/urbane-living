import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import { roomExplorer } from '../data/siteData';

const { tag, title, subtitle, cta, rooms } = roomExplorer;
const AUTO_TOUR_MS = 3500;

/*
  Home page Room Explorer: room tabs + photo with glowing hotspots + details panel.
  Text and hotspot positions live in data/roomExplorer.js.
  Every room's details are in the page (hidden ones too), so Google reads all of them.
*/
export default function RoomExplorer({ onOpenForm }) {
  const [roomIdx, setRoomIdx] = useState(0);
  const [spotIdx, setSpotIdx] = useState(0);
  const [touring, setTouring] = useState(true); // gentle auto tour until the visitor taps something
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef(null);

  const room = rooms[roomIdx];
  const spot = room.spots[spotIdx];
  const openForm = () => typeof onOpenForm === 'function' && onOpenForm();

  // Auto tour runs only while the section is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!touring || !inView || reduceMotion) return undefined;
    const t = setInterval(() => setSpotIdx((i) => (i + 1) % room.spots.length), AUTO_TOUR_MS);
    return () => clearInterval(t);
  }, [touring, inView, room]);

  // Load the next room's photo early so switching feels instant
  useEffect(() => {
    const next = rooms[(roomIdx + 1) % rooms.length];
    const img = new Image();
    img.src = next.image;
  }, [roomIdx]);

  const pickRoom = (i) => {
    setTouring(false);
    if (i === roomIdx) return;
    setLoaded(false);
    setRoomIdx(i);
    setSpotIdx(0);
  };

  const pickSpot = (i) => {
    setTouring(false);
    setSpotIdx(i);
  };

  // Localhost helper: Alt + click on the photo prints the x / y to put in data/roomExplorer.js
  const logPosition = (e) => {
    if (!e.altKey || window.location.hostname !== 'localhost') return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - r.left) / r.width) * 100);
    const y = Math.round(((e.clientY - r.top) / r.height) * 100);
    console.log(`Room Explorer [${room.id}] → x: ${x}, y: ${y}`); // eslint-disable-line no-console
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="room-explorer-title"
      className="relative overflow-hidden bg-brand-ink px-4 py-14 text-white sm:px-6 lg:py-20"
    >
      {/* soft brand glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand-blue/25 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px]">
        {/* Heading */}
        <div className="mx-auto max-w-[720px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-solid border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" /> {tag}
          </span>
          <h2 id="room-explorer-title" className="m-0 mt-4 text-[28px] font-semibold leading-tight sm:text-[38px]">{title}</h2>
          <p className="m-0 mt-3 text-[15px] leading-relaxed text-white/70 sm:text-base">{subtitle}</p>
        </div>

        {/* Room tabs */}
        <div role="tablist" aria-label="Rooms" className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {rooms.map((r, i) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              id={`room-tab-${r.id}`}
              aria-selected={i === roomIdx}
              aria-controls={`room-panel-${r.id}`}
              onClick={() => pickRoom(i)}
              className={`shrink-0 cursor-pointer rounded-full border border-solid px-5 py-2.5 text-sm font-semibold transition ${
                i === roomIdx
                  ? 'border-brand-red bg-brand-red text-white shadow-cta'
                  : 'border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:text-white'
              }`}
            >
              {r.name}
              <span className={`ml-2 rounded-full px-1.5 text-xs ${i === roomIdx ? 'bg-white/20' : 'bg-white/10'}`}>{r.spots.length}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
          {/* Photo + hotspots */}
          <div className="overflow-hidden rounded-3xl bg-white/5 shadow-2xl ring-1 ring-white/10 lg:flex lg:flex-col">
            <div className="relative lg:min-h-[420px] lg:flex-1" onClick={logPosition}>
              <img
                key={room.id}
                src={room.image}
                alt={room.imageAlt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`block aspect-[4/3] w-full object-cover transition-opacity duration-700 lg:absolute lg:inset-0 lg:aspect-auto lg:h-full ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

              {room.spots.map((s, i) => {
                const active = i === spotIdx;
                const labelLeft = s.x > 58; // keep the label inside the photo
                return (
                  <button
                    key={s.title}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); pickSpot(i); }}
                    aria-label={s.title}
                    aria-pressed={active}
                    className="group absolute z-[1] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-2"
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  >
                    <span className="relative flex h-7 w-7 items-center justify-center sm:h-8 sm:w-8">
                      <span className={`absolute inline-flex h-full w-full rounded-full ${active ? 'bg-brand-red/70' : 'bg-white/60'} animate-ping`} />
                      <span
                        className={`relative flex h-7 w-7 items-center justify-center rounded-full text-xs shadow-lg ring-2 transition sm:h-8 sm:w-8 ${
                          active ? 'rotate-45 bg-brand-red text-white ring-white' : 'bg-white text-brand-navy ring-white/40 group-hover:scale-110'
                        }`}
                      >
                        <PlusOutlined />
                      </span>
                    </span>
                    {/* label on the active point (tablet and up) */}
                    <span
                      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-navy shadow-lg transition sm:block ${
                        labelLeft ? 'right-full mr-1' : 'left-full ml-1'
                      } ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Current detail under the photo (phones) */}
            <div aria-live="polite" className="bg-white px-4 py-3 text-brand-navy sm:hidden">
              <p className="m-0 text-sm font-semibold">{spotIdx + 1}. {spot.title}</p>
              <p className="m-0 mt-0.5 text-xs leading-snug text-gray-600">{spot.text}</p>
            </div>
          </div>

          {/* Details panel: every room is in the page, only the active one is shown */}
          {rooms.map((r, ri) => (
            <div
              key={r.id}
              id={`room-panel-${r.id}`}
              role="tabpanel"
              aria-labelledby={`room-tab-${r.id}`}
              hidden={ri !== roomIdx}
              className={`${ri === roomIdx ? 'flex' : 'hidden'} flex-col rounded-3xl border border-solid border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:p-7`}
            >
              <h3 className="m-0 text-2xl font-semibold">{r.name} interiors</h3>
              <p className="m-0 mt-1.5 text-sm text-white/65">{r.intro}</p>

              <ol className="m-0 mt-5 flex list-none flex-col gap-2 p-0">
                {r.spots.map((s, i) => {
                  const active = ri === roomIdx && i === spotIdx;
                  return (
                    <li key={s.title}>
                      <button
                        type="button"
                        onClick={() => pickSpot(i)}
                        aria-expanded={active}
                        className={`flex w-full cursor-pointer items-start gap-3 rounded-2xl border border-solid p-3 text-left transition ${
                          active ? 'border-brand-red/60 bg-brand-red/10' : 'border-transparent bg-transparent hover:bg-white/5'
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            active ? 'bg-brand-red text-white' : 'bg-white/10 text-white/70'
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[15px] font-semibold text-white">{s.title}</span>
                          <span className="block text-sm leading-relaxed text-white/65">{s.text}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={openForm}
                  className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border-0 bg-brand-red px-5 text-sm sm:flex-1 font-semibold text-white shadow-cta transition hover:bg-brand-red-dark"
                >
                  {cta} <ArrowRightOutlined />
                </button>
                <Link
                  to={r.link}
                  className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-solid border-white/25 px-5 text-sm sm:flex-1 font-semibold text-white no-underline transition hover:border-white hover:bg-white/5"
                >
                  Explore {r.name} designs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
