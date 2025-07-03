import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['dark', { type: 'media', name: 'dark' }],
    ['light', { type: 'media', name: 'light' }],
    ['Dark', { type: 'unknown', raw: 'Dark' }],
    ['darkmode', { type: 'unknown', raw: 'darkmode' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'unknown', raw: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 