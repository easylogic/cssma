import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (position)', () => {
  describe('position', () => {
    it('should parse Tailwind v4 position classes', () => {
      expect(parseUtility('static')).toEqual(baseUtility({ prefix: 'static', raw: 'static' }));
      expect(parseUtility('fixed')).toEqual(baseUtility({ prefix: 'fixed', raw: 'fixed' }));
      expect(parseUtility('absolute')).toEqual(baseUtility({ prefix: 'absolute', raw: 'absolute' }));
      expect(parseUtility('relative')).toEqual(baseUtility({ prefix: 'relative', raw: 'relative' }));
      expect(parseUtility('sticky')).toEqual(baseUtility({ prefix: 'sticky', raw: 'sticky' }));
      expect(parseUtility('position-')).toEqual({ type: 'unknown', raw: 'position-' });
    });
  });

  describe('z-index', () => {
    it('should parse Tailwind v4 z-index classes', () => {
      expect(parseUtility('z-0')).toEqual(baseUtility({ prefix: 'z', value: '0', numeric: true, raw: 'z-0' }));
      expect(parseUtility('z-10')).toEqual(baseUtility({ prefix: 'z', value: '10', numeric: true, raw: 'z-10' }));
      expect(parseUtility('z-50')).toEqual(baseUtility({ prefix: 'z', value: '50', numeric: true, raw: 'z-50' }));
      expect(parseUtility('z-[99]')).toEqual(baseUtility({ prefix: 'z', value: '99', numeric: true, arbitrary: true, arbitraryValue: '99', raw: 'z-[99]' }));
      expect(parseUtility('z-auto')).toEqual(baseUtility({ prefix: 'z', value: 'auto', raw: 'z-auto' }));
      expect(parseUtility('z-')).toEqual({ type: 'unknown', raw: 'z-' });
    });
  });

  describe('inset', () => {
    it('should parse Tailwind v4 inset classes', () => {
      expect(parseUtility('inset-0')).toEqual(baseUtility({ prefix: 'inset', value: '0', numeric: true, raw: 'inset-0' }));
      expect(parseUtility('inset-x-4')).toEqual(baseUtility({ prefix: 'inset-x', value: '4', numeric: true, raw: 'inset-x-4' }));
      expect(parseUtility('inset-y-8')).toEqual(baseUtility({ prefix: 'inset-y', value: '8', numeric: true, raw: 'inset-y-8' }));
      expect(parseUtility('inset-[10px]')).toEqual(baseUtility({ prefix: 'inset', value: '10px', arbitrary: true, arbitraryValue: '10px', raw: 'inset-[10px]' }));
      expect(parseUtility('-inset-2')).toEqual(baseUtility({ prefix: 'inset', value: '2', numeric: true, raw: '-inset-2', negative: true }));
      expect(parseUtility('inset-')).toEqual({ type: 'unknown', raw: 'inset-' });
    });
  });

  describe('top/right/bottom/left', () => {
    it('should parse Tailwind v4 directional position classes', () => {
      expect(parseUtility('top-0')).toEqual(baseUtility({ prefix: 'top', value: '0', numeric: true, raw: 'top-0' }));
      expect(parseUtility('right-4')).toEqual(baseUtility({ prefix: 'right', value: '4', numeric: true, raw: 'right-4' }));
      expect(parseUtility('bottom-8')).toEqual(baseUtility({ prefix: 'bottom', value: '8', numeric: true, raw: 'bottom-8' }));
      expect(parseUtility('left-[10px]')).toEqual(baseUtility({ prefix: 'left', value: '10px', arbitrary: true, arbitraryValue: '10px', raw: 'left-[10px]' }));
      expect(parseUtility('-top-2')).toEqual(baseUtility({ prefix: 'top', value: '2', numeric: true, raw: '-top-2', negative: true }));
      expect(parseUtility('top-')).toEqual({ type: 'unknown', raw: 'top-' });
    });
  });
}); 