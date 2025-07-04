import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (spacing)', () => {
  describe('margin (m, mx, my, mt, mr, mb, ml)', () => {
    it('should parse Tailwind v4 margin classes', () => {
      expect(parseUtility('m-0')).toEqual(baseUtility({ prefix: 'm', value: '0', raw: 'm-0' }));
      expect(parseUtility('m-4')).toEqual(baseUtility({ prefix: 'm', value: '4', raw: 'm-4' }));
      expect(parseUtility('mx-2')).toEqual(baseUtility({ prefix: 'mx', value: '2', raw: 'mx-2' }));
      expect(parseUtility('my-8')).toEqual(baseUtility({ prefix: 'my', value: '8', raw: 'my-8' }));
      expect(parseUtility('mt-1')).toEqual(baseUtility({ prefix: 'mt', value: '1', raw: 'mt-1' }));
      expect(parseUtility('mr-3')).toEqual(baseUtility({ prefix: 'mr', value: '3', raw: 'mr-3' }));
      expect(parseUtility('mb-6')).toEqual(baseUtility({ prefix: 'mb', value: '6', raw: 'mb-6' }));
      expect(parseUtility('ml-10')).toEqual(baseUtility({ prefix: 'ml', value: '10', raw: 'ml-10' }));
      expect(parseUtility('m-auto')).toEqual(baseUtility({ prefix: 'm', value: 'auto', raw: 'm-auto' }));
      expect(parseUtility('m-[12px]')).toEqual(baseUtility({ prefix: 'm', value: '[12px]', raw: 'm-[12px]' }));
      expect(parseUtility('m-[-8px]')).toEqual(baseUtility({ prefix: 'm', value: '[-8px]', raw: 'm-[-8px]' }));
      expect(parseUtility('m-4!')).toEqual(baseUtility({ prefix: 'm', value: '4', raw: 'm-4!', important: true }));
      expect(parseUtility('-m-2')).toEqual(baseUtility({ prefix: 'm', value: '2', raw: '-m-2', negative: true }));
      expect(parseUtility('m-')).toEqual({ type: 'unknown', raw: 'm-' });
      expect(parseUtility('m-foo')).toEqual({ type: 'unknown', raw: 'm-foo' });
    });
  });

  describe('padding (p, px, py, pt, pr, pb, pl)', () => {
    it('should parse Tailwind v4 padding classes', () => {
      expect(parseUtility('p-0')).toEqual(baseUtility({ prefix: 'p', value: '0', raw: 'p-0' }));
      expect(parseUtility('p-4')).toEqual(baseUtility({ prefix: 'p', value: '4', raw: 'p-4' }));
      expect(parseUtility('px-2')).toEqual(baseUtility({ prefix: 'px', value: '2', raw: 'px-2' }));
      expect(parseUtility('py-8')).toEqual(baseUtility({ prefix: 'py', value: '8', raw: 'py-8' }));
      expect(parseUtility('pt-1')).toEqual(baseUtility({ prefix: 'pt', value: '1', raw: 'pt-1' }));
      expect(parseUtility('pr-3')).toEqual(baseUtility({ prefix: 'pr', value: '3', raw: 'pr-3' }));
      expect(parseUtility('pb-6')).toEqual(baseUtility({ prefix: 'pb', value: '6', raw: 'pb-6' }));
      expect(parseUtility('pl-10')).toEqual(baseUtility({ prefix: 'pl', value: '10', raw: 'pl-10' }));
      expect(parseUtility('p-[24px]')).toEqual(baseUtility({ prefix: 'p', value: '[24px]', raw: 'p-[24px]' }));
      expect(parseUtility('p-4!')).toEqual(baseUtility({ prefix: 'p', value: '4', raw: 'p-4!', important: true }));
      expect(parseUtility('p-')).toEqual({ type: 'unknown', raw: 'p-' });
      expect(parseUtility('p-foo')).toEqual({ type: 'unknown', raw: 'p-foo' });
    });
  });

  describe('space (space-x, space-y)', () => {
    it('should parse Tailwind v4 space classes', () => {
      expect(parseUtility('space-x-4')).toEqual(baseUtility({ prefix: 'space-x', value: '4', raw: 'space-x-4' }));
      expect(parseUtility('space-y-2')).toEqual(baseUtility({ prefix: 'space-y', value: '2', raw: 'space-y-2' }));
      expect(parseUtility('space-x-reverse')).toEqual(baseUtility({ prefix: 'space-x', value: 'reverse', raw: 'space-x-reverse' }));
      expect(parseUtility('space-y-reverse')).toEqual(baseUtility({ prefix: 'space-y', value: 'reverse', raw: 'space-y-reverse' }));
      expect(parseUtility('space-x-[10px]')).toEqual(baseUtility({ prefix: 'space-x', value: '[10px]', raw: 'space-x-[10px]' }));
      expect(parseUtility('space-y-[2em]')).toEqual(baseUtility({ prefix: 'space-y', value: '[2em]', raw: 'space-y-[2em]' }));
      expect(parseUtility('space-x-')).toEqual({ type: 'unknown', raw: 'space-x-' });
      expect(parseUtility('space-y-foo')).toEqual({ type: 'unknown', raw: 'space-y-foo' });
    });
  });

  describe('gap (gap, gap-x, gap-y)', () => {
    it('should parse Tailwind v4 gap classes', () => {
      expect(parseUtility('gap-0')).toEqual(baseUtility({ prefix: 'gap', value: '0', raw: 'gap-0' }));
      expect(parseUtility('gap-4')).toEqual(baseUtility({ prefix: 'gap', value: '4', raw: 'gap-4' }));
      expect(parseUtility('gap-x-2')).toEqual(baseUtility({ prefix: 'gap-x', value: '2', raw: 'gap-x-2' }));
      expect(parseUtility('gap-y-8')).toEqual(baseUtility({ prefix: 'gap-y', value: '8', raw: 'gap-y-8' }));
      expect(parseUtility('gap-[5vw]')).toEqual(baseUtility({ prefix: 'gap', value: '[5vw]', raw: 'gap-[5vw]' }));
      expect(parseUtility('gap-x-[1.5rem]')).toEqual(baseUtility({ prefix: 'gap-x', value: '[1.5rem]', raw: 'gap-x-[1.5rem]' }));
      expect(parseUtility('gap-')).toEqual({ type: 'unknown', raw: 'gap-' });
      expect(parseUtility('gap-x-foo')).toEqual({ type: 'unknown', raw: 'gap-x-foo' });
    });
  });

  describe('inset (inset, inset-x, inset-y, top, right, bottom, left)', () => {
    it('should parse Tailwind v4 inset classes', () => {
      expect(parseUtility('inset-0')).toEqual(baseUtility({ prefix: 'inset', value: '0', raw: 'inset-0' }));
      expect(parseUtility('inset-x-4')).toEqual(baseUtility({ prefix: 'inset-x', value: '4', raw: 'inset-x-4' }));
      expect(parseUtility('inset-y-2')).toEqual(baseUtility({ prefix: 'inset-y', value: '2', raw: 'inset-y-2' }));
      expect(parseUtility('top-1')).toEqual(baseUtility({ prefix: 'top', value: '1', raw: 'top-1' }));
      expect(parseUtility('right-3')).toEqual(baseUtility({ prefix: 'right', value: '3', raw: 'right-3' }));
      expect(parseUtility('bottom-6')).toEqual(baseUtility({ prefix: 'bottom', value: '6', raw: 'bottom-6' }));
      expect(parseUtility('left-10')).toEqual(baseUtility({ prefix: 'left', value: '10', raw: 'left-10' }));
      expect(parseUtility('inset-[50%]')).toEqual(baseUtility({ prefix: 'inset', value: '[50%]', raw: 'inset-[50%]' }));
      expect(parseUtility('top-[12px]')).toEqual(baseUtility({ prefix: 'top', value: '[12px]', raw: 'top-[12px]' }));
      expect(parseUtility('inset-')).toEqual({ type: 'unknown', raw: 'inset-' });
      expect(parseUtility('top-foo')).toEqual({ type: 'unknown', raw: 'top-foo' });
    });
  });
}); 