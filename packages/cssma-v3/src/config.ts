/**
 * 기본 설정 및 프리셋 정의
 * 
 * Tailwind CSS의 테마 시스템을 참고하여 설계됨
 * - CSS 변수를 활용한 동적 테마 전환 지원
 * - light/dark 모드는 CSS custom properties 재정의로 구현
 * - 색상 값은 HSL 형식으로 저장하여 CSS 변수와 호환성 극대화
 * - 기본 구조: --color-primary: 220 14% 50% (hue saturation lightness)
 * - 사용 예시: hsl(var(--color-primary)) 또는 hsl(var(--color-primary) / 0.8)
 * - 각 색상은 의미론적 이름과 shade 레벨로 구성
 * 기본 설정 및 프리셋 정의
 */

import { Config, DesignPreset, Color, ColorPalette } from './types';

/**
 * 기본 설정
 */
export const DEFAULT_CONFIG: Config = {
  prefix: '',
  separator: ':',
  important: false,
  enableArbitraryValues: true,
  enableStateModifiers: true,
  enableResponsiveModifiers: true,
};

/**
 * 기본 색상 팔레트
 */
const DEFAULT_COLORS: ColorPalette = {
  blue: {
    '50': { r: 0.94, g: 0.97, b: 1 },
    '100': { r: 0.86, g: 0.92, b: 1 },
    '200': { r: 0.75, g: 0.86, b: 1 },
    '300': { r: 0.58, g: 0.77, b: 0.99 },
    '400': { r: 0.38, g: 0.65, b: 0.98 },
    '500': { r: 0.2314, g: 0.5098, b: 0.9647 }, // #3b82f6 정확한 값
    '600': { r: 0.15, g: 0.39, b: 0.92 },
    '700': { r: 0.11, g: 0.31, b: 0.85 },
    '800': { r: 0.12, g: 0.25, b: 0.69 },
    '900': { r: 0.12, g: 0.23, b: 0.54 },
  },
  red: {
    '50': { r: 1, g: 0.95, b: 0.95 },
    '100': { r: 1, g: 0.89, b: 0.89 },
    '200': { r: 1, g: 0.79, b: 0.79 },
    '300': { r: 0.99, g: 0.65, b: 0.65 },
    '400': { r: 0.97, g: 0.44, b: 0.44 },
    '500': { r: 0.9373, g: 0.2667, b: 0.2667 }, // #ef4444 정확한 값
    '600': { r: 0.86, g: 0.15, b: 0.15 },
    '700': { r: 0.73, g: 0.11, b: 0.11 },
    '800': { r: 0.6, g: 0.11, b: 0.11 },
    '900': { r: 0.5, g: 0.11, b: 0.11 },
  },
  green: {
    '50': { r: 0.94, g: 0.99, b: 0.96 },
    '100': { r: 0.86, g: 0.99, b: 0.9 },
    '200': { r: 0.73, g: 0.97, b: 0.82 },
    '300': { r: 0.53, g: 0.94, b: 0.67 },
    '400': { r: 0.29, g: 0.87, b: 0.5 },
    '500': { r: 0.13, g: 0.77, b: 0.37 }, // #22c55e
    '600': { r: 0.09, g: 0.64, b: 0.29 },
    '700': { r: 0.08, g: 0.5, b: 0.24 },
    '800': { r: 0.09, g: 0.4, b: 0.2 },
    '900': { r: 0.08, g: 0.32, b: 0.18 },
  },
  slate: {
    '50': { r: 0.9804, g: 0.9804, b: 0.9843 },
    '100': { r: 0.9451, g: 0.9490, b: 0.9569 },
    '200': { r: 0.8863, g: 0.8941, b: 0.9098 },
    '300': { r: 0.7961, g: 0.8118, b: 0.8353 },
    '400': { r: 0.5804, g: 0.6392, b: 0.7059 },
    '500': { r: 0.3922, g: 0.4549, b: 0.5451 },
    '600': { r: 0.2745, g: 0.3333, b: 0.4118 },
    '700': { r: 0.2039, g: 0.2549, b: 0.3294 },
    '800': { r: 0.1216, g: 0.1608, b: 0.2275 },
    '900': { r: 0.0588, g: 0.0902, b: 0.1451 },
  },
  gray: {
    '50': { r: 0.9804, g: 0.9804, b: 0.9804 }, // #fafafa
    '100': { r: 0.9569, g: 0.9569, b: 0.9569 }, // #f4f4f5
    '200': { r: 0.8980, g: 0.8980, b: 0.8980 }, // #e5e5e5
    '300': { r: 0.8314, g: 0.8314, b: 0.8314 }, // #d4d4d4
    '400': { r: 0.6431, g: 0.6431, b: 0.6431 }, // #a3a3a3
    '500': { r: 0.4549, g: 0.4549, b: 0.4549 }, // #737373
    '600': { r: 0.3255, g: 0.3255, b: 0.3255 }, // #525252
    '700': { r: 0.2549, g: 0.2549, b: 0.2549 }, // #404040
    '800': { r: 0.1647, g: 0.1647, b: 0.1647 }, // #262626
    '900': { r: 0.0902, g: 0.0902, b: 0.0902 }, // #171717
  },
  zinc: {
    '50': { r: 0.9804, g: 0.9804, b: 0.9804 }, // #fafafa
    '100': { r: 0.9569, g: 0.9569, b: 0.9569 }, // #f4f4f5
    '200': { r: 0.8980, g: 0.8980, b: 0.8980 }, // #e4e4e7
    '300': { r: 0.8314, g: 0.8314, b: 0.8353 }, // #d4d4d8
    '400': { r: 0.6431, g: 0.6431, b: 0.6471 }, // #a1a1aa
    '500': { r: 0.4588, g: 0.4588, b: 0.4667 }, // #71717a
    '600': { r: 0.3255, g: 0.3255, b: 0.3373 }, // #52525b
    '700': { r: 0.2549, g: 0.2549, b: 0.2667 }, // #3f3f46
    '800': { r: 0.1647, g: 0.1647, b: 0.1725 }, // #27272a
    '900': { r: 0.0902, g: 0.0902, b: 0.0941 }, // #18181b
  },
  neutral: {
    '50': { r: 0.9804, g: 0.9804, b: 0.9804 }, // #fafafa
    '100': { r: 0.9569, g: 0.9569, b: 0.9569 }, // #f5f5f5
    '200': { r: 0.8980, g: 0.8980, b: 0.8980 }, // #e5e5e5
    '300': { r: 0.8314, g: 0.8314, b: 0.8314 }, // #d4d4d4
    '400': { r: 0.6431, g: 0.6431, b: 0.6431 }, // #a3a3a3
    '500': { r: 0.4549, g: 0.4549, b: 0.4549 }, // #737373
    '600': { r: 0.3255, g: 0.3255, b: 0.3255 }, // #525252
    '700': { r: 0.2549, g: 0.2549, b: 0.2549 }, // #404040
    '800': { r: 0.1647, g: 0.1647, b: 0.1647 }, // #262626
    '900': { r: 0.0902, g: 0.0902, b: 0.0902 }, // #171717
  },
  stone: {
    '50': { r: 0.9804, g: 0.9804, b: 0.9765 }, // #fafaf9
    '100': { r: 0.9569, g: 0.9529, b: 0.9451 }, // #f5f5f4
    '200': { r: 0.9059, g: 0.8980, b: 0.8863 }, // #e7e5e4
    '300': { r: 0.8392, g: 0.8275, b: 0.8039 }, // #d6d3d1
    '400': { r: 0.6588, g: 0.6353, b: 0.5882 }, // #a8a29e
    '500': { r: 0.4706, g: 0.4431, b: 0.4000 }, // #78716c
    '600': { r: 0.3412, g: 0.3137, b: 0.2824 }, // #57534e
    '700': { r: 0.2667, g: 0.2431, b: 0.2196 }, // #44403c
    '800': { r: 0.1725, g: 0.1569, b: 0.1412 }, // #292524
    '900': { r: 0.0980, g: 0.0902, b: 0.0824 }, // #1c1917
  },
  orange: {
    '50': { r: 1, g: 0.9686, b: 0.9294 }, // #fff7ed
    '100': { r: 1, g: 0.9294, b: 0.8353 }, // #ffedd5
    '200': { r: 0.9961, g: 0.8431, b: 0.6627 }, // #fed7aa
    '300': { r: 0.9922, g: 0.7333, b: 0.4627 }, // #fdba74
    '400': { r: 0.9843, g: 0.5804, b: 0.2549 }, // #fb923c
    '500': { r: 0.9765, g: 0.4510, b: 0.0941 }, // #f97316
    '600': { r: 0.9176, g: 0.3412, b: 0.0471 }, // #ea580c
    '700': { r: 0.7647, g: 0.2549, b: 0.0392 }, // #c2410c
    '800': { r: 0.6118, g: 0.2039, b: 0.0392 }, // #9a3412
    '900': { r: 0.5059, g: 0.1765, b: 0.0431 }, // #7c2d12
  },
  amber: {
    '50': { r: 1, g: 0.9922, b: 0.9176 }, // #fffbeb
    '100': { r: 0.9961, g: 0.9765, b: 0.7882 }, // #fef3c7
    '200': { r: 0.9922, g: 0.9412, b: 0.5882 }, // #fde68a
    '300': { r: 0.9882, g: 0.8824, b: 0.3686 }, // #fcd34d
    '400': { r: 0.9843, g: 0.7843, b: 0.1569 }, // #fbbf24
    '500': { r: 0.9608, g: 0.6196, b: 0.0667 }, // #f59e0b
    '600': { r: 0.8510, g: 0.4667, b: 0.0392 }, // #d97706
    '700': { r: 0.6941, g: 0.3451, b: 0.0353 }, // #b45309
    '800': { r: 0.5647, g: 0.2784, b: 0.0392 }, // #92400e
    '900': { r: 0.4706, g: 0.2392, b: 0.0392 }, // #78350f
  },
  lime: {
    '50': { r: 0.9686, g: 1, b: 0.9216 }, // #f7fee7
    '100': { r: 0.9255, g: 0.9961, b: 0.8000 }, // #ecfccb
    '200': { r: 0.8392, g: 0.9882, b: 0.6000 }, // #d9f99d
    '300': { r: 0.7294, g: 0.9725, b: 0.3882 }, // #bef264
    '400': { r: 0.6039, g: 0.9333, b: 0.2275 }, // #9ae839
    '500': { r: 0.5176, g: 0.8471, b: 0.1216 }, // #84cc16
    '600': { r: 0.4000, g: 0.7137, b: 0.0745 }, // #65a30d
    '700': { r: 0.3098, g: 0.5569, b: 0.0667 }, // #4d7c0f
    '800': { r: 0.2471, g: 0.4471, b: 0.0706 }, // #3f6212
    '900': { r: 0.2118, g: 0.3804, b: 0.0745 }, // #365314
  },
  emerald: {
    '50': { r: 0.9490, g: 0.9922, b: 0.9412 }, // #e7f6ed
    '100': { r: 0.8627, g: 0.9843, b: 0.8627 }, // #d1fadf
    '200': { r: 0.7373, g: 0.9686, b: 0.7373 }, // #b7f3c9
    '300': { r: 0.5882, g: 0.9373, b: 0.5882 }, // #99e9b2
    '400': { r: 0.4196, g: 0.8784, b: 0.4196 }, // #74d78f
    '500': { r: 0.3020, g: 0.7686, b: 0.3882 }, // #4ade80
    '600': { r: 0.2235, g: 0.6784, b: 0.3020 }, // #34d058
    '700': { r: 0.1804, g: 0.5569, b: 0.2431 }, // #22c55e
    '800': { r: 0.1412, g: 0.4471, b: 0.1961 }, // #16a34a
    '900': { r: 0.1020, g: 0.3412, b: 0.1412 }, // #15803d
  },
  teal: {
    '50': { r: 0.9490, g: 0.9922, b: 0.9412 }, // #e7f6ed
    '100': { r: 0.8627, g: 0.9843, b: 0.8627 }, // #d1fadf
    '200': { r: 0.7373, g: 0.9686, b: 0.7373 }, // #b7f3c9
    '300': { r: 0.5882, g: 0.9373, b: 0.5882 }, // #99e9b2
    '400': { r: 0.4196, g: 0.8784, b: 0.4196 }, // #74d78f
    '500': { r: 0.3020, g: 0.7686, b: 0.3882 }, // #4ade80
    '600': { r: 0.2235, g: 0.6784, b: 0.3020 }, // #34d058
    '700': { r: 0.1804, g: 0.5569, b: 0.2431 }, // #22c55e
    '800': { r: 0.1412, g: 0.4471, b: 0.1961 }, // #16a34a
    '900': { r: 0.1020, g: 0.3412, b: 0.1412 }, // #15803d
  },
  cyan: {
    '50': { r: 0.9490, g: 0.9922, b: 0.9412 }, // #e7f6ed
    '100': { r: 0.8627, g: 0.9843, b: 0.8627 }, // #d1fadf
    '200': { r: 0.7373, g: 0.9686, b: 0.7373 }, // #b7f3c9
    '300': { r: 0.5882, g: 0.9373, b: 0.5882 }, // #99e9b2
    '400': { r: 0.4196, g: 0.8784, b: 0.4196 }, // #74d78f
    '500': { r: 0.3020, g: 0.7686, b: 0.3882 }, // #4ade80
    '600': { r: 0.2235, g: 0.6784, b: 0.3020 }, // #34d058
    '700': { r: 0.1804, g: 0.5569, b: 0.2431 }, // #22c55e
    '800': { r: 0.1412, g: 0.4471, b: 0.1961 }, // #16a34a
    '900': { r: 0.1020, g: 0.3412, b: 0.1412 }, // #15803d
  },
  sky: {
    '50': { r: 0.9490, g: 0.9922, b: 0.9412 }, // #e7f6ed
    '100': { r: 0.8627, g: 0.9843, b: 0.8627 }, // #d1fadf
    '200': { r: 0.7373, g: 0.9686, b: 0.7373 }, // #b7f3c9
    '300': { r: 0.5882, g: 0.9373, b: 0.5882 }, // #99e9b2
    '400': { r: 0.4196, g: 0.8784, b: 0.4196 }, // #74d78f
    '500': { r: 0.3020, g: 0.7686, b: 0.3882 }, // #4ade80
    '600': { r: 0.2235, g: 0.6784, b: 0.3020 }, // #34d058
    '700': { r: 0.1804, g: 0.5569, b: 0.2431 }, // #22c55e
    '800': { r: 0.1412, g: 0.4471, b: 0.1961 }, // #16a34a
    '900': { r: 0.1020, g: 0.3412, b: 0.1412 }, // #15803d
  },
  indigo: {
    '50': { r: 0.9490, g: 0.9922, b: 0.9412 }, // #e7f6ed
    '100': { r: 0.8627, g: 0.9843, b: 0.8627 }, // #d1fadf
    '200': { r: 0.7373, g: 0.9686, b: 0.7373 }, // #b7f3c9
    '300': { r: 0.5882, g: 0.9373, b: 0.5882 }, // #99e9b2
    '400': { r: 0.4196, g: 0.8784, b: 0.4196 }, // #74d78f
    '500': { r: 0.3020, g: 0.7686, b: 0.3882 }, // #4ade80
    '600': { r: 0.2235, g: 0.6784, b: 0.3020 }, // #34d058
    '700': { r: 0.1804, g: 0.5569, b: 0.2431 }, // #22c55e
    '800': { r: 0.1412, g: 0.4471, b: 0.1961 }, // #16a34a
    '900': { r: 0.1020, g: 0.3412, b: 0.1412 }, // #15803d
  },
  violet: {
    '50': { r: 0.9490, g: 0.9922, b: 0.9412 }, // #e7f6ed
    '100': { r: 0.8627, g: 0.9843, b: 0.8627 }, // #d1fadf
    '200': { r: 0.7373, g: 0.9686, b: 0.7373 }, // #b7f3c9
    '300': { r: 0.5882, g: 0.9373, b: 0.5882 }, // #99e9b2
    '400': { r: 0.4196, g: 0.8784, b: 0.4196 }, // #74d78f
    '500': { r: 0.3020, g: 0.7686, b: 0.3882 }, // #4ade80
    '600': { r: 0.2235, g: 0.6784, b: 0.3020 }, // #34d058
    '700': { r: 0.1804, g: 0.5569, b: 0.2431 }, // #22c55e
    '800': { r: 0.1412, g: 0.4471, b: 0.1961 }, // #16a34a
    '900': { r: 0.1020, g: 0.3412, b: 0.1412 }, // #15803d
  },
  fuchsia: {
    '50': { r: 0.9490, g: 0.9922, b: 0.9412 }, // #e7f6ed
    '100': { r: 0.8627, g: 0.9843, b: 0.8627 }, // #d1fadf
    '200': { r: 0.7373, g: 0.9686, b: 0.7373 }, // #b7f3c9
    '300': { r: 0.5882, g: 0.9373, b: 0.5882 }, // #99e9b2
    '400': { r: 0.4196, g: 0.8784, b: 0.4196 }, // #74d78f
    '500': { r: 0.3020, g: 0.7686, b: 0.3882 }, // #4ade80
    '600': { r: 0.2235, g: 0.6784, b: 0.3020 }, // #34d058
    '700': { r: 0.1804, g: 0.5569, b: 0.2431 }, // #22c55e
    '800': { r: 0.1412, g: 0.4471, b: 0.1961 }, // #16a34a
    '900': { r: 0.1020, g: 0.3412, b: 0.1412 }, // #15803d
  },
  pink: {
    '50': { r: 0.9490, g: 0.9922, b: 0.9412 }, // #e7f6ed
    '100': { r: 0.8627, g: 0.9843, b: 0.8627 }, // #d1fadf
    '200': { r: 0.7373, g: 0.9686, b: 0.7373 }, // #b7f3c9
    '300': { r: 0.5882, g: 0.9373, b: 0.5882 }, // #99e9b2
    '400': { r: 0.4196, g: 0.8784, b: 0.4196 }, // #74d78f
    '500': { r: 0.3020, g: 0.7686, b: 0.3882 }, // #4ade80
    '600': { r: 0.2235, g: 0.6784, b: 0.3020 }, // #34d058
    '700': { r: 0.1804, g: 0.5569, b: 0.2431 }, // #22c55e
    '800': { r: 0.1412, g: 0.4471, b: 0.1961 }, // #16a34a
    '900': { r: 0.1020, g: 0.3412, b: 0.1412 }, // #15803d
  },
  rose: {
    '50': { r: 0.9490, g: 0.9922, b: 0.9412 }, // #e7f6ed
    '100': { r: 0.8627, g: 0.9843, b: 0.8627 }, // #d1fadf
    '200': { r: 0.7373, g: 0.9686, b: 0.7373 }, // #b7f3c9
    '300': { r: 0.5882, g: 0.9373, b: 0.5882 }, // #99e9b2
    '400': { r: 0.4196, g: 0.8784, b: 0.4196 }, // #74d78f
    '500': { r: 0.3020, g: 0.7686, b: 0.3882 }, // #4ade80
    '600': { r: 0.2235, g: 0.6784, b: 0.3020 }, // #34d058
    '700': { r: 0.1804, g: 0.5569, b: 0.2431 }, // #22c55e
    '800': { r: 0.1412, g: 0.4471, b: 0.1961 }, // #16a34a
    '900': { r: 0.1020, g: 0.3412, b: 0.1412 }, // #15803d
  },
  yellow: {
    '50': { r: 0.9490, g: 0.9922, b: 0.9412 }, // #e7f6ed
    '100': { r: 0.8627, g: 0.9843, b: 0.8627 }, // #d1fadf
    '200': { r: 0.7373, g: 0.9686, b: 0.7373 }, // #b7f3c9
    '300': { r: 0.5882, g: 0.9373, b: 0.5882 }, // #99e9b2
    '400': { r: 0.4196, g: 0.8784, b: 0.4196 }, // #74d78f
    '500': { r: 0.3020, g: 0.7686, b: 0.3882 }, // #4ade80
    '600': { r: 0.2235, g: 0.6784, b: 0.3020 }, // #34d058
    '700': { r: 0.1804, g: 0.5569, b: 0.2431 }, // #22c55e
    '800': { r: 0.1412, g: 0.4471, b: 0.1961 }, // #16a34a
    '900': { r: 0.1020, g: 0.3412, b: 0.1412 }, // #15803d
  },
  purple: {
    '50': { r: 0.9490, g: 0.9922, b: 0.9412 }, // #e7f6ed
    '100': { r: 0.8627, g: 0.9843, b: 0.8627 }, // #d1fadf
    '200': { r: 0.7373, g: 0.9686, b: 0.7373 }, // #b7f3c9
    '300': { r: 0.5882, g: 0.9373, b: 0.5882 }, // #99e9b2
    '400': { r: 0.4196, g: 0.8784, b: 0.4196 }, // #74d78f
    '500': { r: 0.3020, g: 0.7686, b: 0.3882 }, // #4ade80
    '600': { r: 0.2235, g: 0.6784, b: 0.3020 }, // #34d058
    '700': { r: 0.1804, g: 0.5569, b: 0.2431 }, // #22c55e
    '800': { r: 0.1412, g: 0.4471, b: 0.1961 }, // #16a34a
    '900': { r: 0.1020, g: 0.3412, b: 0.1412 }, // #15803d
  },
  // 추가 색상
// 시맨틱 컬러 (용도별 특화 색상)
  primary: {
    '50': { r: 0.9412, g: 0.9765, b: 1.0000 }, // #f0f9ff
    '100': { r: 0.8784, g: 0.9529, b: 1.0000 }, // #e0f2fe
    '200': { r: 0.7294, g: 0.9020, b: 0.9961 }, // #bae6fd
    '300': { r: 0.4902, g: 0.8314, b: 0.9882 }, // #7dd3fc
    '400': { r: 0.2235, g: 0.7373, b: 0.9725 }, // #38bdf8
    '500': { r: 0.0588, g: 0.6392, b: 0.9176 }, // #0ea5e9
    '600': { r: 0.0078, g: 0.5216, b: 0.8078 }, // #0284c7
    '700': { r: 0.0118, g: 0.4157, b: 0.6627 }, // #0369a1
    '800': { r: 0.0275, g: 0.3333, b: 0.5216 }, // #075985
    '900': { r: 0.0314, g: 0.2667, b: 0.4196 }, // #0c4a6e
  },
  secondary: {
    '50': { r: 0.9804, g: 0.9804, b: 0.9843 }, // #fafafa
    '100': { r: 0.9608, g: 0.9608, b: 0.9647 }, // #f5f5f5
    '200': { r: 0.8941, g: 0.8941, b: 0.9020 }, // #e5e5e5
    '300': { r: 0.8196, g: 0.8196, b: 0.8275 }, // #d4d4d4
    '400': { r: 0.6431, g: 0.6431, b: 0.6510 }, // #a3a3a3
    '500': { r: 0.4627, g: 0.4627, b: 0.4706 }, // #737373
    '600': { r: 0.3255, g: 0.3255, b: 0.3333 }, // #525252
    '700': { r: 0.2510, g: 0.2510, b: 0.2588 }, // #404040
    '800': { r: 0.1647, g: 0.1647, b: 0.1725 }, // #262626
    '900': { r: 0.0941, g: 0.0941, b: 0.1020 }, // #171717
  },
  success: {
    '50': { r: 0.9412, g: 0.9922, b: 0.9529 }, // #f0fdf4
    '100': { r: 0.8627, g: 0.9843, b: 0.8902 }, // #dcfce7
    '200': { r: 0.7373, g: 0.9686, b: 0.7804 }, // #bbf7d0
    '300': { r: 0.5647, g: 0.9373, b: 0.6275 }, // #86efac
    '400': { r: 0.3765, g: 0.8784, b: 0.4627 }, // #4ade80
    '500': { r: 0.2196, g: 0.8039, b: 0.3451 }, // #22c55e
    '600': { r: 0.1647, g: 0.7020, b: 0.2667 }, // #16a34a
    '700': { r: 0.1333, g: 0.5451, b: 0.2196 }, // #15803d
    '800': { r: 0.1373, g: 0.4314, b: 0.2039 }, // #166534
    '900': { r: 0.1176, g: 0.3529, b: 0.1804 }, // #14532d
  },
  warning: {
    '50': { r: 1.0000, g: 0.9843, b: 0.9216 }, // #fffbeb
    '100': { r: 0.9961, g: 0.9529, b: 0.7843 }, // #fef3c7
    '200': { r: 0.9922, g: 0.9020, b: 0.5961 }, // #fde68a
    '300': { r: 0.9882, g: 0.8235, b: 0.4078 }, // #fcd34d
    '400': { r: 0.9804, g: 0.7294, b: 0.2549 }, // #fbbf24
    '500': { r: 0.9608, g: 0.6196, b: 0.1569 }, // #f59e0b
    '600': { r: 0.8745, g: 0.4941, b: 0.1059 }, // #d97706
    '700': { r: 0.7333, g: 0.3725, b: 0.0784 }, // #b45309
    '800': { r: 0.5922, g: 0.2863, b: 0.0784 }, // #92400e
    '900': { r: 0.4863, g: 0.2314, b: 0.0784 }, // #78350f
  },
  error: {
    '50': { r: 0.9961, g: 0.9490, b: 0.9490 }, // #fef2f2
    '100': { r: 0.9922, g: 0.8745, b: 0.8745 }, // #fee2e2
    '200': { r: 0.9843, g: 0.7961, b: 0.7961 }, // #fecaca
    '300': { r: 0.9765, g: 0.6471, b: 0.6471 }, // #fca5a5
    '400': { r: 0.9569, g: 0.4667, b: 0.4667 }, // #f87171
    '500': { r: 0.9373, g: 0.2667, b: 0.2667 }, // #ef4444
    '600': { r: 0.8627, g: 0.1529, b: 0.1529 }, // #dc2626
    '700': { r: 0.7294, g: 0.1529, b: 0.1529 }, // #b91c1c
    '800': { r: 0.6000, g: 0.1529, b: 0.1529 }, // #991b1b
    '900': { r: 0.4980, g: 0.1529, b: 0.1529 }, // #7f1d1d
  },
  info: {
    '50': { r: 0.9373, g: 0.9725, b: 1.0000 }, // #eff6ff
    '100': { r: 0.8627, g: 0.9373, b: 0.9961 }, // #dbeafe
    '200': { r: 0.7490, g: 0.8980, b: 0.9922 }, // #bfdbfe
    '300': { r: 0.5765, g: 0.8275, b: 0.9882 }, // #93c5fd
    '400': { r: 0.3765, g: 0.7294, b: 0.9804 }, // #60a5fa
    '500': { r: 0.2314, g: 0.6314, b: 0.9569 }, // #3b82f6
    '600': { r: 0.1451, g: 0.5176, b: 0.9176 }, // #2563eb
    '700': { r: 0.1137, g: 0.4039, b: 0.8431 }, // #1d4ed8
    '800': { r: 0.1176, g: 0.3137, b: 0.7137 }, // #1e40af
    '900': { r: 0.1216, g: 0.2431, b: 0.5804 }, // #1e3a8a
  },
};

