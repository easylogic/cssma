import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['@md', { type: 'container', variant: 'md' }],
    ['@max-md', { type: 'container', variant: 'max-md' }],
    ['@container/main', { type: 'container', variant: 'container', name: 'main' }],
    ['@sm/main', { type: 'container', variant: 'sm', name: 'main' }],
    ['@min-[475px]', { type: 'container', variant: 'min', value: '475px' }],
    ['@max-[960px]', { type: 'container', variant: 'max', value: '960px' }],
    // 잘못된 값
    ['md', { type: 'unknown', raw: 'md' }],
    ['container/main', { type: 'unknown', raw: 'container/main' }],
    ['@', { type: 'unknown', raw: '@' }],
    ['', { type: 'unknown', raw: '' }],
    [null as any, { type: 'unknown', raw: null }],
    ['@min-', { type: 'unknown', raw: '@min-' }],
    ['@container/', { type: 'unknown', raw: '@container/' }],
    ['@/main', { type: 'unknown', raw: '@/main' }],
    ['@min-[', { type: 'unknown', raw: '@min-[' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 