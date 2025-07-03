import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['nth-1', baseModifier({ prefix: 'nth', value: '1', raw: 'nth-1', numeric: true })],
    ['nth-2', baseModifier({ prefix: 'nth', value: '2', raw: 'nth-2', numeric: true })],
    ['nth-odd', baseModifier({ prefix: 'nth', value: 'odd', raw: 'nth-odd', numeric: false })],
    ['nth-even', baseModifier({ prefix: 'nth', value: 'even', raw: 'nth-even', numeric: false })],
    ['nth-of-type-3', baseModifier({ prefix: 'nth-of-type', value: '3', raw: 'nth-of-type-3', numeric: true })],
    ['nth-last-of-type-4', baseModifier({ prefix: 'nth-last-of-type', value: '4', raw: 'nth-last-of-type-4', numeric: true })],
    ['nth', baseModifier({ prefix: 'nth', value: '', raw: 'nth' })],
    ['nth-of-type', baseModifier({ prefix: 'nth-of-type', value: '', raw: 'nth-of-type' })],
    ['nth-last-of-type', baseModifier({ prefix: 'nth-last-of-type', value: '', raw: 'nth-last-of-type' })],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
    // 잘못된 값
    ['nth-', { type: 'unknown', raw: 'nth-' }],
    // ['nth', { type: 'unknown', raw: 'nth' }],
    ['', { type: 'unknown', raw: '' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 