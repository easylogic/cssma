import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['logical-rtl', { type: 'unknown', raw: 'logical-rtl' }],
    ['logical-ltr', { type: 'unknown', raw: 'logical-ltr' }],
    // 잘못된 값
    ['logical-', { type: 'unknown', raw: 'logical-' }],
    ['logical', { type: 'unknown', raw: 'logical' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });

  it('should parse logical-rtl correctly', () => {
    const result = parseModifier('logical-rtl');
    expect(result).toEqual({ type: 'unknown', raw: 'logical-rtl' });
  });
}); 