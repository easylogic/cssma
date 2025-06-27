import { describe, it, expect } from 'vitest';
import { parseResize } from '../../src/parser/utilities/resize';

describe('parseResize', () => {
  it('parses resize', () => {
    expect(parseResize('resize')).toEqual({ type: 'resize', value: 'both', raw: 'resize', preset: 'both' });
  });
  it('parses resize-x', () => {
    expect(parseResize('resize-x')).toEqual({ type: 'resize', value: 'horizontal', raw: 'resize-x', preset: 'horizontal' });
  });
  it('parses resize-y', () => {
    expect(parseResize('resize-y')).toEqual({ type: 'resize', value: 'vertical', raw: 'resize-y', preset: 'vertical' });
  });
  it('parses resize-none', () => {
    expect(parseResize('resize-none')).toEqual({ type: 'resize', value: 'none', raw: 'resize-none', preset: 'none' });
  });
  it('returns null for invalid input', () => {
    expect(parseResize('resize-both')).toBeNull();
    expect(parseResize('resize-horizontal')).toBeNull();
    expect(parseResize('resize-vertical')).toBeNull();
    expect(parseResize('resize-foo')).toBeNull();
    expect(parseResize('resize-none-both')).toBeNull();
  });
}); 