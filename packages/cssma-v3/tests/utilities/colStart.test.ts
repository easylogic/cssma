import { describe, it, expect } from 'vitest';
import { parseColStart } from '../../src/parser/utilities/colStart';

describe('parseColStartUtility', () => {
  it('parses col-start-<number>', () => {
    expect(parseColStart('col-start-1')).toEqual({
      type: 'col-start',
      value: 1,
      raw: 'col-start-1',
      arbitrary: false,
    });
    expect(parseColStart('col-start-12')).toEqual({
      type: 'col-start',
      value: 12,
      raw: 'col-start-12',
      arbitrary: false,
    });
  });
  it('parses col-start-auto', () => {
    expect(parseColStart('col-start-auto')).toEqual({
      type: 'col-start',
      preset: 'auto',
      raw: 'col-start-auto',
      arbitrary: false,
    });
  });
  it('parses col-start-[arbitrary]', () => {
    expect(parseColStart('col-start-[7]')).toEqual({
      type: 'col-start',
      value: '7',
      raw: 'col-start-[7]',
      arbitrary: true,
    });
    expect(parseColStart('col-start-[var(--start)]')).toEqual({
      type: 'col-start',
      value: 'var(--start)',
      raw: 'col-start-[var(--start)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseColStart('col-start')).toBeNull();
    expect(parseColStart('col-start-')).toBeNull();
    expect(parseColStart('col-start-arbitrary')).toBeNull();
    expect(parseColStart('row-start-2')).toBeNull();
  });
}); 