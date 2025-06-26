import { describe, it, expect } from 'vitest';
import { parseGroupModifier } from '../../src/parser/modifiers/group';

describe('parseGroupModifier', () => {
  const cases: Array<[string, any]> = [
    ['group-hover', { type: 'group', state: 'hover' }],
    ['group-focus', { type: 'group', state: 'focus' }],
    ['group-active', { type: 'group', state: 'active' }],
    ['group-visited', { type: 'group', state: 'visited' }],
    // 잘못된 값
    ['group-', null],
    ['group', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parseGroupModifier(%s)', (input, expected) => {
    expect(parseGroupModifier(input)).toEqual(expected);
  });
}); 