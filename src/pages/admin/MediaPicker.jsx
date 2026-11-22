// Pick a photo or video from our Cloudinary (tag "website"), or paste a Cloudinary link.
// Used by Admin -> Page Sections. Value = the full Cloudinary URL.
import React, { useEffect, useState } from 'react';
import { Button, Empty, Input, Modal, Space, Spin, Switch, Tabs } from 'antd';
import { CheckCircleFilled, PictureOutlined, PlayCircleFilled, SearchOutlined } from '@ant-design/icons';
import { sizeCloudinary } from '../../data/media';

const CLOUD = 'nzqefovs';
export const MEDIA_ALLOWED = /^https:\/\/res\.cloudinary\.com\/(nzqefovs|diosq0s7w)\/(image|video)\/upload\//;
// Folders whose renders carry another company's logo: hidden unless "Show all folders" is on
const HIDDEN_FOLDERS = ['4bhk project', 'yati', 'kitchen', 'samples', 'UrbaneLiving_Images'];
const isHiddenFolder = (folder = '') => HIDDEN_FOLDERS.some((f) => folder === f || folder.startsWith(`${f}/`));

export const isVideoUrl = (url = '') => url.includes('/video/upload/');
// Small preview of a photo or a still frame of a video
export const previewOf = (url, width = 300) =>
  isVideoUrl(url)
    ? url.replace('/video/upload/', `/video/upload/so_1,w_${width},q_auto,f_jpg/`).replace(/\.[^/.]+$/, '.jpg')
    : sizeCloudinary(url, width);

let libraryCache = null; // loaded once per admin session

const loadLibrary = async () => {
  if (libraryCache) return libraryCache;
  const list = async (type) => {
    try {
      const r = await fetch(`https://res.cloudinary.com/${CLOUD}/${type}/list/website.json`);
      if (!r.ok) return [];
      const d = await r.json();
      return (d.resources || []).map((x) => ({
        url: `https://res.cloudinary.com/${CLOUD}/${type}/upload/v${x.version}/${x.public_id}.${x.format}`,
        name: x.public_id,
        folder: x.asset_folder || '',
        type,
        created: x.created_at || '',
      }));
    } catch (e) {
      return [];
    }
  };
  const [images, videos] = await Promise.all([list('image'), list('video')]);
  libraryCache = [...videos, ...images.filter((x) => ['png', 'jpg', 'jpeg', 'webp'].includes(x.url.split('.').pop()))]
    .sort((a, b) => String(b.created).localeCompare(String(a.created)));
  return libraryCache;
};

export default function MediaPicker({ value, onChange, allowVideo = true }) {
  const [open, setOpen] = useState(false);
  const [library, setLibrary] = useState(null);
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [pick, setPick] = useState(value || '');

  useEffect(() => {
    if (open && !library) loadLibrary().then(setLibrary);
  }, [open, library]);

  const shown = (library || [])
    .filter((x) => allowVideo || x.type === 'image')
    .filter((x) => showAll || !isHiddenFolder(x.folder))
    .filter((x) => !search || `${x.name} ${x.folder}`.toLowerCase().includes(search.toLowerCase()));

  const openPicker = () => { setPick(value || ''); setSearch(''); setOpen(true); };

  return (
    <>
      <Space align="start" wrap>
        <button
          type="button"
          onClick={openPicker}
          style={{ width: 120, aspectRatio: '4 / 3', border: '1px dashed #c9ced6', borderRadius: 8, background: '#f7f8fb', cursor: 'pointer', padding: 0, overflow: 'hidden', position: 'relative' }}
          aria-label={value ? 'Change photo or video' : 'Choose photo or video'}
        >
          {value ? (
            <>
              <img src={previewOf(value, 240)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {isVideoUrl(value) && <PlayCircleFilled style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 26, color: '#fff' }} />}
            </>
          ) : (
            <span style={{ color: '#888', fontSize: 12 }}><PictureOutlined style={{ fontSize: 20, display: 'block', marginBottom: 4 }} />Choose</span>
          )}
        </button>
        {value && <Button size="small" onClick={() => onChange?.('')}>Remove</Button>}
      </Space>

      <Modal
        open={open}
        title={allowVideo ? 'Choose a photo or video' : 'Choose a photo'}
        onCancel={() => setOpen(false)}
        onOk={() => { onChange?.(pick); setOpen(false); }}
        okText="Use this"
        okButtonProps={{ disabled: !!pick && !MEDIA_ALLOWED.test(pick) }}
        width={980}
        destroyOnHidden
      >
        <Tabs
          items={[
            {
              key: 'library',
              label: 'Our Cloudinary',
              children: (
                <>
                  <Space wrap style={{ marginBottom: 12 }}>
                    <Input
                      allowClear
                      prefix={<SearchOutlined />}
                      placeholder="Search by name or folder"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ width: 320 }}
                    />
                    <Space>
                      <Switch size="small" checked={showAll} onChange={setShowAll} />
                      <span style={{ fontSize: 12 }}>Show all folders (some have another company&apos;s logo)</span>
                    </Space>
                  </Space>
                  {library === null ? (
                    <div style={{ textAlign: 'center', padding: 30 }}><Spin /></div>
                  ) : shown.length === 0 ? (
                    <Empty description='Nothing found. In Cloudinary, add the tag "website" to the photos and videos you want to use.' />
                  ) : (
                    <div style={{ maxHeight: 420, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
                      {shown.map((x) => {
                        const active = pick === x.url;
                        return (
                          <button
                            key={x.url}
                            type="button"
                            onClick={() => setPick(x.url)}
                            title={`${x.folder ? `${x.folder} / ` : ''}${x.name}`}
                            style={{ position: 'relative', padding: 0, border: active ? '3px solid #E40B12' : '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', background: '#f5f5f5' }}
                          >
                            <img src={previewOf(x.url, 280)} alt={x.name} loading="lazy" style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
                            {x.type === 'video' && <PlayCircleFilled style={{ position: 'absolute', top: 8, left: 8, fontSize: 20, color: '#fff' }} />}
                            <span style={{ display: 'block', padding: '4px 6px', fontSize: 10, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {x.folder || x.name}
                            </span>
                            {active && <CheckCircleFilled style={{ position: 'absolute', top: 6, right: 6, color: '#E40B12', fontSize: 20, background: '#fff', borderRadius: '50%' }} />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              ),
            },
            {
              key: 'link',
              label: 'Paste a Cloudinary link',
              children: (
                <>
                  <Input
                    placeholder="https://res.cloudinary.com/nzqefovs/image/upload/v123/photo.png"
                    value={pick}
                    onChange={(e) => setPick(e.target.value.trim())}
                    status={pick && !MEDIA_ALLOWED.test(pick) ? 'error' : undefined}
                  />
                  <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>
                    Only links from our Cloudinary (res.cloudinary.com/nzqefovs/...) are accepted{allowVideo ? ', photo or video' : ''}.
                  </div>
                </>
              ),
            },
          ]}
        />
      </Modal>
    </>
  );
}
