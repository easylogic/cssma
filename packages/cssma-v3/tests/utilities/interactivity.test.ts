import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (interactivity)', () => {
  describe('cursor', () => {
    it('should parse Tailwind v4 cursor classes', () => {
      expect(parseUtility('cursor-pointer')).toEqual(baseUtility({ prefix: 'cursor', value: 'pointer', raw: 'cursor-pointer' }));
      expect(parseUtility('cursor-default')).toEqual(baseUtility({ prefix: 'cursor', value: 'default', raw: 'cursor-default' }));
      expect(parseUtility('cursor-wait')).toEqual(baseUtility({ prefix: 'cursor', value: 'wait', raw: 'cursor-wait' }));
      expect(parseUtility('cursor-move')).toEqual(baseUtility({ prefix: 'cursor', value: 'move', raw: 'cursor-move' }));
      expect(parseUtility('cursor-not-allowed')).toEqual(baseUtility({ prefix: 'cursor', value: 'not-allowed', raw: 'cursor-not-allowed' }));
      expect(parseUtility('cursor-[grab]')).toEqual(baseUtility({ prefix: 'cursor', value: 'grab', arbitrary: true, arbitraryValue: 'grab', raw: 'cursor-[grab]' }));
      expect(parseUtility('cursor-')).toEqual({ type: 'unknown', raw: 'cursor-' });
    });
  });

  describe('pointer-events', () => {
    it('should parse Tailwind v4 pointer-events classes', () => {
      expect(parseUtility('pointer-events-none')).toEqual(baseUtility({ prefix: 'pointer-events', value: 'none', raw: 'pointer-events-none' }));
      expect(parseUtility('pointer-events-auto')).toEqual(baseUtility({ prefix: 'pointer-events', value: 'auto', raw: 'pointer-events-auto' }));
      expect(parseUtility('pointer-events-')).toEqual({ type: 'unknown', raw: 'pointer-events-' });
    });
  });

  describe('resize', () => {
    it('should parse Tailwind v4 resize classes', () => {
      expect(parseUtility('resize')).toEqual(baseUtility({ prefix: 'resize', raw: 'resize' }));
      expect(parseUtility('resize-none')).toEqual(baseUtility({ prefix: 'resize', value: 'none', raw: 'resize-none' }));
      expect(parseUtility('resize-x')).toEqual(baseUtility({ prefix: 'resize', value: 'x', raw: 'resize-x' }));
      expect(parseUtility('resize-y')).toEqual(baseUtility({ prefix: 'resize', value: 'y', raw: 'resize-y' }));
      expect(parseUtility('resize-')).toEqual({ type: 'unknown', raw: 'resize-' });
    });
  });

  describe('select', () => {
    it('should parse Tailwind v4 select classes', () => {
      expect(parseUtility('select-none')).toEqual(baseUtility({ prefix: 'select', value: 'none', raw: 'select-none' }));
      expect(parseUtility('select-text')).toEqual(baseUtility({ prefix: 'select', value: 'text', raw: 'select-text' }));
      expect(parseUtility('select-all')).toEqual(baseUtility({ prefix: 'select', value: 'all', raw: 'select-all' }));
      expect(parseUtility('select-auto')).toEqual(baseUtility({ prefix: 'select', value: 'auto', raw: 'select-auto' }));
      expect(parseUtility('select-')).toEqual({ type: 'unknown', raw: 'select-' });
    });
  });

  describe('touch', () => {
    it('should parse Tailwind v4 touch classes', () => {
      expect(parseUtility('touch-auto')).toEqual(baseUtility({ prefix: 'touch', value: 'auto', raw: 'touch-auto' }));
      expect(parseUtility('touch-none')).toEqual(baseUtility({ prefix: 'touch', value: 'none', raw: 'touch-none' }));
      expect(parseUtility('touch-pan-x')).toEqual(baseUtility({ prefix: 'touch', value: 'pan-x', raw: 'touch-pan-x' }));
      expect(parseUtility('touch-pan-y')).toEqual(baseUtility({ prefix: 'touch', value: 'pan-y', raw: 'touch-pan-y' }));
      expect(parseUtility('touch-pinch-zoom')).toEqual(baseUtility({ prefix: 'touch', value: 'pinch-zoom', raw: 'touch-pinch-zoom' }));
      expect(parseUtility('touch-manipulation')).toEqual(baseUtility({ prefix: 'touch', value: 'manipulation', raw: 'touch-manipulation' }));
      expect(parseUtility('touch-')).toEqual({ type: 'unknown', raw: 'touch-' });
    });
  });

  describe('user-select', () => {
    it('should parse Tailwind v4 user-select classes', () => {
      expect(parseUtility('user-select-none')).toEqual(baseUtility({ prefix: 'user-select', value: 'none', raw: 'user-select-none' }));
      expect(parseUtility('user-select-text')).toEqual(baseUtility({ prefix: 'user-select', value: 'text', raw: 'user-select-text' }));
      expect(parseUtility('user-select-all')).toEqual(baseUtility({ prefix: 'user-select', value: 'all', raw: 'user-select-all' }));
      expect(parseUtility('user-select-auto')).toEqual(baseUtility({ prefix: 'user-select', value: 'auto', raw: 'user-select-auto' }));
      expect(parseUtility('user-select-')).toEqual({ type: 'unknown', raw: 'user-select-' });
    });
  });

  describe('will-change', () => {
    it('should parse Tailwind v4 will-change classes', () => {
      expect(parseUtility('will-change-auto')).toEqual(baseUtility({ prefix: 'will-change', value: 'auto', raw: 'will-change-auto' }));
      expect(parseUtility('will-change-scroll')).toEqual(baseUtility({ prefix: 'will-change', value: 'scroll', raw: 'will-change-scroll' }));
      expect(parseUtility('will-change-contents')).toEqual(baseUtility({ prefix: 'will-change', value: 'contents', raw: 'will-change-contents' }));
      expect(parseUtility('will-change-transform')).toEqual(baseUtility({ prefix: 'will-change', value: 'transform', raw: 'will-change-transform' }));
      expect(parseUtility('will-change-')).toEqual({ type: 'unknown', raw: 'will-change-' });
    });
  });

  describe('appearance', () => {
    it('should parse Tailwind v4 appearance classes', () => {
      expect(parseUtility('appearance-none')).toEqual(baseUtility({ prefix: 'appearance', value: 'none', raw: 'appearance-none' }));
      expect(parseUtility('appearance-auto')).toEqual(baseUtility({ prefix: 'appearance', value: 'auto', raw: 'appearance-auto' }));
      expect(parseUtility('appearance-')).toEqual({ type: 'unknown', raw: 'appearance-' });
    });
  });

  describe('snap', () => {
    it('should parse Tailwind v4 snap classes', () => {
      expect(parseUtility('snap-none')).toEqual(baseUtility({ prefix: 'snap', value: 'none', raw: 'snap-none' }));
      expect(parseUtility('snap-x')).toEqual(baseUtility({ prefix: 'snap-x', value: '', raw: 'snap-x' }));
      expect(parseUtility('snap-y')).toEqual(baseUtility({ prefix: 'snap-y', value: '', raw: 'snap-y' }));
      expect(parseUtility('snap-both')).toEqual(baseUtility({ prefix: 'snap', value: 'both', raw: 'snap-both' }));
      expect(parseUtility('snap-mandatory')).toEqual(baseUtility({ prefix: 'snap', value: 'mandatory', raw: 'snap-mandatory' }));
      expect(parseUtility('snap-proximity')).toEqual(baseUtility({ prefix: 'snap', value: 'proximity', raw: 'snap-proximity' }));
      expect(parseUtility('snap-')).toEqual({ type: 'unknown', raw: 'snap-' });
    });
  });
}); 