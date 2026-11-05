import useSeo from '../hooks/useSeo';

// Drop-in SEO for any route: <Seo {...pageSeo.support} /> (renders nothing)
export default function Seo(props) {
  useSeo(props);
  return null;
}