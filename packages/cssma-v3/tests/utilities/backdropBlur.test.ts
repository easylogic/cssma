import { describe, it, expect } from 'vitest';
import { parseBackdropBlur } from '../../src/parser/utilities/backdropBlur';

describe('parseBackdropBlur', () => {
  const presets = ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
  it('parses all backdrop-blur presets', () => {
    for (const preset of presets) {
      const token = `backdrop-blur-${preset}`;
      expect(parseBackdropBlur(token)).toEqual({ type: 'backdrop-blur', preset, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseBackdropBlur('backdrop-blur-[2px]')).toEqual({ type: 'backdrop-blur', value: '2px', raw: 'backdrop-blur-[2px]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseBackdropBlur('backdrop-blur-(--my-blur)')).toEqual({ type: 'backdrop-blur', value: 'var(--my-blur)', raw: 'backdrop-blur-(--my-blur)', arbitrary: true });
  });
  it('returns null for invalid', () => {
    expect(parseBackdropBlur('backdrop-blur-foo')).toBeNull();
    expect(parseBackdropBlur('backdrop-blur-')).toBeNull();
    expect(parseBackdropBlur('backdrop-blur--sm')).toBeNull();
  });
}); 