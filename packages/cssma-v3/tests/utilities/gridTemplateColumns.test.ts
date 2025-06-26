import { describe, it, expect } from 'vitest';
import { parseGridTemplateColumns } from '../../src/parser/utilities/gridTemplateColumns';

describe('parseGridTemplateColumnsUtility', () => {
  const cases: Array<[string, any]> = [
    ['grid-cols-none', { type: 'grid-template-columns', preset: 'none', raw: 'grid-cols-none', arbitrary: false }],
    ['grid-cols-1', { type: 'grid-template-columns', value: 1, raw: 'grid-cols-1', arbitrary: false }],
    ['grid-cols-12', { type: 'grid-template-columns', value: 12, raw: 'grid-cols-12', arbitrary: false }],
    ['grid-cols-[auto-fit,_minmax(200px,1fr)]', { type: 'grid-template-columns', value: 'auto-fit,_minmax(200px,1fr)', raw: 'grid-cols-[auto-fit,_minmax(200px,1fr)]', arbitrary: true }],
    ['grid-cols-[var(--cols)]', { type: 'grid-template-columns', value: 'var(--cols)', raw: 'grid-cols-[var(--cols)]', arbitrary: true }],
  ];

  it.each(cases)('parseGridTemplateColumns(%s)', (input, expected) => {
    expect(parseGridTemplateColumns(input)).toEqual(expected);
  });
}); 