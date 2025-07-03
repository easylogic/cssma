import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['motion-safe', { type: 'modifier', prefix: 'motion-safe' }],
    ['motion-reduce', { type: 'modifier', prefix: 'motion-reduce' }],
    ['motion', { type: 'unknown', raw: 'motion' }],
    ['safe', { type: 'unknown', raw: 'safe' }],
    ['reduce', { type: 'unknown', raw: 'reduce' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 