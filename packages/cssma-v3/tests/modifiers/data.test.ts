import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    // 단순 상태
    ['data-active', { type: 'modifier', prefix: 'data-active' }],
    ['data-foo-bar', { type: 'modifier', prefix: 'data-foo-bar' }],
    // arbitrary 상태
    ['data-[foo=bar]', { type: 'modifier', prefix: 'data-[foo=bar]' }],
    ['data-[sort=ascending]', { type: 'modifier', prefix: 'data-[sort=ascending]' }],
    // 엣지/에러
    ['data-', { type: 'modifier', prefix: 'data-' }],
    ['data', { type: 'unknown', raw: 'data' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 