import { describe, it, expect } from 'vitest';
import { parseLayoutValue } from '../../src/parser/layout';

describe('Layout Parser', () => {
  describe('Layout Mode', () => {
    it('should parse flex direction', () => {
      expect(parseLayoutValue('flex-row')).toEqual({
        property: 'layoutMode',
        value: 'HORIZONTAL',
        variant: 'preset'
      });

      expect(parseLayoutValue('flex-col')).toEqual({
        property: 'layoutMode',
        value: 'VERTICAL',
        variant: 'preset'
      });
    });

    it('should handle flex direction changes', () => {
      expect(parseLayoutValue('flex-row')).toEqual({
        property: 'layoutMode',
        value: 'HORIZONTAL',
        variant: 'preset'
      });
    });
  });

  describe('Flex Layout', () => {
    it('should parse flex wrap', () => {
      expect(parseLayoutValue('wrap')).toEqual({
        property: 'layoutWrap',
        value: 'WRAP',
        variant: 'preset'
      });

      expect(parseLayoutValue('nowrap')).toEqual({
        property: 'layoutWrap',
        value: 'NO_WRAP',
        variant: 'preset'
      });
    });

    it('should parse justify content', () => {
      const testCases = [
        { input: 'justify-start', expected: 'MIN' },
        { input: 'justify-center', expected: 'CENTER' },
        { input: 'justify-end', expected: 'MAX' },
        { input: 'justify-between', expected: 'SPACE_BETWEEN' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseLayoutValue(input)).toEqual({
          property: 'primaryAxisAlignItems',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse align items', () => {
      const testCases = [
        { input: 'items-start', expected: 'MIN' },
        { input: 'items-center', expected: 'CENTER' },
        { input: 'items-end', expected: 'MAX' },
        { input: 'items-baseline', expected: 'BASELINE' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseLayoutValue(input)).toEqual({
          property: 'counterAxisAlignItems',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Sizing', () => {
    describe('Width', () => {
      it('should parse preset width values', () => {
        expect(parseLayoutValue('w-auto')).toEqual({
          property: 'layoutSizingHorizontal',
          value: 'HUG',
          variant: 'preset'
        });

        expect(parseLayoutValue('w-full')).toEqual({
          property: 'layoutSizingHorizontal',
          value: 'FILL',
          variant: 'preset'
        });
      });

      it('should parse arbitrary width values', () => {
        expect(parseLayoutValue('w-[100]')).toEqual({
          property: 'width',
          value: 100,
          variant: 'arbitrary'
        });

        expect(parseLayoutValue('w-[200]')).toEqual({
          property: 'width',
          value: 200,
          variant: 'arbitrary'
        });
      });

      it('should handle decimal width values', () => {
        expect(parseLayoutValue('w-[100.5]')).toEqual({
          property: 'width',
          value: 100.5,
          variant: 'arbitrary'
        });
      });

      it('should reject negative width values', () => {
        expect(parseLayoutValue('w-[-100]')).toBeNull();
      });
    });

    describe('Height', () => {
      it('should parse preset height values', () => {
        expect(parseLayoutValue('h-auto')).toEqual({
          property: 'layoutSizingVertical',
          value: 'HUG',
          variant: 'preset'
        });

        expect(parseLayoutValue('h-full')).toEqual({
          property: 'layoutSizingVertical',
          value: 'FILL',
          variant: 'preset'
        });
      });

      it('should parse arbitrary height values', () => {
        expect(parseLayoutValue('h-[100]')).toEqual({
          property: 'height',
          value: 100,
          variant: 'arbitrary'
        });

        expect(parseLayoutValue('h-[200]')).toEqual({
          property: 'height',
          value: 200,
          variant: 'arbitrary'
        });
      });

      it('should handle decimal height values', () => {
        expect(parseLayoutValue('h-[100.5]')).toEqual({
          property: 'height',
          value: 100.5,
          variant: 'arbitrary'
        });
      });

      it('should reject negative height values', () => {
        expect(parseLayoutValue('h-[-100]')).toBeNull();
      });
    });
  });

  describe('Figma Variables', () => {
    describe('Width', () => {
      it('should parse width variables', () => {
        const testCases = [
          { input: 'w-$[sizing/width/button]', expected: 'sizing/width/button' },
          { input: 'w-$[sizing/width/container]', expected: 'sizing/width/container' }
        ];

        testCases.forEach(({ input, expected }) => {
          expect(parseLayoutValue(input)).toEqual({
            property: 'width',
            value: expected,
            variant: 'figma-variable',
            variableId: expected
          });
        });
      });

      it('should reject invalid width variable paths', () => {
        const invalidCases = [
          'w-$[]',
          'w-$[/sizing/width]',
          'w-$[sizing/width/]',
          'w-$[sizing//width]'
        ];

        invalidCases.forEach(input => {
          expect(parseLayoutValue(input)).toBeNull();
        });
      });
    });

    describe('Height', () => {
      it('should parse height variables', () => {
        const testCases = [
          { input: 'h-$[sizing/height/button]', expected: 'sizing/height/button' },
          { input: 'h-$[sizing/height/container]', expected: 'sizing/height/container' }
        ];

        testCases.forEach(({ input, expected }) => {
          expect(parseLayoutValue(input)).toEqual({
            property: 'height',
            value: expected,
            variant: 'figma-variable',
            variableId: expected
          });
        });
      });

      it('should reject invalid height variable paths', () => {
        const invalidCases = [
          'h-$[]',
          'h-$[/sizing/height]',
          'h-$[sizing/height/]',
          'h-$[sizing//height]'
        ];

        invalidCases.forEach(input => {
          expect(parseLayoutValue(input)).toBeNull();
        });
      });
    });

    describe('Gap', () => {
      it('should parse gap variables', () => {
        const testCases = [
          { 
            input: 'gap-$[spacing/gap/small]', 
            expected: {
              property: 'gap',
              value: 'spacing/gap/small',
              variant: 'figma-variable',
              variableId: 'spacing/gap/small'
            }
          },
          { 
            input: 'gap-x-$[spacing/gap/medium]', 
            expected: {
              property: 'itemSpacing',
              value: 'spacing/gap/medium',
              variant: 'figma-variable',
              variableId: 'spacing/gap/medium'
            }
          },
          { 
            input: 'gap-y-$[spacing/gap/large]', 
            expected: {
              property: 'counterAxisSpacing',
              value: 'spacing/gap/large',
              variant: 'figma-variable',
              variableId: 'spacing/gap/large'
            }
          }
        ];

        testCases.forEach(({ input, expected }) => {
          expect(parseLayoutValue(input)).toEqual(expected);
        });
      });

      it('should reject invalid gap variable paths', () => {
        const invalidCases = [
          'gap-$[]',
          'gap-x-$[/spacing/gap]',
          'gap-y-$[spacing/gap/]',
          'gap-$[spacing//gap]'
        ];

        invalidCases.forEach(input => {
          expect(parseLayoutValue(input)).toBeNull();
        });
      });
    });
  });

  describe('Invalid Values', () => {
    it('should return null for invalid values', () => {
      expect(parseLayoutValue('flex-invalid')).toBeNull();
      expect(parseLayoutValue('justify-invalid')).toBeNull();
      expect(parseLayoutValue('items-invalid')).toBeNull();
      expect(parseLayoutValue('w-[invalid]')).toBeNull();
      expect(parseLayoutValue('h-[invalid]')).toBeNull();
      expect(parseLayoutValue('w-[]')).toBeNull();
      expect(parseLayoutValue('h-[]')).toBeNull();
    });
  });

  describe('Real World Examples', () => {
    it('should handle common layout patterns', () => {
      // Card container
      expect(parseLayoutValue('flex-col')).toEqual({
        property: 'layoutMode',
        value: 'VERTICAL',
        variant: 'preset'
      });

      // Navigation bar
      expect(parseLayoutValue('flex-row')).toEqual({
        property: 'layoutMode',
        value: 'HORIZONTAL',
        variant: 'preset'
      });

      // Centered content
      expect(parseLayoutValue('items-center')).toEqual({
        property: 'counterAxisAlignItems',
        value: 'CENTER',
        variant: 'preset'
      });

      // Space between items
      expect(parseLayoutValue('justify-between')).toEqual({
        property: 'primaryAxisAlignItems',
        value: 'SPACE_BETWEEN',
        variant: 'preset'
      });
    });
  });
}); 