/**
 * 기본 프리셋
 */
export const DEFAULT_PRESET: DesignPreset = {
  name: 'default',
  version: '3.0.0',
  colors: DEFAULT_COLORS,
  spacing: {
    '0': 0,
    '1': 4,
    '2': 8,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '8': 32,
    '10': 40,
    '12': 48,
    '16': 64,
    '20': 80,
    '24': 96,
    '32': 128,
    '40': 160,
    '48': 192,
    '56': 224,
    '64': 256,
  },
  typography: {
    fontSize: {
      'xs': 12,
      'sm': 14,
      'base': 16,
      'lg': 18,
      'xl': 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
      '7xl': 72,
      '8xl': 96,
      '9xl': 128,
    },
    fontWeight: {
      'thin': 100,
      'extralight': 200,
      'light': 300,
      'normal': 400,
      'medium': 500,
      'semibold': 600,
      'bold': 700,
      'extrabold': 800,
      'black': 900,
    },
    lineHeight: {
      'none': 1,
      'tight': 1.25,
      'snug': 1.375,
      'normal': 1.5,
      'relaxed': 1.625,
      'loose': 2,
    },
    letterSpacing: {
      'tighter': -0.8,
      'tight': -0.4,
      'normal': 0,
      'wide': 0.4,
      'wider': 0.8,
      'widest': 1.6,
    },
    fontFamily: {
      'sans': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      'serif': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      'mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
  },
  effects: {
    boxShadow: {
      'none': 'none',
      'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'default': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },
    textShadow: {
      'none': 'none',
      'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
      'default': '0 2px 4px rgba(0, 0, 0, 0.1)',
      'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
      'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
      '2xl': '0 25px 50px rgba(0, 0, 0, 0.1)',
      'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    blur: {
      'none': 0,
      'sm': 4,
      'default': 8,
      'md': 12,
      'lg': 16,
      'xl': 24,
      '2xl': 40,
      '3xl': 64,
    },
    brightness: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    contrast: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    grayscale: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    saturate: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    dropShadow: {
      'none': 'none',
      'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
      'default': '0 2px 4px rgba(0, 0, 0, 0.1)',
      'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
      'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
      '2xl': '0 25px 50px rgba(0, 0, 0, 0.1)',
    },
    opacity: {
      '0': 0,
      '5': 0.05,
      '10': 0.1,
      '20': 0.2,
      '25': 0.25,
      '30': 0.3,
      '40': 0.4,
      '50': 0.5,
      '60': 0.6,
      '70': 0.7,
      '75': 0.75,
      '80': 0.8,
      '90': 0.9,
      '95': 0.95,
      '100': 1,
    },
    borderRadius: {
      'none': 0,
      'sm': 2,
      'default': 4,
      'md': 6,
      'lg': 8,
      'xl': 12,
      '2xl': 16,
      '3xl': 24,
      'full': 9999,
    },
  },
  layout: {
    width: {
      'auto': 'auto',
      'full': '100%',
      'screen': '100vw',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
    height: {
      'auto': 'auto',
      'full': '100%',
      'screen': '100vh',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
    maxWidth: {
      'none': 'none',
      'xs': 320,
      'sm': 384,
      'md': 448,
      'lg': 512,
      'xl': 576,
      '2xl': 672,
      '3xl': 768,
      '4xl': 896,
      '5xl': 1024,
      '6xl': 1152,
      '7xl': 1280,
      'full': '100%',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
      'prose': 672,
    },
    maxHeight: {
      'none': 'none',
      'full': '100%',
      'screen': '100vh',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
    minWidth: {
      '0': 0,
      'full': '100%',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
    minHeight: {
      '0': 0,
      'full': '100%',
      'screen': '100vh',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
  },
  animation: {
    presets: {
      'spin': {
        name: 'spin',
        duration: 1000,
        timingFunction: 'linear',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, transform: 'rotate(0deg)' },
          { offset: 1, transform: 'rotate(360deg)' },
        ],
      },
      'ping': {
        name: 'ping',
        duration: 1000,
        timingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'scale(1)', opacity: 1 },
          { offset: 0.5, opacity: 0.5 },
          { offset: 1, transform: 'scale(2)', opacity: 0 },
        ],
      },
      'pulse': {
        name: 'pulse',
        duration: 2000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, opacity: 1 },
          { offset: 0.5, opacity: 0.5 },
          { offset: 1, opacity: 1 },
        ],
      },
      'bounce': {
        name: 'bounce',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          { offset: 0.5, transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
          { offset: 1, transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
        ],
      },
      'wiggle': {
        name: 'wiggle',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, transform: 'rotate(-3deg)' },
          { offset: 0.5, transform: 'rotate(3deg)' },
          { offset: 1, transform: 'rotate(-3deg)' },
        ],
      },
      'fade-in': {
        name: 'fade-in',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, opacity: 0 },
          { offset: 1, opacity: 1 },
        ],
      },
      'fade-out': {
        name: 'fade-out',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, opacity: 1 },
          { offset: 1, opacity: 0 },
        ],
      },
      'slide-in': {
        name: 'slide-in',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'translateX(-100%)' },
          { offset: 1, transform: 'translateX(0)' },
        ],
      },
      'slide-out': {
        name: 'slide-out',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'translateX(0)' },
          { offset: 1, transform: 'translateX(100%)' },
        ],
      },
      'zoom-in': {
        name: 'zoom-in',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'scale(0.5)' },
          { offset: 1, transform: 'scale(1)' },
        ],
      },
      'zoom-out': {
        name: 'zoom-out',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'scale(1)' },
          { offset: 1, transform: 'scale(0.5)' },
        ],
      },
      'bounce-in': {
        name: 'bounce-in',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'translateY(-25%)' },
          { offset: 0.5, transform: 'translateY(0)' },
          { offset: 1, transform: 'translateY(-25%)' },
        ],
      },
      'bounce-out': {
        name: 'bounce-out',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'translateY(0)' },
          { offset: 1, transform: 'translateY(25%)' },
        ],
      },
      'flip': {
        name: 'flip',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'rotateY(0deg)' },
          { offset: 0.5, transform: 'rotateY(180deg)' },
          { offset: 1, transform: 'rotateY(360deg)' },
        ],
      },
      'shake': {
        name: 'shake',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, transform: 'translateX(0)' },
          { offset: 0.1, transform: 'translateX(-10px)' },
          { offset: 0.2, transform: 'translateX(10px)' },
          { offset: 0.3, transform: 'translateX(-10px)' },
          { offset: 0.4, transform: 'translateX(10px)' },
          { offset: 0.5, transform: 'translateX(0)' },
        ],
      },
    },
    durations: {
      '75': 75,
      '100': 100,
      '150': 150,
      '200': 200,
      '300': 300,
      '500': 500,
      '700': 700,
      '1000': 1000,
    },
    easings: {
      'linear': 'linear',
      'in': 'cubic-bezier(0.4, 0, 1, 1)',
      'out': 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      'back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      'quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
    },
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
  borders: {
    borderWidth: {
      'none': '0',
      'default': '1px',
      'sm': '2px',
      'md': '4px',
      'lg': '8px',
      'xl': '12px',
      '2xl': '16px',
      '3xl': '24px',
      '4xl': '32px',
      '5xl': '40px',
      '6xl': '48px',
      '7xl': '56px',
      'full': '100%',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      'default': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      'full': '9999px',
    },
    borderStyle: {
      'none': 'none',
      'solid': 'solid',
      'dashed': 'dashed',
      'dotted': 'dotted',
      'double': 'double',
    },
  },
  backgrounds: {
    backgroundImage: {
      'none': 'none',
      'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
      'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
      'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
      'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
    },
    gradients: {
      'none': 'transparent',
      'current': 'currentColor',
    },
  },
  
  transitions: {
    property: {
      'none': 'none',
      'all': 'all',
      'default': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      'opacity': 'opacity',
      'shadow': 'box-shadow',
      'transform': 'transform',
    },
    duration: {
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms',
    },
    timingFunction: {
      'linear': 'linear',
      'in': 'cubic-bezier(0.4, 0, 1, 1)',
      'out': 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    delay: {
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms',
    },
  },
  
  transforms: {
    scale: {
      '0': '0',
      '50': '.5',
      '75': '.75',
      '90': '.9',
      '95': '.95',
      '100': '1',
      '105': '1.05',
      '110': '1.1',
      '125': '1.25',
      '150': '1.5',
    },
    rotate: {
      '0': '0deg',
      '1': '1deg',
      '2': '2deg',
      '3': '3deg',
      '6': '6deg',
      '12': '12deg',
      '45': '45deg',
      '90': '90deg',
      '180': '180deg',
    },
    translate: {
      '0': '0px',
      '0.5': '2px',
      '1': '4px',
      '1.5': '6px',
      '2': '8px',
      '2.5': '10px',
      '3': '12px',
      '4': '16px',
      '6': '24px',
      '8': '32px',
      '12': '48px',
      '16': '64px',
      '24': '96px',
      '32': '128px',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '3/4': '75%',
      'full': '100%',
    },
    skew: {
      '0': '0deg',
      '1': '1deg',
      '2': '2deg',
      '3': '3deg',
      '6': '6deg',
      '12': '12deg',
    },
  },
      
  // Tailwind CSS v4.1 새로운 기능들 추가
  textShadow: {
    'sm': '1px 1px 2px rgba(0, 0, 0, 0.3)',
    'default': '2px 2px 4px rgba(0, 0, 0, 0.3)',
    'md': '3px 3px 6px rgba(0, 0, 0, 0.3)',
    'lg': '4px 4px 8px rgba(0, 0, 0, 0.3)',
    'xl': '5px 5px 10px rgba(0, 0, 0, 0.3)',
    'none': 'none',
  },
  
  fontStretch: {
    'ultra-condensed': 'ultra-condensed',
    'extra-condensed': 'extra-condensed',
    'condensed': 'condensed',
    'semi-condensed': 'semi-condensed',
    'normal': 'normal',
    'semi-expanded': 'semi-expanded',
    'expanded': 'expanded',
    'extra-expanded': 'extra-expanded',
    'ultra-expanded': 'ultra-expanded',
  },

  mask: {
    'none': 'none',
    'linear-gradient': 'linear-gradient(to bottom, black 0%, transparent 100%)',
    'radial-gradient': 'radial-gradient(circle, black 50%, transparent 70%)',
  },

  accentColor: {
    'auto': 'auto',
    'inherit': 'inherit',
    'current': 'currentColor',
    'transparent': 'transparent',
    'blue': '#3b82f6',
    'red': '#ef4444',
    'green': '#10b981',
    'yellow': '#f59e0b',
    'purple': '#8b5cf6',
  },

  fieldSizing: {
    'content': 'content',
    'fixed': 'fixed',
  },

  scrollBehavior: {
    'auto': 'auto',
    'smooth': 'smooth',
  },

  scrollSnapType: {
    'none': 'none',
    'x': 'x mandatory',
    'y': 'y mandatory',
    'both': 'both mandatory',
    'x-proximity': 'x proximity',
    'y-proximity': 'y proximity',
  },

  scrollSnapAlign: {
    'start': 'start',
    'end': 'end',
    'center': 'center',
    'none': 'none',
  },

  viewTransitionName: {
    'none': 'none',
    'auto': 'auto',
  },

  // Container Queries 확장
  containerType: {
    'normal': 'normal',
    'size': 'size',
    'inline-size': 'inline-size',
  },

  // Logical Properties 확장
  logicalProperties: {
    'block-start': 'block-start',
    'block-end': 'block-end',
    'inline-start': 'inline-start',
    'inline-end': 'inline-end',
  },

  // Safe/Unsafe Alignment
  safeAlignment: {
    'safe-start': 'safe start',
    'safe-end': 'safe end',
    'safe-center': 'safe center',
    'unsafe-start': 'unsafe start',
    'unsafe-end': 'unsafe end',
    'unsafe-center': 'unsafe center',
  },

  // Pointer 변형자
  pointerVariants: {
    'pointer-fine': '@media (pointer: fine)',
    'pointer-coarse': '@media (pointer: coarse)',
    'any-pointer-fine': '@media (any-pointer: fine)',
    'any-pointer-coarse': '@media (any-pointer: coarse)',
  },

  // Grid Subgrid 지원
  gridTemplateSubgrid: {
    'subgrid': 'subgrid',
    'masonry': 'masonry',
  },

};

