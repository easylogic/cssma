import { describe, it, expect } from 'vitest';
import { parseMaskPosition } from '../../src/parser/utilities/maskPosition';

describe('parseMaskPosition', () => {
  const cases = [
    ['mask-top-left', 'top left'],
    ['mask-top', 'top'],
    ['mask-top-right', 'top right'],
    ['mask-left', 'left'],
    ['mask-center', 'center'],
    ['mask-right', 'right'],
    ['mask-bottom-left', 'bottom left'],
    ['mask-bottom', 'bottom'],
    ['mask-bottom-right', 'bottom right'],
  ];
  it('parses all mask-position presets', () => {
    for (const [token, value] of cases) {
      expect(parseMaskPosition(token)).toEqual({ type: 'mask-position', value, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseMaskPosition('mask-position-[center_top_1rem]')).toEqual({ type: 'mask-position', value: 'center_top_1rem', raw: 'mask-position-[center_top_1rem]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseMaskPosition('mask-position-(--my-mask-position)')).toEqual({ type: 'mask-position', value: 'var(--my-mask-position)', raw: 'mask-position-(--my-mask-position)', arbitrary: true });
  });
  it('returns null for invalid mask-position', () => {
    expect(parseMaskPosition('mask-position-foo')).toBeNull();
    expect(parseMaskPosition('mask-foo')).toBeNull();
    expect(parseMaskPosition('mask-')).toBeNull();
  });
}); 