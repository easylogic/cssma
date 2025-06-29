import { CssmaContext } from './../../src/theme-types';
import { describe, it, expect } from 'vitest';
import { parseBackgroundColor } from '../../src/parser/utilities/backgroundColor';
import { theme as themeGetter } from '../../src/config/theme-getter';
import { createContext } from '../../src/config/context';
import { defaultConfig } from '../../src/config/defaults';

// Mock context
const mockThemeObj = {
  colors: {
    red: { 500: "#f00" },
    blue: { 200: "#00f" },
    primary: "#123456",
    rose: { 500: "#f33" },
    pink: { 200: "#f9c" },
    indigo: { 500: "#33f" }
  }
};
const mockContext: CssmaContext = { 
  theme: (...args: any[]) => themeGetter(mockThemeObj, ...args),
  config: () => {},
  plugins: []
};
const defaultCtx = createContext(defaultConfig);

describe('parseBackgroundColor (mock context)', () => {
  it('parses bg-red-500', () => {
    expect(parseBackgroundColor('bg-red-500', mockContext)).toEqual({
      type: 'background-color',
      value: 'red-500',
      raw: 'bg-red-500',
      arbitrary: false,
      customProperty: false,
      preset: 'colors.red.500'
    });
  });
  it('parses bg-blue-200/50', () => {
    expect(parseBackgroundColor('bg-blue-200/50', mockContext)).toEqual({
      type: 'background-color',
      value: 'blue-200',
      raw: 'bg-blue-200/50',
      arbitrary: false,
      customProperty: false,
      preset: 'colors.blue.200',
      opacity: 50
    });
  });
  it('parses bg-(--my-bg)', () => {
    expect(parseBackgroundColor('bg-(--my-bg)', mockContext)).toEqual({
      type: 'background-color',
      value: '--my-bg',
      raw: 'bg-(--my-bg)',
      arbitrary: true,
      customProperty: true
    });
  });
  it('parses bg-[rgba(0,0,0,0.5)]', () => {
    expect(parseBackgroundColor('bg-[rgba(0,0,0,0.5)]', mockContext)).toEqual({
      type: 'background-color',
      value: 'rgba(0,0,0,0.5)',
      raw: 'bg-[rgba(0,0,0,0.5)]',
      arbitrary: true,
      customProperty: false
    });
  });
  it('returns null for invalid value', () => {
    expect(parseBackgroundColor('bg-foo', mockContext)).toBeNull();
  });
});

describe('parseBackgroundColor (defaultConfig context)', () => {
  it('parses Tailwind palette color', () => {
    expect(parseBackgroundColor('bg-red-500', defaultCtx)).toEqual({
      type: 'background-color',
      value: 'red-500',
      raw: 'bg-red-500',
      arbitrary: false,
      customProperty: false,
      preset: 'colors.red.500'
    });
  });
  it('returns null for invalid value', () => {
    expect(parseBackgroundColor('bg-foo', defaultCtx)).toBeNull();
  });
});

describe('parseBackgroundColor', () => {
  it('returns null for empty value (bg-)', () => {
    expect(parseBackgroundColor('bg-')).toBeNull();
  });

  it('returns null for similar but invalid (bg-red-500x)', () => {
    expect(parseBackgroundColor('bg-red-500x', mockContext)).toBeNull();
  });

  it('returns null for malformed custom property', () => {
    expect(parseBackgroundColor('bg-(my-bg)', mockContext)).toBeNull();
  });

  it('returns null for malformed arbitrary', () => {
    expect(parseBackgroundColor('bg-[]', mockContext)).toBeNull();
  });
}); 