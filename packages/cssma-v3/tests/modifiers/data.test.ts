import { describe, it, expect } from 'vitest';
import { parseDataModifier } from '../../src/parser/modifiers/data';

describe('parseDataModifier', () => {
  const cases: Array<[string, any]> = [
    // 단순 상태
    ['data-active', { type: 'data', attr: 'active', value: 'true' }],
    ['data-foo-bar', { type: 'data', attr: 'foo-bar', value: 'true' }],
    // arbitrary 상태
    ['data-[foo=bar]', { type: 'data', attr: 'data-foo', value: 'bar' }],
    ['data-[sort=ascending]', { type: 'data', attr: 'data-sort', value: 'ascending' }],
    // 엣지/에러
    ['data-', { type: 'data', attr: '', value: undefined }],
    ['data', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parseDataModifier(%s)', (input, expected) => {
    expect(parseDataModifier(input)).toEqual(expected);
  });
}); 