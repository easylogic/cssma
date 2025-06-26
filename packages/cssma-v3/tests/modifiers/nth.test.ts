import { describe, it, expect } from 'vitest';
import { parseNthModifier, parseNthOfTypeModifier, parseNthLastOfTypeModifier } from '../../src/parser/modifiers/nth';

describe('parseNthModifier', () => {
  const cases: Array<[string, any]> = [
    ['nth-3', { type: 'nth', value: '3' }],
    ['nth-[3n+1]', { type: 'nth', value: '3n+1' }],
    ['nth-[2n]', { type: 'nth', value: '2n' }],
    ['nth-', { type: 'nth', value: '' }],
    // 잘못된 값
    ['nth', null],
    ['', null],
    ['hover', null],
  ];
  it.each(cases)('parseNthModifier(%s)', (input, expected) => {
    expect(parseNthModifier(input)).toEqual(expected);
  });
});

describe('parseNthOfTypeModifier', () => {
  const cases: Array<[string, any]> = [
    ['nth-of-type-2', { type: 'nth-of-type', value: '2' }],
    ['nth-of-type-[2n+1]', { type: 'nth-of-type', value: '2n+1' }],
    ['nth-of-type-[odd]', { type: 'nth-of-type', value: 'odd' }],
    ['nth-of-type-', { type: 'nth-of-type', value: '' }],
    // 잘못된 값
    ['nth-of-type', null],
    ['', null],
    ['hover', null],
  ];
  it.each(cases)('parseNthOfTypeModifier(%s)', (input, expected) => {
    expect(parseNthOfTypeModifier(input)).toEqual(expected);
  });
});

describe('parseNthLastOfTypeModifier', () => {
  const cases: Array<[string, any]> = [
    ['nth-last-of-type-4', { type: 'nth-last-of-type', value: '4' }],
    ['nth-last-of-type-[3n+1]', { type: 'nth-last-of-type', value: '3n+1' }],
    ['nth-last-of-type-[even]', { type: 'nth-last-of-type', value: 'even' }],
    ['nth-last-of-type-', { type: 'nth-last-of-type', value: '' }],
    // 잘못된 값
    ['nth-last-of-type', null],
    ['', null],
    ['hover', null],
  ];
  it.each(cases)('parseNthLastOfTypeModifier(%s)', (input, expected) => {
    expect(parseNthLastOfTypeModifier(input)).toEqual(expected);
  });
}); 