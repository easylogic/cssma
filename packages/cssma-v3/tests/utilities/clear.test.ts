import { describe, it, expect } from 'vitest';
import { parseClear } from '../../src/parser/utilities/clear';

describe('parseClearUtility', () => {
  const cases: Array<[string, any]> = [
    ['clear-left', { type: 'clear', preset: 'left', raw: 'clear-left', arbitrary: false }],
    ['clear-right', { type: 'clear', preset: 'right', raw: 'clear-right', arbitrary: false }],
    ['clear-both', { type: 'clear', preset: 'both', raw: 'clear-both', arbitrary: false }],
    ['clear-none', { type: 'clear', preset: 'none', raw: 'clear-none', arbitrary: false }],
  ];

  it.each(cases)('parseClear(%s)', (input, expected) => {
    expect(parseClear(input)).toEqual(expected);
  });
}); 