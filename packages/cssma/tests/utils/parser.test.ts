import { describe, it, expect } from 'vitest';
import { parseStyles } from '../../src/parser';
import { parseArbitraryValue } from '../../src/utils/converters';
import { parseColor } from '../../src/utils/colors';

describe('Parser Utils', () => {
  describe('parseArbitraryValue', () => {
    it('should parse arbitrary width values', () => {
      expect(parseStyles('w-[100]')).toEqual([
        {
          property: 'width',
          value: 100,
          variant: 'arbitrary'
        }
      ]);

      expect(parseStyles('w-[100px]')).toEqual([
        {
          property: 'width',
          value: 100,
          variant: 'arbitrary'
        }
      ]);
    });

    it('should parse arbitrary height values', () => {
      expect(parseStyles('h-[200]')).toEqual([
        {
          property: 'height',
          value: 200,
          variant: 'arbitrary'
        }
      ]);

      expect(parseStyles('h-[200px]')).toEqual([
        {
          property: 'height',
          value: 200,
          variant: 'arbitrary'
        }
      ]);
    });

    it('should parse arbitrary padding values', () => {
      expect(parseStyles('p-[16]')).toEqual([
        {
          property: 'padding',
          value: 16,
          variant: 'arbitrary'
        }
      ]);

      expect(parseStyles('pt-[8]')).toEqual([
        {
          property: 'paddingTop',
          value: 8,
          variant: 'arbitrary'
        }
      ]);

      expect(parseStyles('pr-[12]')).toEqual([
        {
          property: 'paddingRight',
          value: 12,
          variant: 'arbitrary'
        }
      ]);

      expect(parseStyles('pb-[20]')).toEqual([
        {
          property: 'paddingBottom',
          value: 20,
          variant: 'arbitrary'
        }
      ]);

      expect(parseStyles('pl-[10]')).toEqual([
        {
          property: 'paddingLeft',
          value: 10,
          variant: 'arbitrary'
        }
      ]);
    });

    it('should parse arbitrary gap values', () => {
      expect(parseStyles('gap-[24]')).toEqual([
        {
          property: 'gap',
          value: 24,
          variant: 'arbitrary'
        }
      ]);

      expect(parseStyles('gap-x-[16]')).toEqual([
        {
          property: 'itemSpacing',
          value: 16,
          variant: 'arbitrary'
        }
      ]);

      expect(parseStyles('gap-y-[20]')).toEqual([
        {
          property: 'counterAxisSpacing',
          value: 20,
          variant: 'arbitrary'
        }
      ]);
    });

    it('should parse arbitrary color values', () => {
      expect(parseStyles('bg-[#FF0000]')).toEqual([
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        }
      ]);

      expect(parseStyles('text-[#00FF00]')).toEqual([
        {
          property: 'color',
          value: '#00FF00',
          variant: 'arbitrary'
        }
      ]);

      expect(parseStyles('border-[#0000FF]')).toEqual([
        {
          property: 'borderColor',
          value: '#0000FF',
          variant: 'arbitrary'
        }
      ]);
    });

    it('should parse arbitrary opacity values', () => {
      expect(parseStyles('opacity-[0.5]')).toEqual([
        {
          property: 'opacity',
          value: 0.5,
          variant: 'arbitrary'
        }
      ]);
    });

    it('should handle invalid arbitrary values', () => {
      expect(parseArbitraryValue('w-invalid')).toBeNull();
      expect(parseArbitraryValue('h-[]')).toBeNull();
      expect(parseArbitraryValue('p-[abc]')).toBeNull();
    });

    it('should handle non-arbitrary values', () => {
      expect(parseArbitraryValue('w-full')).toBeNull();
      expect(parseArbitraryValue('h-auto')).toBeNull();
      expect(parseArbitraryValue('p-4')).toBeNull();
    });
  });

  describe('parseStyles', () => {
    it('should parse multiple style classes', () => {
      const input = 'w-[100] h-[200] p-[16] bg-[#FF0000] opacity-[0.5]';
      expect(parseStyles(input)).toEqual([
        {
          property: 'width',
          value: 100,
          variant: 'arbitrary'
        },
        {
          property: 'height',
          value: 200,
          variant: 'arbitrary'
        },
        {
          property: 'padding',
          value: 16,
          variant: 'arbitrary'
        },
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'opacity',
          value: 0.5,
          variant: 'arbitrary'
        }
      ]);
    });

    it('should parse complex padding and gap combinations', () => {
      const input = 'pt-[10] pr-[20] pb-[30] pl-[40] gap-x-[16] gap-y-[24]';
      expect(parseStyles(input)).toEqual([
        {
          property: 'paddingTop',
          value: 10,
          variant: 'arbitrary'
        },
        {
          property: 'paddingRight',
          value: 20,
          variant: 'arbitrary'
        },
        {
          property: 'paddingBottom',
          value: 30,
          variant: 'arbitrary'
        },
        {
          property: 'paddingLeft',
          value: 40,
          variant: 'arbitrary'
        },
        {
          property: 'itemSpacing',
          value: 16,
          variant: 'arbitrary'
        },
        {
          property: 'counterAxisSpacing',
          value: 24,
          variant: 'arbitrary'
        }
      ]);
    });

    it('should parse multiple color properties', () => {
      const input = 'bg-[#FF0000] text-[#00FF00] border-[#0000FF]';
      expect(parseStyles(input)).toEqual([
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'color',
          value: '#00FF00',
          variant: 'arbitrary'
        },
        {
          property: 'borderColor',
          value: '#0000FF',
          variant: 'arbitrary'
        }
      ]);
    });

    it('should handle mixed valid and invalid values', () => {
      const input = 'w-[100] h-invalid p-[16] bg-[] text-[#00FF00]';
      expect(parseStyles(input)).toEqual([
        {
          property: 'width',
          value: 100,
          variant: 'arbitrary'
        },
        {
          property: 'padding',
          value: 16,
          variant: 'arbitrary'
        },
        {
          property: 'color',
          value: '#00FF00',
          variant: 'arbitrary'
        }
      ]);
    });

    it('should handle empty input', () => {
      expect(parseStyles('')).toEqual([]);
    });

    it('should handle input with only invalid values', () => {
      const input = 'w-full h-auto p-4 bg-red-500';
      expect(parseStyles(input)).toEqual([
        {
          property: 'layoutSizingHorizontal',
          value: 'FILL',
          variant: 'preset'
        },
        {
          property: 'layoutSizingVertical',
          value: 'HUG',
          variant: 'preset'
        },
        {
          property: 'padding',
          value: 16,
          variant: 'preset'
        },
        {
          property: 'backgroundColor',
          value: {
            r: 0.94,
            g: 0.27,
            b: 0.27,
          },
          variant: 'preset'
        }
      ]);
    });

    it('should parse real-world component example', () => {
      const input = 'w-[280] h-[180] p-[24] gap-[16] bg-[#4F46E5] opacity-[0.9]';
      expect(parseStyles(input)).toEqual([
        {
          property: 'width',
          value: 280,
          variant: 'arbitrary'
        },
        {
          property: 'height',
          value: 180,
          variant: 'arbitrary'
        },
        {
          property: 'padding',
          value: 24,
          variant: 'arbitrary',
        },
        {
          property: 'gap',
          value: 16,
          variant: 'arbitrary',
        },
        {
          property: 'backgroundColor',
          value: '#4F46E5',
          variant: 'arbitrary',
        },
        {
          property: 'opacity',
          value: 0.9,
          variant: 'arbitrary',
        }
      ]);
    });
  });
});
