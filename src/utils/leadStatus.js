// Remembers (in this browser) that the visitor already sent a lead form,
// so the auto popup stops bothering them.
const KEY = 'ul_lead_sent_at';

export const markLeadSubmitted = () => {
  try { localStorage.setItem(KEY, String(Date.now())); } catch (e) { /* storage blocked */ }
};

export const leadSentWithinDays = (days) => {
  try {
    const at = Number(localStorage.getItem(KEY));
    return Boolean(at) && Date.now() - at < days * 24 * 60 * 60 * 1000;
  } catch (e) {
    return false;
  }
};