import { describe, it, expect } from 'vitest';
import { parseOutlineStyle } from '../../src/parser/utilities/outlineStyle';

describe('parseOutlineStyle', () => {
  it('parses standard outline-style presets', () => {
    expect(parseOutlineStyle('outline-solid')).toEqual({ type: 'outline-style', preset: 'solid', raw: 'outline-solid', arbitrary: false });
    expect(parseOutlineStyle('outline-dashed')).toEqual({ type: 'outline-style', preset: 'dashed', raw: 'outline-dashed', arbitrary: false });
    expect(parseOutlineStyle('outline-dotted')).toEqual({ type: 'outline-style', preset: 'dotted', raw: 'outline-dotted', arbitrary: false });
    expect(parseOutlineStyle('outline-double')).toEqual({ type: 'outline-style', preset: 'double', raw: 'outline-double', arbitrary: false });
    expect(parseOutlineStyle('outline-none')).toEqual({ type: 'outline-style', preset: 'none', raw: 'outline-none', arbitrary: false });
  });

  it('parses outline-hidden special case', () => {
    expect(parseOutlineStyle('outline-hidden')).toEqual({
      type: 'outline-style',
      preset: 'hidden',
      raw: 'outline-hidden',
      arbitrary: false,
      special: true,
      style: 'solid',
      width: '2px',
      color: 'transparent',
      offset: '2px',
    });
  });

  it('returns null for invalid tokens', () => {
    expect(parseOutlineStyle('outline-foo')).toBeNull();
    expect(parseOutlineStyle('outline-solid-2')).toBeNull();
    expect(parseOutlineStyle('outline')).toBeNull();
    expect(parseOutlineStyle('')).toBeNull();
  });
}); 