import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    // nth
    ['nth-3', { type: 'nth', value: '3' }],
    ['nth-[3n+1]', { type: 'nth', value: '3n+1' }],
    ['nth-[2n]', { type: 'nth', value: '2n' }],
    ['nth-', { type: 'nth', value: '' }],
    ['nth', { type: 'unknown', raw: 'nth' }],
    // nth-of-type
    ['nth-of-type-2', { type: 'nth-of-type', value: '2' }],
    ['nth-of-type-[2n+1]', { type: 'nth-of-type', value: '2n+1' }],
    ['nth-of-type-[odd]', { type: 'nth-of-type', value: 'odd' }],
    ['nth-of-type-', { type: 'nth-of-type', value: '' }],
    ['nth-of-type', { type: 'unknown', raw: 'nth-of-type' }],
    // nth-last-of-type
    ['nth-last-of-type-4', { type: 'nth-last-of-type', value: '4' }],
    ['nth-last-of-type-[3n+1]', { type: 'nth-last-of-type', value: '3n+1' }],
    ['nth-last-of-type-[even]', { type: 'nth-last-of-type', value: 'even' }],
    ['nth-last-of-type-', { type: 'nth-last-of-type', value: '' }],
    ['nth-last-of-type', { type: 'unknown', raw: 'nth-last-of-type' }],
    // 기타
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'unknown', raw: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 