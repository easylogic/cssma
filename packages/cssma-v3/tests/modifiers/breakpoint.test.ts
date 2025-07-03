import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['sm', { type: 'responsive', variant: 'sm' }],
    ['md', { type: 'responsive', variant: 'md' }],
    ['lg', { type: 'responsive', variant: 'lg' }],
    ['xl', { type: 'responsive', variant: 'xl' }],
    ['2xl', { type: 'responsive', variant: '2xl' }],
    // 잘못된 값
    ['xs', { type: 'unknown', raw: 'xs' }],
    ['', { type: 'unknown', raw: '' }],
    ['breakpoint', { type: 'unknown', raw: 'breakpoint' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 