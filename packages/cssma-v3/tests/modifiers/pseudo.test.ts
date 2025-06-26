import { describe, it, expect } from 'vitest';
import { parsePseudoModifier } from '../../src/parser/modifiers/pseudo';

describe('parsePseudoModifier', () => {
  const cases: Array<[string, any]> = [
    ['hover', { type: 'pseudo', name: 'hover' }],
    ['focus', { type: 'pseudo', name: 'focus' }],
    ['active', { type: 'pseudo', name: 'active' }],
    ['visited', { type: 'pseudo', name: 'visited' }],
    ['focus-within', { type: 'pseudo', name: 'focus-within' }],
    ['focus-visible', { type: 'pseudo', name: 'focus-visible' }],
    ['checked', { type: 'pseudo', name: 'checked' }],
    ['disabled', { type: 'pseudo', name: 'disabled' }],
    ['enabled', { type: 'pseudo', name: 'enabled' }],
    ['first', { type: 'pseudo', name: 'first' }],
    ['last', { type: 'pseudo', name: 'last' }],
    ['odd', { type: 'pseudo', name: 'odd' }],
    ['even', { type: 'pseudo', name: 'even' }],
    ['empty', { type: 'pseudo', name: 'empty' }],
    ['required', { type: 'pseudo', name: 'required' }],
    ['optional', { type: 'pseudo', name: 'optional' }],
    ['valid', { type: 'pseudo', name: 'valid' }],
    ['invalid', { type: 'pseudo', name: 'invalid' }],
    ['user-valid', { type: 'pseudo', name: 'user-valid' }],
    ['user-invalid', { type: 'pseudo', name: 'user-invalid' }],
    ['in-range', { type: 'pseudo', name: 'in-range' }],
    ['out-of-range', { type: 'pseudo', name: 'out-of-range' }],
    ['default', { type: 'pseudo', name: 'default' }],
    ['indeterminate', { type: 'pseudo', name: 'indeterminate' }],
    ['placeholder-shown', { type: 'pseudo', name: 'placeholder-shown' }],
    ['autofill', { type: 'pseudo', name: 'autofill' }],
    ['read-only', { type: 'pseudo', name: 'read-only' }],
    ['details-content', { type: 'pseudo', name: 'details-content' }],
    // 잘못된 값
    ['not-a-pseudo', null],
    ['', null],
    ['hovered', null],
  ];

  it.each(cases)('parsePseudoModifier(%s)', (input, expected) => {
    expect(parsePseudoModifier(input)).toEqual(expected);
  });
}); 