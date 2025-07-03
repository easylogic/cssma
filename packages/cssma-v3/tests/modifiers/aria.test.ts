import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['aria-checked', baseModifier({ prefix: 'aria', value: 'checked', raw: 'aria-checked' })],
    ['aria-selected', baseModifier({ prefix: 'aria', value: 'selected', raw: 'aria-selected' })],
    ['aria-disabled', baseModifier({ prefix: 'aria', value: 'disabled', raw: 'aria-disabled' })],
    ['aria-expanded', baseModifier({ prefix: 'aria', value: 'expanded', raw: 'aria-expanded' })],
    ['aria-hidden', baseModifier({ prefix: 'aria', value: 'hidden', raw: 'aria-hidden' })],
    ['aria-pressed', baseModifier({ prefix: 'aria', value: 'pressed', raw: 'aria-pressed' })],
    ['aria-readonly', baseModifier({ prefix: 'aria', value: 'readonly', raw: 'aria-readonly' })],
    ['aria-required', baseModifier({ prefix: 'aria', value: 'required', raw: 'aria-required' })],
    ['aria-invalid', baseModifier({ prefix: 'aria', value: 'invalid', raw: 'aria-invalid' })],
    ['aria-busy', baseModifier({ prefix: 'aria', value: 'busy', raw: 'aria-busy' })],
    ['aria-live', baseModifier({ prefix: 'aria', value: 'live', raw: 'aria-live' })],
    ['aria-label', baseModifier({ prefix: 'aria', value: 'label', raw: 'aria-label' })],
    ['aria-valuenow', baseModifier({ prefix: 'aria', value: 'valuenow', raw: 'aria-valuenow' })],
    ['aria-valuemax', baseModifier({ prefix: 'aria', value: 'valuemax', raw: 'aria-valuemax' })],
    ['aria-valuemin', baseModifier({ prefix: 'aria', value: 'valuemin', raw: 'aria-valuemin' })],
    ['aria-valuetext', baseModifier({ prefix: 'aria', value: 'valuetext', raw: 'aria-valuetext' })],
    ['aria', baseModifier({ prefix: 'aria', value: '', raw: 'aria' })],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
    // 잘못된 값
    ['aria-', { type: 'unknown', raw: 'aria-' }],
    ['', { type: 'unknown', raw: '' }],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });
}); 