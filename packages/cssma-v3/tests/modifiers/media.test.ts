import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['dark', baseModifier({ prefix: 'dark', value: '', raw: 'dark' })],
    ['light', baseModifier({ prefix: 'light', value: '', raw: 'light' })],
    ['print', baseModifier({ prefix: 'print', value: '', raw: 'print' })],
    ['motion-safe', baseModifier({ prefix: 'motion-safe', value: '', raw: 'motion-safe' })],
    ['motion-reduce', baseModifier({ prefix: 'motion-reduce', value: '', raw: 'motion-reduce' })],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
    ['media', { type: 'unknown', raw: 'media' }],
    // 잘못된 값
    ['media-', { type: 'unknown', raw: 'media-' }],
    ['', { type: 'unknown', raw: '' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });

  it('parseModifier("motion-safe")', () => {
    const result = parseModifier('motion-safe');
    expect(result).toEqual(baseModifier({ prefix: 'motion-safe', value: '', raw: 'motion-safe' }));
  });
}); 