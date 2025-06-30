import { describe, it, expect } from 'vitest';
import { parsePlaceSelf } from '../../src/parser/utilities/placeSelf';

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
      expect(parsePlaceSelf(token)).toEqual({
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
    expect(parsePlaceSelf('place-self')).toBeNull();
    expect(parsePlaceSelf('place-self-')).toBeNull();
    expect(parsePlaceSelf('place-self-arbitrary')).toBeNull();
    expect(parsePlaceSelf('align-self-center')).toBeNull();
    expect(parsePlaceSelf('place-self-[foobar]')).toBeNull();
    expect(parsePlaceSelf('place-self-(--my-align)')).toBeNull();
  });
}); 