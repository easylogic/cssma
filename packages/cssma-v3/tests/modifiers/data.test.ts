import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['data-open', baseModifier({ prefix: 'data', value: 'open', raw: 'data-open' })],
    ['data-checked', baseModifier({ prefix: 'data', value: 'checked', raw: 'data-checked' })],
    ['data-disabled', baseModifier({ prefix: 'data', value: 'disabled', raw: 'data-disabled' })],
    ['data', baseModifier({ prefix: 'data', value: '', raw: 'data' })],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
    // 잘못된 값
    ['data-', { type: 'unknown', raw: 'data-' }],
    ['', { type: 'unknown', raw: '' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 