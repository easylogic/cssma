import { describe, it, expect } from 'vitest';
import { parseMask } from '../../src/parser/utilities/mask';

describe('parseMaskComposite', () => {
  const cases = [
    ['mask-add', 'add'],
    ['mask-subtract', 'subtract'],
    ['mask-intersect', 'intersect'],
    ['mask-exclude', 'exclude'],
  ];
  it('parses all mask-composite presets', () => {
    for (const [token, value] of cases) {
      expect(parseMaskComposite(token)).toEqual({ type: 'mask-composite', value, raw: token, arbitrary: false });
    }
  });
  it('returns null for invalid mask-composite', () => {
    expect(parseMaskComposite('mask-composite-foo')).toBeNull();
    expect(parseMaskComposite('mask-foo')).toBeNull();
    expect(parseMaskComposite('mask-')).toBeNull();
  });
}); 