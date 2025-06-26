import { describe, it, expect } from 'vitest';
import { parseBreakBefore } from '../../src/parser/utilities/breakBefore';

describe('parseBreakBeforeUtility', () => {
  const cases: Array<[string, any]> = [
    ['break-before-auto', { type: 'break-before', preset: 'auto', raw: 'break-before-auto', arbitrary: false }],
    ['break-before-avoid', { type: 'break-before', preset: 'avoid', raw: 'break-before-avoid', arbitrary: false }],
    ['break-before-all', { type: 'break-before', preset: 'all', raw: 'break-before-all', arbitrary: false }],
    ['break-before-avoid-page', { type: 'break-before', preset: 'avoid-page', raw: 'break-before-avoid-page', arbitrary: false }],
    ['break-before-page', { type: 'break-before', preset: 'page', raw: 'break-before-page', arbitrary: false }],
    ['break-before-left', { type: 'break-before', preset: 'left', raw: 'break-before-left', arbitrary: false }],
    ['break-before-right', { type: 'break-before', preset: 'right', raw: 'break-before-right', arbitrary: false }],
    ['break-before-column', { type: 'break-before', preset: 'column', raw: 'break-before-column', arbitrary: false }],
    ['break-before-[custom]', { type: 'break-before', value: 'custom', raw: 'break-before-[custom]', arbitrary: true }],
    ['break-before-[var(--break)]', { type: 'break-before', value: 'var(--break)', raw: 'break-before-[var(--break)]', arbitrary: true }],
  ];

  it.each(cases)('parseBreakBefore(%s)', (input, expected) => {
    expect(parseBreakBefore(input)).toEqual(expected);
  });
}); 