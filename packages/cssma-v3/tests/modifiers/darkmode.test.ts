import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['dark', baseModifier({ prefix: 'dark', value: '', raw: 'dark' })],
    ['light', baseModifier({ prefix: 'light', value: '', raw: 'light' })],
    ['Dark', { type: 'unknown', raw: 'Dark' }],
    ['darkmode-', { type: 'unknown', raw: 'darkmode-' }],
    ['darkmode', { type: 'unknown', raw: 'darkmode' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 