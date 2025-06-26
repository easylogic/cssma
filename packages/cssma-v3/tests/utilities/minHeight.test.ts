import { describe, it, expect } from 'vitest';
import minHeightParser from '../../src/parser/utilities/minHeight';

const meta = { test: true };

describe('minHeightParser', () => {
  it('parses numeric and px values', () => {
    expect(minHeightParser('min-h-0', meta)).toEqual({ property: 'min-height', value: '0rem', raw: 'min-h-0', meta });
    expect(minHeightParser('min-h-px', meta)).toEqual({ property: 'min-height', value: '1px', raw: 'min-h-px', meta });
  });

  it('parses full, screen, min, max, fit', () => {
    expect(minHeightParser('min-h-full', meta)).toEqual({ property: 'min-height', value: '100%', raw: 'min-h-full', meta });
    expect(minHeightParser('min-h-screen', meta)).toEqual({ property: 'min-height', value: '100vh', raw: 'min-h-screen', meta });
    expect(minHeightParser('min-h-min', meta)).toEqual({ property: 'min-height', value: 'min-content', raw: 'min-h-min', meta });
    expect(minHeightParser('min-h-max', meta)).toEqual({ property: 'min-height', value: 'max-content', raw: 'min-h-max', meta });
    expect(minHeightParser('min-h-fit', meta)).toEqual({ property: 'min-height', value: 'fit-content', raw: 'min-h-fit', meta });
  });

  it('parses custom property', () => {
    expect(minHeightParser('min-h-[var(--foo)]', meta)).toEqual({ property: 'min-height', value: 'var(--foo)', raw: 'min-h-[var(--foo)]', meta, arbitrary: true });
    expect(minHeightParser('min-h-[var(--bar-baz)]', meta)).toEqual({ property: 'min-height', value: 'var(--bar-baz)', raw: 'min-h-[var(--bar-baz)]', meta, arbitrary: true });
  });

  it('parses arbitrary values', () => {
    expect(minHeightParser('min-h-[32rem]', meta)).toEqual({ property: 'min-height', value: '32rem', raw: 'min-h-[32rem]', meta, arbitrary: true });
    expect(minHeightParser('min-h-[calc(100%-1rem)]', meta)).toEqual({ property: 'min-height', value: 'calc(100%-1rem)', raw: 'min-h-[calc(100%-1rem)]', meta, arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(minHeightParser('min-h-', meta)).toBeNull();
    expect(minHeightParser('min-h', meta)).toBeNull();
    expect(minHeightParser('h-full', meta)).toBeNull();
    expect(minHeightParser('max-h-0', meta)).toBeNull();
  });
}); 