import { describe, it, expect } from 'vitest';
import { parseMaskRepeat } from '../../src/parser/utilities/maskRepeat';

describe('parseMaskRepeat', () => {
  const cases = [
    ['mask-repeat', 'repeat'],
    ['mask-no-repeat', 'no-repeat'],
    ['mask-repeat-x', 'repeat-x'],
    ['mask-repeat-y', 'repeat-y'],
    ['mask-repeat-space', 'space'],
    ['mask-repeat-round', 'round'],
  ];
  it('parses all mask-repeat presets', () => {
    for (const [token, value] of cases) {
      expect(parseMaskRepeat(token)).toEqual({ type: 'mask-repeat', value, raw: token, arbitrary: false });
    }
  });
  it('returns null for invalid mask-repeat', () => {
    expect(parseMaskRepeat('mask-repeat-foo')).toBeNull();
    expect(parseMaskRepeat('mask-foo')).toBeNull();
    expect(parseMaskRepeat('mask-')).toBeNull();
  });
}); 