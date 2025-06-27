import { describe, it, expect } from 'vitest';
import { parseScrollBehavior } from '../../src/parser/utilities/scrollBehavior';

describe('parseScrollBehavior', () => {
  it('parses scroll-auto', () => {
    expect(parseScrollBehavior('scroll-auto')).toEqual({ type: 'scroll-behavior', value: 'auto', raw: 'scroll-auto', preset: 'auto' });
  });
  it('parses scroll-smooth', () => {
    expect(parseScrollBehavior('scroll-smooth')).toEqual({ type: 'scroll-behavior', value: 'smooth', raw: 'scroll-smooth', preset: 'smooth' });
  });
  it('returns null for invalid input', () => {
    expect(parseScrollBehavior('scroll')).toBeNull();
    expect(parseScrollBehavior('scroll-behavior')).toBeNull();
    expect(parseScrollBehavior('scroll-foo')).toBeNull();
    expect(parseScrollBehavior('scroll-auto-smooth')).toBeNull();
    expect(parseScrollBehavior('scroll-smooth-auto')).toBeNull();
  });
}); 