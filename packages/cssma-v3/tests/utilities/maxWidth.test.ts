import { describe, it, expect } from 'vitest';
import { parseMaxWidth } from '../../src/parser/utilities/maxWidth';

describe('parseMaxWidth', () => {
  it('parses numeric and px values', () => {
    expect(parseMaxWidth('max-w-0')).toEqual({ type: 'max-width', value: '0rem', raw: 'max-w-0', arbitrary: false });
    expect(parseMaxWidth('max-w-px')).toEqual({ type: 'max-width', value: '1px', raw: 'max-w-px', arbitrary: false });
  });

  it('parses full, min, max, fit', () => {
    expect(parseMaxWidth('max-w-full')).toEqual({ type: 'max-width', value: '100%', raw: 'max-w-full', arbitrary: false });
    expect(parseMaxWidth('max-w-min')).toEqual({ type: 'max-width', value: 'min-content', raw: 'max-w-min', arbitrary: false });
    expect(parseMaxWidth('max-w-max')).toEqual({ type: 'max-width', value: 'max-content', raw: 'max-w-max', arbitrary: false });
    expect(parseMaxWidth('max-w-fit')).toEqual({ type: 'max-width', value: 'fit-content', raw: 'max-w-fit', arbitrary: false });
  });

  it('parses screen breakpoints', () => {
    expect(parseMaxWidth('max-w-screen-sm')).toEqual({ type: 'max-width', value: '640px', raw: 'max-w-screen-sm', arbitrary: false });
    expect(parseMaxWidth('max-w-screen-md')).toEqual({ type: 'max-width', value: '768px', raw: 'max-w-screen-md', arbitrary: false });
    expect(parseMaxWidth('max-w-screen-lg')).toEqual({ type: 'max-width', value: '1024px', raw: 'max-w-screen-lg', arbitrary: false });
    expect(parseMaxWidth('max-w-screen-xl')).toEqual({ type: 'max-width', value: '1280px', raw: 'max-w-screen-xl', arbitrary: false });
    expect(parseMaxWidth('max-w-screen-2xl')).toEqual({ type: 'max-width', value: '1536px', raw: 'max-w-screen-2xl', arbitrary: false });
  });

  it('parses custom property', () => {
    expect(parseMaxWidth('max-w-(--foo)')).toEqual({ type: 'max-width', value: 'var(--foo)', raw: 'max-w-(--foo)', arbitrary: true });
    expect(parseMaxWidth('max-w-(--bar-baz)')).toEqual({ type: 'max-width', value: 'var(--bar-baz)', raw: 'max-w-(--bar-baz)', arbitrary: true });
  });

  it('parses arbitrary values', () => {
    expect(parseMaxWidth('max-w-[32rem]')).toEqual({ type: 'max-width', value: '32rem', raw: 'max-w-[32rem]', arbitrary: true });
    expect(parseMaxWidth('max-w-[calc(100%-1rem)]')).toEqual({ type: 'max-width', value: 'calc(100%-1rem)', raw: 'max-w-[calc(100%-1rem)]', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseMaxWidth('max-w-')).toBeNull();
    expect(parseMaxWidth('max-w')).toBeNull();
    expect(parseMaxWidth('w-full')).toBeNull();
    expect(parseMaxWidth('min-w-0')).toBeNull();
  });
}); 