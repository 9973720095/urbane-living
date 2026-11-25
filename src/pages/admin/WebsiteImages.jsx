// Admin -> Website Images: every photo on the website, page by page and section by section.
// - Change the photo, its alt text (Google) and its title
// - Galleries (lists of photos): hide a photo, change the order, ADD new photos, delete added photos
// - Search across all pages, filter by changed / hidden / added
// Photos come from the website code (data/media.js -> slot() and gallery()), so new sections show up here
// automatically. Saved in the backend (routes/siteImageRoutes.js). Whole new sections: Admin -> Page Sections.
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Alert, Badge, Button, Card, Col, Empty, Input, InputNumber, Modal, Popconfirm, Row, Segmented, Select, Space, Spin, Switch, Tabs, Tag, Tooltip, message,
} from 'antd';
import {
  CheckCircleFilled, DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, PlusOutlined, ReloadOutlined, SearchOutlined, UndoOutlined, AppstoreAddOutlined,
} from '@ant-design/icons';
import { imageGalleries, imageSlots, replaceImageOverrides, sizeCloudinary } from '../../data/media';
import { saveImageOverrides } from '../../utils/siteImages';
import CloudinaryPicker, { roomForPage } from './CloudinaryPicker';

const ALLOWED = /^https:\/\/res\.cloudinary\.com\/(nzqefovs|diosq0s7w)\/image\/upload\//;
const FIELD_LABEL = { style: 'Style (filter)', room: 'Room (filter)', category: 'Category tag' };

