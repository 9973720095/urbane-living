import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initMetaPixel, trackPageView, trackEvent } from '../utils/metaPixel';

// Meta Pixel for this single-page site: PageView on every page change,
// Contact event when someone taps a call or WhatsApp link anywhere on the site.
const MetaPixel = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    initMetaPixel();
    const onClick = (e) => {
      const link = e.target.closest && e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) trackEvent('Contact', { method: 'call' });
      else if (/wa\.me|whatsapp\.com/i.test(href)) trackEvent('Contact', { method: 'whatsapp' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    trackPageView();
  }, [pathname]);

  return null;
};

export default MetaPixel;