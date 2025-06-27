import { describe, it, expect } from 'vitest';
import { parseMaskSize } from '../../src/parser/utilities/maskSize';

describe('parseMaskSize', () => {
  const cases = [
    ['mask-auto', 'auto'],
    ['mask-cover', 'cover'],
    ['mask-contain', 'contain'],
  ];
  it('parses all mask-size presets', () => {
    for (const [token, value] of cases) {
      expect(parseMaskSize(token)).toEqual({ type: 'mask-size', value, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseMaskSize('mask-size-[auto_100px]')).toEqual({ type: 'mask-size', value: 'auto_100px', raw: 'mask-size-[auto_100px]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseMaskSize('mask-size-(--my-mask-size)')).toEqual({ type: 'mask-size', value: 'var(--my-mask-size)', raw: 'mask-size-(--my-mask-size)', arbitrary: true });
  });
  it('returns null for invalid mask-size', () => {
    expect(parseMaskSize('mask-size-foo')).toBeNull();
    expect(parseMaskSize('mask-foo')).toBeNull();
    expect(parseMaskSize('mask-')).toBeNull();
  });
}); 