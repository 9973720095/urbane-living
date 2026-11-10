// Auto-open the "free consultation" form (InquiryModal) during a visit.
// A visit = one browser tab session. Coming back later (new tab / next day) = new visit,
// so the schedule starts again.
export const autoPopup = {
  enabled: true,

  // Seconds after the visit starts: 2 min, then 5 min, then 10 min (each shown once per visit).
  // Only once at 2 min? Use: delays: [120]
  delays: [120, 300, 600],

  // Never open on these pages (start of the path)
  skipPaths: ['/admin', '/estimate', '/vastu/analyze'],

  // After someone sends any lead form, stop auto-opening for this many days
  stopAfterLeadDays: 30,
};