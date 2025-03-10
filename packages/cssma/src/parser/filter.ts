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
  
  if (className === 'blur' || className.startsWith('blur-')) {
    
    if (className === 'blur-none') {
      return {
        property: 'blur',
        value: 0,
        variant: 'preset'
      };
    }

    
    if (className.startsWith('blur-[') && className.endsWith(']')) {
      const value = className.slice(6, -1); 
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