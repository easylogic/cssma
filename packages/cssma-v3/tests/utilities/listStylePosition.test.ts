import { describe, it, expect } from 'vitest';
import { parseListStylePosition } from '../../src/parser/utilities/listStylePosition';

describe('parseListStylePosition', () => {
  it('parses list-inside', () => {
    expect(parseListStylePosition('list-inside')).toEqual({ type: 'list-style-position', value: 'inside', raw: 'list-inside' });
  });

  it('parses list-outside', () => {
    expect(parseListStylePosition('list-outside')).toEqual({ type: 'list-style-position', value: 'outside', raw: 'list-outside' });
  });

  it('returns null for invalid input', () => {
    expect(parseListStylePosition('list')).toBeNull();
    expect(parseListStylePosition('list-inside-foo')).toBeNull();
    expect(parseListStylePosition('list-outside-bar')).toBeNull();
    expect(parseListStylePosition('list-inside-outside')).toBeNull();
    expect(parseListStylePosition('list-position')).toBeNull();
  });
}); 