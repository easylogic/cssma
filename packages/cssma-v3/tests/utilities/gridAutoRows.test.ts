import { describe, it, expect } from 'vitest';
import { parseGridAutoRows } from '../../src/parser/utilities/gridAutoRows';

describe('parseGridAutoRowsUtility', () => {
  it('parses grid-auto-rows-auto', () => {
    expect(parseGridAutoRows('grid-auto-rows-auto')).toEqual({
      type: 'grid-auto-rows',
      preset: 'auto',
      raw: 'grid-auto-rows-auto',
      arbitrary: false,
    });
  });
  it('parses grid-auto-rows-min', () => {
    expect(parseGridAutoRows('grid-auto-rows-min')).toEqual({
      type: 'grid-auto-rows',
      preset: 'min',
      raw: 'grid-auto-rows-min',
      arbitrary: false,
    });
  });
  it('parses grid-auto-rows-max', () => {
    expect(parseGridAutoRows('grid-auto-rows-max')).toEqual({
      type: 'grid-auto-rows',
      preset: 'max',
      raw: 'grid-auto-rows-max',
      arbitrary: false,
    });
  });
  it('parses grid-auto-rows-fr', () => {
    expect(parseGridAutoRows('grid-auto-rows-fr')).toEqual({
      type: 'grid-auto-rows',
      preset: 'fr',
      raw: 'grid-auto-rows-fr',
      arbitrary: false,
    });
  });
  it('parses grid-auto-rows-[arbitrary]', () => {
    expect(parseGridAutoRows('grid-auto-rows-[200px]')).toEqual({
      type: 'grid-auto-rows',
      value: '200px',
      raw: 'grid-auto-rows-[200px]',
      arbitrary: true,
    });
    expect(parseGridAutoRows('grid-auto-rows-[minmax(0,1fr)]')).toEqual({
      type: 'grid-auto-rows',
      value: 'minmax(0,1fr)',
      raw: 'grid-auto-rows-[minmax(0,1fr)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseGridAutoRows('grid-auto-rows')).toBeNull();
    expect(parseGridAutoRows('grid-auto-rows-')).toBeNull();
    expect(parseGridAutoRows('grid-auto-rows-arbitrary')).toBeNull();
    expect(parseGridAutoRows('grid-auto-cols-auto')).toBeNull();
  });
}); 