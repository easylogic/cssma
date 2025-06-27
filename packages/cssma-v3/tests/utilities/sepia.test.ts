import { describe, it, expect } from 'vitest';
import { parseSepia } from '../../src/parser/utilities/sepia';

describe('parseSepia', () => {
  it('parses sepia base and presets', () => {
    expect(parseSepia('sepia')).toEqual({ type: 'sepia', value: '100', raw: 'sepia', arbitrary: false });
    const presets = ['0', '50', '100'];
    for (const value of presets) {
      const token = `sepia-${value}`;
      expect(parseSepia(token)).toEqual({ type: 'sepia', value, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseSepia('sepia-[.25]')).toEqual({ type: 'sepia', value: '.25', raw: 'sepia-[.25]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseSepia('sepia-(--my-sepia)')).toEqual({ type: 'sepia', value: 'var(--my-sepia)', raw: 'sepia-(--my-sepia)', arbitrary: true });
  });
  it('returns null for invalid sepia', () => {
    expect(parseSepia('sepia-foo')).toBeNull();
    expect(parseSepia('sepia-')).toBeNull();
    expect(parseSepia('sepia--100')).toBeNull();
  });
}); 