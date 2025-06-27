import { describe, it, expect } from 'vitest';
import { parseBackgroundBlendMode } from '../../src/parser/utilities/backgroundBlendMode';

describe('parseBackgroundBlendMode', () => {
  it('parses all background-blend-mode presets', () => {
    const presets = [
      'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
      'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
      'exclusion', 'hue', 'saturation', 'color', 'luminosity'
    ];
    for (const preset of presets) {
      const token = `bg-blend-${preset}`;
      expect(parseBackgroundBlendMode(token)).toEqual({ type: 'background-blend-mode', value: preset, raw: token, arbitrary: false });
    }
  });
  it('returns null for invalid background-blend-mode', () => {
    expect(parseBackgroundBlendMode('bg-blend-foo')).toBeNull();
    expect(parseBackgroundBlendMode('bg-blend-')).toBeNull();
    expect(parseBackgroundBlendMode('blend-multiply')).toBeNull();
  });
}); 