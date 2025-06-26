import { describe, it, expect } from 'vitest';
import { parsePseudoElementModifier } from '../../src/parser/modifiers/pseudoElement';

describe('parsePseudoElementModifier', () => {
  const cases: Array<[string, any]> = [
    ['before', { type: 'pseudo-element', name: 'before' }],
    ['after', { type: 'pseudo-element', name: 'after' }],
    ['placeholder', { type: 'pseudo-element', name: 'placeholder' }],
    ['selection', { type: 'pseudo-element', name: 'selection' }],
    ['marker', { type: 'pseudo-element', name: 'marker' }],
    ['first-line', { type: 'pseudo-element', name: 'first-line' }],
    ['first-letter', { type: 'pseudo-element', name: 'first-letter' }],
    ['backdrop', { type: 'pseudo-element', name: 'backdrop' }],
    // 잘못된 값
    ['pseudo', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parsePseudoElementModifier(%s)', (input, expected) => {
    expect(parsePseudoElementModifier(input)).toEqual(expected);
  });
}); 