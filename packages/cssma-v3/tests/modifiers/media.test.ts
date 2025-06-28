import { describe, it, expect } from 'vitest';
import { parseMediaModifier } from '../../src/parser/modifiers/media';

describe('parseMediaModifier', () => {
  const cases: Array<[string, any]> = [
    ['dark', null],
    ['motion-safe', { type: 'media', name: 'motion-safe' }],
    ['motion-reduce', { type: 'media', name: 'motion-reduce' }],
    ['print', { type: 'media', name: 'print' }],
    // 잘못된 값
    ['media', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parseMediaModifier(%s)', (input, expected) => {
    expect(parseMediaModifier(input)).toEqual(expected);
  });
}); 