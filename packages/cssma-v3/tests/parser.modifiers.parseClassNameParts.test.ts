import { describe, test, expect } from 'vitest';
import { ModifierParser } from '../src/core/parsers/modifiers';

describe('ModifierParser.parseClassNameParts', () => {
  describe('Basic functionality', () => {
    test('should parse simple class name without modifiers', () => {
      const result = ModifierParser.parseClassNameParts('text-red-500');
      expect(result).toEqual({
        modifierParts: [],
        baseClassName: 'text-red-500',
        isArbitrary: false
      });
    });

    test('should parse class name with single modifier', () => {
      const result = ModifierParser.parseClassNameParts('hover:text-red-500');
      expect(result).toEqual({
        modifierParts: ['hover'],
        baseClassName: 'text-red-500',
        isArbitrary: false
      });
    });

    test('should parse class name with multiple modifiers', () => {
      const result = ModifierParser.parseClassNameParts('md:hover:focus:text-red-500');
      expect(result).toEqual({
        modifierParts: ['md', 'hover', 'focus'],
        baseClassName: 'text-red-500',
        isArbitrary: false
      });
    });
  });

  describe('Arbitrary values with colons', () => {
    test('should handle arbitrary value with colon as base class', () => {
      const result = ModifierParser.parseClassNameParts('[mask-type:luminance]');
      expect(result).toEqual({
        modifierParts: [],
        baseClassName: '[mask-type:luminance]',
        isArbitrary: true
      });
    });

    test('should handle arbitrary value with complex content', () => {
      const result = ModifierParser.parseClassNameParts('[background-image:url(data:image/svg+xml;base64,abc)]');
      expect(result).toEqual({
        modifierParts: [],
        baseClassName: '[background-image:url(data:image/svg+xml;base64,abc)]',
        isArbitrary: true
      });
    });

    test('should handle modifier with arbitrary value containing colon', () => {
      const result = ModifierParser.parseClassNameParts('hover:[mask-type:luminance]');
      expect(result).toEqual({
        modifierParts: ['hover'],
        baseClassName: '[mask-type:luminance]',
        isArbitrary: true
      });
    });

    test('should handle multiple modifiers with arbitrary value containing colon', () => {
      const result = ModifierParser.parseClassNameParts('md:hover:[background-image:url(data:image/svg+xml;base64,abc)]');
      expect(result).toEqual({
        modifierParts: ['md', 'hover'],
        baseClassName: '[background-image:url(data:image/svg+xml;base64,abc)]',
        isArbitrary: true
      });
    });

    test('should handle nested brackets in arbitrary values', () => {
      const result = ModifierParser.parseClassNameParts('[background:linear-gradient(to_right,theme(colors.red[500]),theme(colors.blue[600]))]');
      expect(result).toEqual({
        modifierParts: [],
        baseClassName: '[background:linear-gradient(to_right,theme(colors.red[500]),theme(colors.blue[600]))]',
        isArbitrary: true
      });
    });
  });

  describe('Edge cases', () => {
    test('should handle empty string', () => {
      const result = ModifierParser.parseClassNameParts('');
      expect(result).toEqual({
        modifierParts: [],
        baseClassName: '',
        isArbitrary: false
      });
    });

    test('should handle single colon', () => {
      const result = ModifierParser.parseClassNameParts(':');
      expect(result).toEqual({
        modifierParts: [''],
        baseClassName: '',
        isArbitrary: false
      });
    });

    test('should handle class ending with colon', () => {
      const result = ModifierParser.parseClassNameParts('hover:');
      expect(result).toEqual({
        modifierParts: ['hover'],
        baseClassName: '',
        isArbitrary: false
      });
    });

    test('should handle unmatched brackets', () => {
      const result = ModifierParser.parseClassNameParts('hover:[background-color:red');
      expect(result).toEqual({
        modifierParts: ['hover'],
        baseClassName: '[background-color:red',
        isArbitrary: false
      });
    });

    test('should handle complex real-world example', () => {
      const result = ModifierParser.parseClassNameParts('dark:md:hover:[background-image:linear-gradient(135deg,rgba(255,255,255,0.1)_0%,transparent_50%)]');
      expect(result).toEqual({
        modifierParts: ['dark', 'md', 'hover'],
        baseClassName: '[background-image:linear-gradient(135deg,rgba(255,255,255,0.1)_0%,transparent_50%)]',
        isArbitrary: true
      });
    });
  });

  describe('Arbitrary attribute selectors', () => {
    test('should handle arbitrary attribute selector as modifier', () => {
      const result = ModifierParser.parseClassNameParts('[data-state=open]:bg-blue-500');
      expect(result).toEqual({
        modifierParts: ['[data-state=open]'],
        baseClassName: 'bg-blue-500',
        isArbitrary: false
      });
    });

    test('should handle complex arbitrary selector with multiple colons', () => {
      const result = ModifierParser.parseClassNameParts('[data-theme=dark]:hover:[background:linear-gradient(to_right,#ff0000,#00ff00)]');
      expect(result).toEqual({
        modifierParts: ['[data-theme=dark]', 'hover'],
        baseClassName: '[background:linear-gradient(to_right,#ff0000,#00ff00)]',
        isArbitrary: true
      });
    });
  });

  describe('Advanced real-world scenarios', () => {
    test('should handle CSS custom properties with colons', () => {
      const result = ModifierParser.parseClassNameParts('dark:lg:[--custom-color:hsl(200,50%,60%)]');
      expect(result).toEqual({
        modifierParts: ['dark', 'lg'],
        baseClassName: '[--custom-color:hsl(200,50%,60%)]',
        isArbitrary: true
      });
    });

    test('should handle multiple arbitrary selectors in sequence', () => {
      const result = ModifierParser.parseClassNameParts('[dir=rtl]:[lang=ar]:[data-theme=dark]:text-right');
      expect(result).toEqual({
        modifierParts: ['[dir=rtl]', '[lang=ar]', '[data-theme=dark]'],
        baseClassName: 'text-right',
        isArbitrary: false
      });
    });

    test('should handle complex CSS functions with nested colons', () => {
      const result = ModifierParser.parseClassNameParts('hover:[background-image:radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]');
      expect(result).toEqual({
        modifierParts: ['hover'],
        baseClassName: '[background-image:radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]',
        isArbitrary: true
      });
    });

    test('should handle pseudo-class selectors with parameters', () => {
      const result = ModifierParser.parseClassNameParts('[&:nth-child(3n+1)]:bg-red-500');
      expect(result).toEqual({
        modifierParts: ['[&:nth-child(3n+1)]'],
        baseClassName: 'bg-red-500',
        isArbitrary: false
      });
    });

    test('should handle URL data with base64 and special characters', () => {
      const result = ModifierParser.parseClassNameParts('before:[content:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E)]');
      expect(result).toEqual({
        modifierParts: ['before'],
        baseClassName: '[content:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E)]',
        isArbitrary: true
      });
    });

    test('should handle calc expressions with complex math', () => {
      const result = ModifierParser.parseClassNameParts('md:[width:calc(100vw-theme(spacing.8)*2)]');
      expect(result).toEqual({
        modifierParts: ['md'],
        baseClassName: '[width:calc(100vw-theme(spacing.8)*2)]',
        isArbitrary: true
      });
    });

    test('should handle CSS Grid with complex track definitions', () => {
      const result = ModifierParser.parseClassNameParts('lg:[grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr))]');
      expect(result).toEqual({
        modifierParts: ['lg'],
        baseClassName: '[grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr))]',
        isArbitrary: true
      });
    });

    test('should handle box-shadow with multiple shadows', () => {
      const result = ModifierParser.parseClassNameParts('focus:[box-shadow:0_0_0_3px_rgba(59,130,246,0.5),0_1px_3px_0_rgba(0,0,0,0.1)]');
      expect(result).toEqual({
        modifierParts: ['focus'],
        baseClassName: '[box-shadow:0_0_0_3px_rgba(59,130,246,0.5),0_1px_3px_0_rgba(0,0,0,0.1)]',
        isArbitrary: true
      });
    });

    test('should handle transform with multiple functions', () => {
      const result = ModifierParser.parseClassNameParts('hover:[transform:translateX(50%)_rotate(45deg)_scale(1.1)]');
      expect(result).toEqual({
        modifierParts: ['hover'],
        baseClassName: '[transform:translateX(50%)_rotate(45deg)_scale(1.1)]',
        isArbitrary: true
      });
    });

    test('should handle animation keyframes with percentages', () => {
      const result = ModifierParser.parseClassNameParts('[animation:spin_1s_linear_infinite]');
      expect(result).toEqual({
        modifierParts: [],
        baseClassName: '[animation:spin_1s_linear_infinite]',
        isArbitrary: true
      });
    });
  });

  describe('Container query and media query edge cases', () => {
    test('should handle container query with complex conditions', () => {
      const result = ModifierParser.parseClassNameParts('@container/sidebar_(min-width:250px):block');
      expect(result).toEqual({
        modifierParts: ['@container/sidebar_(min-width', '250px)'],
        baseClassName: 'block',
        isArbitrary: false
      });
    });

    test('should handle arbitrary container query', () => {
      const result = ModifierParser.parseClassNameParts('[@container(min-width:400px)]:grid');
      expect(result).toEqual({
        modifierParts: ['[@container(min-width:400px)]'],
        baseClassName: 'grid',
        isArbitrary: false
      });
    });

    test('should handle complex media query conditions', () => {
      const result = ModifierParser.parseClassNameParts('[@media(min-width:640px)_and_(max-width:1024px)]:hidden');
      expect(result).toEqual({
        modifierParts: ['[@media(min-width:640px)_and_(max-width:1024px)]'],
        baseClassName: 'hidden',
        isArbitrary: false
      });
    });
  });

  describe('Extremely complex nested structures', () => {
    test('should handle deeply nested CSS functions', () => {
      const result = ModifierParser.parseClassNameParts('dark:lg:[background:conic-gradient(from_180deg_at_50%_50%,rgba(var(--primary-rgb),0.8)_0deg,transparent_60deg,rgba(var(--secondary-rgb),0.6)_120deg)]');
      expect(result).toEqual({
        modifierParts: ['dark', 'lg'],
        baseClassName: '[background:conic-gradient(from_180deg_at_50%_50%,rgba(var(--primary-rgb),0.8)_0deg,transparent_60deg,rgba(var(--secondary-rgb),0.6)_120deg)]',
        isArbitrary: true
      });
    });

    test('should handle CSS with theme() functions and complex nesting', () => {
      const result = ModifierParser.parseClassNameParts('hover:focus:[filter:drop-shadow(0_4px_6px_theme(colors.slate.500/25%))_contrast(1.1)]');
      expect(result).toEqual({
        modifierParts: ['hover', 'focus'],
        baseClassName: '[filter:drop-shadow(0_4px_6px_theme(colors.slate.500/25%))_contrast(1.1)]',
        isArbitrary: true
      });
    });

    test('should handle extreme edge case with multiple bracket types', () => {
      const result = ModifierParser.parseClassNameParts('md:[background-image:url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\'><rect width=\'100%\' height=\'100%\' fill=\'%23f3f4f6\'/></svg>")]');
      expect(result).toEqual({
        modifierParts: ['md'],
        baseClassName: '[background-image:url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\'><rect width=\'100%\' height=\'100%\' fill=\'%23f3f4f6\'/></svg>")]',
        isArbitrary: true
      });
    });

    test('should handle CSS-in-JS style object syntax', () => {
      const result = ModifierParser.parseClassNameParts('[&>*]:[margin-top:theme(spacing.4)]');
      expect(result).toEqual({
        modifierParts: ['[&>*]'],
        baseClassName: '[margin-top:theme(spacing.4)]',
        isArbitrary: true
      });
    });

    test('should handle selector with descendant combinator', () => {
      const result = ModifierParser.parseClassNameParts('[&_img]:opacity-75');
      expect(result).toEqual({
        modifierParts: ['[&_img]'],
        baseClassName: 'opacity-75',
        isArbitrary: false
      });
    });
  });

  describe('Performance stress tests', () => {
    test('should handle very long class names efficiently', () => {
      const longClassName = 'dark:lg:hover:focus:active:disabled:first-child:last-child:nth-child-odd:group-hover:peer-focus:[background:linear-gradient(135deg,rgba(var(--tw-gradient-stops)),theme(colors.blue.500/75%),theme(colors.purple.600/50%),transparent)]';
      const result = ModifierParser.parseClassNameParts(longClassName);
      expect(result.modifierParts).toHaveLength(11);
      expect(result.baseClassName).toBe('[background:linear-gradient(135deg,rgba(var(--tw-gradient-stops)),theme(colors.blue.500/75%),theme(colors.purple.600/50%),transparent)]');
      expect(result.isArbitrary).toBe(true);
    });

    test('should handle multiple consecutive colons', () => {
      const result = ModifierParser.parseClassNameParts('hover::before:[content:"::"]');
      expect(result).toEqual({
        modifierParts: ['hover', '', 'before'],
        baseClassName: '[content:"::"]',
        isArbitrary: true
      });
    });

    test('should handle malformed but recoverable input', () => {
      const result = ModifierParser.parseClassNameParts('dark:[color:]:hover:bg-red-500');
      expect(result).toEqual({
        modifierParts: ['dark', '[color:]', 'hover'],
        baseClassName: 'bg-red-500',
        isArbitrary: false
      });
    });
  });

  describe('Tailwind CSS v4.1 new features', () => {
    test('should handle text shadow utilities', () => {
      const result = ModifierParser.parseClassNameParts('hover:text-shadow-lg');
      expect(result).toEqual({
        modifierParts: ['hover'],
        baseClassName: 'text-shadow-lg',
        isArbitrary: false
      });
    });

    test('should handle colored text shadows', () => {
      const result = ModifierParser.parseClassNameParts('focus:text-shadow-md/50');
      expect(result).toEqual({
        modifierParts: ['focus'],
        baseClassName: 'text-shadow-md/50',
        isArbitrary: false
      });
    });

    test('should handle colored drop shadows', () => {
      const result = ModifierParser.parseClassNameParts('hover:drop-shadow-xl:drop-shadow-blue-500/50');
      expect(result).toEqual({
        modifierParts: ['hover', 'drop-shadow-xl'],
        baseClassName: 'drop-shadow-blue-500/50',
        isArbitrary: false
      });
    });

    test('should handle mask utilities with complex gradients', () => {
      const result = ModifierParser.parseClassNameParts('lg:mask-t-from-50%');
      expect(result).toEqual({
        modifierParts: ['lg'],
        baseClassName: 'mask-t-from-50%',
        isArbitrary: false
      });
    });

    test('should handle radial mask utilities', () => {
      const result = ModifierParser.parseClassNameParts('md:mask-radial-at-center');
      expect(result).toEqual({
        modifierParts: ['md'],
        baseClassName: 'mask-radial-at-center',
        isArbitrary: false
      });
    });

    test('should handle pointer variants for touch vs mouse', () => {
      const result = ModifierParser.parseClassNameParts('pointer-coarse:px-6:pointer-fine:px-3');
      expect(result).toEqual({
        modifierParts: ['pointer-coarse', 'px-6', 'pointer-fine'],
        baseClassName: 'px-3',
        isArbitrary: false
      });
    });

    test('should handle any-pointer variants', () => {
      const result = ModifierParser.parseClassNameParts('any-pointer-fine:hover:scale-105');
      expect(result).toEqual({
        modifierParts: ['any-pointer-fine', 'hover'],
        baseClassName: 'scale-105',
        isArbitrary: false
      });
    });

    test('should handle safe alignment utilities', () => {
      const result = ModifierParser.parseClassNameParts('md:justify-center-safe');
      expect(result).toEqual({
        modifierParts: ['md'],
        baseClassName: 'justify-center-safe',
        isArbitrary: false
      });
    });

    test('should handle baseline-last alignment', () => {
      const result = ModifierParser.parseClassNameParts('flex:items-baseline-last');
      expect(result).toEqual({
        modifierParts: ['flex'],
        baseClassName: 'items-baseline-last',
        isArbitrary: false
      });
    });

    test('should handle text wrapping utilities', () => {
      const result = ModifierParser.parseClassNameParts('lg:wrap-break-word');
      expect(result).toEqual({
        modifierParts: ['lg'],
        baseClassName: 'wrap-break-word',
        isArbitrary: false
      });
    });

    test('should handle wrap-anywhere utility', () => {
      const result = ModifierParser.parseClassNameParts('sm:wrap-anywhere');
      expect(result).toEqual({
        modifierParts: ['sm'],
        baseClassName: 'wrap-anywhere',
        isArbitrary: false
      });
    });

    test('should handle new v4.1 variants - noscript', () => {
      const result = ModifierParser.parseClassNameParts('noscript:block');
      expect(result).toEqual({
        modifierParts: ['noscript'],
        baseClassName: 'block',
        isArbitrary: false
      });
    });

    test('should handle user-valid and user-invalid variants', () => {
      const result = ModifierParser.parseClassNameParts('user-invalid:border-red-500:user-valid:border-green-500');
      expect(result).toEqual({
        modifierParts: ['user-invalid', 'border-red-500', 'user-valid'],
        baseClassName: 'border-green-500',
        isArbitrary: false
      });
    });

    test('should handle inverted-colors variant', () => {
      const result = ModifierParser.parseClassNameParts('inverted-colors:shadow-none');
      expect(result).toEqual({
        modifierParts: ['inverted-colors'],
        baseClassName: 'shadow-none',
        isArbitrary: false
      });
    });

    test('should handle details-content variant', () => {
      const result = ModifierParser.parseClassNameParts('details-content:pt-2');
      expect(result).toEqual({
        modifierParts: ['details-content'],
        baseClassName: 'pt-2',
        isArbitrary: false
      });
    });

    test('should handle 3D transform utilities from v4.0+', () => {
      const result = ModifierParser.parseClassNameParts('hover:rotate-x-45:perspective-distant');
      expect(result).toEqual({
        modifierParts: ['hover', 'rotate-x-45'],
        baseClassName: 'perspective-distant',
        isArbitrary: false
      });
    });

    test('should handle starting-style variant from v4.0+', () => {
      const result = ModifierParser.parseClassNameParts('starting:opacity-0:transition-opacity');
      expect(result).toEqual({
        modifierParts: ['starting', 'opacity-0'],
        baseClassName: 'transition-opacity',
        isArbitrary: false
      });
    });

    test('should handle not-* variants from v4.0+', () => {
      const result = ModifierParser.parseClassNameParts('not-hover:opacity-75');
      expect(result).toEqual({
        modifierParts: ['not-hover'],
        baseClassName: 'opacity-75',
        isArbitrary: false
      });
    });

    test('should handle color-scheme utilities', () => {
      const result = ModifierParser.parseClassNameParts('dark:color-scheme-dark');
      expect(result).toEqual({
        modifierParts: ['dark'],
        baseClassName: 'color-scheme-dark',
        isArbitrary: false
      });
    });

    test('should handle field-sizing utilities', () => {
      const result = ModifierParser.parseClassNameParts('focus:field-sizing-content');
      expect(result).toEqual({
        modifierParts: ['focus'],
        baseClassName: 'field-sizing-content',
        isArbitrary: false
      });
    });

    test('should handle inset-shadow utilities (v4.1)', () => {
      const result = ModifierParser.parseClassNameParts('hover:inset-shadow-lg:inset-ring-2');
      expect(result).toEqual({
        modifierParts: ['hover', 'inset-shadow-lg'],
        baseClassName: 'inset-ring-2',
        isArbitrary: false
      });
    });
  });

  describe('Tailwind CSS v4+ gradient improvements', () => {
    test('should handle linear gradient angles', () => {
      const result = ModifierParser.parseClassNameParts('bg-linear-45:from-indigo-500:to-pink-500');
      expect(result).toEqual({
        modifierParts: ['bg-linear-45', 'from-indigo-500'],
        baseClassName: 'to-pink-500',
        isArbitrary: false
      });
    });

    test('should handle gradient interpolation modifiers', () => {
      const result = ModifierParser.parseClassNameParts('bg-linear-to-r/oklch:from-red-500:to-blue-500');
      expect(result).toEqual({
        modifierParts: ['bg-linear-to-r/oklch', 'from-red-500'],
        baseClassName: 'to-blue-500',
        isArbitrary: false
      });
    });

    test('should handle conic gradients', () => {
      const result = ModifierParser.parseClassNameParts('bg-conic/[in_hsl_longer_hue]:from-red-600:to-red-600');
      expect(result).toEqual({
        modifierParts: ['bg-conic/[in_hsl_longer_hue]', 'from-red-600'],
        baseClassName: 'to-red-600',
        isArbitrary: false
      });
    });

    test('should handle radial gradients with positioning', () => {
      const result = ModifierParser.parseClassNameParts('bg-radial-[at_25%_25%]:from-white:to-zinc-900');
      expect(result).toEqual({
        modifierParts: ['bg-radial-[at_25%_25%]', 'from-white'],
        baseClassName: 'to-zinc-900',
        isArbitrary: false
      });
    });
  });

  describe('Modern CSS features and OKLCH colors', () => {
    test('should handle OKLCH color arbitrary values', () => {
      const result = ModifierParser.parseClassNameParts('[color:oklch(0.84_0.18_117.33)]');
      expect(result).toEqual({
        modifierParts: [],
        baseClassName: '[color:oklch(0.84_0.18_117.33)]',
        isArbitrary: true
      });
    });

    test('should handle P3 color space values', () => {
      const result = ModifierParser.parseClassNameParts('hover:[color:color(display-p3_0.2_0.4_0.8)]');
      expect(result).toEqual({
        modifierParts: ['hover'],
        baseClassName: '[color:color(display-p3_0.2_0.4_0.8)]',
        isArbitrary: true
      });
    });

    test('should handle color-mix() functions', () => {
      const result = ModifierParser.parseClassNameParts('[background:color-mix(in_oklch,_theme(colors.blue.500)_50%,_transparent)]');
      expect(result).toEqual({
        modifierParts: [],
        baseClassName: '[background:color-mix(in_oklch,_theme(colors.blue.500)_50%,_transparent)]',
        isArbitrary: true
      });
    });

    test('should handle CSS cascade layers in arbitrary values', () => {
      const result = ModifierParser.parseClassNameParts('[layer:utilities;_color:red]');
      expect(result).toEqual({
        modifierParts: [],
        baseClassName: '[layer:utilities;_color:red]',
        isArbitrary: true
      });
    });

    test('should handle registered custom properties', () => {
      const result = ModifierParser.parseClassNameParts('[--my-color:oklch(0.7_0.15_200)]');
      expect(result).toEqual({
        modifierParts: [],
        baseClassName: '[--my-color:oklch(0.7_0.15_200)]',
        isArbitrary: true
      });
    });
  });
}); 