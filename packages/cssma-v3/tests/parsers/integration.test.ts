/**
 * Integration Tests for All Parsers
 * 
 * Tests that verify all parsers work together in the main CSSParser
 */

import { CSSParser } from '../../src/core/parser';
import { Config, DesignPreset } from '../../src/types';

describe('Parser Integration Tests', () => {
  let parser: CSSParser;
  
  beforeEach(() => {
    const config: Config = {
      prefix: '',
      separator: ':',
      important: false,
      enableArbitraryValues: true,
      enableStateModifiers: true,
      enableResponsiveModifiers: true
    };
    
    const preset: DesignPreset = {
      name: 'default',
      version: '1.0.0',
      colors: {
        blue: { 500: { r: 59, g: 130, b: 246 } },
        red: { 500: { r: 239, g: 68, b: 68 } },
        white: { r: 255, g: 255, b: 255 }
      },
      spacing: { 4: 16, 8: 32 },
      typography: {
        fontSize: { base: 16, lg: 18 },
        fontWeight: { normal: 400, bold: 700 },
        lineHeight: { normal: 1.5, tight: 1.25 },
        letterSpacing: { normal: 0, wide: 0.05 },
        fontFamily: { sans: 'Inter, sans-serif' }
      },
      effects: {
        borderRadius: { md: 6, lg: 8 },
        boxShadow: { md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
        opacity: { 50: 0.5, 75: 0.75 },
        blur: { sm: 4, md: 8 }
      },
      layout: {
        width: { full: '100%', screen: '100vw' },
        height: { full: '100%', screen: '100vh' },
        maxWidth: { lg: '1024px', xl: '1280px' },
        maxHeight: { screen: '100vh' },
        minWidth: { 0: '0px', full: '100%' },
        minHeight: { 0: '0px', full: '100%' }
      }
    };
    
    parser = new CSSParser(config, preset);
  });

  describe('FlexboxGrid Parser Integration', () => {
    it('should parse flexbox classes', () => {
      const result = parser.parse('flex flex-col justify-center items-center gap-4');
      
      expect(result.flexboxGrid).toBeDefined();
      expect(result.flexboxGrid?.display).toBe('flex');
      expect(result.flexboxGrid?.flexDirection).toBe('column');
      expect(result.flexboxGrid?.justifyContent).toBe('center');
      expect(result.flexboxGrid?.alignItems).toBe('center');
    });

    it('should parse grid classes', () => {
      const result = parser.parse('grid grid-cols-3 gap-2 col-span-2');
      
      expect(result.flexboxGrid).toBeDefined();
      expect(result.flexboxGrid?.display).toBe('grid');
      expect(result.flexboxGrid?.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');
      expect(result.flexboxGrid?.gridColumn).toBe('span 2 / span 2');
    });
  });

  describe('Filters Parser Integration', () => {
    it('should parse filter classes', () => {
      const result = parser.parse('blur-sm brightness-75 contrast-125');
      
      expect(result.filters).toBeDefined();
      expect(result.filters?.filter).toContain('blur(4px)');
      expect(result.filters?.filter).toContain('brightness(0.75)');
      expect(result.filters?.filter).toContain('contrast(1.25)');
    });

    it('should parse backdrop filter classes', () => {
      const result = parser.parse('backdrop-blur-md backdrop-opacity-50');
      
      expect(result.filters).toBeDefined();
      expect(result.filters?.backdropFilter).toContain('blur(12px)');
      expect(result.filters?.backdropFilter).toContain('opacity(0.5)');
    });
  });

  describe('Interactivity Parser Integration', () => {
    it('should parse cursor classes', () => {
      const result = parser.parse('cursor-pointer hover:cursor-not-allowed');
      
      expect(result.interactivity).toBeDefined();
      expect(result.interactivity?.cursor).toBe('pointer');
      
      expect(result.states).toBeDefined();
      expect(result.states?.hover?.interactivity?.cursor).toBe('not-allowed');
    });

    it('should parse scroll classes', () => {
      const result = parser.parse('scroll-smooth scroll-m-4 snap-x');
      
      expect(result.interactivity).toBeDefined();
      expect(result.interactivity?.scrollBehavior).toBe('smooth');
      expect(result.interactivity?.scrollMargin).toBe('1rem');
      expect(result.interactivity?.scrollSnapType).toBe('x var(--tw-scroll-snap-strictness)');
    });
  });

  describe('Tables Parser Integration', () => {
    it('should parse table classes', () => {
      const result = parser.parse('border-collapse table-fixed caption-top');
      
      expect(result.tables).toBeDefined();
      expect(result.tables?.borderCollapse).toBe('collapse');
      expect(result.tables?.tableLayout).toBe('fixed');
      expect(result.tables?.captionSide).toBe('top');
    });
  });

  describe('SVG Parser Integration', () => {
    it('should parse SVG classes', () => {
      const result = parser.parse('fill-blue-500 stroke-red-500 stroke-2');
      
      expect(result.svg).toBeDefined();
      expect(result.svg?.fill).toBe('#3b82f6');
      expect(result.svg?.stroke).toBe('#ef4444');
      expect(result.svg?.strokeWidth).toBe('2');
    });
  });

  describe('Mixed Classes Integration', () => {
    it('should parse mixed classes from all categories', () => {
      const result = parser.parse('flex justify-center p-4 bg-blue-500 text-white rounded-lg shadow-md blur-sm cursor-pointer border-collapse fill-red-500');
      
      // Flexbox
      expect(result.flexboxGrid?.display).toBe('flex');
      expect(result.flexboxGrid?.justifyContent).toBe('center');
      
      // Spacing
      expect(result.spacing?.padding).toEqual({ top: 16, right: 16, bottom: 16, left: 16 });
      
      // Colors (text colors are in colors, background colors are in backgrounds)
      expect(result.colors?.text).toEqual({ r: 255, g: 255, b: 255 });
      
      // Backgrounds
      expect(result.backgrounds?.backgroundColor).toBe('var(--color-blue-500)');
      
      // Effects
      expect(result.borders?.borderRadius).toBe('8px');
      expect(result.effects?.boxShadow).toContain('0 4px 6px -1px rgba(0, 0, 0, 0.1)');
      
      // Filters
      expect(result.filters?.filter).toContain('blur(4px)');
      
      // Interactivity
      expect(result.interactivity?.cursor).toBe('pointer');
      
      // Tables
      expect(result.tables?.borderCollapse).toBe('collapse');
      
      // SVG
      expect(result.svg?.fill).toBe('#ef4444');
    });
  });

  describe('Responsive and State Modifiers', () => {
    it('should handle responsive modifiers with new parsers', () => {
      const result = parser.parse('md:flex lg:grid hover:blur-md focus:cursor-wait');
      
      expect(result.breakpoints?.md?.flexboxGrid?.display).toBe('flex');
      expect(result.breakpoints?.lg?.flexboxGrid?.display).toBe('grid');
      expect(result.states?.hover?.filters?.filter).toContain('blur(12px)');
      expect(result.states?.focus?.interactivity?.cursor).toBe('wait');
    });
  });
});

describe('New Parsers Integration Tests', () => {
  let parser: CSSParser;

  beforeEach(() => {
    const config: Config = {
      prefix: '',
      separator: ':',
      important: false,
      enableArbitraryValues: true,
      enableStateModifiers: true,
      enableResponsiveModifiers: true
    };
    
    const preset: DesignPreset = {
      name: 'default',
      version: '1.0.0',
      colors: {
        blue: { 500: { r: 59, g: 130, b: 246 } },
        red: { 500: { r: 239, g: 68, b: 68 } },
        purple: { 400: { r: 196, g: 181, b: 253 }, 500: { r: 139, g: 92, b: 246 } },
        pink: { 400: { r: 244, g: 114, b: 182 } },
        gray: { 300: { r: 209, g: 213, b: 219 } },
        white: { r: 255, g: 255, b: 255 }
      },
      spacing: { 0: 0, 1: 4, 2: 8, 4: 16, 8: 32 },
      typography: {
        fontSize: { base: 16, lg: 18 },
        fontWeight: { normal: 400, bold: 700 },
        lineHeight: { normal: 1.5, tight: 1.25 },
        letterSpacing: { normal: 0, wide: 0.05 },
        fontFamily: { sans: 'Inter, sans-serif' }
      },
      effects: {
        borderRadius: { md: 6, lg: 8, xl: 12 },
        boxShadow: { md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
        opacity: { 50: 0.5, 75: 0.75 },
        blur: { sm: 4, md: 8 }
      },
      layout: {
        width: { full: '100%', screen: '100vw' },
        height: { full: '100%', screen: '100vh' },
        maxWidth: { lg: '1024px', xl: '1280px' },
        maxHeight: { screen: '100vh' },
        minWidth: { 0: '0px', full: '100%' },
        minHeight: { 0: '0px', full: '100%' }
      },
      screens: {
        md: '768px',
        lg: '1024px'
      }
    };
    
    parser = new CSSParser(config, preset);
  });

  describe('TransitionsParser Integration', () => {
    test('should parse transition utilities', () => {
      const result = parser.parse('transition-all duration-300 delay-150 ease-in-out');
      
      expect(result.transitions.transitionProperty).toBe('all');
      expect(result.transitions.transitionDuration).toBe('300ms');
      expect(result.transitions.transitionDelay).toBe('150ms');
      expect(result.transitions.transitionTimingFunction).toBe('cubic-bezier(0.4, 0, 0.2, 1)');
    });

    test('should handle arbitrary duration values', () => {
      const result = parser.parse('duration-[250ms] delay-[2s]');
      
      expect(result.transitions.transitionDuration).toBe('250ms');
      expect(result.transitions.transitionDelay).toBe('2s');
    });

    test('should work with state modifiers', () => {
      const result = parser.parse('hover:transition-colors hover:duration-200');
      
      expect(result.states?.hover?.transitions?.transitionProperty).toBe('color, background-color, border-color, text-decoration-color, fill, stroke');
      expect(result.states?.hover?.transitions?.transitionDuration).toBe('200ms');
    });
  });

  describe('BackgroundsParser Integration', () => {
    test('should parse background utilities', () => {
      const result = parser.parse('bg-red-500 bg-cover bg-center bg-no-repeat');
      
      expect(result.backgrounds.backgroundColor).toBe('var(--color-red-500)');
      expect(result.backgrounds.backgroundSize).toBe('cover');
      expect(result.backgrounds.backgroundPosition).toBe('center');
      expect(result.backgrounds.backgroundRepeat).toBe('no-repeat');
    });

    test('should parse gradient utilities', () => {
      const result = parser.parse('bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500');
      
      expect(result.backgrounds.backgroundImage).toBe('linear-gradient(to right, var(--tw-gradient-stops))');
      expect(result.backgrounds['--tw-gradient-from']).toBe('var(--color-blue-500)');
      expect(result.backgrounds['--tw-gradient-via']).toBe('var(--color-purple-500)');
      expect(result.backgrounds['--tw-gradient-to']).toBe('var(--color-pink-500)');
    });

    test('should handle arbitrary background colors', () => {
      const colorResult = parser.parse('bg-[#ff6b35]');
      const urlResult = parser.parse('bg-[url("image.jpg")]');
      
      expect(colorResult.backgrounds.backgroundColor).toBe('#ff6b35');
      expect(urlResult.backgrounds.backgroundImage).toBe('url("image.jpg")');
    });
  });

  describe('BordersParser Integration', () => {
    test('should parse border utilities', () => {
      const result = parser.parse('border-2 border-solid border-red-500 rounded-lg');
      
      expect(result.borders.borderWidth).toBe('2px');
      expect(result.borders.borderStyle).toBe('solid');
      expect(result.borders.borderColor).toBe('var(--color-red-500)');
      expect(result.borders.borderRadius).toBe('8px');
    });

    test('should parse directional borders', () => {
      const result = parser.parse('border-t-4 border-r-2 border-b border-l-0');
      
      expect(result.borders.borderTopWidth).toBe('4px');
      expect(result.borders.borderRightWidth).toBe('2px');
      expect(result.borders.borderBottomWidth).toBe('1px');
      expect(result.borders.borderLeftWidth).toBe('0px');
    });

    test('should parse ring utilities', () => {
      const result = parser.parse('ring-2 ring-blue-500 ring-offset-4');
      
      expect(result.borders.ringWidth).toBe('2px');
      expect(result.borders.ringColor).toBe('var(--color-blue-500)');
      expect(result.borders.ringOffsetWidth).toBe('4px');
    });

    test('should parse divide utilities', () => {
      const result = parser.parse('divide-y-2 divide-gray-300 divide-solid');
      
      expect(result.borders.divideYWidth).toBe('2px');
      expect(result.borders.divideColor).toBe('var(--color-gray-300)');
      expect(result.borders.divideStyle).toBe('solid');
    });
  });

  describe('OverflowParser Integration', () => {
    test('should parse overflow utilities', () => {
      const result = parser.parse('overflow-hidden overflow-x-auto overflow-y-scroll');
      
      expect(result.overflow.overflow).toBe('hidden');
      expect(result.overflow.overflowX).toBe('auto');
      expect(result.overflow.overflowY).toBe('scroll');
    });

    test('should parse text overflow utilities', () => {
      const result = parser.parse('truncate text-ellipsis whitespace-nowrap');
      
      expect(result.overflow.overflow).toBe('hidden');
      expect(result.overflow.textOverflow).toBe('ellipsis');
      expect(result.overflow.whiteSpace).toBe('nowrap');
    });

    test('should parse object utilities', () => {
      const result = parser.parse('object-cover object-center');
      
      expect(result.overflow.objectFit).toBe('cover');
      expect(result.overflow.objectPosition).toBe('center');
    });

    test('should parse word break utilities', () => {
      const result = parser.parse('break-words break-all hyphens-auto');
      
      expect(result.overflow.overflowWrap).toBe('break-word');
      expect(result.overflow.wordBreak).toBe('break-all');
      expect(result.overflow.hyphens).toBe('auto');
    });
  });

  describe('AccessibilityParser Integration', () => {
    test('should parse screen reader utilities', () => {
      const result = parser.parse('sr-only');
      
      expect(result.accessibility.position).toBe('absolute');
      expect(result.accessibility.width).toBe('1px');
      expect(result.accessibility.height).toBe('1px');
      expect(result.accessibility.overflow).toBe('hidden');
    });

    test('should parse forced color adjust utilities', () => {
      const result = parser.parse('forced-color-adjust-none');
      
      expect(result.accessibility.forcedColorAdjust).toBe('none');
    });

    test('should handle focus utilities', () => {
      const result = parser.parse('focus:outline-none focus:ring-2 focus:ring-blue-500');
      
      expect(result.states?.focus?.borders?.outlineStyle).toBe('none');
      expect(result.states?.focus?.borders?.ringWidth).toBe('2px');
      expect(result.states?.focus?.borders?.ringColor).toBe('var(--color-blue-500)');
    });
  });

  describe('Mixed Classes Integration', () => {
    test('should handle complex class combinations', () => {
      const result = parser.parse(`
        bg-gradient-to-r from-purple-400 to-pink-400
        border-2 border-white rounded-xl
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-purple-500
        overflow-hidden
        sr-only
      `.replace(/\s+/g, ' ').trim());
      
      // Background gradient
      expect(result.backgrounds.backgroundImage).toBe('linear-gradient(to right, var(--tw-gradient-stops))');
      expect(result.backgrounds['--tw-gradient-from']).toBe('var(--color-purple-400)');
      expect(result.backgrounds['--tw-gradient-to']).toBe('var(--color-pink-400)');
      
      // Borders
      expect(result.borders.borderWidth).toBe('2px');
      expect(result.borders.borderColor).toBe('#ffffff');
      expect(result.borders.borderRadius).toBe('12px');
      
      // Transitions
      expect(result.transitions.transitionProperty).toBe('all');
      expect(result.transitions.transitionDuration).toBe('300ms');
      expect(result.transitions.transitionTimingFunction).toBe('cubic-bezier(0.4, 0, 0.2, 1)');
      
      // Overflow
      expect(result.overflow.overflow).toBe('hidden');
      
      // Accessibility
      expect(result.accessibility.position).toBe('absolute');
      expect(result.accessibility.width).toBe('1px');
      
      // State modifiers
      expect(result.states?.hover?.transform?.scale).toBe(1.05);
      expect(result.states?.focus?.borders?.outlineStyle).toBe('none');
      expect(result.states?.focus?.borders?.ringWidth).toBe('2px');
    });

    test('should handle responsive design with new parsers', () => {
      const result = parser.parse('bg-red-500 md:bg-blue-500 lg:bg-green-500 transition-colors');
      
      expect(result.backgrounds.backgroundColor).toBe('var(--color-red-500)');
      expect(result.breakpoints?.md?.backgrounds?.backgroundColor).toBe('var(--color-blue-500)');
      expect(result.breakpoints?.lg?.backgrounds?.backgroundColor).toBe('var(--color-green-500)');
      expect(result.transitions.transitionProperty).toBe('color, background-color, border-color, text-decoration-color, fill, stroke');
    });
  });
}); 