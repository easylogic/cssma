import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (color scheme)', () => {
  describe('isolation', () => {
    it('should parse Tailwind v4 isolation classes', () => {
      expect(parseUtility('isolate')).toEqual(baseUtility({ prefix: 'isolate', raw: 'isolate' }));
      expect(parseUtility('isolation-auto')).toEqual(baseUtility({ prefix: 'isolation', value: 'auto', raw: 'isolation-auto' }));
      expect(parseUtility('isolation-')).toEqual({ type: 'unknown', raw: 'isolation-' });
      expect(parseUtility('isolation-foo')).toEqual({ type: 'unknown', raw: 'isolation-foo' });
    });
  });

  describe('mix-blend', () => {
    it('should parse Tailwind v4 mix-blend classes', () => {
      expect(parseUtility('mix-blend-normal')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'normal', raw: 'mix-blend-normal' }));
      expect(parseUtility('mix-blend-multiply')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'multiply', raw: 'mix-blend-multiply' }));
      expect(parseUtility('mix-blend-screen')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'screen', raw: 'mix-blend-screen' }));
      expect(parseUtility('mix-blend-overlay')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'overlay', raw: 'mix-blend-overlay' }));
      expect(parseUtility('mix-blend-darken')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'darken', raw: 'mix-blend-darken' }));
      expect(parseUtility('mix-blend-lighten')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'lighten', raw: 'mix-blend-lighten' }));
      expect(parseUtility('mix-blend-color-dodge')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'color-dodge', raw: 'mix-blend-color-dodge' }));
      expect(parseUtility('mix-blend-color-burn')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'color-burn', raw: 'mix-blend-color-burn' }));
      expect(parseUtility('mix-blend-hard-light')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'hard-light', raw: 'mix-blend-hard-light' }));
      expect(parseUtility('mix-blend-soft-light')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'soft-light', raw: 'mix-blend-soft-light' }));
      expect(parseUtility('mix-blend-difference')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'difference', raw: 'mix-blend-difference' }));
      expect(parseUtility('mix-blend-exclusion')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'exclusion', raw: 'mix-blend-exclusion' }));
      expect(parseUtility('mix-blend-hue')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'hue', raw: 'mix-blend-hue' }));
      expect(parseUtility('mix-blend-saturation')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'saturation', raw: 'mix-blend-saturation' }));
      expect(parseUtility('mix-blend-color')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'color', raw: 'mix-blend-color' }));
      expect(parseUtility('mix-blend-luminosity')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'luminosity', raw: 'mix-blend-luminosity' }));
      expect(parseUtility('mix-blend-')).toEqual({ type: 'unknown', raw: 'mix-blend-' });
      expect(parseUtility('mix-blend-foo')).toEqual({ type: 'unknown', raw: 'mix-blend-foo' });
    });
  });

  describe('bg-blend', () => {
    it('should parse Tailwind v4 bg-blend classes', () => {
      expect(parseUtility('bg-blend-normal')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'normal', raw: 'bg-blend-normal' }));
      expect(parseUtility('bg-blend-multiply')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'multiply', raw: 'bg-blend-multiply' }));
      expect(parseUtility('bg-blend-screen')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'screen', raw: 'bg-blend-screen' }));
      expect(parseUtility('bg-blend-overlay')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'overlay', raw: 'bg-blend-overlay' }));
      expect(parseUtility('bg-blend-darken')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'darken', raw: 'bg-blend-darken' }));
      expect(parseUtility('bg-blend-lighten')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'lighten', raw: 'bg-blend-lighten' }));
      expect(parseUtility('bg-blend-color-dodge')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'color-dodge', raw: 'bg-blend-color-dodge' }));
      expect(parseUtility('bg-blend-color-burn')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'color-burn', raw: 'bg-blend-color-burn' }));
      expect(parseUtility('bg-blend-hard-light')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'hard-light', raw: 'bg-blend-hard-light' }));
      expect(parseUtility('bg-blend-soft-light')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'soft-light', raw: 'bg-blend-soft-light' }));
      expect(parseUtility('bg-blend-difference')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'difference', raw: 'bg-blend-difference' }));
      expect(parseUtility('bg-blend-exclusion')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'exclusion', raw: 'bg-blend-exclusion' }));
      expect(parseUtility('bg-blend-hue')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'hue', raw: 'bg-blend-hue' }));
      expect(parseUtility('bg-blend-saturation')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'saturation', raw: 'bg-blend-saturation' }));
      expect(parseUtility('bg-blend-color')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'color', raw: 'bg-blend-color' }));
      expect(parseUtility('bg-blend-luminosity')).toEqual(baseUtility({ prefix: 'bg-blend', value: 'luminosity', raw: 'bg-blend-luminosity' }));
      expect(parseUtility('bg-blend-')).toEqual({ type: 'unknown', raw: 'bg-blend-' });
      expect(parseUtility('bg-blend-foo')).toEqual({ type: 'unknown', raw: 'bg-blend-foo' });
    });
  });
}); 