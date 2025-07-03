import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['before', { type: 'modifier', prefix: 'before' }],
    ['after', { type: 'modifier', prefix: 'after' }],
    ['placeholder', { type: 'modifier', prefix: 'placeholder' }],
    ['selection', { type: 'modifier', prefix: 'selection' }],
    ['marker', { type: 'modifier', prefix: 'marker' }],
    ['first-line', { type: 'modifier', prefix: 'first-line' }],
    ['first-letter', { type: 'modifier', prefix: 'first-letter' }],
    ['backdrop', { type: 'modifier', prefix: 'backdrop' }],
    // 잘못된 값
    ['pseudo', { type: 'unknown', raw: 'pseudo' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 