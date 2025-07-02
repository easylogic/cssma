import { CssmaContext } from './../../src/theme-types';
import { describe, it, expect } from 'vitest';
import { parseBorderRadius } from '../../src/parser/utilities/borderRadius';
import { theme as themeGetter } from '../../src/config/theme-getter';

const mockThemeObj = {
  borderRadius: {
    none: '0px',
    sm: '2px',
    md: '4px',
    lg: '8px',
    full: '9999px',
    '2xl': '16px',
    '5xl': '32px',
  }
};

const mockContext: CssmaContext = {
  theme: (...args: any[]) => themeGetter(mockThemeObj, ...args),
  config: () => {},
  plugins: []
};

describe('parseBorderRadius', () => {
  it('parses basic presets', () => {
    expect(parseBorderRadius('rounded', mockContext)).toEqual({
      type: 'border-radius',
      value: 'md',
      direction: 'all',
      raw: 'rounded',
      arbitrary: false,
      customProperty: false,
      preset: 'borderRadius.md',
    });
    expect(parseBorderRadius('rounded-none', mockContext)).toEqual({
      type: 'border-radius',
      value: 'none',
      direction: 'all',
      raw: 'rounded-none',
      arbitrary: false,
      customProperty: false,
      preset: 'borderRadius.none',
    });
    expect(parseBorderRadius('rounded-full', mockContext)).toEqual({
      type: 'border-radius',
      value: 'full',
      direction: 'all',
      raw: 'rounded-full',
      arbitrary: false,
      customProperty: false,
      preset: 'borderRadius.full',
    });
    expect(parseBorderRadius('rounded-lg', mockContext)).toEqual({
      type: 'border-radius',
      value: 'lg',
      direction: 'all',
      raw: 'rounded-lg',
      arbitrary: false,
      customProperty: false,
      preset: 'borderRadius.lg',
    });
  });

  it('parses logical property presets', () => {
    expect(parseBorderRadius('rounded-t-lg', mockContext)).toEqual({
      type: 'border-radius',
      direction: 't',
      value: 'lg',
      raw: 'rounded-t-lg',
      arbitrary: false,
      customProperty: false,
      preset: 'borderRadius.lg',
    });
    expect(parseBorderRadius('rounded-tr-md', mockContext)).toEqual({
      type: 'border-radius',
      direction: 'tr',
      value: 'md',
      raw: 'rounded-tr-md',
      arbitrary: false,
      customProperty: false,
      preset: 'borderRadius.md',
    });
    expect(parseBorderRadius('rounded-bl-2xl', mockContext)).toEqual({
      type: 'border-radius',
      direction: 'bl',
      value: '2xl',
      raw: 'rounded-bl-2xl',
      arbitrary: false,
      customProperty: false,
      preset: 'borderRadius.2xl',
    });
  });

  it('parses logical property with arbitrary value', () => {
    expect(parseBorderRadius('rounded-t-[2vw]', mockContext)).toEqual({
      type: 'border-radius',
      direction: 't',
      value: '2vw',
      raw: 'rounded-t-[2vw]',
      arbitrary: true,
      customProperty: false,
    });
    expect(parseBorderRadius('rounded-tr-[10px]', mockContext)).toEqual({
      type: 'border-radius',
      direction: 'tr',
      value: '10px',
      raw: 'rounded-tr-[10px]',
      arbitrary: true,
      customProperty: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseBorderRadius('rounded-[2vw]', mockContext)).toEqual({
      type: 'border-radius',
      value: '2vw',
      direction: 'all',
      raw: 'rounded-[2vw]',
      arbitrary: true,
      customProperty: false,
    });
    expect(parseBorderRadius('rounded-[50%]', mockContext)).toEqual({
      type: 'border-radius',
      value: '50%',
      direction: 'all',
      raw: 'rounded-[50%]',
      arbitrary: true,
      customProperty: false,
    });
  });

  it('parses custom property', () => {
    expect(parseBorderRadius('rounded-(--my-radius)', mockContext)).toEqual({
      type: 'border-radius',
      value: 'var(--my-radius)',
      raw: 'rounded-(--my-radius)',
      direction: 'all',
      arbitrary: false,
      customProperty: true,
    });
  });

  it('returns null for invalid', () => {
    expect(parseBorderRadius('rounded-foo')).toBeNull();
    expect(parseBorderRadius('rounded-tl')).toBeNull();
  });
});