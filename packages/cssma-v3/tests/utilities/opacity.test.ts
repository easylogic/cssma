import { describe, it, expect } from 'vitest';
import { parseOpacity } from '../../src/parser/utilities/opacity';

describe('parseOpacity', () => {
  it('parses opacity presets', () => {
    expect(parseOpacity('opacity-100')).toEqual({ type: 'opacity', value: 100, raw: 'opacity-100', arbitrary: false });
    expect(parseOpacity('opacity-75')).toEqual({ type: 'opacity', value: 75, raw: 'opacity-75', arbitrary: false });
    expect(parseOpacity('opacity-0')).toEqual({ type: 'opacity', value: 0, raw: 'opacity-0', arbitrary: false });
  });
  it('parses opacity custom property', () => {
    expect(parseOpacity('opacity-(--my-opacity)')).toEqual({ type: 'opacity', value: 'var(--my-opacity)', raw: 'opacity-(--my-opacity)', arbitrary: true });
  });
  it('parses opacity arbitrary values', () => {
    expect(parseOpacity('opacity-[.67]')).toEqual({ type: 'opacity', value: '.67', raw: 'opacity-[.67]', arbitrary: true });
    expect(parseOpacity('opacity-[var(--foo)]')).toEqual({ type: 'opacity', value: 'var(--foo)', raw: 'opacity-[var(--foo)]', arbitrary: true });
  });
  it('returns null for invalid opacity', () => {
    expect(parseOpacity('opacity-200')).toBeNull();
    expect(parseOpacity('opacity-abc')).toBeNull();
    expect(parseOpacity('opacity-')).toBeNull();
  });
}); 