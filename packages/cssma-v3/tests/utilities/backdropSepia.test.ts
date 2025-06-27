import { describe, it, expect } from 'vitest';
import { parseBackdropSepia } from '../../src/parser/utilities/backdropSepia';

describe('parseBackdropSepia', () => {
  it('parses default class', () => {
    expect(parseBackdropSepia('backdrop-sepia')).toEqual({
      type: 'backdrop-sepia',
      value: '100',
      raw: 'backdrop-sepia',
      arbitrary: false,
      default: true,
    });
  });

  it('parses preset classes', () => {
    expect(parseBackdropSepia('backdrop-sepia-0')).toEqual({
      type: 'backdrop-sepia',
      value: '0',
      raw: 'backdrop-sepia-0',
      arbitrary: false,
    });
    expect(parseBackdropSepia('backdrop-sepia-50')).toEqual({
      type: 'backdrop-sepia',
      value: '50',
      raw: 'backdrop-sepia-50',
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseBackdropSepia('backdrop-sepia-[.25]')).toEqual({
      type: 'backdrop-sepia',
      value: '.25',
      raw: 'backdrop-sepia-[.25]',
      arbitrary: true,
    });
    expect(parseBackdropSepia('backdrop-sepia-[var(--foo)]')).toEqual({
      type: 'backdrop-sepia',
      value: 'var(--foo)',
      raw: 'backdrop-sepia-[var(--foo)]',
      arbitrary: true,
    });
  });

  it('parses custom property', () => {
    expect(parseBackdropSepia('backdrop-sepia-(--my-sepia)')).toEqual({
      type: 'backdrop-sepia',
      value: 'var(--my-sepia)',
      raw: 'backdrop-sepia-(--my-sepia)',
      arbitrary: true,
    });
  });

  it('returns null for non-matching', () => {
    expect(parseBackdropSepia('backdrop-sepia-unknown')).toBeNull();
    expect(parseBackdropSepia('sepia-50')).toBeNull();
  });
}); 