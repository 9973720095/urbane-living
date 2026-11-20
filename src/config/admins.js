// Admin panel access: ONLY these Google accounts can open /admin-dashboard.
// To give someone access, add their email on a new line (in quotes, with a comma).
// Login.js and AdminDashboard.js both read this list.
export const ADMIN_EMAILS = [
  "urbanelivingofficial@gmail.com",
  "askabhi139@gmail.com",
  "abhishek@urbaneliving.in",
  "digvijay@urbaneliving.in",
  "it@urbaneliving.in"
].map((e) => e.toLowerCase().trim());

export const isAdminEmail = (email) =>
  ADMIN_EMAILS.includes(String(email || '').toLowerCase().trim());