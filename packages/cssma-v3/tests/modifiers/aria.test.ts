import { describe, it, expect } from 'vitest';
import { parseAriaModifier } from '../../src/parser/modifiers/aria';

describe('parseAriaModifier', () => {
  const cases: Array<[string, any]> = [
    // 단순 상태
    ['aria-checked', { type: 'aria', attr: 'checked', value: 'true' }],
    ['aria-expanded', { type: 'aria', attr: 'expanded', value: 'true' }],
    ['aria-selected', { type: 'aria', attr: 'selected', value: 'true' }],
    // arbitrary 상태
    ['aria-[sort=ascending]', { type: 'aria', attr: 'aria-sort', value: 'ascending' }],
    ['aria-[level=2]', { type: 'aria', attr: 'aria-level', value: '2' }],
    ['aria-[foo-bar=baz]', { type: 'aria', attr: 'aria-foo-bar', value: 'baz' }],
    // 엣지/에러
    ['aria-', { type: 'aria', attr: '', value: undefined }],
    ['aria', null],
    ['', null],
    ['hover', null],
  ];

  it.each(cases)('parseAriaModifier(%s)', (input, expected) => {
    expect(parseAriaModifier(input)).toEqual(expected);
  });
}); 