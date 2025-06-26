import { describe, it, expect } from 'vitest';
import { parseGridAutoRowsUtility } from '../../src/parser/utilities/gridAutoRows';

describe('parseGridAutoRowsUtility', () => {
  it('parses grid-auto-rows-auto', () => {
    expect(parseGridAutoRowsUtility('grid-auto-rows-auto')).toEqual({
      type: 'grid-auto-rows',
      preset: 'auto',
      raw: 'grid-auto-rows-auto',
      arbitrary: false,
    });
  });
  it('parses grid-auto-rows-min', () => {
    expect(parseGridAutoRowsUtility('grid-auto-rows-min')).toEqual({
      type: 'grid-auto-rows',
      preset: 'min',
      raw: 'grid-auto-rows-min',
      arbitrary: false,
    });
  });
  it('parses grid-auto-rows-max', () => {
    expect(parseGridAutoRowsUtility('grid-auto-rows-max')).toEqual({
      type: 'grid-auto-rows',
      preset: 'max',
      raw: 'grid-auto-rows-max',
      arbitrary: false,
    });
  });
  it('parses grid-auto-rows-fr', () => {
    expect(parseGridAutoRowsUtility('grid-auto-rows-fr')).toEqual({
      type: 'grid-auto-rows',
      preset: 'fr',
      raw: 'grid-auto-rows-fr',
      arbitrary: false,
    });
  });
  it('parses grid-auto-rows-[arbitrary]', () => {
    expect(parseGridAutoRowsUtility('grid-auto-rows-[200px]')).toEqual({
      type: 'grid-auto-rows',
      value: '200px',
      raw: 'grid-auto-rows-[200px]',
      arbitrary: true,
    });
    expect(parseGridAutoRowsUtility('grid-auto-rows-[minmax(0,1fr)]')).toEqual({
      type: 'grid-auto-rows',
      value: 'minmax(0,1fr)',
      raw: 'grid-auto-rows-[minmax(0,1fr)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseGridAutoRowsUtility('grid-auto-rows')).toBeNull();
    expect(parseGridAutoRowsUtility('grid-auto-rows-')).toBeNull();
    expect(parseGridAutoRowsUtility('grid-auto-rows-arbitrary')).toBeNull();
    expect(parseGridAutoRowsUtility('grid-auto-cols-auto')).toBeNull();
  });
}); 