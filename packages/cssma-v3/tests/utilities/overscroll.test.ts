import { describe, it, expect } from 'vitest';
import { parseOverscroll } from '../../src/parser/utilities/overscroll';

describe('parseOverscrollUtility', () => {
  const cases: Array<[string, any]> = [
    ['overscroll-auto', { type: 'overscroll', preset: 'auto', raw: 'overscroll-auto', arbitrary: false }],
    ['overscroll-contain', { type: 'overscroll', preset: 'contain', raw: 'overscroll-contain', arbitrary: false }],
    ['overscroll-none', { type: 'overscroll', preset: 'none', raw: 'overscroll-none', arbitrary: false }],
    ['overscroll-x-auto', { type: 'overscroll', axis: 'x', preset: 'auto', raw: 'overscroll-x-auto', arbitrary: false }],
    ['overscroll-x-contain', { type: 'overscroll', axis: 'x', preset: 'contain', raw: 'overscroll-x-contain', arbitrary: false }],
    ['overscroll-x-none', { type: 'overscroll', axis: 'x', preset: 'none', raw: 'overscroll-x-none', arbitrary: false }],
    ['overscroll-y-auto', { type: 'overscroll', axis: 'y', preset: 'auto', raw: 'overscroll-y-auto', arbitrary: false }],
    ['overscroll-y-contain', { type: 'overscroll', axis: 'y', preset: 'contain', raw: 'overscroll-y-contain', arbitrary: false }],
    ['overscroll-y-none', { type: 'overscroll', axis: 'y', preset: 'none', raw: 'overscroll-y-none', arbitrary: false }],
  ];

  it.each(cases)('parseOverscroll(%s)', (input, expected) => {
    expect(parseOverscroll(input)).toEqual(expected);
  });
}); 