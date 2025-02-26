import { describe, it, expect } from 'vitest';
import { convertColor } from '../../src/converters/colors';

describe('Color Converter', () => {
  describe('Solid Colors', () => {
    it('should convert hex color', () => {
      const result = convertColor('#FF0000');
      expect(result).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
    });

    it('should convert hex color with alpha', () => {
      const result = convertColor('#FF0000AA');
      expect(result).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0, a: 0.67 }
      });
    });

    it('should convert rgb color', () => {
      const result = convertColor('rgb(255, 0, 0)');
      expect(result).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
    });

    it('should convert rgba color', () => {
      const result = convertColor('rgba(255, 0, 0, 0.5)');
      expect(result).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0, a: 0.5 }
      });
    });
  });

});
