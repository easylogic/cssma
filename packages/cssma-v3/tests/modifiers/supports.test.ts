import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    // 대괄호 쿼리
    ['supports-[display:grid]', { type: 'supports', query: 'display:grid' }],
    ['supports-[aspect-ratio>1]', { type: 'supports', query: 'aspect-ratio>1' }],
    ['supports-[foo=bar]', { type: 'supports', query: 'foo=bar' }],
    // 중첩 상태
    ['supports-hover', { type: 'supports', state: 'hover' }],
    ['supports-focus', { type: 'supports', state: 'focus' }],
    ['supports-active', { type: 'supports', state: 'active' }],
    ['supports-checked', { type: 'supports', state: 'checked' }],
    ['supports-disabled', { type: 'supports', state: 'disabled' }],
    // 기타 feature
    ['supports-grid', { type: 'supports', feature: 'grid' }],
    ['supports-flex', { type: 'supports', feature: 'flex' }],
    ['supports-color', { type: 'supports', feature: 'color' }],
    // 잘못된 값
    ['supports-', { type: 'supports', feature: '' }],
    ['supports', { type: 'unknown', raw: 'supports' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'unknown', raw: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 