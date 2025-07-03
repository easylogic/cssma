import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['[foo=bar]', baseModifier({ prefix: 'arbitrary', value: 'foo=bar', raw: '[foo=bar]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'foo=bar' })],
    ['[data-state=open]', baseModifier({ prefix: 'arbitrary', value: 'data-state=open', raw: '[data-state=open]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'data-state=open' })],
    ['[foo]', baseModifier({ prefix: 'arbitrary', value: 'foo', raw: '[foo]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'foo' })],
    ['[=bar]', baseModifier({ prefix: 'arbitrary', value: '=bar', raw: '[=bar]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: '=bar' })],
    ['[]', { type: 'unknown', raw: '[]' }],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
    ['[data-open]', baseModifier({ prefix: 'arbitrary', value: 'data-open', raw: '[data-open]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'data-open' })],
    ['foo=bar', { type: 'unknown', raw: 'foo=bar' }],
    ['', { type: 'unknown', raw: '' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });

  it('should parse multiple modifiers', () => {
    const result = parseModifier('[data-open]');
    expect(result).toEqual(baseModifier({ prefix: 'arbitrary', value: 'data-open', raw: '[data-open]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'data-open' }));
  });
}); 