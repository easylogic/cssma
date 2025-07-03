import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['[&>*]', { type: 'modifier', prefix: '[&>*]' }],
    ['[data-state=open]', { type: 'modifier', prefix: '[data-state=open]' }],
    ['[aria-selected]', { type: 'modifier', prefix: '[aria-selected]' }],
    ['[.foo_bar]', { type: 'modifier', prefix: '[.foo_bar]' }],
    ['[role=button]', { type: 'modifier', prefix: '[role=button]' }],
    ['[]', { type: 'modifier', prefix: '[]' }],
    // 잘못된 값
    ['[', { type: 'unknown', raw: '[' }],
    [']', { type: 'unknown', raw: ']' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 