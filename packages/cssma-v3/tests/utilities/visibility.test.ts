import { describe, it, expect } from 'vitest';
import { parseVisibility } from '../../src/parser/utilities/visibility';

describe('parseVisibilityUtility', () => {
  const cases: Array<[string, any]> = [
    ['visible', { type: 'visibility', preset: 'visible', raw: 'visible', arbitrary: false }],
    ['invisible', { type: 'visibility', preset: 'invisible', raw: 'invisible', arbitrary: false }],
    ['collapse', { type: 'visibility', preset: 'collapse', raw: 'collapse', arbitrary: false }],
  ];

  it.each(cases)('parseVisibility(%s)', (input, expected) => {
    expect(parseVisibility(input)).toEqual(expected);
  });
}); 