import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 색상', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('색상 클래스 파싱', () => {
    it('단일 색상 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('text-blue-500');
      expect(result?.category).toBe('colors');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('blue-500');
    });
    
    it('배경 색상 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('bg-red-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('bg-red-500');
      expect(result?.category).toBe('colors');
      expect(result?.property).toBe('bg');
      expect(result?.value).toBe('red-500');
    });
    
    it('테두리 색상 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('border-green-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('border-green-500');
      expect(result?.category).toBe('colors');
      expect(result?.property).toBe('border-green');
      expect(result?.value).toBe('500');
    });
  });
  
  describe('임의 색상 값', () => {
    it('HEX 색상 값을 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('text-[#FF0000]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('text-[#FF0000]');
      expect(result?.category).toBe('colors');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('#FF0000');
      expect(result?.isArbitrary).toBe(true);
    });
    
    it('RGB 색상 값을 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('bg-[rgb(255,0,0)]');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('bg-[rgb(255,0,0)]');
      expect(result?.category).toBe('backgrounds');
      expect(result?.property).toBe('bg');
      expect(result?.value).toBe('rgb(255,0,0)');
    });
    
    it('RGBA 색상 값을 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('bg-[rgba(255,0,0,0.5)]');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('bg-[rgba(255,0,0,0.5)]');
      expect(result?.category).toBe('backgrounds');
      expect(result?.property).toBe('bg');
      expect(result?.value).toBe('rgba(255,0,0,0.5)');
    });
  });
  
  describe('색상 스타일 적용', () => {
    it('텍스트 색상 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('text-blue-500');
      expect(result.colors.text).toBeDefined();
      expect(result.colors.text?.r).toBeCloseTo(0.25);
      expect(result.colors.text?.g).toBeCloseTo(0.53);
      expect(result.colors.text?.b).toBeCloseTo(0.94);
    });
    
    it('배경 색상 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('bg-red-500');
      expect(result.backgrounds?.backgroundColor).toBeDefined();
    });
    
    it('임의 색상 값 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('text-[#FF0000]');
      expect(result.colors.text).toBeDefined();
      expect(result.colors.text?.r).toBe(1);
      expect(result.colors.text?.g).toBe(0);
      expect(result.colors.text?.b).toBe(0);
    });
  });
}); 