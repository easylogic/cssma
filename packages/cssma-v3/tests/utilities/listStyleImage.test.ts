import { describe, it, expect } from 'vitest';
import { parseListStyleImage } from '../../src/parser/utilities/listStyleImage';

describe('parseListStyleImage', () => {
  it('parses list-image-none', () => {
    expect(parseListStyleImage('list-image-none')).toEqual({ type: 'list-style-image', value: 'none', raw: 'list-image-none', arbitrary: false });
  });

  it('parses list-image-(<custom-property>)', () => {
    expect(parseListStyleImage('list-image-(--my-list-image)')).toEqual({ type: 'list-style-image', value: 'var(--my-list-image)', raw: 'list-image-(--my-list-image)', arbitrary: true });
    expect(parseListStyleImage('list-image-(--foo)')).toEqual({ type: 'list-style-image', value: 'var(--foo)', raw: 'list-image-(--foo)', arbitrary: true });
  });

  it('parses list-image-[<value>]', () => {
    expect(parseListStyleImage('list-image-[url(/img/checkmark.png)]')).toEqual({ type: 'list-style-image', value: 'url(/img/checkmark.png)', raw: 'list-image-[url(/img/checkmark.png)]', arbitrary: true });
    expect(parseListStyleImage('list-image-[var(--foo)]')).toEqual({ type: 'list-style-image', value: 'var(--foo)', raw: 'list-image-[var(--foo)]', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseListStyleImage('list-image')).toBeNull();
    expect(parseListStyleImage('list-image-')).toBeNull();
    expect(parseListStyleImage('list-image-[ ]')).toBeNull();
    expect(parseListStyleImage('list-image-(foo)')).toBeNull();
    expect(parseListStyleImage('list-image-nonee')).toBeNull();
  });
}); 