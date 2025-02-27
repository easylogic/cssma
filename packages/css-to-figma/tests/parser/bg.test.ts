import { describe, it, expect } from 'vitest';
import { parseStyleValue } from '../../src/parser';

describe('Background Style Parser', () => {
  describe('Preset Colors', () => {
    it('should parse basic colors', () => {
      const testCases = [
        {
          input: 'bg-white',
          expected: { r: 1, g: 1, b: 1 }
        },
        {
          input: 'bg-black',
          expected: { r: 0, g: 0, b: 0 }
        },
        {
          input: 'bg-transparent',
          expected: { r: 0, g: 0, b: 0, a: 0 }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundColor',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse gray scale colors', () => {
      const testCases = [
        'bg-gray-50',
        'bg-gray-100',
        'bg-gray-200',
        'bg-gray-300',
        'bg-gray-400',
        'bg-gray-500',
        'bg-gray-600',
        'bg-gray-700',
        'bg-gray-800',
        'bg-gray-900'
      ];

      testCases.forEach((input) => {
        const result = parseStyleValue(input);
        expect(result).toBeTruthy();
        expect(result?.property).toBe('backgroundColor');
        expect(result?.variant).toBe('preset');
        expect(result?.value).toHaveProperty('r');
        expect(result?.value).toHaveProperty('g');
        expect(result?.value).toHaveProperty('b');
      });
    });

    it('should parse color scale colors', () => {
      const colors = ['blue', 'red', 'green', 'purple'];
      const scales = ['500', '600', '700'];

      colors.forEach(color => {
        scales.forEach(scale => {
          const input = `bg-${color}-${scale}`;
          const result = parseStyleValue(input);
          expect(result).toBeTruthy();
          expect(result?.property).toBe('backgroundColor');
          expect(result?.variant).toBe('preset');
          expect(result?.value).toHaveProperty('r');
          expect(result?.value).toHaveProperty('g');
          expect(result?.value).toHaveProperty('b');
        });
      });
    });
  });

  describe('Arbitrary Colors', () => {
    it('should parse hex colors', () => {
      const testCases = [
        {
          input: 'bg-[#FF0000]',
          expected: '#FF0000'
        },
        {
          input: 'bg-[#00FF00]',
          expected: '#00FF00'
        },
        {
          input: 'bg-[#0000FF]',
          expected: '#0000FF'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundColor',
          value: expected,
          variant: 'arbitrary'
        });
      });
    });

    it('should parse hex colors with alpha', () => {
      const testCases = [
        {
          input: 'bg-[#FF0000AA]',
          expected: '#FF0000AA'
        },
        {
          input: 'bg-[#00FF0080]',
          expected: '#00FF0080'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundColor',
          value: expected,
          variant: 'arbitrary'
        });
      });
    });

    it('should parse rgb/rgba colors', () => {
      const testCases = [
        {
          input: 'bg-[rgb(255,0,0)]',
          expected: 'rgb(255,0,0)'
        },
        {
          input: 'bg-[rgba(0,255,0,0.5)]',
          expected: 'rgba(0,255,0,0.5)'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundColor',
          value: expected,
          variant: 'arbitrary'
        });
      });
    });
  });

  describe('Gradients', () => {
    it('should parse linear gradients', () => {
      const result = parseStyleValue('bg-linear-to-r');
      expect(result).toEqual({
        property: 'backgroundColor',
        value: 'linear',
        direction: 'r',
        variant: 'preset'
      });
    });

    it('should parse gradient colors', () => {
      const fromResult = parseStyleValue('from-[#FF0000]');
      expect(fromResult).toEqual({
        property: 'gradientFrom',
        value: '#FF0000',
        variant: 'arbitrary'
      });

      const toResult = parseStyleValue('to-[#0000FF]');
      expect(toResult).toEqual({
        property: 'gradientTo',
        value: '#0000FF',
        variant: 'arbitrary'
      });
    });

    it('should parse gradient directions', () => {
        expect(parseStyleValue('bg-linear-to-t')).toEqual({
            property: 'backgroundColor',
            value: 'linear',
            direction: 't',
            variant: 'preset'
        });

        expect(parseStyleValue('bg-linear-to-tr')).toEqual({
            property: 'backgroundColor',
            value: 'linear',
            direction: 'tr',
            variant: 'preset'
        });

        expect(parseStyleValue('bg-linear-to-r')).toEqual({
            property: 'backgroundColor',
            value: 'linear',
            direction: 'r',
            variant: 'preset'
        });

        expect(parseStyleValue('bg-linear-to-br')).toEqual({
            property: 'backgroundColor',
            value: 'linear',
            direction: 'br',
            variant: 'preset'
        });

        expect(parseStyleValue('bg-linear-to-b')).toEqual({
            property: 'backgroundColor',
            value: 'linear',
            direction: 'b',
            variant: 'preset'
        });

        expect(parseStyleValue('bg-linear-to-bl')).toEqual({
            property: 'backgroundColor',
            value: 'linear',
            direction: 'bl',
            variant: 'preset'
        });

        expect(parseStyleValue('bg-linear-to-l')).toEqual({
            property: 'backgroundColor',
            value: 'linear',
            direction: 'l',
            variant: 'preset'
        });

        expect(parseStyleValue('bg-linear-to-tl')).toEqual({
            property: 'backgroundColor',
            value: 'linear',
            direction: 'tl',
            variant: 'preset'
        });
    });
  });

  describe('Invalid Values', () => {
    it('should return null for invalid colors', () => {
      const testCases = [
        'bg-invalid',
        'bg-[invalid]',
        'bg-[#GGGGGG]',
        'bg-[rgb(256,0,0)]',
        'bg-[rgba(0,0,0,1.1)]'
      ];

      testCases.forEach(input => {
        const result = parseStyleValue(input);
        expect(result).toBeNull();
      });
    });
  });

  describe('Complex Gradient Patterns', () => {
    it('should parse multi-stop gradients', () => {
      const fromResult = parseStyleValue('from-[#FF0000]');
      const viaResult = parseStyleValue('via-[#00FF00]');
      const toResult = parseStyleValue('to-[#0000FF]');

      expect(fromResult).toEqual({
        property: 'gradientFrom',
        value: '#FF0000',
        variant: 'arbitrary'
      });

      expect(viaResult).toEqual({
        property: 'gradientVia',
        value: '#00FF00',
        variant: 'arbitrary'
      });

      expect(toResult).toEqual({
        property: 'gradientTo',
        value: '#0000FF',
        variant: 'arbitrary'
      });
    });

    it('should parse gradient with rgb/rgba colors', () => {
      const fromResult = parseStyleValue('from-[rgb(255,0,0)]');
      const viaResult = parseStyleValue('via-[rgba(0,255,0,0.5)]');
      const toResult = parseStyleValue('to-[rgb(0,0,255)]');

      expect(fromResult).toEqual({
        property: 'gradientFrom',
        value: 'rgb(255,0,0)',
        variant: 'arbitrary'
      });

      expect(viaResult).toEqual({
        property: 'gradientVia',
        value: 'rgba(0,255,0,0.5)',
        variant: 'arbitrary'
      });

      expect(toResult).toEqual({
        property: 'gradientTo',
        value: 'rgb(0,0,255)',
        variant: 'arbitrary'
      });
    });
  });

  describe('Background Opacity', () => {
    it('should parse background opacity with slash syntax', () => {
      const testCases = [
        {
          input: 'bg-[#FF0000]/50',
          expected: '#FF0000',
          opacity: 0.5
        },
        {
          input: 'bg-[#00FF00]/75',
          expected: '#00FF00',
          opacity: 0.75
        }
      ];

      testCases.forEach(({ input, expected, opacity }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundColor',
          value: expected,
          opacity,
          variant: 'arbitrary'
        });
      });
    });
  });

  describe('Background Size and Position', () => {
    it('should parse background size', () => {
      const testCases = [
        {
          input: 'bg-auto',
          expected: 'AUTO'
        },
        {
          input: 'bg-cover',
          expected: 'COVER'
        },
        {
          input: 'bg-contain',
          expected: 'CONTAIN'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundSize',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse background position', () => {
      const testCases = [
        {
          input: 'bg-center',
          expected: 'CENTER'
        },
        {
          input: 'bg-top',
          expected: 'TOP'
        },
        {
          input: 'bg-bottom',
          expected: 'BOTTOM'
        },
        {
          input: 'bg-left',
          expected: 'LEFT'
        },
        {
          input: 'bg-right',
          expected: 'RIGHT'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundPosition',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Background Blend Modes', () => {
    it('should parse background blend modes', () => {
      const testCases = [
        {
          input: 'bg-blend-normal',
          expected: 'NORMAL'
        },
        {
          input: 'bg-blend-multiply',
          expected: 'MULTIPLY'
        },
        {
          input: 'bg-blend-screen',
          expected: 'SCREEN'
        },
        {
          input: 'bg-blend-overlay',
          expected: 'OVERLAY'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundBlendMode',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Background Repeat', () => {
    it('should parse background repeat values', () => {
      const testCases = [
        {
          input: 'bg-repeat',
          expected: 'REPEAT'
        },
        {
          input: 'bg-no-repeat',
          expected: 'NO_REPEAT'
        },
        {
          input: 'bg-repeat-x',
          expected: 'REPEAT_X'
        },
        {
          input: 'bg-repeat-y',
          expected: 'REPEAT_Y'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundRepeat',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Background Attachment', () => {
    it('should parse background attachment values', () => {
      const testCases = [
        {
          input: 'bg-fixed',
          expected: 'FIXED'
        },
        {
          input: 'bg-local',
          expected: 'LOCAL'
        },
        {
          input: 'bg-scroll',
          expected: 'SCROLL'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundAttachment',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Background Origin', () => {
    it('should parse background origin values', () => {
      const testCases = [
        {
          input: 'bg-origin-border',
          expected: 'BORDER_BOX'
        },
        {
          input: 'bg-origin-padding',
          expected: 'PADDING_BOX'
        },
        {
          input: 'bg-origin-content',
          expected: 'CONTENT_BOX'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundOrigin',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Background Clip', () => {
    it('should parse background clip values', () => {
      const testCases = [
        {
          input: 'bg-clip-border',
          expected: 'BORDER_BOX'
        },
        {
          input: 'bg-clip-padding',
          expected: 'PADDING_BOX'
        },
        {
          input: 'bg-clip-content',
          expected: 'CONTENT_BOX'
        },
        {
          input: 'bg-clip-text',
          expected: 'TEXT'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundClip',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Complex Background Combinations', () => {
    it('should parse preset color with opacity', () => {
      const result = parseStyleValue('bg-white/50');
      expect(result).toEqual({
        property: 'backgroundColor',
        value: { r: 1, g: 1, b: 1 },
        opacity: 0.5,
        variant: 'preset'
      });
    });

    it('should parse gradient with opacity stops', () => {
      const fromResult = parseStyleValue('from-[#FF0000]/50');
      expect(fromResult).toEqual({
        property: 'gradientFrom',
        value: '#FF0000',
        opacity: 0.5,
        variant: 'arbitrary'
      });

      const viaResult = parseStyleValue('via-[#00FF00]/75');
      expect(viaResult).toEqual({
        property: 'gradientVia',
        value: '#00FF00',
        opacity: 0.75,
        variant: 'arbitrary'
      });

      const toResult = parseStyleValue('to-[#0000FF]/25');
      expect(toResult).toEqual({
        property: 'gradientTo',
        value: '#0000FF',
        opacity: 0.25,
        variant: 'arbitrary'
      });
    });

    it('should parse rgb/rgba colors with opacity', () => {
      const testCases = [
        {
          input: 'bg-[rgb(255,0,0)]/50',
          expected: 'rgb(255,0,0)',
          opacity: 0.5
        },
        {
          input: 'bg-[rgba(0,255,0,0.8)]/75',
          expected: 'rgba(0,255,0,0.8)',
          opacity: 0.75
        }
      ];

      testCases.forEach(({ input, expected, opacity }) => {
        const result = parseStyleValue(input);
        expect(result).toEqual({
          property: 'backgroundColor',
          value: expected,
          opacity,
          variant: 'arbitrary'
        });
      });
    });
  });

  describe('Invalid Background Values', () => {
    it('should return null for invalid background repeat values', () => {
      expect(parseStyleValue('bg-repeat-invalid')).toBeNull();
    });

    it('should return null for invalid background attachment values', () => {
      expect(parseStyleValue('bg-attachment-invalid')).toBeNull();
    });

    it('should return null for invalid background origin values', () => {
      expect(parseStyleValue('bg-origin-invalid')).toBeNull();
    });

    it('should return null for invalid background clip values', () => {
      expect(parseStyleValue('bg-clip-invalid')).toBeNull();
    });

    it('should return null for invalid opacity values', () => {
      expect(parseStyleValue('bg-[#FF0000]/invalid')).toBeNull();
      expect(parseStyleValue('bg-[#FF0000]/101')).toBeNull();
      expect(parseStyleValue('bg-[#FF0000]/-1')).toBeNull();
    });
  });
}); 