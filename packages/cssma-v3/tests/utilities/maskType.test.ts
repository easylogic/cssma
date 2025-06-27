import { describe, it, expect } from 'vitest';
import { parseMaskType } from '../../src/parser/utilities/maskType';

describe('parseMaskType', () => {
  const cases = [
    ['mask-type-alpha', 'alpha'],
    ['mask-type-luminance', 'luminance'],
  ];
  it('parses all mask-type presets', () => {
    for (const [token, value] of cases) {
      expect(parseMaskType(token)).toEqual({ type: 'mask-type', value, raw: token, arbitrary: false });
    }
  });
  it('returns null for invalid mask-type', () => {
    expect(parseMaskType('mask-type-foo')).toBeNull();
    expect(parseMaskType('mask-foo')).toBeNull();
    expect(parseMaskType('mask-')).toBeNull();
  });
}); 