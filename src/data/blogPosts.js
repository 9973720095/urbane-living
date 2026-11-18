// Blog articles that ship with the website (fast, always online, SEO friendly URLs).
// Each post opens at /blog/<slug>. Admin panel / Google Sheet posts also get /blog/<slug>;
// a post saved there with the same slug replaces the article below (so you can edit it from admin).
//
// To add a post: copy one object, give it a new unique slug (small letters and hyphens),
// write the content in HTML, then add the URL to public/sitemap.xml.
import { cdn } from './config';
import { photo, alt as photoAlt } from './media';

const img = (file) => `${cdn}/image/upload/q_auto,f_auto,w_1400/${file}`;

const images = {
  ceiling: photo('livingTvWall'),
  living: photo('livingTvWallWide'),
  kitchen: photo('kitchenL'),
  framing: img('v1777092280/WhatsApp_Image_2026-04-24_at_15.43.19_1_jg1oxj.jpg'), // real site photo
  wardrobe: photo('wardrobeBedroom'),
  bedroom: photo('plumBedroom'),
  livingAlt: photo('livingArchway'),
};

export const blogAuthor = 'Urbane Living Design Team';

export const blogPosts = [

  // 0 ── Gurugram (main focus) ─────────────────────────────────────
  {
    slug: 'home-interiors-gurugram-guide',
    title: 'Home Interiors in Gurugram (2026): A Practical Guide for New Flats, Premium Apartments and Builder Floors',
    seoTitle: 'Home Interiors in Gurugram 2026 | Cost, Timeline & Area Guide',
    description:
      'Planning interiors in Gurugram (Gurgaon)? What to plan for new flats on Dwarka Expressway and Golf Course Extension Road, premium apartments on Golf Course Road and builder floors in DLF Phases, with costs, timeline and society rules.',
    category: 'Home Interiors',
    image: photo('beigeLiving'),
    imageAlt: photoAlt('beigeLiving'),
    date: '2026-11-18',
    readMin: 5,
    content: `
<p>Gurugram (Gurgaon) has three very different kinds of homes: <strong>new possession flats</strong> on Dwarka Expressway, Golf Course Extension Road, Sohna Road and New Gurgaon; <strong>premium apartments</strong> on Golf Course Road; and <strong>builder floors and independent homes</strong> in DLF Phases, South City and Palam Vihar. Each needs a different interior plan. This guide explains what to plan, what it costs and how long it takes.</p>

<h2>1. New possession flats (Dwarka Expressway, Golf Course Extension Road, Sohna Road)</h2>
<p>A new flat is the best time to do interiors: empty rooms, no shifting and one clean plan. Most owners start with the items they cannot live without and plan the rest in the same 3D design, so everything matches later.</p>
<ul>
  <li><strong>Must-do first:</strong> modular kitchen, wardrobes in every bedroom, and lights and fans.</li>
  <li><strong>Do with it if budget allows:</strong> false ceiling with cove lighting in the living room and master bedroom, TV unit, shoe rack and pooja unit.</li>
  <li><strong>Can wait:</strong> wall panelling, wallpaper, crockery unit and decor.</li>
</ul>
<p>Read our <a href="/blog/new-flat-interior-checklist-noida-ghaziabad">new flat interior checklist</a> for the right order of work.</p>

<h2>2. Premium apartments (Golf Course Road)</h2>
<p>Large living rooms, ducted or VRV AC, sprinklers and high-end finishes are common here. Two things matter most:</p>
<ul>
  <li><strong>Ceiling planned around AC ducts and sprinklers.</strong> Every duct, grille and service panel is marked before framing, so the AC can still be serviced. See our <a href="/false-ceiling/gurgaon">false ceiling service in Gurugram</a>.</li>
  <li><strong>Materials named in the quote.</strong> Board thickness, framing, hardware and laminate brands should be written in your quote, not promised verbally.</li>
</ul>

<h2>3. Builder floors and older homes (DLF Phases, South City, Palam Vihar)</h2>
<p>Older homes usually need a refresh rather than a full rebuild: a new <a href="/modular-kitchen/gurgaon">modular kitchen</a>, made-to-size <a href="/wardrobe/gurgaon">wardrobes</a>, better lighting and a peripheral false ceiling that hides beams without making rooms feel low. Work can be planned room by room, so the family can keep living at home.</p>

<h2>What does it cost?</h2>
<p>Costs depend on the size of the home and what you choose. As a guide, gypsum and POP false ceilings start at about <strong>₹120 per sq. ft.</strong>, PVC at about ₹200 and wooden at about ₹210, with light points at about ₹450 each. See the full breakdown in our <a href="/blog/false-ceiling-cost-delhi-ncr">false ceiling cost guide</a>. Kitchens and wardrobes are priced by size, material and fittings, so you get an itemised quote after the site visit.</p>

<h2>How long does it take?</h2>
<ul>
  <li><strong>False ceiling:</strong> about 7–10 working days for most homes after design approval.</li>
  <li><strong>Kitchen and wardrobes:</strong> made to size after the design is final; your quote includes a written timeline.</li>
  <li><strong>Society rules:</strong> many Gurugram societies allow work only at fixed hours and need lift booking for material. Plan for it, or ask your designer to handle it.</li>
</ul>

<h2>Checklist before you sign</h2>
<ul>
  <li>Have you seen the full home in 3D, room by room?</li>
  <li>Is every material and brand named in the quote?</li>
  <li>Is the timeline written, with who supervises the site?</li>
  <li>Is the warranty in writing?</li>
  <li>Who handles society paperwork, lift booking and debris?</li>
</ul>

<h2>Get a free 3D design for your Gurugram home</h2>
<p>We design and install home interiors across <a href="/interior-designers/gurgaon">Gurugram</a>, including <a href="/interior-designers/gurgaon/dwarka-expressway">Dwarka Expressway</a>, <a href="/interior-designers/gurgaon/golf-course-extension-road">Golf Course Extension Road</a>, <a href="/interior-designers/gurgaon/golf-course-road">Golf Course Road</a>, <a href="/interior-designers/gurgaon/sohna-road">Sohna Road</a> and <a href="/interior-designers/gurgaon/dlf-phase-1-5">DLF Phases</a>. <a href="/contact">Book a free site visit</a> or call 07965315325.</p>
`,
    faq: [
      {
        q: 'How much does a false ceiling cost in Gurugram?',
        a: 'Gypsum and POP false ceilings start at about ₹120 per sq. ft., PVC at about ₹200 and wooden at about ₹210 per sq. ft. Cove and multi-level designs cost more, and each light point costs about ₹450.',
      },
      {
        q: 'What should I do first in a new flat in Gurugram?',
        a: 'Start with the modular kitchen, wardrobes and lights. If the budget allows, add the false ceiling in the living room and master bedroom at the same time, since it is easier before furniture comes in.',
      },
      {
        q: 'Do you work on Dwarka Expressway and Golf Course Extension Road?',
        a: 'Yes. We work across Gurugram, including Dwarka Expressway, Golf Course Road, Golf Course Extension Road, Sohna Road, DLF Phases, South City, Palam Vihar and New Gurgaon.',
      },
    ],
  },
  // 1 ─────────────────────────────────────────────────────────────
  {
    slug: 'false-ceiling-cost-delhi-ncr',
    title: 'False Ceiling Cost in Delhi NCR (2026): Rates per Sq. Ft. with Real Room Examples',
    seoTitle: 'False Ceiling Cost in Delhi NCR 2026 | Rate per Sq. Ft. & Examples',
    description:
      'How much does a false ceiling cost in Gurugram, Delhi, Noida and Ghaziabad? Rates per sq. ft. for gypsum, POP, PVC and wooden ceilings, with worked examples for a bedroom, living room and full flat.',
    category: 'False Ceiling',
    image: images.ceiling,
    imageAlt: photoAlt('livingTvWall'),
    date: '2026-11-14',
    readMin: 4,
    content: `
<p>A false ceiling is usually the first big item in a home interior quote, and also the one people understand least. Is ₹120 per sq. ft. the full price? Are lights extra? Why did one contractor quote ₹90 and another ₹180 for the same room? This guide answers those questions using the same rates we use for homes across <a href="/false-ceiling/delhi">Delhi</a>, <a href="/false-ceiling/noida">Noida</a>, <a href="/false-ceiling/ghaziabad">Ghaziabad</a> and <a href="/false-ceiling/gurgaon">Gurugram</a>.</p>

<h2>False ceiling rate per sq. ft. in Delhi NCR (2026)</h2>
<table>
  <thead><tr><th>Material</th><th>Starting rate</th><th>Best for</th></tr></thead>
  <tbody>
    <tr><td>Gypsum board</td><td>₹120 / sq. ft.</td><td>Living rooms, bedrooms, cove lighting</td></tr>
    <tr><td>POP (Plaster of Paris)</td><td>₹120 / sq. ft.</td><td>Curved shapes, detailed mouldings</td></tr>
    <tr><td>PVC panels</td><td>about ₹200 / sq. ft.</td><td>Bathrooms, balconies, damp areas</td></tr>
    <tr><td>Wooden / veneer</td><td>about ₹210 / sq. ft.</td><td>Accent panels, dining and lounge areas</td></tr>
  </tbody>
</table>
<p>These are starting rates for a simple single-level ceiling. The design you choose changes the final rate:</p>
<ul>
  <li><strong>Single level (flat ceiling):</strong> base rate.</li>
  <li><strong>Cove ceiling with hidden LED strip:</strong> roughly 20% more, because of the extra vertical drop and the light channel.</li>
  <li><strong>Multi-tier or curved designs:</strong> roughly 50% more, because of extra framing, cutting and finishing work.</li>
  <li><strong>Lights:</strong> each light point (spotlight, panel or strip point with wiring) costs about ₹450.</li>
</ul>

<h2>How to measure your ceiling area</h2>
<p>For a flat ceiling, the area is simply length × width of the room. A 12 ft × 14 ft bedroom has 168 sq. ft. of ceiling. For cove and multi-level designs, contractors also count the vertical drops, so the billed area can be 10–20% higher than the floor area. Always ask for the measured area to be written on the quote.</p>

<h2>Real examples: what a false ceiling costs</h2>
<h3>1. Bedroom, 12 × 14 ft, simple gypsum ceiling</h3>
<ul>
  <li>168 sq. ft. × ₹120 = ₹20,160</li>
  <li>6 light points × ₹450 = ₹2,700</li>
  <li><strong>Approx. total: ₹22,860</strong></li>
</ul>
<h3>2. Living room, 15 × 18 ft, gypsum with cove lighting</h3>
<ul>
  <li>270 sq. ft. × ₹120 × 1.2 (cove design) = ₹38,880</li>
  <li>10 light points × ₹450 = ₹4,500</li>
  <li><strong>Approx. total: ₹43,380</strong></li>
</ul>
<h3>3. Full 3BHK flat, about 900 sq. ft. of ceiling</h3>
<ul>
  <li>900 sq. ft. × ₹120 × 1.2 (cove in main rooms) = ₹1,29,600</li>
  <li>40 light points × ₹450 = ₹18,000</li>
  <li><strong>Approx. total: ₹1,47,600</strong></li>
</ul>
<p>Want a number for your own rooms? Try the <a href="/false-ceiling">false ceiling cost estimator</a>. It uses the same rates and gives you a total in seconds.</p>

<h2>Why quotes for the same room differ so much</h2>
<ol>
  <li><strong>Board and channel quality.</strong> Branded gypsum boards and galvanised steel channels cost more than local ones, but they do not sag or rust. Ask for the brand names in writing.</li>
  <li><strong>Lights included or not.</strong> A low per sq. ft. rate often leaves out wiring, light points and fittings.</li>
  <li><strong>Finishing.</strong> Jointing tape, two coats of putty, primer and paint are part of a proper job. Some quotes stop at "board fixing".</li>
  <li><strong>Measurement method.</strong> One quote may bill vertical drops, another may not. Compare the measured area, not just the rate.</li>
  <li><strong>Warranty.</strong> We give a 10-year anti-crack warranty. Without one, you pay for every crack later.</li>
</ol>

<h2>Hidden costs to ask about before you book</h2>
<ul>
  <li>Electrical work for new light points and switches</li>
  <li>AC duct or cassette AC cut-outs</li>
  <li>Painting of the ceiling and the walls touched during work</li>
  <li>Site cleaning and debris removal</li>
  <li>Society rules on working hours and lift use, common in Noida and Ghaziabad high-rises</li>
</ul>

<h2>How long does it take?</h2>
<p>A typical home ceiling of up to about 1,000 sq. ft. is ready in around 7 working days after the design is approved: framing, board fixing, jointing, putty and paint. Bigger homes or complex designs take a little longer.</p>

<blockquote>Tip: finish the false ceiling before modular furniture is fitted, and after electrical and AC piping work. This order avoids breaking a finished ceiling later.</blockquote>

<h2>Get an exact quote</h2>
<p>Every home is different, so the final price is fixed only after measuring the site. We visit for free, show you designs in 3D and give an itemised quote per sq. ft., with no surprise "extra material" bills later. <a href="/contact">Book a free site visit</a> or call our toll-free number 07965315325.</p>
`,
    faq: [
      {
        q: 'What is the false ceiling rate per sq. ft. in Delhi NCR?',
        a: 'Gypsum and POP false ceilings start at about ₹120 per sq. ft., PVC at about ₹200 and wooden at about ₹210 per sq. ft. Cove and multi-level designs cost 20–50% more, and each light point costs about ₹450.',
      },
      {
        q: 'How much does a false ceiling cost for a 12 × 14 ft bedroom?',
        a: 'A simple gypsum ceiling for a 168 sq. ft. bedroom costs about ₹20,000 for the ceiling plus about ₹2,700 for 6 light points, so roughly ₹23,000 in total.',
      },
      {
        q: 'Is a false ceiling worth it in a flat?',
        a: 'Yes, if your ceiling height is at least about 9.5 ft. It hides wiring and AC pipes, allows soft cove lighting and keeps rooms slightly cooler. In rooms with low ceilings, a simple peripheral ceiling is a better choice than a full drop.',
      },
    ],
  },

  // 2 ─────────────────────────────────────────────────────────────
  {
    slug: 'pop-vs-gypsum-false-ceiling',
    title: 'POP vs Gypsum False Ceiling: Which Is Better for Your Home?',
    seoTitle: 'POP vs Gypsum False Ceiling: Cost, Life & Which Is Better',
    description:
      'POP or gypsum false ceiling? Compare cost, finish, installation time, mess, cracks and life span, and find out which one suits each room of a Delhi NCR home.',
    category: 'False Ceiling',
    image: images.framing,
    imageAlt: 'Gypsum false ceiling frame with galvanised steel channels at an Urbane Living site',
    date: '2026-11-12',
    readMin: 3,
    content: `
<p>Gypsum and POP (Plaster of Paris) are the two most common false ceiling materials in Indian homes. Both are made from gypsum and both give a smooth white finish, so they look almost the same once painted. The difference is in how they are made and installed, and that affects cost, time, mess and cracks.</p>

<h2>Quick comparison</h2>
<table>
  <thead><tr><th>Point</th><th>Gypsum board</th><th>POP</th></tr></thead>
  <tbody>
    <tr><td>Form</td><td>Factory-made boards fixed to a metal frame</td><td>Powder mixed with water at site and applied on a frame</td></tr>
    <tr><td>Starting cost</td><td>About ₹120 / sq. ft.</td><td>About ₹120 / sq. ft.</td></tr>
    <tr><td>Installation time</td><td>Fast, about 7 days for a home</td><td>Slower, needs drying time</td></tr>
    <tr><td>Mess at site</td><td>Low, mostly dry work</td><td>High, wet work and dust</td></tr>
    <tr><td>Finish</td><td>Even and uniform</td><td>Depends heavily on the worker's skill</td></tr>
    <tr><td>Curves and mouldings</td><td>Good for straight lines and simple curves</td><td>Best for curves, domes and detailed designs</td></tr>
    <tr><td>Cracks</td><td>Low, if joints are taped properly</td><td>More likely if the mix or curing is poor</td></tr>
  </tbody>
</table>

<h2>When gypsum is the better choice</h2>
<ul>
  <li>You want the work finished fast, for example before a move-in date.</li>
  <li>You live in a ready flat and want less dust and mess.</li>
  <li>Your design is straight lines, cove lighting or simple layers. That covers most modern homes.</li>
  <li>You want a consistent finish across all rooms.</li>
</ul>

<h2>When POP is the better choice</h2>
<ul>
  <li>You want curved, circular or dome shapes, or classic mouldings.</li>
  <li>You need to repair or match an existing POP ceiling.</li>
  <li>The design has many small details that boards cannot follow easily.</li>
</ul>

<h2>What about bathrooms and balconies?</h2>
<p>Neither standard gypsum nor POP likes constant moisture. For bathrooms, balconies and areas near the kitchen sink, use <strong>moisture-resistant gypsum board</strong> or <strong>PVC panels</strong> (from about ₹200 per sq. ft.). PVC is waterproof and easy to clean, though it looks less premium than a painted ceiling.</p>

<h2>How to avoid cracks with either material</h2>
<ol>
  <li>Use galvanised steel channels, not wooden battens, for the frame.</li>
  <li>Keep proper spacing between hangers so the ceiling does not sag.</li>
  <li>Tape and fill every joint before putty.</li>
  <li>Leave a small shadow gap where the ceiling meets the wall, so building movement does not crack the edge.</li>
  <li>Choose a contractor who gives a written anti-crack warranty. Ours is 10 years.</li>
</ol>

<h2>Our recommendation</h2>
<p>For most flats in Gurugram, Noida, Ghaziabad and Delhi, <strong>gypsum is the better default</strong>: faster, cleaner and more consistent. Use POP only where the design truly needs curves or detailed work. Many homes mix both: gypsum for the main ceiling and POP for one feature element.</p>
<p>See finished designs and check your budget with the <a href="/false-ceiling">false ceiling cost estimator</a>, or read the full <a href="/blog/false-ceiling-cost-delhi-ncr">false ceiling cost guide for Delhi NCR</a>.</p>
`,
    faq: [
      {
        q: 'Which is cheaper, POP or gypsum false ceiling?',
        a: 'Both start at about ₹120 per sq. ft. with Urbane Living. Gypsum often works out cheaper overall because it is installed faster with less labour and less cleaning.',
      },
      {
        q: 'Which lasts longer, POP or gypsum?',
        a: 'Both can last 15–20 years or more when installed properly on a galvanised steel frame. Gypsum gives a more consistent result because the boards are factory-made.',
      },
      {
        q: 'Can gypsum false ceiling be used in a bathroom?',
        a: 'Only moisture-resistant gypsum board should be used in bathrooms. PVC panels are a fully waterproof alternative.',
      },
    ],
  },

  // 3 ─────────────────────────────────────────────────────────────
  {
    slug: 'modular-kitchen-design-guide',
    title: 'Modular Kitchen Design Guide: Layouts, Materials and Sizes for Indian Homes',
    seoTitle: 'Modular Kitchen Design Guide for Indian Homes | Layouts & Materials',
    description:
      'L-shape, U-shape, parallel or straight? A practical modular kitchen guide for Indian cooking: layouts, standard sizes, carcass and shutter materials, and the mistakes to avoid.',
    category: 'Modular Kitchen',
    image: images.kitchen,
    imageAlt: photoAlt('kitchenL'),
    date: '2026-11-10',
    readMin: 4,
    content: `
<p>A modular kitchen is used three or four times a day, every day, for years. It has to handle tadka, steam, heavy steel utensils and a lot of washing. A design that looks good in a showroom photo but ignores Indian cooking habits gets frustrating very quickly. Here is how to plan one that works.</p>

<h2>1. Pick the right layout for your space</h2>
<h3>L-shaped kitchen</h3>
<p>The most common layout in NCR flats. Two walls meet at a corner, giving plenty of counter space and a natural flow from fridge to sink to hob. Use a corner carousel or magic corner so the corner storage is not wasted.</p>
<h3>Parallel (galley) kitchen</h3>
<p>Two counters face each other. Very efficient for narrow kitchens. Keep at least 1,000–1,200 mm of walking space between the counters, so two people can work.</p>
<h3>U-shaped kitchen</h3>
<p>Three walls of counters and the most storage. Best for larger kitchens and families who cook a lot. Needs a room at least about 2.4 m wide.</p>
<h3>Straight (single-wall) kitchen</h3>
<p>Everything on one wall. Good for studios and small 1BHK flats. Add tall units to make up for less counter space.</p>

<h2>2. Plan the work triangle</h2>
<p>The sink, hob and fridge form the "work triangle". Keep them close enough to save steps but not so close that people bump into each other. As a guide, each side should be between about 1.2 m and 2.7 m. The sink usually goes under the window, and the hob should not be right next to the fridge or the window (wind blows out the flame).</p>

<h2>3. Standard kitchen sizes that suit Indian cooking</h2>
<ul>
  <li><strong>Counter height:</strong> 850–900 mm from the floor. Taller family members may prefer the higher end.</li>
  <li><strong>Counter depth:</strong> about 600 mm.</li>
  <li><strong>Gap between counter and wall cabinets:</strong> about 600 mm, so you can see and reach the back of the counter.</li>
  <li><strong>Chimney height above the hob:</strong> about 650–750 mm, as per the chimney maker's manual.</li>
  <li><strong>Wall cabinet depth:</strong> about 300–350 mm.</li>
</ul>

<h2>4. Choose the right materials</h2>
<h3>Carcass (the cabinet box)</h3>
<ul>
  <li><strong>BWP plywood (boiling water proof):</strong> the best choice under the sink and anywhere near water.</li>
  <li><strong>BWR / MR plywood:</strong> good for the rest of the kitchen.</li>
  <li><strong>HDHMR board:</strong> a dense engineered board that resists moisture well and is a good value option.</li>
  <li>Avoid plain particle board in the kitchen. It swells when it gets wet.</li>
</ul>
<h3>Shutters (the front finish)</h3>
<ul>
  <li><strong>Laminate:</strong> tough, scratch-resistant and budget friendly. Matte or textured finishes hide fingerprints.</li>
  <li><strong>Acrylic:</strong> high-gloss, mirror-like look. Looks premium but shows scratches more easily.</li>
  <li><strong>PU paint:</strong> smooth, seamless finish in any colour. Premium and can be repainted.</li>
  <li><strong>Glass:</strong> for a few wall cabinets to break up a long run of shutters.</li>
</ul>
<h3>Countertop</h3>
<p>Granite is still the most practical choice for Indian kitchens: heat-resistant, strong and affordable. Quartz gives a cleaner modern look but needs a hot-pan stand near the hob.</p>

<h2>5. Storage that actually gets used</h2>
<ul>
  <li>Deep drawers for heavy utensils instead of shelves you have to bend into</li>
  <li>A tall pantry unit for groceries and masalas</li>
  <li>A cutlery and thali drawer close to the sink</li>
  <li>A pull-out bin and detergent unit under the sink</li>
  <li>A separate tall unit or shelf for the microwave and OTG at a safe height</li>
</ul>

<h2>6. Mistakes we see most often</h2>
<ol>
  <li>Not enough electrical points. Plan for mixer, microwave, OTG, RO, chimney, fridge and a spare.</li>
  <li>Ordinary plywood under the sink, which swells within a couple of years.</li>
  <li>Cheap hinges and channels. Soft-close hardware from a known brand is worth it.</li>
  <li>No light over the counter. Add an LED strip under the wall cabinets.</li>
  <li>Choosing high-gloss everywhere, then fighting fingerprints and scratches.</li>
</ol>

<h2>Planning a kitchen in Delhi NCR?</h2>
<p>We design and install modular kitchens in <a href="/modular-kitchen/noida">Noida</a>, <a href="/modular-kitchen/ghaziabad">Ghaziabad</a>, <a href="/modular-kitchen/gurgaon">Gurugram</a>, <a href="/modular-kitchen/delhi">Delhi</a> and nearby areas. See our <a href="/kitchen">modular kitchen designs</a> or <a href="/contact">book a free site visit</a> to get a 3D design and an itemised quote.</p>
`,
    faq: [
      {
        q: 'Which modular kitchen layout is best for a small flat?',
        a: 'For small flats, an L-shaped or straight layout works best. A parallel kitchen is also very efficient if the room is narrow and long, with at least about 1 m of walking space between counters.',
      },
      {
        q: 'Which material is best for a modular kitchen in India?',
        a: 'Use BWP plywood under the sink and BWR plywood or HDHMR for the other cabinets. Laminate shutters are the most practical, while acrylic and PU give a more premium look.',
      },
      {
        q: 'What is the standard height of a kitchen counter in India?',
        a: 'A standard kitchen counter is about 850–900 mm high and about 600 mm deep.',
      },
    ],
  },

  // 4 ─────────────────────────────────────────────────────────────
  {
    slug: 'new-flat-interior-checklist-noida-ghaziabad',
    title: 'New Flat Interior Checklist: From Possession to Move-in (Noida, Ghaziabad & Greater Noida)',
    seoTitle: 'New Flat Interior Checklist | Possession to Move-in Guide NCR',
    description:
      'Just got possession of your flat? A step-by-step interior checklist for new flats in Noida, Greater Noida West and Ghaziabad: what to check, the right order of work, budget split and society rules.',
    category: 'Home Interiors',
    image: images.livingAlt,
    imageAlt: photoAlt('livingArchway'),
    date: '2026-11-08',
    readMin: 3,
    content: `
<p>Getting the keys to a new flat in <a href="/interior-designers/greater-noida/greater-noida-west-noida-extension">Noida Extension</a>, <a href="/interior-designers/ghaziabad/raj-nagar-extension">Raj Nagar Extension</a>, <a href="/interior-designers/ghaziabad/crossings-republik">Crossings Republik</a> or a Noida sector is exciting. It is also the moment most people make costly mistakes, by starting interiors in the wrong order or skipping the possession checks. Use this checklist.</p>

<h2>Step 1: Check the flat before you sign the possession letter</h2>
<ul>
  <li><strong>Seepage and damp:</strong> look at ceilings and walls of bathrooms, the kitchen and the walls shared with the balcony.</li>
  <li><strong>Plumbing:</strong> open every tap and flush, check water pressure and drainage speed, and look for leaks below the wash basin.</li>
  <li><strong>Electrical:</strong> test every switch and socket, and check that the MCB board is labelled.</li>
  <li><strong>Tiles:</strong> tap tiles with a coin. A hollow sound means poor bonding.</li>
  <li><strong>Doors and windows:</strong> they should close smoothly, lock properly and be sealed against rain.</li>
  <li><strong>Measurements:</strong> compare the room sizes with the floor plan you were given.</li>
</ul>
<p>Note every issue in writing and ask the builder to fix it before you start interior work. Once your carpenter starts, it becomes hard to prove who caused a problem.</p>

<h2>Step 2: Read your society's interior rules</h2>
<p>Most high-rise societies have rules on working hours (often around 9 am to 6 pm on weekdays), noisy work on Sundays, use of the service lift, debris disposal and a security deposit. Some need a written NOC before work starts. Collect these rules first so the work does not get stopped halfway.</p>

<h2>Step 3: Do the work in the right order</h2>
<ol>
  <li><strong>Design and 3D:</strong> finalise the layout, furniture positions and lighting before anyone breaks a wall.</li>
  <li><strong>Civil changes:</strong> any wall, tile or bathroom changes.</li>
  <li><strong>Electrical and plumbing:</strong> new points, AC piping, geyser and RO points, as per the furniture layout.</li>
  <li><strong>False ceiling:</strong> after wiring and AC piping. See the <a href="/blog/false-ceiling-cost-delhi-ncr">false ceiling cost guide</a>.</li>
  <li><strong>Modular work:</strong> kitchen, wardrobes and TV unit are usually made in a factory and fitted at site.</li>
  <li><strong>Painting:</strong> final coat after all carpentry and fitting is done.</li>
  <li><strong>Lights, curtains and décor:</strong> the last step before deep cleaning and move-in.</li>
</ol>

<h2>Step 4: Split your budget sensibly</h2>
<p>Every home is different, but in most new flats the budget roughly splits like this:</p>
<ul>
  <li>Modular kitchen and wardrobes: the largest share, often about half</li>
  <li>False ceiling and lighting: about 10–15%</li>
  <li>Living room (TV unit, panelling, furniture): about 15–20%</li>
  <li>Painting, electrical and small civil work: about 10%</li>
  <li>Décor, curtains and buffer for surprises: about 10%</li>
</ul>
<p>Keep the buffer. Something always comes up.</p>

<h2>Step 5: Plan for the way you live</h2>
<ul>
  <li><strong>Kitchen:</strong> follow the layout and material tips in our <a href="/blog/modular-kitchen-design-guide">modular kitchen guide</a>.</li>
  <li><strong>Bedrooms:</strong> decide sliding or hinged wardrobes based on room width. See the <a href="/blog/sliding-vs-hinged-wardrobe">wardrobe guide</a>.</li>
  <li><strong>Pooja and entrance:</strong> if Vastu matters to your family, check it before the layout is fixed, using our free <a href="/vastu">Vastu score tool</a>.</li>
  <li><strong>Work from home:</strong> a small study corner with enough sockets and good light.</li>
</ul>

<h2>Step 6: How long does it take?</h2>
<p>For a typical 2BHK or 3BHK with kitchen, wardrobes, false ceiling, TV unit and painting, plan for roughly 45–60 days from design approval, depending on the society's working hours and the scope of work.</p>

<h2>We work in your society</h2>
<p>Urbane Living designs homes across <a href="/interior-designers/noida">Noida</a>, <a href="/interior-designers/greater-noida">Greater Noida</a>, <a href="/interior-designers/ghaziabad">Ghaziabad</a> and the rest of Delhi NCR, and we handle society permissions and work timings for you. <a href="/contact">Book a free site visit</a> to get your 3D design and quote.</p>
`,
    faq: [
      {
        q: 'What should I check at the possession of a new flat?',
        a: 'Check for seepage, plumbing leaks and water pressure, every switch and socket, hollow tiles, doors and windows, and compare room sizes with the floor plan. Get every issue fixed by the builder in writing before interior work starts.',
      },
      {
        q: 'What is the right order for interior work in a new flat?',
        a: 'Design first, then civil changes, electrical and plumbing, false ceiling, modular kitchen and wardrobes, painting, and finally lights, curtains and décor.',
      },
      {
        q: 'How long does a 2BHK interior take?',
        a: 'A typical 2BHK or 3BHK with kitchen, wardrobes, false ceiling and painting takes about 45–60 days after the design is approved.',
      },
    ],
  },

  // 5 ─────────────────────────────────────────────────────────────
  {
    slug: 'sliding-vs-hinged-wardrobe',
    title: 'Sliding vs Hinged Wardrobe: Sizes, Materials and Which One Suits Your Bedroom',
    seoTitle: 'Sliding vs Hinged Wardrobe | Sizes, Materials & Design Tips',
    description:
      'Sliding or hinged wardrobe? Compare space, cost and usability, learn the standard wardrobe sizes for Indian bedrooms and pick the right materials and finishes.',
    category: 'Wardrobe',
    image: images.wardrobe,
    imageAlt: photoAlt('wardrobeBedroom'),
    date: '2026-11-06',
    readMin: 3,
    content: `
<p>A wardrobe is the largest piece of furniture in most bedrooms, so the choice between sliding and hinged doors changes how the whole room feels and works. Here is a simple way to decide.</p>

<h2>Sliding vs hinged at a glance</h2>
<table>
  <thead><tr><th>Point</th><th>Sliding wardrobe</th><th>Hinged wardrobe</th></tr></thead>
  <tbody>
    <tr><td>Space in front</td><td>No door swing, good for tight rooms</td><td>Needs about 2 ft clear in front</td></tr>
    <tr><td>Access</td><td>You see one section at a time</td><td>Open the whole wardrobe at once</td></tr>
    <tr><td>Depth needed</td><td>About 650 mm or more (for the track)</td><td>About 600 mm</td></tr>
    <tr><td>Cost</td><td>Higher, because of the track system</td><td>Lower</td></tr>
    <tr><td>Maintenance</td><td>Track needs cleaning, quality hardware matters</td><td>Simple, hinges can be adjusted</td></tr>
    <tr><td>Look</td><td>Sleek, large uninterrupted panels</td><td>Classic, many finish options</td></tr>
  </tbody>
</table>

<h2>Choose sliding if</h2>
<ul>
  <li>The bed is close to the wardrobe wall and doors cannot open fully.</li>
  <li>You want a modern look with large mirror, glass or lacquered panels.</li>
  <li>The wardrobe is long (8 ft or more), where wide panels look good.</li>
</ul>

<h2>Choose hinged if</h2>
<ul>
  <li>You want to see and reach everything at once.</li>
  <li>The budget is tighter.</li>
  <li>The room has enough space in front of the wardrobe.</li>
  <li>You want internal accessories like trouser pull-outs across the full width.</li>
</ul>

<h2>Standard wardrobe sizes for Indian bedrooms</h2>
<ul>
  <li><strong>Height:</strong> 7 ft for a standard unit, or full floor-to-ceiling with a loft for extra storage.</li>
  <li><strong>Depth:</strong> about 600 mm for hinged and 650 mm or more for sliding.</li>
  <li><strong>Hinged shutter width:</strong> about 450–600 mm per door. Wider doors tend to sag.</li>
  <li><strong>Hanging space for shirts:</strong> about 1,000 mm high. For long kurtas and dresses: about 1,500 mm.</li>
  <li><strong>Shelf spacing:</strong> about 300–350 mm for folded clothes.</li>
</ul>

<h2>Materials and finishes</h2>
<ul>
  <li><strong>Carcass:</strong> BWR plywood or HDHMR is strong and handles NCR humidity in the monsoon well.</li>
  <li><strong>Laminate shutters:</strong> durable and affordable, with matte, wood-grain and textured options.</li>
  <li><strong>Acrylic or PU shutters:</strong> premium glossy or smooth look.</li>
  <li><strong>Mirror or tinted glass panels:</strong> make small bedrooms feel larger.</li>
  <li><strong>Hardware:</strong> soft-close hinges and a good sliding track are where you should not save money.</li>
</ul>

<h2>Smart inside storage</h2>
<ul>
  <li>Internal drawers with locks for valuables</li>
  <li>A trouser or saree pull-out</li>
  <li>A loft for suitcases and seasonal bedding</li>
  <li>Sensor LED lights that switch on when the door opens</li>
  <li>A dresser or study unit built into the side of the wardrobe</li>
</ul>

<p>See our <a href="/wardrobe">wardrobe designs</a> and <a href="/bedroom">bedroom interiors</a>, or get a custom wardrobe made in <a href="/wardrobe/noida">Noida</a>, <a href="/wardrobe/ghaziabad">Ghaziabad</a>, <a href="/wardrobe/gurgaon">Gurugram</a> or <a href="/wardrobe/delhi">Delhi</a>. <a href="/contact">Book a free site visit</a> and we will measure the room and show you both options in 3D.</p>
`,
    faq: [
      {
        q: 'Which is better, a sliding or hinged wardrobe?',
        a: 'Sliding wardrobes are better for small rooms because doors do not swing out, and they look sleek. Hinged wardrobes cost less, show the whole storage at once and are simpler to maintain.',
      },
      {
        q: 'What is the standard depth of a wardrobe?',
        a: 'About 600 mm for a hinged wardrobe and about 650 mm or more for a sliding wardrobe, which needs extra depth for the track.',
      },
      {
        q: 'Which material is best for a bedroom wardrobe?',
        a: 'BWR plywood or HDHMR for the carcass, with laminate shutters for durability or acrylic and PU for a premium finish.',
      },
    ],
  },

  // 6 ─────────────────────────────────────────────────────────────
  {
    slug: 'vastu-tips-for-flats',
    title: 'Vastu Tips for Flats: A Room-by-Room Guide (Without Breaking Walls)',
    seoTitle: 'Vastu Tips for Flats & Apartments | Room-by-Room Guide',
    description:
      'Simple Vastu tips for flats: the traditional directions for the entrance, kitchen, bedroom, pooja room and toilets, plus practical fixes that need no demolition.',
    category: 'Vastu',
    image: images.bedroom,
    imageAlt: photoAlt('plumBedroom'),
    date: '2026-11-04',
    readMin: 3,
    content: `
<p>In a flat, you cannot choose which way the building faces. But many families still like to follow Vastu Shastra where they can, especially when planning the interiors. The good news: most Vastu suggestions can be followed through furniture placement, colours and lighting, without breaking a single wall.</p>
<p>Below are the traditional guidelines, room by room. Want a quick score for your own home? Use our free <a href="/vastu">Vastu score tool</a>.</p>

<h2>Main entrance</h2>
<ul>
  <li><strong>Traditional direction:</strong> north, east or north-east facing entrances are considered most auspicious.</li>
  <li>Keep the entrance well lit, clean and free of shoes and clutter.</li>
  <li>A nameplate and a good-quality main door are considered important.</li>
  <li><strong>Fix without demolition:</strong> bright lighting, a clean doormat and a shoe cabinet placed to the side, not in front of the door.</li>
</ul>

<h2>Kitchen</h2>
<ul>
  <li><strong>Traditional direction:</strong> south-east (the fire corner). North-west is the common second choice.</li>
  <li>The cook should ideally face east while cooking.</li>
  <li>Keep the hob and the sink apart, as fire and water are considered opposing elements.</li>
  <li><strong>Fix without demolition:</strong> in a modular kitchen, the hob position can often be planned to face east, and a small counter can separate the hob from the sink. See our <a href="/blog/modular-kitchen-design-guide">kitchen design guide</a>.</li>
</ul>

<h2>Master bedroom</h2>
<ul>
  <li><strong>Traditional direction:</strong> south-west, for stability.</li>
  <li>Sleep with the head towards the south or east.</li>
  <li>Avoid a mirror directly facing the bed.</li>
  <li><strong>Fix without demolition:</strong> place the bed so the headboard is on the south or east wall, and use a wardrobe with a shutter to cover mirrors at night. Our <a href="/blog/sliding-vs-hinged-wardrobe">wardrobe guide</a> explains the options.</li>
</ul>

<h2>Pooja space</h2>
<ul>
  <li><strong>Traditional direction:</strong> north-east, the most sacred corner.</li>
  <li>Face east or north while praying.</li>
  <li>Avoid placing the mandir under a staircase or sharing a wall with a toilet.</li>
  <li><strong>Fix without demolition:</strong> a wall-mounted or compact pooja unit can be fitted in the north-east corner of the living room even in small flats.</li>
</ul>

<h2>Living room</h2>
<ul>
  <li>North, east or north-east is preferred.</li>
  <li>Heavy furniture such as the sofa and TV unit goes on the south or west walls.</li>
  <li>Keep the north-east corner light and open.</li>
</ul>

<h2>Toilets and bathrooms</h2>
<ul>
  <li><strong>Traditional advice:</strong> avoid the north-east. West or north-west is preferred.</li>
  <li><strong>Fix without demolition:</strong> keep the door closed, keep the space dry and well ventilated, and use light colours.</li>
</ul>

<h2>Colours that are commonly suggested</h2>
<ul>
  <li><strong>North:</strong> greens and light blues</li>
  <li><strong>East:</strong> whites and light tones</li>
  <li><strong>South-east:</strong> warm shades like orange, pink or peach</li>
  <li><strong>South-west:</strong> earthy tones like beige and light brown</li>
</ul>

<blockquote>Vastu is a traditional belief system. Follow what matters to your family, but never at the cost of safety, light and ventilation.</blockquote>

<h2>Plan Vastu into your interiors</h2>
<p>The best time to think about Vastu is before the layout is fixed. Our designers plan furniture, pooja units and kitchen layouts with your preferences in mind. Check your home with the <a href="/vastu">free Vastu score tool</a>, then <a href="/contact">book a free site visit</a>.</p>
`,
    faq: [
      {
        q: 'Which direction is best for the kitchen as per Vastu?',
        a: 'South-east is traditionally the best direction for the kitchen, with north-west as the common alternative. The cook should ideally face east.',
      },
      {
        q: 'Can Vastu be followed in a flat without breaking walls?',
        a: 'Yes. Most Vastu suggestions can be followed through furniture placement, bed direction, pooja unit position, colours and lighting.',
      },
      {
        q: 'Where should the pooja room be in a flat?',
        a: 'The north-east corner is traditionally preferred. In small flats, a compact wall-mounted pooja unit in the north-east of the living room works well.',
      },
    ],
  },
];

// newest first
export const sortedBlogPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

export const findBlogPost = (slug) => blogPosts.find((p) => p.slug === slug);