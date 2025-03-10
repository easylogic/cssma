import { ParsedStyle } from '../types';

const ASPECT_RATIOS = {
  'square': 1,
  'video': 16/9
} as const;

function parseRatioValue(value: string): number | null {
  if (!/^\d+\/\d+$/.test(value)) return null;

  const parts = value.split('/');
  if (parts.length !== 2) return null;

  const [width, height] = parts.map(Number);
  if (isNaN(width) || isNaN(height)) return null;
  if (width <= 0 || height <= 0) return null;  
  if (height === 0) return null;  

  return width / height;
}

export function parseAspectStyleValue(className: string): ParsedStyle | null {
  
  if (className.startsWith('aspect-')) {
    
    if (className === 'aspect-auto') {
      return {
        property: 'aspectRatio',
        value: 'auto',
        variant: 'preset'
      };
    }

    
    const preset = className.replace('aspect-', '');
    const ratio = ASPECT_RATIOS[preset as keyof typeof ASPECT_RATIOS];
    
    if (ratio !== undefined) {
      return {
        property: 'aspectRatio',
        value: ratio,
        variant: 'preset'
      };
    }

    if (preset.startsWith('[') && preset.endsWith(']')) {
      const value = preset.slice(1, -1);
      const ratio = parseRatioValue(value);
      
      if (ratio !== null) {
        return {
          property: 'aspectRatio',
          value: ratio,
          variant: 'arbitrary'
        };
      }
    }
  }

  return null;
} 