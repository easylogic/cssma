import { describe, it, expect } from 'vitest';
import { parsePlaceItems } from '../../src/parser/utilities/placeItems';

describe('parsePlaceItemsUtility', () => {
  it('parses place-items-start', () => {
    expect(parsePlaceItems('place-items-start')).toEqual({
      type: 'place-items',
      preset: 'start',
      raw: 'place-items-start',
      arbitrary: false,
    });
  });
  it('parses place-items-end', () => {
    expect(parsePlaceItems('place-items-end')).toEqual({
      type: 'place-items',
      preset: 'end',
      raw: 'place-items-end',
      arbitrary: false,
    });
  });
  it('parses place-items-center', () => {
    expect(parsePlaceItems('place-items-center')).toEqual({
      type: 'place-items',
      preset: 'center',
      raw: 'place-items-center',
      arbitrary: false,
    });
  });
  it('parses place-items-stretch', () => {
    expect(parsePlaceItems('place-items-stretch')).toEqual({
      type: 'place-items',
      preset: 'stretch',
      raw: 'place-items-stretch',
      arbitrary: false,
    });
  });
  it('parses place-items-[arbitrary]', () => {
    expect(parsePlaceItems('place-items-[foobar]')).toEqual({
      type: 'place-items',
      value: 'foobar',
      raw: 'place-items-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parsePlaceItems('place-items')).toBeNull();
    expect(parsePlaceItems('place-items-')).toBeNull();
    expect(parsePlaceItems('place-items-arbitrary')).toBeNull();
    expect(parsePlaceItems('place-self-center')).toBeNull();
  });
}); 