import { describe, it, expect } from 'vitest';
import { parseBreakpointModifier } from '../../src/parser/modifiers/breakpoint';

describe('parseBreakpointModifier', () => {
  const cases: Array<[string, any]> = [
    ['sm', { type: 'breakpoint', name: 'sm' }],
    ['md', { type: 'breakpoint', name: 'md' }],
    ['lg', { type: 'breakpoint', name: 'lg' }],
    ['xl', { type: 'breakpoint', name: 'xl' }],
    ['2xl', { type: 'breakpoint', name: '2xl' }],
    // 잘못된 값
    ['xs', null],
    ['', null],
    ['breakpoint', null],
  ];

  it.each(cases)('parseBreakpointModifier(%s)', (input, expected) => {
    expect(parseBreakpointModifier(input)).toEqual(expected);
  });
}); 