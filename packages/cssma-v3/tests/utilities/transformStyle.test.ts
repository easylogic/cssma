import { describe, it, expect } from 'vitest';
import { parseTransformStyle } from '../../src/parser/utilities/transformStyle';

describe('parseTransformStyle', () => {
  it('parses transform-3d', () => {
    expect(parseTransformStyle('transform-3d')).toEqual({ type: 'transform-style', value: 'preserve-3d', raw: 'transform-3d', preset: '3d' });
  });
  it('parses transform-flat', () => {
    expect(parseTransformStyle('transform-flat')).toEqual({ type: 'transform-style', value: 'flat', raw: 'transform-flat', preset: 'flat' });
  });
  it('returns null for invalid input', () => {
    expect(parseTransformStyle('transform-')).toBeNull();
    expect(parseTransformStyle('transform-style')).toBeNull();
    expect(parseTransformStyle('transform-foo')).toBeNull();
  });
}); 