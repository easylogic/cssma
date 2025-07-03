import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['group-hover', { type: 'group', state: 'hover' }],
    ['group-focus', { type: 'group', state: 'focus' }],
    ['group-active', { type: 'group', state: 'active' }],
    ['group-visited', { type: 'group', state: 'visited' }],
    ['group-', { type: 'group', state: '' }],
    ['group', { type: 'unknown', raw: 'group' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'unknown', raw: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 