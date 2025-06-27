import { describe, it, expect } from 'vitest';
import { parseTransitionProperty } from '../../src/parser/utilities/transitionProperty';

describe('parseTransitionProperty', () => {
  it('parses preset classes', () => {
    expect(parseTransitionProperty('transition')).toMatchObject({
      type: 'transition-property',
      value: expect.stringContaining('color'),
      preset: 'transition',
      raw: 'transition',
    });
    expect(parseTransitionProperty('transition-all')).toMatchObject({
      type: 'transition-property',
      value: 'all',
      preset: 'transition-all',
      raw: 'transition-all',
    });
    expect(parseTransitionProperty('transition-colors')).toMatchObject({
      type: 'transition-property',
      value: expect.stringContaining('color'),
      preset: 'transition-colors',
      raw: 'transition-colors',
    });
    expect(parseTransitionProperty('transition-opacity')).toMatchObject({
      type: 'transition-property',
      value: 'opacity',
      preset: 'transition-opacity',
      raw: 'transition-opacity',
    });
    expect(parseTransitionProperty('transition-shadow')).toMatchObject({
      type: 'transition-property',
      value: 'box-shadow',
      preset: 'transition-shadow',
      raw: 'transition-shadow',
    });
    expect(parseTransitionProperty('transition-transform')).toMatchObject({
      type: 'transition-property',
      value: expect.stringContaining('transform'),
      preset: 'transition-transform',
      raw: 'transition-transform',
    });
    expect(parseTransitionProperty('transition-none')).toMatchObject({
      type: 'transition-property',
      value: 'none',
      preset: 'transition-none',
      raw: 'transition-none',
    });
  });

  it('parses arbitrary value', () => {
    expect(parseTransitionProperty('transition-[height]')).toEqual({
      type: 'transition-property',
      value: 'height',
      raw: 'transition-[height]',
      arbitrary: true,
    });
  });

  it('parses custom property', () => {
    expect(parseTransitionProperty('transition-(--my-prop)')).toEqual({
      type: 'transition-property',
      value: 'var(--my-prop)',
      raw: 'transition-(--my-prop)',
      arbitrary: false,
      customProperty: true,
    });
  });

  it('returns null for invalid input', () => {
    expect(parseTransitionProperty('transition-foo')).toBeNull();
    expect(parseTransitionProperty('transition-')).toBeNull();
    expect(parseTransitionProperty('transition-[]')).toBeNull();
    expect(parseTransitionProperty('transition-()')).toBeNull();
  });
}); 