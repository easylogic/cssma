import { describe, it, expect } from 'vitest';
import { parseOutlineColor } from '../../src/parser/utilities/outlineColor';

describe('parseOutlineColor', () => {
  it('parses preset colors', () => {
    expect(parseOutlineColor('outline-black')).toEqual({
      type: 'outline-color',
      preset: 'black',
      raw: 'outline-black',
      arbitrary: false,
    });
    expect(parseOutlineColor('outline-white')).toEqual({
      type: 'outline-color',
      preset: 'white',
      raw: 'outline-white',
      arbitrary: false,
    });
  });

  it('parses custom property', () => {
    expect(parseOutlineColor('outline-(--my-outline-color)')).toEqual({
      type: 'outline-color',
      value: 'var(--my-outline-color)',
      raw: 'outline-(--my-outline-color)',
      arbitrary: true,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseOutlineColor('outline-[#243c5a]')).toEqual({
      type: 'outline-color',
      value: '#243c5a',
      raw: 'outline-[#243c5a]',
      arbitrary: true,
    });
  });

  it('returns null for invalid input', () => {
    expect(parseOutlineColor('outline-foo')).toBeNull();
    expect(parseOutlineColor('outline-')).toBeNull();
    expect(parseOutlineColor('outline-[]')).toBeNull();
    expect(parseOutlineColor('outline-()')).toBeNull();
  });
}); 