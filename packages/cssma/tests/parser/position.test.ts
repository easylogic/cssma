import { describe, it, expect, beforeEach } from 'vitest';
import { parsePositionStyleValue, resetPositionState } from '../../src/parser/position';

describe('Position Parser', () => {
  beforeEach(() => {
    resetPositionState();
  });

  describe('Position Type', () => {
    it('should parse absolute positioning', () => {
      const result = parsePositionStyleValue('absolute');
      expect(result).toEqual({
        property: 'layoutPositioning',
        value: 'ABSOLUTE',
        variant: 'preset'
      });
    });

    it('should parse auto positioning', () => {
      const result = parsePositionStyleValue('relative');
      expect(result).toEqual({
        property: 'layoutPositioning',
        value: 'AUTO',
        variant: 'preset'
      });
    });
  });

  describe('Basic Position Values', () => {
    it('should parse pixel values', () => {
      const cases = [
        {
          input: 'left-[10px]',
          expected: {
            property: 'position',
            direction: 'left',
            value: 10,
            unit: 'px',
            variant: 'arbitrary',
            constraints: { horizontal: 'MIN' }
          }
        },
        {
          input: 'right-[20px]',
          expected: {
            property: 'position',
            direction: 'right',
            value: 20,
            unit: 'px',
            variant: 'arbitrary',
            constraints: { horizontal: 'MAX' }
          }
        },
        {
          input: 'top-[30px]',
          expected: {
            property: 'position',
            direction: 'top',
            value: 30,
            unit: 'px',
            variant: 'arbitrary',
            constraints: { vertical: 'MIN' }
          }
        },
        {
          input: 'bottom-[40px]',
          expected: {
            property: 'position',
            direction: 'bottom',
            value: 40,
            unit: 'px',
            variant: 'arbitrary',
            constraints: { vertical: 'MAX' }
          }
        }
      ];

      cases.forEach(({ input, expected }) => {
        resetPositionState();
        const result = parsePositionStyleValue(input);
        expect(result).toEqual(expected);
      });
    });

    it('should parse percentage values', () => {
      const cases = [
        {
          input: 'left-[10%]',
          expected: {
            property: 'position',
            direction: 'left',
            value: 10,
            unit: '%',
            variant: 'arbitrary',
            constraints: { horizontal: 'MIN' }
          }
        },
        {
          input: 'right-[20%]',
          expected: {
            property: 'position',
            direction: 'right',
            value: 20,
            unit: '%',
            variant: 'arbitrary',
            constraints: { horizontal: 'MAX' }
          }
        },
        {
          input: 'top-[30%]',
          expected: {
            property: 'position',
            direction: 'top',
            value: 30,
            unit: '%',
            variant: 'arbitrary',
            constraints: { vertical: 'MIN' }
          }
        },
        {
          input: 'bottom-[40%]',
          expected: {
            property: 'position',
            direction: 'bottom',
            value: 40,
            unit: '%',
            variant: 'arbitrary',
            constraints: { vertical: 'MAX' }
          }
        }
      ];

      cases.forEach(({ input, expected }) => {
        resetPositionState();
        const result = parsePositionStyleValue(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe('Center Position', () => {
    it('should parse center without offset', () => {
      const cases = [
        {
          input: 'center-x',
          expected: {
            property: 'constraints',
            value: { horizontal: 'CENTER' },
            variant: 'preset'
          }
        },
        {
          input: 'center-y',
          expected: {
            property: 'constraints',
            value: { vertical: 'CENTER' },
            variant: 'preset'
          }
        }
      ];

      cases.forEach(({ input, expected }) => {
        const result = parsePositionStyleValue(input);
        expect(result).toEqual(expected);
      });
    });

  });

  describe('Stretch Position', () => {
    it('should parse stretch without offset', () => {
      const cases = [
        {
          input: 'stretch-x',
          expected: {
            property: 'constraints',
            value: { horizontal: 'STRETCH' },
            variant: 'preset'
          }
        },
        {
          input: 'stretch-y',
          expected: {
            property: 'constraints',
            value: { vertical: 'STRETCH' },
            variant: 'preset'
          }
        }
      ];

      cases.forEach(({ input, expected }) => {
        const result = parsePositionStyleValue(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe('Stretch and Scale Constraints', () => {
    it('should parse left position with stretch', () => {
      const result = parsePositionStyleValue('left-[0px]');
      expect(result).toEqual({
        property: 'position',
        direction: 'left',
        value: 0,
        unit: 'px',
        variant: 'arbitrary',
        constraints: { horizontal: 'MIN' }
      });
    });

    it('should parse right position with stretch', () => {
      const result = parsePositionStyleValue('right-[0px]');
      expect(result).toEqual({
        property: 'position',
        direction: 'right',
        value: 0,
        unit: 'px',
        variant: 'arbitrary',
        constraints: { horizontal: 'MAX' }
      });
    });

    it('should parse top position with stretch', () => {
      const result = parsePositionStyleValue('top-[0px]');
      expect(result).toEqual({
        property: 'position',
        direction: 'top',
        value: 0,
        unit: 'px',
        variant: 'arbitrary',
        constraints: { vertical: 'MIN' }
      });
    });

    it('should parse bottom position with stretch', () => {
      const result = parsePositionStyleValue('bottom-[0px]');
      expect(result).toEqual({
        property: 'position',
        direction: 'bottom',
        value: 0,
        unit: 'px',
        variant: 'arbitrary',
        constraints: { vertical: 'MAX' }
      });
    });

    it('should parse non-zero position values with stretch', () => {
      const result = parsePositionStyleValue('left-[10px]');
      expect(result).toEqual({
        property: 'position',
        direction: 'left',
        value: 10,
        unit: 'px',
        variant: 'arbitrary',
        constraints: { horizontal: 'MIN' }
      });
    });

    it('should parse stretch-x constraint', () => {
      const result = parsePositionStyleValue('stretch-x');
      expect(result).toEqual({
        property: 'constraints',
        value: { horizontal: 'STRETCH' },
        variant: 'preset'
      });
    });

    it('should parse stretch-y constraint', () => {
      const result = parsePositionStyleValue('stretch-y');
      expect(result).toEqual({
        property: 'constraints',
        value: { vertical: 'STRETCH' },
        variant: 'preset'
      });
    });
  });

  describe('State Management', () => {
    it('should maintain constraints state', () => {
      parsePositionStyleValue('center-x');
      const result = parsePositionStyleValue('top-[10px]');
      expect(result).toEqual({
        property: 'position',
        direction: 'top',
        value: 10,
        unit: 'px',
        variant: 'arbitrary',
        constraints: { 
          horizontal: 'CENTER',
          vertical: 'MIN'
        }
      });
    });

    it('should reset state on position type change', () => {
      parsePositionStyleValue('center-x');
      parsePositionStyleValue('absolute');
      const result = parsePositionStyleValue('left-[10px]');
      expect(result).toEqual({
        property: 'position',
        direction: 'left',
        value: 10,
        unit: 'px',
        variant: 'arbitrary',
        constraints: { horizontal: 'MIN' }
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid values', () => {
      expect(parsePositionStyleValue('left-[invalid]')).toBeNull();
      expect(parsePositionStyleValue('center-x-[abc]')).toBeNull();
      expect(parsePositionStyleValue('top-[]')).toBeNull();
    });
  });

  describe('Figma Variables', () => {
    it('should parse Figma variable references', () => {
      const result = parsePositionStyleValue('left-$[spacing/position]');
      expect(result).toEqual({
        property: 'position',
        value: 'spacing/position',
        variant: 'figma-variable',
        variableId: 'spacing/position',
        constraints: { horizontal: 'MIN' }
      });
    });
  });
});