import type { CssmaContext, CssmaTheme } from '../../src/types';
import { describe, it, expect } from 'vitest';
import { parseMargin } from '../../src/parser/utilities/margin';
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

// 기존 테스트를 mockContext로 실행

describe('parseMargin (mock context)', () => {
  it('parses m-<number>', () => {
    expect(parseMargin('m-4', mockContext)).toEqual({
      type: 'margin',
      value: '16',
      direction: 'all',
      raw: 'm-4',
      arbitrary: false,
      negative: false,
      preset: 'spacing.4',
    });
  });
  it('parses -m-4 (negative)', () => {
    expect(parseMargin('-m-4', mockContext)).toEqual({
      type: 'margin',
      value: '16',
      direction: 'all',
      raw: '-m-4',
      arbitrary: false,
      negative: true,
      preset: 'spacing.4',
    });
  });
  it('parses m-px', () => {
    expect(parseMargin('m-px', mockContext)).toEqual({
      type: 'margin',
      value: '1px',
      direction: 'all',
      raw: 'm-px',
      arbitrary: false,
      negative: false,
      preset: 'spacing.px',
    });
  });
  it('parses -m-px (negative)', () => {
    expect(parseMargin('-m-px', mockContext)).toEqual({
      type: 'margin',
      value: '1px',
      direction: 'all',
      raw: '-m-px',
      arbitrary: false,
      negative: true,
      preset: 'spacing.px',
    });
  });
  it('parses m-(<custom-property>)', () => {
    expect(parseMargin('m-(--my-margin)', mockContext)).toEqual({
      type: 'margin',
      value: 'var(--my-margin)',
      direction: 'all',
      raw: 'm-(--my-margin)',
      arbitrary: false,
      customProperty: true,
      negative: false,
    });
  });
  it('parses m-[<value>]', () => {
    expect(parseMargin('m-[5px]', mockContext)).toEqual({
      type: 'margin',
      value: '5px',
      direction: 'all',
      raw: 'm-[5px]',
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
  });
  it('parses mx-<number>', () => {
    expect(parseMargin('mx-2', mockContext)).toEqual({
      type: 'margin',
      value: '8',
      direction: 'inline',
      raw: 'mx-2',
      arbitrary: false,
      negative: false,
      preset: 'spacing.2',
    });
  });
  it('parses my-px', () => {
    expect(parseMargin('my-px', mockContext)).toEqual({
      type: 'margin',
      value: '1px',
      direction: 'block',
      raw: 'my-px',
      arbitrary: false,
      negative: false,
      preset: 'spacing.px',
    });
  });
  it('parses ms-(<custom-property>)', () => {
    expect(parseMargin('ms-(--pad)', mockContext)).toEqual({
      type: 'margin',
      value: 'var(--pad)',
      direction: 'inline-start',
      raw: 'ms-(--pad)',
      arbitrary: false,
      customProperty: true,
      negative: false,
    });
  });
  it('parses me-[<value>]', () => {
    expect(parseMargin('me-[2em]', mockContext)).toEqual({
      type: 'margin',
      value: '2em',
      direction: 'inline-end',
      raw: 'me-[2em]',
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
  });
  it('parses mt-<number>', () => {
    expect(parseMargin('mt-6', mockContext)).toEqual({
      type: 'margin',
      value: '24',
      direction: 'top',
      raw: 'mt-6',
      arbitrary: false,
      negative: false,
      preset: 'spacing.6',
    });
  });
  it('parses -mr-px (negative)', () => {
    expect(parseMargin('-mr-px', mockContext)).toEqual({
      type: 'margin',
      value: '1px',
      direction: 'right',
      raw: '-mr-px',
      arbitrary: false,
      negative: true,
      preset: 'spacing.px',
    });
  });
  it('parses mb-(<custom-property>)', () => {
    expect(parseMargin('mb-(--foo)', mockContext)).toEqual({
      type: 'margin',
      value: 'var(--foo)',
      direction: 'bottom',
      raw: 'mb-(--foo)',
      arbitrary: false,
      customProperty: true,
      negative: false,
    });
  });
  it('parses ml-[<value>]', () => {
    expect(parseMargin('ml-[1rem]', mockContext)).toEqual({
      type: 'margin',
      value: '1rem',
      direction: 'left',
      raw: 'ml-[1rem]',
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseMargin('margin-4', mockContext)).toBeNull();
    expect(parseMargin('m-', mockContext)).toBeNull();
    expect(parseMargin('mx-', mockContext)).toBeNull();
    expect(parseMargin('my-foo', mockContext)).toBeNull();
    expect(parseMargin('m-foo', mockContext)).toBeNull();
    expect(parseMargin('m-[]', mockContext)).toBeNull();
    expect(parseMargin('--m-4', mockContext)).toBeNull();
  });
});

// defaultCtx로 동일 테스트 반복 (단, 값은 defaultConfig 기준)
describe('parseMargin (defaultConfig context)', () => {
  it('parses m-4', () => {
    expect(parseMargin('m-4', defaultCtx)).toEqual({
      type: 'margin',
      value: '1rem',
      direction: 'all',
      raw: 'm-4',
      arbitrary: false,
      negative: false,
      preset: 'spacing.4',
    });
  });
  it('parses mx-2', () => {
    expect(parseMargin('mx-2', defaultCtx)).toEqual({
      type: 'margin',
      value: '0.5rem',
      direction: 'inline',
      raw: 'mx-2',
      arbitrary: false,
      negative: false,
      preset: 'spacing.2',
    });
  });
  it('parses mt-6', () => {
    expect(parseMargin('mt-6', defaultCtx)).toEqual({
      type: 'margin',
      value: '1.5rem',
      direction: 'top',
      raw: 'mt-6',
      arbitrary: false,
      negative: false,
      preset: 'spacing.6',
    });
  });
  it('returns null for invalid input', () => {
    expect(parseMargin('m-foo', defaultCtx)).toBeNull();
    expect(parseMargin('mx-999', defaultCtx)).toBeNull();
  });
}); 