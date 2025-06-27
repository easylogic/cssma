import { describe, it, expect } from 'vitest';
import { parseBackdropSaturate } from '../../src/parser/utilities/backdropSaturate';

describe('parseBackdropSaturate', () => {
  it('parses preset classes', () => {
    expect(parseBackdropSaturate('backdrop-saturate-50')).toEqual({
      type: 'backdrop-saturate',
      value: '50',
      raw: 'backdrop-saturate-50',
      arbitrary: false,
    });
    expect(parseBackdropSaturate('backdrop-saturate-200')).toEqual({
      type: 'backdrop-saturate',
      value: '200',
      raw: 'backdrop-saturate-200',
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseBackdropSaturate('backdrop-saturate-[.25]')).toEqual({
      type: 'backdrop-saturate',
      value: '.25',
      raw: 'backdrop-saturate-[.25]',
      arbitrary: true,
    });
    expect(parseBackdropSaturate('backdrop-saturate-[var(--foo)]')).toEqual({
      type: 'backdrop-saturate',
      value: 'var(--foo)',
      raw: 'backdrop-saturate-[var(--foo)]',
      arbitrary: true,
    });
  });

  it('parses custom property', () => {
    expect(parseBackdropSaturate('backdrop-saturate-(--my-saturate)')).toEqual({
      type: 'backdrop-saturate',
      value: 'var(--my-saturate)',
      raw: 'backdrop-saturate-(--my-saturate)',
      arbitrary: true,
    });
  });

  it('returns null for non-matching', () => {
    expect(parseBackdropSaturate('backdrop-saturate-unknown')).toBeNull();
    expect(parseBackdropSaturate('saturate-50')).toBeNull();
  });
}); 