import { describe, it, expect } from 'vitest';
import { parseHueRotate } from '../../src/parser/utilities/hueRotate';

describe('parseHueRotate', () => {
  it('parses hue-rotate presets', () => {
    const presets = ['15', '90', '180', '270'];
    for (const value of presets) {
      const token = `hue-rotate-${value}`;
      expect(parseHueRotate(token)).toEqual({ type: 'hue-rotate', value: Number(value), negative: false, raw: token, arbitrary: false });
    }
  });
  it('parses negative hue-rotate presets', () => {
    const negatives = ['-hue-rotate-15', '-hue-rotate-45', '-hue-rotate-90'];
    for (const token of negatives) {
      const value = Number(token.split('-').pop());
      expect(parseHueRotate(token)).toEqual({ type: 'hue-rotate', value, negative: true, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseHueRotate('hue-rotate-[3.142rad]')).toEqual({ type: 'hue-rotate', value: '3.142rad', negative: false, raw: 'hue-rotate-[3.142rad]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseHueRotate('hue-rotate-(--my-hue-rotate)')).toEqual({ type: 'hue-rotate', value: 'var(--my-hue-rotate)', negative: false, raw: 'hue-rotate-(--my-hue-rotate)', arbitrary: true });
  });
  it('returns null for invalid hue-rotate', () => {
    expect(parseHueRotate('hue-rotate-foo')).toBeNull();
    expect(parseHueRotate('hue-rotate-')).toBeNull();
    expect(parseHueRotate('hue-rotate')).toBeNull();
  });
}); 