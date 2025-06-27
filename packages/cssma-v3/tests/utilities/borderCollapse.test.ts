import { describe, it, expect } from 'vitest';
import { parseBorderCollapse } from '../../src/parser/utilities/borderCollapse';

describe('parseBorderCollapse', () => {
  it('parses border-collapse', () => {
    expect(parseBorderCollapse('border-collapse')).toEqual({
      type: 'border-collapse',
      value: 'collapse',
      raw: 'border-collapse',
    });
  });

  it('parses border-separate', () => {
    expect(parseBorderCollapse('border-separate')).toEqual({
      type: 'border-collapse',
      value: 'separate',
      raw: 'border-separate',
    });
  });

  it('returns null for invalid input', () => {
    expect(parseBorderCollapse('border-collapse-foo')).toBeNull();
    expect(parseBorderCollapse('border-foo')).toBeNull();
  });
}); 