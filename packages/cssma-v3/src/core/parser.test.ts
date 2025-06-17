import { describe, it, expect } from 'vitest';
import { CSSParser } from './parser';
import { Config, DesignPreset } from '../types';

// 테스트용 설정
const testConfig: Config = {
  version: '3.0.0',
  prefix: '',
  separator: ':',
  important: false,
};

// 테스트용 프리셋
const testPreset: DesignPreset = {
  name: 'test-preset',
  colors: {
    blue: {
      '500': { r: 0.25, g: 0.5, b: 1 },
      '600': { r: 0.2, g: 0.4, b: 0.8 },
    },
    red: {
      '500': { r: 1, g: 0.25, b: 0.25 },
    },
  },
  spacing: {
    '0': 0,
    '1': 4,
    '2': 8,
    '4': 16,
    '8': 32,
  },
  typography: {
    fontSize: {
      'xs': 12,
      'sm': 14,
      'base': 16,
      'lg': 18,
      'xl': 20,
      '2xl': 24,
    },
    fontWeight: {
      'normal': 400,
      'medium': 500,
      'bold': 700,
    },
    fontFamily: {
      'sans': 'ui-sans-serif, system-ui, sans-serif',
      'serif': 'ui-serif, Georgia, serif',
      'mono': 'ui-monospace, monospace',
    },
    letterSpacing: {
      'normal': 0,
      'wide': 0.025,
      'wider': 0.05,
      'widest': 0.1,
    },
    lineHeight: {
      'none': 1,
      'tight': 1.25,
      'normal': 1.5,
      'loose': 2,
    },
  },
  layout: {
    width: {
      'full': '100%',
      'screen': '100vw',
      'auto': 'auto',
    },
    height: {
      'full': '100%',
      'screen': '100vh',
      'auto': 'auto',
    },
    maxWidth: {
      'full': '100%',
      'screen': '100vw',
    },
    maxHeight: {
      'full': '100%',
      'screen': '100vh',
    },
    minWidth: {
      '0': '0',
      'full': '100%',
    },
    minHeight: {
      '0': '0',
      'full': '100%',
    },
  },
  effects: {
    borderRadius: {
      'none': 0,
      'sm': 2,
      'md': 4,
      'lg': 8,
      'full': 9999,
    },
    boxShadow: {
      'sm': { x: 0, y: 1, blur: 2, spread: 0, color: { r: 0, g: 0, b: 0, a: 0.05 } },
      'md': { x: 0, y: 4, blur: 6, spread: -1, color: { r: 0, g: 0, b: 0, a: 0.1 } },
    },
    opacity: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    blur: {
      'none': 0,
      'sm': 4,
      'md': 8,
      'lg': 16,
    },
  },
  animation: {
    presets: {
      'spin': {
        name: 'spin',
        duration: 1000,
        timingFunction: 'linear',
        iterationCount: 'infinite',
        direction: 'normal',
        fillMode: 'none',
        keyframes: [
          { offset: 0, transform: { rotate: '0deg' } },
          { offset: 1, transform: { rotate: '360deg' } },
        ],
      },
      'pulse': {
        name: 'pulse',
        duration: 2000,
        timingFunction: 'ease-in-out',
        iterationCount: 'infinite',
        direction: 'normal',
        fillMode: 'none',
        keyframes: [
          { offset: 0, transform: { scale: 1 } },
          { offset: 0.5, transform: { scale: 1.05 } },
          { offset: 1, transform: { scale: 1 } },
        ],
      },
    },
    durations: {
      '75': 75,
      '100': 100,
      '150': 150,
      '300': 300,
      '500': 500,
      '700': 700,
      '1000': 1000,
    },
    easings: {
      'linear': 'linear',
      'in': 'cubic-bezier(0.4, 0, 1, 1)',
      'out': 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

describe('CSSParser', () => {
  // 파서 인스턴스 생성
  const parser = new CSSParser(testConfig, testPreset);
  
  describe('parse', () => {
    it('빈 문자열을 파싱할 수 있어야 함', () => {
      const result = parser.parse('');
      expect(result.meta.originalClasses).toEqual([]);
      expect(result.meta.originalInput).toBe('');
    });
    
    it('기본 색상 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parse('text-blue-500');
      expect(result.colors.text).toEqual({ r: 0.25, g: 0.5, b: 1 });
    });
    
    it('여러 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parse('text-blue-500 p-4 font-bold');
      expect(result.colors.text).toEqual({ r: 0.25, g: 0.5, b: 1 });
      expect(result.spacing.padding).toEqual({ top: 16, right: 16, bottom: 16, left: 16 });
      expect(result.typography.fontWeight).toBe(700);
    });
    
    it('임의 값을 파싱할 수 있어야 함', () => {
      const result = parser.parse('text-[#FF0000] p-[20px]');
      expect(result.colors.text).toEqual({ r: 1, g: 0, b: 0 });
      expect(result.spacing.padding).toEqual({ top: 20, right: 20, bottom: 20, left: 20 });
    });
    
    it('상태 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parse('hover:text-blue-500');
      expect(result.states?.hover?.colors.text).toEqual({ r: 0.25, g: 0.5, b: 1 });
    });
    
    it('반응형 모디파이어를 파싱할 수 있어야 함', () => {
      const result = parser.parse('md:text-blue-500');
      expect(result.breakpoints?.md?.colors.text).toEqual({ r: 0.25, g: 0.5, b: 1 });
    });
    
    it('상태와 반응형 모디파이어를 함께 파싱할 수 있어야 함', () => {
      const result = parser.parse('md:hover:text-blue-500');
      expect(result.breakpoints?.md?.states?.hover?.colors.text).toEqual({ r: 0.25, g: 0.5, b: 1 });
    });
    
    it('레이아웃 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parse('flex w-full h-screen');
      expect(result.layout.display).toBe('flex');
      expect(result.layout.width).toBe('100%');
      expect(result.layout.height).toBe('100vh');
    });
    
    it('간격 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parse('p-4 mt-8 mx-2');
      expect(result.spacing.padding).toEqual({ top: 16, right: 16, bottom: 16, left: 16 });
      expect(result.spacing.margin).toEqual({ top: 32, left: 8, right: 8 });
    });
    
    it('타이포그래피 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parse('text-lg font-bold tracking-wide leading-tight');
      expect(result.typography.fontSize).toBe(18);
      expect(result.typography.fontWeight).toBe(700);
      expect(result.typography.letterSpacing).toBe(0.025);
      expect(result.typography.lineHeight).toBe(1.25);
    });
    
    it('효과 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parse('rounded-lg shadow-md opacity-50 blur-sm');
      expect(result.effects.borderRadius).toBe(8);
      expect(result.effects.boxShadow).toEqual([{ x: 0, y: 4, blur: 6, spread: -1, color: { r: 0, g: 0, b: 0, a: 0.1 } }]);
      expect(result.effects.opacity).toBe(0.5);
      expect(result.effects.blur).toBe(4);
    });
    
    it('애니메이션 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parse('animate-spin duration-1000 ease-linear');
      expect(result.animation.name).toBe('spin');
      expect(result.animation.duration).toBe(1000);
      expect(result.animation.timingFunction).toBe('linear');
    });
    
    it('위치 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parse('absolute top-0 left-4 z-10');
      expect(result.position.position).toBe('absolute');
      expect(result.position.top).toBe(0);
      expect(result.position.left).toBe(16);
      expect(result.position.zIndex).toBe(10);
    });
    
    it('변형 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parse('scale-150 rotate-45 translate-x-4');
      expect(result.transform.scale).toBe(1.5);
      expect(result.transform.rotate).toBe('45');
      expect(result.transform.translateX).toBe('4');
    });
    
    it('복잡한 클래스 조합을 파싱할 수 있어야 함', () => {
      const result = parser.parse('flex p-4 text-blue-500 hover:bg-red-500 md:text-lg rounded-lg shadow-md');
      
      // 기본 스타일
      expect(result.layout.display).toBe('flex');
      expect(result.spacing.padding).toEqual({ top: 16, right: 16, bottom: 16, left: 16 });
      expect(result.colors.text).toEqual({ r: 0.25, g: 0.5, b: 1 });
      expect(result.effects.borderRadius).toBe(8);
      expect(result.effects.boxShadow).toEqual([{ x: 0, y: 4, blur: 6, spread: -1, color: { r: 0, g: 0, b: 0, a: 0.1 } }]);
      
      // 상태 스타일
      expect(result.states?.hover?.colors.bg).toEqual({ r: 1, g: 0.25, b: 0.25 });
      
      // 반응형 스타일
      expect(result.breakpoints?.md?.typography.fontSize).toBe(18);
    });
  });
  
  describe('parseClassName', () => {
    it('색상 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('text-blue-500');
      expect(result).toEqual({
        className: 'text-blue-500',
        category: 'colors',
        property: 'text',
        value: 'blue-500',
        isArbitrary: false,
      });
    });
    
    it('간격 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('p-4');
      expect(result).toEqual({
        className: 'p-4',
        category: 'spacing',
        property: 'p',
        value: '4',
        isArbitrary: false,
      });
    });
    
    it('임의 값 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('text-[#FF0000]');
      expect(result).toEqual({
        className: 'text-[#FF0000]',
        category: 'colors',
        property: 'text',
        value: '#FF0000',
        isArbitrary: true,
      });
    });
    
    it('상태 모디파이어가 있는 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('hover:text-blue-500');
      expect(result).toEqual({
        className: 'hover:text-blue-500',
        category: 'colors',
        property: 'text',
        value: 'blue-500',
        isArbitrary: false,
        modifier: 'hover',
      });
    });
    
    it('반응형 모디파이어가 있는 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:text-blue-500');
      expect(result).toEqual({
        className: 'md:text-blue-500',
        category: 'colors',
        property: 'text',
        value: 'blue-500',
        isArbitrary: false,
        breakpoint: 'md',
      });
    });
    
    it('단일 값 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('flex');
      expect(result).toEqual({
        className: 'flex',
        category: 'layout',
        property: 'flex',
        value: '',
        isArbitrary: false,
      });
    });
  });
}); 