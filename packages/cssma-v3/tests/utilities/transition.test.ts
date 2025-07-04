import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (transition)', () => {
  describe('transition', () => {
    it('should parse Tailwind v4 transition classes', () => {
      expect(parseUtility('transition')).toEqual(baseUtility({ prefix: 'transition', raw: 'transition' }));
      expect(parseUtility('transition-none')).toEqual(baseUtility({ prefix: 'transition-none', raw: 'transition-none' }));
      expect(parseUtility('transition-all')).toEqual(baseUtility({ prefix: 'transition-all', raw: 'transition-all' }));
      expect(parseUtility('transition-colors')).toEqual(baseUtility({ prefix: 'transition-colors', raw: 'transition-colors' }));
      expect(parseUtility('transition-opacity')).toEqual(baseUtility({ prefix: 'transition-opacity', raw: 'transition-opacity' }));
      expect(parseUtility('transition-shadow')).toEqual(baseUtility({ prefix: 'transition-shadow', raw: 'transition-shadow' }));
      expect(parseUtility('transition-transform')).toEqual(baseUtility({ prefix: 'transition-transform', raw: 'transition-transform' }));
      expect(parseUtility('transition!')).toEqual(baseUtility({ prefix: 'transition', raw: 'transition!', important: true }));
      expect(parseUtility('transition-')).toEqual({ type: 'unknown', raw: 'transition-' });
      expect(parseUtility('transition-foo')).toEqual({ type: 'unknown', raw: 'transition-foo' });
    });
  });

  describe('duration', () => {
    it('should parse Tailwind v4 duration classes', () => {
      expect(parseUtility('duration-75')).toEqual(baseUtility({ prefix: 'duration', value: '75', raw: 'duration-75' }));
      expect(parseUtility('duration-150')).toEqual(baseUtility({ prefix: 'duration', value: '150', raw: 'duration-150' }));
      expect(parseUtility('duration-300')).toEqual(baseUtility({ prefix: 'duration', value: '300', raw: 'duration-300' }));
      expect(parseUtility('duration-1000')).toEqual(baseUtility({ prefix: 'duration', value: '1000', raw: 'duration-1000' }));
      expect(parseUtility('duration-[250ms]')).toEqual(baseUtility({ prefix: 'duration', value: '[250ms]', raw: 'duration-[250ms]' }));
      expect(parseUtility('duration-')).toEqual({ type: 'unknown', raw: 'duration-' });
      expect(parseUtility('duration-foo')).toEqual({ type: 'unknown', raw: 'duration-foo' });
    });
  });

  describe('delay', () => {
    it('should parse Tailwind v4 delay classes', () => {
      expect(parseUtility('delay-75')).toEqual(baseUtility({ prefix: 'delay', value: '75', raw: 'delay-75' }));
      expect(parseUtility('delay-150')).toEqual(baseUtility({ prefix: 'delay', value: '150', raw: 'delay-150' }));
      expect(parseUtility('delay-300')).toEqual(baseUtility({ prefix: 'delay', value: '300', raw: 'delay-300' }));
      expect(parseUtility('delay-1000')).toEqual(baseUtility({ prefix: 'delay', value: '1000', raw: 'delay-1000' }));
      expect(parseUtility('delay-[500ms]')).toEqual(baseUtility({ prefix: 'delay', value: '[500ms]', raw: 'delay-[500ms]' }));
      expect(parseUtility('delay-')).toEqual({ type: 'unknown', raw: 'delay-' });
      expect(parseUtility('delay-foo')).toEqual({ type: 'unknown', raw: 'delay-foo' });
    });
  });

  describe('ease', () => {
    it('should parse Tailwind v4 ease classes', () => {
      expect(parseUtility('ease-linear')).toEqual(baseUtility({ prefix: 'ease', value: 'linear', raw: 'ease-linear' }));
      expect(parseUtility('ease-in')).toEqual(baseUtility({ prefix: 'ease', value: 'in', raw: 'ease-in' }));
      expect(parseUtility('ease-out')).toEqual(baseUtility({ prefix: 'ease', value: 'out', raw: 'ease-out' }));
      expect(parseUtility('ease-in-out')).toEqual(baseUtility({ prefix: 'ease', value: 'in-out', raw: 'ease-in-out' }));
      expect(parseUtility('ease-[cubic-bezier(0.4,0,1,1)]')).toEqual(baseUtility({ prefix: 'ease', value: '[cubic-bezier(0.4,0,1,1)]', raw: 'ease-[cubic-bezier(0.4,0,1,1)]' }));
      expect(parseUtility('ease-')).toEqual({ type: 'unknown', raw: 'ease-' });
      expect(parseUtility('ease-foo')).toEqual({ type: 'unknown', raw: 'ease-foo' });
    });
  });

  describe('animate', () => {
    it('should parse Tailwind v4 animate classes', () => {
      expect(parseUtility('animate-none')).toEqual(baseUtility({ prefix: 'animate-none', raw: 'animate-none' }));
      expect(parseUtility('animate-spin')).toEqual(baseUtility({ prefix: 'animate-spin', raw: 'animate-spin' }));
      expect(parseUtility('animate-ping')).toEqual(baseUtility({ prefix: 'animate-ping', raw: 'animate-ping' }));
      expect(parseUtility('animate-pulse')).toEqual(baseUtility({ prefix: 'animate-pulse', raw: 'animate-pulse' }));
      expect(parseUtility('animate-bounce')).toEqual(baseUtility({ prefix: 'animate-bounce', raw: 'animate-bounce' }));
      expect(parseUtility('animate-')).toEqual({ type: 'unknown', raw: 'animate-' });
      expect(parseUtility('animate-foo')).toEqual({ type: 'unknown', raw: 'animate-foo' });
    });
  });
}); 