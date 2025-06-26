import { describe, it, expect } from 'vitest';
import { parseRowEndUtility } from '../../src/parser/utilities/rowEnd';

describe('parseRowEndUtility', () => {
  it('parses row-end-<number>', () => {
    expect(parseRowEndUtility('row-end-1')).toEqual({
      type: 'row-end',
      value: 1,
      raw: 'row-end-1',
      arbitrary: false,
    });
    expect(parseRowEndUtility('row-end-12')).toEqual({
      type: 'row-end',
      value: 12,
      raw: 'row-end-12',
      arbitrary: false,
    });
  });
  it('parses row-end-auto', () => {
    expect(parseRowEndUtility('row-end-auto')).toEqual({
      type: 'row-end',
      preset: 'auto',
      raw: 'row-end-auto',
      arbitrary: false,
    });
  });
  it('parses row-end-[arbitrary]', () => {
    expect(parseRowEndUtility('row-end-[7]')).toEqual({
      type: 'row-end',
      value: '7',
      raw: 'row-end-[7]',
      arbitrary: true,
    });
    expect(parseRowEndUtility('row-end-[var(--end)]')).toEqual({
      type: 'row-end',
      value: 'var(--end)',
      raw: 'row-end-[var(--end)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseRowEndUtility('row-end')).toBeNull();
    expect(parseRowEndUtility('row-end-')).toBeNull();
    expect(parseRowEndUtility('row-end-arbitrary')).toBeNull();
    expect(parseRowEndUtility('col-end-2')).toBeNull();
  });
}); 