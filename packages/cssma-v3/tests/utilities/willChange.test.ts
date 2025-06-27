import { describe, it, expect } from 'vitest';
import { parseWillChange } from '../../src/parser/utilities/willChange';

describe('parseWillChange', () => {
  it('parses will-change-auto', () => {
    expect(parseWillChange('will-change-auto')).toEqual({ type: 'will-change', preset: 'auto', value: 'auto', raw: 'will-change-auto', arbitrary: false });
  });
  it('parses will-change-scroll', () => {
    expect(parseWillChange('will-change-scroll')).toEqual({ type: 'will-change', preset: 'scroll', value: 'scroll', raw: 'will-change-scroll', arbitrary: false });
  });
  it('parses will-change-contents', () => {
    expect(parseWillChange('will-change-contents')).toEqual({ type: 'will-change', preset: 'contents', value: 'contents', raw: 'will-change-contents', arbitrary: false });
  });
  it('parses will-change-transform', () => {
    expect(parseWillChange('will-change-transform')).toEqual({ type: 'will-change', preset: 'transform', value: 'transform', raw: 'will-change-transform', arbitrary: false });
  });
  it('parses will-change-(--foo)', () => {
    expect(parseWillChange('will-change-(--foo)')).toEqual({ type: 'will-change', value: 'var(--foo)', raw: 'will-change-(--foo)', customProperty: true });
  });
  it('parses will-change-[top,left]', () => {
    expect(parseWillChange('will-change-[top,left]')).toEqual({ type: 'will-change', value: 'top,left', raw: 'will-change-[top,left]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseWillChange('will-change-')).toBeNull();
    expect(parseWillChange('will-change-foo')).toBeNull();
    expect(parseWillChange('will-change-[]')).toBeNull();
    expect(parseWillChange('will-change-()')).toBeNull();
    expect(parseWillChange('will-change-[ ]')).toBeNull();
  });
}); 