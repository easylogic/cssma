import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['hover', { type: 'modifier', prefix: 'hover' }],
    ['focus', { type: 'modifier', prefix: 'focus' }],
    ['active', { type: 'modifier', prefix: 'active' }],
    ['visited', { type: 'modifier', prefix: 'visited' }],
    ['focus-within', { type: 'modifier', prefix: 'focus-within' }],
    ['focus-visible', { type: 'modifier', prefix: 'focus-visible' }],
    ['checked', { type: 'modifier', prefix: 'checked' }],
    ['disabled', { type: 'modifier', prefix: 'disabled' }],
    ['enabled', { type: 'modifier', prefix: 'enabled' }],
    ['first', { type: 'modifier', prefix: 'first' }],
    ['last', { type: 'modifier', prefix: 'last' }],
    ['odd', { type: 'modifier', prefix: 'odd' }],
    ['even', { type: 'modifier', prefix: 'even' }],
    ['empty', { type: 'modifier', prefix: 'empty' }],
    ['required', { type: 'modifier', prefix: 'required' }],
    ['optional', { type: 'modifier', prefix: 'optional' }],
    ['valid', { type: 'modifier', prefix: 'valid' }],
    ['invalid', { type: 'modifier', prefix: 'invalid' }],
    ['user-valid', { type: 'modifier', prefix: 'user-valid' }],
    ['user-invalid', { type: 'modifier', prefix: 'user-invalid' }],
    ['in-range', { type: 'modifier', prefix: 'in-range' }],
    ['out-of-range', { type: 'modifier', prefix: 'out-of-range' }],
    ['default', { type: 'modifier', prefix: 'default' }],
    ['indeterminate', { type: 'modifier', prefix: 'indeterminate' }],
    ['placeholder-shown', { type: 'modifier', prefix: 'placeholder-shown' }],
    ['autofill', { type: 'modifier', prefix: 'autofill' }],
    ['read-only', { type: 'modifier', prefix: 'read-only' }],
    ['details-content', { type: 'modifier', prefix: 'details-content' }],
    ['not-a-pseudo', { type: 'unknown', raw: 'not-a-pseudo' }],
    ['', { type: 'unknown', raw: '' }],
    ['hovered', { type: 'unknown', raw: 'hovered' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 