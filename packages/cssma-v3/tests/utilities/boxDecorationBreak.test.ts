import { describe, it, expect } from 'vitest';
import { parseBoxDecorationBreak } from '../../src/parser/utilities/boxDecorationBreak';

describe('parseBoxDecorationBreakUtility', () => {
  const cases: Array<[string, any]> = [
    ['box-decoration-clone', { type: 'box-decoration-break', preset: 'clone', raw: 'box-decoration-clone', arbitrary: false }],
    ['box-decoration-slice', { type: 'box-decoration-break', preset: 'slice', raw: 'box-decoration-slice', arbitrary: false }],
  ];

  it.each(cases)('parseBoxDecorationBreak(%s)', (input, expected) => {
    expect(parseBoxDecorationBreak(input)).toEqual(expected);
  });
}); 