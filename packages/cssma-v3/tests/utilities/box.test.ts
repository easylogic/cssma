import { describe, it, expect } from 'vitest';
import { parseBoxUtility } from '../../src/parser/utilities/box';

describe('parseBoxUtility', () => {
  const cases: Array<[string, any]> = [
    ['box-border', { type: 'box', preset: 'border', raw: 'box-border', arbitrary: false }],
    ['box-content', { type: 'box', preset: 'content', raw: 'box-content', arbitrary: false }],
  ];

  it.each(cases)('parseBoxUtility(%s)', (input, expected) => {
    expect(parseBoxUtility(input)).toEqual(expected);
  });
}); 