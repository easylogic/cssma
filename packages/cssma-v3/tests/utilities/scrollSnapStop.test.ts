import { describe, it, expect } from 'vitest';
import { parseScrollSnapStop } from '../../src/parser/utilities/scrollSnapStop';

describe('parseScrollSnapStop', () => {
  it('parses snap-normal', () => {
    expect(parseScrollSnapStop('snap-normal')).toEqual({ type: 'scroll-snap-stop', value: 'normal', raw: 'snap-normal' });
  });
  it('parses snap-always', () => {
    expect(parseScrollSnapStop('snap-always')).toEqual({ type: 'scroll-snap-stop', value: 'always', raw: 'snap-always' });
  });
  it('returns null for invalid input', () => {
    expect(parseScrollSnapStop('snap')).toBeNull();
    expect(parseScrollSnapStop('snap-foo')).toBeNull();
    expect(parseScrollSnapStop('snap-stop')).toBeNull();
    expect(parseScrollSnapStop('snap-always-foo')).toBeNull();
  });
}); 