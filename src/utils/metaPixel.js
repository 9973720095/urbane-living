// Meta Pixel helpers. The pixel only runs on the live site (never on localhost), so test leads stay out of Ads data.
import { metaPixelId } from '../data/config';

const isEnabled = () => Boolean(metaPixelId) && typeof window !== 'undefined' && window.location.hostname !== 'localhost';

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

// Standard event, e.g. trackEvent('Contact', { method: 'whatsapp' })
export const trackEvent = (name, params = {}, eventId) => {
  if (!isEnabled() || !window.fbq) return;
  window.fbq('track', name, params, eventId ? { eventID: eventId } : undefined);
};

// Call after a lead is saved. No name / phone / email is sent to Meta.
export const trackLead = ({ leadId, city, propertyType, form } = {}) =>
  trackEvent('Lead', {
    content_name: form || 'Website form',
    content_category: propertyType || undefined,
    city: city || undefined,
    page: window.location.pathname,
  }, leadId);