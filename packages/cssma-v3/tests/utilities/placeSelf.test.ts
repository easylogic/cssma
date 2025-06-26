import { describe, it, expect } from 'vitest';
import { parsePlaceSelf } from '../../src/parser/utilities/placeSelf';

describe('parsePlaceSelfUtility', () => {
  it('parses place-self-auto', () => {
    expect(parsePlaceSelf('place-self-auto')).toEqual({
      type: 'place-self',
      preset: 'auto',
      raw: 'place-self-auto',
      arbitrary: false,
    });
  });
  it('parses place-self-start', () => {
    expect(parsePlaceSelf('place-self-start')).toEqual({
      type: 'place-self',
      preset: 'start',
      raw: 'place-self-start',
      arbitrary: false,
    });
  });
  it('parses place-self-end', () => {
    expect(parsePlaceSelf('place-self-end')).toEqual({
      type: 'place-self',
      preset: 'end',
      raw: 'place-self-end',
      arbitrary: false,
    });
  });
  it('parses place-self-center', () => {
    expect(parsePlaceSelf('place-self-center')).toEqual({
      type: 'place-self',
      preset: 'center',
      raw: 'place-self-center',
      arbitrary: false,
    });
  });
  it('parses place-self-stretch', () => {
    expect(parsePlaceSelf('place-self-stretch')).toEqual({
      type: 'place-self',
      preset: 'stretch',
      raw: 'place-self-stretch',
      arbitrary: false,
    });
  });
  it('parses place-self-[arbitrary]', () => {
    expect(parsePlaceSelf('place-self-[foobar]')).toEqual({
      type: 'place-self',
      value: 'foobar',
      raw: 'place-self-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parsePlaceSelf('place-self')).toBeNull();
    expect(parsePlaceSelf('place-self-')).toBeNull();
    expect(parsePlaceSelf('place-self-arbitrary')).toBeNull();
    expect(parsePlaceSelf('place-items-center')).toBeNull();
  });
}); 