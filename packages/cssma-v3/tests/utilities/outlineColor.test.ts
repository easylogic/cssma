import { CssmaContext } from './../../src/theme-types';
import { describe, it, expect } from 'vitest';
import { parseOutline } from '../../src/parser/utilities/outline';
import { theme as themeGetter } from '../../src/config/theme-getter';
import { createContext } from '../../src/config/context';
import { defaultConfig } from '../../src/config/defaults';

// Mock context
const mockThemeObj = {
  colors: {
    red: { 500: "#f00" },
    blue: { 200: "#00f" },
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

describe('parseOutlineColor (mock context)', () => {
  it('parses special outline color keywords', () => {
    expect(parseOutline('outline-black', mockContext)).toEqual({
      type: 'outline-color', value: 'black', raw: 'outline-black', arbitrary: false, customProperty: false, preset: 'colors.black'
    });
    expect(parseOutline('outline-white', mockContext)).toEqual({
      type: 'outline-color', value: 'white', raw: 'outline-white', arbitrary: false, customProperty: false, preset: 'colors.white'
    });
    expect(parseOutline('outline-inherit', mockContext)).toEqual({
      type: 'outline-color', value: 'inherit', raw: 'outline-inherit', arbitrary: false, customProperty: false, preset: 'colors.inherit'
    });
    expect(parseOutline('outline-current', mockContext)).toEqual({
      type: 'outline-color', value: 'current', raw: 'outline-current', arbitrary: false, customProperty: false, preset: 'colors.current'
    });
    expect(parseOutline('outline-transparent', mockContext)).toEqual({
      type: 'outline-color', value: 'transparent', raw: 'outline-transparent', arbitrary: false, customProperty: false, preset: 'colors.transparent'
    });
  });
  it('parses palette outline color', () => {
    expect(parseOutline('outline-red-500', mockContext)).toEqual({
      type: 'outline-color', value: 'red-500', raw: 'outline-red-500', arbitrary: false, customProperty: false, preset: 'colors.red.500'
    });
    expect(parseOutline('outline-blue-200/75', mockContext)).toEqual({
      type: 'outline-color', value: 'blue-200', raw: 'outline-blue-200/75', arbitrary: false, customProperty: false, preset: 'colors.blue.200', opacity: 75
    });
  });
  it('parses custom property', () => {
    expect(parseOutline('outline-(--my-outline-color)', mockContext)).toEqual({
      type: 'outline-color', value: '--my-outline-color', raw: 'outline-(--my-outline-color)', arbitrary: true, customProperty: true
    });
  });
  it('parses arbitrary value', () => {
    expect(parseOutline('outline-[#243c5a]', mockContext)).toEqual({
      type: 'outline-color', value: '#243c5a', raw: 'outline-[#243c5a]', arbitrary: true, customProperty: false
    });
  });
  it('returns null for invalid input', () => {
    expect(parseOutline('outline-foo', mockContext)).toBeNull();
    expect(parseOutline('outline-', mockContext)).toBeNull();
    expect(parseOutline('outline-[]', mockContext)).toBeNull();
    expect(parseOutline('outline-()', mockContext)).toBeNull();
    expect(parseOutline('outline-red-999', mockContext)).toBeNull();
  });
});

describe('parseOutlineColor (defaultConfig context)', () => {
  it('parses Tailwind palette color', () => {
    expect(parseOutline('outline-red-500', defaultCtx)).toEqual({
      type: 'outline-color', value: 'red-500', raw: 'outline-red-500', arbitrary: false, customProperty: false, preset: 'colors.red.500'
    });
  });
  it('returns null for invalid value', () => {
    expect(parseOutline('outline-foo', defaultCtx)).toBeNull();
    expect(parseOutline('outline-red-999', defaultCtx)).toBeNull();
  });
}); 