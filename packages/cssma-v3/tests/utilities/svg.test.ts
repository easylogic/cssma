import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (svg)', () => {
  describe('fill', () => {
    it('should parse Tailwind v4 fill classes', () => {
      expect(parseUtility('fill-black')).toEqual(baseUtility({ prefix: 'fill', value: 'black', raw: 'fill-black' }));
      expect(parseUtility('fill-white')).toEqual(baseUtility({ prefix: 'fill', value: 'white', raw: 'fill-white' }));
      expect(parseUtility('fill-red-500')).toEqual(baseUtility({ prefix: 'fill', value: 'red-500', raw: 'fill-red-500' }));
      expect(parseUtility('fill-[color:rebeccapurple]')).toEqual(baseUtility({ prefix: 'fill', value: '[color:rebeccapurple]', raw: 'fill-[color:rebeccapurple]' }));
      expect(parseUtility('fill-')).toEqual({ type: 'unknown', raw: 'fill-' });
      expect(parseUtility('fill-foo')).toEqual({ type: 'unknown', raw: 'fill-foo' });
    });
  });

  describe('stroke', () => {
    it('should parse Tailwind v4 stroke classes', () => {
      expect(parseUtility('stroke-black')).toEqual(baseUtility({ prefix: 'stroke', value: 'black', raw: 'stroke-black' }));
      expect(parseUtility('stroke-white')).toEqual(baseUtility({ prefix: 'stroke', value: 'white', raw: 'stroke-white' }));
      expect(parseUtility('stroke-red-500')).toEqual(baseUtility({ prefix: 'stroke', value: 'red-500', raw: 'stroke-red-500' }));
      expect(parseUtility('stroke-[color:rebeccapurple]')).toEqual(baseUtility({ prefix: 'stroke', value: '[color:rebeccapurple]', raw: 'stroke-[color:rebeccapurple]' }));
      expect(parseUtility('stroke-')).toEqual({ type: 'unknown', raw: 'stroke-' });
      expect(parseUtility('stroke-foo')).toEqual({ type: 'unknown', raw: 'stroke-foo' });
    });
  });

  describe('stroke-width', () => {
    it('should parse Tailwind v4 stroke-width classes', () => {
      expect(parseUtility('stroke-0')).toEqual(baseUtility({ prefix: 'stroke', value: '0', raw: 'stroke-0' }));
      expect(parseUtility('stroke-2')).toEqual(baseUtility({ prefix: 'stroke', value: '2', raw: 'stroke-2' }));
      expect(parseUtility('stroke-[3px]')).toEqual(baseUtility({ prefix: 'stroke', value: '[3px]', raw: 'stroke-[3px]' }));
      expect(parseUtility('stroke-')).toEqual({ type: 'unknown', raw: 'stroke-' });
      expect(parseUtility('stroke-width-foo')).toEqual({ type: 'unknown', raw: 'stroke-width-foo' });
    });
  });
}); 