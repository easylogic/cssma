import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
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
    ['pseudo', { type: 'unknown', raw: 'pseudo' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'unknown', raw: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 