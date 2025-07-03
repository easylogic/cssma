import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['@md', { type: 'modifier', prefix: '@md' }],
    ['@max-md', { type: 'modifier', prefix: '@max-md' }],
    ['@container/main', { type: 'modifier', prefix: '@container/main' }],
    ['@sm/main', { type: 'modifier', prefix: '@sm/main' }],
    ['@min-[475px]', { type: 'modifier', prefix: '@min-[475px]' }],
    ['@max-[960px]', { type: 'modifier', prefix: '@max-[960px]' }],
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