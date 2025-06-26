import { describe, it, expect } from 'vitest';
import { parseHeight } from '../../src/parser/utilities/height';

describe('parseHeight', () => {
  it('parses numeric and px values', () => {
    expect(parseHeight('h-0')).toEqual({ type: 'height', value: '0rem', raw: 'h-0', arbitrary: false });
    expect(parseHeight('h-px')).toEqual({ type: 'height', value: '1px', raw: 'h-px', arbitrary: false });
  });

  it('parses full, screen, min, max, fit', () => {
    expect(parseHeight('h-full')).toEqual({ type: 'height', value: '100%', raw: 'h-full', arbitrary: false });
    expect(parseHeight('h-screen')).toEqual({ type: 'height', value: '100vh', raw: 'h-screen', arbitrary: false });
    expect(parseHeight('h-min')).toEqual({ type: 'height', value: 'min-content', raw: 'h-min', arbitrary: false });
    expect(parseHeight('h-max')).toEqual({ type: 'height', value: 'max-content', raw: 'h-max', arbitrary: false });
    expect(parseHeight('h-fit')).toEqual({ type: 'height', value: 'fit-content', raw: 'h-fit', arbitrary: false });
  });

  it('parses custom property', () => {
    expect(parseHeight('h-(--foo)')).toEqual({ type: 'height', value: 'var(--foo)', raw: 'h-(--foo)', arbitrary: true });
    expect(parseHeight('h-(--bar-baz)')).toEqual({ type: 'height', value: 'var(--bar-baz)', raw: 'h-(--bar-baz)', arbitrary: true });
  });

  it('parses arbitrary values', () => {
    expect(parseHeight('h-[32rem]')).toEqual({ type: 'height', value: '32rem', raw: 'h-[32rem]', arbitrary: true });
    expect(parseHeight('h-[calc(100%-1rem)]')).toEqual({ type: 'height', value: 'calc(100%-1rem)', raw: 'h-[calc(100%-1rem)]', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseHeight('h-')).toBeNull();
    expect(parseHeight('h')).toBeNull();
    expect(parseHeight('max-h-full')).toBeNull();
    expect(parseHeight('min-h-0')).toBeNull();
  });
}); 