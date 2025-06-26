import { describe, it, expect } from 'vitest';
import { parseJustifyItems } from '../../src/parser/utilities/justifyItems';

describe('parseJustifyItemsUtility', () => {
  it('parses justify-items-start', () => {
    expect(parseJustifyItems('justify-items-start')).toEqual({
      type: 'justify-items',
      preset: 'start',
      raw: 'justify-items-start',
      arbitrary: false,
    });
  });
  it('parses justify-items-end', () => {
    expect(parseJustifyItems('justify-items-end')).toEqual({
      type: 'justify-items',
      preset: 'end',
      raw: 'justify-items-end',
      arbitrary: false,
    });
  });
  it('parses justify-items-center', () => {
    expect(parseJustifyItems('justify-items-center')).toEqual({
      type: 'justify-items',
      preset: 'center',
      raw: 'justify-items-center',
      arbitrary: false,
    });
  });
  it('parses justify-items-stretch', () => {
    expect(parseJustifyItems('justify-items-stretch')).toEqual({
      type: 'justify-items',
      preset: 'stretch',
      raw: 'justify-items-stretch',
      arbitrary: false,
    });
  });
  it('parses justify-items-[arbitrary]', () => {
    expect(parseJustifyItems('justify-items-[foobar]')).toEqual({
      type: 'justify-items',
      value: 'foobar',
      raw: 'justify-items-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseJustifyItems('justify-items')).toBeNull();
    expect(parseJustifyItems('justify-items-')).toBeNull();
    expect(parseJustifyItems('justify-items-arbitrary')).toBeNull();
    expect(parseJustifyItems('justify-self-center')).toBeNull();
  });
}); 