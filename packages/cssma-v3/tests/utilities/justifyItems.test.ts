import { describe, it, expect } from 'vitest';
import { parseJustifyItemsUtility } from '../../src/parser/utilities/justifyItems';

describe('parseJustifyItemsUtility', () => {
  it('parses justify-items-start', () => {
    expect(parseJustifyItemsUtility('justify-items-start')).toEqual({
      type: 'justify-items',
      preset: 'start',
      raw: 'justify-items-start',
      arbitrary: false,
    });
  });
  it('parses justify-items-end', () => {
    expect(parseJustifyItemsUtility('justify-items-end')).toEqual({
      type: 'justify-items',
      preset: 'end',
      raw: 'justify-items-end',
      arbitrary: false,
    });
  });
  it('parses justify-items-center', () => {
    expect(parseJustifyItemsUtility('justify-items-center')).toEqual({
      type: 'justify-items',
      preset: 'center',
      raw: 'justify-items-center',
      arbitrary: false,
    });
  });
  it('parses justify-items-stretch', () => {
    expect(parseJustifyItemsUtility('justify-items-stretch')).toEqual({
      type: 'justify-items',
      preset: 'stretch',
      raw: 'justify-items-stretch',
      arbitrary: false,
    });
  });
  it('parses justify-items-[arbitrary]', () => {
    expect(parseJustifyItemsUtility('justify-items-[foobar]')).toEqual({
      type: 'justify-items',
      value: 'foobar',
      raw: 'justify-items-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseJustifyItemsUtility('justify-items')).toBeNull();
    expect(parseJustifyItemsUtility('justify-items-')).toBeNull();
    expect(parseJustifyItemsUtility('justify-items-arbitrary')).toBeNull();
    expect(parseJustifyItemsUtility('justify-self-center')).toBeNull();
  });
}); 