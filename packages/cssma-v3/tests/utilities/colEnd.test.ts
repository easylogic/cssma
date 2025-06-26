import { describe, it, expect } from 'vitest';
import { parseColEnd } from '../../src/parser/utilities/colEnd';

describe('parseColEndUtility', () => {
  it('parses col-end-<number>', () => {
    expect(parseColEnd('col-end-1')).toEqual({
      type: 'col-end',
      value: 1,
      raw: 'col-end-1',
      arbitrary: false,
    });
    expect(parseColEnd('col-end-12')).toEqual({
      type: 'col-end',
      value: 12,
      raw: 'col-end-12',
      arbitrary: false,
    });
  });
  it('parses col-end-auto', () => {
    expect(parseColEnd('col-end-auto')).toEqual({
      type: 'col-end',
      preset: 'auto',
      raw: 'col-end-auto',
      arbitrary: false,
    });
  });
  it('parses col-end-[arbitrary]', () => {
    expect(parseColEnd('col-end-[7]')).toEqual({
      type: 'col-end',
      value: '7',
      raw: 'col-end-[7]',
      arbitrary: true,
    });
    expect(parseColEnd('col-end-[var(--end)]')).toEqual({
      type: 'col-end',
      value: 'var(--end)',
      raw: 'col-end-[var(--end)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseColEnd('col-end')).toBeNull();
    expect(parseColEnd('col-end-')).toBeNull();
    expect(parseColEnd('col-end-arbitrary')).toBeNull();
    expect(parseColEnd('row-end-2')).toBeNull();
  });
}); 