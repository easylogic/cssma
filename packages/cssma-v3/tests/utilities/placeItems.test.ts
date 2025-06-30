import { describe, it, expect } from 'vitest';
import { parsePlaceItems } from '../../src/parser/utilities/placeItems';

describe('parsePlaceItems', () => {
  it('parses all Tailwind place-items presets', () => {
    const presets = [
      'start',
      'end',
      'end-safe',
      'center',
      'center-safe',
      'baseline',
      'stretch'
    ];
    for (const preset of presets) {
      const token = `place-items-${preset}`;
      expect(parsePlaceItems(token)).toEqual({
        type: 'place-items',
        value: preset,
        raw: token,
        arbitrary: false,
        customProperty: false,
        preset
      });
    }
  });

  it('returns null for invalid input', () => {
    expect(parsePlaceItems('place-items')).toBeNull();
    expect(parsePlaceItems('place-items-')).toBeNull();
    expect(parsePlaceItems('place-items-arbitrary')).toBeNull();
    expect(parsePlaceItems('align-items-center')).toBeNull();
    expect(parsePlaceItems('place-items-[foobar]')).toBeNull();
    expect(parsePlaceItems('place-items-(--my-align)')).toBeNull();
  });
}); 