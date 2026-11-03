import React from 'react';

// Shared Vastu artwork: emblem, floor plan line art and the 8-direction compass ring.

const DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const SECTOR_COLORS = ['#E40B12', '#26345A', '#4167B3', '#26345A', '#1F2A44', '#26345A', '#4167B3', '#26345A'];

// point on a circle; angle in degrees clockwise from the top
const pt = (cx, cy, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
};

const sectorPath = (cx, cy, r1, r2, from, to) => {
  const [x1, y1] = pt(cx, cy, r2, from);
  const [x2, y2] = pt(cx, cy, r2, to);
  const [x3, y3] = pt(cx, cy, r1, to);
  const [x4, y4] = pt(cx, cy, r1, from);
  return `M${x1} ${y1} A${r2} ${r2} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${r1} ${r1} 0 0 0 ${x4} ${y4} Z`;
};

/* Disha mark: 8-point compass star in the logo colours (red north, blue east-west, navy ring) */
export function DishaMark({ className = '' }) {
  const star = (len, w, rot, fill) => (
    <path d={`M100 ${100 - len} L${100 + w} 100 L100 ${100 + len} L${100 - w} 100 Z`} fill={fill} transform={`rotate(${rot} 100 100)`} />
  );
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Disha compass">
      <circle cx="100" cy="100" r="94" fill="#1F2A44" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="#FFB800" strokeWidth="1.5" strokeDasharray="2 5" />
      {star(70, 12, 45, '#4167B3')}
      {star(70, 12, 135, '#4167B3')}
      {star(80, 16, 90, '#E8ECF5')}
      <path d="M100 20 L116 100 H84 Z" fill="#E40B12" />
      <path d="M100 180 L116 100 H84 Z" fill="#E8ECF5" />
      <circle cx="100" cy="100" r="12" fill="#FFB800" stroke="#1F2A44" strokeWidth="4" />
    </svg>
  );
}


/* Decorative floor plan line art with N / S / E / W labels */
export function PlanSketch({ className = '' }) {
  return (
    <svg viewBox="0 0 320 300" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <text x="160" y="16" textAnchor="middle" fontSize="12" letterSpacing="2" fill="currentColor" stroke="none">NORTH</text>
      <text x="160" y="296" textAnchor="middle" fontSize="12" letterSpacing="2" fill="currentColor" stroke="none">SOUTH</text>
      <text x="10" y="150" textAnchor="middle" fontSize="12" letterSpacing="2" fill="currentColor" stroke="none" transform="rotate(-90 10 150)">WEST</text>
      <text x="310" y="150" textAnchor="middle" fontSize="12" letterSpacing="2" fill="currentColor" stroke="none" transform="rotate(90 310 150)">EAST</text>
      <rect x="30" y="30" width="260" height="240" strokeWidth="2" />
      <path d="M30 120 H130 V30 M130 120 V200 H30 M130 160 H200 V270 M200 160 V90 H290 M200 90 V30 M240 160 H290" strokeWidth="1.5" />
      <path d="M60 30 A30 30 0 0 1 90 60 M130 140 A20 20 0 0 1 150 160 M200 120 A20 20 0 0 0 220 140" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M30 30 L290 270 M290 30 L30 270" strokeWidth="0.6" strokeDasharray="2 6" />
    </svg>
  );
}

/*
  8-direction compass ring. `north` = degrees clockwise from the top where real north points.
  Labels stay upright while the ring turns.
*/
export function CompassRing({ north = 0, className = '' }) {
  const c = 200;
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <circle cx={c} cy={c} r="198" fill="#F7F8FB" />
      <g transform={`rotate(${north} ${c} ${c})`} style={{ transition: 'transform 0.25s ease' }}>
        {DIRS.map((d, i) => (
          <path
            key={d}
            d={sectorPath(c, c, 150, 194, i * 45 - 22.5, i * 45 + 22.5)}
            fill={SECTOR_COLORS[i]}
            fillOpacity={i === 0 ? 1 : 0.92}
            stroke="#F7F8FB"
            strokeWidth="2"
          />
        ))}
        {Array.from({ length: 72 }).map((_, i) => {
          const [x1, y1] = pt(c, c, 146, i * 5);
          const [x2, y2] = pt(c, c, i % 9 === 0 ? 132 : 140, i * 5);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 9 === 0 ? '#FFB800' : '#CBD5E1'} strokeWidth={i % 9 === 0 ? 2.5 : 1} />;
        })}
        {DIRS.map((d, i) => {
          const [x, y] = pt(c, c, 172, i * 45);
          return (
            <text
              key={d}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={d.length > 1 ? 16 : 24}
              fontWeight="700"
              fill={d === 'N' ? '#ffffff' : d.length > 1 ? '#C7D2EA' : '#ffffff'}
              transform={`rotate(${-north} ${x} ${y})`}
            >
              {d}
            </text>
          );
        })}
        <path d={`M${c} 108 L${c - 10} 128 H${c + 10} Z`} fill="#E40B12" />
      </g>
    </svg>
  );
}

/* Zone guide drawn over the plan: 8 slices + the centre box, turned to match north */
export function ZoneOverlay({ north = 0 }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <rect x="33.33" y="33.33" width="33.33" height="33.33" fill="rgba(255,184,0,0.10)" stroke="rgba(228,11,18,0.45)" strokeWidth="0.3" strokeDasharray="1 1" />
      {DIRS.map((d, i) => {
        const deg = i * 45 + 22.5 + north;
        const [x, y] = pt(50, 50, 75, deg);
        return <line key={d} x1="50" y1="50" x2={x} y2={y} stroke="rgba(65,103,179,0.45)" strokeWidth="0.3" strokeDasharray="1.2 1" />;
      })}
    </svg>
  );
}
