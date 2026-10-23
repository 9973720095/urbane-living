// Home page: 60-second style quiz.
import { cdn } from './config';

// Home page: "Find your design style" quiz. Each option gives points to one style (key).
// Swap the result images for your own project photos of that style.
export const styleQuiz = {
  tag: '60-SECOND STYLE QUIZ',
  title: 'Not sure what your home should look like?',
  highlight: 'Find your design style.',
  subtitle: 'Answer 3 quick questions and get a style made for how your family actually lives.',
  questions: [
    {
      q: 'Your perfect weekend at home looks like…',
      options: [
        { label: 'Movie night on a cosy sofa', emoji: '🍿', style: 'modern' },
        { label: 'Hosting friends & family dinners', emoji: '🥂', style: 'luxury' },
        { label: 'Quiet reading, clutter-free corners', emoji: '📖', style: 'minimal' },
        { label: 'Festivals, pooja & big family gatherings', emoji: '🪔', style: 'classic' },
      ],
    },
    {
      q: 'Pick the colour mood you love most',
      options: [
        { label: 'Warm wood & beige', colors: ['#C8A27A', '#EADBC8', '#7A5C43'], style: 'modern' },
        { label: 'Black, gold & marble', colors: ['#1C1C1C', '#C9A227', '#E9E6E1'], style: 'luxury' },
        { label: 'White, grey & light oak', colors: ['#F5F5F2', '#BFC3C7', '#D9C3A0'], style: 'minimal' },
        { label: 'Teal, maroon & brass', colors: ['#1F5F63', '#7B2D35', '#B88A3B'], style: 'classic' },
      ],
    },
    {
      q: 'What matters most in your new home?',
      options: [
        { label: 'Comfort for everyday living', emoji: '🛋️', style: 'modern' },
        { label: 'A wow factor guests remember', emoji: '✨', style: 'luxury' },
        { label: 'Smart storage & easy cleaning', emoji: '🗄️', style: 'minimal' },
        { label: 'Our roots, with a modern touch', emoji: '🏛️', style: 'classic' },
      ],
    },
  ],
  styles: {
    modern: {
      name: 'Warm Modern',
      text: 'Clean lines softened with warm woods, cove lighting and textured fabrics. Stylish, but made to be lived in every day.',
      palette: ['#C8A27A', '#EADBC8', '#7A5C43', '#2F2F2F'],
      features: ['Cove-lit gypsum ceiling', 'Wooden wall panelling', 'Soft-close modular kitchen', 'Layered warm lighting'],
      image: `${cdn}/image/upload/q_auto/f_auto/v1778583856/hf_20260512_054108_38408685-f67f-4515-a822-985d83019979_y6nnq9.png`,
    },
    luxury: {
      name: 'Modern Luxe',
      text: 'Marble textures, fluted panels, gold accents and statement lights. Every room feels like a 5-star hotel suite.',
      palette: ['#1C1C1C', '#C9A227', '#E9E6E1', '#5B4636'],
      features: ['Designer ceiling with profile lights', 'Marble-finish feature wall', 'Fluted wardrobe shutters', 'Statement chandelier'],
      image: `${cdn}/image/upload/q_auto/f_auto/v1778583833/ChatGPT_Image_May_12_2026_02_40_56_PM_zkd6ex.png`,
    },
    minimal: {
      name: 'Calm Minimal',
      text: 'Light colours, hidden storage and nothing extra. A calm, airy home that is easy to keep clean.',
      palette: ['#F5F5F2', '#BFC3C7', '#D9C3A0', '#3C4043'],
      features: ['Flat ceiling with hidden lights', 'Handle-less wardrobes', 'Full-height storage', 'Light oak & white finishes'],
      image: `${cdn}/image/upload/q_auto/f_auto/v1778585454/ChatGPT_Image_May_12_2026_04_30_35_PM_ptqgea.png`,
    },
    classic: {
      name: 'Indian Contemporary',
      text: 'Rich colours, carved details and a beautiful pooja unit, blended with modern comfort and smart storage.',
      palette: ['#1F5F63', '#7B2D35', '#B88A3B', '#F1E6D6'],
      features: ['Designer pooja unit', 'Jaali & CNC panel details', 'Brass-finish accents', 'Traditional-modern ceiling'],
      image: `${cdn}/image/upload/q_auto/f_auto/v1778583838/ChatGPT_Image_May_12_2026_03_16_05_PM_pnlauy.png`,
    },
  },
  cta: 'Get This Look: Free 3D Design',
};
