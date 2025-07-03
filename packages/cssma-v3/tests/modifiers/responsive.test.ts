import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['sm', baseModifier({ prefix: 'sm', value: '', raw: 'sm' })],
    ['md', baseModifier({ prefix: 'md', value: '', raw: 'md' })],
    ['lg', baseModifier({ prefix: 'lg', value: '', raw: 'lg' })],
    ['xl', baseModifier({ prefix: 'xl', value: '', raw: 'xl' })],
    ['2xl', baseModifier({ prefix: '2xl', value: '', raw: '2xl' })],
    ['xs', baseModifier({ prefix: 'xs', value: '', raw: 'xs' })],
    ['3xl', baseModifier({ prefix: '3xl', value: '', raw: '3xl' })],
    ['max-sm', baseModifier({ prefix: 'max', value: 'sm', raw: 'max-sm' })],
    ['min-[475px]', baseModifier({ prefix: 'min', value: '475px', arbitrary: true, arbitraryValue: '475px', raw: 'min-[475px]' })],
    ['max-[960px]', baseModifier({ prefix: 'max', value: '960px', arbitrary: true, arbitraryValue: '960px', raw: 'max-[960px]' })],
    ['min-[]', baseModifier({ prefix: 'min', value: '[]', raw: 'min-[]' })],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 