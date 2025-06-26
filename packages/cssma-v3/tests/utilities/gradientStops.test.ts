import { describe, it, expect } from 'vitest';
import { parseGradientStop } from '../../src/parser/utilities/gradientStops';

describe('parseGradientStop', () => {
  it('parses from-red-500', () => {
    expect(parseGradientStop('from-red-500')).toEqual({
      type: 'gradient-stop', stop: 'from', preset: 'red-500', raw: 'from-red-500', arbitrary: false,
    });
  });
  it('parses from-10%', () => {
    expect(parseGradientStop('from-10%')).toEqual({
      type: 'gradient-stop', stop: 'from', preset: '10%', raw: 'from-10%', arbitrary: false,
    });
  });
  it('parses from-(--foo)', () => {
    expect(parseGradientStop('from-(--foo)')).toEqual({
      type: 'gradient-stop', stop: 'from', preset: '--foo', raw: 'from-(--foo)', arbitrary: true,
    });
  });
  it('parses from-[var(--bar)]', () => {
    expect(parseGradientStop('from-[var(--bar)]')).toEqual({
      type: 'gradient-stop', stop: 'from', preset: 'var(--bar)', raw: 'from-[var(--bar)]', arbitrary: true,
    });
  });
  it('parses via-blue-200', () => {
    expect(parseGradientStop('via-blue-200')).toEqual({
      type: 'gradient-stop', stop: 'via', preset: 'blue-200', raw: 'via-blue-200', arbitrary: false,
    });
  });
  it('parses via-30%', () => {
    expect(parseGradientStop('via-30%')).toEqual({
      type: 'gradient-stop', stop: 'via', preset: '30%', raw: 'via-30%', arbitrary: false,
    });
  });
  it('parses via-(--baz)', () => {
    expect(parseGradientStop('via-(--baz)')).toEqual({
      type: 'gradient-stop', stop: 'via', preset: '--baz', raw: 'via-(--baz)', arbitrary: true,
    });
  });
  it('parses via-[rgba(0,0,0,0.5)]', () => {
    expect(parseGradientStop('via-[rgba(0,0,0,0.5)]')).toEqual({
      type: 'gradient-stop', stop: 'via', preset: 'rgba(0,0,0,0.5)', raw: 'via-[rgba(0,0,0,0.5)]', arbitrary: true,
    });
  });
  it('parses to-green-700', () => {
    expect(parseGradientStop('to-green-700')).toEqual({
      type: 'gradient-stop', stop: 'to', preset: 'green-700', raw: 'to-green-700', arbitrary: false,
    });
  });
  it('parses to-90%', () => {
    expect(parseGradientStop('to-90%')).toEqual({
      type: 'gradient-stop', stop: 'to', preset: '90%', raw: 'to-90%', arbitrary: false,
    });
  });
  it('parses to-(--qux)', () => {
    expect(parseGradientStop('to-(--qux)')).toEqual({
      type: 'gradient-stop', stop: 'to', preset: '--qux', raw: 'to-(--qux)', arbitrary: true,
    });
  });
  it('parses to-[theme(colors.foo)]', () => {
    expect(parseGradientStop('to-[theme(colors.foo)]')).toEqual({
      type: 'gradient-stop', stop: 'to', preset: 'theme(colors.foo)', raw: 'to-[theme(colors.foo)]', arbitrary: true,
    });
  });
  // 실패 케이스
  it('returns null for empty value (from-)', () => {
    expect(parseGradientStop('from-')).toBeNull();
  });
  it('returns null for empty value (via-)', () => {
    expect(parseGradientStop('via-')).toBeNull();
  });
  it('returns null for empty value (to-)', () => {
    expect(parseGradientStop('to-')).toBeNull();
  });
  it('returns null for malformed arbitrary (from-[])', () => {
    expect(parseGradientStop('from-[]')).toBeNull();
  });
  it('returns null for malformed arbitrary (via-[])', () => {
    expect(parseGradientStop('via-[]')).toBeNull();
  });
  it('returns null for malformed arbitrary (to-[])', () => {
    expect(parseGradientStop('to-[]')).toBeNull();
  });
  it('returns null for malformed custom property (from-(foo))', () => {
    expect(parseGradientStop('from-(foo)')).toBeNull();
  });
  it('returns null for malformed custom property (via-(foo))', () => {
    expect(parseGradientStop('via-(foo)')).toBeNull();
  });
  it('returns null for malformed custom property (to-(foo))', () => {
    expect(parseGradientStop('to-(foo)')).toBeNull();
  });
}); 