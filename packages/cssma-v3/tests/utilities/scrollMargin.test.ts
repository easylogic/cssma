import { CssmaContext } from './../../src/theme-types';
import { describe, it, expect } from 'vitest';
import { parseScrollMargin } from '../../src/parser/utilities/scrollMargin';
import { theme as themeGetter } from '../../src/config/theme-getter';

const mockThemeObj = {
  spacing: {
    px: '1px',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
  }
};
const mockContext: CssmaContext = {
  theme: (...args: any[]) => themeGetter(mockThemeObj, ...args),
  config: () => {},
  plugins: []
};

describe('parseScrollMargin', () => {
  it('parses scroll-m-4 and -scroll-m-4', () => {
    expect(parseScrollMargin('scroll-m-4', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin', value: '1rem', direction: '', raw: 'scroll-m-4', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.4' });
    expect(parseScrollMargin('-scroll-m-4', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin', value: '1rem', direction: '', raw: '-scroll-m-4', arbitrary: false, customProperty: false, negative: true, preset: 'spacing.4' });
  });
  it('parses scroll-mx-2 and -scroll-mx-2', () => {
    expect(parseScrollMargin('scroll-mx-2', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-inline', value: '0.5rem', direction: 'x', raw: 'scroll-mx-2', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.2' });
    expect(parseScrollMargin('-scroll-mx-2', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-inline', value: '0.5rem', direction: 'x', raw: '-scroll-mx-2', arbitrary: false, customProperty: false, negative: true, preset: 'spacing.2' });
  });
  it('parses scroll-my-3', () => {
    expect(parseScrollMargin('scroll-my-3', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-block', value: '0.75rem', direction: 'y', raw: 'scroll-my-3', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.3' });
  });
  it('parses scroll-ms-1', () => {
    expect(parseScrollMargin('scroll-ms-1', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-inline-start', value: '0.25rem', direction: 's', raw: 'scroll-ms-1', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.1' });
  });
  it('parses scroll-me-5', () => {
    expect(parseScrollMargin('scroll-me-5', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-inline-end', value: '1.25rem', direction: 'e', raw: 'scroll-me-5', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.5' });
  });
  it('parses scroll-mt-6', () => {
    expect(parseScrollMargin('scroll-mt-6', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-top', value: '1.5rem', direction: 't', raw: 'scroll-mt-6', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.6' });
  });
  it('parses scroll-mr-7', () => {
    expect(parseScrollMargin('scroll-mr-7', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-right', value: '1.75rem', direction: 'r', raw: 'scroll-mr-7', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.7' });
  });
  it('parses scroll-mb-8', () => {
    expect(parseScrollMargin('scroll-mb-8', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-bottom', value: '2rem', direction: 'b', raw: 'scroll-mb-8', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.8' });
  });
  it('parses scroll-ml-9', () => {
    expect(parseScrollMargin('scroll-ml-9', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-left', value: '2.25rem', direction: 'l', raw: 'scroll-ml-9', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.9' });
  });
  it('parses scroll-mt-(--foo)', () => {
    expect(parseScrollMargin('scroll-mt-(--foo)', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-top', value: 'var(--foo)', direction: 't', raw: 'scroll-mt-(--foo)', arbitrary: false, customProperty: true, negative: false });
  });
  it('parses scroll-mx-(--bar)', () => {
    expect(parseScrollMargin('scroll-mx-(--bar)', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-inline', value: 'var(--bar)', direction: 'x', raw: 'scroll-mx-(--bar)', arbitrary: false, customProperty: true, negative: false });
  });
  it('parses scroll-mb-[24rem]', () => {
    expect(parseScrollMargin('scroll-mb-[24rem]', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-bottom', value: '24rem', direction: 'b', raw: 'scroll-mb-[24rem]', arbitrary: true, customProperty: false, negative: false });
  });
  it('parses scroll-ml-[var(--my-scroll-margin)]', () => {
    expect(parseScrollMargin('scroll-ml-[var(--my-scroll-margin)]', mockContext)).toEqual({ type: 'scroll-margin', property: 'scroll-margin-left', value: 'var(--my-scroll-margin)', direction: 'l', raw: 'scroll-ml-[var(--my-scroll-margin)]', arbitrary: true, customProperty: false, negative: false });
  });
  it('returns null for invalid input', () => {
    expect(parseScrollMargin('scroll-m', mockContext)).toBeNull();
    expect(parseScrollMargin('scroll-mt-', mockContext)).toBeNull();
    expect(parseScrollMargin('scroll-mt-foo', mockContext)).toBeNull();
    expect(parseScrollMargin('scroll-mt-[]', mockContext)).toBeNull();
    expect(parseScrollMargin('scroll-mt-(foo)', mockContext)).toBeNull();
    expect(parseScrollMargin('scroll-mt-4-4', mockContext)).toBeNull();
  });
}); 