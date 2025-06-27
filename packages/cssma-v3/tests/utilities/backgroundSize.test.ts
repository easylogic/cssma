import { describe, it, expect } from 'vitest';
import { parseBackgroundSize } from '../../src/parser/utilities/backgroundSize';

describe('parseBackgroundSize', () => {
  it('parses bg-auto', () => {
    expect(parseBackgroundSize('bg-auto')).toEqual({
      type: 'background-size', preset: 'auto', raw: 'bg-auto', arbitrary: false,
    });
  });
  it('parses bg-cover', () => {
    expect(parseBackgroundSize('bg-cover')).toEqual({
      type: 'background-size', preset: 'cover', raw: 'bg-cover', arbitrary: false,
    });
  });
  it('parses bg-contain', () => {
    expect(parseBackgroundSize('bg-contain')).toEqual({
      type: 'background-size', preset: 'contain', raw: 'bg-contain', arbitrary: false,
    });
  });
  it('parses bg-size-(--foo)', () => {
    expect(parseBackgroundSize('bg-size-(--foo)')).toEqual({
      type: 'background-size', value: 'var(--foo)', raw: 'bg-size-(--foo)', arbitrary: true
    });
  });
  it('parses bg-size-[auto_100px]', () => {
    expect(parseBackgroundSize('bg-size-[auto_100px]')).toEqual({
      type: 'background-size', preset: 'auto_100px', raw: 'bg-size-[auto_100px]', arbitrary: true,
    });
  });
  // 실패 케이스
  it('returns null for invalid value (bg-size-foo)', () => {
    expect(parseBackgroundSize('bg-size-foo')).toBeNull();
  });
  it('returns null for empty value (bg-size-)', () => {
    expect(parseBackgroundSize('bg-size-')).toBeNull();
  });
  it('returns null for malformed arbitrary (bg-size-[])', () => {
    expect(parseBackgroundSize('bg-size-[]')).toBeNull();
  });
  it('returns null for malformed custom property (bg-size-(foo))', () => {
    expect(parseBackgroundSize('bg-size-(foo)')).toBeNull();
  });
}); 