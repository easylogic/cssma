import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 위치 및 변형', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('위치 클래스 파싱', () => {
    it('position 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('absolute');
      expect(result).toBeDefined();
      expect(result?.className).toBe('absolute');
      expect(result?.category).toBe('position');
      expect(result?.property).toBe('absolute');
    });
    
    it('top/right/bottom/left 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('top-0');
      expect(result).toBeDefined();
      expect(result?.className).toBe('top-0');
      expect(result?.category).toBe('position');
      expect(result?.property).toBe('top');
      expect(result?.value).toBe('0');
    });
    
    it('z-index 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('z-10');
      expect(result).toBeDefined();
      expect(result?.className).toBe('z-10');
      expect(result?.category).toBe('position');
      expect(result?.property).toBe('z');
      expect(result?.value).toBe('10');
    });
  });
  
  describe('변형 클래스 파싱', () => {
    it('rotate 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('rotate-45');
      expect(result).toBeDefined();
      expect(result?.className).toBe('rotate-45');
      expect(result?.category).toBe('transform');
      expect(result?.property).toBe('rotate');
      expect(result?.value).toBe('45');
    });
    
    it('scale 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('scale-150');
      expect(result).toBeDefined();
      expect(result?.className).toBe('scale-150');
      expect(result?.category).toBe('transform');
      expect(result?.property).toBe('scale');
      expect(result?.value).toBe('150');
    });
    
    it('translate 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('translate-x-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('translate-x-4');
      expect(result?.category).toBe('transform');
      expect(result?.property).toBe('translate-x');
      expect(result?.value).toBe('4');
    });
    
    it('skew 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('skew-y-6');
      expect(result).toBeDefined();
      expect(result?.className).toBe('skew-y-6');
      expect(result?.category).toBe('transform');
      expect(result?.property).toBe('skew-y');
      expect(result?.value).toBe('6');
    });
  });
  
  describe('위치 스타일 적용', () => {
    it('position 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('absolute');
      expect(result.position.type).toBeDefined();
      expect(result.position.type).toBe('absolute');
    });
    
    it('top/right/bottom/left 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('top-0 right-0 bottom-0 left-0');
      expect(result.position.top).toBe(0);
      expect(result.position.right).toBe(0);
      expect(result.position.bottom).toBe(0);
      expect(result.position.left).toBe(0);
    });
    
    it('z-index 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('z-10');
      expect(result.position.zIndex).toBeDefined();
      expect(result.position.zIndex).toBe(10);
    });
    
    it('여러 위치 스타일을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('absolute top-0 left-0 z-10');
      expect(result.position.type).toBe('absolute');
      expect(result.position.top).toBe(0);
      expect(result.position.left).toBe(0);
      expect(result.position.zIndex).toBe(10);
    });
  });
  
  describe('변형 스타일 적용', () => {
    it('rotate 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('rotate-45');
      expect(result.transform.rotate).toBeDefined();
      expect(result.transform.rotate).toBe(45);
    });
    
    it('scale 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('scale-150');
      expect(result.transform.scale).toBeDefined();
      expect(result.transform.scale).toBe(1.5);
    });
    
    it('translate 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('translate-x-4');
      expect(result.transform.translateX).toBeDefined();
      expect(result.transform.translateX).toBe(16);
    });
    
    it('skew 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('skew-y-6');
      expect(result.transform.skewY).toBeDefined();
      expect(result.transform.skewY).toBe(6);
    });
    
    it('여러 변형 스타일을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('rotate-45 scale-150 translate-x-4');
      expect(result.transform.rotate).toBe(45);
      expect(result.transform.scale).toBe(1.5);
      expect(result.transform.translateX).toBe(16);
    });
    
    it('임의 변형 값을 적용할 수 있어야 함', () => {
      const result = parser.parse('rotate-[30deg]');
      expect(result.transform.rotate).toBe(30);
    });
  });
}); 