import { describe, it, expect } from 'vitest';
import { parseOutline } from '../../src/parser/utilities/outline';

describe('parseOutlineStyle', () => {
  it('parses standard outline-style presets', () => {
    expect(parseOutline('outline-solid')).toEqual({ type: 'outline-style', preset: 'solid', raw: 'outline-solid', arbitrary: false });
    expect(parseOutline('outline-dashed')).toEqual({ type: 'outline-style', preset: 'dashed', raw: 'outline-dashed', arbitrary: false });
    expect(parseOutline('outline-dotted')).toEqual({ type: 'outline-style', preset: 'dotted', raw: 'outline-dotted', arbitrary: false });
    expect(parseOutline('outline-double')).toEqual({ type: 'outline-style', preset: 'double', raw: 'outline-double', arbitrary: false });
    expect(parseOutline('outline-none')).toEqual({ type: 'outline-style', preset: 'none', raw: 'outline-none', arbitrary: false });
  });

  it('parses outline-hidden special case', () => {
    expect(parseOutline('outline-hidden')).toEqual({
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
    expect(parseOutline('outline-foo')).toBeNull();
    expect(parseOutline('outline-solid-2')).toBeNull();
    expect(parseOutline('outline')).toBeNull();
    expect(parseOutline('')).toBeNull();
  });
}); 