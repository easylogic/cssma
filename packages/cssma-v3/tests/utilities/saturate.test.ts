import { describe, it, expect } from 'vitest';
import { parseSaturate } from '../../src/parser/utilities/saturate';

describe('parseSaturate', () => {
  it('parses saturate presets', () => {
    const presets = ['0', '50', '100', '150', '200'];
    for (const value of presets) {
      const token = `saturate-${value}`;
      expect(parseSaturate(token)).toEqual({ type: 'saturate', value, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseSaturate('saturate-[.25]')).toEqual({ type: 'saturate', value: '.25', raw: 'saturate-[.25]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseSaturate('saturate-(--my-saturation)')).toEqual({ type: 'saturate', value: 'var(--my-saturation)', raw: 'saturate-(--my-saturation)', arbitrary: true });
  });
  it('returns null for invalid saturate', () => {
    expect(parseSaturate('saturate-foo')).toBeNull();
    expect(parseSaturate('saturate-')).toBeNull();
    expect(parseSaturate('saturate--100')).toBeNull();
  });
}); 