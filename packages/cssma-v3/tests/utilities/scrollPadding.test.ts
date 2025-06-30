import { CssmaContext } from './../../src/theme-types';
import { describe, it, expect } from 'vitest';
import { parseScrollPadding } from '../../src/parser/utilities/scrollPadding';
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

describe('parseScrollPadding', () => {
  it('parses scroll-p-4 and -scroll-p-4', () => {
    expect(parseScrollPadding('scroll-p-4', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding', value: '1rem', direction: '', raw: 'scroll-p-4', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.4' });
    expect(parseScrollPadding('-scroll-p-4', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding', value: '1rem', direction: '', raw: '-scroll-p-4', arbitrary: false, customProperty: false, negative: true, preset: 'spacing.4' });
  });
  it('parses scroll-px-2 and -scroll-px-2', () => {
    expect(parseScrollPadding('scroll-px-2', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-inline', value: '0.5rem', direction: 'x', raw: 'scroll-px-2', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.2' });
    expect(parseScrollPadding('-scroll-px-2', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-inline', value: '0.5rem', direction: 'x', raw: '-scroll-px-2', arbitrary: false, customProperty: false, negative: true, preset: 'spacing.2' });
  });
  it('parses scroll-py-3', () => {
    expect(parseScrollPadding('scroll-py-3', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-block', value: '0.75rem', direction: 'y', raw: 'scroll-py-3', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.3' });
  });
  it('parses scroll-ps-1', () => {
    expect(parseScrollPadding('scroll-ps-1', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-inline-start', value: '0.25rem', direction: 's', raw: 'scroll-ps-1', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.1' });
  });
  it('parses scroll-pe-5', () => {
    expect(parseScrollPadding('scroll-pe-5', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-inline-end', value: '1.25rem', direction: 'e', raw: 'scroll-pe-5', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.5' });
  });
  it('parses scroll-pt-6', () => {
    expect(parseScrollPadding('scroll-pt-6', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-top', value: '1.5rem', direction: 't', raw: 'scroll-pt-6', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.6' });
  });
  it('parses scroll-pr-7', () => {
    expect(parseScrollPadding('scroll-pr-7', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-right', value: '1.75rem', direction: 'r', raw: 'scroll-pr-7', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.7' });
  });
  it('parses scroll-pb-8', () => {
    expect(parseScrollPadding('scroll-pb-8', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-bottom', value: '2rem', direction: 'b', raw: 'scroll-pb-8', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.8' });
  });
  it('parses scroll-pl-9', () => {
    expect(parseScrollPadding('scroll-pl-9', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-left', value: '2.25rem', direction: 'l', raw: 'scroll-pl-9', arbitrary: false, customProperty: false, negative: false, preset: 'spacing.9' });
  });
  it('parses scroll-pt-(--foo)', () => {
    expect(parseScrollPadding('scroll-pt-(--foo)', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-top', value: 'var(--foo)', direction: 't', raw: 'scroll-pt-(--foo)', arbitrary: false, customProperty: true, negative: false });
  });
  it('parses scroll-px-(--bar)', () => {
    expect(parseScrollPadding('scroll-px-(--bar)', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-inline', value: 'var(--bar)', direction: 'x', raw: 'scroll-px-(--bar)', arbitrary: false, customProperty: true, negative: false });
  });
  it('parses scroll-pb-[24rem]', () => {
    expect(parseScrollPadding('scroll-pb-[24rem]', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-bottom', value: '24rem', direction: 'b', raw: 'scroll-pb-[24rem]', arbitrary: true, customProperty: false, negative: false });
  });
  it('parses scroll-pl-[var(--my-scroll-padding)]', () => {
    expect(parseScrollPadding('scroll-pl-[var(--my-scroll-padding)]', mockContext)).toEqual({ type: 'scroll-padding', property: 'scroll-padding-left', value: 'var(--my-scroll-padding)', direction: 'l', raw: 'scroll-pl-[var(--my-scroll-padding)]', arbitrary: true, customProperty: false, negative: false });
  });
  it('returns null for invalid input', () => {
    expect(parseScrollPadding('scroll-p', mockContext)).toBeNull();
    expect(parseScrollPadding('scroll-pt-', mockContext)).toBeNull();
    expect(parseScrollPadding('scroll-pt-foo', mockContext)).toBeNull();
    expect(parseScrollPadding('scroll-pt-[]', mockContext)).toBeNull();
    expect(parseScrollPadding('scroll-pt-(foo)', mockContext)).toBeNull();
    expect(parseScrollPadding('scroll-pt-4-4', mockContext)).toBeNull();
  });
}); 