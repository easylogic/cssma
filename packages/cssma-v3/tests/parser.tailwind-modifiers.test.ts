/**
 * Tailwind CSS Modifier System Test Suite
 * Tests the new unified modifier chain parsing approach
 */

import { ModifierParser } from '../src/core/parsers/modifiers';

describe('Tailwind CSS Modifier System', () => {
  describe('단일 Modifier 파싱', () => {
    test('Responsive breakpoint', () => {
      const result = ModifierParser.parseModifierChain('md:bg-blue-500');
      
      expect(result).toEqual({
        modifierChain: 'md',
        modifiers: {
          responsive: 'md',
          state: [],
          selector: {
            mediaQueries: ['@media (min-width: 768px)'],
            pseudoClasses: [],
            pseudoElements: [],
            attributes: []
          }
        }
      });
    });

    test('State pseudo-class', () => {
      const result = ModifierParser.parseModifierChain('hover:text-red-500');
      
      expect(result).toEqual({
        modifierChain: 'hover',
        modifiers: {
          state: ['hover'],
          selector: {
            mediaQueries: [],
            pseudoClasses: [':hover'],
            pseudoElements: [],
            attributes: []
          }
        }
      });
    });

    test('Pseudo-element', () => {
      const result = ModifierParser.parseModifierChain('before:content-[""]');
      
      expect(result).toEqual({
        modifierChain: 'before',
        modifiers: {
          pseudoElement: 'before',
          state: [],
          selector: {
            mediaQueries: [],
            pseudoClasses: [],
            pseudoElements: ['::before'],
            attributes: []
          }
        }
      });
    });
  });

  describe('복합 Modifier 체인 파싱', () => {
    test('md:hover:before - 복합 modifier', () => {
      const result = ModifierParser.parseModifierChain('md:hover:before:bg-blue-500');
      
      expect(result).toEqual({
        modifierChain: 'md:hover:before',
        modifiers: {
          responsive: 'md',
          state: ['hover'],
          pseudoElement: 'before',
          selector: {
            mediaQueries: ['@media (min-width: 768px)'],
            pseudoClasses: [':hover'],
            pseudoElements: ['::before'],
            attributes: []
          }
        }
      });
    });

    test('lg:motion-safe:focus:after - 전체 복합', () => {
      const result = ModifierParser.parseModifierChain('lg:motion-safe:focus:after:text-green-500');
      
      expect(result).toEqual({
        modifierChain: 'lg:motion-safe:focus:after',
        modifiers: {
          responsive: 'lg',
          motion: 'motion-safe', 
          state: ['focus'],
          pseudoElement: 'after',
          selector: {
            mediaQueries: [
              '@media (min-width: 1024px)',
              '@media (prefers-reduced-motion: no-preference)'
            ],
            pseudoClasses: [':focus'],
            pseudoElements: ['::after'],
            attributes: []
          }
        }
      });
    });

    test('data-active:aria-checked:hover - 속성 기반 modifier', () => {
      const result = ModifierParser.parseModifierChain('data-active:aria-checked:hover:border-2');
      
      expect(result).toEqual({
        modifierChain: 'data-active:aria-checked:hover',
        modifiers: {
          data: 'data-active',
          aria: 'aria-checked',
          state: ['hover'],
          selector: {
            mediaQueries: [],
            pseudoClasses: [':hover'],
            pseudoElements: [],
            attributes: ['[data-active]', '[aria-checked="true"]']
          }
        }
      });
    });
  });

  describe('임의값 Modifier 파싱', () => {
    test('min-[768px] - 임의 breakpoint', () => {
      const result = ModifierParser.parseModifierChain('min-[768px]:text-xl');
      
      expect(result).toEqual({
        modifierChain: 'min-[768px]',
        modifiers: {
          responsive: 'min-[768px]',
          state: [],
          selector: {
            mediaQueries: ['@media (min-width: 768px)'],
            pseudoClasses: [],
            pseudoElements: [],
            attributes: []
          }
        }
      });
    });

    test('aria-[label] - 임의 ARIA 속성', () => {
      const result = ModifierParser.parseModifierChain('aria-[label]:p-4');
      
      expect(result).toEqual({
        modifierChain: 'aria-[label]',
        modifiers: {
          aria: 'aria-[label]',
          state: [],
          selector: {
            mediaQueries: [],
            pseudoClasses: [],
            pseudoElements: [],
            attributes: ['[aria-label]']
          }
        }
      });
    });

    test('data-[size=large] - 임의 data 속성', () => {
      const result = ModifierParser.parseModifierChain('data-[size=large]:w-full');
      
      expect(result).toEqual({
        modifierChain: 'data-[size=large]',
        modifiers: {
          data: 'data-[size=large]',
          state: [],
          selector: {
            mediaQueries: [],
            pseudoClasses: [],
            pseudoElements: [],
            attributes: ['[data-size=large]']
          }
        }
      });
    });
  });

  describe('CSS 선택자 생성', () => {
    test('단일 pseudo-class 선택자', () => {
      const parseResult = ModifierParser.parseModifierChain('hover:bg-blue-500')!;
      const cssSelector = ModifierParser.generateCSSSelector(parseResult, '.hover\\:bg-blue-500');
      
      expect(cssSelector).toBe('.hover\\:bg-blue-500:hover');
    });

    test('Media query 선택자', () => {
      const parseResult = ModifierParser.parseModifierChain('md:text-xl')!;
      const cssSelector = ModifierParser.generateCSSSelector(parseResult, '.md\\:text-xl');
      
      expect(cssSelector).toBe('@media (min-width: 768px) { .md\\:text-xl }');
    });

    test('복합 선택자', () => {
      const parseResult = ModifierParser.parseModifierChain('md:hover:before:bg-blue-500')!;
      const cssSelector = ModifierParser.generateCSSSelector(parseResult, '.md\\:hover\\:before\\:bg-blue-500');
      
      expect(cssSelector).toBe('@media (min-width: 768px) { .md\\:hover\\:before\\:bg-blue-500:hover::before }');
    });

    test('복잡한 중첩 media query', () => {
      const parseResult = ModifierParser.parseModifierChain('lg:motion-safe:focus:after:text-green-500')!;
      const cssSelector = ModifierParser.generateCSSSelector(parseResult, '.lg\\:motion-safe\\:focus\\:after\\:text-green-500');
      
      expect(cssSelector).toBe('@media (prefers-reduced-motion: no-preference) { @media (min-width: 1024px) { .lg\\:motion-safe\\:focus\\:after\\:text-green-500:focus::after } }');
    });
  });

  describe('Modifier 없는 클래스', () => {
    test('기본 클래스는 null 반환', () => {
      const result = ModifierParser.parseModifierChain('bg-blue-500');
      expect(result).toBeNull();
    });

    test('기본 클래스는 호환성 메서드에서도 null 반환', () => {
      const result = ModifierParser.parseClassNameModifier('text-xl');
      expect(result).toBeNull();
    });
  });
}); 