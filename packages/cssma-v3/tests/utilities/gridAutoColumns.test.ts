import { describe, it, expect } from 'vitest';
import { parseGridAutoColumnsUtility } from '../../src/parser/utilities/gridAutoColumns';

describe('parseGridAutoColumnsUtility', () => {
  it('parses grid-auto-cols-auto', () => {
    expect(parseGridAutoColumnsUtility('grid-auto-cols-auto')).toEqual({
      type: 'grid-auto-columns',
      preset: 'auto',
      raw: 'grid-auto-cols-auto',
      arbitrary: false,
    });
  });
  it('parses grid-auto-cols-min', () => {
    expect(parseGridAutoColumnsUtility('grid-auto-cols-min')).toEqual({
      type: 'grid-auto-columns',
      preset: 'min',
      raw: 'grid-auto-cols-min',
      arbitrary: false,
    });
  });
  it('parses grid-auto-cols-max', () => {
    expect(parseGridAutoColumnsUtility('grid-auto-cols-max')).toEqual({
      type: 'grid-auto-columns',
      preset: 'max',
      raw: 'grid-auto-cols-max',
      arbitrary: false,
    });
  });
  it('parses grid-auto-cols-fr', () => {
    expect(parseGridAutoColumnsUtility('grid-auto-cols-fr')).toEqual({
      type: 'grid-auto-columns',
      preset: 'fr',
      raw: 'grid-auto-cols-fr',
      arbitrary: false,
    });
  });
  it('parses grid-auto-cols-[arbitrary]', () => {
    expect(parseGridAutoColumnsUtility('grid-auto-cols-[200px]')).toEqual({
      type: 'grid-auto-columns',
      value: '200px',
      raw: 'grid-auto-cols-[200px]',
      arbitrary: true,
    });
    expect(parseGridAutoColumnsUtility('grid-auto-cols-[minmax(0,1fr)]')).toEqual({
      type: 'grid-auto-columns',
      value: 'minmax(0,1fr)',
      raw: 'grid-auto-cols-[minmax(0,1fr)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseGridAutoColumnsUtility('grid-auto-cols')).toBeNull();
    expect(parseGridAutoColumnsUtility('grid-auto-cols-')).toBeNull();
    expect(parseGridAutoColumnsUtility('grid-auto-cols-arbitrary')).toBeNull();
    expect(parseGridAutoColumnsUtility('grid-auto-flow-row')).toBeNull();
  });
}); 