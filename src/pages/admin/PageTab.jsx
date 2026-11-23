// One admin tab per website page: its photos, its extra sections and (room pages) its app designs.
// The list of pages is ADMIN_PAGES below: add a page here when the website gets a new page.
import React from 'react';
import { Button, Space, Tabs } from 'antd';
import { AppstoreAddOutlined, ExportOutlined, PictureOutlined, TableOutlined } from '@ant-design/icons';
import WebsiteImages from './WebsiteImages';
import PageSections from './PageSections';

// key = admin menu key, images = page names used in data/media.js labels ('Page › Section'),
// sections = page key in data/pageSections.js, url = page to open, designs = app design category
export const ADMIN_PAGES = [
  { key: 'page:home', label: 'Home', images: ['Home'], sections: 'home', url: '/' },
  { key: 'page:false-ceiling', label: 'False Ceiling', images: ['False Ceiling page'], sections: 'false-ceiling', url: '/false-ceiling' },
  { key: 'Bedroom', label: 'Bedroom', images: ['Bedroom page'], sections: 'bedroom', url: '/bedroom', designs: 'Bedroom' },
  { key: 'Living Hall', label: 'Living Hall', images: ['Living Hall page'], sections: 'living', url: '/living-hall', designs: 'Living Hall' },
  { key: 'Kitchen', label: 'Kitchen', images: ['Modular Kitchen page'], sections: 'kitchen', url: '/kitchen', designs: 'Kitchen' },
  { key: 'Wardrobe', label: 'Wardrobe', images: ['Wardrobe page'], sections: 'wardrobe', url: '/wardrobe', designs: 'Wardrobe' },
  { key: 'page:about', label: 'About Us', images: ['About page'], sections: 'about', url: '/about' },
  { key: 'page:contact', label: 'Contact', images: ['Contact page'], sections: 'contact', url: '/contact' },
  { key: 'page:factory', label: 'Factory', images: ['Factory page'], sections: 'factory', url: '/factory' },
  { key: 'page:blog', label: 'Blog page', images: ['Blog page', 'Blog'], url: '/blogs' },
  { key: 'page:city', label: 'City & Area pages', images: ['City pages (Noida, Gurugram...)', 'Locality pages (Sohna Road, Sector 62...)'], sections: 'city', url: '/interior-designers' },
  { key: 'page:popup', label: 'Popup Form', images: ['Popup form'] },
];
export const findAdminPage = (key) => ADMIN_PAGES.find((p) => p.key === key);

export default function PageTab({ page, apiBase, designsTable, onOpenAllPhotos }) {
  const items = [
    {
      key: 'photos',
      label: <span><PictureOutlined /> Photos</span>,
      children: <WebsiteImages key={page.key} apiBase={apiBase} pages={page.images} />,
    },
  ];
  if (page.sections) {
    items.push({
      key: 'sections',
      label: <span><AppstoreAddOutlined /> Extra sections</span>,
      children: <PageSections key={page.key} apiBase={apiBase} page={page.sections} />,
    });
  }
  if (designsTable) {
    items.push({ key: 'designs', label: <span><TableOutlined /> App designs</span>, children: designsTable });
  }
  return (
    <Tabs
      items={items}
      destroyOnHidden
      tabBarExtraContent={
        <Space>
          {page.url && <Button size="small" icon={<ExportOutlined />} href={page.url} target="_blank">Open page</Button>}
          {onOpenAllPhotos && <Button size="small" onClick={onOpenAllPhotos}>Search all pages</Button>}
        </Space>
      }
    />
  );
}
