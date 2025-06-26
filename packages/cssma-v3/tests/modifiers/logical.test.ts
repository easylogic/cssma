import { describe, it, expect } from 'vitest';
import { parseLogicalModifier } from '../../src/parser/modifiers/logical';

describe('parseLogicalModifier', () => {
  const cases: Array<[string, any]> = [
    // 기본 형태
    ['has-checked', { type: 'logical', op: 'has', value: 'checked' }],
    ['not-focus', { type: 'logical', op: 'not', value: 'focus' }],
    ['has-aria-checked', { type: 'logical', op: 'has', value: 'aria-checked' }],
    ['not-hover', { type: 'logical', op: 'not', value: 'hover' }],
    // arbitrary 형태
    ['has-[aria-checked=true]', { type: 'logical', op: 'has', value: { attr: 'aria-checked', value: 'true' } }],
    ['not-[data-state=open]', { type: 'logical', op: 'not', value: { attr: 'data-state', value: 'open' } }],
    // 엣지/에러
    ['has-', { type: 'logical', op: 'has', value: '' }],
    ['not-', { type: 'logical', op: 'not', value: '' }],
    ['has', null],
    ['not', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parseLogicalModifier(%s)', (input, expected) => {
    expect(parseLogicalModifier(input)).toEqual(expected);
  });
}); 