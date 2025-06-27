import { describe, it, expect } from 'vitest';
import { parseInvert } from '../../src/parser/utilities/invert';

describe('parseInvert', () => {
  it('parses invert base and presets', () => {
    expect(parseInvert('invert')).toEqual({ type: 'invert', value: '100', raw: 'invert', arbitrary: false });
    const presets = ['0', '20', '50', '100'];
    for (const value of presets) {
      const token = `invert-${value}`;
      expect(parseInvert(token)).toEqual({ type: 'invert', value, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseInvert('invert-[.25]')).toEqual({ type: 'invert', value: '.25', raw: 'invert-[.25]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseInvert('invert-(--my-inversion)')).toEqual({ type: 'invert', value: 'var(--my-inversion)', raw: 'invert-(--my-inversion)', arbitrary: true });
  });
  it('returns null for invalid invert', () => {
    expect(parseInvert('invert-foo')).toBeNull();
    expect(parseInvert('invert-')).toBeNull();
    expect(parseInvert('invert--100')).toBeNull();
  });
}); 