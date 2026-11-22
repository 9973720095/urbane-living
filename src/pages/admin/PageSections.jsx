// Admin -> Page Sections: add a new section to any page, at any position.
// A section = heading (small label, title, subtitle) + rows of items (photo/video, alt text, title, text, link)
// + an optional button. Positions per page come from src/data/pageSections.js.
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Alert, Button, Card, Col, Divider, Empty, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Space, Spin, Switch, Table, Tag, Tooltip, message,
} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import MediaPicker, { MEDIA_ALLOWED, previewOf } from './MediaPicker';
import { sectionPages, findSectionPage, sectionLayouts } from '../../data/pageSections';
import { savePageSections } from '../../utils/pageSections';

const PAGE_URL = {
  home: '/', 'false-ceiling': '/false-ceiling', kitchen: '/kitchen', bedroom: '/bedroom', wardrobe: '/wardrobe',
  living: '/living-hall', about: '/about', contact: '/contact', city: '/false-ceiling/gurgaon',
};
const RATIOS = [
  ['4/3', 'Normal (4:3)'],
  ['16/9', 'Wide (16:9)'],
  ['1/1', 'Square (1:1)'],
  ['9/16', 'Tall / mobile video (9:16)'],
];
const LINK_RULE = { pattern: /^(\/\S*|https:\/\/\S+)$/, message: 'Start with / (our page, e.g. /contact) or https://' };

const positionLabel = (page, pos) => (findSectionPage(page)?.positions.find(([k]) => k === pos) || [pos, pos])[1];

const emptySection = (page) => ({
  page: page || 'home',
  position: findSectionPage(page || 'home')?.positions[0][0],
  order: 0,
  columns: 3,
  ratio: '4/3',
  background: 'white',
  visible: true,
  items: [{}],
});

