import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 컬럼(Columns)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('컬럼 클래스 파싱', () => {
    it('숫자 기반 컬럼 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('columns-3');
      expect(result).toBeDefined();
      expect(result?.className).toBe('columns-3');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('columns');
      expect(result?.value).toBe('3');
    });
    
    it('auto 컬럼 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('columns-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('columns-auto');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('columns');
      expect(result?.value).toBe('auto');
    });
    
    it('크기 기반 컬럼 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('columns-md');
      expect(result).toBeDefined();
      expect(result?.className).toBe('columns-md');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('columns');
      expect(result?.value).toBe('md');
    });
    
    it('CSS 변수 컬럼 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('columns-(--my-columns)');
      expect(result).toBeDefined();
      expect(result?.className).toBe('columns-(--my-columns)');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('columns');
      expect(result?.value).toBe('(--my-columns)');
    });
    
    it('임의 값 컬럼 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('columns-[30vw]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('columns-[30vw]');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('columns');
      expect(result?.value).toBe('30vw');
      expect(result?.isArbitrary).toBe(true);
    });
  });
  
  describe('컬럼 스타일 적용', () => {
    it('숫자 기반 컬럼 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('columns-3');
      expect(result.layout?.columns).toBe(3);
    });
    
    it('auto 컬럼 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('columns-auto');
      expect(result.layout?.columns).toBe('auto');
    });
    
    it('크기 기반 컬럼 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('columns-md');
      expect(result.layout?.columns).toBe('var(--container-md)');
    });
    
    it('CSS 변수 컬럼 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('columns-(--my-columns)');
      expect(result.layout?.columns).toBe('var(--my-columns)');
    });
    
    it('임의 값 컬럼 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('columns-[30vw]');
      expect(result.layout?.columns).toBe('30vw');
    });
    
    it('반응형 컬럼 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:columns-3');
      expect(result.breakpoints?.md?.layout?.columns).toBe(3);
    });
  });
}); 