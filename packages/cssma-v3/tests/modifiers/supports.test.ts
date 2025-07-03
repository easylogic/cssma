import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    // 대괄호 쿼리
    ['supports-[display:grid]', baseModifier({ prefix: 'supports', value: 'display:grid', arbitrary: true, arbitraryValue: 'display:grid', raw: 'supports-[display:grid]' })],
    ['supports-[aspect-ratio>1]', baseModifier({ prefix: 'supports', value: 'aspect-ratio>1', arbitrary: true, arbitraryValue: 'aspect-ratio>1', raw: 'supports-[aspect-ratio>1]' })],
    ['supports-[foo=bar]', baseModifier({ prefix: 'supports', value: 'foo=bar', arbitrary: true, arbitraryValue: 'foo=bar', raw: 'supports-[foo=bar]' })],
    // 중첩 상태
    ['supports-hover', baseModifier({ prefix: 'supports', value: 'hover', raw: 'supports-hover' })],
    ['supports-focus', baseModifier({ prefix: 'supports', value: 'focus', raw: 'supports-focus' })],
    ['supports-active', baseModifier({ prefix: 'supports', value: 'active', raw: 'supports-active' })],
    ['supports-checked', baseModifier({ prefix: 'supports', value: 'checked', raw: 'supports-checked' })],
    ['supports-disabled', baseModifier({ prefix: 'supports', value: 'disabled', raw: 'supports-disabled' })],
    // 기타 feature
    ['supports-grid', baseModifier({ prefix: 'supports', value: 'grid', raw: 'supports-grid' })],
    ['supports-flex', baseModifier({ prefix: 'supports', value: 'flex', raw: 'supports-flex' })],
    ['supports-color', baseModifier({ prefix: 'supports', value: 'color', raw: 'supports-color' })],
    // 잘못된 값
    ['supports-', { type: 'unknown', raw: 'supports-' }],
    ['supports', baseModifier({ prefix: 'supports', value: '', raw: 'supports' })],
    ['', { type: 'unknown', raw: '' }],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 