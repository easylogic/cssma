import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 반응형(Responsive) 기능 - Tailwind CSS 방식', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('기본 반응형 브레이크포인트', () => {
    it('기본 브레이크포인트를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:flex');
      expect(result?.baseClassName).toBe('flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifierChain).toBe('md');
      expect(result?.modifiers?.responsive).toBe('md');
    });
    
    it('스타일에 브레이크포인트를 적용할 수 있어야 함', () => {
      const result = parser.parse('md:flex');
      expect(result).toBeDefined();
      expect(result.breakpoints?.md).toBeDefined();
      expect(result.breakpoints?.md.flexboxGrid?.display).toBe('flex');
    });
  });
  
  describe('최대 너비 브레이크포인트', () => {
    it('최대 너비 브레이크포인트를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('max-md:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('max-md:flex');
      expect(result?.baseClassName).toBe('flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifierChain).toBe('max-md');
      expect(result?.modifiers?.responsive).toBe('max-md');
    });
    
    it('스타일에 최대 너비 브레이크포인트를 적용할 수 있어야 함', () => {
      const result = parser.parse('max-md:flex');
      expect(result).toBeDefined();
      expect(result.breakpoints?.['max-md']).toBeDefined();
      expect(result.breakpoints?.['max-md'].flexboxGrid?.display).toBe('flex');
    });
  });
  
  describe('임의 브레이크포인트', () => {
    it('임의 최소 너비 브레이크포인트를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('min-[640px]:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('min-[640px]:flex');
      expect(result?.baseClassName).toBe('flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifierChain).toBe('min-[640px]');
      expect(result?.modifiers?.responsive).toBe('min-[640px]');
    });
    
    it('임의 최대 너비 브레이크포인트를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('max-[1024px]:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('max-[1024px]:flex');
      expect(result?.baseClassName).toBe('flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifierChain).toBe('max-[1024px]');
      expect(result?.modifiers?.responsive).toBe('max-[1024px]');
    });
    
    it('스타일에 임의 브레이크포인트를 적용할 수 있어야 함', () => {
      const result = parser.parse('min-[768px]:flex');
      expect(result).toBeDefined();
      expect(result.breakpoints?.['min-[768px]']).toBeDefined();
      expect(result.breakpoints?.['min-[768px]'].flexboxGrid?.display).toBe('flex');
    });
  });
  
  describe('컨테이너 쿼리 - Tailwind CSS 방식', () => {
    it('기본 컨테이너 쿼리를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('@md:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('@md:flex');
      expect(result?.baseClassName).toBe('flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifierChain).toBe('@md');
      expect(result?.modifiers?.container).toBe('@md');
    });
    
    it('최대 너비 컨테이너 쿼리를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('@max-md:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('@max-md:flex');
      expect(result?.baseClassName).toBe('flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifierChain).toBe('@max-md');
      expect(result?.modifiers?.container).toBe('@max-md');
    });
    
    it('임의 컨테이너 쿼리를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('@min-[320px]:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('@min-[320px]:flex');
      expect(result?.baseClassName).toBe('flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifierChain).toBe('@min-[320px]');
      expect(result?.modifiers?.container).toBe('@min-[320px]');
    });
    
    it('명명된 컨테이너 쿼리를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('@md/sidebar:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('@md/sidebar:flex');
      expect(result?.baseClassName).toBe('flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifierChain).toBe('@md/sidebar');
      expect(result?.modifiers?.container).toBe('@md/sidebar');
    });
    
    it('스타일에 컨테이너 쿼리를 적용할 수 있어야 함', () => {
      const result = parser.parse('@md:flex');
      expect(result).toBeDefined();
      expect(result.containers?.['@md']).toBeDefined();
      expect(result.containers?.['@md'].flexboxGrid?.display).toBe('flex');
    });
  });
  
  describe('복합 반응형 패턴 - Tailwind CSS 방식', () => {
    it('복합 modifier 체인을 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:focus:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:hover:focus:text-blue-500');
      expect(result?.baseClassName).toBe('text-blue-500');
      expect(result?.modifierChain).toBe('md:hover:focus');
      expect(result?.modifiers?.responsive).toBe('md');
      expect(result?.modifiers?.state).toEqual(['hover', 'focus']);
    });
    
    it('브레이크포인트와 상태 모디파이어를 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('md:hover:text-blue-500');
      expect(result).toBeDefined();
      expect(result.breakpoints?.md).toBeDefined();
      expect(result.breakpoints?.md.states?.hover).toBeDefined();
      expect(result.breakpoints?.md.states?.hover.typography?.color).toBeDefined();
    });
    
    it('컨테이너 쿼리와 상태 모디파이어를 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('@md:hover:text-blue-500');
      expect(result).toBeDefined();
      expect(result.containers?.['@md']).toBeDefined();
      expect(result.containers?.['@md'].states?.hover).toBeDefined();
      expect(result.containers?.['@md'].states?.hover.typography?.color).toBeDefined();
    });
    
    it.only('다중 상태 모디파이어를 적용할 수 있어야 함', () => {
      const result = parser.parse('lg:hover:focus:active:bg-red-500');
      expect(result).toBeDefined();
      expect(result.breakpoints?.lg).toBeDefined();
      expect(result.breakpoints?.lg.nestedStates?.['hover:focus:active']).toBeDefined();
      expect(result.breakpoints?.lg.nestedStates?.['hover:focus:active'].backgrounds?.['backgroundColor']).toBeDefined();
    });
  });
  
  describe('CSS 선택자 생성 테스트', () => {
    it('복합 modifier의 CSS 선택자를 생성할 수 있어야 함', () => {
      const result = parser.parseClassName('md:motion-safe:before:hover:bg-blue-500');
      expect(result).toBeDefined();
      expect(result?.modifierChain).toBe('md:motion-safe:before:hover');
      expect(result?.modifiers?.responsive).toBe('md');
      expect(result?.modifiers?.motion).toBe('motion-safe');
      expect(result?.modifiers?.pseudoElement).toBe('before');
      expect(result?.modifiers?.state).toEqual(['hover']);
    });
    
    it('임의값 modifier의 CSS 선택자를 생성할 수 있어야 함', () => {
      const result = parser.parseClassName('min-[768px]:aria-[checked]:data-[active]:hover:p-4');
      expect(result).toBeDefined();
      expect(result?.modifierChain).toBe('min-[768px]:aria-[checked]:data-[active]:hover');
      expect(result?.modifiers?.responsive).toBe('min-[768px]');
      expect(result?.modifiers?.aria).toBe('aria-[checked]');
      expect(result?.modifiers?.data).toBe('data-[active]');
      expect(result?.modifiers?.state).toEqual(['hover']);
    });
  });
}); 