import { CssmaContext } from './../../src/theme-types';
import { describe, it, expect } from 'vitest';
import { parseBorderColor } from '../../src/parser/utilities/borderColor';
import { theme as themeGetter } from '../../src/config/theme-getter';
import { createContext } from '../../src/config/context';
import { defaultConfig } from '../../src/config/defaults';

// Mock context
const mockThemeObj = {
  colors: {
    red: { 500: "#f00" },
    blue: { 200: "#00f" },
    indigo: { 500: "#123456" },
    pink: { 200: "#ffb6c1" },
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

describe('parseBorderColor (mock context)', () => {
  it('parses special border color keywords', () => {
    expect(parseBorderColor('border-inherit', mockContext)).toEqual({
      type: 'border-color', side: 'all', value: 'inherit', raw: 'border-inherit', arbitrary: false, customProperty: false, preset: 'colors.inherit'
    });
    expect(parseBorderColor('border-current', mockContext)).toEqual({
      type: 'border-color', side: 'all', value: 'current', raw: 'border-current', arbitrary: false, customProperty: false, preset: 'colors.current'
    });
    expect(parseBorderColor('border-transparent', mockContext)).toEqual({
      type: 'border-color', side: 'all', value: 'transparent', raw: 'border-transparent', arbitrary: false, customProperty: false, preset: 'colors.transparent'
    });
    expect(parseBorderColor('border-black', mockContext)).toEqual({
      type: 'border-color', side: 'all', value: 'black', raw: 'border-black', arbitrary: false, customProperty: false, preset: 'colors.black'
    });
    expect(parseBorderColor('border-white', mockContext)).toEqual({
      type: 'border-color', side: 'all', value: 'white', raw: 'border-white', arbitrary: false, customProperty: false, preset: 'colors.white'
    });
  });
  it('parses palette border color', () => {
    expect(parseBorderColor('border-red-500', mockContext)).toEqual({
      type: 'border-color', side: 'all', value: 'red-500', raw: 'border-red-500', arbitrary: false, customProperty: false, preset: 'colors.red.500'
    });
    expect(parseBorderColor('border-blue-200/75', mockContext)).toEqual({
      type: 'border-color', side: 'all', value: 'blue-200', raw: 'border-blue-200/75', arbitrary: false, customProperty: false, preset: 'colors.blue.200', opacity: 75
    });
  });
  it('parses x and side palette border color', () => {
    expect(parseBorderColor('border-x-blue-200', mockContext)).toEqual({
      type: 'border-color', side: 'x', value: 'blue-200', raw: 'border-x-blue-200', arbitrary: false, customProperty: false, preset: 'colors.blue.200'
    });
    expect(parseBorderColor('border-t-indigo-500', mockContext)).toEqual({
      type: 'border-color', side: 't', value: 'indigo-500', raw: 'border-t-indigo-500', arbitrary: false, customProperty: false, preset: 'colors.indigo.500'
    });
    expect(parseBorderColor('border-b-pink-200/50', mockContext)).toEqual({
      type: 'border-color', side: 'b', value: 'pink-200', raw: 'border-b-pink-200/50', arbitrary: false, customProperty: false, preset: 'colors.pink.200', opacity: 50
    });
  });
  it('parses arbitrary and custom property', () => {
    expect(parseBorderColor('border-[#243c5a]', mockContext)).toEqual({
      type: 'border-color', side: 'all', value: '#243c5a', raw: 'border-[#243c5a]', arbitrary: true, customProperty: false
    });
    expect(parseBorderColor('border-(--my-border)', mockContext)).toEqual({
      type: 'border-color', side: 'all', value: '--my-border', raw: 'border-(--my-border)', arbitrary: true, customProperty: true
    });
    expect(parseBorderColor('border-x-[#243c5a]', mockContext)).toEqual({
      type: 'border-color', side: 'x', value: '#243c5a', raw: 'border-x-[#243c5a]', arbitrary: true, customProperty: false
    });
    expect(parseBorderColor('border-x-(--my-border)', mockContext)).toEqual({
      type: 'border-color', side: 'x', value: '--my-border', raw: 'border-x-(--my-border)', arbitrary: true, customProperty: true
    });
    expect(parseBorderColor('border-t-[#243c5a]', mockContext)).toEqual({
      type: 'border-color', side: 't', value: '#243c5a', raw: 'border-t-[#243c5a]', arbitrary: true, customProperty: false
    });
    expect(parseBorderColor('border-t-(--my-border)', mockContext)).toEqual({
      type: 'border-color', side: 't', value: '--my-border', raw: 'border-t-(--my-border)', arbitrary: true, customProperty: true
    });
  });
  it('returns null for invalid', () => {
    expect(parseBorderColor('border-foo', mockContext)).toBeNull();
    expect(parseBorderColor('border-x-', mockContext)).toBeNull();
    expect(parseBorderColor('border-tl-red-500', mockContext)).toBeNull();
    expect(parseBorderColor('border-red-999', mockContext)).toBeNull();
    expect(parseBorderColor('border-x-green-999', mockContext)).toBeNull();
  });
});

describe('parseBorderColor (defaultConfig context)', () => {
  it('parses Tailwind palette color', () => {
    expect(parseBorderColor('border-red-500', defaultCtx)).toEqual({
      type: 'border-color', side: 'all', value: 'red-500', raw: 'border-red-500', arbitrary: false, customProperty: false, preset: 'colors.red.500'
    });
  });
  it('returns null for invalid value', () => {
    expect(parseBorderColor('border-foo', defaultCtx)).toBeNull();
    expect(parseBorderColor('border-x-green-999', defaultCtx)).toBeNull();
  });
}); 