import { describe, it, expect } from 'vitest';
import { parseTextStyleValue } from '../../src/parser/text';

describe('Text Style Parser', () => {
  describe('Text Color', () => {
    it('should parse preset colors', () => {
      const testCases = [
        { input: 'text-white', expected: { r: 1, g: 1, b: 1 } },
        { input: 'text-black', expected: { r: 0, g: 0, b: 0 } },
        { input: 'text-gray-100', expected: { r: 0.95, g: 0.96, b: 0.96 } },
        { input: 'text-blue-500', expected: { r: 0.23, g: 0.51, b: 0.96 } },
        { input: 'text-red-600', expected: { r: 0.86, g: 0.15, b: 0.15 } }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'color',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary hex colors', () => {
      expect(parseTextStyleValue('text-[#FF0000]')).toEqual({
        property: 'color',
        value: '#FF0000',
        variant: 'arbitrary'
      });

      expect(parseTextStyleValue('text-[#00FF00]')).toEqual({
        property: 'color',
        value: '#00FF00',
        variant: 'arbitrary'
      });
    });

    it('should parse arbitrary rgb/rgba colors', () => {
      expect(parseTextStyleValue('text-[rgb(255,0,0)]')).toEqual({
        property: 'color',
        value: 'rgb(255,0,0)',
        variant: 'arbitrary'
      });

      expect(parseTextStyleValue('text-[rgba(255,0,0,0.5)]')).toEqual({
        property: 'color',
        value: 'rgba(255,0,0,0.5)',
        variant: 'arbitrary'
      });
    });
  });

  describe('Font Size', () => {
    it('should parse preset font sizes', () => {
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
        expect(parseTextStyleValue(input)).toEqual({
          property: 'fontSize',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary font sizes', () => {
      expect(parseTextStyleValue('text-[20]')).toEqual({
        property: 'fontSize',
        value: 20,
        variant: 'arbitrary'
      });
    });
  });

  describe('Text Alignment', () => {
    it('should parse text alignment', () => {
      const testCases = [
        { input: 'text-left', expected: 'LEFT' },
        { input: 'text-center', expected: 'CENTER' },
        { input: 'text-right', expected: 'RIGHT' },
        { input: 'text-justify', expected: 'JUSTIFIED' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'textAlignHorizontal',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Text Decoration', () => {
    it('should parse text decoration', () => {
      expect(parseTextStyleValue('underline')).toEqual({
        property: 'textDecoration',
        value: 'UNDERLINE',
        variant: 'preset'
      });

      expect(parseTextStyleValue('line-through')).toEqual({
        property: 'textDecoration',
        value: 'STRIKETHROUGH',
        variant: 'preset'
      });

      expect(parseTextStyleValue('no-underline')).toEqual({
        property: 'textDecoration',
        value: 'NONE',
        variant: 'preset'
      });
    });
  });

  describe('Invalid Values', () => {
    it('should return null for invalid values', () => {
      expect(parseTextStyleValue('text-invalid')).toBeNull();
      expect(parseTextStyleValue('text-[invalid]')).toBeNull();
      expect(parseTextStyleValue('text-[#GGGGGG]')).toBeNull();
      expect(parseTextStyleValue('text-[rgb(256,0,0)]')).toBeNull();
    });
  });

  describe('Figma Variables', () => {
    it('should parse text color variables', () => {
      const testCases = [
        {
          input: 'text-$[colors/primary]',
          expected: 'colors/primary',
          opacity: undefined
        },
        {
          input: 'text-$[colors/text]/50',
          expected: 'colors/text',
          opacity: 0.5
        },
        {
          input: 'text-$[theme/colors/text]/75',
          expected: 'theme/colors/text',
          opacity: 0.75
        }
      ];

      testCases.forEach(({ input, expected, opacity }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'color',
          value: expected,
          variant: 'figma-variable',
          variableId: expected,
          opacity
        });
      });
    });

    it('should handle invalid variable paths', () => {
      const testCases = [
        'text-$[]',
        'text-$[/]',
        'text-$[/invalid]',
        'text-$[colors/]/50',
        'text-$[/colors/text]/25',
        'text-$[colors//text]/75'
      ];

      testCases.forEach(input => {
        expect(parseTextStyleValue(input)).toBeNull();
      });
    });
  });

  describe('Line Height', () => {
    it('should parse preset line heights', () => {
      const testCases = [
        { input: 'leading-none', expected: { value: 100, unit: 'PERCENT' } },
        { input: 'leading-tight', expected: { value: 125, unit: 'PERCENT' } },
        { input: 'leading-snug', expected: { value: 137.5, unit: 'PERCENT' } },
        { input: 'leading-normal', expected: { value: 150, unit: 'PERCENT' } },
        { input: 'leading-relaxed', expected: { value: 165, unit: 'PERCENT' } },
        { input: 'leading-loose', expected: { value: 200, unit: 'PERCENT' } }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'lineHeight',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary line heights', () => {
      const testCases = [
        { 
          input: 'leading-[24px]', 
          expected: { value: 24, unit: 'PIXELS' }
        },
        { 
          input: 'leading-[1.5]', 
          expected: { value: 150, unit: 'PERCENT' }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'lineHeight',
          value: expected,
          variant: 'arbitrary'
        });
      });
    });
  });

  describe('Letter Spacing', () => {
    it('should parse preset letter spacing', () => {
      const testCases = [
        { input: 'tracking-tighter', expected: -0.8 },
        { input: 'tracking-tight', expected: -0.4 },
        { input: 'tracking-normal', expected: 0 },
        { input: 'tracking-wide', expected: 0.4 },
        { input: 'tracking-wider', expected: 0.8 },
        { input: 'tracking-widest', expected: 1.6 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'letterSpacing',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary letter spacing', () => {
      const testCases = [
        { 
          input: 'tracking-[2px]', 
          expected: { value: 2, unit: 'PIXELS' }
        },
        { 
          input: 'tracking-[0.2em]', 
          expected: { value: 20, unit: 'PERCENT' }
        },
        { 
          input: 'tracking-[0.5]', 
          expected: 0.5
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'letterSpacing',
          value: expected,
          variant: 'arbitrary'
        });
      });
    });
  });

  describe('Text Transform', () => {
    it('should parse text transform values', () => {
      const testCases = [
        { input: 'uppercase', expected: 'UPPER' },
        { input: 'lowercase', expected: 'LOWER' },
        { input: 'capitalize', expected: 'TITLE' },
        { input: 'normal-case', expected: 'ORIGINAL' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'textCase',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Text Color with Opacity', () => {
    it('should parse preset colors with opacity', () => {
      const testCases = [
        { 
          input: 'text-red-500/50', 
          expected: { r: 0.94, g: 0.27, b: 0.27 },
          opacity: 0.5 
        },
        { 
          input: 'text-blue-600/75', 
          expected: { r: 0.15, g: 0.39, b: 0.92 },
          opacity: 0.75 
        }
      ];

      testCases.forEach(({ input, expected, opacity }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'color',
          value: expected,
          variant: 'preset',
          opacity
        });
      });
    });

    it('should parse arbitrary colors with opacity', () => {
      const testCases = [
        { 
          input: 'text-[#FF0000]/50', 
          expected: '#FF0000',
          opacity: 0.5 
        },
        { 
          input: 'text-[rgb(0,255,0)]/75', 
          expected: 'rgb(0,255,0)',
          opacity: 0.75 
        }
      ];

      testCases.forEach(({ input, expected, opacity }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'color',
          value: expected,
          variant: 'arbitrary',
          opacity
        });
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid opacity values', () => {
      const testCases = [
        'text-red-500/101',    // opacity > 100
        'text-red-500/-1',     // negative opacity
        'text-red-500/abc',    // non-numeric opacity
        'text-[#FF0000]/xyz'   // invalid opacity format
      ];

      testCases.forEach(input => {
        expect(parseTextStyleValue(input)).toBeNull();
      });
    });

    it('should handle malformed arbitrary values', () => {
      const testCases = [
        'text-[]',             // empty brackets
        'text-[12px]',         // invalid font size unit
        'text-[rgb 255,0,0]',  // malformed rgb
        'text-[#XYZ]',         // invalid hex
        'leading-[]',          // empty line height
        'tracking-[]'          // empty letter spacing
      ];

      testCases.forEach(input => {
        expect(parseTextStyleValue(input)).toBeNull();
      });
    });
  });

  describe('Paragraph Properties', () => {
    describe('Paragraph Spacing', () => {
      it('should parse preset paragraph spacing', () => {
        const testCases = [
          { input: 'paragraph-tight', expected: 8 },
          { input: 'paragraph-normal', expected: 16 },
          { input: 'paragraph-loose', expected: 24 }
        ];

        testCases.forEach(({ input, expected }) => {
          expect(parseTextStyleValue(input)).toEqual({
            property: 'paragraphSpacing',
            value: expected,
            variant: 'preset'
          });
        });
      });

      it('should parse arbitrary paragraph spacing', () => {
        expect(parseTextStyleValue('paragraph-[20]')).toEqual({
          property: 'paragraphSpacing',
          value: 20,
          variant: 'arbitrary'
        });
      });

      it('should parse paragraph spacing variables', () => {
        expect(parseTextStyleValue('paragraph-$[typography/spacing/normal]')).toEqual({
          property: 'paragraphSpacing',
          value: 'typography/spacing/normal',
          variant: 'figma-variable',
          variableId: 'typography/spacing/normal'
        });
      });
    });

    describe('Paragraph Indent', () => {
      it('should parse preset paragraph indent', () => {
        const testCases = [
          { input: 'indent-none', expected: 0 },
          { input: 'indent-sm', expected: 16 },
          { input: 'indent-md', expected: 24 },
          { input: 'indent-lg', expected: 32 }
        ];

        testCases.forEach(({ input, expected }) => {
          expect(parseTextStyleValue(input)).toEqual({
            property: 'paragraphIndent',
            value: expected,
            variant: 'preset'
          });
        });
      });

      it('should parse arbitrary paragraph indent', () => {
        expect(parseTextStyleValue('indent-[20]')).toEqual({
          property: 'paragraphIndent',
          value: 20,
          variant: 'arbitrary'
        });
      });

      it('should parse paragraph indent variables', () => {
        expect(parseTextStyleValue('indent-$[typography/indent/normal]')).toEqual({
          property: 'paragraphIndent',
          value: 'typography/indent/normal',
          variant: 'figma-variable',
          variableId: 'typography/indent/normal'
        });
      });
    });
  });

  describe('Text Auto Resize', () => {
    it('should parse text auto resize values', () => {
      const testCases = [
        { input: 'text-fixed', expected: 'NONE' },
        { input: 'text-auto', expected: 'WIDTH_AND_HEIGHT' },
        { input: 'text-auto-h', expected: 'HEIGHT' },
        { input: 'text-truncate', expected: 'TRUNCATE' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'textAutoResize',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should handle invalid text auto resize values', () => {
      const invalidCases = [
        'text-auto-invalid',
        'text-resize',
        'auto-text'
      ];

      invalidCases.forEach(input => {
        expect(parseTextStyleValue(input)).toBeNull();
      });
    });
  });

  describe('Text Case', () => {
    it('should parse text case values', () => {
      const testCases = [
        { input: 'uppercase', expected: 'UPPER' },
        { input: 'lowercase', expected: 'LOWER' },
        { input: 'capitalize', expected: 'TITLE' },
        { input: 'normal-case', expected: 'ORIGINAL' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'textCase',
          value: expected,
          variant: 'preset'
        });
      });
    });


    it('should handle invalid text case values', () => {
      const invalidCases = [
        'text-smallcase',
        'text-case-invalid',
        'case-upper'
      ];

      invalidCases.forEach(input => {
        expect(parseTextStyleValue(input)).toBeNull();
      });
    });
  });

  describe('Text Truncation', () => {
    it('should parse text truncation values', () => {
      const testCases = [
        { input: 'text-truncate-none', expected: 'DISABLED' },
        { input: 'text-truncate-end', expected: 'ENDING' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'textTruncation',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should handle invalid text truncation values', () => {
      const invalidCases = [
        'text-truncate-middle',
        'truncate-start',
        'text-clip'
      ];

      invalidCases.forEach(input => {
        expect(parseTextStyleValue(input)).toBeNull();
      });
    });
  });

  describe('Text Wrap', () => {
    it('should parse text wrap values', () => {
      const testCases = [
        { input: 'text-wrap-balance', expected: 'BALANCE' },
        { input: 'text-wrap', expected: 'WRAP' },
        { input: 'text-wrap-truncate', expected: 'TRUNCATE' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'textWrap',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should handle text wrap with Figma variables', () => {
      expect(parseTextStyleValue('text-wrap-$[typography/wrap/default]')).toEqual({
        property: 'textWrap',
        value: 'typography/wrap/default',
        variant: 'figma-variable',
        variableId: 'typography/wrap/default'
      });
    });

    it('should handle invalid text wrap values', () => {
      const invalidCases = [
        'text-wrap-invalid',
        'wrap-text',
        'text-nowrap'
      ];

      invalidCases.forEach(input => {
        expect(parseTextStyleValue(input)).toBeNull();
      });
    });
  });

  describe('Text Vertical Alignment', () => {
    it('should parse vertical alignment values', () => {
      const testCases = [
        { input: 'align-top', expected: 'TOP' },
        { input: 'align-middle', expected: 'CENTER' },
        { input: 'align-bottom', expected: 'BOTTOM' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'textAlignVertical',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should handle invalid vertical alignment values', () => {
      const invalidCases = [
        'align-center',
        'vertical-top',
        'text-align-middle'
      ];

      invalidCases.forEach(input => {
        expect(parseTextStyleValue(input)).toBeNull();
      });
    });

    it('should parse vertical alignment with Figma variables', () => {
      expect(parseTextStyleValue('align-$[typography/vertical/default]')).toEqual({
        property: 'textAlignVertical',
        value: 'typography/vertical/default',
        variant: 'figma-variable',
        variableId: 'typography/vertical/default'
      });
    });
  });
}); 