export default function PageSections({ apiBase }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = existing
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  const page = Form.useWatch('page', form);

  // keep this browser's copy of the website sections up to date (admin sees changes straight away)
  const syncSite = (all) => savePageSections(all.filter((s) => s.visible !== false));

  const load = () => {
    setLoading(true);
    axios
      .get(`${apiBase}/api/page-sections/all`, { params: { t: Date.now() } })
      .then((r) => { const all = Array.isArray(r.data) ? r.data : []; setList(all); syncSite(all); })
      .catch((err) => message.error(err.response?.data?.error || 'Could not load sections. Please log in again.'))
      .finally(() => setLoading(false));
  };
  useEffect(load, [apiBase]); // eslint-disable-line react-hooks/exhaustive-deps

  const shown = useMemo(() => list.filter((s) => !filter || s.page === filter), [list, filter]);

  const openEditor = (s) => {
    setEditing(s || {});
    form.resetFields();
    form.setFieldsValue(s ? { ...s, items: s.items?.length ? s.items : [{}] } : emptySection(filter));
  };

  const save = async () => {
    let values;
    try {
      values = await form.validateFields();
    } catch (e) {
      message.error('Please fix the fields marked in red.');
      return;
    }
    const items = (values.items || []).filter((it) => it && (it.media || it.title || it.text));
    if (!values.title && !items.length) {
      message.error('Add a title or at least one item.');
      return;
    }
    setSaving(true);
    try {
      const body = { ...values, items };
      if (editing?._id) await axios.put(`${apiBase}/api/page-sections/${editing._id}`, body);
      else await axios.post(`${apiBase}/api/page-sections`, body);
      message.success('Section saved. It shows on the website now (other visitors see it within a few minutes).');
      setEditing(null);
      load();
    } catch (err) {
      message.error(err.response?.data?.error || 'Save failed. Please log in again and retry.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (s) => {
    try {
      await axios.delete(`${apiBase}/api/page-sections/${s._id}`);
      message.success('Section deleted.');
      load();
    } catch (err) {
      message.error(err.response?.data?.error || 'Delete failed.');
    }
  };

  const toggleVisible = async (s, visible) => {
    try {
      await axios.put(`${apiBase}/api/page-sections/${s._id}`, { ...s, visible });
      load();
    } catch (err) {
      message.error(err.response?.data?.error || 'Could not change it.');
    }
  };

  const columns = [
    {
      title: 'Preview',
      width: 90,
      render: (_, s) => {
        const first = (s.items || []).find((it) => it.media);
        return first
          ? <img src={previewOf(first.media, 160)} alt="" style={{ width: 72, height: 54, objectFit: 'cover', borderRadius: 6 }} />
          : <Tag>Text</Tag>;
      },
    },
    {
      title: 'Section',
      render: (_, s) => (
        <div>
          <div style={{ fontWeight: 600 }}>{s.title || <i style={{ color: '#999' }}>(no title)</i>}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{(s.items || []).length} item(s) · {s.columns} per row</div>
        </div>
      ),
    },
    {
      title: 'Page › Position',
      render: (_, s) => (
        <div>
          <div>{findSectionPage(s.page)?.label || s.page}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{positionLabel(s.page, s.position)} · order {s.order || 0}</div>
        </div>
      ),
    },
    {
      title: 'Show',
      width: 80,
      render: (_, s) => <Switch size="small" checked={s.visible !== false} onChange={(v) => toggleVisible(s, v)} />,
    },
    {
      title: '',
      width: 150,
      render: (_, s) => (
        <Space>
          <Tooltip title="Edit"><Button size="small" icon={<EditOutlined />} onClick={() => openEditor(s)} /></Tooltip>
          <Tooltip title="Open the page">
            <Button size="small" icon={<EyeOutlined />} href={PAGE_URL[s.page] || '/'} target="_blank" />
          </Tooltip>
          <Popconfirm title="Delete this section?" onConfirm={() => remove(s)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const positions = findSectionPage(page)?.positions || [];

  return (
    <div>
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="Add a new section to any page."
        description={
          <span>
            Choose the page and where the section goes, then add rows of items (photo or video, alt text, title, text, link).
            Use only our own photos (no other company&apos;s logo or name), and only true details. Google sees new sections after the next website build.
          </span>
        }
      />

      <Space wrap style={{ marginBottom: 16 }}>
        <Select
          value={filter}
          onChange={setFilter}
          style={{ minWidth: 240 }}
          options={[{ value: '', label: 'All pages' }, ...sectionPages.map((p) => ({ value: p.key, label: p.label }))]}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openEditor(null)}>Add section</Button>
        <Button icon={<ReloadOutlined />} onClick={load}>Refresh</Button>
      </Space>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin /></div>
      ) : shown.length === 0 ? (
        <Card><Empty description="No sections yet. Press “Add section” to create one." /></Card>
      ) : (
        <Table rowKey="_id" columns={columns} dataSource={shown} pagination={false} scroll={{ x: 700 }} />
      )}

      <Modal
        open={!!editing}
        title={editing?._id ? 'Edit section' : 'Add section'}
        onCancel={() => setEditing(null)}
        onOk={save}
        okText="Save section"
        confirmLoading={saving}
        width={1000}
        destroyOnHidden
        maskClosable={false}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <Divider orientation="left" style={{ marginTop: 0 }}>Where</Divider>
          <Row gutter={12}>
            <Col xs={24} md={9}>
              <Form.Item name="page" label="Page" rules={[{ required: true }]}>
                <Select
                  options={sectionPages.map((p) => ({ value: p.key, label: p.label }))}
                  onChange={(v) => form.setFieldValue('position', findSectionPage(v)?.positions[0][0])}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item name="position" label="Position on the page" rules={[{ required: true }]}>
                <Select options={positions.map(([value, label]) => ({ value, label }))} />
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item name="order" label="Order" tooltip="If there are several sections at the same position, the smaller number shows first.">
                <InputNumber min={0} max={99} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Heading</Divider>
          <Row gutter={12}>
            <Col xs={24} md={8}>
              <Form.Item name="eyebrow" label="Small label above the title" rules={[{ max: 60 }]}>
                <Input placeholder="e.g. OUR RECENT WORK" />
              </Form.Item>
            </Col>
            <Col xs={24} md={16}>
              <Form.Item name="title" label="Title" rules={[{ max: 160 }]}>
                <Input placeholder="e.g. 3 BHK at DLF Park Place, Gurugram" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="subtitle" label="Subtitle" rules={[{ max: 400 }]}>
            <Input.TextArea rows={2} placeholder="One or two lines about this section" />
          </Form.Item>

          <Divider orientation="left">Layout</Divider>
          <Row gutter={12}>
            <Col xs={12} md={6}>
              <Form.Item name="columns" label="Items in one row (desktop)">
                <Select options={sectionLayouts.columns.map((n) => ({ value: n, label: `${n} per row` }))} />
              </Form.Item>
            </Col>
            <Col xs={12} md={7}>
              <Form.Item name="ratio" label="Photo / video shape">
                <Select options={RATIOS.map(([value, label]) => ({ value, label }))} />
              </Form.Item>
            </Col>
            <Col xs={12} md={6}>
              <Form.Item name="background" label="Background">
                <Select options={sectionLayouts.backgrounds.map(([value, label]) => ({ value, label }))} />
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item name="visible" label="Show on website" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Items (rows fill from left to right)</Divider>
          <Form.List name="items">
            {(fields, { add, remove, move }) => (
              <>
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    size="small"
                    style={{ marginBottom: 12, background: '#fafbfc' }}
                    title={`Item ${index + 1}`}
                    extra={(
                      <Space>
                        <Button size="small" icon={<ArrowUpOutlined />} disabled={index === 0} onClick={() => move(index, index - 1)} />
                        <Button size="small" icon={<ArrowDownOutlined />} disabled={index === fields.length - 1} onClick={() => move(index, index + 1)} />
                        <Button size="small" danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                      </Space>
                    )}
                  >
                    <Row gutter={12}>
                      <Col xs={24} md={6}>
                        <Form.Item
                          name={[field.name, 'media']}
                          label="Photo / video"
                          rules={[{ validator: (_, v) => (!v || MEDIA_ALLOWED.test(v) ? Promise.resolve() : Promise.reject(new Error('Use our Cloudinary'))) }]}
                        >
                          <MediaPicker />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={18}>
                        <Form.Item
                          name={[field.name, 'alt']}
                          label="Alt text (what is in the photo, for Google)"
                          dependencies={[['items', field.name, 'media']]}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator: (_, v) => (!getFieldValue(['items', field.name, 'media']) || (v && v.trim().length >= 5)
                                ? Promise.resolve()
                                : Promise.reject(new Error('Describe the photo in a few words'))),
                            }),
                            { max: 200 },
                          ]}
                        >
                          <Input placeholder="e.g. Grey L-shaped modular kitchen with marble backsplash" />
                        </Form.Item>
                        <Row gutter={12}>
                          <Col xs={24} md={12}>
                            <Form.Item name={[field.name, 'title']} label="Title" rules={[{ max: 120 }]}>
                              <Input placeholder="e.g. Modular Kitchen" />
                            </Form.Item>
                          </Col>
                          <Col xs={12} md={6}>
                            <Form.Item name={[field.name, 'linkLabel']} label="Link text" rules={[{ max: 60 }]}>
                              <Input placeholder="e.g. See designs" />
                            </Form.Item>
                          </Col>
                          <Col xs={12} md={6}>
                            <Form.Item name={[field.name, 'linkUrl']} label="Link" rules={[LINK_RULE]}>
                              <Input placeholder="/kitchen" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item name={[field.name, 'text']} label="Text" rules={[{ max: 1000 }]} style={{ marginBottom: 0 }}>
                          <Input.TextArea rows={2} placeholder="A short line about this item" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add({})} disabled={fields.length >= 24}>
                  Add item
                </Button>
              </>
            )}
          </Form.List>

          <Divider orientation="left">Button below the section (optional)</Divider>
          <Row gutter={12}>
            <Col xs={12} md={8}>
              <Form.Item name="buttonLabel" label="Button text" rules={[{ max: 60 }]}>
                <Input placeholder="e.g. Get Free Quote" />
              </Form.Item>
            </Col>
            <Col xs={12} md={16}>
              <Form.Item name="buttonUrl" label="Button link" rules={[LINK_RULE]}>
                <Input placeholder="/contact" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
