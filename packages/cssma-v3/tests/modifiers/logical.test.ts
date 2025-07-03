import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    // 기본 형태
    ['has-checked', { type: 'modifier', prefix: 'has-checked' }],
    ['not-focus', { type: 'modifier', prefix: 'not-focus' }],
    ['has-aria-checked', { type: 'modifier', prefix: 'has-aria-checked' }],
    ['not-hover', { type: 'modifier', prefix: 'not-hover' }],
    // arbitrary 형태
    ['has-[aria-checked=true]', { type: 'modifier', prefix: 'has-[aria-checked=true]' }],
    ['not-[data-state=open]', { type: 'modifier', prefix: 'not-[data-state=open]' }],
    // 엣지/에러
    ['has-', { type: 'modifier', prefix: 'has-' }],
    ['not-', { type: 'modifier', prefix: 'not-' }],
    ['has', { type: 'unknown', raw: 'has' }],
    ['not', { type: 'unknown', raw: 'not' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 