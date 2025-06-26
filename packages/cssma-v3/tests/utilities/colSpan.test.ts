import { describe, it, expect } from 'vitest';
import { parseColSpanUtility } from '../../src/parser/utilities/colSpan';

describe('parseColSpanUtility', () => {
  it('parses col-span-<number>', () => {
    expect(parseColSpanUtility('col-span-1')).toEqual({
      type: 'col-span',
      value: 1,
      raw: 'col-span-1',
      arbitrary: false,
    });
    expect(parseColSpanUtility('col-span-12')).toEqual({
      type: 'col-span',
      value: 12,
      raw: 'col-span-12',
      arbitrary: false,
    });
  });
  it('parses col-span-full', () => {
    expect(parseColSpanUtility('col-span-full')).toEqual({
      type: 'col-span',
      preset: 'full',
      raw: 'col-span-full',
      arbitrary: false,
    });
  });
  it('parses col-span-[arbitrary]', () => {
    expect(parseColSpanUtility('col-span-[7]')).toEqual({
      type: 'col-span',
      value: '7',
      raw: 'col-span-[7]',
      arbitrary: true,
    });
    expect(parseColSpanUtility('col-span-[var(--span)]')).toEqual({
      type: 'col-span',
      value: 'var(--span)',
      raw: 'col-span-[var(--span)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseColSpanUtility('col-span')).toBeNull();
    expect(parseColSpanUtility('col-span-')).toBeNull();
    expect(parseColSpanUtility('col-span-arbitrary')).toBeNull();
    expect(parseColSpanUtility('row-span-2')).toBeNull();
  });
}); 