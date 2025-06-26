import { describe, it, expect } from 'vitest';
import { parsePositionUtility } from '../../src/parser/utilities/position';

describe('parsePositionUtility', () => {
  const cases: Array<[string, any]> = [
    ['static', { type: 'position', preset: 'static', raw: 'static', arbitrary: false }],
    ['fixed', { type: 'position', preset: 'fixed', raw: 'fixed', arbitrary: false }],
    ['absolute', { type: 'position', preset: 'absolute', raw: 'absolute', arbitrary: false }],
    ['relative', { type: 'position', preset: 'relative', raw: 'relative', arbitrary: false }],
    ['sticky', { type: 'position', preset: 'sticky', raw: 'sticky', arbitrary: false }],
  ];

  it.each(cases)('parsePositionUtility(%s)', (input, expected) => {
    expect(parsePositionUtility(input)).toEqual(expected);
  });
}); 