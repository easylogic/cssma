import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['before', baseModifier({ prefix: 'before', value: '', raw: 'before' })],
    ['after', baseModifier({ prefix: 'after', value: '', raw: 'after' })],
    ['placeholder', baseModifier({ prefix: 'placeholder', value: '', raw: 'placeholder' })],
    ['selection', baseModifier({ prefix: 'selection', value: '', raw: 'selection' })],
    ['marker', baseModifier({ prefix: 'marker', value: '', raw: 'marker' })],
    ['first-line', baseModifier({ prefix: 'first-line', value: '', raw: 'first-line' })],
    ['first-letter', baseModifier({ prefix: 'first-letter', value: '', raw: 'first-letter' })],
    ['backdrop', baseModifier({ prefix: 'backdrop', value: '', raw: 'backdrop' })],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
    ['pseudo', { type: 'unknown', raw: 'pseudo' }],
    ['file', baseModifier({ prefix: 'file', value: '', raw: 'file' })],
    ['', { type: 'unknown', raw: '' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 