import { describe, it, expect } from 'vitest';
import { parseBackfaceVisibility } from '../../src/parser/utilities/backfaceVisibility';

describe('parseBackfaceVisibility', () => {
  it('parses backface-hidden', () => {
    expect(parseBackfaceVisibility('backface-hidden')).toEqual({
      type: 'backface-visibility',
      value: 'hidden',
      raw: 'backface-hidden',
      preset: 'backface-hidden',
    });
  });

  it('parses backface-visible', () => {
    expect(parseBackfaceVisibility('backface-visible')).toEqual({
      type: 'backface-visibility',
      value: 'visible',
      raw: 'backface-visible',
      preset: 'backface-visible',
    });
  });

  it('returns null for invalid input', () => {
    expect(parseBackfaceVisibility('backface')).toBeNull();
    expect(parseBackfaceVisibility('backface-hide')).toBeNull();
    expect(parseBackfaceVisibility('backface-visible-foo')).toBeNull();
  });
}); 