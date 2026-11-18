// Admin -> Website Images: change any photo on the website, page by page and section by section.
// Every photo "slot" comes from the website code (data/media.js -> slot()), so new sections show up here
// automatically. Photos are picked from our Cloudinary (tag "website") or pasted as a Cloudinary link.
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Col, Empty, Input, Modal, Popconfirm, Row, Select, Space, Spin, Switch, Tabs, Tag, message } from 'antd';
import { EditOutlined, ReloadOutlined, UndoOutlined, CheckCircleFilled, SearchOutlined } from '@ant-design/icons';
import { imageSlots, setImageOverrides, sizeCloudinary } from '../../data/media';
import { saveImageOverrides } from '../../utils/siteImages';

const CLOUD = 'nzqefovs';
const LIBRARY_URL = `https://res.cloudinary.com/${CLOUD}/image/list/website.json`;
const ALLOWED = /^https:\/\/res\.cloudinary\.com\/(nzqefovs|diosq0s7w)\/image\/upload\//;
// Folders whose renders carry another company's logo: hidden unless "Show all folders" is on
const HIDDEN_FOLDERS = ['4bhk project', 'yati', 'kitchen', 'samples', 'UrbaneLiving_Images'];
const isHiddenFolder = (folder = '') => HIDDEN_FOLDERS.some((f) => folder === f || folder.startsWith(`${f}/`));

const thumb = (url) => sizeCloudinary(url, 480);

