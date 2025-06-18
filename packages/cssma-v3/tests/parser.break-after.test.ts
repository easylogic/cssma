import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 브레이크 애프터(Break After)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('브레이크 애프터 클래스 파싱', () => {
    it('break-after-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-after-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-after-auto');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-after');
      expect(result?.value).toBe('auto');
    });
    
    it('break-after-avoid 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-after-avoid');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-after-avoid');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-after');
      expect(result?.value).toBe('avoid');
    });
    
    it('break-after-all 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-after-all');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-after-all');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-after');
      expect(result?.value).toBe('all');
    });
    
    it('break-after-avoid-page 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-after-avoid-page');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-after-avoid-page');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-after');
      expect(result?.value).toBe('avoid-page');
    });
    
    it('break-after-page 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-after-page');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-after-page');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-after');
      expect(result?.value).toBe('page');
    });
    
    it('break-after-left 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-after-left');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-after-left');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-after');
      expect(result?.value).toBe('left');
    });
    
    it('break-after-right 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-after-right');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-after-right');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-after');
      expect(result?.value).toBe('right');
    });
    
    it('break-after-column 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-after-column');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-after-column');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-after');
      expect(result?.value).toBe('column');
    });
  });
  
  describe('브레이크 애프터 스타일 적용', () => {
    it('break-after-auto 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-after-auto');
      expect(result.layout?.breakAfter).toBe('auto');
    });
    
    it('break-after-avoid 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-after-avoid');
      expect(result.layout?.breakAfter).toBe('avoid');
    });
    
    it('break-after-all 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-after-all');
      expect(result.layout?.breakAfter).toBe('all');
    });
    
    it('break-after-avoid-page 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-after-avoid-page');
      expect(result.layout?.breakAfter).toBe('avoid-page');
    });
    
    it('break-after-page 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-after-page');
      expect(result.layout?.breakAfter).toBe('page');
    });
    
    it('break-after-left 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-after-left');
      expect(result.layout?.breakAfter).toBe('left');
    });
    
    it('break-after-right 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-after-right');
      expect(result.layout?.breakAfter).toBe('right');
    });
    
    it('break-after-column 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-after-column');
      expect(result.layout?.breakAfter).toBe('column');
    });
    
    it('반응형 break-after 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:break-after-column');
      expect(result.breakpoints?.md?.layout?.breakAfter).toBe('column');
    });
  });
}); 