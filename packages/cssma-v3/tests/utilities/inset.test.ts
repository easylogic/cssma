import { describe, it, expect } from 'vitest';
import { parseInset } from '../../src/parser/utilities/inset';

describe('parseInsetUtility', () => {
  const cases: Array<[string, any]> = [
    ['inset-0', { type: 'inset', value: 0, raw: 'inset-0', arbitrary: false }],
    ['inset-x-0', { type: 'inset', direction: 'x', value: 0, raw: 'inset-x-0', arbitrary: false }],
    ['inset-y-0', { type: 'inset', direction: 'y', value: 0, raw: 'inset-y-0', arbitrary: false }],
    ['top-0', { type: 'inset', direction: 'top', value: 0, raw: 'top-0', arbitrary: false }],
    ['right-0', { type: 'inset', direction: 'right', value: 0, raw: 'right-0', arbitrary: false }],
    ['bottom-0', { type: 'inset', direction: 'bottom', value: 0, raw: 'bottom-0', arbitrary: false }],
    ['left-0', { type: 'inset', direction: 'left', value: 0, raw: 'left-0', arbitrary: false }],
    ['inset-px', { type: 'inset', value: 'px', raw: 'inset-px', arbitrary: false }],
    ['inset-x-px', { type: 'inset', direction: 'x', value: 'px', raw: 'inset-x-px', arbitrary: false }],
    ['inset-y-px', { type: 'inset', direction: 'y', value: 'px', raw: 'inset-y-px', arbitrary: false }],
    ['top-px', { type: 'inset', direction: 'top', value: 'px', raw: 'top-px', arbitrary: false }],
    ['right-px', { type: 'inset', direction: 'right', value: 'px', raw: 'right-px', arbitrary: false }],
    ['bottom-px', { type: 'inset', direction: 'bottom', value: 'px', raw: 'bottom-px', arbitrary: false }],
    ['left-px', { type: 'inset', direction: 'left', value: 'px', raw: 'left-px', arbitrary: false }],
    ['inset-[10px]', { type: 'inset', value: '10px', raw: 'inset-[10px]', arbitrary: true }],
    ['inset-x-[50%]', { type: 'inset', direction: 'x', value: '50%', raw: 'inset-x-[50%]', arbitrary: true }],
    ['inset-y-[var(--foo)]', { type: 'inset', direction: 'y', value: 'var(--foo)', raw: 'inset-y-[var(--foo)]', arbitrary: true }],
    ['top-[1rem]', { type: 'inset', direction: 'top', value: '1rem', raw: 'top-[1rem]', arbitrary: true }],
    ['right-[2px]', { type: 'inset', direction: 'right', value: '2px', raw: 'right-[2px]', arbitrary: true }],
    ['bottom-[-10%]', { type: 'inset', direction: 'bottom', value: '-10%', raw: 'bottom-[-10%]', arbitrary: true }],
    ['left-[calc(100%-4rem)]', { type: 'inset', direction: 'left', value: 'calc(100%-4rem)', raw: 'left-[calc(100%-4rem)]', arbitrary: true }],
  ];

  it.each(cases)('parseInset(%s)', (input, expected) => {
    expect(parseInset(input)).toEqual(expected);
  });
}); 