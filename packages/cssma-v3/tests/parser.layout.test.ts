import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 레이아웃', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('레이아웃 클래스 파싱', () => {
    it('flex 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('flex');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('flex');
      expect(result?.category).toBe('flexbox-grid');
      expect(result?.property).toBe('flex');
    });
    
    it('grid 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('grid');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('grid');
      expect(result?.category).toBe('flexbox-grid');
      expect(result?.property).toBe('grid');
    });
    
    it('block 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('block');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('block');
      expect(result?.category).toBe('flexbox-grid');
      expect(result?.property).toBe('block');
    });
    
    it('width 클래스를 파싱할 수 있어야 함 (sizing 카테고리)', () => {
      const result = parser.parseClassName('w-full');
      expect(result).toBeDefined();
      expect(result?.className).toBe('w-full');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('w');
      expect(result?.value).toBe('full');
    });
    
    it('height 클래스를 파싱할 수 있어야 함 (sizing 카테고리)', () => {
      const result = parser.parseClassName('h-screen');
      expect(result).toBeDefined();
      expect(result?.className).toBe('h-screen');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('h');
      expect(result?.value).toBe('screen');
    });
    
    it('min-width 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('min-w-full');
      expect(result).toBeDefined();
      expect(result?.className).toBe('min-w-full');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('min-w');
      expect(result?.value).toBe('full');
    });
    
    it('max-width 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('max-w-screen-lg');
      expect(result).toBeDefined();
      expect(result?.className).toBe('max-w-screen-lg');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('max-w');
      expect(result?.value).toBe('screen-lg');
    });
  });
  
  describe('레이아웃 스타일 적용', () => {
    it('display 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('flex');
      expect(result.flexboxGrid.display).toBeDefined();
      expect(result.flexboxGrid.display).toBe('flex');
    });
    
    it('width 스타일을 적용할 수 있어야 함 (sizing 카테고리)', () => {
      const result = parser.parse('w-full');
      expect(result.sizing.width).toBeDefined();
      expect(result.sizing.width).toBe('100%');
    });
    
    it('height 스타일을 적용할 수 있어야 함 (sizing 카테고리)', () => {
      const result = parser.parse('h-screen');
      expect(result.sizing.height).toBeDefined();
      expect(result.sizing.height).toBe('100vh');
    });
    
    it('여러 레이아웃 스타일을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('flex w-full h-screen');
      expect(result.flexboxGrid.display).toBe('flex');
      expect(result.sizing.width).toBe('100%');
      expect(result.sizing.height).toBe('100vh');
    });
  });
}); 