import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['open', { type: 'modifier', prefix: 'open' }],
    ['inert', { type: 'modifier', prefix: 'inert' }],
    // arbitrary 상태
    ['state-[foo=bar]', { type: 'modifier', prefix: 'state-[foo=bar]' }],
    ['state-[expanded=true]', { type: 'modifier', prefix: 'state-[expanded=true]' }],
    // 잘못된 값
    ['state', { type: 'unknown', raw: 'state' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 