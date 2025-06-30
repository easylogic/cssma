import { describe, it, expect } from 'vitest';
import { parseInset } from '../../src/parser/utilities/inset';

describe('parseInsetUtility', () => {
  const cases: Array<[string, any]> = [
    ['inset-0', { type: 'inset', direction: 'all', value: '0', raw: 'inset-0', arbitrary: false, customProperty: false, negative: false }],
    ['inset-x-0', { type: 'inset', direction: 'x', value: '0', raw: 'inset-x-0', arbitrary: false, customProperty: false, negative: false }],
    ['inset-y-0', { type: 'inset', direction: 'y', value: '0', raw: 'inset-y-0', arbitrary: false, customProperty: false, negative: false }],
    ['top-0', { type: 'inset', direction: 'top', value: '0', raw: 'top-0', arbitrary: false, customProperty: false, negative: false }],
    ['right-0', { type: 'inset', direction: 'right', value: '0', raw: 'right-0', arbitrary: false, customProperty: false, negative: false }],
    ['bottom-0', { type: 'inset', direction: 'bottom', value: '0', raw: 'bottom-0', arbitrary: false, customProperty: false, negative: false }],
    ['left-0', { type: 'inset', direction: 'left', value: '0', raw: 'left-0', arbitrary: false, customProperty: false, negative: false }],
    ['inset-px', { type: 'inset', direction: 'all', value: 'px', raw: 'inset-px', arbitrary: false, customProperty: false, negative: false }],
    ['inset-x-px', { type: 'inset', direction: 'x', value: 'px', raw: 'inset-x-px', arbitrary: false, customProperty: false, negative: false }],
    ['inset-y-px', { type: 'inset', direction: 'y', value: 'px', raw: 'inset-y-px', arbitrary: false, customProperty: false, negative: false }],
    ['top-px', { type: 'inset', direction: 'top', value: 'px', raw: 'top-px', arbitrary: false, customProperty: false, negative: false }],
    ['right-px', { type: 'inset', direction: 'right', value: 'px', raw: 'right-px', arbitrary: false, customProperty: false, negative: false }],
    ['bottom-px', { type: 'inset', direction: 'bottom', value: 'px', raw: 'bottom-px', arbitrary: false, customProperty: false, negative: false }],
    ['left-px', { type: 'inset', direction: 'left', value: 'px', raw: 'left-px', arbitrary: false, customProperty: false, negative: false }],
    ['inset-[10px]', { type: 'inset', direction: 'all', value: '10px', raw: 'inset-[10px]', arbitrary: true, customProperty: false, negative: false }],
    ['inset-x-[50%]', { type: 'inset', direction: 'x', value: '50%', raw: 'inset-x-[50%]', arbitrary: true, customProperty: false, negative: false }],
    ['inset-y-[var(--foo)]', { type: 'inset', direction: 'y', value: 'var(--foo)', raw: 'inset-y-[var(--foo)]', arbitrary: true, customProperty: false, negative: false }],
    ['top-[1rem]', { type: 'inset', direction: 'top', value: '1rem', raw: 'top-[1rem]', arbitrary: true, customProperty: false, negative: false }],
    ['right-[2px]', { type: 'inset', direction: 'right', value: '2px', raw: 'right-[2px]', arbitrary: true, customProperty: false, negative: false }],
    ['bottom-[-10%]', { type: 'inset', direction: 'bottom', value: '-10%', raw: 'bottom-[-10%]', arbitrary: true, customProperty: false, negative: false }],
    ['left-[calc(100%-4rem)]', { type: 'inset', direction: 'left', value: 'calc(100%-4rem)', raw: 'left-[calc(100%-4rem)]', arbitrary: true, customProperty: false, negative: false }],
    // negative prefix 케이스
    ['-inset-4', { type: 'inset', direction: 'all', value: '4', raw: '-inset-4', arbitrary: false, customProperty: false, negative: true }],
    ['-top-1/2', { type: 'inset', direction: 'top', value: '1/2', raw: '-top-1/2', arbitrary: false, customProperty: false, negative: true }],
    // custom property 케이스
    ['top-(--foo)', { type: 'inset', direction: 'top', value: 'var(--foo)', raw: 'top-(--foo)', arbitrary: false, customProperty: true, negative: false }],
  ];

  it.each(cases)('parseInset(%s)', (input, expected) => {
    expect(parseInset(input)).toEqual(expected);
  });
}); 