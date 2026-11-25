import React from 'react';
import VideoReels from './VideoReels';

// Home page: "Work In Progress Sites" (real on-site videos from our Cloudinary).
// Use a DIFFERENT real video for each site, and only real locations (leave location '' if unsure).
// Layout (phones: swipe like reels, desktop: 4 in a row + arrows) is in components/VideoReels.jsx.
// TEMPORARY (25 Nov 2026): the 5 site videos below were deleted from Cloudinary. Until they are uploaded again
// (same names), the section shows our false ceiling site reels. Then set SITE_VIDEOS_ONLINE = true.
const SITE_VIDEOS_ONLINE = false;
const R = 'https://res.cloudinary.com/nzqefovs/video/upload';
const SITE_REELS = [
  {
    id: 'framing',
    title: 'False Ceiling: Framing & Channels',
    text: 'Metal channels and the ceiling frame being fixed and levelled, with AC and light points marked first.',
    location: '',
    status: 'In Progress',
    posterAt: 2,
    videoUrl: `${R}/v1792579434/framing-channels-reel-9x16.mp4`,
  },
  {
    id: 'boards',
    title: 'Gypsum Board Installation',
    text: 'Gypsum boards screwed to the frame, with the cove and light cut-outs shaped on site.',
    location: '',
    status: 'In Progress',
    posterAt: 2,
    videoUrl: `${R}/v1792579952/board-installation-reel-9x16.mp4`,
  },
  {
    id: 'finishing',
    title: 'Jointing, Putty & Paint',
    text: 'Joints taped and filled, the ceiling puttied and painted for a smooth, crack-free finish.',
    location: '',
    status: 'Finishing Stage',
    posterAt: 2,
    videoUrl: `${R}/v1792580151/finishing-reel-9x16.mp4`,
  },
  {
    id: 'done',
    title: 'Lights On: The Finished Ceiling',
    text: 'Cove and spot lights switched on in the finished false ceiling, ready for the family.',
    location: '',
    status: 'Completed',
    posterAt: 2,
    videoUrl: `${R}/v1792580360/enjoy-new-look-reel-9x16.mp4`,
  },
];

const SITE_VIDEOS = [
  {
    id: 1,
    title: 'Glass Fitting & Sealing',
    text: 'Glass panels lifted with suction cups, set into the frame and sealed with silicone.',
    location: 'Sector 65, Gurugram',
    status: 'In Progress',
    posterAt: 9, // second of the video used as the still frame
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1795259598/urbanelivingfactory5_logo_mute.mp4',
  },
  {
    id: 2,
    title: 'Wardrobe with Profile Lights',
    text: 'Full-height wardrobe with LED profile lights, open shelves and a pull-out trouser rack.',
    location: 'Dwarka, New Delhi',
    status: 'Finishing Stage',
    posterAt: 4.5,
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1795260996/urbane_work_in_progress_v5_1.mp4',
  },
  {
    id: 3,
    title: 'Modular Kitchen Installation',
    text: 'Sink unit, drawers and soft-close hardware being fitted into the kitchen cabinets.',
    location: 'Sector 150, Noida',
    status: 'In Progress',
    posterAt: 10,
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1795262433/urbaneliving_work_in_progress_noface.mp4',
  },
  {
    id: 4,
    title: 'False Ceiling with Cove Lighting',
    text: 'Gypsum ceiling with blue cove LED lights and AC grilles, in a showroom with glass display shelves.',
    location: '',
    status: 'Finishing Stage',
    posterAt: 24,
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1795333886/urbaneliving_working_combined.mp4',
  },
  {
    id: 5,
    title: 'New Project: Carpentry Work',
    text: 'Cabinet frames assembled on site while the wall units and false ceiling come together.',
    location: '',
    status: 'In Progress',
    posterAt: 28.5,
    videoUrl: 'https://res.cloudinary.com/nzqefovs/video/upload/v1795333907/urbane_working_new_project_logo_mute.mp4',
  },
];
const WIP_VIDEOS = SITE_VIDEOS_ONLINE ? SITE_VIDEOS : SITE_REELS;

export default function WorkInProgress() {
  return (
    <section className="bg-slate-50 px-4 py-14 sm:px-5 sm:py-16" aria-labelledby="wip-title">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-7 text-center sm:mb-10">
          <span className="mb-3 inline-block rounded-full bg-[#4267b2]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#4267b2]">
            ● Live Site Updates
          </span>
          <h2 id="wip-title" className="mb-2.5 text-3xl font-bold text-slate-900 md:text-4xl">
            Work In Progress Sites
          </h2>
          <p className="mx-auto max-w-xl text-sm text-slate-500 md:text-base">
            Real videos from our active sites: false ceilings, glass fitting, wardrobes, kitchens and carpentry, made and installed by our own team.
          </p>
        </div>

        <VideoReels items={WIP_VIDEOS} desktop={4} label="Work in progress videos" />
      </div>
    </section>
  );
}
