import { describe, it, expect } from 'vitest';
import { parseGrid } from '../../src/parser/utilities/grid';

describe('parseColumnsUtility', () => {
  const cases: Array<[string, any]> = [
    ['columns-auto', { type: 'columns', preset: 'auto', raw: 'columns-auto', arbitrary: false }],
    ['columns-1', { type: 'columns', value: 1, raw: 'columns-1', arbitrary: false }],
    ['columns-2', { type: 'columns', value: 2, raw: 'columns-2', arbitrary: false }],
    ['columns-3', { type: 'columns', value: 3, raw: 'columns-3', arbitrary: false }],
    ['columns-12', { type: 'columns', value: 12, raw: 'columns-12', arbitrary: false }],
    ['columns-[200px]', { type: 'columns', value: '200px', raw: 'columns-[200px]', arbitrary: true }],
    ['columns-[16rem]', { type: 'columns', value: '16rem', raw: 'columns-[16rem]', arbitrary: true }],
    ['columns-[var(--my-columns)]', { type: 'columns', value: 'var(--my-columns)', raw: 'columns-[var(--my-columns)]', arbitrary: true }],
  ];

  it.each(cases)('parseColumns(%s)', (input, expected) => {
    expect(parseGrid(input)).toEqual(expected);
  });
}); 