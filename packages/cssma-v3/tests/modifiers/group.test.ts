import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['group-hover', { type: 'modifier', prefix: 'group-hover' }],
    ['group-focus', { type: 'modifier', prefix: 'group-focus' }],
    ['group-active', { type: 'modifier', prefix: 'group-active' }],
    ['group-visited', { type: 'modifier', prefix: 'group-visited' }],
    ['group-', { type: 'modifier', prefix: 'group-' }],
    ['group', { type: 'unknown', raw: 'group' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 