import { describe, it, expect } from 'vitest';
import { parseMask } from '../../src/parser/utilities/mask';

describe('parseMaskMode', () => {
  const cases = [
    ['mask-alpha', 'alpha'],
    ['mask-luminance', 'luminance'],
    ['mask-match', 'match-source'],
  ];
  it('parses all mask-mode presets', () => {
    for (const [token, value] of cases) {
      expect(parseMask(token)).toEqual({ type: 'mask-mode', value, raw: token, arbitrary: false });
    }
  });
  it('returns null for invalid mask-mode', () => {
    expect(parseMask('mask-mode-foo')).toBeNull();
    expect(parseMask('mask-foo')).toBeNull();
    expect(parseMask('mask-')).toBeNull();
  });
}); 