import { describe, it, expect } from 'vitest';
import { parseGrayscale } from '../../src/parser/utilities/grayscale';

describe('parseGrayscale', () => {
  it('parses grayscale base and presets', () => {
    expect(parseGrayscale('grayscale')).toEqual({ type: 'grayscale', value: '100', raw: 'grayscale', arbitrary: false });
    const presets = ['0', '25', '50', '75', '100'];
    for (const value of presets) {
      const token = `grayscale-${value}`;
      expect(parseGrayscale(token)).toEqual({ type: 'grayscale', value, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseGrayscale('grayscale-[0.5]')).toEqual({ type: 'grayscale', value: '0.5', raw: 'grayscale-[0.5]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseGrayscale('grayscale-(--my-grayscale)')).toEqual({ type: 'grayscale', value: 'var(--my-grayscale)', raw: 'grayscale-(--my-grayscale)', arbitrary: true });
  });
  it('returns null for invalid grayscale', () => {
    expect(parseGrayscale('grayscale-foo')).toBeNull();
    expect(parseGrayscale('grayscale-')).toBeNull();
    expect(parseGrayscale('grayscale100')).toBeNull();
  });
}); 