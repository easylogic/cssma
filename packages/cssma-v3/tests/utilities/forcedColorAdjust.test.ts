import { describe, it, expect } from 'vitest';
import { parseForcedColorAdjust } from '../../src/parser/utilities/forcedColorAdjust';

describe('parseForcedColorAdjust', () => {
  it('parses forced-color-adjust-auto', () => {
    expect(parseForcedColorAdjust('forced-color-adjust-auto')).toEqual({ type: 'forced-color-adjust', value: 'auto', raw: 'forced-color-adjust-auto' });
  });
  it('parses forced-color-adjust-none', () => {
    expect(parseForcedColorAdjust('forced-color-adjust-none')).toEqual({ type: 'forced-color-adjust', value: 'none', raw: 'forced-color-adjust-none' });
  });
  it('returns null for invalid input', () => {
    expect(parseForcedColorAdjust('forced-color-adjust-')).toBeNull();
    expect(parseForcedColorAdjust('forced-color-adjust-foo')).toBeNull();
    expect(parseForcedColorAdjust('forced-color-adjust-[auto]')).toBeNull();
    expect(parseForcedColorAdjust('forced-color-adjust-(--foo)')).toBeNull();
    expect(parseForcedColorAdjust('forced-color-adjust-[var(--foo)]')).toBeNull();
    expect(parseForcedColorAdjust('forced-color-adjust')).toBeNull();
  });
}); 