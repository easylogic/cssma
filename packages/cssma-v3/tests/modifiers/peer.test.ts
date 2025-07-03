import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['peer-hover', { type: 'modifier', prefix: 'peer-hover' }],
    ['peer-focus', { type: 'modifier', prefix: 'peer-focus' }],
    ['peer-checked', { type: 'modifier', prefix: 'peer-checked' }],
    ['peer-', { type: 'modifier', prefix: 'peer-' }],
    ['peer', { type: 'unknown', raw: 'peer' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 