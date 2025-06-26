import { describe, it, expect } from 'vitest';
import { parseAlignItemsUtility } from '../../src/parser/utilities/alignItems';

describe('parseAlignItemsUtility', () => {
  it('parses items-start', () => {
    expect(parseAlignItemsUtility('items-start')).toEqual({
      type: 'align-items',
      preset: 'start',
      raw: 'items-start',
      arbitrary: false,
    });
  });
  it('parses items-end', () => {
    expect(parseAlignItemsUtility('items-end')).toEqual({
      type: 'align-items',
      preset: 'end',
      raw: 'items-end',
      arbitrary: false,
    });
  });
  it('parses items-center', () => {
    expect(parseAlignItemsUtility('items-center')).toEqual({
      type: 'align-items',
      preset: 'center',
      raw: 'items-center',
      arbitrary: false,
    });
  });
  it('parses items-baseline', () => {
    expect(parseAlignItemsUtility('items-baseline')).toEqual({
      type: 'align-items',
      preset: 'baseline',
      raw: 'items-baseline',
      arbitrary: false,
    });
  });
  it('parses items-stretch', () => {
    expect(parseAlignItemsUtility('items-stretch')).toEqual({
      type: 'align-items',
      preset: 'stretch',
      raw: 'items-stretch',
      arbitrary: false,
    });
  });
  it('parses items-[arbitrary]', () => {
    expect(parseAlignItemsUtility('items-[foobar]')).toEqual({
      type: 'align-items',
      value: 'foobar',
      raw: 'items-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseAlignItemsUtility('items')).toBeNull();
    expect(parseAlignItemsUtility('items-')).toBeNull();
    expect(parseAlignItemsUtility('items-arbitrary')).toBeNull();
    expect(parseAlignItemsUtility('justify-items-center')).toBeNull();
  });
}); 