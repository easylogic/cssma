import { describe, it, expect } from 'vitest';
import { parseGrid } from '../../src/parser/utilities/grid';

describe('parseColSpanUtility', () => {
  it('parses col-span-<number>', () => {
    expect(parseGrid('col-span-1')).toEqual({
      type: 'col-span',
      value: 1,
      raw: 'col-span-1',
      arbitrary: false,
    });
    expect(parseGrid('col-span-12')).toEqual({
      type: 'col-span',
      value: 12,
      raw: 'col-span-12',
      arbitrary: false,
    });
  });
  it('parses col-span-full', () => {
    expect(parseGrid('col-span-full')).toEqual({
      type: 'col-span',
      preset: 'full',
      raw: 'col-span-full',
      arbitrary: false,
    });
  });
  it('parses col-span-[arbitrary]', () => {
    expect(parseGrid('col-span-[7]')).toEqual({
      type: 'col-span',
      value: '7',
      raw: 'col-span-[7]',
      arbitrary: true,
    });
    expect(parseGrid('col-span-[var(--span)]')).toEqual({
      type: 'col-span',
      value: 'var(--span)',
      raw: 'col-span-[var(--span)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseGrid('col-span')).toBeNull();
    expect(parseGrid('col-span-')).toBeNull();
    expect(parseGrid('col-span-arbitrary')).toBeNull();
    expect(parseGrid('row-span-2')).toBeNull();
  });
}); 