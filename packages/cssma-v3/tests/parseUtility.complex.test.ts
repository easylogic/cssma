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

  it('parses border-radius utilities', () => {
    const cases = [
      ['rounded', { type: 'border-radius', preset: 'md', raw: 'rounded', arbitrary: false }],
      ['rounded-lg', { type: 'border-radius', preset: 'lg', raw: 'rounded-lg', arbitrary: false }],
      ['rounded-t-[2vw]', { type: 'border-radius', logical: 't', value: '2vw', raw: 'rounded-t-[2vw]', arbitrary: true }],
      ['rounded-(--my-radius)', { type: 'border-radius', value: 'var(--my-radius)', raw: 'rounded-(--my-radius)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input)).toMatchObject(expected);
    }
  });

  it('parses border-width utilities', () => {
    const cases = [
      ['border', { type: 'border-width', side: 'all', value: '1px', raw: 'border', arbitrary: false }],
      ['border-2', { type: 'border-width', side: 'all', value: '2px', raw: 'border-2', arbitrary: false }],
      ['border-x-4', { type: 'border-width', side: 'x', value: '4px', raw: 'border-x-4', arbitrary: false }],
      ['border-t-[2vw]', { type: 'border-width', side: 't', value: '2vw', raw: 'border-t-[2vw]', arbitrary: true }],
      ['border-(length:--my-border-width)', { type: 'border-width', side: 'all', value: 'var(--my-border-width)', raw: 'border-(length:--my-border-width)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input)).toMatchObject(expected);
    }
  });

  it('parses border-color utilities', () => {
    const cases = [
      ['border-black', { type: 'border-color', side: 'all', preset: 'black', raw: 'border-black', arbitrary: false }],
      ['border-red-500', { type: 'border-color', side: 'all', preset: 'red-500', raw: 'border-red-500', arbitrary: false }],
      ['border-x-blue-500', { type: 'border-color', side: 'x', preset: 'blue-500', raw: 'border-x-blue-500', arbitrary: false }],
      ['border-t-[#243c5a]', { type: 'border-color', side: 't', value: '#243c5a', raw: 'border-t-[#243c5a]', arbitrary: true }],
      ['border-(--my-border)', { type: 'border-color', side: 'all', value: 'var(--my-border)', raw: 'border-(--my-border)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input)).toMatchObject(expected);
    }
  });

  it('parses border-style utilities', () => {
    const cases = [
      ['border-solid', { type: 'border-style', preset: 'solid', raw: 'border-solid', arbitrary: false }],
      ['border-dashed', { type: 'border-style', preset: 'dashed', raw: 'border-dashed', arbitrary: false }],
      ['border-dotted', { type: 'border-style', preset: 'dotted', raw: 'border-dotted', arbitrary: false }],
      ['border-double', { type: 'border-style', preset: 'double', raw: 'border-double', arbitrary: false }],
      ['border-hidden', { type: 'border-style', preset: 'hidden', raw: 'border-hidden', arbitrary: false }],
      ['border-none', { type: 'border-style', preset: 'none', raw: 'border-none', arbitrary: false }],
      ['divide-solid', { type: 'divide-style', preset: 'solid', raw: 'divide-solid', arbitrary: false }],
      ['divide-dashed', { type: 'divide-style', preset: 'dashed', raw: 'divide-dashed', arbitrary: false }],
      ['divide-dotted', { type: 'divide-style', preset: 'dotted', raw: 'divide-dotted', arbitrary: false }],
      ['divide-double', { type: 'divide-style', preset: 'double', raw: 'divide-double', arbitrary: false }],
      ['divide-hidden', { type: 'divide-style', preset: 'hidden', raw: 'divide-hidden', arbitrary: false }],
      ['divide-none', { type: 'divide-style', preset: 'none', raw: 'divide-none', arbitrary: false }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input)).toMatchObject(expected);
    }
  });

  it('parses outline-width utilities', () => {
    const cases = [
      ['outline', { type: 'outline-width', value: '1px', raw: 'outline', arbitrary: false }],
      ['outline-2', { type: 'outline-width', value: '2px', raw: 'outline-2', arbitrary: false }],
      ['outline-4', { type: 'outline-width', value: '4px', raw: 'outline-4', arbitrary: false }],
      ['outline-(length:--my-outline-width)', { type: 'outline-width', value: 'var(--my-outline-width)', raw: 'outline-(length:--my-outline-width)', arbitrary: true }],
      ['outline-[2vw]', { type: 'outline-width', value: '2vw', raw: 'outline-[2vw]', arbitrary: true }],
      ['outline-[length:var(--foo)]', { type: 'unknown', raw: 'outline-[length:var(--foo)]' }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input)).toEqual(expected);
    }
  });

  it('parses outline-color utilities (integration)', () => {
    expect(parseUtility('outline-blue-500')).toEqual({ type: 'outline-color', preset: 'blue-500', raw: 'outline-blue-500', arbitrary: false });
    expect(parseUtility('outline-red-100')).toEqual({ type: 'outline-color', preset: 'red-100', raw: 'outline-red-100', arbitrary: false });
    expect(parseUtility('outline-amber-900/75')).toEqual({ type: 'outline-color', preset: 'amber-900/75', raw: 'outline-amber-900/75', arbitrary: false });
    expect(parseUtility('outline-(--my-color)')).toEqual({ type: 'outline-color', value: 'var(--my-color)', raw: 'outline-(--my-color)', arbitrary: true });
    expect(parseUtility('outline-[#243c5a]')).toEqual({ type: 'outline-color', value: '#243c5a', raw: 'outline-[#243c5a]', arbitrary: true });
    expect(parseUtility('outline-[rgb(10,20,30)]')).toEqual({ type: 'outline-color', value: 'rgb(10,20,30)', raw: 'outline-[rgb(10,20,30)]', arbitrary: true });
  });

  it('parses outline-style utilities (integration)', () => {
    expect(parseUtility('outline-solid')).toEqual({ type: 'outline-style', preset: 'solid', raw: 'outline-solid', arbitrary: false });
    expect(parseUtility('outline-dashed')).toEqual({ type: 'outline-style', preset: 'dashed', raw: 'outline-dashed', arbitrary: false });
    expect(parseUtility('outline-dotted')).toEqual({ type: 'outline-style', preset: 'dotted', raw: 'outline-dotted', arbitrary: false });
    expect(parseUtility('outline-double')).toEqual({ type: 'outline-style', preset: 'double', raw: 'outline-double', arbitrary: false });
    expect(parseUtility('outline-none')).toEqual({ type: 'outline-style', preset: 'none', raw: 'outline-none', arbitrary: false });
    expect(parseUtility('outline-hidden')).toEqual({
      type: 'outline-style',
      preset: 'hidden',
      raw: 'outline-hidden',
      arbitrary: false,
      special: true,
      style: 'solid',
      width: '2px',
      color: 'transparent',
      offset: '2px',
    });
  });

  it('parses outline-offset utilities (integration)', () => {
    expect(parseUtility('outline-offset-0')).toEqual({ type: 'outline-offset', value: '0px', raw: 'outline-offset-0', arbitrary: false, negative: false });
    expect(parseUtility('outline-offset-2')).toEqual({ type: 'outline-offset', value: '2px', raw: 'outline-offset-2', arbitrary: false, negative: false });
    expect(parseUtility('-outline-offset-2')).toEqual({ type: 'outline-offset', value: 'calc(2px * -1)', raw: '-outline-offset-2', arbitrary: false, negative: true });
    expect(parseUtility('outline-offset-(--my-outline-offset)')).toEqual({ type: 'outline-offset', value: 'var(--my-outline-offset)', raw: 'outline-offset-(--my-outline-offset)', arbitrary: true, customProperty: true });
    expect(parseUtility('outline-offset-[2vw]')).toEqual({ type: 'outline-offset', value: '2vw', raw: 'outline-offset-[2vw]', arbitrary: true });
    expect(parseUtility('outline-offset-[10px]')).toEqual({ type: 'outline-offset', value: '10px', raw: 'outline-offset-[10px]', arbitrary: true });
  });
}); 