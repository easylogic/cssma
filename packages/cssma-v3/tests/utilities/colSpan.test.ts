import { describe, it, expect } from 'vitest';
import { parseColSpan } from '../../src/parser/utilities/colSpan';

describe('parseColSpanUtility', () => {
  it('parses col-span-<number>', () => {
    expect(parseColSpan('col-span-1')).toEqual({
      type: 'col-span',
      value: 1,
      raw: 'col-span-1',
      arbitrary: false,
    });
    expect(parseColSpan('col-span-12')).toEqual({
      type: 'col-span',
      value: 12,
      raw: 'col-span-12',
      arbitrary: false,
    });
  });
  it('parses col-span-full', () => {
    expect(parseColSpan('col-span-full')).toEqual({
      type: 'col-span',
      preset: 'full',
      raw: 'col-span-full',
      arbitrary: false,
    });
  });
  it('parses col-span-[arbitrary]', () => {
    expect(parseColSpan('col-span-[7]')).toEqual({
      type: 'col-span',
      value: '7',
      raw: 'col-span-[7]',
      arbitrary: true,
    });
    expect(parseColSpan('col-span-[var(--span)]')).toEqual({
      type: 'col-span',
      value: 'var(--span)',
      raw: 'col-span-[var(--span)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseColSpan('col-span')).toBeNull();
    expect(parseColSpan('col-span-')).toBeNull();
    expect(parseColSpan('col-span-arbitrary')).toBeNull();
    expect(parseColSpan('row-span-2')).toBeNull();
  });
}); 