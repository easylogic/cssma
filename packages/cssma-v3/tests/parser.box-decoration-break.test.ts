import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 박스 데코레이션 브레이크(Box Decoration Break)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('박스 데코레이션 브레이크 클래스 파싱', () => {
    it('box-decoration-clone 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('box-decoration-clone');
      expect(result).toBeDefined();
      expect(result?.className).toBe('box-decoration-clone');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('box-decoration');
      expect(result?.value).toBe('clone');
    });
    
    it('box-decoration-slice 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('box-decoration-slice');
      expect(result).toBeDefined();
      expect(result?.className).toBe('box-decoration-slice');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('box-decoration');
      expect(result?.value).toBe('slice');
    });
  });
  
  describe('박스 데코레이션 브레이크 스타일 적용', () => {
    it('box-decoration-clone 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('box-decoration-clone');
      expect(result.layout?.boxDecorationBreak).toBe('clone');
    });
    
    it('box-decoration-slice 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('box-decoration-slice');
      expect(result.layout?.boxDecorationBreak).toBe('slice');
    });
    
    it('반응형 box-decoration 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:box-decoration-clone');
      expect(result.breakpoints?.md?.layout?.boxDecorationBreak).toBe('clone');
    });
  });
}); 