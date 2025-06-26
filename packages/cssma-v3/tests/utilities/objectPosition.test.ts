import { describe, it, expect } from 'vitest';
import { parseObjectPositionUtility } from '../../src/parser/utilities/objectPosition';

describe('parseObjectPositionUtility', () => {
  const cases: Array<[string, any]> = [
    ['object-bottom', { type: 'object-position', preset: 'bottom', raw: 'object-bottom', arbitrary: false }],
    ['object-center', { type: 'object-position', preset: 'center', raw: 'object-center', arbitrary: false }],
    ['object-left', { type: 'object-position', preset: 'left', raw: 'object-left', arbitrary: false }],
    ['object-left-bottom', { type: 'object-position', preset: 'left-bottom', raw: 'object-left-bottom', arbitrary: false }],
    ['object-left-top', { type: 'object-position', preset: 'left-top', raw: 'object-left-top', arbitrary: false }],
    ['object-right', { type: 'object-position', preset: 'right', raw: 'object-right', arbitrary: false }],
    ['object-right-bottom', { type: 'object-position', preset: 'right-bottom', raw: 'object-right-bottom', arbitrary: false }],
    ['object-right-top', { type: 'object-position', preset: 'right-top', raw: 'object-right-top', arbitrary: false }],
    ['object-top', { type: 'object-position', preset: 'top', raw: 'object-top', arbitrary: false }],
    ['object-[10%_20%]', { type: 'object-position', value: '10%_20%', raw: 'object-[10%_20%]', arbitrary: true }],
    ['object-[center_bottom]', { type: 'object-position', value: 'center_bottom', raw: 'object-[center_bottom]', arbitrary: true }],
  ];

  it.each(cases)('parseObjectPositionUtility(%s)', (input, expected) => {
    expect(parseObjectPositionUtility(input)).toEqual(expected);
  });
}); 