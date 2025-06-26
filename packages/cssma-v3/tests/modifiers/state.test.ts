import { describe, it, expect } from 'vitest';
import { parseStateModifier } from '../../src/parser/modifiers/state';

describe('parseStateModifier', () => {
  const cases: Array<[string, any]> = [
    ['open', { type: 'state', value: 'open' }],
    ['inert', { type: 'state', value: 'inert' }],
    // arbitrary 상태
    ['state-[foo=bar]', { type: 'state', attr: 'foo', value: 'bar' }],
    ['state-[expanded=true]', { type: 'state', attr: 'expanded', value: 'true' }],
    // 잘못된 값
    ['state', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parseStateModifier(%s)', (input, expected) => {
    expect(parseStateModifier(input)).toEqual(expected);
  });
}); 