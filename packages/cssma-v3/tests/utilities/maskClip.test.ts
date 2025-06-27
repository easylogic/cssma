import { describe, it, expect } from 'vitest';
import { parseMaskClip } from '../../src/parser/utilities/maskClip';

describe('parseMaskClip', () => {
  const cases = [
    ['mask-clip-border', 'border-box'],
    ['mask-clip-padding', 'padding-box'],
    ['mask-clip-content', 'content-box'],
    ['mask-clip-fill', 'fill-box'],
    ['mask-clip-stroke', 'stroke-box'],
    ['mask-clip-view', 'view-box'],
    ['mask-no-clip', 'no-clip'],
  ];
  it('parses all mask-clip presets', () => {
    for (const [token, value] of cases) {
      expect(parseMaskClip(token)).toEqual({ type: 'mask-clip', value, raw: token, arbitrary: false });
    }
  });
  it('returns null for invalid mask-clip', () => {
    expect(parseMaskClip('mask-clip-foo')).toBeNull();
    expect(parseMaskClip('mask-clip-')).toBeNull();
    expect(parseMaskClip('mask-border')).toBeNull();
  });
}); 