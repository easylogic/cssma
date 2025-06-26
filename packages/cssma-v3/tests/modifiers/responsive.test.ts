import { describe, it, expect } from 'vitest';
import { parseResponsiveModifier } from '../../src/parser/modifiers/responsive';

describe('parseResponsiveModifier', () => {
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
    ['sm-', null],
    ['max-', null],
    ['min-', null],
    ['min-[]', null],
    ['', null],
    [null as any, null],
    ['hover', null],
  ];

  it.each(cases)('parseResponsiveModifier(%s)', (input, expected) => {
    expect(parseResponsiveModifier(input)).toEqual(expected);
  });
}); 