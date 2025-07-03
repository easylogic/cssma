import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['sm', { type: 'responsive', variant: 'sm' }],
    ['md', { type: 'responsive', variant: 'md' }],
    ['lg', { type: 'responsive', variant: 'lg' }],
    ['xl', { type: 'responsive', variant: 'xl' }],
    ['2xl', { type: 'responsive', variant: '2xl' }],
    ['xs', { type: 'responsive', variant: 'xs' }],
    ['3xl', { type: 'responsive', variant: '3xl' }],
    ['max-sm', { type: 'responsive', variant: 'max-sm' }],
    ['min-[475px]', { type: 'responsive', variant: 'min', value: '475px' }],
    ['max-[960px]', { type: 'responsive', variant: 'max', value: '960px' }],
    // 잘못된 값
    ['sm-', { type: 'unknown', raw: 'sm-' }],
    ['max-', { type: 'unknown', raw: 'max-' }],
    ['min-', { type: 'unknown', raw: 'min-' }],
    ['min-[]', { type: 'unknown', raw: 'min-[]' }],
    ['', { type: 'unknown', raw: '' }],
    [null as any, { type: 'unknown', raw: null }],
    ['hover', { type: 'unknown', raw: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 