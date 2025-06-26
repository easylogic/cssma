import { describe, it, expect } from 'vitest';
import { parseIsolation } from '../../src/parser/utilities/isolation';

describe('parseIsolationUtility', () => {
  const cases: Array<[string, any]> = [
    ['isolation-auto', { type: 'isolation', preset: 'auto' }],
    ['isolation-isolate', { type: 'isolation', preset: 'isolate' }],
  ];

  it.each(cases)('parseIsolation(%s)', (input, expected) => {
    expect(parseIsolation(input)).toEqual(expected);
  });
}); 