export default function WebsiteImages({ apiBase }) {
  const [current, setCurrent] = useState({}); // { slotId: { url, alt } } saved in the database
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('');
  const [editing, setEditing] = useState(null); // slot being changed
  const [pick, setPick] = useState('');
  const [altText, setAltText] = useState('');
  const [saving, setSaving] = useState(false);
  const [library, setLibrary] = useState(null);
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const slots = useMemo(() => imageSlots(), []);
  const pages = useMemo(() => [...new Set(slots.map((s) => s.page))], [slots]);
  const shown = slots.filter((s) => s.page === (page || pages[0]));

  const load = () => {
    setLoading(true);
    axios
      .get(`${apiBase}/api/site-images`, { params: { t: Date.now() } })
      .then((r) => setCurrent(r.data || {}))
      .catch(() => message.error('Could not load the saved photos. Please try again.'))
      .finally(() => setLoading(false));
  };
  useEffect(load, [apiBase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Our Cloudinary photos tagged "website" (loaded when the picker opens the first time)
  useEffect(() => {
    if (!editing || library) return;
    fetch(LIBRARY_URL)
      .then((r) => r.json())
      .then((d) =>
        setLibrary(
          (d.resources || [])
            .filter((x) => ['png', 'jpg', 'jpeg', 'webp'].includes(x.format))
            .map((x) => ({
              url: `https://res.cloudinary.com/${CLOUD}/image/upload/v${x.version}/${x.public_id}.${x.format}`,
              name: x.public_id,
              folder: x.asset_folder || '',
            })),
        ),
      )
      .catch(() => setLibrary([]));
  }, [editing, library]);

  const libraryShown = (library || [])
    .filter((x) => showAll || !isHiddenFolder(x.folder))
    .filter((x) => !search || `${x.name} ${x.folder}`.toLowerCase().includes(search.toLowerCase()));

  const openEditor = (s) => {
    setEditing(s);
    setPick(current[s.id]?.url || '');
    setAltText(current[s.id]?.alt || '');
    setSearch('');
  };

  // Keep this browser's copy up to date, so the admin sees the change on the website straight away
  const applyLocally = (next) => {
    setCurrent(next);
    setImageOverrides(next);
    saveImageOverrides(next);
  };

  const save = async () => {
    if (!ALLOWED.test(pick)) {
      message.error('Please choose a photo from our Cloudinary (link must start with https://res.cloudinary.com/nzqefovs/image/upload/).');
      return;
    }
    if (altText.trim().length < 10) {
      message.error('Please describe the photo in a few words (for Google), e.g. "L-shaped kitchen with grey cabinets".');
      return;
    }
    setSaving(true);
    try {
      await axios.put(`${apiBase}/api/site-images/${encodeURIComponent(editing.id)}`, { url: pick, alt: altText.trim() });
      applyLocally({ ...current, [editing.id]: { url: pick, alt: altText.trim() } });
      message.success('Photo changed. Visitors see it on their next visit; Google after the next website build.');
      setEditing(null);
    } catch (err) {
      message.error(err.response?.data?.error || 'Save failed. Please log in again and retry.');
    } finally {
      setSaving(false);
    }
  };

  const reset = async (s) => {
    try {
      await axios.delete(`${apiBase}/api/site-images/${encodeURIComponent(s.id)}`);
      const next = { ...current };
      delete next[s.id];
      applyLocally(next);
      message.success('Back to the default photo.');
    } catch (err) {
      message.error(err.response?.data?.error || 'Reset failed.');
    }
  };

  const changedCount = Object.keys(current).length;

  return (
    <div>
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="Change any photo on the website, page by page."
        description={
          <span>
            Pick a page, then press <b>Change photo</b> on any section. Use only our own photos: no photo with another
            company's logo or name. Visitors see the new photo on their next visit; Google sees it after the next website build.
          </span>
        }
      />

      <Space wrap style={{ marginBottom: 16 }}>
        <Select
          value={page || pages[0]}
          onChange={setPage}
          style={{ minWidth: 280 }}
          options={pages.map((p) => ({
            value: p,
            label: `${p} (${slots.filter((s) => s.page === p).length})`,
          }))}
        />
        <Button icon={<ReloadOutlined />} onClick={load}>Refresh</Button>
        <Tag color={changedCount ? 'red' : 'default'}>{changedCount} photo{changedCount === 1 ? '' : 's'} changed</Tag>
      </Space>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin /></div>
      ) : (
        <Row gutter={[16, 16]}>
          {shown.map((s) => {
            const o = current[s.id];
            return (
              <Col key={s.id} xs={24} sm={12} lg={8}>
                <Card
                  size="small"
                  cover={
                    <img
                      src={o ? thumb(o.url) : s.default}
                      alt={s.section}
                      style={{ aspectRatio: '4 / 3', objectFit: 'cover', width: '100%' }}
                      loading="lazy"
                    />
                  }
                  actions={[
                    <Button key="edit" type="link" icon={<EditOutlined />} onClick={() => openEditor(s)}>Change photo</Button>,
                    o ? (
                      <Popconfirm key="reset" title="Go back to the default photo?" onConfirm={() => reset(s)}>
                        <Button type="link" danger icon={<UndoOutlined />}>Reset</Button>
                      </Popconfirm>
                    ) : (
                      <Button key="reset" type="link" disabled>Default</Button>
                    ),
                  ]}
                >
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{s.section || s.page}</div>
                  <div style={{ marginTop: 6 }}>
                    {o ? <Tag color="red">Changed</Tag> : <Tag>Default photo</Tag>}
                    <Tag style={{ fontSize: 11 }}>{s.id}</Tag>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <Modal
        open={!!editing}
        title={editing ? `${editing.page} › ${editing.section}` : ''}
        onCancel={() => setEditing(null)}
        onOk={save}
        okText="Save photo"
        confirmLoading={saving}
        width={980}
        destroyOnHidden
      >
        {editing && (
          <>
            <Tabs
              items={[
                {
                  key: 'library',
                  label: 'Choose from our Cloudinary',
                  children: (
                    <>
                      <Space wrap style={{ marginBottom: 12 }}>
                        <Input
                          allowClear
                          prefix={<SearchOutlined />}
                          placeholder="Search by name or folder (e.g. kitchen, bedroom, mr. aggarwal)"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          style={{ width: 360 }}
                        />
                        <Space>
                          <Switch size="small" checked={showAll} onChange={setShowAll} />
                          <span style={{ fontSize: 12 }}>Show all folders (some have another company's logo)</span>
                        </Space>
                      </Space>
                      {library === null ? (
                        <div style={{ textAlign: 'center', padding: 30 }}><Spin /></div>
                      ) : libraryShown.length === 0 ? (
                        <Empty description='No photos. In Cloudinary, add the tag "website" to the photos you want to use here.' />
                      ) : (
                        <div style={{ maxHeight: 420, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
                          {libraryShown.map((x) => {
                            const active = pick === x.url;
                            return (
                              <button
                                key={x.url}
                                type="button"
                                onClick={() => setPick(x.url)}
                                title={`${x.folder ? `${x.folder} / ` : ''}${x.name}`}
                                style={{
                                  position: 'relative',
                                  padding: 0,
                                  border: active ? '3px solid #E40B12' : '1px solid #e5e7eb',
                                  borderRadius: 8,
                                  overflow: 'hidden',
                                  cursor: 'pointer',
                                  background: '#f5f5f5',
                                }}
                              >
                                <img src={sizeCloudinary(x.url, 300)} alt={x.name} loading="lazy" style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
                                <span style={{ display: 'block', padding: '4px 6px', fontSize: 10, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {x.folder || '—'}
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
                    <Input
                      placeholder="https://res.cloudinary.com/nzqefovs/image/upload/v123/photo.png"
                      value={pick}
                      onChange={(e) => setPick(e.target.value.trim())}
                    />
                  ),
                },
              ]}
            />

            <Row gutter={16} style={{ marginTop: 16 }} align="middle">
              <Col xs={24} md={8}>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Preview</div>
                <img
                  src={pick ? sizeCloudinary(pick, 480) : editing.default}
                  alt="Preview"
                  style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 8, background: '#f5f5f5' }}
                />
              </Col>
              <Col xs={24} md={16}>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>What is in the photo? (for Google, 1 short line)</div>
                <Input.TextArea
                  rows={3}
                  maxLength={200}
                  showCount
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="e.g. L-shaped modular kitchen with grey cabinets and a black granite counter"
                />
                <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>
                  Tip: describe only what is visible. Do not write prices, offers or another company's name.
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </div>
  );
}
