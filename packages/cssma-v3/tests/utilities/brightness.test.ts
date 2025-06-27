import { describe, it, expect } from 'vitest';
import { parseBrightness } from '../../src/parser/utilities/brightness';

describe('parseBrightness', () => {
  it('parses brightness presets', () => {
    const presets = ['50', '75', '90', '95', '100', '105', '110', '125', '150', '200'];
    for (const value of presets) {
      const token = `brightness-${value}`;
      expect(parseBrightness(token)).toEqual({ type: 'brightness', value, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseBrightness('brightness-[1.75]')).toEqual({ type: 'brightness', value: '1.75', raw: 'brightness-[1.75]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseBrightness('brightness-(--my-brightness)')).toEqual({ type: 'brightness', value: 'var(--my-brightness)', raw: 'brightness-(--my-brightness)', arbitrary: true });
  });
  it('returns null for invalid brightness', () => {
    expect(parseBrightness('brightness-foo')).toBeNull();
    expect(parseBrightness('brightness-')).toBeNull();
    expect(parseBrightness('brightness')).toBeNull();
  });
}); 