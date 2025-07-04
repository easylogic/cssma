import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (object)', () => {
  describe('object-fit', () => {
    it('should parse Tailwind v4 object-fit classes', () => {
      expect(parseUtility('object-contain')).toEqual(baseUtility({ prefix: 'object', value: 'contain', raw: 'object-contain' }));
      expect(parseUtility('object-cover')).toEqual(baseUtility({ prefix: 'object', value: 'cover', raw: 'object-cover' }));
      expect(parseUtility('object-fill')).toEqual(baseUtility({ prefix: 'object', value: 'fill', raw: 'object-fill' }));
      expect(parseUtility('object-none')).toEqual(baseUtility({ prefix: 'object', value: 'none', raw: 'object-none' }));
      expect(parseUtility('object-scale-down')).toEqual(baseUtility({ prefix: 'object', value: 'scale-down', raw: 'object-scale-down' }));
      expect(parseUtility('object-[myfit]')).toEqual(baseUtility({ prefix: 'object', value: '[myfit]', raw: 'object-[myfit]' }));
      expect(parseUtility('object-')).toEqual({ type: 'unknown', raw: 'object-' });
      expect(parseUtility('object-foo')).toEqual({ type: 'unknown', raw: 'object-foo' });
    });
  });

  describe('object-position', () => {
    it('should parse Tailwind v4 object-position classes', () => {
      expect(parseUtility('object-bottom')).toEqual(baseUtility({ prefix: 'object', value: 'bottom', raw: 'object-bottom' }));
      expect(parseUtility('object-center')).toEqual(baseUtility({ prefix: 'object', value: 'center', raw: 'object-center' }));
      expect(parseUtility('object-left')).toEqual(baseUtility({ prefix: 'object', value: 'left', raw: 'object-left' }));
      expect(parseUtility('object-left-bottom')).toEqual(baseUtility({ prefix: 'object', value: 'left-bottom', raw: 'object-left-bottom' }));
      expect(parseUtility('object-left-top')).toEqual(baseUtility({ prefix: 'object', value: 'left-top', raw: 'object-left-top' }));
      expect(parseUtility('object-right')).toEqual(baseUtility({ prefix: 'object', value: 'right', raw: 'object-right' }));
      expect(parseUtility('object-right-bottom')).toEqual(baseUtility({ prefix: 'object', value: 'right-bottom', raw: 'object-right-bottom' }));
      expect(parseUtility('object-right-top')).toEqual(baseUtility({ prefix: 'object', value: 'right-top', raw: 'object-right-top' }));
      expect(parseUtility('object-top')).toEqual(baseUtility({ prefix: 'object', value: 'top', raw: 'object-top' }));
      expect(parseUtility('object-[10%_20%]')).toEqual(baseUtility({ prefix: 'object', value: '[10%_20%]', raw: 'object-[10%_20%]' }));
      expect(parseUtility('object-')).toEqual({ type: 'unknown', raw: 'object-' });
      expect(parseUtility('object-foo')).toEqual({ type: 'unknown', raw: 'object-foo' });
    });
  });

  it('parses object', () => {
    expect(parseUtility('object-scale-down')).toEqual(baseUtility({ prefix: 'object', value: 'scale-down', raw: 'object-scale-down' }));
  });
  it('returns unknown for invalid', () => {
    expect(parseUtility('object-fit-')).toEqual({ type: 'unknown', raw: 'object-fit-' });
    expect(parseUtility('object-position-')).toEqual({ type: 'unknown', raw: 'object-position-' });
    expect(parseUtility('object-')).toEqual({ type: 'unknown', raw: 'object-' });
  });
}); 