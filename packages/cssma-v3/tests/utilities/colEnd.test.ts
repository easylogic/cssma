import { describe, it, expect } from 'vitest';
import { parseGrid } from '../../src/parser/utilities/grid';

describe('parseColEndUtility', () => {
  it('parses col-end-<number>', () => {
    expect(parseGrid('col-end-1')).toEqual({
      type: 'col-end',
      value: 1,
      raw: 'col-end-1',
      arbitrary: false,
    });
    expect(parseGrid('col-end-12')).toEqual({
      type: 'col-end',
      value: 12,
      raw: 'col-end-12',
      arbitrary: false,
    });
  });
  it('parses col-end-auto', () => {
    expect(parseGrid('col-end-auto')).toEqual({
      type: 'col-end',
      preset: 'auto',
      raw: 'col-end-auto',
      arbitrary: false,
    });
  });
  it('parses col-end-[arbitrary]', () => {
    expect(parseGrid('col-end-[7]')).toEqual({
      type: 'col-end',
      value: '7',
      raw: 'col-end-[7]',
      arbitrary: true,
    });
    expect(parseGrid('col-end-[var(--end)]')).toEqual({
      type: 'col-end',
      value: 'var(--end)',
      raw: 'col-end-[var(--end)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseGrid('col-end')).toBeNull();
    expect(parseGrid('col-end-')).toBeNull();
    expect(parseGrid('col-end-arbitrary')).toBeNull();
    expect(parseGrid('row-end-2')).toBeNull();
  });
}); 