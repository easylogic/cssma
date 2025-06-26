import { describe, it, expect } from 'vitest';
import { parseObjectFit } from '../../src/parser/utilities/objectFit';

describe('parseObjectFitUtility', () => {
  const cases: Array<[string, any]> = [
    ['object-contain', { type: 'object-fit', preset: 'contain', raw: 'object-contain', arbitrary: false }],
    ['object-cover', { type: 'object-fit', preset: 'cover', raw: 'object-cover', arbitrary: false }],
    ['object-fill', { type: 'object-fit', preset: 'fill', raw: 'object-fill', arbitrary: false }],
    ['object-none', { type: 'object-fit', preset: 'none', raw: 'object-none', arbitrary: false }],
    ['object-scale-down', { type: 'object-fit', preset: 'scale-down', raw: 'object-scale-down', arbitrary: false }],
  ];

  it.each(cases)('parseObjectFit(%s)', (input, expected) => {
    expect(parseObjectFit(input)).toEqual(expected);
  });
}); 