import { describe, it, expect } from 'vitest';
import { parseMixBlendMode } from '../../src/parser/utilities/mixBlendMode';

describe('parseMixBlendMode', () => {
  it('parses all mix-blend-mode presets', () => {
    const presets = [
      'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
      'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
      'exclusion', 'hue', 'saturation', 'color', 'luminosity',
      'plus-darker', 'plus-lighter'
    ];
    for (const preset of presets) {
      const token = `mix-blend-${preset}`;
      expect(parseMixBlendMode(token)).toEqual({ type: 'mix-blend-mode', value: preset, raw: token, arbitrary: false });
    }
  });
  it('returns null for invalid mix-blend-mode', () => {
    expect(parseMixBlendMode('mix-blend-foo')).toBeNull();
    expect(parseMixBlendMode('mix-blend-')).toBeNull();
    expect(parseMixBlendMode('blend-multiply')).toBeNull();
  });
}); 