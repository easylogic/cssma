import { describe, it, expect } from 'vitest';
import { parseMask } from '../../src/parser/utilities/mask';

describe('parseMaskOrigin', () => {
  const cases = [
    ['mask-origin-border', 'border-box'],
    ['mask-origin-padding', 'padding-box'],
    ['mask-origin-content', 'content-box'],
    ['mask-origin-fill', 'fill-box'],
    ['mask-origin-stroke', 'stroke-box'],
    ['mask-origin-view', 'view-box'],
  ];
  it('parses all mask-origin presets', () => {
    for (const [token, value] of cases) {
      expect(parseMask(token)).toEqual({ type: 'mask-origin', value, raw: token, arbitrary: false });
    }
  });
  it('returns null for invalid mask-origin', () => {
    expect(parseMask('mask-origin-foo')).toBeNull();
    expect(parseMask('mask-foo')).toBeNull();
    expect(parseMask('mask-')).toBeNull();
  });
}); 