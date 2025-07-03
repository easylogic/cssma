import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
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

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 