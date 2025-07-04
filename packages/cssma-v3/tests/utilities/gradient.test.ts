import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (gradient)', () => {
  describe('bg-gradient', () => {
    it('should parse Tailwind v4 bg-gradient classes', () => {
      expect(parseUtility('bg-gradient-to-t')).toEqual(baseUtility({ prefix: 'bg-gradient', value: 'to-t', raw: 'bg-gradient-to-t' }));
      expect(parseUtility('bg-gradient-to-b')).toEqual(baseUtility({ prefix: 'bg-gradient', value: 'to-b', raw: 'bg-gradient-to-b' }));
      expect(parseUtility('bg-gradient-to-l')).toEqual(baseUtility({ prefix: 'bg-gradient', value: 'to-l', raw: 'bg-gradient-to-l' }));
      expect(parseUtility('bg-gradient-to-r')).toEqual(baseUtility({ prefix: 'bg-gradient', value: 'to-r', raw: 'bg-gradient-to-r' }));
      expect(parseUtility('bg-gradient-')).toEqual({ type: 'unknown', raw: 'bg-gradient-' });
      expect(parseUtility('bg-gradient-foo')).toEqual({ type: 'unknown', raw: 'bg-gradient-foo' });
    });
  });

  describe('from/via/to', () => {
    it('should parse Tailwind v4 gradient color stop classes', () => {
      expect(parseUtility('from-blue-500')).toEqual(baseUtility({ prefix: 'from', value: 'blue-500', raw: 'from-blue-500' }));
      expect(parseUtility('via-green-400')).toEqual(baseUtility({ prefix: 'via', value: 'green-400', raw: 'via-green-400' }));
      expect(parseUtility('to-pink-600')).toEqual(baseUtility({ prefix: 'to', value: 'pink-600', raw: 'to-pink-600' }));
      expect(parseUtility('from-[color:rebeccapurple]')).toEqual(baseUtility({ prefix: 'from', value: '[color:rebeccapurple]', raw: 'from-[color:rebeccapurple]' }));
      expect(parseUtility('via-')).toEqual({ type: 'unknown', raw: 'via-' });
      expect(parseUtility('to-foo')).toEqual({ type: 'unknown', raw: 'to-foo' });
    });
  });

  it('parses gradient', () => {
    expect(parseUtility('gradient')).toEqual(baseUtility({ prefix: 'gradient', raw: 'gradient' }));
  });
  it('returns unknown for invalid', () => {
    expect(parseUtility('bg-gradient-to-')).toEqual({ type: 'unknown', raw: 'bg-gradient-to-' });
    expect(parseUtility('from-')).toEqual({ type: 'unknown', raw: 'from-' });
    expect(parseUtility('via-')).toEqual({ type: 'unknown', raw: 'via-' });
    expect(parseUtility('to-')).toEqual({ type: 'unknown', raw: 'to-' });
  });
}); 