import { describe, it, expect } from 'vitest';
import { parseStyleValue } from '../../src/parser';

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
            property: 'textAlign',
            value: expected,
            variant: 'preset'
          });
        });
      });

      it('should parse font weights correctly', () => {
        const testCases = [
          'font-thin',
          'font-extralight',
          'font-light',
          'font-normal',
          'font-medium',
          'font-semibold',
          'font-bold',
          'font-extrabold'
        ];

        testCases.forEach((input) => {
          const result = parseStyleValue(input);
          expect(result).toEqual({
            property: 'fontWeight',
            value: input.replace('font-', ''),
            variant: 'preset'
          });
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
        // 프리셋 gap 값 테스트
        expect(parseStyleValue('gap-4')).toEqual({
          property: 'gap',
          value: 4,
          variant: 'preset'
        });

        expect(parseStyleValue('gap-x-4')).toEqual({
          property: 'columnGap',
          value: 4,
          variant: 'preset'
        });

        expect(parseStyleValue('gap-y-4')).toEqual({
          property: 'rowGap',
          value: 4,
          variant: 'preset'
        });

        // 임의 gap 값 테스트
        expect(parseStyleValue('gap-[16]')).toEqual({
          property: 'gap',
          value: 16,
          variant: 'arbitrary'
        });

        expect(parseStyleValue('gap-x-[16]')).toEqual({
          property: 'columnGap',
          value: 16,
          variant: 'arbitrary'
        });

        expect(parseStyleValue('gap-y-[16]')).toEqual({
          property: 'rowGap',
          value: 16,
          variant: 'arbitrary'
        });
      });
    });

    describe('Effects', () => {
      it('should parse shadow values correctly', () => {
        const testCases = [
          'shadow-sm',
          'shadow-md',
          'shadow-lg',
          'shadow-xl',
          'shadow-2xl'
        ];

        testCases.forEach((input) => {
          const result = parseStyleValue(input);
          expect(result).toEqual({
            property: 'boxShadow',
            value: input.replace('shadow-', ''),
            variant: 'preset'
          });
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

      it('should parse arbitrary fill color', () => {
        const result = parseStyleValue('fill-[#FF0000]');
        expect(result).toEqual({
          property: 'fill',
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