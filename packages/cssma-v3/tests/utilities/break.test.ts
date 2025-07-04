import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (break)', () => {
  describe('break-after', () => {
    it('should parse Tailwind v4 break-after classes', () => {
      expect(parseUtility('break-after-auto')).toEqual(baseUtility({ prefix: 'break-after', value: 'auto', raw: 'break-after-auto' }));
      expect(parseUtility('break-after-avoid')).toEqual(baseUtility({ prefix: 'break-after', value: 'avoid', raw: 'break-after-avoid' }));
      expect(parseUtility('break-after-all')).toEqual(baseUtility({ prefix: 'break-after', value: 'all', raw: 'break-after-all' }));
      expect(parseUtility('break-after-')).toEqual({ type: 'unknown', raw: 'break-after-' });
      expect(parseUtility('break-after-foo')).toEqual({ type: 'unknown', raw: 'break-after-foo' });
    });
  });

  describe('break-before', () => {
    it('should parse Tailwind v4 break-before classes', () => {
      expect(parseUtility('break-before-auto')).toEqual(baseUtility({ prefix: 'break-before', value: 'auto', raw: 'break-before-auto' }));
      expect(parseUtility('break-before-avoid')).toEqual(baseUtility({ prefix: 'break-before', value: 'avoid', raw: 'break-before-avoid' }));
      expect(parseUtility('break-before-all')).toEqual(baseUtility({ prefix: 'break-before', value: 'all', raw: 'break-before-all' }));
      expect(parseUtility('break-before-')).toEqual({ type: 'unknown', raw: 'break-before-' });
      expect(parseUtility('break-before-foo')).toEqual({ type: 'unknown', raw: 'break-before-foo' });
    });
  });

  describe('break-inside', () => {
    it('should parse Tailwind v4 break-inside classes', () => {
      expect(parseUtility('break-inside-auto')).toEqual(baseUtility({ prefix: 'break-inside', value: 'auto', raw: 'break-inside-auto' }));
      expect(parseUtility('break-inside-avoid')).toEqual(baseUtility({ prefix: 'break-inside', value: 'avoid', raw: 'break-inside-avoid' }));
      expect(parseUtility('break-inside-all')).toEqual(baseUtility({ prefix: 'break-inside', value: 'all', raw: 'break-inside-all' }));
      expect(parseUtility('break-inside-')).toEqual({ type: 'unknown', raw: 'break-inside-' });
      expect(parseUtility('break-inside-foo')).toEqual({ type: 'unknown', raw: 'break-inside-foo' });
    });
  });

  describe('break', () => {
    it('should parse Tailwind v4 break classes', () => {
      expect(parseUtility('break-normal')).toEqual(baseUtility({ prefix: 'break', value: 'normal', raw: 'break-normal' }));
      expect(parseUtility('break-words')).toEqual(baseUtility({ prefix: 'break', value: 'words', raw: 'break-words' }));
      expect(parseUtility('break-all')).toEqual(baseUtility({ prefix: 'break', value: 'all', raw: 'break-all' }));
      expect(parseUtility('break-keep')).toEqual(baseUtility({ prefix: 'break', value: 'keep', raw: 'break-keep' }));
      expect(parseUtility('break-')).toEqual({ type: 'unknown', raw: 'break-' });
      expect(parseUtility('break-foo')).toEqual({ type: 'unknown', raw: 'break-foo' });
    });
  });
}); 