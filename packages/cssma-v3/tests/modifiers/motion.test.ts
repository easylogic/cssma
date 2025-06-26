import { describe, it, expect } from 'vitest';
import { parseMotionModifier } from '../../src/parser/modifiers/motion';

describe('parseMotionModifier', () => {
  const cases: Array<[string, any]> = [
    ['motion-safe', { type: 'motion', mode: 'safe' }],
    ['motion-reduce', { type: 'motion', mode: 'reduce' }],
    ['motion', null],
    ['safe', null],
    ['reduce', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parseMotionModifier(%s)', (input, expected) => {
    expect(parseMotionModifier(input)).toEqual(expected);
  });
}); 