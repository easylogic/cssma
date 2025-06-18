import { describe, it, expect } from "vitest";
import { CSSConverter } from '../src/core/converter';
import { loadConfig, loadPreset } from '../src/config';
import { ParsedClass, ParsedStyles } from '../src/types';

describe('CSSConverter', () => {
  const converter = new CSSConverter(loadConfig(), loadPreset());
  
  describe('기본 기능', () => {
    it('인스턴스가 생성되어야 함', () => {
      expect(converter).toBeInstanceOf(CSSConverter);
    });
  });
  
  describe('스타일 변환', () => {
    it('파싱된 스타일을 CSS 객체로 변환할 수 있어야 함', () => {
      const parsedStyles: ParsedStyles = {
        colors: {
          text: { r: 0.25, g: 0.5, b: 1 },
          bg: { r: 1, g: 1, b: 1 },
        },
        spacing: {
          padding: { top: 16, right: 16, bottom: 16, left: 16 },
          margin: { top: 8 },
        },
        typography: {
          fontSize: 18,
          fontWeight: 700,
        },
        layout: {
          display: 'flex',
          width: '100%',
        },
        effects: {
          borderRadius: 8,
          opacity: 0.5,
        },
        animation: {
          name: 'spin',
          duration: 1000,
          timingFunction: 'linear',
        },
        position: {},
        transform: {},
        meta: {
          originalClasses: ['text-blue-500', 'bg-white', 'p-4', 'mt-2', 'text-lg', 'font-bold', 'flex', 'w-full', 'rounded-lg', 'opacity-50', 'animate-spin'],
          originalInput: 'text-blue-500 bg-white p-4 mt-2 text-lg font-bold flex w-full rounded-lg opacity-50 animate-spin',
        },
      };
      
      const cssObject = converter.toCSSObject(parsedStyles);
      
      expect(cssObject).toBeDefined();
      expect(cssObject.color).toBe('rgb(64, 128, 255)');
      expect(cssObject.backgroundColor).toBe('rgb(255, 255, 255)');
      expect(cssObject.padding).toBe('16px');
      expect(cssObject.marginTop).toBe('8px');
      expect(cssObject.fontSize).toBe('18px');
      expect(cssObject.fontWeight).toBe(700);
      expect(cssObject.display).toBe('flex');
      expect(cssObject.width).toBe('100%');
      expect(cssObject.borderRadius).toBe('8px');
      expect(cssObject.opacity).toBe(0.5);
      expect(cssObject.animation).toContain('spin');
      expect(cssObject.animation).toContain('1000ms');
      expect(cssObject.animation).toContain('linear');
    });
    
    it('CSS 객체를 CSS 문자열로 변환할 수 있어야 함', () => {
      const cssObject = {
        color: 'rgb(64, 128, 255)',
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '16px',
        marginTop: '8px',
        fontSize: '18px',
        fontWeight: 700,
        display: 'flex',
        width: '100%',
        borderRadius: '8px',
        opacity: 0.5,
        animation: 'spin 1000ms linear infinite',
      };
      
      const cssString = converter.toCSSString(cssObject);
      
      expect(cssString).toContain('color: rgb(64, 128, 255);');
      expect(cssString).toContain('background-color: rgb(255, 255, 255);');
      expect(cssString).toContain('padding: 16px;');
      expect(cssString).toContain('margin-top: 8px;');
      expect(cssString).toContain('font-size: 18px;');
      expect(cssString).toContain('font-weight: 700;');
      expect(cssString).toContain('display: flex;');
      expect(cssString).toContain('width: 100%;');
      expect(cssString).toContain('border-radius: 8px;');
      expect(cssString).toContain('opacity: 0.5;');
      expect(cssString).toContain('animation: spin 1000ms linear infinite;');
    });
  });
  
  describe('Figma 스타일 변환', () => {
    it('파싱된 스타일을 Figma 스타일 객체로 변환할 수 있어야 함', () => {
      const parsedStyles: ParsedStyles = {
        colors: {
          text: { r: 0.25, g: 0.5, b: 1 },
          bg: { r: 1, g: 1, b: 1 },
        },
        spacing: {
          padding: { top: 16, right: 16, bottom: 16, left: 16 },
        },
        typography: {
          fontSize: 18,
          fontWeight: 700,
        },
        layout: {
          display: 'flex',
        },
        effects: {
          borderRadius: 8,
        },
        animation: {},
        position: {},
        transform: {},
        meta: {
          originalClasses: ['text-blue-500', 'bg-white', 'p-4', 'text-lg', 'font-bold', 'flex', 'rounded-lg'],
          originalInput: 'text-blue-500 bg-white p-4 text-lg font-bold flex rounded-lg',
        },
      };
      
      const figmaStyles = converter.toFigmaStyles(parsedStyles);
      
      expect(figmaStyles).toBeDefined();
      expect(figmaStyles.fills).toBeDefined();
      expect(figmaStyles.fills[0].color).toEqual({ r: 1, g: 1, b: 1 });
      expect(figmaStyles.strokes).toBeDefined();
      expect(figmaStyles.strokeWeight).toBeDefined();
      expect(figmaStyles.cornerRadius).toBe(8);
      expect(figmaStyles.paddingTop).toBe(16);
      expect(figmaStyles.paddingRight).toBe(16);
      expect(figmaStyles.paddingBottom).toBe(16);
      expect(figmaStyles.paddingLeft).toBe(16);
      expect(figmaStyles.fontSize).toBe(18);
      expect(figmaStyles.fontWeight).toBe(700);
      expect(figmaStyles.textFill).toBeDefined();
      expect(figmaStyles.textFill[0].color).toEqual({ r: 0.25, g: 0.5, b: 1 });
    });
  });
  
  describe('React 스타일 변환', () => {
    it('파싱된 스타일을 React 스타일 객체로 변환할 수 있어야 함', () => {
      const parsedStyles: ParsedStyles = {
        colors: {
          text: { r: 0.25, g: 0.5, b: 1 },
          bg: { r: 1, g: 1, b: 1 },
        },
        spacing: {
          padding: { top: 16, right: 16, bottom: 16, left: 16 },
          margin: { top: 8 },
        },
        typography: {
          fontSize: 18,
          fontWeight: 700,
        },
        layout: {
          display: 'flex',
          width: '100%',
        },
        effects: {
          borderRadius: 8,
          opacity: 0.5,
        },
        animation: {},
        position: {},
        transform: {},
        meta: {
          originalClasses: ['text-blue-500', 'bg-white', 'p-4', 'mt-2', 'text-lg', 'font-bold', 'flex', 'w-full', 'rounded-lg', 'opacity-50'],
          originalInput: 'text-blue-500 bg-white p-4 mt-2 text-lg font-bold flex w-full rounded-lg opacity-50',
        },
      };
      
      const reactStyles = converter.toReactStyles(parsedStyles);
      
      expect(reactStyles).toBeDefined();
      expect(reactStyles.color).toBe('rgb(64, 128, 255)');
      expect(reactStyles.backgroundColor).toBe('rgb(255, 255, 255)');
      expect(reactStyles.padding).toBe(16);
      expect(reactStyles.marginTop).toBe(8);
      expect(reactStyles.fontSize).toBe(18);
      expect(reactStyles.fontWeight).toBe(700);
      expect(reactStyles.display).toBe('flex');
      expect(reactStyles.width).toBe('100%');
      expect(reactStyles.borderRadius).toBe(8);
      expect(reactStyles.opacity).toBe(0.5);
    });
  });
});
