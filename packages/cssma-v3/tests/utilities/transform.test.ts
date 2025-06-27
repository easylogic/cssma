import { describe, it, expect } from 'vitest';
import { parseTransform } from '../../src/parser/utilities/transform';

describe('parseTransform', () => {
  it('parses transform-none', () => {
    expect(parseTransform('transform-none')).toEqual({ type: 'transform', value: 'none', raw: 'transform-none', preset: 'none', arbitrary: false });
  });
  it('parses transform-gpu', () => {
    expect(parseTransform('transform-gpu')).toEqual({ type: 'transform', value: 'translateZ(0) var(--tw-rotate-x) var(--tw-rotate-y) var(--tw-rotate-z) var(--tw-skew-x) var(--tw-skew-y)', raw: 'transform-gpu', preset: 'gpu', arbitrary: false });
  });
  it('parses transform-cpu', () => {
    expect(parseTransform('transform-cpu')).toEqual({ type: 'transform', value: 'var(--tw-rotate-x) var(--tw-rotate-y) var(--tw-rotate-z) var(--tw-skew-x) var(--tw-skew-y)', raw: 'transform-cpu', preset: 'cpu', arbitrary: false });
  });
  it('parses transform custom property', () => {
    expect(parseTransform('transform-(--my-transform)')).toEqual({ type: 'transform', value: 'var(--my-transform)', raw: 'transform-(--my-transform)', customProperty: true, arbitrary: false });
  });
  it('parses transform arbitrary value', () => {
    expect(parseTransform('transform-[matrix(1,2,3,4,5,6)]')).toEqual({ type: 'transform', value: 'matrix(1,2,3,4,5,6)', raw: 'transform-[matrix(1,2,3,4,5,6)]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseTransform('transform-')).toBeNull();
    expect(parseTransform('transform-foo')).toBeNull();
    expect(parseTransform('transform-[]')).toBeNull();
    expect(parseTransform('transform-()')).toBeNull();
  });
}); 