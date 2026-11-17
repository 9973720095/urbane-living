import React from 'react';
import { Image } from 'antd';
import { ExpandOutlined } from '@ant-design/icons';
import { photo, alt as photoAlt } from '../data/media';

// Our work gallery. Phones: 2 per row with a wide photo on top and at the end.
// Desktop: big first photo + 5 smaller ones (3 columns). Tap any photo to open the full view.
// Our own design photos (data/media.js). Small copy in the tile, full size in the preview.
const sized = (src, w) => src.replace('w_1400,', `w_${w},`);

const galleryData = [
  { key: 'livingTvWall', title: 'Living Room with Fluted TV Wall', category: 'Living Room' },
  { key: 'plumBedroom', title: 'Plum-Panelled Master Bedroom', category: 'Bedroom' },
  { key: 'kidsRoomJungle', title: 'Kids Room with Bunk Bed', category: 'Kids Room' },
  { key: 'kitchenIsland', title: 'Island Modular Kitchen', category: 'Kitchen' },
  { key: 'diningPendant', title: 'Dining Area with Recessed Ceiling', category: 'Dining' },
  { key: 'bathroomBeige', title: 'Modern Beige Bathroom', category: 'Bathroom' },
].map((item) => ({ ...item, src: photo(item.key), alt: photoAlt(item.key) }));

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
        <span className="mb-3 inline-block rounded-full bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-brand-red-dark">
          OUR WORK
        </span>
        <h2 id="gallery-title" className="m-0 text-[26px] font-semibold leading-tight text-brand-navy sm:text-[36px] lg:text-[40px]">
          Our <span className="text-brand-red">Masterpieces</span>
        </h2>
        <p className="m-0 mt-3 text-[15px] text-gray-500 sm:text-base">
          Living rooms, bedrooms, kitchens and bathrooms designed in 3D by our in-house team, so you see your home before work starts.
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
                src={sized(item.src, i === 0 ? 1000 : 640)}
                preview={{ src: item.src, cover: <span className="inline-flex items-center gap-2 font-semibold"><ExpandOutlined /> View</span> }}
                alt={item.alt}
                loading="lazy"
                className="transition duration-700 group-hover:scale-105"
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