import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['[foo=bar]', { type: 'modifier', prefix: '[foo=bar]' }],
    ['[data-state=open]', { type: 'modifier', prefix: '[data-state=open]' }],
    ['[foo]', { type: 'modifier', prefix: '[foo]' }],
    // 잘못된 값
    ['[]', { type: 'unknown', raw: '[]' }],
    ['[=bar]', { type: 'modifier', prefix: '[=bar]' }],
    ['foo=bar', { type: 'unknown', raw: 'foo=bar' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 