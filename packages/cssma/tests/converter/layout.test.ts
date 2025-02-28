import { describe, it, expect } from 'vitest';
import { convertLayoutToFigma } from '../../src/converter/layout';
import { ParsedStyle } from '../../src/types';

describe('Layout Converter', () => {
  describe('Layout Mode', () => {
    it('should convert layout mode values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'layoutMode',
            value: 'HORIZONTAL',
            variant: 'preset'
          },
          expected: {
            layoutMode: 'HORIZONTAL'
          }
        },
        {
          input: {
            property: 'layoutMode',
            value: 'VERTICAL',
            variant: 'preset'
          },
          expected: {
            layoutMode: 'VERTICAL'
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertLayoutToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Layout Alignment', () => {
    it('should convert primary axis alignment', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'primaryAxisAlignItems',
            value: 'MIN',
            variant: 'preset'
          },
          expected: {
            primaryAxisAlignItems: 'MIN'
          }
        },
        {
          input: {
            property: 'primaryAxisAlignItems',
            value: 'CENTER',
            variant: 'preset'
          },
          expected: {
            primaryAxisAlignItems: 'CENTER'
          }
        },
        {
          input: {
            property: 'primaryAxisAlignItems',
            value: 'MAX',
            variant: 'preset'
          },
          expected: {
            primaryAxisAlignItems: 'MAX'
          }
        },
        {
          input: {
            property: 'primaryAxisAlignItems',
            value: 'SPACE_BETWEEN',
            variant: 'preset'
          },
          expected: {
            primaryAxisAlignItems: 'SPACE_BETWEEN'
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertLayoutToFigma(input)).toEqual(expected);
      });
    });

    it('should convert counter axis alignment', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'counterAxisAlignItems',
            value: 'MIN',
            variant: 'preset'
          },
          expected: {
            counterAxisAlignItems: 'MIN'
          }
        },
        {
          input: {
            property: 'counterAxisAlignItems',
            value: 'CENTER',
            variant: 'preset'
          },
          expected: {
            counterAxisAlignItems: 'CENTER'
          }
        },
        {
          input: {
            property: 'counterAxisAlignItems',
            value: 'MAX',
            variant: 'preset'
          },
          expected: {
            counterAxisAlignItems: 'MAX'
          }
        },
        {
          input: {
            property: 'counterAxisAlignItems',
            value: 'BASELINE',
            variant: 'preset'
          },
          expected: {
            counterAxisAlignItems: 'BASELINE'
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertLayoutToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Layout Sizing', () => {
    it('should convert width and height values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'width',
            value: 100,
            variant: 'arbitrary'
          },
          expected: {
            width: 100,
            layoutSizingHorizontal: 'FIXED'
          }
        },
        {
          input: {
            property: 'height',
            value: 200,
            variant: 'arbitrary'
          },
          expected: {
            height: 200,
            layoutSizingVertical: 'FIXED'
          }
        },
        {
          input: {
            property: 'width',
            value: 'full',
            variant: 'preset'
          },
          expected: {
            layoutSizingHorizontal: 'FILL'
          }
        },
        {
          input: {
            property: 'height',
            value: 'auto',
            variant: 'preset'
          },
          expected: {
            layoutSizingVertical: 'HUG'
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertLayoutToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'layoutMode',
            value: 'INVALID',
            variant: 'preset'
          },
          expected: {}
        },
        {
          input: {
            property: 'width',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertLayoutToFigma(input)).toEqual(expected);
      });
    });
  });
}); 