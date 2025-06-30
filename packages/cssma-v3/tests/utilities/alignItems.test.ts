import { describe, it, expect } from 'vitest';
import { parseAlignItems } from '../../src/parser/utilities/alignItems';

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
      expect(parseAlignItems(token)).toEqual({
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
    expect(parseAlignItems('items')).toBeNull();
    expect(parseAlignItems('items-')).toBeNull();
    expect(parseAlignItems('items-arbitrary')).toBeNull();
    expect(parseAlignItems('justify-items-center')).toBeNull();
    expect(parseAlignItems('items-[foobar]')).toBeNull();
    expect(parseAlignItems('items-(--my-align)')).toBeNull();
  });
}); 