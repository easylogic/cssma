import { describe, it, expect } from 'vitest';
import { parseDirectionModifier } from '../../src/parser/modifiers/direction';

describe('parseDirectionModifier', () => {
  const cases: Array<[string, any]> = [
    ['rtl', { type: 'direction', value: 'rtl' }],
    ['ltr', { type: 'direction', value: 'ltr' }],
    // 잘못된 값
    ['direction', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parseDirectionModifier(%s)', (input, expected) => {
    expect(parseDirectionModifier(input)).toEqual(expected);
  });
}); 