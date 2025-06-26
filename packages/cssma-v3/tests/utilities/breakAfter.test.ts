import { describe, it, expect } from 'vitest';
import { parseBreakAfter } from '../../src/parser/utilities/breakAfter';

describe('parseBreakAfterUtility', () => {
  const cases: Array<[string, any]> = [
    ['break-after-auto', { type: 'break-after', preset: 'auto', raw: 'break-after-auto', arbitrary: false }],
    ['break-after-avoid', { type: 'break-after', preset: 'avoid', raw: 'break-after-avoid', arbitrary: false }],
    ['break-after-all', { type: 'break-after', preset: 'all', raw: 'break-after-all', arbitrary: false }],
    ['break-after-avoid-page', { type: 'break-after', preset: 'avoid-page', raw: 'break-after-avoid-page', arbitrary: false }],
    ['break-after-page', { type: 'break-after', preset: 'page', raw: 'break-after-page', arbitrary: false }],
    ['break-after-left', { type: 'break-after', preset: 'left', raw: 'break-after-left', arbitrary: false }],
    ['break-after-right', { type: 'break-after', preset: 'right', raw: 'break-after-right', arbitrary: false }],
    ['break-after-column', { type: 'break-after', preset: 'column', raw: 'break-after-column', arbitrary: false }],
    ['break-after-[custom]', { type: 'break-after', value: 'custom', raw: 'break-after-[custom]', arbitrary: true }],
    ['break-after-[var(--break)]', { type: 'break-after', value: 'var(--break)', raw: 'break-after-[var(--break)]', arbitrary: true }],
  ];

  it.each(cases)('parseBreakAfter(%s)', (input, expected) => {
    expect(parseBreakAfter(input)).toEqual(expected);
  });
}); 