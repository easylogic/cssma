import { describe, it, expect } from 'vitest';
import { parseVisibilityUtility } from '../../src/parser/utilities/visibility';

describe('parseVisibilityUtility', () => {
  const cases: Array<[string, any]> = [
    ['visible', { type: 'visibility', preset: 'visible', raw: 'visible', arbitrary: false }],
    ['invisible', { type: 'visibility', preset: 'invisible', raw: 'invisible', arbitrary: false }],
    ['collapse', { type: 'visibility', preset: 'collapse', raw: 'collapse', arbitrary: false }],
  ];

  it.each(cases)('parseVisibilityUtility(%s)', (input, expected) => {
    expect(parseVisibilityUtility(input)).toEqual(expected);
  });
}); 