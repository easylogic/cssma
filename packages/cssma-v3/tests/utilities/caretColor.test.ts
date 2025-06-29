import { CssmaContext } from './../../src/theme-types';
import { describe, it, expect } from 'vitest';
import { parseCaretColor } from '../../src/parser/utilities/caretColor';
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

describe('parseCaretColor (mock context)', () => {
  it('parses special caret color keywords', () => {
    expect(parseCaretColor('caret-inherit', mockContext)).toEqual({
      type: 'caret-color', value: 'inherit', raw: 'caret-inherit', arbitrary: false, customProperty: false, preset: 'colors.inherit'
    });
    expect(parseCaretColor('caret-current', mockContext)).toEqual({
      type: 'caret-color', value: 'current', raw: 'caret-current', arbitrary: false, customProperty: false, preset: 'colors.current'
    });
    expect(parseCaretColor('caret-transparent', mockContext)).toEqual({
      type: 'caret-color', value: 'transparent', raw: 'caret-transparent', arbitrary: false, customProperty: false, preset: 'colors.transparent'
    });
    expect(parseCaretColor('caret-black', mockContext)).toEqual({
      type: 'caret-color', value: 'black', raw: 'caret-black', arbitrary: false, customProperty: false, preset: 'colors.black'
    });
    expect(parseCaretColor('caret-white', mockContext)).toEqual({
      type: 'caret-color', value: 'white', raw: 'caret-white', arbitrary: false, customProperty: false, preset: 'colors.white'
    });
  });
  it('parses palette caret color', () => {
    expect(parseCaretColor('caret-red-500', mockContext)).toEqual({
      type: 'caret-color', value: 'red-500', raw: 'caret-red-500', arbitrary: false, customProperty: false, preset: 'colors.red.500'
    });
    expect(parseCaretColor('caret-blue-200', mockContext)).toEqual({
      type: 'caret-color', value: 'blue-200', raw: 'caret-blue-200', arbitrary: false, customProperty: false, preset: 'colors.blue.200'
    });
    expect(parseCaretColor('caret-red', mockContext)).toBeNull();
  });
  it('parses custom property', () => {
    expect(parseCaretColor('caret-(--my-caret-color)', mockContext)).toEqual({
      type: 'caret-color', value: '--my-caret-color', raw: 'caret-(--my-caret-color)', arbitrary: true, customProperty: true
    });
  });
  it('parses arbitrary value', () => {
    expect(parseCaretColor('caret-[#50d71e]', mockContext)).toEqual({
      type: 'caret-color', value: '#50d71e', raw: 'caret-[#50d71e]', arbitrary: true, customProperty: false
    });
  });
  it('returns null for invalid input', () => {
    expect(parseCaretColor('caret-', mockContext)).toBeNull();
    expect(parseCaretColor('caret-foo', mockContext)).toBeNull();
    expect(parseCaretColor('caret-red-', mockContext)).toBeNull();
    expect(parseCaretColor('caret-()', mockContext)).toBeNull();
    expect(parseCaretColor('caret-[]', mockContext)).toBeNull();
    expect(parseCaretColor('caret-(foo)', mockContext)).toBeNull();
    expect(parseCaretColor('caret-[foo]', mockContext)).toBeNull();
  });
});

describe('parseCaretColor (defaultConfig context)', () => {
  it('parses Tailwind palette color', () => {
    expect(parseCaretColor('caret-red-500', defaultCtx)).toEqual({
      type: 'caret-color', value: 'red-500', raw: 'caret-red-500', arbitrary: false, customProperty: false, preset: 'colors.red.500'
    });
  });
  it('returns null for invalid value', () => {
    expect(parseCaretColor('caret-foo', defaultCtx)).toBeNull();
    expect(parseCaretColor('caret-red-999', defaultCtx)).toBeNull();
  });
}); 