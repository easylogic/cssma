import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    // nth
    ['nth-3', { type: 'modifier', prefix: 'nth-3' }],
    ['nth-[3n+1]', { type: 'modifier', prefix: 'nth-[3n+1]' }],
    ['nth-[2n]', { type: 'modifier', prefix: 'nth-[2n]' }],
    ['nth-', { type: 'modifier', prefix: 'nth-' }],
    ['nth', { type: 'unknown', raw: 'nth' }],
    // nth-of-type
    ['nth-of-type-2', { type: 'modifier', prefix: 'nth-of-type-2' }],
    ['nth-of-type-[2n+1]', { type: 'modifier', prefix: 'nth-of-type-[2n+1]' }],
    ['nth-of-type-[odd]', { type: 'modifier', prefix: 'nth-of-type-[odd]' }],
    ['nth-of-type-', { type: 'modifier', prefix: 'nth-of-type-' }],
    ['nth-of-type', { type: 'unknown', raw: 'nth-of-type' }],
    // nth-last-of-type
    ['nth-last-of-type-4', { type: 'modifier', prefix: 'nth-last-of-type-4' }],
    ['nth-last-of-type-[3n+1]', { type: 'modifier', prefix: 'nth-last-of-type-[3n+1]' }],
    ['nth-last-of-type-[even]', { type: 'modifier', prefix: 'nth-last-of-type-[even]' }],
    ['nth-last-of-type-', { type: 'modifier', prefix: 'nth-last-of-type-' }],
    ['nth-last-of-type', { type: 'unknown', raw: 'nth-last-of-type' }],
    // 기타
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 