import { describe, it, expect } from 'vitest';
import { parseBackdropBrightness } from '../../src/parser/utilities/backdropBrightness';

describe('parseBackdropBrightness', () => {
  it('parses preset classes', () => {
    expect(parseBackdropBrightness('backdrop-brightness-50')).toEqual({
      type: 'backdrop-brightness',
      value: '50',
      raw: 'backdrop-brightness-50',
      arbitrary: false,
    });
    expect(parseBackdropBrightness('backdrop-brightness-150')).toEqual({
      type: 'backdrop-brightness',
      value: '150',
      raw: 'backdrop-brightness-150',
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseBackdropBrightness('backdrop-brightness-[1.75]')).toEqual({
      type: 'backdrop-brightness',
      value: '1.75',
      raw: 'backdrop-brightness-[1.75]',
      arbitrary: true,
    });
    expect(parseBackdropBrightness('backdrop-brightness-[var(--foo)]')).toEqual({
      type: 'backdrop-brightness',
      value: 'var(--foo)',
      raw: 'backdrop-brightness-[var(--foo)]',
      arbitrary: true,
    });
  });

  it('parses custom property', () => {
    expect(parseBackdropBrightness('backdrop-brightness-(--my-brightness)')).toEqual({
      type: 'backdrop-brightness',
      value: 'var(--my-brightness)',
      raw: 'backdrop-brightness-(--my-brightness)',
      arbitrary: true,
    });
  });

  it('returns null for non-matching', () => {
    expect(parseBackdropBrightness('backdrop-brightness-unknown')).toBeNull();
    expect(parseBackdropBrightness('brightness-50')).toBeNull();
  });
}); 