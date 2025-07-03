import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['dark', { type: 'modifier', prefix: 'dark' }],
    ['motion-safe', { type: 'modifier', prefix: 'motion-safe' }],
    ['motion-reduce', { type: 'modifier', prefix: 'motion-reduce' }],
    ['print', { type: 'modifier', prefix: 'print' }],
    ['media', { type: 'unknown', raw: 'media' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 