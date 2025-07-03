import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['sm', { type: 'modifier', prefix: 'sm' }],
    ['md', { type: 'modifier', prefix: 'md' }],
    ['lg', { type: 'modifier', prefix: 'lg' }],
    ['xl', { type: 'modifier', prefix: 'xl' }],
    ['2xl', { type: 'modifier', prefix: '2xl' }],
    ['xs', { type: 'modifier', prefix: 'xs' }],
    ['3xl', { type: 'modifier', prefix: '3xl' }],
    ['max-sm', { type: 'modifier', prefix: 'max-sm' }],
    ['min-[475px]', { type: 'modifier', prefix: 'min-[475px]' }],
    ['max-[960px]', { type: 'modifier', prefix: 'max-[960px]' }],
    // 잘못된 값
    ['sm-', { type: 'unknown', raw: 'sm-' }],
    ['max-', { type: 'unknown', raw: 'max-' }],
    ['min-', { type: 'unknown', raw: 'min-' }],
    ['min-[]', { type: 'unknown', raw: 'min-[]' }],
    ['', { type: 'unknown', raw: '' }],
    [null as any, { type: 'unknown', raw: null }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 