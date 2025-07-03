import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['pseudo-hover', { type: 'unknown', raw: 'pseudo-hover' }],
    ['pseudo-focus', { type: 'unknown', raw: 'pseudo-focus' }],
    ['pseudo-active', { type: 'unknown', raw: 'pseudo-active' }],
    ['pseudo-checked', { type: 'unknown', raw: 'pseudo-checked' }],
    ['pseudo-disabled', { type: 'unknown', raw: 'pseudo-disabled' }],
    ['pseudo-first-child', { type: 'unknown', raw: 'pseudo-first-child' }],
    ['pseudo-last-child', { type: 'unknown', raw: 'pseudo-last-child' }],
    ['pseudo-odd', { type: 'unknown', raw: 'pseudo-odd' }],
    ['pseudo-even', { type: 'unknown', raw: 'pseudo-even' }],
    ['pseudo-empty', { type: 'unknown', raw: 'pseudo-empty' }],
    ['pseudo-required', { type: 'unknown', raw: 'pseudo-required' }],
    ['pseudo-optional', { type: 'unknown', raw: 'pseudo-optional' }],
    ['pseudo-valid', { type: 'unknown', raw: 'pseudo-valid' }],
    ['pseudo-invalid', { type: 'unknown', raw: 'pseudo-invalid' }],
    ['pseudo-user-valid', { type: 'unknown', raw: 'pseudo-user-valid' }],
    ['pseudo-user-invalid', { type: 'unknown', raw: 'pseudo-user-invalid' }],
    ['pseudo-in-range', { type: 'unknown', raw: 'pseudo-in-range' }],
    ['pseudo-out-of-range', { type: 'unknown', raw: 'pseudo-out-of-range' }],
    ['pseudo-placeholder', { type: 'unknown', raw: 'pseudo-placeholder' }],
    ['pseudo-autofill', { type: 'unknown', raw: 'pseudo-autofill' }],
    ['pseudo-read-only', { type: 'unknown', raw: 'pseudo-read-only' }],
    ['pseudo-details-content', { type: 'unknown', raw: 'pseudo-details-content' }],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
    ['focus', baseModifier({ prefix: 'focus', value: '', raw: 'focus' })],
    ['active', baseModifier({ prefix: 'active', value: '', raw: 'active' })],
    ['checked', baseModifier({ prefix: 'checked', value: '', raw: 'checked' })],
    ['disabled', baseModifier({ prefix: 'disabled', value: '', raw: 'disabled' })],
    ['first-child', baseModifier({ prefix: 'first', value: 'child', raw: 'first-child' })],
    ['last-child', baseModifier({ prefix: 'last', value: 'child', raw: 'last-child' })],
    ['odd', baseModifier({ prefix: 'odd', value: '', raw: 'odd' })],
    ['even', baseModifier({ prefix: 'even', value: '', raw: 'even' })],
    ['empty', baseModifier({ prefix: 'empty', value: '', raw: 'empty' })],
    ['required', baseModifier({ prefix: 'required', value: '', raw: 'required' })],
    ['optional', baseModifier({ prefix: 'optional', value: '', raw: 'optional' })],
    ['valid', baseModifier({ prefix: 'valid', value: '', raw: 'valid' })],
    ['invalid', baseModifier({ prefix: 'invalid', value: '', raw: 'invalid' })],
    ['user-valid', baseModifier({ prefix: 'user-valid', value: '', raw: 'user-valid' })],
    ['user-invalid', baseModifier({ prefix: 'user-invalid', value: '', raw: 'user-invalid' })],
    ['in-range', baseModifier({ prefix: 'in-range', value: '', raw: 'in-range' })],
    ['out-of-range', baseModifier({ prefix: 'out-of-range', value: '', raw: 'out-of-range' })],
    ['placeholder', baseModifier({ prefix: 'placeholder', value: '', raw: 'placeholder' })],
    ['autofill', baseModifier({ prefix: 'autofill', value: '', raw: 'autofill' })],
    ['read-only', baseModifier({ prefix: 'read-only', value: '', raw: 'read-only' })],
    ['details-content', baseModifier({ prefix: 'details-content', value: '', raw: 'details-content' })],
    // 잘못된 값
    ['pseudo-', { type: 'unknown', raw: 'pseudo-' }],
    ['pseudo', { type: 'unknown', raw: 'pseudo' }],
    ['', { type: 'unknown', raw: '' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 