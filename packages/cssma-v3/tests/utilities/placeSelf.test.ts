import { describe, it, expect } from 'vitest';
import { parseAlignment } from '../../src/parser/utilities/alignment';

describe('parsePlaceSelf', () => {
  it('parses all Tailwind place-self presets', () => {
    const presets = [
      'auto',
      'start',
      'end',
      'end-safe',
      'center',
      'center-safe',
      'stretch'
    ];
    for (const preset of presets) {
      const token = `place-self-${preset}`;
      expect(parseAlignment(token)).toEqual({
        type: 'place-self',
        value: preset,
        raw: token,
        arbitrary: false,
        customProperty: false,
        preset
      });
    }
  });

  it('returns null for invalid input', () => {
    expect(parseAlignment('place-self')).toBeNull();
    expect(parseAlignment('place-self-')).toBeNull();
    expect(parseAlignment('place-self-arbitrary')).toBeNull();
    expect(parseAlignment('align-self-center')).toBeNull();
    expect(parseAlignment('place-self-[foobar]')).toBeNull();
    expect(parseAlignment('place-self-(--my-align)')).toBeNull();
  });
}); 