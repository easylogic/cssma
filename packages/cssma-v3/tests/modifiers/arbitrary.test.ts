import { describe, it, expect } from 'vitest';
import { parseArbitraryModifier } from '../../src/parser/modifiers/arbitrary';

describe('parseArbitraryModifier', () => {
  const cases: Array<[string, any]> = [
    ['[&>*]', { type: 'arbitrary', selector: '&>*' }],
    ['[data-state=open]', { type: 'arbitrary', selector: 'data-state=open' }],
    ['[aria-selected]', { type: 'arbitrary', selector: 'aria-selected' }],
    ['[.foo_bar]', { type: 'arbitrary', selector: '.foo_bar' }],
    ['[role=button]', { type: 'arbitrary', selector: 'role=button' }],
    ['[]', { type: 'arbitrary', selector: '' }],
    // 잘못된 값
    ['[', null],
    [']', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parseArbitraryModifier(%s)', (input, expected) => {
    expect(parseArbitraryModifier(input)).toEqual(expected);
  });
}); 