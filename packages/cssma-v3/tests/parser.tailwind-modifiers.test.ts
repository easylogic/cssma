/**
 * Tailwind CSS Modifier System Test Suite
 * Tests the new unified modifier chain parsing approach
 */

import { ModifierParser } from '../src/core/parsers/modifiers';

describe('Tailwind CSS Modifier System', () => {
  describe('단일 Modifier 파싱', () => {
    test('Responsive breakpoint', () => {
      const result = ModifierParser.parseModifiers('md:bg-blue-500');
      
      expect(result.modifiers.responsive).toEqual({ md: '@media (min-width: 768px)' });
    });

    test('State pseudo-class', () => {
      const result = ModifierParser.parseModifiers('hover:text-red-500');
      
      expect(result.modifiers.state).toEqual([':hover']);
    });

    test('Pseudo-element', () => {
      const result = ModifierParser.parseModifiers('before:content-[""]');
      
      expect(result.modifiers.pseudoElement).toEqual('::before');
    });
  });

  describe('복합 Modifier 체인 파싱', () => {
    test('md:hover:before - 복합 modifier', () => {
      const result = ModifierParser.parseModifiers('md:hover:before:bg-blue-500');
      
      expect(result.modifiers.responsive).toEqual({ md: '@media (min-width: 768px)' });
      expect(result.modifiers.state).toEqual([':hover']);
      expect(result.modifiers.pseudoElement).toEqual('::before');
    });

    test('lg:motion-safe:focus:after - 전체 복합', () => {
      const result = ModifierParser.parseModifiers('lg:motion-safe:focus:after:text-green-500');
      
      expect(result.modifiers.responsive).toEqual({ lg: '@media (min-width: 1024px)' });
      expect(result.modifiers.motion).toEqual('@media (prefers-reduced-motion: no-preference)');
      expect(result.modifiers.state).toEqual([':focus']);
      expect(result.modifiers.pseudoElement).toEqual('::after');
    });

    test('data-active:aria-checked:hover - 속성 기반 modifier', () => {
      const result = ModifierParser.parseModifiers('data-active:aria-checked:hover:border-2');
      
      expect(result.modifiers.data).toEqual({ active: '[data-active]' });
      expect(result.modifiers.aria).toEqual({ checked: '[aria-checked]' });
      expect(result.modifiers.state).toEqual([':hover']);
    });
  });

  describe('임의값 Modifier 파싱', () => {
    test('min-[768px] - 임의 breakpoint', () => {
      const result = ModifierParser.parseModifiers('min-[768px]:text-xl');
      
      expect(result.modifiers.responsive).toEqual({ 'min-[768px]': '@media (min-width: 768px)' });
    });

    test('aria-[label] - 임의 ARIA 속성', () => {
      const result = ModifierParser.parseModifiers('aria-[label]:p-4');
      
      expect(result.modifiers.aria).toEqual({ label: '[aria-label]' });
    });

    test('data-[size=large] - 임의 data 속성', () => {
      const result = ModifierParser.parseModifiers('data-[size=large]:w-full');
      
      expect(result.modifiers.data).toEqual({ size: '[data-size="large"]' });
    });
  });

  describe('CSS 선택자 생성', () => {
    test('단일 pseudo-class 선택자', () => {
      const parseResult = ModifierParser.parseModifiers('hover:bg-blue-500')!;
      const cssSelector = ModifierParser.generateSelector('.hover\\:bg-blue-500', parseResult.modifiers, 'hover:bg-blue-500');
      
      expect(cssSelector).toBe('.hover\\:bg-blue-500:hover');
    });

    test('Media query 선택자', () => {
      const parseResult = ModifierParser.parseModifiers('md:text-xl')!;
      const cssSelector = ModifierParser.generateSelector('.md\\:text-xl', parseResult.modifiers, 'md:text-xl');
      
      expect(cssSelector).toBe('@media (min-width: 768px) { .md\\:text-xl }');
    });

    test('복합 선택자', () => {
      const parseResult = ModifierParser.parseModifiers('md:hover:before:bg-blue-500')!;
      const cssSelector = ModifierParser.generateSelector('.md\\:hover\\:before\\:bg-blue-500', parseResult.modifiers, 'md:hover:before:bg-blue-500');
      
      expect(cssSelector).toBe('@media (min-width: 768px) { .md\\:hover\\:before\\:bg-blue-500:hover::before }');
    });

    test('복잡한 중첩 media query', () => {
      const parseResult = ModifierParser.parseModifiers('lg:motion-safe:focus:after:text-green-500')!;
      const cssSelector = ModifierParser.generateSelector('.lg\\:motion-safe\\:focus\\:after\\:text-green-500', parseResult.modifiers, 'lg:motion-safe:focus:after:text-green-500');
      
      expect(cssSelector).toBe('@media (prefers-reduced-motion: no-preference) { @media (min-width: 1024px) { .lg\\:motion-safe\\:focus\\:after\\:text-green-500:focus::after } }');
    });
  });

  describe('Modifier 없는 클래스', () => {
    test('기본 클래스는 null 반환', () => {
      const result = ModifierParser.parseModifiers('bg-blue-500');
      expect(result).toBeNull();
    });

    test('기본 클래스는 호환성 메서드에서도 null 반환', () => {
      const result = ModifierParser.parseClassName('text-xl');
      expect(result).toBeNull();
    });
  });
}); 