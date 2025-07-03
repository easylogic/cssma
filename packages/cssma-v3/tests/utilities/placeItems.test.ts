import { describe, it, expect } from 'vitest';
import { parseAlignment } from '../../src/parser/utilities/alignment';

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
      expect(parseAlignment(token)).toEqual({
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
    expect(parseAlignment('place-items')).toBeNull();
    expect(parseAlignment('place-items-')).toBeNull();
    expect(parseAlignment('place-items-arbitrary')).toBeNull();
    expect(parseAlignment('align-items-center')).toBeNull();
    expect(parseAlignment('place-items-[foobar]')).toBeNull();
    expect(parseAlignment('place-items-(--my-align)')).toBeNull();
  });
}); 