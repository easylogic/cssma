import { describe, it, expect } from 'vitest';
import { parseMaskMode } from '../../src/parser/utilities/maskMode';

describe('parseMaskMode', () => {
  const cases = [
    ['mask-alpha', 'alpha'],
    ['mask-luminance', 'luminance'],
    ['mask-match', 'match-source'],
  ];
  it('parses all mask-mode presets', () => {
    for (const [token, value] of cases) {
      expect(parseMaskMode(token)).toEqual({ type: 'mask-mode', value, raw: token, arbitrary: false });
    }
  });
  it('returns null for invalid mask-mode', () => {
    expect(parseMaskMode('mask-mode-foo')).toBeNull();
    expect(parseMaskMode('mask-foo')).toBeNull();
    expect(parseMaskMode('mask-')).toBeNull();
  });
}); 