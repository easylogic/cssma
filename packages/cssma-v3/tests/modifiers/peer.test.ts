import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['peer-hover', baseModifier({ prefix: 'peer', value: 'hover', raw: 'peer-hover' })],
    ['peer-focus', baseModifier({ prefix: 'peer', value: 'focus', raw: 'peer-focus' })],
    ['peer-active', baseModifier({ prefix: 'peer', value: 'active', raw: 'peer-active' })],
    ['peer-checked', baseModifier({ prefix: 'peer', value: 'checked', raw: 'peer-checked' })],
    ['peer-disabled', baseModifier({ prefix: 'peer', value: 'disabled', raw: 'peer-disabled' })],
    ['peer-first-child', baseModifier({ prefix: 'peer', value: 'first-child', raw: 'peer-first-child' })],
    ['peer-last-child', baseModifier({ prefix: 'peer', value: 'last-child', raw: 'peer-last-child' })],
    ['peer', baseModifier({ prefix: 'peer', value: '', raw: 'peer' })],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 