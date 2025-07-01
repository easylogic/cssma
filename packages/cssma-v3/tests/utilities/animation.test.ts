import type { CssmaContext, CssmaTheme } from '../../src/types';
import { describe, it, expect } from 'vitest';
import { parseAnimation } from '../../src/parser/utilities/animation';
import { createContext } from '../../src/config/context';
import { defaultConfig } from '../../src/config/defaults';
import { theme as themeGetter } from '../../src/config/theme-getter';

// --- Mock context 단위 테스트 ---
const mockThemeObj: CssmaTheme = {
  animation: {
    spin: 'spin 1s linear infinite',
    ping: 'ping 1s cubic-bezier(0,0,0.2,1) infinite',
    pulse: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
    bounce: 'bounce 1s infinite',
    none: 'none',
    custom: 'wiggle 2s ease-in-out infinite',
  }
};

const mockContext: CssmaContext = {
  theme: (...args: any[]) => themeGetter(mockThemeObj, ...args),
  config: () => {},
  plugins: []
};

// --- defaultConfig + createContext 통합 테스트 ---
const defaultCtx = createContext(defaultConfig);

describe('parseAnimation (mock context)', () => {
  it('parses animate-<preset>', () => {
    expect(parseAnimation('animate-spin', mockContext)).toEqual({
      type: 'animation',
      value: 'spin',
      raw: 'animate-spin',
      arbitrary: false,
      customProperty: false,
      preset: 'animation.spin',
    });
    expect(parseAnimation('animate-ping', mockContext)).toEqual({
      type: 'animation',
      value: 'ping',
      raw: 'animate-ping',
      arbitrary: false,
      customProperty: false,
      preset: 'animation.ping',
    });
    expect(parseAnimation('animate-none', mockContext)).toEqual({
      type: 'animation',
      value: 'none',
      raw: 'animate-none',
      arbitrary: false,
      customProperty: false,
      preset: 'animation.none',
    });
    expect(parseAnimation('animate-custom', mockContext)).toEqual({
      type: 'animation',
      value: 'wiggle 2s ease-in-out infinite',
      raw: 'animate-custom',
      arbitrary: false,
      customProperty: false,
      preset: 'animation.custom',
    });
  });
  it('parses animate-(<custom-property>)', () => {
    expect(parseAnimation('animate-(--my-animation)', mockContext)).toEqual({
      type: 'animation',
      value: 'var(--my-animation)',
      raw: 'animate-(--my-animation)',
      arbitrary: false,
      customProperty: true,
    });
  });
  it('parses animate-[<arbitrary>]', () => {
    expect(parseAnimation('animate-[wiggle_1s_ease-in-out_infinite]', mockContext)).toEqual({
      type: 'animation',
      value: 'wiggle_1s_ease-in-out_infinite',
      raw: 'animate-[wiggle_1s_ease-in-out_infinite]',
      arbitrary: true,
      customProperty: false,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseAnimation('animate-foo', mockContext)).toBeNull();
    expect(parseAnimation('animate-', mockContext)).toBeNull();
    expect(parseAnimation('animate-[]', mockContext)).toBeNull();
    expect(parseAnimation('animate-()', mockContext)).toBeNull();
  });
});

describe('parseAnimation (defaultConfig context)', () => {
  it('parses animate-spin', () => {
    expect(parseAnimation('animate-spin', defaultCtx)).toEqual({
      type: 'animation',
      value: 'spin',
      raw: 'animate-spin',
      arbitrary: false,
      customProperty: false,
      preset: 'animation.spin',
    });
  });
  it('returns null for invalid input', () => {
    expect(parseAnimation('animate-foo', defaultCtx)).toBeNull();
    expect(parseAnimation('animate-[notfound]', defaultCtx)).toEqual({
      type: 'animation',
      value: 'notfound',
      raw: 'animate-[notfound]',
      arbitrary: true,
      customProperty: false,
    });
  });
}); 