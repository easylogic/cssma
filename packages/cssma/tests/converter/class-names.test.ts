import { describe, it, expect } from 'vitest';
import { convertClassNamesToCSS, convertClassNamesToCSSObject, CSSConversion } from '../../src/converter/class-names';

describe('convertClassNamesToCSS (Array Format)', () => {
  describe('Layout classes', () => {
    it('should convert flex layout classes to array format', () => {
      const result = convertClassNamesToCSS('flex justify-center items-center');
      expect(result).toEqual([
        { className: 'flex', cssProperty: 'display', cssValue: 'flex' },
        { className: 'justify-center', cssProperty: 'justify-content', cssValue: 'center' },
        { className: 'items-center', cssProperty: 'align-items', cssValue: 'center' }
      ]);
    });

    it('should convert grid layout classes to array format', () => {
      const result = convertClassNamesToCSS('grid grid-cols-3 gap-4');
      expect(result).toEqual([
        { className: 'grid', cssProperty: 'display', cssValue: 'grid' },
        { className: 'grid-cols-3', cssProperty: 'grid-template-columns', cssValue: 'repeat(3, 1fr)' },
        { className: 'gap-4', cssProperty: 'gap', cssValue: '16' }
      ]);
    });
  });

  describe('Size classes', () => {
    it('should handle missing size parsers gracefully', () => {
      const result = convertClassNamesToCSS('w-4 h-8');
      expect(result).toEqual([
        { className: 'w-4', cssProperty: 'width', cssValue: '4' },
        { className: 'h-8', cssProperty: 'height', cssValue: '8' }
      ]);
    });

    it('should convert arbitrary size values when implemented', () => {
      const result = convertClassNamesToCSS('w-[400px] h-[50%]');
      expect(result).toEqual([
        { className: 'w-[400px]', cssProperty: 'width', cssValue: '400px' },
        { className: 'h-[50%]', cssProperty: 'height', cssValue: '50%' }
      ]);
    });
  });

  describe('Gradient classes', () => {
    it('should convert gradient background classes with CSS variables', () => {
      const result = convertClassNamesToCSS('bg-linear-to-r from-blue-500 to-red-500');
      expect(result).toEqual([
        { className: 'bg-linear-to-r', cssProperty: 'background-image', cssValue: 'linear-gradient(to right, var(--tw-gradient-stops))' },
        { className: 'from-blue-500', cssProperty: '--tw-gradient-from', cssValue: '#3b82f6' },
        { className: 'from-blue-500', cssProperty: '--tw-gradient-to', cssValue: 'rgb(59 130 246 / 0)' },
        { className: 'from-blue-500', cssProperty: '--tw-gradient-stops', cssValue: 'var(--tw-gradient-from), var(--tw-gradient-to)' },
        { className: 'to-red-500', cssProperty: '--tw-gradient-to', cssValue: '#ef4444' }
      ]);
    });

    it('should convert gradient with via colors', () => {
      const result = convertClassNamesToCSS('bg-linear-to-br from-purple-600 via-pink-600 to-blue-600');
      expect(result).toEqual([
        { className: 'bg-linear-to-br', cssProperty: 'background-image', cssValue: 'linear-gradient(to bottom right, var(--tw-gradient-stops))' },
        { className: 'from-purple-600', cssProperty: '--tw-gradient-from', cssValue: '#9333ea' },
        { className: 'from-purple-600', cssProperty: '--tw-gradient-to', cssValue: 'rgb(147 51 234 / 0)' },
        { className: 'from-purple-600', cssProperty: '--tw-gradient-stops', cssValue: 'var(--tw-gradient-from), var(--tw-gradient-to)' },
        { className: 'via-pink-600', cssProperty: '--tw-gradient-to', cssValue: 'rgb(219 39 119 / 0)' },
        { className: 'via-pink-600', cssProperty: '--tw-gradient-stops', cssValue: 'var(--tw-gradient-from), #db2777, var(--tw-gradient-to)' },
        { className: 'to-blue-600', cssProperty: '--tw-gradient-to', cssValue: '#2563eb' }
      ]);
    });

    it('should convert arbitrary gradient colors', () => {
      const result = convertClassNamesToCSS('bg-linear-to-r from-[#ff0000] to-[#00ff00]');
      expect(result).toEqual([
        { className: 'bg-linear-to-r', cssProperty: 'background-image', cssValue: 'linear-gradient(to right, var(--tw-gradient-stops))' },
        { className: 'from-[#ff0000]', cssProperty: '--tw-gradient-from', cssValue: '#ff0000' },
        { className: 'from-[#ff0000]', cssProperty: '--tw-gradient-to', cssValue: 'rgb(255 0 0 / 0)' },
        { className: 'from-[#ff0000]', cssProperty: '--tw-gradient-stops', cssValue: 'var(--tw-gradient-from), var(--tw-gradient-to)' },
        { className: 'to-[#00ff00]', cssProperty: '--tw-gradient-to', cssValue: '#00ff00' }
      ]);
    });
  });

  describe('CSS Variables', () => {
    it('should handle custom CSS variables', () => {
      const result = convertClassNamesToCSS('text-[var(--my-color)] bg-[var(--my-bg)]');
      expect(result).toEqual([
        { className: 'text-[var(--my-color)]', cssProperty: 'color', cssValue: 'var(--my-color)' },
        { className: 'bg-[var(--my-bg)]', cssProperty: 'background-color', cssValue: 'var(--my-bg)' }
      ]);
    });

    it('should handle space-separated utility classes with CSS variables', () => {
      const result = convertClassNamesToCSS('shadow-[0_4px_var(--shadow-color)] border-[var(--border-width)]');
      expect(result).toEqual([
        { className: 'shadow-[0_4px_var(--shadow-color)]', cssProperty: 'box-shadow', cssValue: '0 4px var(--shadow-color)' },
        { className: 'border-[var(--border-width)]', cssProperty: 'border-width', cssValue: 'var(--border-width)' }
      ]);
    });
  });

  describe('Flexbox classes', () => {
    it('should convert flexbox classes to array format', () => {
      const result = convertClassNamesToCSS('flex flex-col flex-wrap flex-1');
      expect(result).toEqual([
        { className: 'flex', cssProperty: 'display', cssValue: 'flex' },
        { className: 'flex-col', cssProperty: 'flex-direction', cssValue: 'column' },
        { className: 'flex-wrap', cssProperty: 'flex-wrap', cssValue: 'wrap' },
        { className: 'flex-1', cssProperty: 'flex', cssValue: '1 1 0%' }
      ]);
    });
  });

  describe('Z-index classes', () => {
    it('should convert z-index classes to array format', () => {
      const result = convertClassNamesToCSS('z-10 -z-5 z-auto');
      expect(result).toEqual([
        { className: 'z-10', cssProperty: 'z-index', cssValue: '10' },
        { className: '-z-5', cssProperty: 'z-index', cssValue: '-5' },
        { className: 'z-auto', cssProperty: 'z-index', cssValue: 'auto' }
      ]);
    });
  });

  describe('Complex combinations', () => {
    it('should handle multiple classes correctly', () => {
      const result = convertClassNamesToCSS('flex justify-between p-4 bg-white');
      expect(result).toEqual([
        { className: 'flex', cssProperty: 'display', cssValue: 'flex' },
        { className: 'justify-between', cssProperty: 'justify-content', cssValue: 'space-between' },
        { className: 'p-4', cssProperty: 'padding', cssValue: '16' },
        { className: 'bg-white', cssProperty: 'background-color', cssValue: 'white' }
      ]);
    });

    it('should handle empty string', () => {
      const result = convertClassNamesToCSS('');
      expect(result).toEqual([]);
    });

    it('should handle gradient with other utilities', () => {
      const result = convertClassNamesToCSS('p-4 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg');
      expect(result).toEqual([
        { className: 'p-4', cssProperty: 'padding', cssValue: '16' },
        { className: 'bg-linear-to-r', cssProperty: 'background-image', cssValue: 'linear-gradient(to right, var(--tw-gradient-stops))' },
        { className: 'from-blue-500', cssProperty: '--tw-gradient-from', cssValue: '#3b82f6' },
        { className: 'from-blue-500', cssProperty: '--tw-gradient-to', cssValue: 'rgb(59 130 246 / 0)' },
        { className: 'from-blue-500', cssProperty: '--tw-gradient-stops', cssValue: 'var(--tw-gradient-from), var(--tw-gradient-to)' },
        { className: 'to-purple-600', cssProperty: '--tw-gradient-to', cssValue: '#9333ea' },
        { className: 'text-white', cssProperty: 'color', cssValue: 'white' },
        { className: 'rounded-lg', cssProperty: 'border-radius', cssValue: '8px' }
      ]);
    });
  });
});

