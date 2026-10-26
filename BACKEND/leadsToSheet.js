// Copies website leads into Google Sheet (Leads tab) through a Google Apps Script web app.
// Env: LEADS_SHEET_WEBHOOK_URL (Apps Script /exec URL), LEADS_SHEET_SECRET (same secret as in the script)
// If the URL is not set, nothing is sent and the website works as before.

const toRow = (lead) => ({
  id: String(lead._id),
  date: (lead.date ? new Date(lead.date) : new Date()).toISOString(),
  name: lead.name || '',
  phone: lead.phone || '',
  email: lead.email || '',
  state: lead.state || '',
  propertyType: lead.propertyType || '',
  message: lead.message || '',
});

// Sends leads (new or updated) to the sheet; the script adds new rows or updates existing ones by ID
const sendLeadsToSheet = async (leads) => {
  const url = process.env.LEADS_SHEET_WEBHOOK_URL;
  if (!url || !leads.length) return { skipped: true };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: process.env.LEADS_SHEET_SECRET || '', leads: leads.map(toRow) }),
    signal: AbortSignal.timeout(20000),
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error(`Sheet webhook returned non-JSON (HTTP ${res.status})`); }
  if (!data.ok) throw new Error(`Sheet webhook error: ${data.error || 'unknown'}`);
  return data;
};

// Sends all leads in batches (used once to copy old leads, or any time to re-sync)
const syncAllLeadsToSheet = async (Lead, batchSize = 200) => {
  const leads = await Lead.find().sort({ date: 1 }).lean();
  let added = 0, updated = 0;
  for (let i = 0; i < leads.length; i += batchSize) {
    const r = await sendLeadsToSheet(leads.slice(i, i + batchSize));
    if (r.skipped) return { skipped: true, reason: 'LEADS_SHEET_WEBHOOK_URL not set' };
    added += r.added || 0;
    updated += r.updated || 0;
  }
  return { total: leads.length, added, updated };
};

module.exports = { sendLeadsToSheet, syncAllLeadsToSheet };