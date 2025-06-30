import { describe, it, expect } from 'vitest';
import { parseAlignSelf } from '../../src/parser/utilities/alignSelf';

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
      expect(parseAlignSelf(token)).toEqual({
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
    expect(parseAlignSelf('self')).toBeNull();
    expect(parseAlignSelf('self-')).toBeNull();
    expect(parseAlignSelf('self-arbitrary')).toBeNull();
    expect(parseAlignSelf('align-self-center')).toBeNull();
    expect(parseAlignSelf('self-[foobar]')).toBeNull();
    expect(parseAlignSelf('self-(--my-align)')).toBeNull();
  });
}); 