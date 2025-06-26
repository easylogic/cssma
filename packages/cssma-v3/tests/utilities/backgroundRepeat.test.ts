import { describe, it, expect } from 'vitest';
import { parseBackgroundRepeat } from '../../src/parser/utilities/backgroundRepeat';

describe('parseBackgroundRepeat', () => {
  it('parses bg-repeat', () => {
    expect(parseBackgroundRepeat('bg-repeat')).toEqual({
      type: 'background-repeat', preset: 'repeat', raw: 'bg-repeat', arbitrary: false,
    });
  });
  it('parses bg-repeat-x', () => {
    expect(parseBackgroundRepeat('bg-repeat-x')).toEqual({
      type: 'background-repeat', preset: 'repeat-x', raw: 'bg-repeat-x', arbitrary: false,
    });
  });
  it('parses bg-repeat-y', () => {
    expect(parseBackgroundRepeat('bg-repeat-y')).toEqual({
      type: 'background-repeat', preset: 'repeat-y', raw: 'bg-repeat-y', arbitrary: false,
    });
  });
  it('parses bg-repeat-space', () => {
    expect(parseBackgroundRepeat('bg-repeat-space')).toEqual({
      type: 'background-repeat', preset: 'space', raw: 'bg-repeat-space', arbitrary: false,
    });
  });
  it('parses bg-repeat-round', () => {
    expect(parseBackgroundRepeat('bg-repeat-round')).toEqual({
      type: 'background-repeat', preset: 'round', raw: 'bg-repeat-round', arbitrary: false,
    });
  });
  it('parses bg-no-repeat', () => {
    expect(parseBackgroundRepeat('bg-no-repeat')).toEqual({
      type: 'background-repeat', preset: 'no-repeat', raw: 'bg-no-repeat', arbitrary: false,
    });
  });
  // 실패 케이스
  it('returns null for invalid value (bg-repeat-foo)', () => {
    expect(parseBackgroundRepeat('bg-repeat-foo')).toBeNull();
  });
  it('returns null for empty value (bg-repeat-)', () => {
    expect(parseBackgroundRepeat('bg-repeat-')).toBeNull();
  });
  it('returns null for similar but invalid (bg-repeatx)', () => {
    expect(parseBackgroundRepeat('bg-repeatx')).toBeNull();
  });
}); 