import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['[&>*]', baseModifier({ prefix: 'arbitrary', value: '&>*', raw: '[&>*]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: '&>*' })],
    ['[data-state=open]', baseModifier({ prefix: 'arbitrary', value: 'data-state=open', raw: '[data-state=open]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'data-state=open' })],
    ['[aria-selected]', baseModifier({ prefix: 'arbitrary', value: 'aria-selected', raw: '[aria-selected]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'aria-selected' })],
    ['[.foo_bar]', baseModifier({ prefix: 'arbitrary', value: '.foo bar', raw: '[.foo_bar]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: '.foo bar' })],
    ['[role=button]', baseModifier({ prefix: 'arbitrary', value: 'role=button', raw: '[role=button]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'role=button' })],
    ['[]', { type: 'unknown', raw: '[]' }],
    ['[', { type: 'unknown', raw: '[' }],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
    ['[foo:bar]', baseModifier({ prefix: 'arbitrary', value: 'foo:bar', raw: '[foo:bar]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'foo:bar' })],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });

  it('should parse arbitrary modifier', () => {
    const result = parseModifier('[foo:bar]');
    expect(result).toEqual(baseModifier({ prefix: 'arbitrary', value: 'foo:bar', raw: '[foo:bar]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'foo:bar' }));
  });
}); 