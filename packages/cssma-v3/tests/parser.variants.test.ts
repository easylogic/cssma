import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 변형자(Variants) 기능', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('기본 변형자 파싱', () => {
    it('상태 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('hover:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('hover:text-blue-500');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('blue-500');
      expect(result?.modifier).toBe('hover');
      expect(result?.stateModifier).toBe('hover');
      // 새 모디파이어 구조 확인
      expect(result?.modifiers?.state).toEqual(['hover']);
    });
    
    it('반응형 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      expect(result?.breakpoint).toBe('md');
      // 새 모디파이어 구조 확인
      expect(result?.modifiers?.breakpoint).toBe('md');
    });
  });
  
  describe('중첩된 변형자 파싱', () => {
    it('상태 + 반응형 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:hover:text-blue-500');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('blue-500');
      expect(result?.modifier).toBe('hover');
      expect(result?.stateModifier).toBe('hover');
      expect(result?.breakpointModifier).toBeDefined();
      expect(result?.breakpointModifier?.value).toBe('768px');
    });
    
    it('다중 상태 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('hover:focus:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('hover:focus:text-blue-500');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('blue-500');
      // 이전 버전 호환성 (마지막 변형자만 저장)
      expect(result?.modifier).toBe('focus');
      expect(result?.stateModifiers).toEqual(['hover', 'focus']);
      // 새 모디파이어 구조 확인
      expect(result?.modifiers?.state).toEqual(['hover', 'focus']);
    });
    
    it('복잡한 중첩 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:focus:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:hover:focus:text-blue-500');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('blue-500');
      // 이전 버전 호환성 (마지막 변형자만 저장)
      expect(result?.modifier).toBe('focus');
      expect(result?.stateModifiers).toEqual(['hover', 'focus']);
      expect(result?.breakpointModifier).toBeDefined();
      expect(result?.breakpointModifier?.value).toBe('768px');
    });
  });
  
  describe('특수 선택자 파싱', () => {
    it('nth-child 선택자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('nth-3:bg-gray-100');
      expect(result).toBeDefined();
      expect(result?.className).toBe('nth-3:bg-gray-100');
      expect(result?.property).toBe('bg');
      expect(result?.value).toBe('gray-100');
      // 특수 선택자 확인
      expect(result?.specialSelector).toBeDefined();
      expect(result?.specialSelector?.type).toBe('nth-child');
      expect(result?.specialSelector?.value).toBe('3');
    });
    
    it('nth-of-type 선택자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('nth-of-type-3:bg-gray-100');
      expect(result).toBeDefined();
      expect(result?.className).toBe('nth-of-type-3:bg-gray-100');
      expect(result?.property).toBe('bg');
      expect(result?.value).toBe('gray-100');
      // 특수 선택자 확인
      expect(result?.specialSelector).toBeDefined();
      expect(result?.specialSelector?.type).toBe('nth-of-type');
      expect(result?.specialSelector?.value).toBe('3');
    });
    
    it('복잡한 nth 표현식을 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('nth-[3n+1]:bg-gray-100');
      expect(result).toBeDefined();
      expect(result?.className).toBe('nth-[3n+1]:bg-gray-100');
      expect(result?.property).toBe('bg');
      expect(result?.value).toBe('gray-100');
      // 특수 선택자 확인
      expect(result?.specialSelector).toBeDefined();
      expect(result?.specialSelector?.type).toBe('nth-child');
      expect(result?.specialSelector?.value).toBe('3n+1');
    });
  });
  
  describe('스타일 적용', () => {
    it('중첩된 상태 변형자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('hover:focus:text-blue-500');
      expect(result).toBeDefined();
      // 중첩된 상태 변형자 스타일 확인
      expect(result.nestedStates).toBeDefined();
      expect(result.nestedStates?.['hover:focus']).toBeDefined();
      expect(result.nestedStates?.['hover:focus']?.colors?.text).toEqual({ r: 0.25, g: 0.53, b: 0.94 });
    });
    
    it('반응형 + 중첩 상태 변형자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:hover:focus:text-blue-500');
      expect(result).toBeDefined();
      // 반응형 스타일 확인
      expect(result.breakpoints?.md).toBeDefined();
      // 중첩된 상태 변형자 스타일 확인
      expect(result.breakpoints?.md.nestedStates).toBeDefined();
      expect(result.breakpoints?.md.nestedStates?.['hover:focus']).toBeDefined();
      expect(result.breakpoints?.md.nestedStates?.['hover:focus']?.colors?.text).toEqual({ r: 0.25, g: 0.53, b: 0.94 });
    });
    
    it('특수 선택자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('nth-child-3:bg-blue-500');
      
      expect(result.specialSelectors).toBeDefined();
      expect(result.specialSelectors?.['nth-child-3']).toBeDefined();
      expect(result.specialSelectors?.['nth-child-3']?.backgrounds?.backgroundColor).toBeDefined();
    });
    
    it('반응형 + 특수 선택자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:nth-child-3:bg-blue-500');
      
      expect(result.breakpoints?.md.specialSelectors).toBeDefined();
      expect(result.breakpoints?.md.specialSelectors?.['nth-child-3']).toBeDefined();
      expect(result.breakpoints?.md.specialSelectors?.['nth-child-3']?.backgrounds?.backgroundColor).toBeDefined();
    });
  });
}); 