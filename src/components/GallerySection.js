import React from 'react';
import { Image } from 'antd';
import { ExpandOutlined } from '@ant-design/icons';

// Our work gallery. Phones: 2 per row with a wide photo on top and at the end.
// Desktop: big first photo + 5 smaller ones (3 columns). Tap any photo to open the full view.
const galleryData = [
  { src: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583856/hf_20260512_054108_38408685-f67f-4515-a822-985d83019979_y6nnq9.png', title: 'Living Interior', category: 'Modern' },
  { src: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583838/ChatGPT_Image_May_12_2026_03_16_05_PM_pnlauy.png', title: 'Master Bedroom Interior', category: 'Premium' },
  { src: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778585454/ChatGPT_Image_May_12_2026_04_30_35_PM_ptqgea.png', title: "Kid's Bedroom Interior", category: 'Cozy' },
  { src: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_38_54_PM_v8bjr3.png', title: 'Living Room Interior', category: 'Commercial' },
  { src: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583842/ChatGPT_Image_May_12_2026_03_35_05_PM_tolwlu.png', title: 'Living Room Interior', category: 'Exclusive' },
  { src: 'https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583833/ChatGPT_Image_May_12_2026_02_40_56_PM_zkd6ex.png', title: 'Parents Room Interior', category: 'Luxury' },
];

// layout of each tile by position
const tileClass = (i, total) => {
  if (i === 0) return 'col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto';
  if (i === total - 1 && total % 2 === 0) return 'col-span-2 aspect-[16/10] lg:col-span-1 lg:aspect-auto';
  return 'aspect-[4/5] lg:aspect-auto';
};

// make antd's <Image> wrapper fill the tile
const fill = '[&_.ant-image]:!block [&_.ant-image]:!h-full [&_.ant-image]:!w-full [&_.ant-image-img]:!h-full [&_.ant-image-img]:!w-full [&_.ant-image-img]:object-cover';

const GallerySection = () => (
  <section aria-labelledby="gallery-title" className="bg-white px-4 py-12 sm:px-6 lg:py-20">
    <div className="mx-auto max-w-[1200px]">
      {/* Header (same style as the other home sections) */}
      <div className="mx-auto max-w-[720px] text-center">
        <span className="mb-3 inline-block rounded-full bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-red">
          OUR WORK
        </span>
        <h2 id="gallery-title" className="m-0 text-[26px] font-semibold leading-tight text-brand-navy sm:text-[36px] lg:text-[40px]">
          Our <span className="text-brand-red">Masterpieces</span>
        </h2>
        <p className="m-0 mt-3 text-[15px] text-gray-500 sm:text-base">
          Transforming spaces into experiences. Explore our latest interior and ceiling projects.
        </p>
      </div>

      <Image.PreviewGroup>
        <ul className="m-0 mt-8 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:mt-10 lg:grid-cols-3 lg:auto-rows-[260px] lg:gap-5">
          {galleryData.map((item, i) => (
            <li
              key={item.src}
              className={`group relative overflow-hidden rounded-2xl bg-brand-soft ${fill} ${tileClass(i, galleryData.length)}`}
            >
              <Image
                src={item.src}
                alt={`${item.title} designed by Urbane Living`}
                loading="lazy"
                className="transition duration-700 group-hover:scale-105"
                preview={{ cover: <span className="inline-flex items-center gap-2 font-semibold"><ExpandOutlined /> View</span> }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent p-3 pt-10 sm:p-5 sm:pt-14">
                <span className="inline-block rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-red sm:text-[11px]">
                  {item.category}
                </span>
                <h3 className={`m-0 mt-1.5 font-semibold leading-snug text-white ${i === 0 ? 'text-base sm:text-xl' : 'text-[13px] sm:text-base'}`}>
                  {item.title}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </Image.PreviewGroup>
    </div>
  </section>
);

export default GallerySection;