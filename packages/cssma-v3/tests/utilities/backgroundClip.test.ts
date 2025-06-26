import { describe, it, expect } from 'vitest';
import { parseBackgroundClip } from '../../src/parser/utilities/backgroundClip';

describe('parseBackgroundClip', () => {
  it('parses bg-clip-border', () => {
    expect(parseBackgroundClip('bg-clip-border')).toEqual({
      type: 'background-clip',
      preset: 'border',
      raw: 'bg-clip-border',
      arbitrary: false,
    });
  });

  it('parses bg-clip-padding', () => {
    expect(parseBackgroundClip('bg-clip-padding')).toEqual({
      type: 'background-clip',
      preset: 'padding',
      raw: 'bg-clip-padding',
      arbitrary: false,
    });
  });

  it('parses bg-clip-content', () => {
    expect(parseBackgroundClip('bg-clip-content')).toEqual({
      type: 'background-clip',
      preset: 'content',
      raw: 'bg-clip-content',
      arbitrary: false,
    });
  });

  it('parses bg-clip-text', () => {
    expect(parseBackgroundClip('bg-clip-text')).toEqual({
      type: 'background-clip',
      preset: 'text',
      raw: 'bg-clip-text',
      arbitrary: false,
    });
  });

  it('returns null for invalid value (bg-clip-foo)', () => {
    expect(parseBackgroundClip('bg-clip-foo')).toBeNull();
  });

  it('returns null for empty value (bg-clip-)', () => {
    expect(parseBackgroundClip('bg-clip-')).toBeNull();
  });

  it('returns null for similar but invalid (bg-clip-borderx)', () => {
    expect(parseBackgroundClip('bg-clip-borderx')).toBeNull();
  });
}); 