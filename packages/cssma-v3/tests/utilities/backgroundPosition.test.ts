import { describe, it, expect } from 'vitest';
import { parseBackgroundPosition } from '../../src/parser/utilities/backgroundPosition';

describe('parseBackgroundPosition', () => {
  it('parses bg-top-left', () => {
    expect(parseBackgroundPosition('bg-top-left')).toEqual({
      type: 'background-position', preset: 'top-left', raw: 'bg-top-left', arbitrary: false,
    });
  });
  it('parses bg-top', () => {
    expect(parseBackgroundPosition('bg-top')).toEqual({
      type: 'background-position', preset: 'top', raw: 'bg-top', arbitrary: false,
    });
  });
  it('parses bg-top-right', () => {
    expect(parseBackgroundPosition('bg-top-right')).toEqual({
      type: 'background-position', preset: 'top-right', raw: 'bg-top-right', arbitrary: false,
    });
  });
  it('parses bg-left', () => {
    expect(parseBackgroundPosition('bg-left')).toEqual({
      type: 'background-position', preset: 'left', raw: 'bg-left', arbitrary: false,
    });
  });
  it('parses bg-center', () => {
    expect(parseBackgroundPosition('bg-center')).toEqual({
      type: 'background-position', preset: 'center', raw: 'bg-center', arbitrary: false,
    });
  });
  it('parses bg-right', () => {
    expect(parseBackgroundPosition('bg-right')).toEqual({
      type: 'background-position', preset: 'right', raw: 'bg-right', arbitrary: false,
    });
  });
  it('parses bg-bottom-left', () => {
    expect(parseBackgroundPosition('bg-bottom-left')).toEqual({
      type: 'background-position', preset: 'bottom-left', raw: 'bg-bottom-left', arbitrary: false,
    });
  });
  it('parses bg-bottom', () => {
    expect(parseBackgroundPosition('bg-bottom')).toEqual({
      type: 'background-position', preset: 'bottom', raw: 'bg-bottom', arbitrary: false,
    });
  });
  it('parses bg-bottom-right', () => {
    expect(parseBackgroundPosition('bg-bottom-right')).toEqual({
      type: 'background-position', preset: 'bottom-right', raw: 'bg-bottom-right', arbitrary: false,
    });
  });
  it('parses bg-position-(--foo)', () => {
    expect(parseBackgroundPosition('bg-position-(--foo)')).toEqual({
      type: 'background-position', preset: 'var(--foo)', raw: 'bg-position-(--foo)', arbitrary: true,
    });
  });
  it('parses bg-position-[center_top_1rem]', () => {
    expect(parseBackgroundPosition('bg-position-[center_top_1rem]')).toEqual({
      type: 'background-position', preset: 'center_top_1rem', raw: 'bg-position-[center_top_1rem]', arbitrary: true,
    });
  });
  // 실패 케이스
  it('returns null for invalid value (bg-position-foo)', () => {
    expect(parseBackgroundPosition('bg-position-foo')).toBeNull();
  });
  it('returns null for empty value (bg-position-)', () => {
    expect(parseBackgroundPosition('bg-position-')).toBeNull();
  });
  it('returns null for malformed arbitrary (bg-position-[])', () => {
    expect(parseBackgroundPosition('bg-position-[]')).toBeNull();
  });
  it('returns null for malformed custom property (bg-position-(foo))', () => {
    expect(parseBackgroundPosition('bg-position-(foo)')).toBeNull();
  });
}); 