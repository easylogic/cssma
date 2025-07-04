import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (overflow)', () => {
  describe('overflow', () => {
    it('should parse Tailwind v4 overflow classes', () => {
      expect(parseUtility('overflow-auto')).toEqual(baseUtility({ prefix: 'overflow', value: 'auto', raw: 'overflow-auto' }));
      expect(parseUtility('overflow-hidden')).toEqual(baseUtility({ prefix: 'overflow', value: 'hidden', raw: 'overflow-hidden' }));
      expect(parseUtility('overflow-visible')).toEqual(baseUtility({ prefix: 'overflow', value: 'visible', raw: 'overflow-visible' }));
      expect(parseUtility('overflow-scroll')).toEqual(baseUtility({ prefix: 'overflow', value: 'scroll', raw: 'overflow-scroll' }));
      expect(parseUtility('overflow-clip')).toEqual(baseUtility({ prefix: 'overflow', value: 'clip', raw: 'overflow-clip' }));
      expect(parseUtility('overflow-[inherit]')).toEqual(baseUtility({ prefix: 'overflow', value: '[inherit]', raw: 'overflow-[inherit]' }));
      expect(parseUtility('overflow-')).toEqual({ type: 'unknown', raw: 'overflow-' });
      expect(parseUtility('overflow-foo')).toEqual({ type: 'unknown', raw: 'overflow-foo' });
    });
  });

  describe('overflow-x', () => {
    it('should parse Tailwind v4 overflow-x classes', () => {
      expect(parseUtility('overflow-x-auto')).toEqual(baseUtility({ prefix: 'overflow-x', value: 'auto', raw: 'overflow-x-auto' }));
      expect(parseUtility('overflow-x-hidden')).toEqual(baseUtility({ prefix: 'overflow-x', value: 'hidden', raw: 'overflow-x-hidden' }));
      expect(parseUtility('overflow-x-visible')).toEqual(baseUtility({ prefix: 'overflow-x', value: 'visible', raw: 'overflow-x-visible' }));
      expect(parseUtility('overflow-x-scroll')).toEqual(baseUtility({ prefix: 'overflow-x', value: 'scroll', raw: 'overflow-x-scroll' }));
      expect(parseUtility('overflow-x-clip')).toEqual(baseUtility({ prefix: 'overflow-x', value: 'clip', raw: 'overflow-x-clip' }));
      expect(parseUtility('overflow-x-[inherit]')).toEqual(baseUtility({ prefix: 'overflow-x', value: '[inherit]', raw: 'overflow-x-[inherit]' }));
      expect(parseUtility('overflow-x-')).toEqual({ type: 'unknown', raw: 'overflow-x-' });
      expect(parseUtility('overflow-x-foo')).toEqual({ type: 'unknown', raw: 'overflow-x-foo' });
    });
  });

  describe('overflow-y', () => {
    it('should parse Tailwind v4 overflow-y classes', () => {
      expect(parseUtility('overflow-y-auto')).toEqual(baseUtility({ prefix: 'overflow-y', value: 'auto', raw: 'overflow-y-auto' }));
      expect(parseUtility('overflow-y-hidden')).toEqual(baseUtility({ prefix: 'overflow-y', value: 'hidden', raw: 'overflow-y-hidden' }));
      expect(parseUtility('overflow-y-visible')).toEqual(baseUtility({ prefix: 'overflow-y', value: 'visible', raw: 'overflow-y-visible' }));
      expect(parseUtility('overflow-y-scroll')).toEqual(baseUtility({ prefix: 'overflow-y', value: 'scroll', raw: 'overflow-y-scroll' }));
      expect(parseUtility('overflow-y-clip')).toEqual(baseUtility({ prefix: 'overflow-y', value: 'clip', raw: 'overflow-y-clip' }));
      expect(parseUtility('overflow-y-[inherit]')).toEqual(baseUtility({ prefix: 'overflow-y', value: '[inherit]', raw: 'overflow-y-[inherit]' }));
      expect(parseUtility('overflow-y-')).toEqual({ type: 'unknown', raw: 'overflow-y-' });
      expect(parseUtility('overflow-y-foo')).toEqual({ type: 'unknown', raw: 'overflow-y-foo' });
    });
  });

  describe('overscroll', () => {
    it('should parse Tailwind v4 overscroll classes', () => {
      expect(parseUtility('overscroll-auto')).toEqual(baseUtility({ prefix: 'overscroll', value: 'auto', raw: 'overscroll-auto' }));
      expect(parseUtility('overscroll-contain')).toEqual(baseUtility({ prefix: 'overscroll', value: 'contain', raw: 'overscroll-contain' }));
      expect(parseUtility('overscroll-none')).toEqual(baseUtility({ prefix: 'overscroll', value: 'none', raw: 'overscroll-none' }));
      expect(parseUtility('overscroll-')).toEqual({ type: 'unknown', raw: 'overscroll-' });
      expect(parseUtility('overscroll-foo')).toEqual({ type: 'unknown', raw: 'overscroll-foo' });
    });
  });

  describe('overscroll-x', () => {
    it('should parse Tailwind v4 overscroll-x classes', () => {
      expect(parseUtility('overscroll-x-auto')).toEqual(baseUtility({ prefix: 'overscroll-x', value: 'auto', raw: 'overscroll-x-auto' }));
      expect(parseUtility('overscroll-x-contain')).toEqual(baseUtility({ prefix: 'overscroll-x', value: 'contain', raw: 'overscroll-x-contain' }));
      expect(parseUtility('overscroll-x-none')).toEqual(baseUtility({ prefix: 'overscroll-x', value: 'none', raw: 'overscroll-x-none' }));
      expect(parseUtility('overscroll-x-')).toEqual({ type: 'unknown', raw: 'overscroll-x-' });
      expect(parseUtility('overscroll-x-foo')).toEqual({ type: 'unknown', raw: 'overscroll-x-foo' });
    });
  });

  describe('overscroll-y', () => {
    it('should parse Tailwind v4 overscroll-y classes', () => {
      expect(parseUtility('overscroll-y-auto')).toEqual(baseUtility({ prefix: 'overscroll-y', value: 'auto', raw: 'overscroll-y-auto' }));
      expect(parseUtility('overscroll-y-contain')).toEqual(baseUtility({ prefix: 'overscroll-y', value: 'contain', raw: 'overscroll-y-contain' }));
      expect(parseUtility('overscroll-y-none')).toEqual(baseUtility({ prefix: 'overscroll-y', value: 'none', raw: 'overscroll-y-none' }));
      expect(parseUtility('overscroll-y-')).toEqual({ type: 'unknown', raw: 'overscroll-y-' });
      expect(parseUtility('overscroll-y-foo')).toEqual({ type: 'unknown', raw: 'overscroll-y-foo' });
    });
  });
}); 