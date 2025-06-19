import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 플로트(Float)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('플로트 클래스 파싱', () => {
    it('float-left 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('float-left');
      expect(result).toBeDefined();
      expect(result?.className).toBe('float-left');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('float');
      expect(result?.value).toBe('left');
    });
    
    it('float-right 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('float-right');
      expect(result).toBeDefined();
      expect(result?.className).toBe('float-right');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('float');
      expect(result?.value).toBe('right');
    });
    
    it('float-none 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('float-none');
      expect(result).toBeDefined();
      expect(result?.className).toBe('float-none');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('float');
      expect(result?.value).toBe('none');
    });
    
    it('float-start 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('float-start');
      expect(result).toBeDefined();
      expect(result?.className).toBe('float-start');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('float');
      expect(result?.value).toBe('start');
    });
    
    it('float-end 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('float-end');
      expect(result).toBeDefined();
      expect(result?.className).toBe('float-end');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('float');
      expect(result?.value).toBe('end');
    });
  });
  
  describe('플로트 스타일 적용', () => {
    it('float-left 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('float-left');
      expect(result.layout?.float).toBe('left');
    });
    
    it('float-right 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('float-right');
      expect(result.layout?.float).toBe('right');
    });
    
    it('float-none 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('float-none');
      expect(result.layout?.float).toBe('none');
    });
    
    it('float-start는 inline-start로 변환되어야 함', () => {
      const result = parser.parse('float-start');
      expect(result.layout?.float).toBe('inline-start');
    });
    
    it('float-end는 inline-end로 변환되어야 함', () => {
      const result = parser.parse('float-end');
      expect(result.layout?.float).toBe('inline-end');
    });
    
    it('반응형 float 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:float-left');
      expect(result.breakpoints?.md?.layout?.float).toBe('left');
    });
  });
}); 