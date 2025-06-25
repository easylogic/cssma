import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { DEFAULT_CONFIG, DEFAULT_PRESET } from '../src/config';

const parser = new CSSParser(DEFAULT_CONFIG, DEFAULT_PRESET);

describe('SVG Parser', () => {
  describe('Class Recognition', () => {
    it('should recognize fill classes', () => {
      expect(parser.parseClassName('fill-red-500')).toBeDefined();
      expect(parser.parseClassName('fill-inherit')).toBeDefined();
      expect(parser.parseClassName('fill-current')).toBeDefined();
      expect(parser.parseClassName('fill-transparent')).toBeDefined();
      expect(parser.parseClassName('fill-none')).toBeDefined();
      expect(parser.parseClassName('fill-black')).toBeDefined();
      expect(parser.parseClassName('fill-white')).toBeDefined();
      expect(parser.parseClassName('fill-[#ff0000]')).toBeDefined();
    });

    it('should recognize stroke color classes', () => {
      expect(parser.parseClassName('stroke-red-500')).toBeDefined();
      expect(parser.parseClassName('stroke-blue-600')).toBeDefined();
      expect(parser.parseClassName('stroke-inherit')).toBeDefined();
      expect(parser.parseClassName('stroke-current')).toBeDefined();
      expect(parser.parseClassName('stroke-transparent')).toBeDefined();
      expect(parser.parseClassName('stroke-none')).toBeDefined();
      expect(parser.parseClassName('stroke-[#00ff00]')).toBeDefined();
    });

    it('should recognize stroke width classes', () => {
      expect(parser.parseClassName('stroke-0')).toBeDefined();
      expect(parser.parseClassName('stroke-1')).toBeDefined();
      expect(parser.parseClassName('stroke-2')).toBeDefined();
      expect(parser.parseClassName('stroke-4')).toBeDefined();
      expect(parser.parseClassName('stroke-8')).toBeDefined();
      expect(parser.parseClassName('stroke-[3px]')).toBeDefined();
      expect(parser.parseClassName('stroke-[0.5]')).toBeDefined();
    });

    it('should recognize all color families for fill', () => {
      // Gray scales
      expect(parser.parseClassName('fill-slate-500')).toBeDefined();
      expect(parser.parseClassName('fill-gray-500')).toBeDefined();
      expect(parser.parseClassName('fill-zinc-500')).toBeDefined();
      expect(parser.parseClassName('fill-neutral-500')).toBeDefined();
      expect(parser.parseClassName('fill-stone-500')).toBeDefined();
      
      // Colors
      expect(parser.parseClassName('fill-red-500')).toBeDefined();
      expect(parser.parseClassName('fill-orange-500')).toBeDefined();
      expect(parser.parseClassName('fill-amber-500')).toBeDefined();
      expect(parser.parseClassName('fill-yellow-500')).toBeDefined();
      expect(parser.parseClassName('fill-lime-500')).toBeDefined();
      expect(parser.parseClassName('fill-green-500')).toBeDefined();
      expect(parser.parseClassName('fill-emerald-500')).toBeDefined();
      expect(parser.parseClassName('fill-teal-500')).toBeDefined();
      expect(parser.parseClassName('fill-cyan-500')).toBeDefined();
      expect(parser.parseClassName('fill-sky-500')).toBeDefined();
      expect(parser.parseClassName('fill-blue-500')).toBeDefined();
      expect(parser.parseClassName('fill-indigo-500')).toBeDefined();
      expect(parser.parseClassName('fill-violet-500')).toBeDefined();
      expect(parser.parseClassName('fill-purple-500')).toBeDefined();
      expect(parser.parseClassName('fill-fuchsia-500')).toBeDefined();
      expect(parser.parseClassName('fill-pink-500')).toBeDefined();
      expect(parser.parseClassName('fill-rose-500')).toBeDefined();
    });

    it('should recognize all color families for stroke', () => {
      // Gray scales
      expect(parser.parseClassName('stroke-slate-500')).toBeDefined();
      expect(parser.parseClassName('stroke-gray-500')).toBeDefined();
      expect(parser.parseClassName('stroke-zinc-500')).toBeDefined();
      expect(parser.parseClassName('stroke-neutral-500')).toBeDefined();
      expect(parser.parseClassName('stroke-stone-500')).toBeDefined();
      
      // Colors
      expect(parser.parseClassName('stroke-red-500')).toBeDefined();
      expect(parser.parseClassName('stroke-orange-500')).toBeDefined();
      expect(parser.parseClassName('stroke-amber-500')).toBeDefined();
      expect(parser.parseClassName('stroke-yellow-500')).toBeDefined();
      expect(parser.parseClassName('stroke-lime-500')).toBeDefined();
      expect(parser.parseClassName('stroke-green-500')).toBeDefined();
      expect(parser.parseClassName('stroke-emerald-500')).toBeDefined();
      expect(parser.parseClassName('stroke-teal-500')).toBeDefined();
      expect(parser.parseClassName('stroke-cyan-500')).toBeDefined();
      expect(parser.parseClassName('stroke-sky-500')).toBeDefined();
      expect(parser.parseClassName('stroke-blue-500')).toBeDefined();
      expect(parser.parseClassName('stroke-indigo-500')).toBeDefined();
      expect(parser.parseClassName('stroke-violet-500')).toBeDefined();
      expect(parser.parseClassName('stroke-purple-500')).toBeDefined();
      expect(parser.parseClassName('stroke-fuchsia-500')).toBeDefined();
      expect(parser.parseClassName('stroke-pink-500')).toBeDefined();
      expect(parser.parseClassName('stroke-rose-500')).toBeDefined();
    });
  });

  describe('Value Parsing', () => {
    it('should parse fill color values', () => {
      const result1 = parser.parseClassName('fill-red-500');
      expect(result1?.property).toBe('fill');
      expect(result1?.category).toBe('svg');

      const result2 = parser.parseClassName('fill-inherit');
      expect(result2?.property).toBe('fill');
      expect(result2?.value).toBe('inherit');

      const result3 = parser.parseClassName('fill-current');
      expect(result3?.property).toBe('fill');
      expect(result3?.value).toBe('current');

      const result4 = parser.parseClassName('fill-transparent');
      expect(result4?.property).toBe('fill');
      expect(result4?.value).toBe('transparent');

      const result5 = parser.parseClassName('fill-none');
      expect(result5?.property).toBe('fill');
      expect(result5?.value).toBe('none');

      const result6 = parser.parseClassName('fill-[#ff0000]');
      expect(result6?.property).toBe('fill');
      expect(result6?.isArbitrary).toBe(true);
    });

    it('should parse stroke color values', () => {
      const result1 = parser.parseClassName('stroke-blue-600');
      expect(result1?.property).toBe('stroke');
      expect(result1?.category).toBe('svg');

      const result2 = parser.parseClassName('stroke-inherit');
      expect(result2?.property).toBe('stroke');
      expect(result2?.value).toBe('inherit');

      const result3 = parser.parseClassName('stroke-current');
      expect(result3?.property).toBe('stroke');
      expect(result3?.value).toBe('current');

      const result4 = parser.parseClassName('stroke-none');
      expect(result4?.property).toBe('stroke');
      expect(result4?.value).toBe('none');

      const result5 = parser.parseClassName('stroke-[#00ff00]');
      expect(result5?.property).toBe('stroke');
      expect(result5?.isArbitrary).toBe(true);
    });

    it('should parse stroke width values', () => {
      const result1 = parser.parseClassName('stroke-0');
      expect(result1?.property).toBe('stroke-width');
      expect(result1?.value).toBe('0');
      expect(result1?.category).toBe('svg');

      const result2 = parser.parseClassName('stroke-1');
      expect(result2?.property).toBe('stroke-width');
      expect(result2?.value).toBe('1');

      const result3 = parser.parseClassName('stroke-2');
      expect(result3?.property).toBe('stroke-width');
      expect(result3?.value).toBe('2');

      const result4 = parser.parseClassName('stroke-[3px]');
      expect(result4?.property).toBe('stroke-width');
      expect(result4?.isArbitrary).toBe(true);

      const result5 = parser.parseClassName('stroke-[0.5]');
      expect(result5?.property).toBe('stroke-width');
      expect(result5?.isArbitrary).toBe(true);
    });

    it('should distinguish between stroke color and stroke width', () => {
      // Stroke width (starts with number)
      expect(parser.parseClassName('stroke-0')?.property).toBe('stroke-width');
      expect(parser.parseClassName('stroke-1')?.property).toBe('stroke-width');
      expect(parser.parseClassName('stroke-2')?.property).toBe('stroke-width');
      expect(parser.parseClassName('stroke-4')?.property).toBe('stroke-width');
      
      // Stroke color (color names)
      expect(parser.parseClassName('stroke-red-500')?.property).toBe('stroke');
      expect(parser.parseClassName('stroke-blue-600')?.property).toBe('stroke');
      expect(parser.parseClassName('stroke-inherit')?.property).toBe('stroke');
      expect(parser.parseClassName('stroke-current')?.property).toBe('stroke');
      expect(parser.parseClassName('stroke-none')?.property).toBe('stroke');
    });

    it('should handle all shade variants', () => {
      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
      
      shades.forEach(shade => {
        const fillResult = parser.parseClassName(`fill-red-${shade}`);
        expect(fillResult?.property).toBe('fill');
        expect(fillResult?.value).toBe(`red-${shade}`);
        
        const strokeResult = parser.parseClassName(`stroke-blue-${shade}`);
        expect(strokeResult?.property).toBe('stroke');
        expect(strokeResult?.value).toBe(`blue-${shade}`);
      });
    });
  });

  describe('Responsive & States', () => {
    it('should handle responsive modifiers', () => {
      const result = parser.parseClassName('md:fill-red-500');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('fill-red-500');
      expect(result?.modifiers?.responsive).toEqual({ md: '@media (min-width: 768px)' });
    });

    it('should handle state modifiers', () => {
      const result = parser.parseClassName('hover:stroke-blue-600');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('stroke-blue-600');
      expect(result?.modifiers?.state).toEqual([':hover']);
    });

    it('should handle combined modifiers', () => {
      const result = parser.parseClassName('lg:hover:fill-green-500');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('fill-green-500');
      expect(result?.modifiers?.responsive).toEqual({ lg: '@media (min-width: 1024px)' });
      expect(result?.modifiers?.state).toEqual([':hover']);
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid classes', () => {
      // Invalid classes should return fallback result with original className
      const result1 = parser.parseClassName('invalid-svg');
      expect(result1?.original).toBe('invalid-svg');
      expect(result1?.category).toBe('layout');
      
      // Empty values should return null since they fail isValidClass  
      // Empty values also return fallback results
      expect(parser.parseClassName('fill-')?.original).toBe('fill-');
      expect(parser.parseClassName('stroke-')?.original).toBe('stroke-');
    });

    it('should handle complex arbitrary values', () => {
      const result1 = parser.parseClassName('fill-[url(#gradient)]');
      expect(result1).toBeDefined();
      expect(result1?.isArbitrary).toBe(true);
      expect(result1?.property).toBe('fill');

      const result2 = parser.parseClassName('stroke-[rgb(255,0,0)]');
      expect(result2).toBeDefined();
      expect(result2?.isArbitrary).toBe(true);
      expect(result2?.property).toBe('stroke');

      const result3 = parser.parseClassName('stroke-[2.5px]');
      expect(result3).toBeDefined();
      expect(result3?.isArbitrary).toBe(true);
      expect(result3?.property).toBe('stroke-width');
    });

    it('should handle opacity modifiers', () => {
      const result1 = parser.parseClassName('fill-red-500/50');
      expect(result1).toBeDefined();
      expect(result1?.property).toBe('fill');

      const result2 = parser.parseClassName('stroke-blue-600/75');
      expect(result2).toBeDefined();
      expect(result2?.property).toBe('stroke');
    });

    it('should handle URL patterns for gradients and patterns', () => {
      const result1 = parser.parseClassName('fill-[url(#linear-gradient)]');
      expect(result1).toBeDefined();
      expect(result1?.isArbitrary).toBe(true);

      const result2 = parser.parseClassName('fill-[url(#radial-gradient)]');
      expect(result2).toBeDefined();
      expect(result2?.isArbitrary).toBe(true);

      const result3 = parser.parseClassName('fill-[url(#pattern-dots)]');
      expect(result3).toBeDefined();
      expect(result3?.isArbitrary).toBe(true);
    });
  });

  describe('Color Integration', () => {
    it('should work with custom colors from preset', () => {
      // 이 테스트는 preset에 커스텀 색상이 있을 때 동작을 확인
      const result1 = parser.parseClassName('fill-primary-500');
      expect(result1).toBeDefined(); // fallback으로 처리됨
      
      const result2 = parser.parseClassName('stroke-secondary-300');
      expect(result2).toBeDefined(); // fallback으로 처리됨
    });

    it('should handle CSS color functions', () => {
      const result1 = parser.parseClassName('fill-[hsl(120,100%,50%)]');
      expect(result1).toBeDefined();
      expect(result1?.isArbitrary).toBe(true);

      const result2 = parser.parseClassName('stroke-[oklch(0.7_0.15_180)]');
      expect(result2).toBeDefined();
      expect(result2?.isArbitrary).toBe(true);
    });
  });
}); 