import { describe, it, expect } from 'vitest';
import { parseBackdropHueRotate } from '../../src/parser/utilities/backdropHueRotate';

describe('parseBackdropHueRotate', () => {
  it('parses positive preset classes', () => {
    expect(parseBackdropHueRotate('backdrop-hue-rotate-90')).toEqual({
      type: 'backdrop-hue-rotate',
      value: '90',
      negative: false,
      raw: 'backdrop-hue-rotate-90',
      arbitrary: false,
    });
    expect(parseBackdropHueRotate('backdrop-hue-rotate-180')).toEqual({
      type: 'backdrop-hue-rotate',
      value: '180',
      negative: false,
      raw: 'backdrop-hue-rotate-180',
      arbitrary: false,
    });
  });

  it('parses negative preset classes', () => {
    expect(parseBackdropHueRotate('-backdrop-hue-rotate-90')).toEqual({
      type: 'backdrop-hue-rotate',
      value: '90',
      negative: true,
      raw: '-backdrop-hue-rotate-90',
      arbitrary: false,
    });
    expect(parseBackdropHueRotate('-backdrop-hue-rotate-15')).toEqual({
      type: 'backdrop-hue-rotate',
      value: '15',
      negative: true,
      raw: '-backdrop-hue-rotate-15',
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseBackdropHueRotate('backdrop-hue-rotate-[3.142rad]')).toEqual({
      type: 'backdrop-hue-rotate',
      value: '3.142rad',
      raw: 'backdrop-hue-rotate-[3.142rad]',
      arbitrary: true,
    });
    expect(parseBackdropHueRotate('backdrop-hue-rotate-[var(--foo)]')).toEqual({
      type: 'backdrop-hue-rotate',
      value: 'var(--foo)',
      raw: 'backdrop-hue-rotate-[var(--foo)]',
      arbitrary: true,
    });
  });

  it('parses custom property', () => {
    expect(parseBackdropHueRotate('backdrop-hue-rotate-(--my-hue)')).toEqual({
      type: 'backdrop-hue-rotate',
      value: 'var(--my-hue)',
      raw: 'backdrop-hue-rotate-(--my-hue)',
      arbitrary: true,
    });
  });

  it('returns null for non-matching', () => {
    expect(parseBackdropHueRotate('backdrop-hue-rotate-unknown')).toBeNull();
    expect(parseBackdropHueRotate('hue-rotate-90')).toBeNull();
  });
}); 