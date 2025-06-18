import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 브레이크 비포어(Break After)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('브레이크 비포어 클래스 파싱', () => {
    it('break-before-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-before-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-before-auto');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-before');
      expect(result?.value).toBe('auto');
    });
    
    it('break-before-avoid 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-before-avoid');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-before-avoid');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-before');
      expect(result?.value).toBe('avoid');
    });
    
    it('break-before-all 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-before-all');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-before-all');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-before');
      expect(result?.value).toBe('all');
    });
    
    it('break-before-avoid-page 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-before-avoid-page');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-before-avoid-page');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-before');
      expect(result?.value).toBe('avoid-page');
    });
    
    it('break-before-page 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-before-page');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-before-page');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-before');
      expect(result?.value).toBe('page');
    });
    
    it('break-before-left 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-before-left');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-before-left');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-before');
      expect(result?.value).toBe('left');
    });
    
    it('break-before-right 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-before-right');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-before-right');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-before');
      expect(result?.value).toBe('right');
    });
    
    it('break-before-column 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('break-before-column');
      expect(result).toBeDefined();
      expect(result?.className).toBe('break-before-column');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('break-before');
      expect(result?.value).toBe('column');
    });
  });
  
  describe('브레이크 비포어 스타일 적용', () => {
    it('break-before-auto 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-before-auto');
      expect(result.layout?.breakBefore).toBe('auto');
    });
    
    it('break-before-avoid 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-before-avoid');
      expect(result.layout?.breakBefore).toBe('avoid');
    });
    
    it('break-before-all 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-before-all');
      expect(result.layout?.breakBefore).toBe('all');
    });
    
    it('break-before-avoid-page 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-before-avoid-page');
      expect(result.layout?.breakBefore).toBe('avoid-page');
    });
    
    it('break-before-page 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-before-page');
      expect(result.layout?.breakBefore).toBe('page');
    });
    
    it('break-before-left 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-before-left');
      expect(result.layout?.breakBefore).toBe('left');
    });
    
    it('break-before-right 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-before-right');
      expect(result.layout?.breakBefore).toBe('right');
    });
    
    it('break-before-column 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('break-before-column');
      expect(result.layout?.breakBefore).toBe('column');
    });
    
    it('반응형 break-before 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:break-before-column');
      expect(result.breakpoints?.md?.layout?.breakBefore).toBe('column');
    });
  });
}); 