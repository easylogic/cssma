import { describe, it, expect } from 'vitest';
import { parseAlignment } from '../../src/parser/utilities/alignment';

describe('parseAlignItems', () => {
  it('parses all Tailwind align-items presets', () => {
    const presets = [
      'start',
      'end',
      'end-safe',
      'center',
      'center-safe',
      'baseline',
      'baseline-last',
      'stretch'
    ];
    for (const preset of presets) {
      const token = `items-${preset}`;
      expect(parseAlignment(token)).toEqual({
        type: 'align-items',
        value: preset,
        raw: token,
        arbitrary: false,
        customProperty: false,
        preset
      });
    }
  });

  it('returns null for invalid input', () => {
    expect(parseAlignment('items')).toBeNull();
    expect(parseAlignment('items-')).toBeNull();
    expect(parseAlignment('items-arbitrary')).toBeNull();
    expect(parseAlignment('justify-items-center')).toBeNull();
    expect(parseAlignment('items-[foobar]')).toBeNull();
    expect(parseAlignment('items-(--my-align)')).toBeNull();
  });
}); 