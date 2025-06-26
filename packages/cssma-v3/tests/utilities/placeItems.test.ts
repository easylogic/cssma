import { describe, it, expect } from 'vitest';
import { parsePlaceItemsUtility } from '../../src/parser/utilities/placeItems';

describe('parsePlaceItemsUtility', () => {
  it('parses place-items-start', () => {
    expect(parsePlaceItemsUtility('place-items-start')).toEqual({
      type: 'place-items',
      preset: 'start',
      raw: 'place-items-start',
      arbitrary: false,
    });
  });
  it('parses place-items-end', () => {
    expect(parsePlaceItemsUtility('place-items-end')).toEqual({
      type: 'place-items',
      preset: 'end',
      raw: 'place-items-end',
      arbitrary: false,
    });
  });
  it('parses place-items-center', () => {
    expect(parsePlaceItemsUtility('place-items-center')).toEqual({
      type: 'place-items',
      preset: 'center',
      raw: 'place-items-center',
      arbitrary: false,
    });
  });
  it('parses place-items-stretch', () => {
    expect(parsePlaceItemsUtility('place-items-stretch')).toEqual({
      type: 'place-items',
      preset: 'stretch',
      raw: 'place-items-stretch',
      arbitrary: false,
    });
  });
  it('parses place-items-[arbitrary]', () => {
    expect(parsePlaceItemsUtility('place-items-[foobar]')).toEqual({
      type: 'place-items',
      value: 'foobar',
      raw: 'place-items-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parsePlaceItemsUtility('place-items')).toBeNull();
    expect(parsePlaceItemsUtility('place-items-')).toBeNull();
    expect(parsePlaceItemsUtility('place-items-arbitrary')).toBeNull();
    expect(parsePlaceItemsUtility('place-self-center')).toBeNull();
  });
}); 