import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['motion-safe', baseModifier({ prefix: 'motion-safe', value: '', raw: 'motion-safe' })],
    ['motion-reduce', baseModifier({ prefix: 'motion-reduce', value: '', raw: 'motion-reduce' })],
    ['motion-', { type: 'unknown', raw: 'motion-' }],
    ['motion', { type: 'unknown', raw: 'motion' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 