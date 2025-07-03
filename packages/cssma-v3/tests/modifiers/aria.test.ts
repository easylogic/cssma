import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    // 단순 상태
    ['aria-checked', { type: 'modifier', prefix: 'aria-checked' }],
    ['aria-expanded', { type: 'modifier', prefix: 'aria-expanded' }],
    ['aria-selected', { type: 'modifier', prefix: 'aria-selected' }],
    // arbitrary 상태
    ['aria-[sort=ascending]', { type: 'modifier', prefix: 'aria-[sort=ascending]' }],
    ['aria-[level=2]', { type: 'modifier', prefix: 'aria-[level=2]' }],
    ['aria-[foo-bar=baz]', { type: 'modifier', prefix: 'aria-[foo-bar=baz]' }],
    // 엣지/에러
    ['aria-', { type: 'unknown', raw: 'aria-' }],
    ['aria', { type: 'unknown', raw: 'aria' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 