import { describe, it, expect } from 'vitest';
import { convertEffects } from '../../src/converters/effects';

describe('Effects Converter', () => {
  describe('Drop Shadow', () => {
    it('should convert shadow classes', () => {
      expect(convertEffects('shadow-sm')).toEqual([{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.05 },
        offset: { x: 0, y: 1 },
        radius: 2,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL'
      }]);

      expect(convertEffects('shadow')).toEqual([{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 0, y: 2 },
        radius: 4,
        spread: -1,
        visible: true,
        blendMode: 'NORMAL'
      }]);

      expect(convertEffects('shadow-md')).toEqual([{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 0, y: 4 },
        radius: 6,
        spread: -2,
        visible: true,
        blendMode: 'NORMAL'
      }]);

      expect(convertEffects('shadow-lg')).toEqual([{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 0, y: 8 },
        radius: 10,
        spread: -3,
        visible: true,
        blendMode: 'NORMAL'
      }]);
    });

    it('should convert colored shadows', () => {
      expect(convertEffects('shadow-blue-500/50')).toEqual([{
        type: 'DROP_SHADOW',
        color: { r: 0.24, g: 0.47, b: 0.95, a: 0.5 },
        offset: { x: 0, y: 2 },
        radius: 4,
        spread: -1,
        visible: true,
        blendMode: 'NORMAL'
      }]);
    });
  });

  describe('Inner Shadow', () => {
    it('should convert inner shadow classes', () => {
      expect(convertEffects('shadow-inner')).toEqual([{
        type: 'INNER_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.06 },
        offset: { x: 0, y: 2 },
        radius: 4,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL'
      }]);
    });
  });

  describe('Blur', () => {
    it('should convert blur classes', () => {
      expect(convertEffects('blur-sm')).toEqual([{
        type: 'LAYER_BLUR',
        radius: 4,
        visible: true,
        blendMode: 'NORMAL'
      }]);

      expect(convertEffects('blur')).toEqual([{
        type: 'LAYER_BLUR',
        radius: 8,
        visible: true,
        blendMode: 'NORMAL'
      }]);

      expect(convertEffects('blur-md')).toEqual([{
        type: 'LAYER_BLUR',
        radius: 12,
        visible: true,
        blendMode: 'NORMAL'
      }]);

      expect(convertEffects('blur-lg')).toEqual([{
        type: 'LAYER_BLUR',
        radius: 16,
        visible: true,
        blendMode: 'NORMAL'
      }]);
    });

    it('should convert backdrop blur classes', () => {
      expect(convertEffects('backdrop-blur-sm')).toEqual([{
        type: 'BACKGROUND_BLUR',
        radius: 4,
        visible: true,
        blendMode: 'NORMAL'
      }]);
    });
  });

  describe('Combined Effects', () => {
    it('should combine multiple effects', () => {
      expect(convertEffects('shadow-lg blur-sm')).toEqual([
        {
          type: 'DROP_SHADOW',
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 8 },
          radius: 10,
          spread: -3,
          visible: true,
          blendMode: 'NORMAL'
        },
        {
          type: 'LAYER_BLUR',
          radius: 4,
          visible: true,
          blendMode: 'NORMAL'
        }
      ]);
    });
  });
});
