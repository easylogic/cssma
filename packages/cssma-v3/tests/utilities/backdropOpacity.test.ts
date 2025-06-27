import { describe, it, expect } from 'vitest';
import { parseBackdropOpacity } from '../../src/parser/utilities/backdropOpacity';

describe('parseBackdropOpacity', () => {
  it('parses preset classes', () => {
    expect(parseBackdropOpacity('backdrop-opacity-10')).toEqual({
      type: 'backdrop-opacity',
      value: '10',
      raw: 'backdrop-opacity-10',
      arbitrary: false,
    });
    expect(parseBackdropOpacity('backdrop-opacity-95')).toEqual({
      type: 'backdrop-opacity',
      value: '95',
      raw: 'backdrop-opacity-95',
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseBackdropOpacity('backdrop-opacity-[.15]')).toEqual({
      type: 'backdrop-opacity',
      value: '.15',
      raw: 'backdrop-opacity-[.15]',
      arbitrary: true,
    });
    expect(parseBackdropOpacity('backdrop-opacity-[var(--foo)]')).toEqual({
      type: 'backdrop-opacity',
      value: 'var(--foo)',
      raw: 'backdrop-opacity-[var(--foo)]',
      arbitrary: true,
    });
  });

  it('parses custom property', () => {
    expect(parseBackdropOpacity('backdrop-opacity-(--my-opacity)')).toEqual({
      type: 'backdrop-opacity',
      value: 'var(--my-opacity)',
      raw: 'backdrop-opacity-(--my-opacity)',
      arbitrary: true,
    });
  });

  it('returns null for non-matching', () => {
    expect(parseBackdropOpacity('backdrop-opacity-unknown')).toBeNull();
    expect(parseBackdropOpacity('opacity-50')).toBeNull();
  });
}); 