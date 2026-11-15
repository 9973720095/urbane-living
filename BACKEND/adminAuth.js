// Admin-only API protection.
// The admin panel logs in with Google (Firebase). Every admin request sends the Firebase ID token:
//   Authorization: Bearer <token>
// This file checks that token with Google's public keys (no extra npm package, no secret needed)
// and lets the request through only when the email is in the admin list.
//
// Settings (Render -> Environment, optional):
//   ADMIN_EMAILS         comma separated admin emails (default: the list below)
//   FIREBASE_PROJECT_ID  Firebase project of the admin login (default: urbane-admin)

const https = require('https');
const crypto = require('crypto');

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'urbane-admin';

// Keep this list the same as src/config/admins.js on the website
const DEFAULT_ADMINS = [
  'sabankumarjha9@gmail.com',
  'urbaneliving.in@gmail.com',
  'askabhi139@gmail.com',
  'jhas08387@gmail.com',
];

const adminEmails = () =>
  (process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : DEFAULT_ADMINS)
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

const CERTS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

// Google's signing certificates, cached as long as Google allows (Cache-Control max-age)
let certCache = { at: 0, maxAge: 0, certs: null };
const fetchCerts = () =>
  new Promise((resolve, reject) => {
    https
      .get(CERTS_URL, { timeout: 10000 }, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (c) => { body += c; });
        res.on('end', () => {
          if (res.statusCode !== 200) return reject(new Error(`Google certs HTTP ${res.statusCode}`));
          const age = /max-age=(\d+)/.exec(res.headers['cache-control'] || '');
          try {
            resolve({ certs: JSON.parse(body), maxAge: age ? Number(age[1]) * 1000 : 3600 * 1000 });
          } catch (e) { reject(e); }
        });
      })
      .on('timeout', function onTimeout() { this.destroy(new Error('Google certs timed out')); })
      .on('error', reject);
  });

const getCerts = async () => {
  if (certCache.certs && Date.now() - certCache.at < certCache.maxAge) return certCache.certs;
  const { certs, maxAge } = await fetchCerts();
  certCache = { at: Date.now(), maxAge, certs };
  return certs;
};

const b64urlJson = (part) => JSON.parse(Buffer.from(part, 'base64url').toString('utf8'));

// Returns the token's data when it is a valid Firebase ID token of this project, else throws
const verifyFirebaseToken = async (token, certsLoader = getCerts) => {
  const parts = String(token || '').split('.');
  if (parts.length !== 3) throw new Error('Malformed token');
  const [h, p, s] = parts;
  const header = b64urlJson(h);
  const payload = b64urlJson(p);

  if (header.alg !== 'RS256') throw new Error('Wrong algorithm');
  const certs = await certsLoader();
  const cert = certs[header.kid];
  if (!cert) throw new Error('Unknown signing key');

  const ok = crypto.verify('RSA-SHA256', Buffer.from(`${h}.${p}`), cert, Buffer.from(s, 'base64url'));
  if (!ok) throw new Error('Bad signature');

  const now = Math.floor(Date.now() / 1000);
  if (payload.aud !== PROJECT_ID) throw new Error('Token is for another project');
  if (payload.iss !== `https://securetoken.google.com/${PROJECT_ID}`) throw new Error('Wrong issuer');
  if (!payload.sub) throw new Error('No user');
  if (!(payload.exp > now - 30)) throw new Error('Token expired');
  if (payload.iat > now + 300) throw new Error('Token from the future');
  return payload;
};

// Express middleware: only logged-in admins pass
const requireAdmin = async (req, res, next) => {
  try {
    const m = /^Bearer\s+(.+)$/i.exec(req.get('authorization') || '');
    if (!m) return res.status(401).json({ error: 'Admin login required' });
    const user = await verifyFirebaseToken(m[1]);
    const email = String(user.email || '').toLowerCase();
    if (!email || user.email_verified === false || !adminEmails().includes(email)) {
      return res.status(403).json({ error: 'This account is not an admin' });
    }
    req.admin = { email };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Admin login expired, please log in again' });
  }
};

// For tools that use the sheet sync key: x-sync-key = SHEET_SYNC_KEY, or an admin login
const requireAdminOrSyncKey = (req, res, next) => {
  const key = process.env.SHEET_SYNC_KEY;
  if (key && req.get('x-sync-key') === key) return next();
  return requireAdmin(req, res, next);
};

module.exports = { requireAdmin, requireAdminOrSyncKey, verifyFirebaseToken, adminEmails };