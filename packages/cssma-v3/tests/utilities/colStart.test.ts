import { describe, it, expect } from 'vitest';
import { parseGrid } from '../../src/parser/utilities/grid';

describe('parseColStartUtility', () => {
  it('parses col-start-<number>', () => {
    expect(parseGrid('col-start-1')).toEqual({
      type: 'col-start',
      value: 1,
      raw: 'col-start-1',
      arbitrary: false,
    });
    expect(parseGrid('col-start-12')).toEqual({
      type: 'col-start',
      value: 12,
      raw: 'col-start-12',
      arbitrary: false,
    });
  });
  it('parses col-start-auto', () => {
    expect(parseGrid('col-start-auto')).toEqual({
      type: 'col-start',
      preset: 'auto',
      raw: 'col-start-auto',
      arbitrary: false,
    });
  });
  it('parses col-start-[arbitrary]', () => {
    expect(parseGrid('col-start-[7]')).toEqual({
      type: 'col-start',
      value: '7',
      raw: 'col-start-[7]',
      arbitrary: true,
    });
    expect(parseGrid('col-start-[var(--start)]')).toEqual({
      type: 'col-start',
      value: 'var(--start)',
      raw: 'col-start-[var(--start)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseGrid('col-start')).toBeNull();
    expect(parseGrid('col-start-')).toBeNull();
    expect(parseGrid('col-start-arbitrary')).toBeNull();
    expect(parseGrid('row-start-2')).toBeNull();
  });
}); 