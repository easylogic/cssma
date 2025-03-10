import { ParsedStyle } from '../types';

export function parseTransformStyleValue(className: string): ParsedStyle | null {
  
  if (className.startsWith('rotate-') || className.startsWith('-rotate-')) {
    const isNegative = className.startsWith('-');
    const value = className.replace(/^-?rotate-/, '');

    
    if (value.startsWith('[') && value.endsWith(']')) {
      const angle = parseFloat(value.slice(1, -1));
      if (!isNaN(angle)) {
        return {
          property: 'rotation',
          value: isNegative ? -angle : angle,
          variant: 'arbitrary'
        };
      }
      return null;
    }

    
    const presetAngle = parseInt(value);
    if (!isNaN(presetAngle)) {
      return {
        property: 'rotation',
        value: isNegative ? -presetAngle : presetAngle,
        variant: 'preset'
      };
    }
  }

  return null;
} 