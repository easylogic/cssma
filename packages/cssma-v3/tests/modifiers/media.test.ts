import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['dark', { type: 'media', name: 'dark' }],
    ['motion-safe', { type: 'media', name: 'motion-safe' }],
    ['motion-reduce', { type: 'media', name: 'motion-reduce' }],
    ['print', { type: 'media', name: 'print' }],
    ['media', { type: 'unknown', raw: 'media' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'unknown', raw: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 