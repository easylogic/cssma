import { describe, it, expect } from 'vitest';
import { parseGridColumnUtility } from '../../src/parser/utilities/gridColumn';

describe('parseGridColumnUtility', () => {
  const cases: Array<[string, any]> = [
    ['col-auto', { type: 'grid-column', preset: 'auto', raw: 'col-auto', arbitrary: false }],
    ['col-span-3', { type: 'grid-column', span: 3, raw: 'col-span-3', arbitrary: false }],
    ['col-start-2', { type: 'grid-column', position: 'start', value: 2, raw: 'col-start-2', arbitrary: false }],
    ['col-end-5', { type: 'grid-column', position: 'end', value: 5, raw: 'col-end-5', arbitrary: false }],
    ['col-[auto/span_2/span_3]', { type: 'grid-column', value: 'auto/span_2/span_3', raw: 'col-[auto/span_2/span_3]', arbitrary: true }],
    ['col-[var(--col)]', { type: 'grid-column', value: 'var(--col)', raw: 'col-[var(--col)]', arbitrary: true }],
  ];

  it.each(cases)('parseGridColumnUtility(%s)', (input, expected) => {
    expect(parseGridColumnUtility(input)).toEqual(expected);
  });
}); 