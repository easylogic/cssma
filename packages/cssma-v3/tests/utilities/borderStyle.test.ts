import { describe, it, expect } from 'vitest';
import { parseBorderStyle } from '../../src/parser/utilities/borderStyle';

describe('parseBorderStyle', () => {
  it('parses border-style presets', () => {
    const cases = [
      ['border-solid', { type: 'border-style', preset: 'solid', raw: 'border-solid', arbitrary: false }],
      ['border-dashed', { type: 'border-style', preset: 'dashed', raw: 'border-dashed', arbitrary: false }],
      ['border-dotted', { type: 'border-style', preset: 'dotted', raw: 'border-dotted', arbitrary: false }],
      ['border-double', { type: 'border-style', preset: 'double', raw: 'border-double', arbitrary: false }],
      ['border-hidden', { type: 'border-style', preset: 'hidden', raw: 'border-hidden', arbitrary: false }],
      ['border-none', { type: 'border-style', preset: 'none', raw: 'border-none', arbitrary: false }],
    ];
    for (const [input, expected] of cases) {
      expect(parseBorderStyle(input)).toMatchObject(expected);
    }
  });

  it('parses divide-style presets', () => {
    const cases = [
      ['divide-solid', { type: 'divide-style', preset: 'solid', raw: 'divide-solid', arbitrary: false }],
      ['divide-dashed', { type: 'divide-style', preset: 'dashed', raw: 'divide-dashed', arbitrary: false }],
      ['divide-dotted', { type: 'divide-style', preset: 'dotted', raw: 'divide-dotted', arbitrary: false }],
      ['divide-double', { type: 'divide-style', preset: 'double', raw: 'divide-double', arbitrary: false }],
      ['divide-hidden', { type: 'divide-style', preset: 'hidden', raw: 'divide-hidden', arbitrary: false }],
      ['divide-none', { type: 'divide-style', preset: 'none', raw: 'divide-none', arbitrary: false }],
    ];
    for (const [input, expected] of cases) {
      expect(parseBorderStyle(input)).toMatchObject(expected);
    }
  });

  it('returns null for invalid values', () => {
    const invalids = [
      'border-foo',
      'divide-bar',
      'border-',
      'divide-',
      'border-solid-extra',
      'divide-dashed-2',
      '',
      'border',
      'divide',
    ];
    for (const input of invalids) {
      expect(parseBorderStyle(input)).toBeNull();
    }
  });
}); 