import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['group-hover', baseModifier({ prefix: 'group', value: 'hover', raw: 'group-hover' })],
    ['group-focus', baseModifier({ prefix: 'group', value: 'focus', raw: 'group-focus' })],
    ['group-active', baseModifier({ prefix: 'group', value: 'active', raw: 'group-active' })],
    ['group-visited', baseModifier({ prefix: 'group', value: 'visited', raw: 'group-visited' })],
    ['group', baseModifier({ prefix: 'group', value: '', raw: 'group' })],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
    ['group-', { type: 'unknown', raw: 'group-' }],
    ['', { type: 'unknown', raw: '' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 