describe('convertClassNamesToCSSObject (Object Format - Legacy)', () => {
  describe('Layout classes', () => {
    it('should convert flex layout classes', () => {
      const result = convertClassNamesToCSSObject('flex justify-center items-center');
      expect(result).toEqual({
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      });
    });

    it('should convert grid layout classes', () => {
      const result = convertClassNamesToCSSObject('grid grid-cols-3 gap-4');
      expect(result).toEqual({
        'display': 'grid',
        'grid-template-columns': 'repeat(3, 1fr)',
        'gap': '16'
      });
    });
  });

  describe('Size classes', () => {
    it('should handle missing size parsers gracefully', () => {
      const result = convertClassNamesToCSSObject('w-4 h-8');
      expect(result).toEqual({
        'width': '4',
        'height': '8'
      });
    });

    it('should convert arbitrary size values when implemented', () => {
      const result = convertClassNamesToCSSObject('w-[400px] h-[50%]');
      // Only width parser seems to be working
      expect(result).toEqual({
        'width': '400px',
        'height': '50%'
      });
    });
  });

  describe('Spacing classes', () => {
    it('should convert padding classes', () => {
      const result = convertClassNamesToCSSObject('p-2 pt-4 px-6');
      expect(result).toEqual({
        'padding': '8',
        'padding-top': '16',
        'padding-inline': '24'
      });
    });

    it('should handle missing margin parsers', () => {
      const result = convertClassNamesToCSSObject('m-4 ml-2 my-8');
      // Margin parsers are not implemented yet
      expect(result).toEqual({});
    });
  });

  describe('Position classes', () => {
    it('should convert position classes', () => {
      const result = convertClassNamesToCSSObject('absolute top-4 left-2 right-0');
      expect(result).toEqual({
        'position': 'absolute',
        'top': '16px',
        'left': '8px',
        'right': '0px'
      });
    });

    it('should convert relative positioning', () => {
      const result = convertClassNamesToCSSObject('relative bottom-1');
      expect(result).toEqual({
        'position': 'relative',
        'bottom': '4px'
      });
    });
  });

  describe('Background classes', () => {
    it('should convert background color classes with raw values', () => {
      const result = convertClassNamesToCSSObject('bg-blue-500');
      expect(result).toEqual({
        'background-color': 'blue-500'
      });
    });

    it('should convert arbitrary background colors', () => {
      const result = convertClassNamesToCSSObject('bg-[#ff0000]');
      expect(result).toEqual({
        'background-color': '#ff0000'
      });
    });
  });

  describe('Border classes', () => {
    it('should convert border classes with raw values', () => {
      const result = convertClassNamesToCSSObject('border border-gray-300 rounded-lg');
      expect(result).toEqual({
        'border-width': '1',
        'border-color': 'gray-300',
        'border-radius': '8px'
      });
    });

    it('should handle individual border parsers', () => {
      const result = convertClassNamesToCSSObject('border-t-2 border-r border-b-0');
      expect(result).toEqual({
        'border-top-width': '2',
        'border-right-width': '1',
        'border-bottom-width': '0'
      });
    });
  });

  describe('Text classes', () => {
    it('should convert text classes with Figma values', () => {
      const result = convertClassNamesToCSSObject('text-white font-bold text-xl');
      expect(result).toEqual({
        'color': 'white',
        'font-weight': '700',
        'font-size': '20'
      });
    });

    it('should convert text alignment with Figma values', () => {
      const result = convertClassNamesToCSSObject('text-center underline');
      expect(result).toEqual({
        'text-align': 'center',
        'text-decoration': 'underline'
      });
    });
  });

  describe('Effects classes', () => {
    it('should convert opacity classes', () => {
      const result = convertClassNamesToCSSObject('opacity-75');
      expect(result).toEqual({
        'opacity': '0.75'
      });
    });

    it('should convert shadow classes with raw values', () => {
      const result = convertClassNamesToCSSObject('shadow-md');
      expect(result).toEqual({
        'box-shadow': 'shadow-md'
      });
    });

    it('should convert filter effects with CSS values', () => {
      const result = convertClassNamesToCSSObject('blur-sm');
      expect(result).toEqual({
        'filter': 'blur(4px)'
      });
    });
  });

  describe('Transform classes', () => {
    it('should convert rotation classes with Figma values', () => {
      const result = convertClassNamesToCSSObject('rotate-45');
      expect(result).toEqual({
        'transform': 'rotate(45deg)'
      });
    });
  });

  describe('Overflow classes', () => {
    it('should convert overflow classes', () => {
      const result = convertClassNamesToCSSObject('overflow-hidden');
      expect(result).toEqual({
        'overflow': 'hidden'
      });
    });

    it('should handle missing directional overflow parsers', () => {
      const result = convertClassNamesToCSSObject('overflow-x-auto overflow-y-scroll');
      // Directional overflow parsers are not implemented yet
      expect(result).toEqual({
        'overflow-x': 'auto',
        'overflow-y': 'scroll'
      });
    });
  });

  describe('Blend mode classes', () => {
    it('should convert blend mode classes with Figma values', () => {
      const result = convertClassNamesToCSSObject('mix-blend-multiply');
      expect(result).toEqual({
        'mix-blend-mode': 'multiply'
      });
    });
  });

  describe('Flexbox classes', () => {
    it('should convert flex direction classes', () => {
      const result = convertClassNamesToCSSObject('flex-col flex-wrap');
      expect(result).toEqual({
        'flex-direction': 'column',
        'flex-wrap': 'wrap'
      });
    });

    it('should convert flex grow and shrink classes', () => {
      const result = convertClassNamesToCSSObject('flex-grow flex-shrink-0');
      expect(result).toEqual({
        'flex-grow': '1',
        'flex-shrink': '0'
      });
    });

    it('should convert common flex values', () => {
      const result = convertClassNamesToCSSObject('flex-1 flex-auto flex-none');
      expect(result).toEqual({
        'flex': 'none' // Last one wins in object format
      });
    });
  });

  describe('Z-index classes', () => {
    it('should convert z-index classes', () => {
      const result = convertClassNamesToCSSObject('z-10 z-50');
      expect(result).toEqual({
        'z-index': '50' // Last one wins
      });
    });

    it('should convert negative z-index classes', () => {
      const result = convertClassNamesToCSSObject('-z-10 z-auto');
      expect(result).toEqual({
        'z-index': 'auto' // Last one wins
      });
    });
  });

  describe('Complex combinations', () => {
    it('should handle multiple classes correctly', () => {
      const result = convertClassNamesToCSSObject('flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm');
      expect(result).toEqual({
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        'padding': '16',
        'background-color': 'white',
        'border-width': '1',
        'border-radius': '8px',
        'box-shadow': 'shadow-sm'
      });
    });

    it('should handle empty string', () => {
      const result = convertClassNamesToCSSObject('');
      expect(result).toEqual({});
    });

    it('should handle unknown classes gracefully', () => {
      const result = convertClassNamesToCSSObject('unknown-class w-4');
      // w-4 is now parsed
      expect(result).toEqual({
        'width': '4'
      });
    });
  });
}); 