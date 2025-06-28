import { describe, it, expect } from 'vitest';
import { createContext } from '../../src/config/context';
import { CssmaConfig } from '../../src/theme-types';

// 샘플 config
const config: CssmaConfig = {
  theme: {
    colors: {
      blue: {
        500: '#0055ff',
      },
      red: {
        100: '#fee2e2',
      },
    },
    fontFamily: {
      sans: 'Inter, sans-serif',
    },
  },
  plugins: [
    ({ addUtilities, theme }) => {
      addUtilities({
        '.skew-10deg': { transform: 'skewY(-10deg)' },
      });
      // theme('colors.blue.500') 사용 가능
    },
  ],
  prefix: 'tw-',
};

describe('CssmaContext 기본 동작', () => {
  it('theme()로 색상 값을 조회할 수 있다', () => {
    const context = createContext(config);
    expect(context.theme('colors.blue.500')).toBe('#0055ff');
    expect(context.theme('colors.red.100')).toBe('#fee2e2');
    expect(context.theme('fontFamily.sans')).toBe('Inter, sans-serif');
  });

  it('config() 함수로 값에 접근할 수 있다', () => {
    const context = createContext(config);
    expect(context.config('prefix')).toBe('tw-');
    expect(context.config('theme.colors.blue.500')).toBe('#0055ff');
    expect(context.config('theme', 'colors', 'blue', 500)).toBe('#0055ff');
  });

  it('plugins 배열이 정상적으로 포함된다', () => {
    const context = createContext(config);
    expect(Array.isArray(context.plugins)).toBe(true);
    expect(context.plugins.length).toBe(1);
    expect(typeof context.plugins[0]).toBe('function');
  });
}); 