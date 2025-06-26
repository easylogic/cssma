import { describe, it, expect } from 'vitest';
import { parseAlignItems } from '../../src/parser/utilities/alignItems';

describe('parseAlignItemsUtility', () => {
  it('parses items-start', () => {
    expect(parseAlignItems('items-start')).toEqual({
      type: 'align-items',
      preset: 'start',
      raw: 'items-start',
      arbitrary: false,
    });
  });
  it('parses items-end', () => {
    expect(parseAlignItems('items-end')).toEqual({
      type: 'align-items',
      preset: 'end',
      raw: 'items-end',
      arbitrary: false,
    });
  });
  it('parses items-center', () => {
    expect(parseAlignItems('items-center')).toEqual({
      type: 'align-items',
      preset: 'center',
      raw: 'items-center',
      arbitrary: false,
    });
  });
  it('parses items-baseline', () => {
    expect(parseAlignItems('items-baseline')).toEqual({
      type: 'align-items',
      preset: 'baseline',
      raw: 'items-baseline',
      arbitrary: false,
    });
  });
  it('parses items-stretch', () => {
    expect(parseAlignItems('items-stretch')).toEqual({
      type: 'align-items',
      preset: 'stretch',
      raw: 'items-stretch',
      arbitrary: false,
    });
  });
  it('parses items-[arbitrary]', () => {
    expect(parseAlignItems('items-[foobar]')).toEqual({
      type: 'align-items',
      value: 'foobar',
      raw: 'items-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseAlignItems('items')).toBeNull();
    expect(parseAlignItems('items-')).toBeNull();
    expect(parseAlignItems('items-arbitrary')).toBeNull();
    expect(parseAlignItems('justify-items-center')).toBeNull();
  });
}); 