import { describe, it, expect } from 'vitest';
import { parseScrollSnapAlign } from '../../src/parser/utilities/scrollSnapAlign';

describe('parseScrollSnapAlign', () => {
  it('parses snap-start', () => {
    expect(parseScrollSnapAlign('snap-start')).toEqual({ type: 'scroll-snap-align', value: 'start', raw: 'snap-start' });
  });
  it('parses snap-end', () => {
    expect(parseScrollSnapAlign('snap-end')).toEqual({ type: 'scroll-snap-align', value: 'end', raw: 'snap-end' });
  });
  it('parses snap-center', () => {
    expect(parseScrollSnapAlign('snap-center')).toEqual({ type: 'scroll-snap-align', value: 'center', raw: 'snap-center' });
  });
  it('parses snap-align-none', () => {
    expect(parseScrollSnapAlign('snap-align-none')).toEqual({ type: 'scroll-snap-align', value: 'none', raw: 'snap-align-none' });
  });
  it('returns null for invalid input', () => {
    expect(parseScrollSnapAlign('snap')).toBeNull();
    expect(parseScrollSnapAlign('snap-foo')).toBeNull();
    expect(parseScrollSnapAlign('snap-align')).toBeNull();
    expect(parseScrollSnapAlign('snap-center-foo')).toBeNull();
  });
}); 