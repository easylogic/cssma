import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 브레이크 인사이드(Break Inside)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('브레이크 인사이드 클래스 파싱', () => {
    it('break-inside-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-inside-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-inside-auto');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-inside');
      expect(result?.value).toBe('auto');
    });
    
    it('break-inside-avoid 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-inside-avoid');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-inside-avoid');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-inside');
      expect(result?.value).toBe('avoid');
    });
    
    it('break-inside-all 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-inside-all');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-inside-all');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-inside');
      expect(result?.value).toBe('all');
    });
    
    it('break-inside-avoid-page 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-inside-avoid-page');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-inside-avoid-page');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-inside');
      expect(result?.value).toBe('avoid-page');
    });
    
    it('break-inside-page 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-inside-page');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-inside-page');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-inside');
      expect(result?.value).toBe('page');
    });
    
    it('break-inside-left 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-inside-left');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-inside-left');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-inside');
      expect(result?.value).toBe('left');
    });
    
    it('break-inside-right 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-inside-right');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-inside-right');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-inside');
      expect(result?.value).toBe('right');
    });
    
    it('break-inside-column 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-inside-column');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-inside-column');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-inside');
      expect(result?.value).toBe('column');
    });
  });
  
  describe('브레이크 인사이드 스타일 적용', () => {
    it('break-inside-auto 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-inside-auto');
      expect(result.layout?.breakInside).toBe('auto');
    });
    
    it('break-inside-avoid 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-inside-avoid');
      expect(result.layout?.breakInside).toBe('avoid');
    });
    
    it('break-inside-all 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-inside-all');
      expect(result.layout?.breakInside).toBe('all');
    });
    
    it('break-inside-avoid-page 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-inside-avoid-page');
      expect(result.layout?.breakInside).toBe('avoid-page');
    });
    
    it('break-inside-page 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-inside-page');
      expect(result.layout?.breakInside).toBe('page');
    });
    
    it('break-inside-left 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-inside-left');
      expect(result.layout?.breakInside).toBe('left');
    });
    
    it('break-inside-right 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-inside-right');
      expect(result.layout?.breakInside).toBe('right');
    });
    
    it('break-inside-column 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-inside-column');
      expect(result.layout?.breakInside).toBe('column');
    });
    
    it('반응형 break-inside 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:break-inside-column');
      expect(result.breakpoints?.md?.layout?.breakInside).toBe('column');
    });
  });
}); 