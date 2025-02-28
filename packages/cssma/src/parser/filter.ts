import { ParsedStyle } from '../types';

const BLUR_SIZES = {
  'none': 0,
  'sm': 4,
  'DEFAULT': 8,
  'md': 12,
  'lg': 16,
  'xl': 24,
  '2xl': 40,
  '3xl': 64
} as const;

export function parseFilterStyleValue(className: string): ParsedStyle | null {
  // Blur 처리
  if (className === 'blur' || className.startsWith('blur-')) {
    // blur-none 처리
    if (className === 'blur-none') {
      return {
        property: 'blur',
        value: 0,
        variant: 'preset'
      };
    }

    // 임의값 처리
    if (className.startsWith('blur-[') && className.endsWith(']')) {
      const value = className.slice(6, -1); // 'blur-[' 와 ']' 제거
      const radius = parseInt(value);
      if (!isNaN(radius) && radius >= 0) {
        return {
          property: 'blur',
          value: radius,
          variant: 'arbitrary'
        };
      }
      return null;
    }

    // 프리셋 값 처리
    const size = className === 'blur' ? 'DEFAULT' : className.replace('blur-', '');
    const radius = BLUR_SIZES[size as keyof typeof BLUR_SIZES];
    
    if (radius !== undefined) {
      return {
        property: 'blur',
        value: radius,
        variant: 'preset'
      };
    }
  }

  return null;
} 