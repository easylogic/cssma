import { describe, it, expect } from 'vitest';
import maxWidthParser from '../../src/parser/utilities/maxWidth';

const meta = { test: true };

describe('maxWidthParser', () => {
  it('parses numeric and px values', () => {
    expect(maxWidthParser('max-w-0', meta)).toEqual({ property: 'max-width', value: '0rem', raw: 'max-w-0', meta });
    expect(maxWidthParser('max-w-px', meta)).toEqual({ property: 'max-width', value: '1px', raw: 'max-w-px', meta });
  });

  it('parses full, min, max, fit', () => {
    expect(maxWidthParser('max-w-full', meta)).toEqual({ property: 'max-width', value: '100%', raw: 'max-w-full', meta });
    expect(maxWidthParser('max-w-min', meta)).toEqual({ property: 'max-width', value: 'min-content', raw: 'max-w-min', meta });
    expect(maxWidthParser('max-w-max', meta)).toEqual({ property: 'max-width', value: 'max-content', raw: 'max-w-max', meta });
    expect(maxWidthParser('max-w-fit', meta)).toEqual({ property: 'max-width', value: 'fit-content', raw: 'max-w-fit', meta });
  });

  it('parses screen breakpoints', () => {
    expect(maxWidthParser('max-w-screen-sm', meta)).toEqual({ property: 'max-width', value: '640px', raw: 'max-w-screen-sm', meta });
    expect(maxWidthParser('max-w-screen-md', meta)).toEqual({ property: 'max-width', value: '768px', raw: 'max-w-screen-md', meta });
    expect(maxWidthParser('max-w-screen-lg', meta)).toEqual({ property: 'max-width', value: '1024px', raw: 'max-w-screen-lg', meta });
    expect(maxWidthParser('max-w-screen-xl', meta)).toEqual({ property: 'max-width', value: '1280px', raw: 'max-w-screen-xl', meta });
    expect(maxWidthParser('max-w-screen-2xl', meta)).toEqual({ property: 'max-width', value: '1536px', raw: 'max-w-screen-2xl', meta });
  });

  it('parses custom property', () => {
    expect(maxWidthParser('max-w-[var(--foo)]', meta)).toEqual({ property: 'max-width', value: 'var(--foo)', raw: 'max-w-[var(--foo)]', meta, arbitrary: true });
    expect(maxWidthParser('max-w-[var(--bar-baz)]', meta)).toEqual({ property: 'max-width', value: 'var(--bar-baz)', raw: 'max-w-[var(--bar-baz)]', meta, arbitrary: true });
  });

  it('parses arbitrary values', () => {
    expect(maxWidthParser('max-w-[32rem]', meta)).toEqual({ property: 'max-width', value: '32rem', raw: 'max-w-[32rem]', meta, arbitrary: true });
    expect(maxWidthParser('max-w-[calc(100%-1rem)]', meta)).toEqual({ property: 'max-width', value: 'calc(100%-1rem)', raw: 'max-w-[calc(100%-1rem)]', meta, arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(maxWidthParser('max-w-', meta)).toBeNull();
    expect(maxWidthParser('max-w', meta)).toBeNull();
    expect(maxWidthParser('w-full', meta)).toBeNull();
    expect(maxWidthParser('min-w-0', meta)).toBeNull();
  });
}); 