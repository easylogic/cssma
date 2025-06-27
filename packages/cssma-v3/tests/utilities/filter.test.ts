import { describe, it, expect } from 'vitest';
import { parseFilter } from '../../src/parser/utilities/filter';

describe('parseFilter', () => {
  it('parses filter-none', () => {
    expect(parseFilter('filter-none')).toEqual({ type: 'filter', value: 'none', raw: 'filter-none', arbitrary: false });
  });
  it('parses arbitrary value', () => {
    expect(parseFilter("filter-[url('filters.svg#filter-id')]")).toEqual({ type: 'filter', value: "url('filters.svg#filter-id')", raw: "filter-[url('filters.svg#filter-id')]", arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseFilter('filter-(--my-filter)')).toEqual({ type: 'filter', value: 'var(--my-filter)', raw: 'filter-(--my-filter)', arbitrary: true });
  });
  it('returns null for invalid filter', () => {
    expect(parseFilter('filter-foo')).toBeNull();
    expect(parseFilter('filter-')).toBeNull();
    expect(parseFilter('filter')).toBeNull();
  });
}); 