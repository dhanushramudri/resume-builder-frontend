import dynamic from 'next/dynamic';
import { IThemeColor, ITemplate } from './index.interface';

export const SYSTEM_COLORS: IThemeColor[] = [
  // Classic Professional
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#2980B9',
    highlighterColor: '#3498DB',
    id: 1,
  },
  // Modern Minimal
  {
    backgroundColor: 'white',
    fontColor: '#333333',
    titleColor: '#16A085',
    highlighterColor: '#1ABC9C',
    id: 2,
  },
  // Executive Style
  {
    backgroundColor: '#FFFFFF',
    fontColor: '#2C3E50',
    titleColor: '#34495E',
    highlighterColor: '#95A5A6',
    id: 3,
  },
  // Creative Professional
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#8E44AD',
    highlighterColor: '#9B59B6',
    id: 4,
  },
  // Tech Modern
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#2980B9',
    highlighterColor: '#3498DB',
    id: 5,
  },
  // Nature Inspired
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#27AE60',
    highlighterColor: '#2ECC71',
    id: 6,
  },
  // Elegant Dark
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#2C3E50',
    highlighterColor: '#7F8C8D',
    id: 7,
  },
  // Warm Professional
  {
    backgroundColor: 'white',
    fontColor: '#34495E',
    titleColor: '#D35400',
    highlighterColor: '#E67E22',
    id: 8,
  },
  // Corporate Blue
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#2980B9',
    highlighterColor: '#3498DB',
    id: 9,
  },
  // Creative Energy
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#C0392B',
    highlighterColor: '#E74C3C',
    id: 10,
  },
  // Minty Fresh
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#16A085',
    highlighterColor: '#1ABC9C',
    id: 11,
  },
  // Royal Purple
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#8E44AD',
    highlighterColor: '#9B59B6',
    id: 12,
  },
  // Ocean Breeze
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#2980B9',
    highlighterColor: '#3498DB',
    id: 13,
  },
  // Forest Green
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#27AE60',
    highlighterColor: '#2ECC71',
    id: 14,
  },
  // Sunset Orange
  {
    backgroundColor: 'white',
    fontColor: '#2C3E50',
    titleColor: '#D35400',
    highlighterColor: '#E67E22',
    id: 15,
  },
];

export const AVAILABLE_TEMPLATES: { [key: string]: ITemplate } = {
  modern: {
    id: 'modern',
    name: 'Modern Resume',
    thumbnail: '/templates/modern.png',
    component: dynamic(() => import('@/templates/modern/MordernTemplate'), {
      ssr: false,
    }),
  },
  professional: {
    id: 'professional',
    name: 'Professional Resume',
    thumbnail: '/templates/professional.png',
    component: dynamic(() => import('@/templates/professional/ProfessionalTemplate'), {
      ssr: false,
    }),
  },
  ats: {
    id: 'ats',
    name: 'ATS-Friendly Resume',
    thumbnail: '/templates/ats.png',
    component: dynamic(() => import('@/templates/ats/ATSTemplate'), {
      ssr: false,
    }),
  },
  minimalist: {
    id: 'minimalist',
    name: 'Minimalist Resume',
    thumbnail: '/templates/minimalist.png',
    component: dynamic(() => import('@/templates/minimalist/MinimalistTemplate'), {
      ssr: false,
    }),
  },
  elegant: {
    id: 'elegant',
    name: 'Elegant Template',
    thumbnail: '/templates/elegant.png',
    component: dynamic(() => import('@/templates/elegant/ElegantTemplate'), {
      ssr: false,
    }),
  },
  creative: {
    id: 'creative',
    name: 'Creative Template',
    thumbnail: '/templates/creative.png',
    component: dynamic(() => import('@/templates/creative/CreativeTemplate'), {
      ssr: false,
    }),
  },
  deedy: {
    id: 'deedy',
    name: 'Deedy Resume',
    thumbnail: '/templates/deedy.png',
    component: dynamic(() => import('@/templates/deedy/DeedyTemplate'), {
      ssr: false,
    }),
  },
};

// export const CUSTOM_THEME_COLOR: IThemeColor = {
//   backgroundColor: 'white',
//   fontColor: 'black',
//   titleColor: 'green',
//   highlighterColor: '#ff7875',
//   id: 4,
// };
export const CUSTOM_THEME_COLOR: IThemeColor = {
  backgroundColor: 'white',
  fontColor: '#2C3E50',
  titleColor: '#3498DB',
  highlighterColor: '#2980B9',
  id: 16,
};

export const DATE_PICKER_FORMAT = 'DD/MM/YYYY';