const thumb = (url) => sizeCloudinary(url, 480);
const newKey = (gid) => `${gid}.x-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// pages = image page labels (e.g. ['Bedroom page']): show only these pages (used inside the page's own admin tab)
export default function WebsiteImages({ apiBase, onOpenSections, pages: onlyPages }) {
  const [current, setCurrent] = useState({}); // { photoId: { url, alt, title, hidden, order, extra, collection, style, room, category } }
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(null); // { mode: 'edit' | 'add', photo, gallery }
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const slots = useMemo(() => imageSlots(), []);
  const galleries = useMemo(() => imageGalleries(), []);
  const galleryById = useMemo(() => Object.fromEntries(galleries.map((g) => [g.id, g])), [galleries]);

  // Every photo as one row: website photos + photos the admin added to galleries
  const photos = useMemo(() => {
    const position = {};
    const rows = slots.map((s) => {
      if (s.collection) position[s.collection] = (position[s.collection] || 0) + 1;
      const o = current[s.id] || {};
      return {
        ...s,
        o,
        extra: false,
        defaultOrder: s.collection ? position[s.collection] * 10 : undefined,
        changed: !!(o.url || o.alt || o.title || o.style || o.room || o.category || typeof o.order === 'number'),
      };
    });
    Object.entries(current)
      .filter(([, o]) => o && o.extra && galleryById[o.collection])
      .forEach(([id, o], n) => {
        const g = galleryById[o.collection];
        rows.push({ id, page: g.page, section: g.section, collection: g.id, item: o.title || 'Added photo', o, extra: true, defaultOrder: 1000 + n, changed: true, default: thumb(o.url) });
      });
    return onlyPages ? rows.filter((r) => onlyPages.includes(r.page)) : rows;
  }, [slots, current, galleryById, onlyPages]);

  const pages = useMemo(() => [...new Set(photos.map((p) => p.page))], [photos]);
  const activePage = page || pages[0];

  const matches = (p) => {
    if (filter === 'Changed' && !(p.changed && !p.extra)) return false;
    if (filter === 'Hidden' && !p.o.hidden) return false;
    if (filter === 'Added' && !p.extra) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return `${p.page} ${p.section} ${p.item} ${p.id} ${p.o.title || ''} ${p.defaultTitle || ''}`.toLowerCase().includes(q);
  };
  // when searching / filtering: all pages; else the chosen page
  const visible = photos.filter((p) => (onlyPages || search || filter !== 'All' ? true : p.page === activePage)).filter(matches);

  // group by page › section
  const groups = useMemo(() => {
    const map = new Map();
    visible.forEach((p) => {
      const k = `${p.page} › ${p.section || 'Photo'}`;
      if (!map.has(k)) map.set(k, { key: k, page: p.page, section: p.section || 'Photo', collection: p.collection, items: [] });
      map.get(k).items.push(p);
    });
    // galleries with nothing visible yet (so "Add photo" is always reachable on its page)
    if (!search && filter === 'All') {
      galleries.filter((g) => (onlyPages ? onlyPages.includes(g.page) : g.page === activePage)).forEach((g) => {
        const k = `${g.page} › ${g.section}`;
        if (!map.has(k)) map.set(k, { key: k, page: g.page, section: g.section, collection: g.id, items: [] });
      });
    }
    // page by page; on each page the top banner first, then the sections in website order
    const pageIndex = (pg) => pages.indexOf(pg);
    const list = [...map.values()].sort((a, b) => (pageIndex(a.page) - pageIndex(b.page))
      || ((/banner/i.test(b.section) ? 1 : 0) - (/banner/i.test(a.section) ? 1 : 0)));
    list.forEach((grp) => {
      if (grp.collection) {
        grp.items.sort((a, b) => (a.o.order ?? a.defaultOrder) - (b.o.order ?? b.defaultOrder));
      }
    });
    return list;
  }, [visible, galleries, activePage, search, filter, onlyPages, pages]);

  const load = () => {
    setLoading(true);
    axios
      .get(`${apiBase}/api/site-images`, { params: { t: Date.now() } })
      .then((r) => setCurrent(r.data || {}))
      .catch(() => message.error('Could not load the saved photos. Please try again.'))
      .finally(() => setLoading(false));
  };
  useEffect(load, [apiBase]); // eslint-disable-line react-hooks/exhaustive-deps


  // Keep this browser's copy up to date, so the admin sees the change on the website straight away
  const applyLocally = (next) => {
    setCurrent(next);
    replaceImageOverrides(next);
    saveImageOverrides(next);
  };

  const openEdit = (p) => {
    const o = p.o || {};
    setEditing({ mode: 'edit', photo: p, gallery: p.collection ? galleryById[p.collection] : null });
    setForm({
      url: o.url || '',
      alt: o.alt || '',
      title: o.title || '',
      hidden: !!o.hidden,
      order: typeof o.order === 'number' ? o.order : p.defaultOrder,
      style: o.style || '',
      room: o.room || '',
      category: o.category || '',
    });
  };

  const openAdd = (gid) => {
    const g = galleryById[gid];
    const count = photos.filter((p) => p.collection === gid).length;
    setEditing({ mode: 'add', photo: null, gallery: g });
    setForm({ url: '', alt: '', title: '', hidden: false, order: (count + 1) * 10, style: '', room: '', category: '' });
  };

  const put = async (key, body) => {
    await axios.put(`${apiBase}/api/site-images/${encodeURIComponent(key)}`, body);
    const v = {};
    ['url', 'alt', 'title', 'collection', 'style', 'room', 'category'].forEach((f) => { if (body[f]) v[f] = body[f]; });
    if (body.hidden) v.hidden = true;
    if (body.extra) v.extra = true;
    if (typeof body.order === 'number') v.order = body.order;
    return v;
  };

  const save = async () => {
    const isAdd = editing.mode === 'add';
    const isExtra = isAdd || editing.photo.extra;
    const url = (form.url || '').trim();
    if ((isExtra || url) && !ALLOWED.test(url)) {
      message.error('Please choose a photo from our Cloudinary (link must start with https://res.cloudinary.com/nzqefovs/image/upload/).');
      return;
    }
    if (url && form.alt.trim().length < 10) {
      message.error('Please describe the photo in a few words (for Google), e.g. "L-shaped kitchen with grey cabinets".');
      return;
    }
    const key = isAdd ? newKey(editing.gallery.id) : editing.photo.id;
    const body = {
      url,
      alt: form.alt.trim(),
      title: form.title.trim(),
      hidden: !!form.hidden,
      style: form.style || '',
      room: form.room || '',
      category: (form.category || '').trim(),
    };
    if (editing.gallery) body.order = Number.isFinite(form.order) ? form.order : undefined;
    if (isExtra) { body.extra = true; body.collection = editing.gallery.id; }
    // a gallery photo whose order is the same as the default: do not store it
    if (!isExtra && editing.photo && body.order === editing.photo.defaultOrder) delete body.order;
    const nothing = !body.url && !body.alt && !body.title && !body.hidden && body.order === undefined && !body.style && !body.room && !body.category;
    setSaving(true);
    try {
      let next = { ...current };
      if (nothing && !isExtra) {
        await axios.delete(`${apiBase}/api/site-images/${encodeURIComponent(key)}`);
        delete next[key];
      } else {
        next = { ...next, [key]: await put(key, body) };
      }
      applyLocally(next);
      message.success(isAdd ? 'Photo added.' : 'Saved.');
      message.info('Visitors see it on their next visit; Google after the next website build.', 4);
      setEditing(null);
    } catch (err) {
      message.error(err.response?.data?.error || 'Save failed. Please log in again and retry.');
    } finally {
      setSaving(false);
    }
  };

  // hide / show a website photo in its gallery
  const toggleHidden = async (p) => {
    const o = { ...(p.o || {}) };
    const hidden = !o.hidden;
    try {
      const next = { ...current };
      const body = { ...o, hidden };
      const nothing = !body.url && !body.alt && !body.title && !hidden && typeof body.order !== 'number' && !body.style && !body.room && !body.category && !body.extra;
      if (nothing) {
        await axios.delete(`${apiBase}/api/site-images/${encodeURIComponent(p.id)}`);
        delete next[p.id];
      } else {
        next[p.id] = await put(p.id, body);
      }
      applyLocally(next);
      message.success(hidden ? 'Photo hidden from the website.' : 'Photo shown again.');
    } catch (err) {
      message.error(err.response?.data?.error || 'Could not save.');
    }
  };

  // reset a website photo to default, or delete a photo the admin added
  const remove = async (p) => {
    try {
      await axios.delete(`${apiBase}/api/site-images/${encodeURIComponent(p.id)}`);
      const next = { ...current };
      delete next[p.id];
      applyLocally(next);
      message.success(p.extra ? 'Photo deleted.' : 'Back to the default photo.');
    } catch (err) {
      message.error(err.response?.data?.error || 'Could not delete.');
    }
  };

  const counts = {
    total: photos.length,
    changed: photos.filter((p) => p.changed && !p.extra).length,
    hidden: photos.filter((p) => p.o.hidden).length,
    added: photos.filter((p) => p.extra).length,
  };
  const pageCount = (pg) => photos.filter((p) => p.page === pg).length;

  const photoCard = (p) => {
    const o = p.o || {};
    const img = o.url ? thumb(o.url) : p.default;
    const title = o.title || p.defaultTitle || '';
    const isGallery = !!p.collection;
    return (
      <Col key={p.id} xs={24} sm={12} lg={8} xxl={6}>
        <Card
          size="small"
          style={{ opacity: o.hidden ? 0.55 : 1 }}
          cover={
            <div style={{ position: 'relative' }}>
              <img src={img} alt={title || p.section} loading="lazy" style={{ aspectRatio: '4 / 3', objectFit: 'cover', width: '100%', display: 'block' }} />
              {isGallery && (
                <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(31,42,68,.85)', color: '#fff', borderRadius: 999, padding: '2px 9px', fontSize: 11, fontWeight: 600 }}>
                  #{o.order ?? p.defaultOrder}
                </span>
              )}
              {o.hidden && (
                <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, background: 'rgba(0,0,0,.35)' }}>
                  <EyeInvisibleOutlined style={{ marginRight: 6 }} /> Hidden
                </span>
              )}
            </div>
          }
          actions={[
            <Button key="edit" type="link" size="small" icon={<EditOutlined />} onClick={() => openEdit(p)}>Edit</Button>,
            isGallery && !p.extra ? (
              <Button key="hide" type="link" size="small" icon={o.hidden ? <EyeOutlined /> : <EyeInvisibleOutlined />} onClick={() => toggleHidden(p)}>
                {o.hidden ? 'Show' : 'Hide'}
              </Button>
            ) : null,
            p.extra ? (
              <Popconfirm key="del" title="Delete this photo from the website?" okText="Delete" okButtonProps={{ danger: true }} onConfirm={() => remove(p)}>
                <Button type="link" size="small" danger icon={<DeleteOutlined />}>Delete</Button>
              </Popconfirm>
            ) : p.changed || o.hidden ? (
              <Popconfirm key="reset" title="Undo all changes to this photo?" onConfirm={() => remove(p)}>
                <Button type="link" size="small" danger icon={<UndoOutlined />}>Reset</Button>
              </Popconfirm>
            ) : (
              <Button key="def" type="link" size="small" disabled>Default</Button>
            ),
          ].filter(Boolean)}
        >
          <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.35 }}>{title || p.item || p.section || p.page}</div>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {p.extra ? <Tag color="green">Added</Tag> : p.changed ? <Tag color="red">Changed</Tag> : <Tag>Default</Tag>}
            {o.style && <Tag color="blue">{o.style}</Tag>}
            {o.room && <Tag color="purple">{o.room}</Tag>}
            {o.category && <Tag color="gold">{o.category}</Tag>}
            <Tooltip title="Photo id in the website code"><Tag style={{ fontSize: 10 }}>{p.id}</Tag></Tooltip>
          </div>
        </Card>
      </Col>
    );
  };

  const g = editing?.gallery;
  const editTitleShown = !!(g || editing?.photo?.defaultTitle);

  return (
    <div>
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message={onlyPages ? `${onlyPages.join(' + ')}: every photo, section by section.` : 'Every photo on the website, page by page and section by section.'}
        description={
          <span>
            <b>Edit</b> = change the photo, its title and its description for Google. In galleries you can also <b>Hide</b> a photo,
            change its <b>position</b> and <b>Add photo</b>. Use only our own photos: no other company&apos;s logo or name.
            Visitors see changes on their next visit; Google after the next website build.
            {onOpenSections && (
              <> Need a whole new section{onlyPages ? ' on this page' : ' on a page'}? <Button type="link" size="small" style={{ padding: 0 }} icon={<AppstoreAddOutlined />} onClick={onOpenSections}>Page Sections</Button></>
            )}
          </span>
        }
      />

      <Space wrap style={{ marginBottom: 12 }}>
        <Tag>{counts.total} photos</Tag>
        <Tag color={counts.changed ? 'red' : 'default'}>{counts.changed} changed</Tag>
        <Tag color={counts.hidden ? 'orange' : 'default'}>{counts.hidden} hidden</Tag>
        <Tag color={counts.added ? 'green' : 'default'}>{counts.added} added</Tag>
      </Space>

      <Space wrap style={{ marginBottom: 16, width: '100%' }}>
        {!onlyPages && (
        <Select
          value={activePage}
          onChange={(v) => { setPage(v); setSearch(''); setFilter('All'); }}
          style={{ minWidth: 300 }}
          showSearch
          disabled={!!search || filter !== 'All'}
          options={pages.map((pg) => ({ value: pg, label: `${pg} (${pageCount(pg)})` }))}
        />
        )}
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder={onlyPages ? 'Search photos on this page…' : 'Search all pages: kitchen, banner, gallery…'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Segmented value={filter} onChange={setFilter} options={['All', 'Changed', 'Hidden', 'Added']} />
        <Button icon={<ReloadOutlined />} onClick={load}>Refresh</Button>
      </Space>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin /></div>
      ) : groups.length === 0 ? (
        <Empty description={onlyPages && !search && filter === 'All' ? 'This page has no photos to manage (only videos / text). Use Extra sections to add photos.' : 'No photos match.'} />
      ) : (
        groups.map((grp) => (
          <Card
            key={grp.key}
            size="small"
            style={{ marginBottom: 16 }}
            title={
              <Space wrap>
                {(search || filter !== 'All' || (onlyPages && onlyPages.length > 1)) && <Tag color="blue">{grp.page}</Tag>}
                <span>{grp.section}</span>
                <Badge count={grp.items.length} showZero color="#1F2A44" />
                {grp.collection && <Tag color="purple">Gallery</Tag>}
              </Space>
            }
            extra={grp.collection && galleryById[grp.collection] ? (
              <Button type="primary" size="small" icon={<PlusOutlined />} onClick={() => openAdd(grp.collection)}>Add photo</Button>
            ) : null}
          >
            {grp.items.length ? <Row gutter={[12, 12]}>{grp.items.map(photoCard)}</Row> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No photos yet" />}
          </Card>
        ))
      )}

      <Modal
        open={!!editing}
        title={editing ? (editing.mode === 'add' ? `Add photo › ${g.page} › ${g.section}` : `${editing.photo.page} › ${editing.photo.section}${editing.photo.item ? ` › ${editing.photo.item}` : ''}`) : ''}
        onCancel={() => setEditing(null)}
        onOk={save}
        okText={editing?.mode === 'add' ? 'Add photo' : 'Save'}
        confirmLoading={saving}
        width={1000}
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
                    <CloudinaryPicker
                      apiBase={apiBase}
                      value={form.url}
                      onChange={(url) => setForm((f) => ({ ...f, url }))}
                      defaultRoom={roomForPage(editing.photo?.page || g?.page, editing.photo?.section || g?.section)}
                    />
                  ),
                },
                {
                  key: 'link',
                  label: 'Paste a Cloudinary link',
                  children: (
                    <Input
                      placeholder="https://res.cloudinary.com/nzqefovs/image/upload/v123/photo.png"
                      value={form.url}
                      onChange={(e) => setForm((f) => ({ ...f, url: e.target.value.trim() }))}
                    />
                  ),
                },
              ]}
            />

            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col xs={24} md={8}>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Preview</div>
                <img
                  src={form.url ? sizeCloudinary(form.url, 480) : editing.photo?.default}
                  alt="Preview"
                  style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'contain', borderRadius: 8, background: '#f1f3f7', display: 'block' }}
                />
                {editing.mode === 'edit' && !editing.photo.extra && form.url && (
                  <Button size="small" type="link" style={{ padding: 0, marginTop: 6 }} onClick={() => setForm((f) => ({ ...f, url: '' }))}>
                    Use the default photo again
                  </Button>
                )}
              </Col>
              <Col xs={24} md={16}>
                {editTitleShown && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Title shown on the website</div>
                    <Input
                      maxLength={120}
                      showCount
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder={editing.photo?.defaultTitle || 'e.g. L-shaped kitchen with grey cabinets'}
                    />
                  </div>
                )}
                <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                  What is in the photo? (for Google, 1 short line){form.url ? ' *' : ' (empty = default)'}
                </div>
                <Input.TextArea
                  rows={2}
                  maxLength={200}
                  showCount
                  value={form.alt}
                  onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
                  placeholder={editing.photo?.defaultAlt || 'e.g. L-shaped modular kitchen with grey cabinets and a black granite counter'}
                />

                {g && (
                  <Row gutter={12} style={{ marginTop: 12 }}>
                    {g.fields.map((f) => (
                      <Col key={f} xs={24} sm={12} md={8}>
                        <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{FIELD_LABEL[f] || f}</div>
                        {g.options && g.options[f] ? (
                          <Select
                            allowClear
                            style={{ width: '100%' }}
                            value={form[f] || undefined}
                            placeholder="Default"
                            onChange={(v) => setForm((x) => ({ ...x, [f]: v || '' }))}
                            options={g.options[f].map((v) => ({ value: v, label: v }))}
                          />
                        ) : (
                          <Input maxLength={30} value={form[f]} placeholder="Default" onChange={(e) => setForm((x) => ({ ...x, [f]: e.target.value }))} />
                        )}
                      </Col>
                    ))}
                    <Col xs={12} md={8}>
                      <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Position (smaller = first)</div>
                      <InputNumber style={{ width: '100%' }} min={-10000} max={100000} step={5} value={form.order} onChange={(v) => setForm((x) => ({ ...x, order: v }))} />
                    </Col>
                    {editing.mode === 'edit' && !editing.photo.extra && (
                      <Col xs={12} md={8}>
                        <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Hide on website</div>
                        <Switch checked={form.hidden} onChange={(v) => setForm((x) => ({ ...x, hidden: v }))} />
                      </Col>
                    )}
                  </Row>
                )}
                <div style={{ fontSize: 12, color: '#888', marginTop: 10 }}>
                  Tip: describe only what is visible. Do not write prices, offers or another company&apos;s name.
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </div>
  );
}
