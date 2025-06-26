import { describe, it, expect } from 'vitest';
import { parseDarkmodeModifier } from '../../src/parser/modifiers/darkmode';

describe('parseDarkmodeModifier', () => {
  const cases: Array<[string, any]> = [
    ['dark', { type: 'darkmode', mode: 'dark' }],
    ['light', { type: 'darkmode', mode: 'light' }],
    ['Dark', null],
    ['darkmode', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parseDarkmodeModifier(%s)', (input, expected) => {
    expect(parseDarkmodeModifier(input)).toEqual(expected);
  });
}); 