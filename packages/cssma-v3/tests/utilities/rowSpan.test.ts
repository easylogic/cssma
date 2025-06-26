import { describe, it, expect } from 'vitest';
import { parseRowSpanUtility } from '../../src/parser/utilities/rowSpan';

describe('parseRowSpanUtility', () => {
  it('parses row-span-<number>', () => {
    expect(parseRowSpanUtility('row-span-1')).toEqual({
      type: 'row-span',
      value: 1,
      raw: 'row-span-1',
      arbitrary: false,
    });
    expect(parseRowSpanUtility('row-span-12')).toEqual({
      type: 'row-span',
      value: 12,
      raw: 'row-span-12',
      arbitrary: false,
    });
  });
  it('parses row-span-full', () => {
    expect(parseRowSpanUtility('row-span-full')).toEqual({
      type: 'row-span',
      preset: 'full',
      raw: 'row-span-full',
      arbitrary: false,
    });
  });
  it('parses row-span-[arbitrary]', () => {
    expect(parseRowSpanUtility('row-span-[7]')).toEqual({
      type: 'row-span',
      value: '7',
      raw: 'row-span-[7]',
      arbitrary: true,
    });
    expect(parseRowSpanUtility('row-span-[var(--span)]')).toEqual({
      type: 'row-span',
      value: 'var(--span)',
      raw: 'row-span-[var(--span)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseRowSpanUtility('row-span')).toBeNull();
    expect(parseRowSpanUtility('row-span-')).toBeNull();
    expect(parseRowSpanUtility('row-span-arbitrary')).toBeNull();
    expect(parseRowSpanUtility('col-span-2')).toBeNull();
  });
}); 