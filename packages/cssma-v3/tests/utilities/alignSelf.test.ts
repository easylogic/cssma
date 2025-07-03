import { describe, it, expect } from 'vitest';
import { parseAlignment } from '../../src/parser/utilities/alignment';

describe('parseAlignSelf', () => {
  it('parses all Tailwind align-self presets', () => {
    const presets = [
      'auto',
      'start',
      'end',
      'end-safe',
      'center',
      'center-safe',
      'stretch',
      'baseline',
      'baseline-last'
    ];
    for (const preset of presets) {
      const token = `self-${preset}`;
      expect(parseAlignment(token)).toEqual({
        type: 'align-self',
        value: preset,
        raw: token,
        arbitrary: false,
        customProperty: false,
        preset
      });
    }
  });

  it('returns null for invalid input', () => {
    expect(parseAlignment('self')).toBeNull();
    expect(parseAlignment('self-')).toBeNull();
    expect(parseAlignment('self-arbitrary')).toBeNull();
    expect(parseAlignment('align-self-center')).toBeNull();
    expect(parseAlignment('self-[foobar]')).toBeNull();
    expect(parseAlignment('self-(--my-align)')).toBeNull();
  });
}); 