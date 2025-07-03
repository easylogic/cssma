import { describe, it, expect } from 'vitest';
import { parseMisc } from '../../src/parser/utilities/misc';

describe('parseFilter', () => {
  it('parses filter-none', () => {
    expect(parseMisc('filter-none')).toEqual({ type: 'filter', value: 'none', raw: 'filter-none', arbitrary: false });
  });
  it('parses arbitrary value', () => {
    expect(parseMisc("filter-[url('filters.svg#filter-id')]")).toEqual({ type: 'filter', value: "url('filters.svg#filter-id')", raw: "filter-[url('filters.svg#filter-id')]", arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseMisc('filter-(--my-filter)')).toEqual({ type: 'filter', value: 'var(--my-filter)', raw: 'filter-(--my-filter)', arbitrary: true });
  });
  it('returns null for invalid filter', () => {
    expect(parseMisc('filter-foo')).toBeNull();
    expect(parseMisc('filter-')).toBeNull();
    expect(parseMisc('filter')).toBeNull();
  });
}); 