import { describe, it, expect } from 'vitest';
import { parseBorderWidth } from '../../src/parser/utilities/borderWidth';
import { createContext } from '../../src/config/context';
import { defaultConfig } from '../../src/config/defaults';
import { theme as themeGetter } from '../../src/config/theme-getter';

const mockThemeObj = {
  borderWidth: {
    DEFAULT: '1px',
    '0': '0px',
    '2': '2px',
    '4': '4px',
    '8': '8px',
    custom: '10px',
  }
};

const mockContext = {
  theme: (...args: any[]) => themeGetter(mockThemeObj, ...args),
  config: () => {},
  plugins: []
};

const defaultCtx = createContext(defaultConfig);

describe('parseBorderWidth', () => {
  it('parses basic border width', () => {
    expect(parseBorderWidth('border', mockContext)).toMatchObject({ type: 'border-width', direction: 'all', value: 'DEFAULT', raw: 'border', arbitrary: false });
    expect(parseBorderWidth('border-2', mockContext)).toMatchObject({ type: 'border-width', direction: 'all', value: '2', raw: 'border-2', arbitrary: false });
    expect(parseBorderWidth('border-8', mockContext)).toMatchObject({ type: 'border-width', direction: 'all', value: '8', raw: 'border-8', arbitrary: false });
  });

  it('parses border-x and border-y', () => {
    expect(parseBorderWidth('border-x', mockContext)).toMatchObject({ type: 'border-width', direction: 'x', value: 'DEFAULT', raw: 'border-x', arbitrary: false });
    expect(parseBorderWidth('border-x-4', mockContext)).toMatchObject({ type: 'border-width', direction: 'x', value: '4', raw: 'border-x-4', arbitrary: false });
    expect(parseBorderWidth('border-y', mockContext)).toMatchObject({ type: 'border-width', direction: 'y', value: 'DEFAULT', raw: 'border-y', arbitrary: false });
    expect(parseBorderWidth('border-y-2', mockContext)).toMatchObject({ type: 'border-width', direction: 'y', value: '2', raw: 'border-y-2', arbitrary: false });
  });

  it('parses logical and side border width', () => {
    expect(parseBorderWidth('border-s', mockContext)).toMatchObject({ type: 'border-width', direction: 's', value: 'DEFAULT', raw: 'border-s', arbitrary: false });
    expect(parseBorderWidth('border-e-2', mockContext)).toMatchObject({ type: 'border-width', direction: 'e', value: '2', raw: 'border-e-2', arbitrary: false });
    expect(parseBorderWidth('border-t', mockContext)).toMatchObject({ type: 'border-width', direction: 't', value: 'DEFAULT', raw: 'border-t', arbitrary: false });
    expect(parseBorderWidth('border-b-4', mockContext)).toMatchObject({ type: 'border-width', direction: 'b', value: '4', raw: 'border-b-4', arbitrary: false });
  });

  it('parses arbitrary and custom property', () => {
    expect(parseBorderWidth('border-[2vw]', mockContext)).toMatchObject({ type: 'border-width', direction: 'all', value: '2vw', raw: 'border-[2vw]', arbitrary: true });
    expect(parseBorderWidth('border-x-[10px]', mockContext)).toMatchObject({ type: 'border-width', direction: 'x', value: '10px', raw: 'border-x-[10px]', arbitrary: true });
    expect(parseBorderWidth('border-t-[0.5rem]', mockContext)).toMatchObject({ type: 'border-width', direction: 't', value: '0.5rem', raw: 'border-t-[0.5rem]', arbitrary: true });
    expect(parseBorderWidth('border-(length:--my-border-width)', mockContext)).toMatchObject({ type: 'border-width', direction: 'all', value: 'var(--my-border-width)', raw: 'border-(length:--my-border-width)', arbitrary: true });
    expect(parseBorderWidth('border-y-(length:--foo)', mockContext)).toMatchObject({ type: 'border-width', direction: 'y', value: 'var(--foo)', raw: 'border-y-(length:--foo)', arbitrary: true });
  });

  it('returns null for invalid', () => {
    expect(parseBorderWidth('border-foo', mockContext)).toBeNull();
    expect(parseBorderWidth('border-x-', mockContext)).toBeNull();
    expect(parseBorderWidth('border-tl-2', mockContext)).toBeNull();
  });
});

describe('parseBorderWidth (mock context)', () => {
  it('parses border (all sides, default)', () => {
    expect(parseBorderWidth('border', mockContext)).toEqual({
      type: 'border-width',
      value: 'DEFAULT',
      direction: 'all',
      raw: 'border',
      arbitrary: false,
      customProperty: false,
      preset: 'borderWidth.DEFAULT',
    });
  });
  it('parses border-2', () => {
    expect(parseBorderWidth('border-2', mockContext)).toEqual({
      type: 'border-width',
      value: '2',
      direction: 'all',
      raw: 'border-2',
      arbitrary: false,
      customProperty: false,
      preset: 'borderWidth.2',
    });
  });
  it('parses border-t-4', () => {
    expect(parseBorderWidth('border-t-4', mockContext)).toEqual({
      type: 'border-width',
      value: '4',
      direction: 't',
      raw: 'border-t-4',
      arbitrary: false,
      customProperty: false,
      preset: 'borderWidth.4',
    });
  });
  it('parses border-x-custom', () => {
    expect(parseBorderWidth('border-x-custom', mockContext)).toEqual({
      type: 'border-width',
      value: 'custom',
      direction: 'x',
      raw: 'border-x-custom',
      arbitrary: false,
      customProperty: false,
      preset: 'borderWidth.custom',
    });
  });
  it('parses border-(--my-border)', () => {
    expect(parseBorderWidth('border-(--my-border)', mockContext)).toEqual({
      type: 'border-width',
      value: 'var(--my-border)',
      direction: 'all',
      raw: 'border-(--my-border)',
      arbitrary: false,
      customProperty: true,
    });
  });
  it('parses border-t-[2vw]', () => {
    expect(parseBorderWidth('border-t-[2vw]', mockContext)).toEqual({
      type: 'border-width',
      value: '2vw',
      direction: 't',
      raw: 'border-t-[2vw]',
      arbitrary: true,
      customProperty: false,
    });
  });
  it('returns null for invalid', () => {
    expect(parseBorderWidth('border-foo', mockContext)).toBeNull();
    expect(parseBorderWidth('border-x-', mockContext)).toBeNull();
    expect(parseBorderWidth('border-tl-2', mockContext)).toBeNull();
  });
});

describe('parseBorderWidth (defaultConfig context)', () => {
  it('parses border', () => {
    expect(parseBorderWidth('border', defaultCtx)).toEqual({
      type: 'border-width',
      value: 'DEFAULT',
      direction: 'all',
      raw: 'border',
      arbitrary: false,
      customProperty: false,
      preset: 'borderWidth.DEFAULT',
    });
  });
  // ... (기본 preset, direction, arbitrary, custom property 등 defaultConfig 기반 테스트 추가 가능)
}); 