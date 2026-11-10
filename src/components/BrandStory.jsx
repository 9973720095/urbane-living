import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { brandStory } from '../data/siteData';
import SectionHeading from './SectionHeading';

// Home page: short brand promise + consultation button
export default function BrandStory({ onOpenForm }) {
  return (
    <section aria-labelledby="story-title" className="bg-brand-soft px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-[800px] text-center">
        <SectionHeading
          id="story-title"
          eyebrow={brandStory.eyebrow}
          title={brandStory.title}
          highlight={brandStory.highlight}
          subtitle={brandStory.text}
          className="!mb-7"
        />
        <button
          type="button"
          onClick={onOpenForm}
          className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border-0 bg-brand-red px-7 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(228,11,18,0.28)] transition hover:bg-brand-red-dark"
        >
          {brandStory.cta} <ArrowRightOutlined />
        </button>
      </div>
    </section>
  );
}