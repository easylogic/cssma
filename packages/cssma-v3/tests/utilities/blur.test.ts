import { describe, it, expect } from 'vitest';
import { parseBlur } from '../../src/parser/utilities/blur';

describe('parseBlur', () => {
  const presets = ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
  it('parses all blur presets', () => {
    for (const preset of presets) {
      const token = `blur-${preset}`;
      expect(parseBlur(token)).toEqual({ type: 'blur', preset, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseBlur('blur-[2px]')).toEqual({ type: 'blur', value: '2px', raw: 'blur-[2px]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseBlur('blur-(--my-blur)')).toEqual({ type: 'blur', value: 'var(--my-blur)', raw: 'blur-(--my-blur)', arbitrary: true });
  });
  it('returns null for invalid blur', () => {
    expect(parseBlur('blur-foo')).toBeNull();
    expect(parseBlur('blur-')).toBeNull();
    expect(parseBlur('blur')).toBeNull();
  });
}); 