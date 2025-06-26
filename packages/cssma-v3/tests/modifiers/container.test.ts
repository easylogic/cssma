import { describe, it, expect } from 'vitest';
import { parseContainerModifier } from '../../src/parser/modifiers/container';

describe('parseContainerModifier', () => {
  const cases: Array<[string, any]> = [
    ['@md', { type: 'container', variant: 'md' }],
    ['@max-md', { type: 'container', variant: 'max-md' }],
    ['@container/main', { type: 'container', variant: 'container', name: 'main' }],
    ['@sm/main', { type: 'container', variant: 'sm', name: 'main' }],
    ['@min-[475px]', { type: 'container', variant: 'min', value: '475px' }],
    ['@max-[960px]', { type: 'container', variant: 'max', value: '960px' }],
    // 잘못된 값
    ['md', null],
    ['container/main', null],
    ['@', null],
    ['', null],
    [null as any, null],
    ['@min-', null],
    ['@container/', null],
    ['@/main', null],
    ['@min-[', null],
  ];

  it.each(cases)('parseContainerModifier(%s)', (input, expected) => {
    expect(parseContainerModifier(input)).toEqual(expected);
  });
}); 