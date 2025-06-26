import { describe, it, expect } from 'vitest';
import { parseMaxHeight } from '../../src/parser/utilities/maxHeight';

describe('parseMaxHeight', () => {
  it('parses numeric and px values', () => {
    expect(parseMaxHeight('max-h-0')).toEqual({ type: 'max-height', value: '0rem', raw: 'max-h-0', arbitrary: false });
    expect(parseMaxHeight('max-h-px')).toEqual({ type: 'max-height', value: '1px', raw: 'max-h-px', arbitrary: false });
  });

  it('parses full, screen, min, max, fit', () => {
    expect(parseMaxHeight('max-h-full')).toEqual({ type: 'max-height', value: '100%', raw: 'max-h-full', arbitrary: false });
    expect(parseMaxHeight('max-h-screen')).toEqual({ type: 'max-height', value: '100vh', raw: 'max-h-screen', arbitrary: false });
    expect(parseMaxHeight('max-h-min')).toEqual({ type: 'max-height', value: 'min-content', raw: 'max-h-min', arbitrary: false });
    expect(parseMaxHeight('max-h-max')).toEqual({ type: 'max-height', value: 'max-content', raw: 'max-h-max', arbitrary: false });
    expect(parseMaxHeight('max-h-fit')).toEqual({ type: 'max-height', value: 'fit-content', raw: 'max-h-fit', arbitrary: false });
  });

  it('parses custom property', () => {
    expect(parseMaxHeight('max-h-(--foo)')).toEqual({ type: 'max-height', value: 'var(--foo)', raw: 'max-h-(--foo)', arbitrary: true });
    expect(parseMaxHeight('max-h-(--bar-baz)')).toEqual({ type: 'max-height', value: 'var(--bar-baz)', raw: 'max-h-(--bar-baz)', arbitrary: true });
  });

  it('parses arbitrary values', () => {
    expect(parseMaxHeight('max-h-[32rem]')).toEqual({ type: 'max-height', value: '32rem', raw: 'max-h-[32rem]', arbitrary: true });
    expect(parseMaxHeight('max-h-[calc(100%-1rem)]')).toEqual({ type: 'max-height', value: 'calc(100%-1rem)', raw: 'max-h-[calc(100%-1rem)]', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseMaxHeight('max-h-')).toBeNull();
    expect(parseMaxHeight('max-h')).toBeNull();
    expect(parseMaxHeight('h-full')).toBeNull();
    expect(parseMaxHeight('min-h-0')).toBeNull();
  });
}); 