/**
 * 최소 프리셋 - 기본 프리셋보다 간소화된 버전
 */
export const MINIMAL_PRESET: DesignPreset = {
  name: 'minimal',
  version: '3.0.0',
  colors: {
    blue: {
      '500': { r: 0.25, g: 0.53, b: 0.94 },
    },
    red: {
      '500': { r: 0.94, g: 0.25, b: 0.25 },
    },
    green: {
      '500': { r: 0.25, g: 0.8, b: 0.25 },
    },
  },
  spacing: {
    '0': 0,
    '1': 4,
    '2': 8,
    '4': 16,
    '8': 32,
  },
  typography: {
    fontSize: {
      'sm': 14,
      'base': 16,
      'lg': 18,
    },
    fontWeight: {
      'normal': 400,
      'bold': 700,
    },
    lineHeight: {
      'normal': 1.5,
    },
    letterSpacing: {
      'normal': 0,
    },
    fontFamily: {
      'sans': 'system-ui, sans-serif',
    },
  },
  effects: {
    boxShadow: {
      'none': 'none',
      'default': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    textShadow: {
      'none': 'none',
      'default': '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    blur: {
      'none': 0,
      'default': 8,
    },
    brightness: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    contrast: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    grayscale: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    saturate: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    dropShadow: {
      'none': 'none',
      'default': '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    opacity: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    borderRadius: {
      'none': 0,
      'default': 4,
    },
  },
  layout: {
    width: {
      'auto': 'auto',
      'full': '100%',
    },
    height: {
      'auto': 'auto',
      'full': '100%',
    },
    maxWidth: {
      'none': 'none',
      'full': '100%',
    },
    maxHeight: {
      'none': 'none',
      'full': '100%',
    },
    minWidth: {
      '0': 0,
      'full': '100%',
    },
    minHeight: {
      '0': 0,
      'full': '100%',
    },
  },
  animation: {
    presets: {
      'spin': {
        name: 'spin',
        duration: 1000,
        timingFunction: 'linear',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, transform: 'rotate(0deg)' },
          { offset: 1, transform: 'rotate(360deg)' },
        ],
      },
    },
    durations: {
      '300': 300,
      '500': 500,
    },
    easings: {
      'linear': 'linear',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
  borders: {
    borderWidth: {
      'none': '0',
      'default': '1px',
      'sm': '2px',
    },
    borderRadius: {
      'none': '0',
      'default': '0.25rem',
      'md': '0.375rem',
    },
    borderStyle: {
      'none': 'none',
      'solid': 'solid',
      'dashed': 'dashed',
    },
  },
  backgrounds: {
    backgroundImage: {
      'none': 'none',
      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
    },
    gradients: {
      'none': 'transparent',
      'current': 'currentColor',
    },
  },
  transitions: {
    property: {
      'none': 'none',
      'all': 'all',
      'default': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    },
    duration: {
      '150': '150ms',
      '300': '300ms',
      '500': '500ms',
    },
    timingFunction: {
      'linear': 'linear',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    delay: {
      '75': '75ms',
      '150': '150ms',
      '300': '300ms',
    },
  },
  transforms: {
    scale: {
      '50': '.5',
      '100': '1',
      '150': '1.5',
    },
    rotate: {
      '0': '0deg',
      '45': '45deg',
      '90': '90deg',
    },
    translate: {
      '0': '0px',
      '1': '4px',
      '2': '8px',
    },
    skew: {
      '0': '0deg',
      '1': '1deg',
      '2': '2deg',
    },
  },
};

/**
 * Figma에 최적화된 프리셋
 */
export const FIGMA_OPTIMIZED_PRESET: DesignPreset = {
  ...DEFAULT_PRESET,
  name: 'figma-optimized',
  version: '3.0.0',
};

/**
 * 설정을 로드합니다.
 * @param customConfig 사용자 정의 설정 (선택 사항)
 * @returns 병합된 설정 객체
 */
export function loadConfig(customConfig: Partial<Config> = {}): Config {
  return {
    ...DEFAULT_CONFIG,
    ...customConfig,
  };
}

/**
 * 프리셋을 로드합니다.
 * @param presetOrName 프리셋 이름 또는 커스텀 프리셋 객체 (선택 사항)
 * @returns 프리셋 객체
 */
export function loadPreset(presetOrName: string | Partial<DesignPreset> = 'default'): DesignPreset {
  // 문자열인 경우 기본 프리셋들 중에서 선택
  if (typeof presetOrName === 'string') {
    switch (presetOrName) {
      case 'minimal':
        return MINIMAL_PRESET;
      case 'figma-optimized':
        return FIGMA_OPTIMIZED_PRESET;
      case 'default':
      default:
        return DEFAULT_PRESET;
    }
  }
  
  // 객체인 경우 기본 프리셋과 병합
  return mergeConfigs(DEFAULT_PRESET, presetOrName);
}

/**
 * 딥 머지 유틸리티 함수
 * @param target 대상 객체
 * @param source 소스 객체
 * @returns 병합된 객체
 */
export function mergeConfigs<T extends Record<string, any>>(target: T, source?: Partial<T>): T {
  if (!source) return target;

  const result = { ...target } as any;
  
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];
    
    if (Array.isArray(sourceValue)) {
      // 배열은 완전히 덮어씌움
      result[key] = sourceValue;
    } else if (sourceValue && typeof sourceValue === 'object' && targetValue && typeof targetValue === 'object') {
      // 객체는 재귀적으로 병합
      result[key] = mergeConfigs(targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      // 원시 값은 덮어씌움
      result[key] = sourceValue;
    }
  }
  
  return result as T;
} 