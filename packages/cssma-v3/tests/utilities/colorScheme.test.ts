import { describe, it, expect } from 'vitest';
import { parseColorScheme } from '../../src/parser/utilities/colorScheme';

describe('parseColorScheme', () => {
  it('parses scheme-normal', () => {
    expect(parseColorScheme('scheme-normal')).toEqual({ type: 'color-scheme', value: 'normal', raw: 'scheme-normal', preset: 'normal' });
  });
  it('parses scheme-dark', () => {
    expect(parseColorScheme('scheme-dark')).toEqual({ type: 'color-scheme', value: 'dark', raw: 'scheme-dark', preset: 'dark' });
  });
  it('parses scheme-light', () => {
    expect(parseColorScheme('scheme-light')).toEqual({ type: 'color-scheme', value: 'light', raw: 'scheme-light', preset: 'light' });
  });
  it('parses scheme-light-dark', () => {
    expect(parseColorScheme('scheme-light-dark')).toEqual({ type: 'color-scheme', value: 'light dark', raw: 'scheme-light-dark', preset: 'light dark' });
  });
  it('parses scheme-only-dark', () => {
    expect(parseColorScheme('scheme-only-dark')).toEqual({ type: 'color-scheme', value: 'only dark', raw: 'scheme-only-dark', preset: 'only dark' });
  });
  it('parses scheme-only-light', () => {
    expect(parseColorScheme('scheme-only-light')).toEqual({ type: 'color-scheme', value: 'only light', raw: 'scheme-only-light', preset: 'only light' });
  });
  it('returns null for invalid input', () => {
    expect(parseColorScheme('scheme')).toBeNull();
    expect(parseColorScheme('scheme-foo')).toBeNull();
    expect(parseColorScheme('scheme-light-dark-only')).toBeNull();
    expect(parseColorScheme('color-scheme-dark')).toBeNull();
  });
}); 