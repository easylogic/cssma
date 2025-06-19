import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 반응형(Responsive) 기능', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('기본 반응형 브레이크포인트', () => {
    it('기본 브레이크포인트를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.breakpoint).toBe('md');
      expect(result?.modifiers?.breakpoint).toBe('md');
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
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifiers?.breakpoint).toBe('max-md');
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
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifiers?.breakpoint).toBe('min-[640px]');
    });
    
    it('임의 최대 너비 브레이크포인트를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('max-[1024px]:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('max-[1024px]:flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifiers?.breakpoint).toBe('max-[1024px]');
    });
    
    it('스타일에 임의 브레이크포인트를 적용할 수 있어야 함', () => {
      const result = parser.parse('min-[768px]:flex');
      expect(result).toBeDefined();
      expect(result.breakpoints?.['min-[768px]']).toBeDefined();
      expect(result.breakpoints?.['min-[768px]'].flexboxGrid?.display).toBe('flex');
    });
  });
  
  describe('컨테이너 쿼리', () => {
    it('기본 컨테이너 쿼리를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('@md:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('@md:flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifiers?.container).toBe('@md');
    });
    
    it('최대 너비 컨테이너 쿼리를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('@max-md:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('@max-md:flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifiers?.container).toBe('@max-md');
    });
    
    it('임의 컨테이너 쿼리를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('@min-[320px]:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('@min-[320px]:flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifiers?.container).toBe('@min-[320px]');
    });
    
    it('명명된 컨테이너 쿼리를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('@md/sidebar:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('@md/sidebar:flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.modifiers?.container).toBe('@md/sidebar');
    });
    
    it('스타일에 컨테이너 쿼리를 적용할 수 있어야 함', () => {
      const result = parser.parse('@md:flex');
      expect(result).toBeDefined();
      expect(result.containers?.['@md']).toBeDefined();
      expect(result.containers?.['@md'].flexboxGrid?.display).toBe('flex');
    });
  });
  
  describe('복합 반응형 패턴', () => {
    it('브레이크포인트 범위를 파싱할 수 있어야 함', () => {
      const result = parser.parse('md:max-lg:flex');
      expect(result).toBeDefined();
      expect(result.breakpoints?.md).toBeDefined();
      expect(result.breakpoints?.md.breakpoints?.['max-lg']).toBeDefined();
      expect(result.breakpoints?.md.breakpoints?.['max-lg'].flexboxGrid?.display).toBe('flex');
    });
    
    it('브레이크포인트와 상태 모디파이어를 함께 파싱할 수 있어야 함', () => {
      const result = parser.parse('md:hover:text-blue-500');
      expect(result).toBeDefined();
      expect(result.breakpoints?.md).toBeDefined();
      expect(result.breakpoints?.md.states?.hover).toBeDefined();
    });
    
    it('컨테이너 쿼리와 상태 모디파이어를 함께 파싱할 수 있어야 함', () => {
      const result = parser.parse('@md:hover:text-blue-500');
      expect(result).toBeDefined();
      expect(result.containers?.['@md']).toBeDefined();
      expect(result.containers?.['@md'].states?.hover).toBeDefined();
    });
  });
}); 