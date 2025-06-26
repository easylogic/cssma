import { describe, it, expect } from 'vitest';
import { parseBreakInsideUtility } from '../../src/parser/utilities/breakInside';

describe('parseBreakInsideUtility', () => {
  const cases: Array<[string, any]> = [
    ['break-inside-auto', { type: 'break-inside', preset: 'auto', raw: 'break-inside-auto', arbitrary: false }],
    ['break-inside-avoid', { type: 'break-inside', preset: 'avoid', raw: 'break-inside-avoid', arbitrary: false }],
    ['break-inside-avoid-page', { type: 'break-inside', preset: 'avoid-page', raw: 'break-inside-avoid-page', arbitrary: false }],
    ['break-inside-avoid-column', { type: 'break-inside', preset: 'avoid-column', raw: 'break-inside-avoid-column', arbitrary: false }],
    ['break-inside-[custom]', { type: 'break-inside', value: 'custom', raw: 'break-inside-[custom]', arbitrary: true }],
    ['break-inside-[var(--break)]', { type: 'break-inside', value: 'var(--break)', raw: 'break-inside-[var(--break)]', arbitrary: true }],
  ];

  it.each(cases)('parseBreakInsideUtility(%s)', (input, expected) => {
    expect(parseBreakInsideUtility(input)).toEqual(expected);
  });
}); 