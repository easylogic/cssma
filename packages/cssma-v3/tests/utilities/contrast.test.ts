import { describe, it, expect } from 'vitest';
import { parseContrast } from '../../src/parser/utilities/contrast';

describe('parseContrast', () => {
  it('parses contrast presets', () => {
    const presets = ['0', '50', '75', '100', '125', '150', '200'];
    for (const value of presets) {
      const token = `contrast-${value}`;
      expect(parseContrast(token)).toEqual({ type: 'contrast', value, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseContrast('contrast-[.25]')).toEqual({ type: 'contrast', value: '.25', raw: 'contrast-[.25]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseContrast('contrast-(--my-contrast)')).toEqual({ type: 'contrast', value: 'var(--my-contrast)', raw: 'contrast-(--my-contrast)', arbitrary: true });
  });
  it('returns null for invalid contrast', () => {
    expect(parseContrast('contrast-foo')).toBeNull();
    expect(parseContrast('contrast-')).toBeNull();
    expect(parseContrast('contrast')).toBeNull();
  });
}); 