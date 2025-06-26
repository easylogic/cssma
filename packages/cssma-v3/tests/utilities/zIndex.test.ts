import { describe, it, expect } from 'vitest';
import { parseZIndexUtility } from '../../src/parser/utilities/zIndex';

describe('parseZIndexUtility', () => {
  const cases: Array<[string, any]> = [
    ['z-auto', { type: 'z-index', preset: 'auto', raw: 'z-auto', arbitrary: false }],
    ['z-0', { type: 'z-index', value: 0, raw: 'z-0', arbitrary: false }],
    ['z-10', { type: 'z-index', value: 10, raw: 'z-10', arbitrary: false }],
    ['z-20', { type: 'z-index', value: 20, raw: 'z-20', arbitrary: false }],
    ['z-30', { type: 'z-index', value: 30, raw: 'z-30', arbitrary: false }],
    ['z-40', { type: 'z-index', value: 40, raw: 'z-40', arbitrary: false }],
    ['z-50', { type: 'z-index', value: 50, raw: 'z-50', arbitrary: false }],
    ['z-[999]', { type: 'z-index', value: '999', raw: 'z-[999]', arbitrary: true }],
    ['z-[-1]', { type: 'z-index', value: '-1', raw: 'z-[-1]', arbitrary: true }],
    ['z-[var(--z)]', { type: 'z-index', value: 'var(--z)', raw: 'z-[var(--z)]', arbitrary: true }],
  ];

  it.each(cases)('parseZIndexUtility(%s)', (input, expected) => {
    expect(parseZIndexUtility(input)).toEqual(expected);
  });
}); 