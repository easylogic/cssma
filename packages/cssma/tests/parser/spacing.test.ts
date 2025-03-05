import { describe, it, expect } from 'vitest';
import { parseSpacingValue } from '../../src/parser/spacing';

describe('Spacing Parser', () => {
  describe('Gap', () => {
    it('should parse preset gap values', () => {

      expect(parseSpacingValue('gap-0')).toEqual({
        property: 'gap',
        value: 0,
        variant: 'preset'
      });

      expect(parseSpacingValue('gap-1')).toEqual({
        property: 'gap',
        value: 4,
        variant: 'preset'
      });

      expect(parseSpacingValue('gap-2')).toEqual({
        property: 'gap',
        value: 8,
        variant: 'preset'
      });

      expect(parseSpacingValue('gap-4')).toEqual({
        property: 'gap',
        value: 16,
        variant: 'preset'
      });

      expect(parseSpacingValue('gap-6')).toEqual({
        property: 'gap',
        value: 24,
        variant: 'preset'
      });

      expect(parseSpacingValue('gap-8')).toEqual({
        property: 'gap',
        value: 32,
        variant: 'preset'
      });

      expect(parseSpacingValue('gap-10')).toEqual({
        property: 'gap',
        value: 40,
        variant: 'preset'
      });

      expect(parseSpacingValue('gap-12')).toEqual({
        property: 'gap',
        value: 48,
        variant: 'preset'
      });
    });

    it('should parse arbitrary gap values', () => {
      expect(parseSpacingValue('gap-[16]')).toEqual({
        property: 'gap',
        value: 16,
        variant: 'arbitrary'
      });

      expect(parseSpacingValue('gap-[24]')).toEqual({
        property: 'gap',
        value: 24,
        variant: 'arbitrary'
      });
    });

    it('should parse directional gap values', () => {
      // Preset values
      expect(parseSpacingValue('gap-x-4')).toEqual({
        property: 'itemSpacing',
        value: 16,
        variant: 'preset'
      });

      expect(parseSpacingValue('gap-y-4')).toEqual({
        property: 'counterAxisSpacing',
        value: 16,
        variant: 'preset'
      });

      // Arbitrary values
      expect(parseSpacingValue('gap-x-[16]')).toEqual({
        property: 'itemSpacing',
        value: 16,
        variant: 'arbitrary'
      });

      expect(parseSpacingValue('gap-y-[16]')).toEqual({
        property: 'counterAxisSpacing',
        value: 16,
        variant: 'arbitrary'
      });
    });
  });

  describe('Padding', () => {
    it('should parse preset padding values', () => {
      const testCases = [
        { input: 'p-0', expected: 0 },
        { input: 'p-1', expected: 4 },
        { input: 'p-2', expected: 8 },
        { input: 'p-4', expected: 16 },
        { input: 'p-6', expected: 24 },
        { input: 'p-8', expected: 32 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseSpacingValue(input)).toEqual({
          property: 'padding',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary padding values', () => {
      expect(parseSpacingValue('p-[16]')).toEqual({
        property: 'padding',
        value: 16,
        variant: 'arbitrary'
      });

      expect(parseSpacingValue('p-[24]')).toEqual({
        property: 'padding',
        value: 24,
        variant: 'arbitrary'
      });
    });

    it('should parse directional padding values', () => {
      // Individual sides - Preset
      expect(parseSpacingValue('pt-4')).toEqual({
        property: 'paddingTop',
        value: 16,
        variant: 'preset'
      });

      expect(parseSpacingValue('pr-4')).toEqual({
        property: 'paddingRight',
        value: 16,
        variant: 'preset'
      });

      expect(parseSpacingValue('pb-4')).toEqual({
        property: 'paddingBottom',
        value: 16,
        variant: 'preset'
      });

      expect(parseSpacingValue('pl-4')).toEqual({
        property: 'paddingLeft',
        value: 16,
        variant: 'preset'
      });

      // Individual sides - Arbitrary
      expect(parseSpacingValue('pt-[16]')).toEqual({
        property: 'paddingTop',
        value: 16,
        variant: 'arbitrary'
      });

      expect(parseSpacingValue('pr-[16]')).toEqual({
        property: 'paddingRight',
        value: 16,
        variant: 'arbitrary'
      });

      expect(parseSpacingValue('pb-[16]')).toEqual({
        property: 'paddingBottom',
        value: 16,
        variant: 'arbitrary'
      });

      expect(parseSpacingValue('pl-[16]')).toEqual({
        property: 'paddingLeft',
        value: 16,
        variant: 'arbitrary'
      });

      // Horizontal/Vertical - Preset
      expect(parseSpacingValue('px-4')).toEqual({
        property: 'paddingX',
        value: 16,
        variant: 'preset'
      });

      expect(parseSpacingValue('py-4')).toEqual({
        property: 'paddingY',
        value: 16,
        variant: 'preset'
      });

      // Horizontal/Vertical - Arbitrary
      expect(parseSpacingValue('px-[16]')).toEqual({
        property: 'paddingX',
        value: 16,
        variant: 'arbitrary'
      });

      expect(parseSpacingValue('py-[16]')).toEqual({
        property: 'paddingY',
        value: 16,
        variant: 'arbitrary'
      });
    });
  });

  describe('Invalid Values', () => {
    it('should return null for invalid values', () => {
      expect(parseSpacingValue('gap-invalid')).toBeNull();
      expect(parseSpacingValue('gap-[invalid]')).toBeNull();
      expect(parseSpacingValue('p-invalid')).toBeNull();
      expect(parseSpacingValue('p-[invalid]')).toBeNull();
      expect(parseSpacingValue('px-[abc]')).toBeNull();
      expect(parseSpacingValue('py-[]')).toBeNull();
    });
  });

  describe('Complex Cases', () => {
    it('should handle negative values', () => {
      expect(parseSpacingValue('gap-[-16]')).toEqual({
        property: 'gap',
        value: -16,
        variant: 'arbitrary'
      });

      expect(parseSpacingValue('p-[-16]')).toEqual({
        property: 'padding',
        value: -16,
        variant: 'arbitrary'
      });
    });

    it('should handle decimal values', () => {
      expect(parseSpacingValue('gap-[0.5]')).toEqual({
        property: 'gap',
        value: 0.5,
        variant: 'arbitrary'
      });

      expect(parseSpacingValue('p-[1.5]')).toEqual({
        property: 'padding',
        value: 1.5,
        variant: 'arbitrary'
      });
    });
  });

  describe('Figma Variables', () => {
    describe('Gap Variables', () => {
      it('should parse gap variables', () => {
        const testCases = [
          {
            input: 'gap-$[spacing/base]',
            expected: {
              property: 'gap',
              value: 'spacing/base',
              variant: 'figma-variable',
              variableId: 'spacing/base'
            }
          },
          {
            input: 'gap-x-$[spacing/horizontal]',
            expected: {
              property: 'itemSpacing',
              value: 'spacing/horizontal',
              variant: 'figma-variable',
              variableId: 'spacing/horizontal'
            }
          },
          {
            input: 'gap-y-$[spacing/vertical]',
            expected: {
              property: 'counterAxisSpacing',
              value: 'spacing/vertical',
              variant: 'figma-variable',
              variableId: 'spacing/vertical'
            }
          }
        ];

        testCases.forEach(({ input, expected }) => {
          expect(parseSpacingValue(input)).toEqual(expected);
        });
      });

      it('should handle invalid gap variable paths', () => {
        const testCases = [
          'gap-$[]',
          'gap-$[/]',
          'gap-$[/invalid]',
          'gap-$[spacing/]/25',
          'gap-$[/spacing/gap]/25',
          'gap-$[spacing//gap]'
        ];

        testCases.forEach(input => {
          expect(parseSpacingValue(input)).toBeNull();
        });
      });
    });

    describe('Padding Variables', () => {
      it('should parse padding variables', () => {
        const testCases = [
          {
            input: 'p-$[spacing/padding]',
            expected: {
              property: 'padding',
              value: 'spacing/padding',
              variant: 'figma-variable',
              variableId: 'spacing/padding'
            }
          },
          {
            input: 'px-$[spacing/horizontal]',
            expected: {
              property: 'paddingX',
              value: 'spacing/horizontal',
              variant: 'figma-variable',
              variableId: 'spacing/horizontal'
            }
          },
          {
            input: 'py-$[spacing/vertical]',
            expected: {
              property: 'paddingY',
              value: 'spacing/vertical',
              variant: 'figma-variable',
              variableId: 'spacing/vertical'
            }
          },
          {
            input: 'pt-$[spacing/top]',
            expected: {
              property: 'paddingTop',
              value: 'spacing/top',
              variant: 'figma-variable',
              variableId: 'spacing/top'
            }
          },
          {
            input: 'pr-$[spacing/right]',
            expected: {
              property: 'paddingRight',
              value: 'spacing/right',
              variant: 'figma-variable',
              variableId: 'spacing/right'
            }
          },
          {
            input: 'pb-$[spacing/bottom]',
            expected: {
              property: 'paddingBottom',
              value: 'spacing/bottom',
              variant: 'figma-variable',
              variableId: 'spacing/bottom'
            }
          },
          {
            input: 'pl-$[spacing/left]',
            expected: {
              property: 'paddingLeft',
              value: 'spacing/left',
              variant: 'figma-variable',
              variableId: 'spacing/left'
            }
          }
        ];

        testCases.forEach(({ input, expected }) => {
          expect(parseSpacingValue(input)).toEqual(expected);
        });
      });

      it('should handle invalid padding variable paths', () => {
        const testCases = [
          'p-$[]',
          'p-$[/]',
          'p-$[/invalid]',
          'px-$[spacing/]/25',
          'py-$[/spacing/pad]/25',
          'pt-$[spacing//pad]'
        ];

        testCases.forEach(input => {
          expect(parseSpacingValue(input)).toBeNull();
        });
      });
    });
  });
}); 