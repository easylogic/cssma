import { describe, it, expect } from 'vitest';
import { parseLineClamp } from '../../src/parser/utilities/lineClamp';

describe('parseLineClamp', () => {
  it('parses line-clamp-none', () => {
    expect(parseLineClamp('line-clamp-none')).toEqual({ type: 'line-clamp', value: 'none', raw: 'line-clamp-none', arbitrary: false });
  });

  it('parses line-clamp-<number>', () => {
    expect(parseLineClamp('line-clamp-1')).toEqual({ type: 'line-clamp', value: '1', raw: 'line-clamp-1', arbitrary: false });
    expect(parseLineClamp('line-clamp-3')).toEqual({ type: 'line-clamp', value: '3', raw: 'line-clamp-3', arbitrary: false });
    expect(parseLineClamp('line-clamp-10')).toEqual({ type: 'line-clamp', value: '10', raw: 'line-clamp-10', arbitrary: false });
  });

  it('parses line-clamp-(<custom-property>)', () => {
    expect(parseLineClamp('line-clamp-(--my-lines)')).toEqual({ type: 'line-clamp', value: 'var(--my-lines)', raw: 'line-clamp-(--my-lines)', arbitrary: true });
    expect(parseLineClamp('line-clamp-(--foo)')).toEqual({ type: 'line-clamp', value: 'var(--foo)', raw: 'line-clamp-(--foo)', arbitrary: true });
  });

  it('parses line-clamp-[<value>]', () => {
    expect(parseLineClamp('line-clamp-[5]')).toEqual({ type: 'line-clamp', value: '5', raw: 'line-clamp-[5]', arbitrary: true });
    expect(parseLineClamp('line-clamp-[calc(var(--characters)/100)]')).toEqual({ type: 'line-clamp', value: 'calc(var(--characters)/100)', raw: 'line-clamp-[calc(var(--characters)/100)]', arbitrary: true });
    expect(parseLineClamp('line-clamp-[var(--foo)]')).toEqual({ type: 'line-clamp', value: 'var(--foo)', raw: 'line-clamp-[var(--foo)]', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseLineClamp('line-clamp')).toBeNull();
    expect(parseLineClamp('line-clamp-')).toBeNull();
    expect(parseLineClamp('line-clamp-[ ]')).toBeNull();
    expect(parseLineClamp('line-clamp-(foo)')).toBeNull();
    expect(parseLineClamp('line-clamp--1')).toBeNull();
    expect(parseLineClamp('line-clamp-abc')).toBeNull();
  });
}); 