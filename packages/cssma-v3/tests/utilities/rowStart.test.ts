import { describe, it, expect } from 'vitest';
import { parseRowStartUtility } from '../../src/parser/utilities/rowStart';

describe('parseRowStartUtility', () => {
  it('parses row-start-<number>', () => {
    expect(parseRowStartUtility('row-start-1')).toEqual({
      type: 'row-start',
      value: 1,
      raw: 'row-start-1',
      arbitrary: false,
    });
    expect(parseRowStartUtility('row-start-12')).toEqual({
      type: 'row-start',
      value: 12,
      raw: 'row-start-12',
      arbitrary: false,
    });
  });
  it('parses row-start-auto', () => {
    expect(parseRowStartUtility('row-start-auto')).toEqual({
      type: 'row-start',
      preset: 'auto',
      raw: 'row-start-auto',
      arbitrary: false,
    });
  });
  it('parses row-start-[arbitrary]', () => {
    expect(parseRowStartUtility('row-start-[7]')).toEqual({
      type: 'row-start',
      value: '7',
      raw: 'row-start-[7]',
      arbitrary: true,
    });
    expect(parseRowStartUtility('row-start-[var(--start)]')).toEqual({
      type: 'row-start',
      value: 'var(--start)',
      raw: 'row-start-[var(--start)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseRowStartUtility('row-start')).toBeNull();
    expect(parseRowStartUtility('row-start-')).toBeNull();
    expect(parseRowStartUtility('row-start-arbitrary')).toBeNull();
    expect(parseRowStartUtility('col-start-2')).toBeNull();
  });
}); 