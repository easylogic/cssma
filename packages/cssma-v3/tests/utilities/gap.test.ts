import { describe, it, expect } from 'vitest';
import { parseGap } from '../../src/parser/utilities/gap';
import { theme as themeGetter } from '../../src/config/theme-getter';

const mockThemeObj = {
  spacing: {
    px: '1px',
    '1': '4',
    '2': '8',
    '4': '16',
  }
};

const mockContext = {
  theme: (...args) => themeGetter(mockThemeObj, ...args),
  config: () => {},
  plugins: []
};

describe('parseGapUtility', () => {
  it('parses gap-<number>', () => {
    expect(parseGap('gap-4', mockContext)).toEqual({
      type: 'gap',
      value: '16',
      direction: 'all',
      raw: 'gap-4',
      arbitrary: false,
      customProperty: false,
      preset: 'spacing.4',
    });
  });
  it('parses gap-x-2', () => {
    expect(parseGap('gap-x-2', mockContext)).toEqual({
      type: 'gap',
      value: '8',
      direction: 'inline',
      raw: 'gap-x-2',
      arbitrary: false,
      customProperty: false,
      preset: 'spacing.2',
    });
  });
  it('parses gap-y-1', () => {
    expect(parseGap('gap-y-1', mockContext)).toEqual({
      type: 'gap',
      value: '4',
      direction: 'block',
      raw: 'gap-y-1',
      arbitrary: false,
      customProperty: false,
      preset: 'spacing.1',
    });
  });
  it('parses gap-px', () => {
    expect(parseGap('gap-px', mockContext)).toEqual({
      type: 'gap',
      value: '1px',
      direction: 'all',
      raw: 'gap-px',
      arbitrary: false,
      customProperty: false,
      preset: 'spacing.px',
    });
  });
  it('parses gap-x-px', () => {
    expect(parseGap('gap-x-px', mockContext)).toEqual({
      type: 'gap',
      value: '1px',
      direction: 'inline',
      raw: 'gap-x-px',
      arbitrary: false,
      customProperty: false,
      preset: 'spacing.px',
    });
  });
  it('parses gap-y-px', () => {
    expect(parseGap('gap-y-px', mockContext)).toEqual({
      type: 'gap',
      value: '1px',
      direction: 'block',
      raw: 'gap-y-px',
      arbitrary: false,
      customProperty: false,
      preset: 'spacing.px',
    });
  });
  it('parses gap-(<custom-property>)', () => {
    expect(parseGap('gap-(--my-gap)', mockContext)).toEqual({
      type: 'gap',
      value: 'var(--my-gap)',
      direction: 'all',
      raw: 'gap-(--my-gap)',
      arbitrary: false,
      customProperty: true,
    });
  });
  it('parses gap-x-(--foo)', () => {
    expect(parseGap('gap-x-(--foo)', mockContext)).toEqual({
      type: 'gap',
      value: 'var(--foo)',
      direction: 'inline',
      raw: 'gap-x-(--foo)',
      arbitrary: false,
      customProperty: true,
    });
  });
  it('parses gap-y-(--bar)', () => {
    expect(parseGap('gap-y-(--bar)', mockContext)).toEqual({
      type: 'gap',
      value: 'var(--bar)',
      direction: 'block',
      raw: 'gap-y-(--bar)',
      arbitrary: false,
      customProperty: true,
    });
  });
  it('parses gap-[<value>]', () => {
    expect(parseGap('gap-[5px]', mockContext)).toEqual({
      type: 'gap',
      value: '5px',
      direction: 'all',
      raw: 'gap-[5px]',
      arbitrary: true,
      customProperty: false,
    });
  });
  it('parses gap-x-[2em]', () => {
    expect(parseGap('gap-x-[2em]', mockContext)).toEqual({
      type: 'gap',
      value: '2em',
      direction: 'inline',
      raw: 'gap-x-[2em]',
      arbitrary: true,
      customProperty: false,
    });
  });
  it('parses gap-y-[1rem]', () => {
    expect(parseGap('gap-y-[1rem]', mockContext)).toEqual({
      type: 'gap',
      value: '1rem',
      direction: 'block',
      raw: 'gap-y-[1rem]',
      arbitrary: true,
      customProperty: false,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseGap('gap-', mockContext)).toBeNull();
    expect(parseGap('gap-x-', mockContext)).toBeNull();
    expect(parseGap('gap-y-foo', mockContext)).toBeNull();
    expect(parseGap('gap-[]', mockContext)).toBeNull();
    expect(parseGap('gap-z-2', mockContext)).toBeNull();
    expect(parseGap('gap-foo', mockContext)).toBeNull();
  });
}); 