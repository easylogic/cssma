import { describe, it, expect } from 'vitest';
import { parseMinHeight } from '../../src/parser/utilities/minHeight';

describe('parseMinHeight', () => {
  it('parses numeric and px values', () => {
    expect(parseMinHeight('min-h-0')).toEqual({ type: 'min-height', value: '0rem', raw: 'min-h-0', arbitrary: false });
    expect(parseMinHeight('min-h-px')).toEqual({ type: 'min-height', value: '1px', raw: 'min-h-px', arbitrary: false });
  });

  it('parses full, screen, min, max, fit', () => {
    expect(parseMinHeight('min-h-full')).toEqual({ type: 'min-height', value: '100%', raw: 'min-h-full', arbitrary: false });
    expect(parseMinHeight('min-h-screen')).toEqual({ type: 'min-height', value: '100vh', raw: 'min-h-screen', arbitrary: false });
    expect(parseMinHeight('min-h-min')).toEqual({ type: 'min-height', value: 'min-content', raw: 'min-h-min', arbitrary: false });
    expect(parseMinHeight('min-h-max')).toEqual({ type: 'min-height', value: 'max-content', raw: 'min-h-max', arbitrary: false });
    expect(parseMinHeight('min-h-fit')).toEqual({ type: 'min-height', value: 'fit-content', raw: 'min-h-fit', arbitrary: false });
  });

  it('parses custom property', () => {
    expect(parseMinHeight('min-h-(--foo)')).toEqual({ type: 'min-height', value: 'var(--foo)', raw: 'min-h-(--foo)', arbitrary: true });
    expect(parseMinHeight('min-h-(--bar-baz)')).toEqual({ type: 'min-height', value: 'var(--bar-baz)', raw: 'min-h-(--bar-baz)', arbitrary: true });
  });

  it('parses arbitrary values', () => {
    expect(parseMinHeight('min-h-[32rem]')).toEqual({ type: 'min-height', value: '32rem', raw: 'min-h-[32rem]', arbitrary: true });
    expect(parseMinHeight('min-h-[calc(100%-1rem)]')).toEqual({ type: 'min-height', value: 'calc(100%-1rem)', raw: 'min-h-[calc(100%-1rem)]', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseMinHeight('min-h-')).toBeNull();
    expect(parseMinHeight('min-h')).toBeNull();
    expect(parseMinHeight('h-full')).toBeNull();
    expect(parseMinHeight('max-h-0')).toBeNull();
  });
}); 