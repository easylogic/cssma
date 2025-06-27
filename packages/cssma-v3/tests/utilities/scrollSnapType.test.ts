import { describe, it, expect } from 'vitest';
import { parseScrollSnapType } from '../../src/parser/utilities/scrollSnapType';

describe('parseScrollSnapType', () => {
  it('parses snap-none', () => {
    expect(parseScrollSnapType('snap-none')).toEqual({ type: 'scroll-snap-type', value: 'none', raw: 'snap-none' });
  });
  it('parses snap-x', () => {
    expect(parseScrollSnapType('snap-x')).toEqual({ type: 'scroll-snap-type', value: 'x', strictness: 'var(--tw-scroll-snap-strictness)', raw: 'snap-x' });
  });
  it('parses snap-y', () => {
    expect(parseScrollSnapType('snap-y')).toEqual({ type: 'scroll-snap-type', value: 'y', strictness: 'var(--tw-scroll-snap-strictness)', raw: 'snap-y' });
  });
  it('parses snap-both', () => {
    expect(parseScrollSnapType('snap-both')).toEqual({ type: 'scroll-snap-type', value: 'both', strictness: 'var(--tw-scroll-snap-strictness)', raw: 'snap-both' });
  });
  it('parses snap-mandatory', () => {
    expect(parseScrollSnapType('snap-mandatory')).toEqual({ type: 'scroll-snap-type-strictness', value: 'mandatory', property: '--tw-scroll-snap-strictness', raw: 'snap-mandatory' });
  });
  it('parses snap-proximity', () => {
    expect(parseScrollSnapType('snap-proximity')).toEqual({ type: 'scroll-snap-type-strictness', value: 'proximity', property: '--tw-scroll-snap-strictness', raw: 'snap-proximity' });
  });
  it('returns null for invalid input', () => {
    expect(parseScrollSnapType('snap')).toBeNull();
    expect(parseScrollSnapType('snap-foo')).toBeNull();
    expect(parseScrollSnapType('snap-type')).toBeNull();
    expect(parseScrollSnapType('snap-x-mandatory')).toBeNull();
  });
}); 