import { describe, it, expect } from 'vitest';
import { parsePeerModifier } from '../../src/parser/modifiers/peer';

describe('parsePeerModifier', () => {
  const cases: Array<[string, any]> = [
    ['peer-hover', { type: 'peer', state: 'hover' }],
    ['peer-focus', { type: 'peer', state: 'focus' }],
    ['peer-checked', { type: 'peer', state: 'checked' }],
    // 잘못된 값
    ['peer-', null],
    ['peer', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parsePeerModifier(%s)', (input, expected) => {
    expect(parsePeerModifier(input)).toEqual(expected);
  });
}); 