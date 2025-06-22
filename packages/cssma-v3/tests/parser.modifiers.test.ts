import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 모디파이어', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('상태 모디파이어 파싱', () => {
    it('hover 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('hover:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('hover:text-blue-500');
      expect(result?.modifiers?.state).toBe('hover');
      expect(result?.category).toBe('typography');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('blue-500');
    });
    
    it('focus 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('focus:outline-none');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('focus:outline-none');
      expect(result?.modifiers?.state).toBe('focus');
      expect(result?.category).toBe('borders');
      expect(result?.property).toBe('outline');
      expect(result?.value).toBe('none');
    });
    
    it('active 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('active:bg-blue-600');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('active:bg-blue-600');
      expect(result?.modifiers?.state).toBe('active');
      expect(result?.category).toBe('backgrounds');
      expect(result?.property).toBe('bg');
      expect(result?.value).toBe('blue-600');
    });
    
    it('disabled 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('disabled:opacity-50');
      expect(result).toBeDefined();
      expect(result?.className).toBe('disabled:opacity-50');
      expect(result?.modifier).toBe('disabled');
      expect(result?.category).toBe('effects');
      expect(result?.property).toBe('opacity');
      expect(result?.value).toBe('50');
    });
  });
  
  describe('반응형 모디파이어 파싱', () => {
    it('sm 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('sm:text-lg');
      expect(result).toBeDefined();
      expect(result?.className).toBe('sm:text-lg');
      expect(result?.modifier).toBe('sm');
      expect(result?.category).toBe('typography');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('lg');
    });
    
    it('md 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('md:flex');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:flex');
      expect(result?.modifier).toBe('md');
      expect(result?.category).toBe('flexbox-grid');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
    });
    
    it('lg 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('lg:hidden');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('lg:hidden');
      expect(result?.modifier).toBe('lg');
      expect(result?.category).toBe('flexbox-grid');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('none');
    });
    
    it('xl 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('xl:p-8');
      expect(result).toBeDefined();
      expect(result?.className).toBe('xl:p-8');
      expect(result?.modifier).toBe('xl');
      expect(result?.category).toBe('spacing');
      expect(result?.property).toBe('p');
      expect(result?.value).toBe('8');
    });
    
    it('2xl 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('2xl:text-center');
      expect(result).toBeDefined();
      expect(result?.className).toBe('2xl:text-center');
      expect(result?.modifier).toBe('2xl');
      expect(result?.category).toBe('typography');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('center');
    });
  });
  
  describe('복합 모디파이어 파싱', () => {
    it('상태+반응형 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:hover:text-blue-500');
      expect(result?.modifier).toBe('hover');
      expect(result?.category).toBe('typography');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('blue-500');
    });
  });
  
  describe('모디파이어 스타일 적용', () => {
    it('상태 모디파이어 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('hover:text-blue-500');
      expect(result.states).toBeDefined();
      expect(result.states?.hover).toBeDefined();
      expect(result.states?.hover.typography?.color).toBeDefined();
      // 색상 값은 CSS 문자열 형태로 저장됨
      expect(result.states?.hover.typography?.color).toBe('#3b82f6');
    });
    
    it('반응형 모디파이어 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:flex');
      
      expect(result.breakpoints).toBeDefined();
      expect(result.breakpoints?.md).toBeDefined();
      expect(result.breakpoints?.md.flexboxGrid?.display).toBe('flex');
    });
    
    it('복합 모디파이어 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:hover:text-blue-500');
      expect(result.breakpoints).toBeDefined();
      expect(result.breakpoints?.md).toBeDefined();
      expect(result.breakpoints?.md.states).toBeDefined();
      expect(result.breakpoints?.md.states?.hover).toBeDefined();
      expect(result.breakpoints?.md.states?.hover.typography?.color).toBeDefined();
      expect(result.breakpoints?.md.states?.hover.typography?.color).toBe('#3b82f6');
    });
    
    it('여러 모디파이어 스타일을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('text-blue-500 hover:text-red-500 md:text-lg');
      
      // 기본 스타일
      expect(result.typography?.color).toBe('#3b82f6');
      
      // 상태 모디파이어 스타일
      expect(result.states?.hover.typography?.color).toBe('#ef4444');
      
      // 반응형 모디파이어 스타일
      expect(result.breakpoints?.md.typography?.fontSize).toBe(18);
    });
  });
}); 