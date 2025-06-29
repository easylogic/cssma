import { CssmaContext } from './../../src/theme-types';
import { describe, it, expect } from 'vitest';
import { parseAccentColor } from '../../src/parser/utilities/accentColor';
import { theme as themeGetter } from '../../src/config/theme-getter';
import { createContext } from '../../src/config/context';
import { defaultConfig } from '../../src/config/defaults';

// Mock context
const mockThemeObj = {
  colors: {
    red: { 500: "#f00" },
    blue: { 200: "#00f" },
    rose: { 500: "#ff007f" },
    black: "#000",
    white: "#fff",
    transparent: "transparent",
    inherit: "inherit",
    current: "currentColor"
  }
};
const mockContext: CssmaContext = { 
  theme: (...args: any[]) => themeGetter(mockThemeObj, ...args),
  config: () => {},
  plugins: []
};
const defaultCtx = createContext(defaultConfig);

describe('parseAccentColor (mock context)', () => {
  it('parses special accent color keywords', () => {
    expect(parseAccentColor('accent-inherit', mockContext)).toEqual({
      type: 'accent-color', value: 'inherit', raw: 'accent-inherit', arbitrary: false, customProperty: false, preset: 'colors.inherit'
    });
    expect(parseAccentColor('accent-current', mockContext)).toEqual({
      type: 'accent-color', value: 'current', raw: 'accent-current', arbitrary: false, customProperty: false, preset: 'colors.current'
    });
    expect(parseAccentColor('accent-transparent', mockContext)).toEqual({
      type: 'accent-color', value: 'transparent', raw: 'accent-transparent', arbitrary: false, customProperty: false, preset: 'colors.transparent'
    });
    expect(parseAccentColor('accent-black', mockContext)).toEqual({
      type: 'accent-color', value: 'black', raw: 'accent-black', arbitrary: false, customProperty: false, preset: 'colors.black'
    });
    expect(parseAccentColor('accent-white', mockContext)).toEqual({
      type: 'accent-color', value: 'white', raw: 'accent-white', arbitrary: false, customProperty: false, preset: 'colors.white'
    });
  });
  it('parses palette accent color', () => {
    expect(parseAccentColor('accent-red-500', mockContext)).toEqual({
      type: 'accent-color', value: 'red-500', raw: 'accent-red-500', arbitrary: false, customProperty: false, preset: 'colors.red.500'
    });
    expect(parseAccentColor('accent-blue-200', mockContext)).toEqual({
      type: 'accent-color', value: 'blue-200', raw: 'accent-blue-200', arbitrary: false, customProperty: false, preset: 'colors.blue.200'
    });
    expect(parseAccentColor('accent-rose-500/75', mockContext)).toEqual({
      type: 'accent-color', value: 'rose-500', raw: 'accent-rose-500/75', arbitrary: false, customProperty: false, preset: 'colors.rose.500', opacity: 75
    });
  });
  it('parses custom property', () => {
    expect(parseAccentColor('accent-(--my-accent-color)', mockContext)).toEqual({
      type: 'accent-color', value: '--my-accent-color', raw: 'accent-(--my-accent-color)', arbitrary: true, customProperty: true
    });
    expect(parseAccentColor('accent-(--my-accent-color)/25', mockContext)).toBeNull();
  });
  it('parses arbitrary value', () => {
    expect(parseAccentColor('accent-[#50d71e]', mockContext)).toEqual({
      type: 'accent-color', value: '#50d71e', raw: 'accent-[#50d71e]', arbitrary: true, customProperty: false
    });
    expect(parseAccentColor('accent-[#50d71e]/80', mockContext)).toEqual({
      type: 'accent-color', value: '#50d71e', raw: 'accent-[#50d71e]/80', arbitrary: true, customProperty: false, opacity: 80
    });
  });
  it('returns null for invalid input', () => {
    expect(parseAccentColor('accent-', mockContext)).toBeNull();
    expect(parseAccentColor('accent-foo', mockContext)).toBeNull();
    expect(parseAccentColor('accent-red', mockContext)).toBeNull();
    expect(parseAccentColor('accent-red-', mockContext)).toBeNull();
    expect(parseAccentColor('accent-red-500/', mockContext)).toBeNull();
    expect(parseAccentColor('accent-()', mockContext)).toBeNull();
    expect(parseAccentColor('accent-[]', mockContext)).toBeNull();
    expect(parseAccentColor('accent-(foo)', mockContext)).toBeNull();
    expect(parseAccentColor('accent-[foo]', mockContext)).toBeNull();
  });
});

describe('parseAccentColor (defaultConfig context)', () => {
  it('parses Tailwind palette color', () => {
    expect(parseAccentColor('accent-red-500', defaultCtx)).toEqual({
      type: 'accent-color', value: 'red-500', raw: 'accent-red-500', arbitrary: false, customProperty: false, preset: 'colors.red.500'
    });
  });
  it('returns null for invalid value', () => {
    expect(parseAccentColor('accent-foo', defaultCtx)).toBeNull();
    expect(parseAccentColor('accent-red-999', defaultCtx)).toBeNull();
  });
}); 