import { describe, it, expect } from 'vitest';
import { parseAttributeModifier } from '../../src/parser/modifiers/attribute';

describe('parseAttributeModifier', () => {
  const cases: Array<[string, any]> = [
    ['[foo=bar]', { type: 'attribute', attr: 'foo', value: 'bar' }],
    ['[data-state=open]', { type: 'attribute', attr: 'data-state', value: 'open' }],
    ['[foo]', { type: 'attribute', attr: 'foo', value: undefined }],
    // 잘못된 값
    ['[]', null],
    ['[=bar]', { type: 'attribute', attr: '', value: 'bar' }],
    ['foo=bar', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parseAttributeModifier(%s)', (input, expected) => {
    expect(parseAttributeModifier(input)).toEqual(expected);
  });
}); 