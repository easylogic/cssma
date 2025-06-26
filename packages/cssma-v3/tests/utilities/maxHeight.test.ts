import { describe, it, expect } from 'vitest';
import maxHeightParser from '../../src/parser/utilities/maxHeight';

const meta = { test: true };

describe('maxHeightParser', () => {
  it('parses numeric and px values', () => {
    expect(maxHeightParser('max-h-0', meta)).toEqual({ property: 'max-height', value: '0rem', raw: 'max-h-0', meta });
    expect(maxHeightParser('max-h-px', meta)).toEqual({ property: 'max-height', value: '1px', raw: 'max-h-px', meta });
  });

  it('parses full, screen, min, max, fit', () => {
    expect(maxHeightParser('max-h-full', meta)).toEqual({ property: 'max-height', value: '100%', raw: 'max-h-full', meta });
    expect(maxHeightParser('max-h-screen', meta)).toEqual({ property: 'max-height', value: '100vh', raw: 'max-h-screen', meta });
    expect(maxHeightParser('max-h-min', meta)).toEqual({ property: 'max-height', value: 'min-content', raw: 'max-h-min', meta });
    expect(maxHeightParser('max-h-max', meta)).toEqual({ property: 'max-height', value: 'max-content', raw: 'max-h-max', meta });
    expect(maxHeightParser('max-h-fit', meta)).toEqual({ property: 'max-height', value: 'fit-content', raw: 'max-h-fit', meta });
  });

  it('parses custom property', () => {
    expect(maxHeightParser('max-h-[var(--foo)]', meta)).toEqual({ property: 'max-height', value: 'var(--foo)', raw: 'max-h-[var(--foo)]', meta, arbitrary: true });
    expect(maxHeightParser('max-h-[var(--bar-baz)]', meta)).toEqual({ property: 'max-height', value: 'var(--bar-baz)', raw: 'max-h-[var(--bar-baz)]', meta, arbitrary: true });
  });

  it('parses arbitrary values', () => {
    expect(maxHeightParser('max-h-[32rem]', meta)).toEqual({ property: 'max-height', value: '32rem', raw: 'max-h-[32rem]', meta, arbitrary: true });
    expect(maxHeightParser('max-h-[calc(100%-1rem)]', meta)).toEqual({ property: 'max-height', value: 'calc(100%-1rem)', raw: 'max-h-[calc(100%-1rem)]', meta, arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(maxHeightParser('max-h-', meta)).toBeNull();
    expect(maxHeightParser('max-h', meta)).toBeNull();
    expect(maxHeightParser('h-full', meta)).toBeNull();
    expect(maxHeightParser('min-h-0', meta)).toBeNull();
  });
}); 