import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (background)', () => {
  describe('bg-color', () => {
    it('should parse Tailwind v4 color classes', () => {
      expect(parseUtility('bg-red-500')).toEqual(baseUtility({ prefix: 'bg', value: 'red-500', raw: 'bg-red-500' }));
      expect(parseUtility('bg-blue-100')).toEqual(baseUtility({ prefix: 'bg', value: 'blue-100', raw: 'bg-blue-100' }));
      expect(parseUtility('bg-[#123456]')).toEqual(baseUtility({ prefix: 'bg', value: '#123456', arbitrary: true, arbitraryType: 'hex', arbitraryValue: '#123456', raw: 'bg-[#123456]' }));
      expect(parseUtility('bg-[oklch(0.5_0.2_30)]')).toEqual(baseUtility({ prefix: 'bg', value: 'oklch(0.5 0.2 30)', arbitrary: true, arbitraryType: 'oklch', arbitraryValue: '0.5 0.2 30', raw: 'bg-[oklch(0.5_0.2_30)]' }));
      expect(parseUtility('bg-red-500!')).toEqual(baseUtility({ prefix: 'bg', value: 'red-500', important: true, raw: 'bg-red-500!' }));
      expect(parseUtility('-bg-blue-100')).toEqual(baseUtility({ prefix: 'bg', value: 'blue-100', raw: '-bg-blue-100', negative: true }));
      expect(parseUtility('bg-')).toEqual({ type: 'unknown', raw: 'bg-' });
    });
  });

  describe('bg-gradient', () => {
    it('should parse Tailwind v4 gradient classes', () => {
      expect(parseUtility('bg-gradient-to-r')).toEqual(baseUtility({ prefix: 'bg-gradient-to', value: 'r', raw: 'bg-gradient-to-r' }));
      expect(parseUtility('bg-gradient-to-tr')).toEqual(baseUtility({ prefix: 'bg-gradient-to', value: 'tr', raw: 'bg-gradient-to-tr' }));
      expect(parseUtility('bg-gradient-to-b')).toEqual(baseUtility({ prefix: 'bg-gradient-to', value: 'b', raw: 'bg-gradient-to-b' }));
      expect(parseUtility('bg-gradient-to-tl')).toEqual(baseUtility({ prefix: 'bg-gradient-to', value: 'tl', raw: 'bg-gradient-to-tl' }));
      expect(parseUtility('bg-gradient-to-r!')).toEqual(baseUtility({ prefix: 'bg-gradient-to', value: 'r', important: true, raw: 'bg-gradient-to-r!' }));
      expect(parseUtility('bg-gradient-')).toEqual({ type: 'unknown', raw: 'bg-gradient-' });
    });
  });

  describe('bg-none', () => {
    it('should parse bg-none', () => {
      expect(parseUtility('bg-none')).toEqual(baseUtility({ prefix: 'bg-none', value: '' }));
    });
  });

  describe('bg-blend', () => {
    it('should parse Tailwind v4 blend mode classes', () => {
      expect(parseUtility('bg-blend-normal')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'normal', raw: 'bg-blend-normal' }));
      expect(parseUtility('bg-blend-multiply')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'multiply', raw: 'bg-blend-multiply' }));
      expect(parseUtility('bg-blend-color')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'color', raw: 'bg-blend-color' }));
      expect(parseUtility('bg-blend-luminosity')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'luminosity', raw: 'bg-blend-luminosity' }));
      expect(parseUtility('bg-blend-')).toEqual({ type: 'unknown', raw: 'bg-blend-' });
    });
  });

  describe('bg-clip', () => {
    it('should parse Tailwind v4 bg-clip classes', () => {
      expect(parseUtility('bg-clip-padding')).toEqual(baseUtility({ prefix: 'bg-clip', value: 'padding', raw: 'bg-clip-padding' }));
      expect(parseUtility('bg-clip-border')).toEqual(baseUtility({ prefix: 'bg-clip', value: 'border', raw: 'bg-clip-border' }));
      expect(parseUtility('bg-clip-content')).toEqual(baseUtility({ prefix: 'bg-clip', value: 'content', raw: 'bg-clip-content' }));
      expect(parseUtility('bg-clip-text')).toEqual(baseUtility({ prefix: 'bg-clip', value: 'text', raw: 'bg-clip-text' }));
      expect(parseUtility('bg-clip-')).toEqual({ type: 'unknown', raw: 'bg-clip-' });
    });
  });

  describe('bg-origin', () => {
    it('should parse Tailwind v4 bg-origin classes', () => {
      expect(parseUtility('bg-origin-padding')).toEqual(baseUtility({ prefix: 'bg-origin', value: 'padding', raw: 'bg-origin-padding' }));
      expect(parseUtility('bg-origin-border')).toEqual(baseUtility({ prefix: 'bg-origin', value: 'border', raw: 'bg-origin-border' }));
      expect(parseUtility('bg-origin-content')).toEqual(baseUtility({ prefix: 'bg-origin', value: 'content', raw: 'bg-origin-content' }));
      expect(parseUtility('bg-origin-')).toEqual({ type: 'unknown', raw: 'bg-origin-' });
    });
  });

  describe('bg-repeat', () => {
    it('should parse Tailwind v4 bg-repeat classes', () => {
      expect(parseUtility('bg-repeat')).toEqual(baseUtility({ prefix: 'bg-repeat', value: '', raw: 'bg-repeat' }));
      expect(parseUtility('bg-no-repeat')).toEqual(baseUtility({ prefix: 'bg-no-repeat', value: '', raw: 'bg-no-repeat' }));
      expect(parseUtility('bg-repeat-x')).toEqual(baseUtility({ prefix: 'bg-repeat', value: 'x', raw: 'bg-repeat-x' }));
      expect(parseUtility('bg-repeat-y')).toEqual(baseUtility({ prefix: 'bg-repeat', value: 'y', raw: 'bg-repeat-y' }));
      expect(parseUtility('bg-repeat-')).toEqual({ type: 'unknown', raw: 'bg-repeat-' });
    });
  });

  describe('bg-size', () => {
    it('should parse Tailwind v4 bg-size classes', () => {
      expect(parseUtility('bg-auto')).toEqual(baseUtility({ prefix: 'bg', value: 'auto', raw: 'bg-auto' }));
      expect(parseUtility('bg-cover')).toEqual(baseUtility({ prefix: 'bg', value: 'cover', raw: 'bg-cover' }));
      expect(parseUtility('bg-contain')).toEqual(baseUtility({ prefix: 'bg', value: 'contain', raw: 'bg-contain' }));
      expect(parseUtility('bg-size-200%')).toEqual(baseUtility({ prefix: 'bg-size', value: '200%', raw: 'bg-size-200%' })); // v4 arbitrary value
      expect(parseUtility('bg-size-[50px_100px]')).toEqual(baseUtility({ prefix: 'bg-size', value: '50px 100px', arbitrary: true, arbitraryValue: '50px 100px', raw: 'bg-size-[50px_100px]' }));
      expect(parseUtility('bg-size-')).toEqual({ type: 'unknown', raw: 'bg-size-' });
    });
  });

  describe('bg-position', () => {
    it('should parse Tailwind v4 bg-position classes', () => {
      expect(parseUtility('bg-bottom')).toEqual(baseUtility({ prefix: 'bg', value: 'bottom', raw: 'bg-bottom' }));
      expect(parseUtility('bg-center')).toEqual(baseUtility({ prefix: 'bg', value: 'center', raw: 'bg-center' }));
      expect(parseUtility('bg-left')).toEqual(baseUtility({ prefix: 'bg', value: 'left', raw: 'bg-left' }));
      expect(parseUtility('bg-left-top')).toEqual(baseUtility({ prefix: 'bg', value: 'left-top', raw: 'bg-left-top' }));
      expect(parseUtility('bg-right')).toEqual(baseUtility({ prefix: 'bg', value: 'right', raw: 'bg-right' }));
      expect(parseUtility('bg-top')).toEqual(baseUtility({ prefix: 'bg', value: 'top', raw: 'bg-top' }));
      expect(parseUtility('bg-position-[10px_20px]')).toEqual(baseUtility({ prefix: 'bg-position', value: '10px 20px', arbitrary: true, arbitraryValue: '10px 20px', raw: 'bg-position-[10px_20px]' }));
      expect(parseUtility('bg-position-')).toEqual({ type: 'unknown', raw: 'bg-position-' });
    });
  });

  describe('bg-attachment', () => {
    it('should parse Tailwind v4 bg-attachment classes', () => {
      expect(parseUtility('bg-fixed')).toEqual(baseUtility({ prefix: 'bg-fixed', value: '', raw: 'bg-fixed' }));
      expect(parseUtility('bg-local')).toEqual(baseUtility({ prefix: 'bg-local', value: '', raw: 'bg-local' }));
      expect(parseUtility('bg-scroll')).toEqual(baseUtility({ prefix: 'bg-scroll', value: '', raw: 'bg-scroll' }));
    });
  });
}); 