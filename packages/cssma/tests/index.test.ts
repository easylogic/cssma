import { describe, it, expect } from 'vitest';
import { processStyles } from '../src';

describe('Style Processor', () => {
  describe('Layout Properties', () => {
    it('should process width and height', () => {
      const result = processStyles('w-[100px] h-[200px]');
      expect(result).toMatchObject({
        width: 100,
        height: 200,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'FIXED'
      });
    });

    it('should process padding', () => {
      const result = processStyles('p-[16px] pt-[8px] pr-[24px] pb-[32px] pl-[12px]');
      expect(result).toMatchObject({
        paddingTop: 8,    // pt-[8px] overrides p-[16px]
        paddingRight: 24, // pr-[24px] overrides p-[16px]
        paddingBottom: 32, // pb-[32px] overrides p-[16px]
        paddingLeft: 12   // pl-[12px] overrides p-[16px]
      });
    });

    it('should process gap', () => {
      const result = processStyles('gap-[16px] gap-x-[24px] gap-y-[32px]');
      expect(result).toMatchObject({
        itemSpacing: 24,  // gap-x overrides gap
        counterAxisSpacing: 32  // gap-y overrides gap
      });
    });

    it('should handle responsive layout with parent context', () => {
      const result = processStyles('w-full h-full', { parentLayoutMode: 'HORIZONTAL' });
      expect(result).toMatchObject({
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'FILL'
      });
    });
  });

  describe('Color Properties', () => {
    it('should process background color', () => {
      const result = processStyles('bg-[#FF0000]');
      expect(result).toMatchObject({
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 }
        }]
      });
    });

    it('should process text color', () => {
      const result = processStyles('text-[#00FF00]');
      expect(result).toMatchObject({
        fills: [{
          type: 'SOLID',
          color: { r: 0, g: 1, b: 0 }
        }]
      });
    });

    it('should process border color', () => {
      const result = processStyles('border-[#0000FF]');
      expect(result).toMatchObject({
        strokes: [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 1 }
        }]
      });
    });
  });

  describe('Effect Properties', () => {
    it('should process opacity', () => {
      const result = processStyles('opacity-[0.5]');
      expect(result).toMatchObject({
        opacity: 0.5
      });
    });
  });

  describe('Combined Properties', () => {
    it('should process multiple properties together', () => {
      const result = processStyles(
        'w-[100px] h-[200px] p-[16px] bg-[#FF0000] opacity-[0.8]'
      );
      expect(result).toMatchObject({
        width: 100,
        height: 200,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'FIXED',
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 }
        }],
        opacity: 0.8
      });
    });

    it('should handle real-world component example', () => {
      const result = processStyles(
        'w-[280] h-[180] p-[24] gap-[16] bg-[#4F46E5] opacity-[0.9]'
      );
      expect(result).toMatchObject({
        width: 280,
        height: 180,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'FIXED',
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        itemSpacing: 16,
        counterAxisSpacing: 16,
        fills: [{
          type: 'SOLID',
          color: { 
            r: 0.31, // round(0x4F/255)
            g: 0.27, // round(0x46/255)
            b: 0.90  // round(0xE5/255)
          }
        }],
        opacity: 0.9
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle empty input', () => {
      const result = processStyles('');
      expect(result).toEqual({});
    });

    it('should handle invalid values', () => {
      const result = processStyles('w-invalid h-[] p-[abc]');
      expect(result).toEqual({
        fills: []
      });
    });

    it('should handle mixed valid and invalid values', () => {
      const result = processStyles('w-[100px] h-invalid bg-[#FF0000] p-[abc]');
      expect(result).toMatchObject({
        width: 100,
        layoutSizingHorizontal: 'FIXED',
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 }
        }]
      });
    });
  });
}); 