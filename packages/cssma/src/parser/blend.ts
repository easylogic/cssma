import { ParsedStyle } from '../types';

const BLEND_MODE_MAP = {
  'normal': 'NORMAL',
  'multiply': 'MULTIPLY',
  'screen': 'SCREEN',
  'overlay': 'OVERLAY',
  'darken': 'DARKEN',
  'lighten': 'LIGHTEN'
} as const;

export function parseBlendStyleValue(className: string): ParsedStyle | null {
  // Blend mode 처리
  if (className.startsWith('mix-blend-')) {
    const mode = className.replace('mix-blend-', '');
    const blendMode = BLEND_MODE_MAP[mode as keyof typeof BLEND_MODE_MAP];
    
    if (blendMode) {
      return {
        property: 'blendMode',
        value: blendMode,
        variant: 'preset'
      };
    }
  }

  return null;
} 