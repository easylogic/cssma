import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['ltr', baseModifier({ prefix: 'ltr', value: '', raw: 'ltr' })],
    ['rtl', baseModifier({ prefix: 'rtl', value: '', raw: 'rtl' })],
    // 잘못된 값
    ['direction-', { type: 'unknown', raw: 'direction-' }],
    ['direction', { type: 'unknown', raw: 'direction' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 