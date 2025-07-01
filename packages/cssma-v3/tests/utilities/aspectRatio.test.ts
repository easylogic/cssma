import { describe, it, expect } from 'vitest';
import { parseAspectRatio } from '../../src/parser/utilities/aspectRatio';
import { createContext } from '../../src/config/context';
import { defaultConfig } from '../../src/config/defaults';
import type { CssmaTheme } from '../../src/types';

const mockTheme: CssmaTheme = {
  aspect: {
    square: '1/1',
    video: '16/9',
    auto: 'auto',
    golden: '1.618/1',
  },
};
const mockContext = createContext({ theme: mockTheme });
const defaultCtx = createContext(defaultConfig);

describe('parseAspectRatio', () => {
  it('parses context preset (mockContext)', () => {
    expect(parseAspectRatio('aspect-square', mockContext)).toEqual({
      type: 'aspect-ratio',
      value: 'square',
      raw: 'aspect-square',
      arbitrary: false,
      customProperty: false,
      preset: 'aspect.square',
    });
    expect(parseAspectRatio('aspect-golden', mockContext)).toEqual({
      type: 'aspect-ratio',
      value: 'golden',
      raw: 'aspect-golden',
      arbitrary: false,
      customProperty: false,
      preset: 'aspect.golden',
    });
  });

  it('parses context preset (defaultCtx)', () => {
    expect(parseAspectRatio('aspect-square', defaultCtx)).toEqual({
      type: 'aspect-ratio',
      value: 'square',
      raw: 'aspect-square',
      arbitrary: false,
      customProperty: false,
      preset: 'aspect.square',
    });
  });

  it('parses ratio value', () => {
    expect(parseAspectRatio('aspect-16/9', mockContext)).toEqual({
      type: 'aspect-ratio',
      value: '16/9',
      raw: 'aspect-16/9',
      arbitrary: false,
      customProperty: false,
    });
    expect(parseAspectRatio('aspect-3/2', mockContext)).toEqual({
      type: 'aspect-ratio',
      value: '3/2',
      raw: 'aspect-3/2',
      arbitrary: false,
      customProperty: false,
    });
  });

  it('parses custom property', () => {
    expect(parseAspectRatio('aspect-(--my-aspect)', mockContext)).toEqual({
      type: 'aspect-ratio',
      value: 'var(--my-aspect)',
      raw: 'aspect-(--my-aspect)',
      arbitrary: false,
      customProperty: true,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseAspectRatio('aspect-[calc(4*3+1)/3]', mockContext)).toEqual({
      type: 'aspect-ratio',
      value: 'calc(4*3+1)/3',
      raw: 'aspect-[calc(4*3+1)/3]',
      arbitrary: true,
      customProperty: false,
    });
    expect(parseAspectRatio('aspect-[var(--my-aspect)]', mockContext)).toEqual({
      type: 'aspect-ratio',
      value: 'var(--my-aspect)',
      raw: 'aspect-[var(--my-aspect)]',
      arbitrary: true,
      customProperty: false,
    });
  });

  it('returns null for invalid input', () => {
    expect(parseAspectRatio('aspect-foo', mockContext)).toBeNull();
    expect(parseAspectRatio('aspect-', mockContext)).toBeNull();
    expect(parseAspectRatio('aspect-[]', mockContext)).toBeNull();
  });
}); 