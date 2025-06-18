import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 코어 기능', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('기본 기능', () => {
    it('인스턴스가 생성되어야 함', () => {
      expect(parser).toBeInstanceOf(CSSParser);
    });
    
    it('빈 클래스 문자열을 파싱할 수 있어야 함', () => {
      const result = parser.parse('');
      expect(result).toBeDefined();
      expect(result.meta.originalClasses).toEqual([]);
    });
  });
  
  describe('기본 클래스 파싱', () => {
    it('단일 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('text-blue-500');
    });
  });

  describe('복합 클래스 파싱', () => {
    it('여러 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parse('text-blue-500 p-4 md:flex hover:bg-red-500');
      expect(result).toBeDefined();
      expect(result.meta.originalClasses).toHaveLength(4);
      expect(result.meta.originalClasses).toContain('text-blue-500');
      expect(result.meta.originalClasses).toContain('p-4');
      expect(result.meta.originalClasses).toContain('md:flex');
      expect(result.meta.originalClasses).toContain('hover:bg-red-500');
    });
  });
}); 