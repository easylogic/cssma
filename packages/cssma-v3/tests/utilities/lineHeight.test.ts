import { describe, it, expect } from 'vitest';
import { parseLineHeight } from '../../src/parser/utilities/lineHeight';

describe('parseLineHeight', () => {
  it('parses leading-none', () => {
    expect(parseLineHeight('leading-none')).toEqual({ type: 'line-height', value: '1', raw: 'leading-none', arbitrary: false });
  });

  it('parses leading-<number>', () => {
    expect(parseLineHeight('leading-3')).toEqual({ type: 'line-height', value: '3', raw: 'leading-3', arbitrary: false });
    expect(parseLineHeight('leading-6')).toEqual({ type: 'line-height', value: '6', raw: 'leading-6', arbitrary: false });
    expect(parseLineHeight('leading-10')).toEqual({ type: 'line-height', value: '10', raw: 'leading-10', arbitrary: false });
  });

  it('parses leading-(<custom-property>)', () => {
    expect(parseLineHeight('leading-(--my-line-height)')).toEqual({ type: 'line-height', value: 'var(--my-line-height)', raw: 'leading-(--my-line-height)', arbitrary: true });
    expect(parseLineHeight('leading-(--foo)')).toEqual({ type: 'line-height', value: 'var(--foo)', raw: 'leading-(--foo)', arbitrary: true });
  });

  it('parses leading-[<value>]', () => {
    expect(parseLineHeight('leading-[1.5]')).toEqual({ type: 'line-height', value: '1.5', raw: 'leading-[1.5]', arbitrary: true });
    expect(parseLineHeight('leading-[calc(100%-1rem)]')).toEqual({ type: 'line-height', value: 'calc(100%-1rem)', raw: 'leading-[calc(100%-1rem)]', arbitrary: true });
    expect(parseLineHeight('leading-[var(--foo)]')).toEqual({ type: 'line-height', value: 'var(--foo)', raw: 'leading-[var(--foo)]', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseLineHeight('leading')).toBeNull();
    expect(parseLineHeight('leading-')).toBeNull();
    expect(parseLineHeight('leading-[ ]')).toBeNull();
    expect(parseLineHeight('leading-(foo)')).toBeNull();
    expect(parseLineHeight('leading--1')).toBeNull();
    expect(parseLineHeight('leading-abc')).toBeNull();
  });
}); 