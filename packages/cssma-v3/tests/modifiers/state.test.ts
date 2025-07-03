import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['open', { type: 'state', value: 'open' }],
    ['inert', { type: 'state', value: 'inert' }],
    // arbitrary 상태
    ['state-[foo=bar]', { type: 'state', attr: 'foo', value: 'bar' }],
    ['state-[expanded=true]', { type: 'state', attr: 'expanded', value: 'true' }],
    // 잘못된 값
    ['state', { type: 'unknown', raw: 'state' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'unknown', raw: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 