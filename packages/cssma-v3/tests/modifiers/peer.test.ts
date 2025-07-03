import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['peer-hover', { type: 'peer', state: 'hover' }],
    ['peer-focus', { type: 'peer', state: 'focus' }],
    ['peer-checked', { type: 'peer', state: 'checked' }],
    ['peer-', { type: 'peer', state: '' }],
    ['peer', { type: 'unknown', raw: 'peer' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'unknown', raw: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 