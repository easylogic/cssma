import { describe, it, expect } from 'vitest';
import { parseUtility } from '../src/parser/parseUtility';

function parseAll(classString: string) {
  return classString.trim().split(/\s+/).map(parseUtility);
}

describe('parseUtility (복합 조합)', () => {
  it('parses multiple utilities in one string', () => {
    const result = parseAll('bg-cover text-center p-4');
    expect(result[0]).toMatchObject({ type: 'background-size', preset: 'cover' });
    expect(result[1]).toMatchObject({ type: 'text-align', preset: 'center', raw: 'text-center', arbitrary: false });
    expect(result[2]).toMatchObject({ type: 'padding', value: 4 });
  });

  it('parses flex layout combo', () => {
    const result = parseAll('flex items-center justify-between gap-2');
    expect(result[0]).toMatchObject({ type: 'display', preset: 'flex' });
    expect(result[1]).toMatchObject({ type: 'align-items', preset: 'center' });
    expect(result[2]).toMatchObject({ type: 'justify-content', preset: 'between' });
    expect(result[3]).toMatchObject({ type: 'gap', value: 2 });
  });

  it('parses arbitrary and custom property values', () => {
    const result = parseAll('bg-[url(https://foo)] text-[var(--main)] p-[10px]');
    expect(result[0]).toMatchObject({ type: 'background-image', preset: 'url(https://foo)' });
    expect(result[1]).toMatchObject({ type: 'color', preset: 'var(--main)', raw: 'text-[var(--main)]', arbitrary: true });
    expect(result[2]).toMatchObject({ type: 'padding', value: '10px' });
  });

  it('handles unknown and known utilities together', () => {
    const result = parseAll('foo-bar bg-cover bar-baz');
    expect(result[0]).toMatchObject({ type: 'unknown', raw: 'foo-bar' });
    expect(result[1]).toMatchObject({ type: 'background-size', preset: 'cover' });
    expect(result[2]).toMatchObject({ type: 'unknown', raw: 'bar-baz' });
  });

  it('parses edge cases: empty, whitespace, duplicate', () => {
    expect(parseAll('')).toEqual([{ type: 'unknown', raw: '' }]);
    expect(parseAll('   ')).toEqual([{ type: 'unknown', raw: '' }]);
    const result = parseAll('bg-cover bg-cover');
    expect(result.length).toBe(2);
    expect(result[0]).toMatchObject({ type: 'background-size', preset: 'cover' });
    expect(result[1]).toMatchObject({ type: 'background-size', preset: 'cover' });
  });

  it('parses justify-content utilities', () => {
    const cases = [
      ['justify-start', { type: 'justify-content', preset: 'start', raw: 'justify-start', arbitrary: false }],
      ['justify-end', { type: 'justify-content', preset: 'end', raw: 'justify-end', arbitrary: false }],
      ['justify-center', { type: 'justify-content', preset: 'center', raw: 'justify-center', arbitrary: false }],
      ['justify-between', { type: 'justify-content', preset: 'between', raw: 'justify-between', arbitrary: false }],
      ['justify-around', { type: 'justify-content', preset: 'around', raw: 'justify-around', arbitrary: false }],
      ['justify-evenly', { type: 'justify-content', preset: 'evenly', raw: 'justify-evenly', arbitrary: false }],
      ['justify-[foobar]', { type: 'justify-content', value: 'foobar', raw: 'justify-[foobar]', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input)).toMatchObject(expected);
    }
  });
}); 