import { describe, it, expect } from 'vitest';
import { parseIsolationUtility } from '../../src/parser/utilities/isolation';

describe('parseIsolationUtility', () => {
  const cases: Array<[string, any]> = [
    ['isolation-auto', { type: 'isolation', preset: 'auto' }],
    ['isolation-isolate', { type: 'isolation', preset: 'isolate' }],
  ];

  it.each(cases)('parseIsolationUtility(%s)', (input, expected) => {
    expect(parseIsolationUtility(input)).toEqual(expected);
  });
}); 