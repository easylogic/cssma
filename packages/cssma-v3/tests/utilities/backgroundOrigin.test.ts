import { describe, it, expect } from 'vitest';
import { parseBackgroundOrigin } from '../../src/parser/utilities/backgroundOrigin';

describe('parseBackgroundOrigin', () => {
  it('parses bg-origin-border', () => {
    expect(parseBackgroundOrigin('bg-origin-border')).toEqual({
      type: 'background-origin',
      preset: 'border',
      raw: 'bg-origin-border',
      arbitrary: false,
    });
  });

  it('parses bg-origin-padding', () => {
    expect(parseBackgroundOrigin('bg-origin-padding')).toEqual({
      type: 'background-origin',
      preset: 'padding',
      raw: 'bg-origin-padding',
      arbitrary: false,
    });
  });

  it('parses bg-origin-content', () => {
    expect(parseBackgroundOrigin('bg-origin-content')).toEqual({
      type: 'background-origin',
      preset: 'content',
      raw: 'bg-origin-content',
      arbitrary: false,
    });
  });

  it('returns null for invalid value (bg-origin-foo)', () => {
    expect(parseBackgroundOrigin('bg-origin-foo')).toBeNull();
  });

  it('returns null for empty value (bg-origin-)', () => {
    expect(parseBackgroundOrigin('bg-origin-')).toBeNull();
  });

  it('returns null for similar but invalid (bg-origin-borderx)', () => {
    expect(parseBackgroundOrigin('bg-origin-borderx')).toBeNull();
  });
}); 