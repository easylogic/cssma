import { describe, it, expect } from 'vitest';
import { parseClearUtility } from '../../src/parser/utilities/clear';

describe('parseClearUtility', () => {
  const cases: Array<[string, any]> = [
    ['clear-left', { type: 'clear', preset: 'left', raw: 'clear-left', arbitrary: false }],
    ['clear-right', { type: 'clear', preset: 'right', raw: 'clear-right', arbitrary: false }],
    ['clear-both', { type: 'clear', preset: 'both', raw: 'clear-both', arbitrary: false }],
    ['clear-none', { type: 'clear', preset: 'none', raw: 'clear-none', arbitrary: false }],
  ];

  it.each(cases)('parseClearUtility(%s)', (input, expected) => {
    expect(parseClearUtility(input)).toEqual(expected);
  });
}); 