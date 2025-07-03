import { describe, it, expect } from 'vitest';
import { parseBox } from '../../src/parser/utilities/box';

describe('parseBorderCollapse', () => {
  it('parses border-collapse', () => {
    expect(parseBox('border-collapse')).toEqual({
      type: 'border-collapse',
      value: 'collapse',
      raw: 'border-collapse',
    });
  });

  it('parses border-separate', () => {
    expect(parseBox('border-separate')).toEqual({
      type: 'border-collapse',
      value: 'separate',
      raw: 'border-separate',
    });
  });

  it('returns null for invalid input', () => {
    expect(parseBox('border-collapse-foo')).toBeNull();
    expect(parseBox('border-foo')).toBeNull();
  });
}); 