import { describe, it, expect } from 'vitest';
import { parseBackdropGrayscale } from '../../src/parser/utilities/backdropGrayscale';

describe('parseBackdropGrayscale', () => {
  it('parses default class', () => {
    expect(parseBackdropGrayscale('backdrop-grayscale')).toEqual({
      type: 'backdrop-grayscale',
      value: '100',
      raw: 'backdrop-grayscale',
      arbitrary: false,
      default: true,
    });
  });

  it('parses preset classes', () => {
    expect(parseBackdropGrayscale('backdrop-grayscale-0')).toEqual({
      type: 'backdrop-grayscale',
      value: '0',
      raw: 'backdrop-grayscale-0',
      arbitrary: false,
    });
    expect(parseBackdropGrayscale('backdrop-grayscale-50')).toEqual({
      type: 'backdrop-grayscale',
      value: '50',
      raw: 'backdrop-grayscale-50',
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseBackdropGrayscale('backdrop-grayscale-[0.5]')).toEqual({
      type: 'backdrop-grayscale',
      value: '0.5',
      raw: 'backdrop-grayscale-[0.5]',
      arbitrary: true,
    });
    expect(parseBackdropGrayscale('backdrop-grayscale-[var(--foo)]')).toEqual({
      type: 'backdrop-grayscale',
      value: 'var(--foo)',
      raw: 'backdrop-grayscale-[var(--foo)]',
      arbitrary: true,
    });
  });

  it('parses custom property', () => {
    expect(parseBackdropGrayscale('backdrop-grayscale-(--my-grayscale)')).toEqual({
      type: 'backdrop-grayscale',
      value: 'var(--my-grayscale)',
      raw: 'backdrop-grayscale-(--my-grayscale)',
      arbitrary: true,
    });
  });

  it('returns null for non-matching', () => {
    expect(parseBackdropGrayscale('backdrop-grayscale-unknown')).toBeNull();
    expect(parseBackdropGrayscale('grayscale')).toBeNull();
  });
}); 