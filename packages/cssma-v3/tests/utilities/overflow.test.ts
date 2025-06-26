import { describe, it, expect } from 'vitest';
import { parseOverflow } from '../../src/parser/utilities/overflow';

describe('parseOverflowUtility', () => {
  const cases: Array<[string, any]> = [
    ['overflow-auto', { type: 'overflow', preset: 'auto', raw: 'overflow-auto', arbitrary: false }],
    ['overflow-hidden', { type: 'overflow', preset: 'hidden', raw: 'overflow-hidden', arbitrary: false }],
    ['overflow-clip', { type: 'overflow', preset: 'clip', raw: 'overflow-clip', arbitrary: false }],
    ['overflow-visible', { type: 'overflow', preset: 'visible', raw: 'overflow-visible', arbitrary: false }],
    ['overflow-scroll', { type: 'overflow', preset: 'scroll', raw: 'overflow-scroll', arbitrary: false }],
    ['overflow-x-auto', { type: 'overflow', axis: 'x', preset: 'auto', raw: 'overflow-x-auto', arbitrary: false }],
    ['overflow-x-hidden', { type: 'overflow', axis: 'x', preset: 'hidden', raw: 'overflow-x-hidden', arbitrary: false }],
    ['overflow-x-clip', { type: 'overflow', axis: 'x', preset: 'clip', raw: 'overflow-x-clip', arbitrary: false }],
    ['overflow-x-visible', { type: 'overflow', axis: 'x', preset: 'visible', raw: 'overflow-x-visible', arbitrary: false }],
    ['overflow-x-scroll', { type: 'overflow', axis: 'x', preset: 'scroll', raw: 'overflow-x-scroll', arbitrary: false }],
    ['overflow-y-auto', { type: 'overflow', axis: 'y', preset: 'auto', raw: 'overflow-y-auto', arbitrary: false }],
    ['overflow-y-hidden', { type: 'overflow', axis: 'y', preset: 'hidden', raw: 'overflow-y-hidden', arbitrary: false }],
    ['overflow-y-clip', { type: 'overflow', axis: 'y', preset: 'clip', raw: 'overflow-y-clip', arbitrary: false }],
    ['overflow-y-visible', { type: 'overflow', axis: 'y', preset: 'visible', raw: 'overflow-y-visible', arbitrary: false }],
    ['overflow-y-scroll', { type: 'overflow', axis: 'y', preset: 'scroll', raw: 'overflow-y-scroll', arbitrary: false }],
  ];

  it.each(cases)('parseOverflow(%s)', (input, expected) => {
    expect(parseOverflow(input)).toEqual(expected);
  });
}); 