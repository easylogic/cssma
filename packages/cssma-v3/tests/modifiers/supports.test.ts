import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    // 대괄호 쿼리
    ['supports-[display:grid]', { type: 'modifier', prefix: 'supports-[display:grid]' }],
    ['supports-[aspect-ratio>1]', { type: 'modifier', prefix: 'supports-[aspect-ratio>1]' }],
    ['supports-[foo=bar]', { type: 'modifier', prefix: 'supports-[foo=bar]' }],
    // 중첩 상태
    ['supports-hover', { type: 'modifier', prefix: 'supports-hover' }],
    ['supports-focus', { type: 'modifier', prefix: 'supports-focus' }],
    ['supports-active', { type: 'modifier', prefix: 'supports-active' }],
    ['supports-checked', { type: 'modifier', prefix: 'supports-checked' }],
    ['supports-disabled', { type: 'modifier', prefix: 'supports-disabled' }],
    // 기타 feature
    ['supports-grid', { type: 'modifier', prefix: 'supports-grid' }],
    ['supports-flex', { type: 'modifier', prefix: 'supports-flex' }],
    ['supports-color', { type: 'modifier', prefix: 'supports-color' }],
    // 잘못된 값
    ['supports-', { type: 'modifier', prefix: 'supports-' }],
    ['supports', { type: 'unknown', raw: 'supports' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', { type: 'modifier', prefix: 'hover' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 