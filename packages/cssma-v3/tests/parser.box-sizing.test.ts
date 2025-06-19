import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 박스 사이징(Box Sizing)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('박스 사이징 클래스 파싱', () => {
    it('box-border 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('box-border');
      expect(result).toBeDefined();
      expect(result?.className).toBe('box-border');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('box');
      expect(result?.value).toBe('border');
    });
    
    it('box-content 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('box-content');
      expect(result).toBeDefined();
      expect(result?.className).toBe('box-content');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('box');
      expect(result?.value).toBe('content');
    });
  });
  
  describe('박스 사이징 스타일 적용', () => {
    it('box-border 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('box-border');
      expect(result.layout?.boxSizing).toBe('border-box');
    });
    
    it('box-content 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('box-content');
      expect(result.layout?.boxSizing).toBe('content-box');
    });
    
    it('반응형 box-sizing 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:box-border');
      expect(result.breakpoints?.md?.layout?.boxSizing).toBe('border-box');
    });
  });
}); 