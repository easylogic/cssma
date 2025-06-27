import { describe, it, expect } from 'vitest';
import { parseBackdropInvert } from '../../src/parser/utilities/backdropInvert';

describe('parseBackdropInvert', () => {
  it('parses default class', () => {
    expect(parseBackdropInvert('backdrop-invert')).toEqual({
      type: 'backdrop-invert',
      value: '100',
      raw: 'backdrop-invert',
      arbitrary: false,
      default: true,
    });
  });

  it('parses preset classes', () => {
    expect(parseBackdropInvert('backdrop-invert-0')).toEqual({
      type: 'backdrop-invert',
      value: '0',
      raw: 'backdrop-invert-0',
      arbitrary: false,
    });
    expect(parseBackdropInvert('backdrop-invert-65')).toEqual({
      type: 'backdrop-invert',
      value: '65',
      raw: 'backdrop-invert-65',
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseBackdropInvert('backdrop-invert-[.25]')).toEqual({
      type: 'backdrop-invert',
      value: '.25',
      raw: 'backdrop-invert-[.25]',
      arbitrary: true,
    });
    expect(parseBackdropInvert('backdrop-invert-[var(--foo)]')).toEqual({
      type: 'backdrop-invert',
      value: 'var(--foo)',
      raw: 'backdrop-invert-[var(--foo)]',
      arbitrary: true,
    });
  });

  it('parses custom property', () => {
    expect(parseBackdropInvert('backdrop-invert-(--my-invert)')).toEqual({
      type: 'backdrop-invert',
      value: 'var(--my-invert)',
      raw: 'backdrop-invert-(--my-invert)',
      arbitrary: true,
    });
  });

  it('returns null for non-matching', () => {
    expect(parseBackdropInvert('backdrop-invert-unknown')).toBeNull();
    expect(parseBackdropInvert('invert')).toBeNull();
  });
}); 