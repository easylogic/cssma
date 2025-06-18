import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 애스펙트 비율(Aspect Ratio)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('애스펙트 비율 클래스 파싱', () => {
    it('기본 애스펙트 비율 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('aspect-3/2');
      expect(result).toBeDefined();
      expect(result?.className).toBe('aspect-3/2');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('aspect');
      expect(result?.value).toBe('3/2');
    });
    
    it('aspect-square 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('aspect-square');
      expect(result).toBeDefined();
      expect(result?.className).toBe('aspect-square');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('aspect');
      expect(result?.value).toBe('square');
    });
    
    it('aspect-video 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('aspect-video');
      expect(result).toBeDefined();
      expect(result?.className).toBe('aspect-video');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('aspect');
      expect(result?.value).toBe('video');
    });
    
    it('aspect-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('aspect-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('aspect-auto');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('aspect');
      expect(result?.value).toBe('auto');
    });
    
    it('임의 애스펙트 비율 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('aspect-[4/3]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('aspect-[4/3]');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('aspect');
      expect(result?.value).toBe('4/3');
      expect(result?.isArbitrary).toBe(true);
    });
    
    it('CSS 변수를 사용한 애스펙트 비율 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('aspect-(--my-aspect-ratio)');
      expect(result).toBeDefined();
      expect(result?.className).toBe('aspect-(--my-aspect-ratio)');
      expect(result?.category).toBe('layout');
      expect(result?.property).toBe('aspect');
      expect(result?.value).toBe('(--my-aspect-ratio)');
    });
  });
  
  describe('애스펙트 비율 스타일 적용', () => {
    it('기본 애스펙트 비율 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('aspect-3/2');
      expect(result.layout.aspectRatio).toBeDefined();
      expect(result.layout.aspectRatio).toBe('3/2');
    });
    
    it('aspect-square 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('aspect-square');
      expect(result.layout.aspectRatio).toBeDefined();
      expect(result.layout.aspectRatio).toBe('1/1');
    });
    
    it('aspect-video 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('aspect-video');
      expect(result.layout.aspectRatio).toBeDefined();
      expect(result.layout.aspectRatio).toBe('16/9');
    });
    
    it('aspect-auto 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('aspect-auto');
      expect(result.layout.aspectRatio).toBeDefined();
      expect(result.layout.aspectRatio).toBe('auto');
    });
    
    it('임의 애스펙트 비율 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('aspect-[4/3]');
      expect(result.layout.aspectRatio).toBeDefined();
      expect(result.layout.aspectRatio).toBe('4/3');
    });
    
    it('CSS 변수를 사용한 애스펙트 비율 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('aspect-(--my-aspect-ratio)');
      expect(result.layout.aspectRatio).toBeDefined();
      expect(result.layout.aspectRatio).toBe('var(--my-aspect-ratio)');
    });
    
    it('반응형 애스펙트 비율 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:aspect-square');
      expect(result.breakpoints?.md).toBeDefined();
      expect(result.breakpoints?.md.layout?.aspectRatio).toBe('1/1');
    });
  });
}); 