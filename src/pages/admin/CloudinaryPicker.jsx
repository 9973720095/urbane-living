// Photo picker for the admin panel: EVERY photo in our Cloudinary (not only the ones tagged "website").
// - The list comes from our backend (routes/cloudinaryRoutes.js, needs CLOUDINARY_URL in Render -> Environment).
//   If that is not set up yet, it falls back to the photos tagged "website".
// - Room chips (Bedroom, Kitchen, Living ...) from the photo name, folder and tags; the room of the page
//   being edited is picked by default (Bedroom page -> Bedroom photos).
// - Full photo in every tile (not cropped) + a large full preview.
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Empty, Input, Segmented, Select, Space, Spin, Switch, Tag, Tooltip } from 'antd';
import { CheckCircleFilled, ExpandOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { sizeCloudinary } from '../../data/media';

const CLOUD = 'nzqefovs';
const TAG_LIST_URL = `https://res.cloudinary.com/${CLOUD}/image/list/website.json`;
// Folders whose renders carry another company's logo: hidden unless "Show folders with other logos" is on
const LOGO_FOLDERS = ['4bhk project', 'yati', 'kitchen', 'samples', 'UrbaneLiving_Images'];
const isLogoFolder = (folder = '') => LOGO_FOLDERS.some((f) => folder === f || folder.startsWith(`${f}/`));

// room -> words in the photo name / folder / tags
const ROOMS = [
  ['Bedroom', /bed|\bmb\b|mb[-_ ]|master|guest[_ -]?room|bedroom|\bbr\b/i],
  ['Kids', /kid|child|bunk|nursery/i],
  ['Wardrobe', /wardrobe|closet|almirah/i],
  ['Kitchen', /kitch|kiitchen|modular/i],
  ['Living', /living|lounge|hall|\btv\b|drawing/i],
  ['Dining', /dining|crockery/i],
  ['Bathroom', /bath|toilet|washroom|vanity|powder/i],
  ['Ceiling', /ceiling|pop|gypsum|cove/i],
  ['Pooja & Study', /pooja|puja|mandir|study|prayer/i],
];
const roomsOf = (x) => {
  const text = `${x.name} ${x.id || ''} ${x.folder} ${(x.tags || []).join(' ')}`;
  return ROOMS.filter(([, re]) => re.test(text)).map(([r]) => r);
};
// page being edited -> room to show first
export const roomForPage = (page = '', section = '') => {
  const t = `${page} ${section}`;
  if (/wardrobe/i.test(t)) return 'Wardrobe';
  if (/bedroom/i.test(t)) return 'Bedroom';
  if (/kitchen/i.test(t)) return 'Kitchen';
  if (/living/i.test(t)) return 'Living';
  if (/bath/i.test(t)) return 'Bathroom';
  if (/false ceiling/i.test(t)) return 'Ceiling';
  return 'All';
};

// why the full list could not be loaded -> short reason + what to do
const whyText = (w) => {
  const st = w?.status;
  if (st === 404) return 'the new backend is not live yet';
  if (st === 503) return 'CLOUDINARY_URL is not set on Render';
  if (st === 502) return 'Cloudinary refused the key';
  if (st === 401 || st === 403) return 'admin login was not accepted';
  return 'the backend did not answer';
};
const whyFix = (w) => {
  const st = w?.status;
  if (st === 404) return 'Render → backend service → Manual Deploy → “Deploy latest commit”, wait till it is “Live”, then press Try again.';
  if (st === 503) return 'Render → backend service → Environment → add CLOUDINARY_URL (Cloudinary → Settings → API Keys → “API environment variable”, it starts with cloudinary://) → Save, Rebuild and Deploy.';
  if (st === 502) return 'Copy the CLOUDINARY_URL again from Cloudinary (account nzqefovs, the full line starting with cloudinary://), paste it in Render → Environment, save and redeploy.';
  if (st === 401 || st === 403) return 'Log out of the admin panel, log in again, then press Try again.';
  return 'The backend may be waking up (Render free plan takes up to 1 minute). Wait a moment, then press Try again.';
};

// photos are loaded once per admin visit
let cached = null;

export default function CloudinaryPicker({ apiBase, value, onChange, defaultRoom = 'All' }) {
  const [photos, setPhotos] = useState(cached ? cached.photos : null);
  const [source, setSource] = useState(cached ? cached.source : '');
  const [why, setWhy] = useState(cached ? cached.why : null); // why the full list could not be loaded
  const [room, setRoom] = useState(defaultRoom);
  const [folder, setFolder] = useState('');
  const [q, setQ] = useState('');
  const [showLogoFolders, setShowLogoFolders] = useState(false);
  const [big, setBig] = useState('');

  const load = (refresh) => {
    setPhotos(null);
    axios
      .get(`${apiBase}/api/cloudinary/images`, { params: refresh ? { refresh: 1 } : {} })
      .then((r) => ({ photos: r.data.photos || [], source: 'all', why: null }))
      .catch((err) => fetch(TAG_LIST_URL)
        .then((r) => r.json())
        .then((d) => ({
          source: 'tagged',
          why: { status: err.response?.status || 0, text: err.response?.data?.error || err.message || '' },
          photos: (d.resources || []).map((x) => ({
            url: `https://res.cloudinary.com/${CLOUD}/image/upload/v${x.version}/${x.public_id}.${x.format}`,
            name: x.public_id.split('/').pop(),
            id: x.public_id,
            folder: x.asset_folder || '',
            tags: ['website'],
            width: x.width,
            height: x.height,
          })),
        }))
        .catch(() => ({ photos: [], source: 'tagged', why: { status: err.response?.status || 0, text: err.message || '' } })))
      .then((res) => {
        const list = res.photos
          .filter((x) => ['png', 'jpg', 'jpeg', 'webp', undefined].includes(x.format) || /\.(png|jpe?g|webp)$/i.test(x.url))
          .map((x) => ({ ...x, rooms: roomsOf(x) }));
        cached = { photos: list, source: res.source, why: res.why };
        setPhotos(list);
        setSource(res.source);
        setWhy(res.why);
      });
  };
  useEffect(() => { if (!cached) load(false); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const base = useMemo(() => (photos || []).filter((x) => showLogoFolders || !isLogoFolder(x.folder)), [photos, showLogoFolders]);
  const counts = useMemo(() => {
    const c = { All: base.length };
    ROOMS.forEach(([r]) => { c[r] = base.filter((x) => x.rooms.includes(r)).length; });
    return c;
  }, [base]);
  const folders = useMemo(() => [...new Set(base.map((x) => x.folder).filter(Boolean))].sort(), [base]);

  // a room with no photos would show nothing: then show all
  const activeRoom = room !== 'All' && !counts[room] ? 'All' : room;
  const shown = base
    .filter((x) => activeRoom === 'All' || x.rooms.includes(activeRoom))
    .filter((x) => !folder || x.folder === folder)
    .filter((x) => !q || `${x.name} ${x.id} ${x.folder} ${(x.tags || []).join(' ')}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      {source === 'tagged' && (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 10 }}
          message={`Only photos tagged “website” are shown. Reason: ${whyText(why)}`}
          description={
            <span>
              {whyFix(why)}{' '}
              <Button size="small" type="link" style={{ padding: 0 }} onClick={() => { cached = null; load(true); }}>Try again</Button>
              <span style={{ display: 'block', fontSize: 11, color: '#999', marginTop: 4 }}>
                Server answer: {why?.status || 'no answer'} {why?.text ? `· ${String(why.text).slice(0, 160)}` : ''}
              </span>
            </span>
          }
        />
      )}
      <Space wrap style={{ marginBottom: 8 }}>
        <Segmented
          size="small"
          value={activeRoom}
          onChange={setRoom}
          options={['All', ...ROOMS.map(([r]) => r)].map((r) => ({ value: r, label: `${r} (${counts[r] || 0})`, disabled: r !== 'All' && !counts[r] }))}
        />
      </Space>
      <Space wrap style={{ marginBottom: 10 }}>
        <Input allowClear prefix={<SearchOutlined />} placeholder="Search name, folder or tag" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 260 }} />
        <Select allowClear placeholder="All folders" value={folder || undefined} onChange={(v) => setFolder(v || '')} style={{ minWidth: 200 }} options={folders.map((f) => ({ value: f, label: f }))} showSearch />
        <Space size={4}>
          <Switch size="small" checked={showLogoFolders} onChange={setShowLogoFolders} />
          <span style={{ fontSize: 12 }}>Show folders with other logos</span>
        </Space>
        <Tooltip title="Load the list again (after a new upload)">
          <Button size="small" icon={<ReloadOutlined />} onClick={() => { cached = null; load(true); }} />
        </Tooltip>
        {photos && <Tag>{shown.length} of {base.length} photos</Tag>}
      </Space>

      {photos === null ? (
        <div style={{ textAlign: 'center', padding: 30 }}><Spin /></div>
      ) : shown.length === 0 ? (
        <Empty description="No photos here. Try All or another folder." />
      ) : (
        <div style={{ maxHeight: 420, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, paddingRight: 4 }}>
          {shown.map((x) => {
            const active = value === x.url;
            return (
              <div
                key={x.url}
                style={{ position: 'relative', border: active ? '3px solid #E40B12' : '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#f1f3f7' }}
              >
                <button
                  type="button"
                  onClick={() => onChange(x.url)}
                  title={`${x.folder ? `${x.folder} / ` : ''}${x.name}`}
                  style={{ display: 'block', width: '100%', padding: 0, border: 0, background: 'transparent', cursor: 'pointer' }}
                >
                  {/* full photo, not cropped */}
                  <img src={sizeCloudinary(x.url, 360)} alt={x.name} loading="lazy" style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'contain' }} />
                  <span style={{ display: 'block', padding: '4px 6px', fontSize: 10, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', background: '#fff' }}>
                    {x.folder ? `${x.folder} / ` : ''}{x.name}
                  </span>
                </button>
                <Tooltip title="See full size">
                  <Button size="small" shape="circle" icon={<ExpandOutlined />} onClick={() => setBig(x.url)} style={{ position: 'absolute', top: 6, left: 6, opacity: 0.9 }} />
                </Tooltip>
                {active && <CheckCircleFilled style={{ position: 'absolute', top: 6, right: 6, color: '#E40B12', fontSize: 20, background: '#fff', borderRadius: '50%' }} />}
              </div>
            );
          })}
        </div>
      )}
      <div style={{ fontSize: 12, color: '#b45309', marginTop: 8 }}>
        Check the photo before saving: no other company&apos;s logo or watermark (e.g. in a corner).
      </div>

      {big && (
        <div
          role="presentation"
          onClick={() => setBig('')}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out' }}
        >
          <img src={sizeCloudinary(big, 1600)} alt="Full size" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 8 }} />
          <Button
            type="primary"
            onClick={(e) => { e.stopPropagation(); onChange(big); setBig(''); }}
            style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)' }}
          >
            Use this photo
          </Button>
        </div>
      )}
    </div>
  );
}
