// Vastu maths for the floor plan tool. Rules and text live in data/vastu.js.
import { vastuRules } from '../data/vastu';

const DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const POINTS = { ideal: 100, okay: 65, avoid: 25 };

/*
  Zone of a point on the plan.
  fx, fy = position on the plan image (0..1 from left / top).
  north  = where real north points on the drawing, in degrees clockwise from the top of the plan.
  The middle ninth of the plan is the centre (Brahmasthan); the rest is split into 8 slices of 45°.
*/
export const zoneOf = (fx, fy, north) => {
  const dx = fx - 0.5;
  const dy = fy - 0.5;
  if (Math.abs(dx) < 1 / 6 && Math.abs(dy) < 1 / 6) return 'C';
  const onPlan = (Math.atan2(dx, -dy) * 180) / Math.PI; // clockwise from the top of the drawing
  const bearing = (((onPlan - north) % 360) + 360) % 360; // clockwise from real north
  return DIRS[Math.round(bearing / 45) % 8];
};

export const statusOf = (room, zone) => {
  if (room.ideal.includes(zone)) return 'ideal';
  if (room.avoid.includes(zone)) return 'avoid';
  return 'okay';
};

// marks = { roomId: { x, y } } (0..1 on the plan) → full report
export const buildReport = (marks, north) => {
  const list = vastuRules.rooms
    .filter((r) => marks[r.id])
    .map((room) => {
      const zone = zoneOf(marks[room.id].x, marks[room.id].y, north);
      return { room, zone, status: statusOf(room, zone) };
    });
  if (!list.length) return null;

  const score = Math.round(list.reduce((sum, x) => sum + POINTS[x.status], 0) / list.length);
  return {
    score,
    rating: vastuRules.ratings.find((x) => score >= x.min),
    list,
    strengths: list.filter((x) => x.status === 'ideal'),
    warnings: list.filter((x) => x.status === 'avoid'),
    okay: list.filter((x) => x.status === 'okay'),
  };
};

// One-line summary used for WhatsApp and the lead message
export const reportSummary = (report) =>
  [
    `Vastu score ${report.score}/100 (${report.rating.label})`,
    ...report.list.map((x) => `${x.room.name}: ${vastuRules.zones[x.zone]} (${x.status})`),
  ].join(' | ');

/* Reads an image or the first page of a PDF into a data URL (PDF.js is loaded from a CDN only when needed). */
const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const loadPdfJs = () =>
  window.pdfjsLib
    ? Promise.resolve(window.pdfjsLib)
    : new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = PDFJS;
        s.onload = () => {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
          resolve(window.pdfjsLib);
        };
        s.onerror = () => reject(new Error('Could not load the PDF reader'));
        document.head.appendChild(s);
      });

export const readPlanFile = async (file) => {
  if (file.type === 'application/pdf') {
    const pdfjs = await loadPdfJs();
    const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    return canvas.toDataURL('image/png');
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read this file'));
    reader.readAsDataURL(file);
  });
};
