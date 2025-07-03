import { describe, it, expect } from 'vitest';
import { parseAlignment } from '../../src/parser/utilities/alignment';

describe('parseJustifyItemsUtility', () => {
  it('parses justify-items-start', () => {
    expect(parseAlignment('justify-items-start')).toEqual({
      type: 'justify-items',
      preset: 'start',
      raw: 'justify-items-start',
      arbitrary: false,
    });
  });
  it('parses justify-items-end', () => {
    expect(parseAlignment('justify-items-end')).toEqual({
      type: 'justify-items',
      preset: 'end',
      raw: 'justify-items-end',
      arbitrary: false,
    });
  });
  it('parses justify-items-center', () => {
    expect(parseAlignment('justify-items-center')).toEqual({
      type: 'justify-items',
      preset: 'center',
      raw: 'justify-items-center',
      arbitrary: false,
    });
  });
  it('parses justify-items-stretch', () => {
    expect(parseAlignment('justify-items-stretch')).toEqual({
      type: 'justify-items',
      preset: 'stretch',
      raw: 'justify-items-stretch',
      arbitrary: false,
    });
  });
  it('parses justify-items-[arbitrary]', () => {
    expect(parseAlignment('justify-items-[foobar]')).toEqual({
      type: 'justify-items',
      value: 'foobar',
      raw: 'justify-items-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseAlignment('justify-items')).toBeNull();
    expect(parseAlignment('justify-items-')).toBeNull();
    expect(parseAlignment('justify-items-arbitrary')).toBeNull();
    expect(parseAlignment('justify-self-center')).toBeNull();
  });
}); 