import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 효과(Effects)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('효과 클래스 파싱', () => {
    it('테두리 반경 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('rounded-lg');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('rounded-lg');
      expect(result?.category).toBe('borders');
      expect(result?.property).toBe('rounded');
      expect(result?.value).toBe('lg');
    });
    
    it('방향성 테두리 반경 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('rounded-t-lg');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('rounded-t-lg');
      expect(result?.category).toBe('borders');
      expect(result?.property).toBe('rounded-t');
      expect(result?.value).toBe('lg');
    });
    
    it('그림자 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('shadow-md');
      expect(result).toBeDefined();
      expect(result?.className).toBe('shadow-md');
      expect(result?.category).toBe('effects');
      expect(result?.property).toBe('shadow');
      expect(result?.value).toBe('md');
    });
    
    it('불투명도 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('opacity-50');
      expect(result).toBeDefined();
      expect(result?.className).toBe('opacity-50');
      expect(result?.category).toBe('effects');
      expect(result?.property).toBe('opacity');
      expect(result?.value).toBe('50');
    });
    
    it('테두리 너비 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('border-2');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('border-2');
      expect(result?.category).toBe('borders');
      expect(result?.property).toBe('border');
      expect(result?.value).toBe('2');
    });
    
    it('방향성 테두리 너비 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('border-t-2');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('border-t-2');
      expect(result?.category).toBe('borders');
      expect(result?.property).toBe('border-t');
      expect(result?.value).toBe('2');
    });
  });
  
  describe('효과 스타일 적용', () => {
    it('테두리 반경 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('rounded-lg');
      expect(result.borders.borderRadius).toBeDefined();
      expect(result.borders.borderRadius).toBe('8px');
    });
    
    it('그림자 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('shadow-md');
      expect(result.effects.boxShadow).toBeDefined();
      expect(result.effects.boxShadow).toEqual([
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      ]);
    });
    
    it('불투명도 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('opacity-50');
      expect(result.effects.opacity).toBeDefined();
      expect(result.effects.opacity).toBe(0.5);
    });
    
    it('테두리 너비 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('border-2');
      expect(result.borders.borderWidth).toBeDefined();
      expect(result.borders.borderWidth).toBe('2px');
    });
    
    it('방향성 테두리 너비 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('border-t-2');
      expect(result.borders.borderTopWidth).toBeDefined();
      expect(result.borders.borderTopWidth).toBe('2px');
    });
    
    it('여러 효과 스타일을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('rounded-lg shadow-md opacity-50 border-2');
      expect(result.borders.borderRadius).toBe('8px');
      expect(result.effects.boxShadow).toBeDefined();
      expect(result.effects.opacity).toBe(0.5);
      expect(result.borders.borderWidth).toBe('2px');
    });
  });
}); 