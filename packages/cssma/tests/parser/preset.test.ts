import { describe, it, expect } from 'vitest';
import { parseStyleValue, parseStyles } from '../../src/parser';
import { parseColor } from '../../src/utils/colors';

describe('parseStyleValue', () => {
  describe('Preset Values', () => {
    describe('Basic Colors', () => {
      it('should parse text-white correctly', () => {
        const result = parseStyleValue('text-white');
        expect(result).toEqual({
          property: 'color',
          value: { r: 1, g: 1, b: 1 },
          variant: 'preset'
        });
      });

      it('should parse bg-white correctly', () => {
        const result = parseStyleValue('bg-white');
        expect(result).toEqual({
          property: 'backgroundColor',
          value: { r: 1, g: 1, b: 1 },
          variant: 'preset'
        });
      });

      it('should parse text-black correctly', () => {
        const result = parseStyleValue('text-black');
        expect(result).toEqual({
          property: 'color',
          value: { r: 0, g: 0, b: 0 },
          variant: 'preset'
        });
      });

      it('should parse bg-transparent correctly', () => {
        const result = parseStyleValue('bg-transparent');
        expect(result).toEqual({
          property: 'backgroundColor',
          value: { r: 0, g: 0, b: 0, a: 0 },
          variant: 'preset'
        });
      });
    });

    describe('Text Properties', () => {
      it('should parse text size correctly', () => {
        const testCases = [
          { input: 'text-xs', expected: 12 },
          { input: 'text-sm', expected: 14 },
          { input: 'text-base', expected: 16 },
          { input: 'text-lg', expected: 18 },
          { input: 'text-xl', expected: 20 },
          { input: 'text-2xl', expected: 24 },
          { input: 'text-3xl', expected: 30 },
          { input: 'text-4xl', expected: 36 }
        ];

        testCases.forEach(({ input, expected }) => {
          const result = parseStyleValue(input);
          expect(result).toEqual({
            property: 'fontSize',
            value: expected,
            variant: 'preset'
          });
        });
      });

      it('should parse text alignment correctly', () => {
        const testCases = [
          { input: 'text-left', expected: 'LEFT' },
          { input: 'text-center', expected: 'CENTER' },
          { input: 'text-right', expected: 'RIGHT' },
          { input: 'text-justify', expected: 'JUSTIFIED' }
        ];

        testCases.forEach(({ input, expected }) => {
          const result = parseStyleValue(input);
          expect(result).toEqual({
            property: 'textAlignHorizontal',
            value: expected,
            variant: 'preset'
          });
        });
      });

      it('should parse font weights correctly', () => {
        const testCases = [
          { input: 'font-thin', expected: 100 },
          { input: 'font-extralight', expected: 200 },
          { input: 'font-light', expected: 300 },
          { input: 'font-normal', expected: 400 },
          { input: 'font-medium', expected: 500 },
          { input: 'font-semibold', expected: 600 },
          { input: 'font-bold', expected: 700 },
          { input: 'font-extrabold', expected: 800 }
        ];

        testCases.forEach(({ input, expected }) => {
          const result = parseStyleValue(input);
          expect(result).toEqual({
            property: 'fontWeight',
            value: expected,
            variant: 'preset'
          });
        });
      });

      it('should combine font family and weight correctly', () => {
        const styles = parseStyles('font-roboto font-bold');
        
        
        expect(styles[styles.length - 1]).toEqual({
          property: 'fontWeight',
          value: 700,
          variant: 'preset'
        });

        
        const styles2 = parseStyles('font-mono font-bold italic');
        expect(styles2[styles2.length - 1]).toEqual({
          property: 'fontStyle',
          value: 'italic',
          variant: 'preset'
        });
      });
    });

    describe('Layout Properties', () => {
      it('should parse flex direction correctly', () => {
        expect(parseStyleValue('flex-row')).toEqual({
          property: 'layoutMode',
          value: 'HORIZONTAL',
          variant: 'preset'
        });

        expect(parseStyleValue('flex-col')).toEqual({
          property: 'layoutMode',
          value: 'VERTICAL',
          variant: 'preset'
        });
      });

      it('should parse alignment correctly', () => {
        const testCases = [
          { input: 'items-start', expected: 'MIN' },
          { input: 'items-center', expected: 'CENTER' },
          { input: 'items-end', expected: 'MAX' },
          { input: 'items-baseline', expected: 'BASELINE' },
          { input: 'justify-start', expected: 'MIN' },
          { input: 'justify-center', expected: 'CENTER' },
          { input: 'justify-end', expected: 'MAX' },
          { input: 'justify-between', expected: 'SPACE_BETWEEN' }
        ];

        testCases.forEach(({ input, expected }) => {
          const result = parseStyleValue(input);
          expect(result).toEqual({
            property: input.startsWith('items-') ? 'counterAxisAlignItems' : 'primaryAxisAlignItems',
            value: expected,
            variant: 'preset'
          });
        });
      });

      it('should parse gap values correctly', () => {
        
        expect(parseStyleValue('gap-4')).toEqual({
          property: 'gap',
          value: 16,
          variant: 'preset'
        });

        expect(parseStyleValue('gap-x-4')).toEqual({
          property: 'itemSpacing',
          value: 16,
          variant: 'preset'
        });

        expect(parseStyleValue('gap-y-4')).toEqual({
          property: 'counterAxisSpacing',
          value: 16,
          variant: 'preset'
        });

        
        expect(parseStyleValue('gap-[16]')).toEqual({
          property: 'gap',
          value: 16,
          variant: 'arbitrary'
        });

        expect(parseStyleValue('gap-x-[16]')).toEqual({
          property: 'itemSpacing',
          value: 16,
          variant: 'arbitrary'
        });

        expect(parseStyleValue('gap-y-[16]')).toEqual({
          property: 'counterAxisSpacing',
          value: 16,
          variant: 'arbitrary'
        });
      });
    });

    describe('Effects', () => {
      it('should parse shadow values correctly', () => {
        const testCases = [
          {
            input: 'shadow-sm',
            expected: [{
              type: 'outer',
              x: 0,
              y: 1,
              blur: 2,
              spread: 0,
              color: 'rgba(0,0,0,0.05)'
            }]
          },
          {
            input: 'shadow',
            expected: [{
              type: 'outer',
              x: 0,
              y: 2,
              blur: 4,
              spread: -1,
              color: 'rgba(0,0,0,0.1)'
            }]
          },
          {
            input: 'shadow-md',
            expected: [{
              type: 'outer',
              x: 0,
              y: 4,
              blur: 6,
              spread: -2,
              color: 'rgba(0,0,0,0.1)'
            }]
          },
          {
            input: 'shadow-lg',
            expected: [{
              type: 'outer',
              x: 0,
              y: 8,
              blur: 10,
              spread: -3,
              color: 'rgba(0,0,0,0.1)'
            }]
          }
        ];

        testCases.forEach(({ input, expected }) => {
          const result = parseStyleValue(input);
          expect(result).toEqual({
            property: 'boxShadow',
            value: expected,
            variant: 'preset'
          });
        });
      });

      it('should parse inner shadow', () => {
        const result = parseStyleValue('shadow-inner');
        expect(result).toEqual({
          property: 'boxShadow',
          value: [{
            type: 'inner',
            x: 0,
            y: 2,
            blur: 4,
            spread: 0,
            color: 'rgba(0,0,0,0.06)'
          }],
          variant: 'preset'
        });
      });

      it('should handle shadow-none', () => {
        const result = parseStyleValue('shadow-none');
        expect(result).toBeNull();
      });

      it('should parse colored shadow', () => {
        const result = parseStyleValue('shadow-blue-500/50');
        expect(result).toEqual({
          property: 'boxShadow',
          value: [{
            type: 'outer',
            x: 0,
            y: 2,
            blur: 4,
            spread: -1,
            color: parseColor('rgba(59,130,246,0.5)')
          }],
          variant: 'preset'
        });
      });

      it('should parse arbitrary shadow', () => {
        const result = parseStyleValue('shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]');
        expect(result).toEqual({
          property: 'boxShadow',
          value: [{
            type: 'outer',
            x: 0,
            y: 4,
            blur: 6,
            spread: -1,
            color: parseColor('rgba(0,0,0,0.1)')
          }],
          variant: 'arbitrary'
        });
      });
    });
  });

  describe('Arbitrary Values', () => {
    describe('Colors', () => {
      it('should parse arbitrary text color', () => {
        const result = parseStyleValue('text-[#FF0000]');
        expect(result).toEqual({
          property: 'color',
          value: '#FF0000',
          variant: 'arbitrary'
        });
      });

      it('should parse arbitrary background color', () => {
        const result = parseStyleValue('bg-[#FF0000]');
        expect(result).toEqual({
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        });
      });
    });

    describe('Spacing and Sizing', () => {
      it('should parse arbitrary width and height', () => {
        expect(parseStyleValue('w-[100]')).toEqual({
          property: 'width',
          value: 100,
          variant: 'arbitrary'
        });

        expect(parseStyleValue('h-[200]')).toEqual({
          property: 'height',
          value: 200,
          variant: 'arbitrary'
        });
      });

      it('should parse arbitrary padding', () => {
        expect(parseStyleValue('p-[16]')).toEqual({
          property: 'padding',
          value: 16,
          variant: 'arbitrary'
        });

        expect(parseStyleValue('pt-[8]')).toEqual({
          property: 'paddingTop',
          value: 8,
          variant: 'arbitrary'
        });
      });

      it('should parse arbitrary gap', () => {
        expect(parseStyleValue('gap-[24]')).toEqual({
          property: 'gap',
          value: 24,
          variant: 'arbitrary'
        });
      });
    });

    describe('Effects', () => {
      it('should parse arbitrary opacity', () => {
        expect(parseStyleValue('opacity-[0.5]')).toEqual({
          property: 'opacity',
          value: 0.5,
          variant: 'arbitrary'
        });
      });
    });
  });

  describe('Invalid Values', () => {
    it('should return null for unknown values', () => {
      expect(parseStyleValue('invalid-class')).toBeNull();
      expect(parseStyleValue('text-[invalid]')).toBeNull();
      expect(parseStyleValue('bg-[invalid]')).toBeNull();
      expect(parseStyleValue('w-[invalid]')).toBeNull();
    });
  });
}); 