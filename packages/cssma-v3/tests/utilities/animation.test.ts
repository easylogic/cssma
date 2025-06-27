import { describe, it, expect } from 'vitest';
import { parseAnimation } from '../../src/parser/utilities/animation';

describe('parseAnimation', () => {
  it('parses preset classes', () => {
    expect(parseAnimation('animate-spin')).toEqual({
      type: 'animation',
      value: 'var(--animate-spin)',
      raw: 'animate-spin',
      preset: 'animate-spin',
    });
    expect(parseAnimation('animate-ping')).toEqual({
      type: 'animation',
      value: 'var(--animate-ping)',
      raw: 'animate-ping',
      preset: 'animate-ping',
    });
    expect(parseAnimation('animate-pulse')).toEqual({
      type: 'animation',
      value: 'var(--animate-pulse)',
      raw: 'animate-pulse',
      preset: 'animate-pulse',
    });
    expect(parseAnimation('animate-bounce')).toEqual({
      type: 'animation',
      value: 'var(--animate-bounce)',
      raw: 'animate-bounce',
      preset: 'animate-bounce',
    });
    expect(parseAnimation('animate-none')).toEqual({
      type: 'animation',
      value: 'none',
      raw: 'animate-none',
      preset: 'animate-none',
    });
  });

  it('parses custom property', () => {
    expect(parseAnimation('animate-(--my-animation)')).toEqual({
      type: 'animation',
      value: 'var(--my-animation)',
      raw: 'animate-(--my-animation)',
      customProperty: true,
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseAnimation('animate-[wiggle_1s_ease-in-out_infinite]')).toEqual({
      type: 'animation',
      value: 'wiggle_1s_ease-in-out_infinite',
      raw: 'animate-[wiggle_1s_ease-in-out_infinite]',
      arbitrary: true,
    });
  });

  it('returns null for invalid input', () => {
    expect(parseAnimation('animate-foo')).toBeNull();
    expect(parseAnimation('animate-')).toBeNull();
    expect(parseAnimation('animate-[]')).toBeNull();
    expect(parseAnimation('animate-()')).toBeNull();
  });
}); 