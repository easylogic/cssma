import { describe, it, expect } from 'vitest';
import { parseMaskOrigin } from '../../src/parser/utilities/maskOrigin';

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
      expect(parseMaskOrigin(token)).toEqual({ type: 'mask-origin', value, raw: token, arbitrary: false });
    }
  });
  it('returns null for invalid mask-origin', () => {
    expect(parseMaskOrigin('mask-origin-foo')).toBeNull();
    expect(parseMaskOrigin('mask-foo')).toBeNull();
    expect(parseMaskOrigin('mask-')).toBeNull();
  });
}); 