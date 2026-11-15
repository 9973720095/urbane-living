// Meta Pixel + Google Analytics helpers.
// Both only run on the live site (never on localhost), so test leads stay out of Ads / Analytics data.
// Google Analytics itself is loaded by the Google tag in public/index.html.
import { metaPixelId } from '../data/config';
import { markLeadSubmitted } from './leadStatus';

const isLive = () => typeof window !== 'undefined' && window.location.hostname !== 'localhost';
const isEnabled = () => Boolean(metaPixelId) && isLive();

// Loads Meta's script once (official base code)
export const initMetaPixel = () => {
  if (!isEnabled() || window.fbq) return;
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('init', metaPixelId);
};

export const trackPageView = () => {
  if (isEnabled() && window.fbq) window.fbq('track', 'PageView');
};

// --- Google Analytics (GA4) ---
// Sends one event to Google Analytics. Empty values are left out.
const gaEvent = (name, params = {}) => {
  if (!isLive() || typeof window.gtag !== 'function') return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''));
  window.gtag('event', name, clean);
};

// "Contact" -> "contact", "CompleteRegistration" -> "complete_registration" (GA4 style names)
const toGaName = (name) => String(name).replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();

// --- Meta Pixel ---
const fbEvent = (name, params = {}, eventId) => {
  if (!isEnabled() || !window.fbq) return;
  window.fbq('track', name, params, eventId ? { eventID: eventId } : undefined);
};

// Standard event, e.g. trackEvent('Contact', { method: 'whatsapp' })
// Goes to Meta Pixel and Google Analytics.
export const trackEvent = (name, params = {}, eventId) => {
  fbEvent(name, params, eventId);
  gaEvent(toGaName(name), { ...params, page_path: window.location.pathname });
};

// Call after a lead is saved. No name / phone / email is sent to Meta or Google.
// Also remembers the lead in this browser, so the auto popup stops opening.
export const trackLead = ({ leadId, city, propertyType, form } = {}) => {
  markLeadSubmitted();

  // Meta Pixel: Lead
  fbEvent('Lead', {
    content_name: form || 'Website form',
    content_category: propertyType || undefined,
    city: city || undefined,
    page: window.location.pathname,
  }, leadId);

  // Google Analytics: generate_lead (GA4 recommended event name)
  gaEvent('generate_lead', {
    form_name: form || 'Website form',
    property_type: propertyType,
    city,
    page_path: window.location.pathname,
    lead_id: leadId,
  });
};