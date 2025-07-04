import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (scroll)', () => {
  describe('scroll-behavior', () => {
    it('should parse Tailwind v4 scroll behavior classes', () => {
      expect(parseUtility('scroll-auto')).toEqual(baseUtility({ prefix: 'scroll', value: 'auto', raw: 'scroll-auto' }));
      expect(parseUtility('scroll-smooth')).toEqual(baseUtility({ prefix: 'scroll', value: 'smooth', raw: 'scroll-smooth' }));
      expect(parseUtility('scroll-')).toEqual({ type: 'unknown', raw: 'scroll-' });
      expect(parseUtility('scroll-foo')).toEqual({ type: 'unknown', raw: 'scroll-foo' });
    });
  });

  describe('scroll-margin', () => {
    it('should parse Tailwind v4 scroll margin classes', () => {
      expect(parseUtility('scroll-m-0')).toEqual(baseUtility({ prefix: 'scroll-m', value: '0', raw: 'scroll-m-0' }));
      expect(parseUtility('scroll-mx-4')).toEqual(baseUtility({ prefix: 'scroll-mx', value: '4', raw: 'scroll-mx-4' }));
      expect(parseUtility('scroll-my-8')).toEqual(baseUtility({ prefix: 'scroll-my', value: '8', raw: 'scroll-my-8' }));
      expect(parseUtility('scroll-mt-2')).toEqual(baseUtility({ prefix: 'scroll-mt', value: '2', raw: 'scroll-mt-2' }));
      expect(parseUtility('scroll-mr-[10px]')).toEqual(baseUtility({ prefix: 'scroll-mr', value: '[10px]', raw: 'scroll-mr-[10px]' }));
      expect(parseUtility('scroll-mb-')).toEqual({ type: 'unknown', raw: 'scroll-mb-' });
      expect(parseUtility('scroll-mx-foo')).toEqual({ type: 'unknown', raw: 'scroll-mx-foo' });
    });
  });

  describe('scroll-padding', () => {
    it('should parse Tailwind v4 scroll padding classes', () => {
      expect(parseUtility('scroll-p-0')).toEqual(baseUtility({ prefix: 'scroll-p', value: '0', raw: 'scroll-p-0' }));
      expect(parseUtility('scroll-px-4')).toEqual(baseUtility({ prefix: 'scroll-px', value: '4', raw: 'scroll-px-4' }));
      expect(parseUtility('scroll-py-8')).toEqual(baseUtility({ prefix: 'scroll-py', value: '8', raw: 'scroll-py-8' }));
      expect(parseUtility('scroll-pt-2')).toEqual(baseUtility({ prefix: 'scroll-pt', value: '2', raw: 'scroll-pt-2' }));
      expect(parseUtility('scroll-pr-[10px]')).toEqual(baseUtility({ prefix: 'scroll-pr', value: '[10px]', raw: 'scroll-pr-[10px]' }));
      expect(parseUtility('scroll-pb-')).toEqual({ type: 'unknown', raw: 'scroll-pb-' });
      expect(parseUtility('scroll-px-foo')).toEqual({ type: 'unknown', raw: 'scroll-px-foo' });
    });
  });

  it('parses scroll-padding', () => {
    expect(parseUtility('scroll-p-4')).toEqual(baseUtility({ prefix: 'scroll-p', value: '4', raw: 'scroll-p-4' }));
    expect(parseUtility('scroll-px-2')).toEqual(baseUtility({ prefix: 'scroll-px', value: '2', raw: 'scroll-px-2' }));
    expect(parseUtility('scroll-py-1')).toEqual(baseUtility({ prefix: 'scroll-py', value: '1', raw: 'scroll-py-1' }));
  });
  it('parses scroll-margin', () => {
    expect(parseUtility('scroll-m-3')).toEqual(baseUtility({ prefix: 'scroll-m', value: '3', raw: 'scroll-m-3' }));
    expect(parseUtility('scroll-mx-5')).toEqual(baseUtility({ prefix: 'scroll-mx', value: '5', raw: 'scroll-mx-5' }));
    expect(parseUtility('scroll-my-6')).toEqual(baseUtility({ prefix: 'scroll-my', value: '6', raw: 'scroll-my-6' }));
  });
  it('parses snap', () => {
    expect(parseUtility('snap-start')).toEqual(baseUtility({ prefix: 'snap-start', raw: 'snap-start' }));
    expect(parseUtility('snap-end')).toEqual(baseUtility({ prefix: 'snap-end', raw: 'snap-end' }));
    expect(parseUtility('snap-x')).toEqual(baseUtility({ prefix: 'snap-x', raw: 'snap-x' }));
    expect(parseUtility('snap-y')).toEqual(baseUtility({ prefix: 'snap-y', raw: 'snap-y' }));
  });
  it('returns unknown for invalid', () => {
    expect(parseUtility('scroll-p-')).toEqual({ type: 'unknown', raw: 'scroll-p-' });
    expect(parseUtility('scroll-m-')).toEqual({ type: 'unknown', raw: 'scroll-m-' });
    expect(parseUtility('snap-')).toEqual({ type: 'unknown', raw: 'snap-' });
  });
}); 