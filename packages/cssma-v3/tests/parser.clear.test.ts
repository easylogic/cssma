import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 클리어(Clear)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('클리어 클래스 파싱', () => {
    it('clear-left 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('clear-left');
      expect(result).toBeDefined();
      expect(result?.className).toBe('clear-left');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('clear');
      expect(result?.value).toBe('left');
    });
    
    it('clear-right 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('clear-right');
      expect(result).toBeDefined();
      expect(result?.className).toBe('clear-right');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('clear');
      expect(result?.value).toBe('right');
    });
    
    it('clear-both 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('clear-both');
      expect(result).toBeDefined();
      expect(result?.className).toBe('clear-both');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('clear');
      expect(result?.value).toBe('both');
    });
    
    it('clear-none 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('clear-none');
      expect(result).toBeDefined();
      expect(result?.className).toBe('clear-none');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('clear');
      expect(result?.value).toBe('none');
    });
    
    it('clear-start 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('clear-start');
      expect(result).toBeDefined();
      expect(result?.className).toBe('clear-start');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('clear');
      expect(result?.value).toBe('start');
    });
    
    it('clear-end 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('clear-end');
      expect(result).toBeDefined();
      expect(result?.className).toBe('clear-end');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('clear');
      expect(result?.value).toBe('end');
    });
  });
  
  describe('클리어 스타일 적용', () => {
    it('clear-left 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('clear-left');
      expect(result.layout?.clear).toBe('left');
    });
    
    it('clear-right 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('clear-right');
      expect(result.layout?.clear).toBe('right');
    });
    
    it('clear-both 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('clear-both');
      expect(result.layout?.clear).toBe('both');
    });
    
    it('clear-none 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('clear-none');
      expect(result.layout?.clear).toBe('none');
    });
    
    it('clear-start는 inline-start로 변환되어야 함', () => {
      const result = parser.parse('clear-start');
      expect(result.layout?.clear).toBe('inline-start');
    });
    
    it('clear-end는 inline-end로 변환되어야 함', () => {
      const result = parser.parse('clear-end');
      expect(result.layout?.clear).toBe('inline-end');
    });
    
    it('반응형 clear 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:clear-both');
      expect(result.breakpoints?.md?.layout?.clear).toBe('both');
    });
  });
}); 