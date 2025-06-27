import { describe, it, expect } from 'vitest';
import { parseBackdropContrast } from '../../src/parser/utilities/backdropContrast';

describe('parseBackdropContrast', () => {
  it('parses preset classes', () => {
    expect(parseBackdropContrast('backdrop-contrast-50')).toEqual({
      type: 'backdrop-contrast',
      value: '50',
      raw: 'backdrop-contrast-50',
      arbitrary: false,
    });
    expect(parseBackdropContrast('backdrop-contrast-200')).toEqual({
      type: 'backdrop-contrast',
      value: '200',
      raw: 'backdrop-contrast-200',
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseBackdropContrast('backdrop-contrast-[.25]')).toEqual({
      type: 'backdrop-contrast',
      value: '.25',
      raw: 'backdrop-contrast-[.25]',
      arbitrary: true,
    });
    expect(parseBackdropContrast('backdrop-contrast-[var(--foo)]')).toEqual({
      type: 'backdrop-contrast',
      value: 'var(--foo)',
      raw: 'backdrop-contrast-[var(--foo)]',
      arbitrary: true,
    });
  });

  it('parses custom property', () => {
    expect(parseBackdropContrast('backdrop-contrast-(--my-contrast)')).toEqual({
      type: 'backdrop-contrast',
      value: 'var(--my-contrast)',
      raw: 'backdrop-contrast-(--my-contrast)',
      arbitrary: true,
    });
  });

  it('returns null for non-matching', () => {
    expect(parseBackdropContrast('backdrop-contrast-unknown')).toBeNull();
    expect(parseBackdropContrast('contrast-50')).toBeNull();
  });
}); 