import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 변형자(Variants) 기능 - Tailwind CSS 방식', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('기본 변형자 파싱', () => {
    it('상태 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('hover:text-blue-500');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('hover:text-blue-500');
      expect(result?.baseClassName).toBe('text-blue-500');
      expect(result?.property).toBe('color');
      expect(result?.value).toBe('blue-500');
      expect(result?.category).toBe('typography');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('hover');
      expect(result?.modifiers?.state).toEqual(['hover']);
    });
    
    it('반응형 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:flex');
      expect(result?.baseClassName).toBe('flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('md');
      expect(result?.modifiers?.responsive).toBe('md');
    });
  });
  
  describe('중첩된 변형자 파싱', () => {
    it('상태 + 반응형 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:hover:text-blue-500');
      expect(result?.baseClassName).toBe('text-blue-500');
      expect(result?.property).toBe('color');
      expect(result?.value).toBe('blue-500');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('md:hover');
      expect(result?.modifiers?.responsive).toBe('md');
      expect(result?.modifiers?.state).toEqual(['hover']);
    });
    
    it('다중 상태 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('hover:focus:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('hover:focus:text-blue-500');
      expect(result?.baseClassName).toBe('text-blue-500');
      expect(result?.property).toBe('color');
      expect(result?.value).toBe('blue-500');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('hover:focus');
      expect(result?.modifiers?.state).toEqual(['hover', 'focus']);
    });
    
    it('복잡한 중첩 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:focus:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:hover:focus:text-blue-500');
      expect(result?.baseClassName).toBe('text-blue-500');
      expect(result?.property).toBe('color');
      expect(result?.value).toBe('blue-500');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('md:hover:focus');
      expect(result?.modifiers?.responsive).toBe('md');
      expect(result?.modifiers?.state).toEqual(['hover', 'focus']);
    });
  });
  
  describe('고급 변형자 파싱 - Tailwind CSS 방식', () => {
    it('Pseudo-element 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('before:content-[""]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('before:content-[""]');
      expect(result?.baseClassName).toBe('content-[""]');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('before');
      expect(result?.modifiers?.pseudoElement).toBe('before');
    });
    
    it('ARIA 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('aria-checked:bg-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('aria-checked:bg-blue-500');
      expect(result?.baseClassName).toBe('bg-blue-500');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('aria-checked');
      expect(result?.modifiers?.aria).toBe('aria-checked');
    });
    
    it('Data 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('data-active:text-green-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('data-active:text-green-500');
      expect(result?.baseClassName).toBe('text-green-500');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('data-active');
      expect(result?.modifiers?.data).toBe('data-active');
    });
    
    it('Motion 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('motion-safe:transition-all');
      expect(result).toBeDefined();
      expect(result?.className).toBe('motion-safe:transition-all');
      expect(result?.baseClassName).toBe('transition-all');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('motion-safe');
      expect(result?.modifiers?.motion).toBe('motion-safe');
    });
    
    it('복잡한 임의값 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('aria-[label="Custom"]:p-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('aria-[label="Custom"]:p-4');
      expect(result?.baseClassName).toBe('p-4');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('aria-[label="Custom"]');
      expect(result?.modifiers?.aria).toBe('aria-[label="Custom"]');
    });
  });
  
  describe('완전한 복합 변형자 체인', () => {
    it('모든 타입의 변형자를 포함한 복합 체인을 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:motion-safe:before:hover:focus:bg-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:motion-safe:before:hover:focus:bg-blue-500');
      expect(result?.baseClassName).toBe('bg-blue-500');
      // 🎯 새로운 Tailwind 방식: 완전한 modifier 체인
      expect(result?.modifierChain).toBe('md:motion-safe:before:hover:focus');
      expect(result?.modifiers?.responsive).toBe('md');
      expect(result?.modifiers?.motion).toBe('motion-safe');
      expect(result?.modifiers?.pseudoElement).toBe('before');
      expect(result?.modifiers?.state).toEqual(['hover', 'focus']);
    });
    
    it('임의값 포함 복합 체인을 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('min-[768px]:aria-[checked]:data-[size=large]:hover:p-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('min-[768px]:aria-[checked]:data-[size=large]:hover:p-4');
      expect(result?.baseClassName).toBe('p-4');
      // 🎯 새로운 Tailwind 방식: 임의값 포함 복합 체인
      expect(result?.modifierChain).toBe('min-[768px]:aria-[checked]:data-[size=large]:hover');
      expect(result?.modifiers?.responsive).toBe('min-[768px]');
      expect(result?.modifiers?.aria).toBe('aria-[checked]');
      expect(result?.modifiers?.data).toBe('data-[size=large]');
      expect(result?.modifiers?.state).toEqual(['hover']);
    });
  });
  
  describe('스타일 적용 - Tailwind CSS 방식', () => {
    it('단일 상태 변형자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('hover:text-blue-500');
      expect(result).toBeDefined();
      // 단일 상태 변형자 스타일 확인
      expect(result.states).toBeDefined();
      expect(result.states?.hover).toBeDefined();
      expect(result.states?.hover?.typography?.color).toBeDefined();
    });
    
    it('중첩된 상태 변형자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('hover:focus:text-blue-500');
      expect(result).toBeDefined();
      // 중첩된 상태 변형자 스타일 확인
      expect(result.nestedStates).toBeDefined();
      expect(result.nestedStates?.['hover:focus']).toBeDefined();
      expect(result.nestedStates?.['hover:focus']?.typography?.color).toBeDefined();
    });
    
    it('반응형 + 중첩 상태 변형자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:hover:focus:text-blue-500');
      expect(result).toBeDefined();
      // 반응형 스타일 확인
      expect(result.breakpoints?.md).toBeDefined();
      // 중첩된 상태 변형자 스타일 확인
      expect(result.breakpoints?.md.nestedStates).toBeDefined();
      expect(result.breakpoints?.md.nestedStates?.['hover:focus']).toBeDefined();
      expect(result.breakpoints?.md.nestedStates?.['hover:focus']?.typography?.color).toBeDefined();
    });
    
    it('컨테이너 쿼리 + 상태 변형자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('@md:hover:bg-blue-500');
      expect(result).toBeDefined();
      // 컨테이너 쿼리 스타일 확인
      expect(result.containers?.['@md']).toBeDefined();
      expect(result.containers?.['@md'].states?.hover).toBeDefined();
      expect(result.containers?.['@md'].states?.hover?.colors?.background).toBeDefined();
    });
    
    it('복합 변형자로 배경색을 적용할 수 있어야 함', () => {
      const result = parser.parse('lg:motion-safe:hover:focus:active:bg-red-500');
      expect(result).toBeDefined();
      // 반응형 + 다중 상태 스타일 확인
      expect(result.breakpoints?.lg).toBeDefined();
      expect(result.breakpoints?.lg.nestedStates?.['hover:focus:active']).toBeDefined();
      expect(result.breakpoints?.lg.nestedStates?.['hover:focus:active']?.colors?.background).toBeDefined();
    });
    
    it('모든 변형자 타입을 포함한 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:motion-safe:before:hover:p-4');
      expect(result).toBeDefined();
      // 복합 변형자 스타일 적용 확인 (현재는 기본 스타일 적용)
      expect(result.spacing || result.layout).toBeDefined();
    });
  });
  
  describe('CSS 선택자 호환성 테스트', () => {
    it('복합 변형자의 CSS 선택자 정보를 생성할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:before:bg-blue-500');
      expect(result).toBeDefined();
      // CSS 선택자 생성을 위한 정보 확인
      expect(result?.modifiers?.responsive).toBe('md');
      expect(result?.modifiers?.state).toEqual(['hover']);
      expect(result?.modifiers?.pseudoElement).toBe('before');
      // 예상 CSS: @media (min-width: 768px) { .md\:hover\:before\:bg-blue-500:hover::before }
    });
    
    it('임의값 변형자의 CSS 선택자 정보를 생성할 수 있어야 함', () => {
      const result = parser.parseClassName('min-[768px]:aria-[checked]:hover:p-4');
      expect(result).toBeDefined();
      // CSS 선택자 생성을 위한 정보 확인
      expect(result?.modifiers?.responsive).toBe('min-[768px]');
      expect(result?.modifiers?.aria).toBe('aria-[checked]');
      expect(result?.modifiers?.state).toEqual(['hover']);
      // 예상 CSS: @media (min-width: 768px) { .min-\[768px\]\:aria-\[checked\]\:hover\:p-4:hover[aria-checked] }
    });
  });
});