import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['open', baseModifier({ prefix: 'open', value: '', raw: 'open' })],
    ['inert', baseModifier({ prefix: 'inert', value: '', raw: 'inert' })],
    // arbitrary 상태
    ['state-[foo=bar]', { type: 'unknown', raw: 'state-[foo=bar]' }],
    ['state-[expanded=true]', { type: 'unknown', raw: 'state-[expanded=true]' }],
    // 잘못된 값
    ['state', { type: 'unknown', raw: 'state' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 