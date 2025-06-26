import { describe, it, expect } from 'vitest';
import { parseListStyleType } from '../../src/parser/utilities/listStyleType';

describe('parseListStyleType', () => {
  it('parses named presets', () => {
    expect(parseListStyleType('list-disc')).toEqual({ type: 'list-style-type', value: 'disc', raw: 'list-disc', arbitrary: false });
    expect(parseListStyleType('list-decimal')).toEqual({ type: 'list-style-type', value: 'decimal', raw: 'list-decimal', arbitrary: false });
    expect(parseListStyleType('list-none')).toEqual({ type: 'list-style-type', value: 'none', raw: 'list-none', arbitrary: false });
  });

  it('parses custom property', () => {
    expect(parseListStyleType('list-(--my-marker)')).toEqual({ type: 'list-style-type', value: 'var(--my-marker)', raw: 'list-(--my-marker)', arbitrary: true });
    expect(parseListStyleType('list-(--foo)')).toEqual({ type: 'list-style-type', value: 'var(--foo)', raw: 'list-(--foo)', arbitrary: true });
  });

  it('parses arbitrary value', () => {
    expect(parseListStyleType('list-[upper-roman]')).toEqual({ type: 'list-style-type', value: 'upper-roman', raw: 'list-[upper-roman]', arbitrary: true });
    expect(parseListStyleType('list-[var(--foo)]')).toEqual({ type: 'list-style-type', value: 'var(--foo)', raw: 'list-[var(--foo)]', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseListStyleType('list')).toBeNull();
    expect(parseListStyleType('list-')).toBeNull();
    expect(parseListStyleType('list-disc-foo')).toBeNull();
    expect(parseListStyleType('list-[ ]')).toBeNull();
    expect(parseListStyleType('list-(foo)')).toBeNull();
  });
}); 