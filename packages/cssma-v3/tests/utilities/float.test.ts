import { describe, it, expect } from 'vitest';
import { parseMisc } from '../../src/parser/utilities/misc';

describe('parseFloatUtility', () => {
  const cases: Array<[string, any]> = [
    ['float-right', { type: 'float', preset: 'right', raw: 'float-right', arbitrary: false }],
    ['float-left', { type: 'float', preset: 'left', raw: 'float-left', arbitrary: false }],
    ['float-none', { type: 'float', preset: 'none', raw: 'float-none', arbitrary: false }],
    ['float-start', { type: 'float', preset: 'start', raw: 'float-start', arbitrary: false }],
    ['float-end', { type: 'float', preset: 'end', raw: 'float-end', arbitrary: false }],
  ];

  it.each(cases)('parseFloat(%s)', (input, expected) => {
    expect(parseMisc(input)).toEqual(expected);
  });
}); 