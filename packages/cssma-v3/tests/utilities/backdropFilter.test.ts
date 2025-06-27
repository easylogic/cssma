import { describe, it, expect } from 'vitest';
import { parseBackdropFilter } from '../../src/parser/utilities/backdropFilter';

describe('parseBackdropFilter', () => {
  it('parses backdrop-filter-none', () => {
    expect(parseBackdropFilter('backdrop-filter-none')).toEqual({ type: 'backdrop-filter', value: 'none', raw: 'backdrop-filter-none', arbitrary: false });
  });
  it('parses arbitrary value', () => {
    expect(parseBackdropFilter("backdrop-filter-[url('filters.svg#filter-id')]")).toEqual({ type: 'backdrop-filter', value: "url('filters.svg#filter-id')", raw: "backdrop-filter-[url('filters.svg#filter-id')]", arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseBackdropFilter('backdrop-filter-(--my-backdrop-filter)')).toEqual({ type: 'backdrop-filter', value: 'var(--my-backdrop-filter)', raw: 'backdrop-filter-(--my-backdrop-filter)', arbitrary: true });
  });
  it('returns null for invalid', () => {
    expect(parseBackdropFilter('backdrop-filter-foo')).toBeNull();
    expect(parseBackdropFilter('backdrop-filter-')).toBeNull();
    expect(parseBackdropFilter('backdrop-filter--none')).toBeNull();
  });
}); 