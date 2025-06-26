import { describe, it, expect } from 'vitest';
import heightParser from '../../src/parser/utilities/height';

const meta = { test: true };

describe('heightParser', () => {
  it('parses numeric and px values', () => {
    expect(heightParser('h-0', meta)).toEqual({ property: 'height', value: '0rem', raw: 'h-0', meta });
    expect(heightParser('h-px', meta)).toEqual({ property: 'height', value: '1px', raw: 'h-px', meta });
  });

  it('parses full, screen, min, max, fit', () => {
    expect(heightParser('h-full', meta)).toEqual({ property: 'height', value: '100%', raw: 'h-full', meta });
    expect(heightParser('h-screen', meta)).toEqual({ property: 'height', value: '100vh', raw: 'h-screen', meta });
    expect(heightParser('h-min', meta)).toEqual({ property: 'height', value: 'min-content', raw: 'h-min', meta });
    expect(heightParser('h-max', meta)).toEqual({ property: 'height', value: 'max-content', raw: 'h-max', meta });
    expect(heightParser('h-fit', meta)).toEqual({ property: 'height', value: 'fit-content', raw: 'h-fit', meta });
  });

  it('parses custom property', () => {
    expect(heightParser('h-[var(--foo)]', meta)).toEqual({ property: 'height', value: 'var(--foo)', raw: 'h-[var(--foo)]', meta, arbitrary: true });
    expect(heightParser('h-[var(--bar-baz)]', meta)).toEqual({ property: 'height', value: 'var(--bar-baz)', raw: 'h-[var(--bar-baz)]', meta, arbitrary: true });
  });

  it('parses arbitrary values', () => {
    expect(heightParser('h-[32rem]', meta)).toEqual({ property: 'height', value: '32rem', raw: 'h-[32rem]', meta, arbitrary: true });
    expect(heightParser('h-[calc(100%-1rem)]', meta)).toEqual({ property: 'height', value: 'calc(100%-1rem)', raw: 'h-[calc(100%-1rem)]', meta, arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(heightParser('h-', meta)).toBeNull();
    expect(heightParser('h', meta)).toBeNull();
    expect(heightParser('w-full', meta)).toBeNull();
    expect(heightParser('min-h-0', meta)).toBeNull();
  });
}); 