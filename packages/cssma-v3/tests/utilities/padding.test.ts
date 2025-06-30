import type { CssmaContext, CssmaTheme } from '../../src/types';
import { describe, it, expect } from 'vitest';
import { parsePadding } from '../../src/parser/utilities/padding';
import { createContext } from '../../src/config/context';
import { defaultConfig } from '../../src/config/defaults';
import { theme as themeGetter } from '../../src/config/theme-getter';

// --- Mock context 단위 테스트 ---
const mockThemeObj: CssmaTheme = {
  spacing: {
    px: '1px',
    '2': '8',
    '4': '16',
    '6': '24',
  }
};

const mockContext: CssmaContext = {
  theme: (...args: any[]) => themeGetter(mockThemeObj, ...args),
  config: () => {},
  plugins: []
};

// --- defaultConfig + createContext 통합 테스트 ---
const defaultCtx = createContext(defaultConfig);

describe('parsePadding (mock context)', () => {
  it('parses p-<number>', () => {
    expect(parsePadding('p-4', mockContext)).toEqual({
      type: 'padding',
      value: '16',
      direction: 'all',
      raw: 'p-4',
      arbitrary: false,
      negative: false,
      preset: 'spacing.4',
    });
  });
  it('parses p-px', () => {
    expect(parsePadding('p-px', mockContext)).toEqual({
      type: 'padding',
      value: '1px',
      direction: 'all',
      raw: 'p-px',
      arbitrary: false,
      negative: false,
      preset: 'spacing.px',
    });
  });
  it('parses p-(<custom-property>)', () => {
    expect(parsePadding('p-(--my-padding)', mockContext)).toEqual({
      type: 'padding',
      value: 'var(--my-padding)',
      direction: 'all',
      raw: 'p-(--my-padding)',
      arbitrary: true,
      customProperty: true,
    });
  });
  it('parses p-[<value>]', () => {
    expect(parsePadding('p-[5px]', mockContext)).toEqual({
      type: 'padding',
      value: '5px',
      direction: 'all',
      raw: 'p-[5px]',
      arbitrary: true,
      customProperty: false,
    });
  });
  it('parses px-<number>', () => {
    expect(parsePadding('px-2', mockContext)).toEqual({
      type: 'padding',
      value: '8',
      direction: 'inline',
      raw: 'px-2',
      arbitrary: false,
      negative: false,
      preset: 'spacing.2',
    });
  });
  it('parses py-px', () => {
    expect(parsePadding('py-px', mockContext)).toEqual({
      type: 'padding',
      value: '1px',
      direction: 'block',
      raw: 'py-px',
      arbitrary: false,
      negative: false,
      preset: 'spacing.px',
    });
  });
  it('parses ps-(<custom-property>)', () => {
    expect(parsePadding('ps-(--pad)', mockContext)).toEqual({
      type: 'padding',
      value: 'var(--pad)',
      direction: 'inline-start',
      raw: 'ps-(--pad)',
      arbitrary: true,
      customProperty: true,
    });
  });
  it('parses pe-[<value>]', () => {
    expect(parsePadding('pe-[2em]', mockContext)).toEqual({
      type: 'padding',
      value: '2em',
      direction: 'inline-end',
      raw: 'pe-[2em]',
      arbitrary: true,
      customProperty: false,
    });
  });
  it('parses pt-<number>', () => {
    expect(parsePadding('pt-6', mockContext)).toEqual({
      type: 'padding',
      value: '24',
      direction: 'top',
      raw: 'pt-6',
      arbitrary: false,
      negative: false,
      preset: 'spacing.6',
    });
  });
  it('parses pr-px', () => {
    expect(parsePadding('pr-px', mockContext)).toEqual({
      type: 'padding',
      value: '1px',
      direction: 'right',
      raw: 'pr-px',
      arbitrary: false,
      negative: false,
      preset: 'spacing.px',
    });
  });
  it('parses pb-(<custom-property>)', () => {
    expect(parsePadding('pb-(--foo)', mockContext)).toEqual({
      type: 'padding',
      value: 'var(--foo)',
      direction: 'bottom',
      raw: 'pb-(--foo)',
      arbitrary: true,
      customProperty: true,
    });
  });
  it('parses pb-( --foo ) with whitespace', () => {
    expect(parsePadding('pb-( --foo )', mockContext)).toEqual(null);
  });
  it('parses pl-[<value>]', () => {
    expect(parsePadding('pl-[1rem]', mockContext)).toEqual({
      type: 'padding',
      value: '1rem',
      direction: 'left',
      raw: 'pl-[1rem]',
      arbitrary: true,
      customProperty: false,
    });
  });
  it('returns null for invalid input', () => {
    expect(parsePadding('padding-4', mockContext)).toBeNull();
    expect(parsePadding('p-', mockContext)).toBeNull();
    expect(parsePadding('px-', mockContext)).toBeNull();
    expect(parsePadding('py-foo', mockContext)).toBeNull();
    expect(parsePadding('p-foo', mockContext)).toBeNull();
    expect(parsePadding('p-[]', mockContext)).toBeNull();
  });
});

describe('parsePadding (defaultConfig context)', () => {
  it('parses p-4', () => {
    expect(parsePadding('p-4', defaultCtx)).toEqual({
      type: 'padding',
      value: '1rem',
      direction: 'all',
      raw: 'p-4',
      arbitrary: false,
      negative: false,
      preset: 'spacing.4',
    });
  });
  it('parses px-2', () => {
    expect(parsePadding('px-2', defaultCtx)).toEqual({
      type: 'padding',
      value: '0.5rem',
      direction: 'inline',
      raw: 'px-2',
      arbitrary: false,
      negative: false,
      preset: 'spacing.2',
    });
  });
  it('parses pt-6', () => {
    expect(parsePadding('pt-6', defaultCtx)).toEqual({
      type: 'padding',
      value: '1.5rem',
      direction: 'top',
      raw: 'pt-6',
      arbitrary: false,
      negative: false,
      preset: 'spacing.6',
    });
  });
  it('returns null for invalid input', () => {
    expect(parsePadding('p-foo', defaultCtx)).toBeNull();
    expect(parsePadding('px-999', defaultCtx)).toBeNull();
  });
}); 