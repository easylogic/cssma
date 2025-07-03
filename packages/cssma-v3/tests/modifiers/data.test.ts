import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    // 단순 상태
    ['data-active', { type: 'data', attr: 'active', value: 'true' }],
    ['data-foo-bar', { type: 'data', attr: 'foo-bar', value: 'true' }],
    // arbitrary 상태
    ['data-[foo=bar]', { type: 'data', attr: 'data-foo', value: 'bar' }],
    ['data-[sort=ascending]', { type: 'data', attr: 'data-sort', value: 'ascending' }],
    // 엣지/에러
    ['data-', { type: 'data', attr: '', value: undefined }],
    ['data', { type: 'unknown', raw: 'data' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'unknown', raw: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 