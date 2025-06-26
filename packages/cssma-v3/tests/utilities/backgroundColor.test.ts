import { describe, it, expect } from 'vitest';
import { parseBackgroundColor } from '../../src/parser/utilities/backgroundColor';

describe('parseBackgroundColor', () => {
  it('parses bg-red-500', () => {
    expect(parseBackgroundColor('bg-red-500')).toEqual({
      type: 'background-color',
      preset: 'red-500',
      raw: 'bg-red-500',
      arbitrary: false,
    });
  });

  it('parses bg-blue-200/50', () => {
    expect(parseBackgroundColor('bg-blue-200/50')).toEqual({
      type: 'background-color',
      preset: 'blue-200',
      opacity: 50,
      raw: 'bg-blue-200/50',
      arbitrary: false,
    });
  });

  it('parses bg-[rgba(0,0,0,0.5)]', () => {
    expect(parseBackgroundColor('bg-[rgba(0,0,0,0.5)]')).toEqual({
      type: 'background-color',
      preset: 'rgba(0,0,0,0.5)',
      raw: 'bg-[rgba(0,0,0,0.5)]',
      arbitrary: true,
    });
  });

  it('parses bg-(--my-bg)', () => {
    expect(parseBackgroundColor('bg-(--my-bg)')).toEqual({
      type: 'background-color',
      preset: '--my-bg',
      raw: 'bg-(--my-bg)',
      arbitrary: true,
    });
  });

  it('returns null for invalid value (bg-foo)', () => {
    expect(parseBackgroundColor('bg-foo')).toEqual({
      type: 'background-color',
      preset: 'foo',
      raw: 'bg-foo',
      arbitrary: false,
    });
  });

  it('returns null for empty value (bg-)', () => {
    expect(parseBackgroundColor('bg-')).toBeNull();
  });

  it('returns null for similar but invalid (bg-red-500x)', () => {
    expect(parseBackgroundColor('bg-red-500x')).toEqual({
      type: 'background-color',
      preset: 'red-500x',
      raw: 'bg-red-500x',
      arbitrary: false,
    });
  });

  it('returns null for malformed custom property', () => {
    expect(parseBackgroundColor('bg-(my-bg)')).toBeNull();
  });

  it('returns null for malformed arbitrary', () => {
    expect(parseBackgroundColor('bg-[]')).toBeNull();
  });
}); 