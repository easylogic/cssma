import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 사이징', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('사이징 클래스 파싱', () => {
    it('width 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('w-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('w-4');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('w');
      expect(result?.value).toBe('4');
    });
    
    it('height 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('h-8');
      expect(result).toBeDefined();
      expect(result?.className).toBe('h-8');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('h');
      expect(result?.value).toBe('8');
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
      const result = parser.parseClassName('max-w-lg');
      expect(result).toBeDefined();
      expect(result?.className).toBe('max-w-lg');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('max-w');
      expect(result?.value).toBe('lg');
    });
    
    it('min-height 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('min-h-screen');
      expect(result).toBeDefined();
      expect(result?.className).toBe('min-h-screen');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('min-h');
      expect(result?.value).toBe('screen');
    });
    
    it('max-height 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('max-h-none');
      expect(result).toBeDefined();
      expect(result?.className).toBe('max-h-none');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('max-h');
      expect(result?.value).toBe('none');
    });
    
    it('size 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('size-12');
      expect(result).toBeDefined();
      expect(result?.className).toBe('size-12');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('size');
      expect(result?.value).toBe('12');
    });
    
    it('분수 값을 가진 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('w-1/2');
      expect(result).toBeDefined();
      expect(result?.className).toBe('w-1/2');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('w');
      expect(result?.value).toBe('1/2');
    });
    
    it('임의 값을 가진 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('w-[200px]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('w-[200px]');
      expect(result?.category).toBe('sizing');
      expect(result?.property).toBe('w');
      expect(result?.value).toBe('200px');
    });
  });
  
  describe('사이징 스타일 적용', () => {
    it('width 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('w-4');
      expect(result.sizing.width).toBeDefined();
      expect(result.sizing.width).toBe('1rem');
    });
    
    it('height 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('h-8');
      expect(result.sizing.height).toBeDefined();
      expect(result.sizing.height).toBe('2rem');
    });
    
    it('min-width 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('min-w-full');
      expect(result.sizing.minWidth).toBeDefined();
      expect(result.sizing.minWidth).toBe('100%');
    });
    
    it('max-width 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('max-w-lg');
      expect(result.sizing.maxWidth).toBeDefined();
      expect(result.sizing.maxWidth).toBe('32rem');
    });
    
    it('min-height 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('min-h-screen');
      expect(result.sizing.minHeight).toBeDefined();
      expect(result.sizing.minHeight).toBe('100vh');
    });
    
    it('max-height 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('max-h-none');
      expect(result.sizing.maxHeight).toBeDefined();
      expect(result.sizing.maxHeight).toBe('none');
    });
    
    it('size 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('size-12');
      expect(result.sizing.size).toBeDefined();
      expect(result.sizing.size).toBe('3rem');
    });
    
    it('분수 값을 올바르게 변환할 수 있어야 함', () => {
      const result = parser.parse('w-1/2');
      expect(result.sizing.width).toBeDefined();
      expect(result.sizing.width).toBe('50%');
    });
    
    it('임의 값을 올바르게 적용할 수 있어야 함', () => {
      const result = parser.parse('w-[200px]');
      expect(result.sizing.width).toBeDefined();
      expect(result.sizing.width).toBe('200px');
    });
    
    it('여러 사이징 스타일을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('w-4 h-8 min-w-full max-w-lg');
      expect(result.sizing.width).toBe('1rem');
      expect(result.sizing.height).toBe('2rem');
      expect(result.sizing.minWidth).toBe('100%');
      expect(result.sizing.maxWidth).toBe('32rem');
    });
    
    it('특수 값들을 올바르게 처리할 수 있어야 함', () => {
      const result = parser.parse('w-auto h-full w-screen h-min');
      expect(result.sizing.width).toBe('100vw'); // screen이 마지막 값
      expect(result.sizing.height).toBe('min-content'); // min이 마지막 값
    });
  });
}); 