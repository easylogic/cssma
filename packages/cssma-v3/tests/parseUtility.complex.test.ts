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
      expect(parseUtility(input as string)).toMatchObject(expected);
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
      expect(parseUtility(input as string)).toMatchObject(expected);
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
      expect(parseUtility(input as string)).toMatchObject(expected);
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
      expect(parseUtility(input as string)).toMatchObject(expected);
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
      expect(parseUtility(input as string)).toMatchObject(expected);
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
      expect(parseUtility(input as string)).toEqual(expected);
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

  it('parses mask-composite utilities', () => {
    const cases = [
      ['mask-add', { type: 'mask-composite', value: 'add', raw: 'mask-add', arbitrary: false }],
      ['mask-subtract', { type: 'mask-composite', value: 'subtract', raw: 'mask-subtract', arbitrary: false }],
      ['mask-intersect', { type: 'mask-composite', value: 'intersect', raw: 'mask-intersect', arbitrary: false }],
      ['mask-exclude', { type: 'mask-composite', value: 'exclude', raw: 'mask-exclude', arbitrary: false }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses mask-image utilities', () => {
    const cases = [
      ['mask-none', { type: 'mask-image', value: 'none', raw: 'mask-none', arbitrary: false }],
      ['mask-[url(/img/foo.png)]', { type: 'mask-image', value: 'url(/img/foo.png)', raw: 'mask-[url(/img/foo.png)]', arbitrary: true }],
      ['mask-(--my-mask)', { type: 'mask-image', value: 'var(--my-mask)', raw: 'mask-(--my-mask)', arbitrary: true }],
      ['mask-linear-50', { type: 'mask-image', preset: 'linear', angle: 50, raw: 'mask-linear-50', arbitrary: false }],
      ['-mask-linear-50', { type: 'mask-image', preset: 'linear', angle: -50, raw: '-mask-linear-50', arbitrary: false }],
      ['mask-linear-from-60%', { type: 'mask-image', preset: 'linear-from', value: '60%', raw: 'mask-linear-from-60%', arbitrary: false }],
      ['mask-linear-to-80%', { type: 'mask-image', preset: 'linear-to', value: '80%', raw: 'mask-linear-to-80%', arbitrary: false }],
      ['mask-x-from-70%', { type: 'mask-image', preset: 'x-from', value: '70%', raw: 'mask-x-from-70%', arbitrary: false }],
      ['mask-y-to-90%', { type: 'mask-image', preset: 'y-to', value: '90%', raw: 'mask-y-to-90%', arbitrary: false }],
      ['mask-radial-from-75%', { type: 'mask-image', preset: 'radial-from', value: '75%', raw: 'mask-radial-from-75%', arbitrary: false }],
      ['mask-radial-to-85%', { type: 'mask-image', preset: 'radial-to', value: '85%', raw: 'mask-radial-to-85%', arbitrary: false }],
      ['mask-radial-at-top-left', { type: 'mask-image', preset: 'radial-at', value: 'top-left', raw: 'mask-radial-at-top-left', arbitrary: false }],
      ['mask-radial-closest-side', { type: 'mask-image', preset: 'closest-side', raw: 'mask-radial-closest-side', arbitrary: false }],
      ['mask-conic-from-75%', { type: 'mask-image', preset: 'conic-from', value: '75%', raw: 'mask-conic-from-75%', arbitrary: false }],
      ['mask-conic-to-75%', { type: 'mask-image', preset: 'conic-to', value: '75%', raw: 'mask-conic-to-75%', arbitrary: false }],
      ['mask-conic-120', { type: 'mask-image', preset: 'conic', angle: 120, raw: 'mask-conic-120', arbitrary: false }],
      ['mask-linear-[70deg,transparent_10%,black,transparent_80%]', { type: 'mask-image', preset: 'linear', value: '70deg,transparent_10%,black,transparent_80%', raw: 'mask-linear-[70deg,transparent_10%,black,transparent_80%]', arbitrary: true }],
      ['mask-linear-(--my-mask)', { type: 'mask-image', preset: 'linear', value: 'var(--my-mask)', raw: 'mask-linear-(--my-mask)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses mask-mode utilities', () => {
    const cases = [
      ['mask-alpha', { type: 'mask-mode', value: 'alpha', raw: 'mask-alpha', arbitrary: false }],
      ['mask-luminance', { type: 'mask-mode', value: 'luminance', raw: 'mask-luminance', arbitrary: false }],
      ['mask-match', { type: 'mask-mode', value: 'match-source', raw: 'mask-match', arbitrary: false }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses mask-origin utilities', () => {
    const cases = [
      ['mask-origin-border', { type: 'mask-origin', value: 'border-box', raw: 'mask-origin-border', arbitrary: false }],
      ['mask-origin-padding', { type: 'mask-origin', value: 'padding-box', raw: 'mask-origin-padding', arbitrary: false }],
      ['mask-origin-content', { type: 'mask-origin', value: 'content-box', raw: 'mask-origin-content', arbitrary: false }],
      ['mask-origin-fill', { type: 'mask-origin', value: 'fill-box', raw: 'mask-origin-fill', arbitrary: false }],
      ['mask-origin-stroke', { type: 'mask-origin', value: 'stroke-box', raw: 'mask-origin-stroke', arbitrary: false }],
      ['mask-origin-view', { type: 'mask-origin', value: 'view-box', raw: 'mask-origin-view', arbitrary: false }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses mask-position utilities', () => {
    const cases = [
      ['mask-top-left', { type: 'mask-position', value: 'top left', raw: 'mask-top-left', arbitrary: false }],
      ['mask-top', { type: 'mask-position', value: 'top', raw: 'mask-top', arbitrary: false }],
      ['mask-top-right', { type: 'mask-position', value: 'top right', raw: 'mask-top-right', arbitrary: false }],
      ['mask-left', { type: 'mask-position', value: 'left', raw: 'mask-left', arbitrary: false }],
      ['mask-center', { type: 'mask-position', value: 'center', raw: 'mask-center', arbitrary: false }],
      ['mask-right', { type: 'mask-position', value: 'right', raw: 'mask-right', arbitrary: false }],
      ['mask-bottom-left', { type: 'mask-position', value: 'bottom left', raw: 'mask-bottom-left', arbitrary: false }],
      ['mask-bottom', { type: 'mask-position', value: 'bottom', raw: 'mask-bottom', arbitrary: false }],
      ['mask-bottom-right', { type: 'mask-position', value: 'bottom right', raw: 'mask-bottom-right', arbitrary: false }],
      ['mask-position-[center_top_1rem]', { type: 'mask-position', value: 'center_top_1rem', raw: 'mask-position-[center_top_1rem]', arbitrary: true }],
      ['mask-position-(--my-mask-position)', { type: 'mask-position', value: 'var(--my-mask-position)', raw: 'mask-position-(--my-mask-position)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses mask-repeat utilities', () => {
    const cases = [
      ['mask-repeat', { type: 'mask-repeat', value: 'repeat', raw: 'mask-repeat', arbitrary: false }],
      ['mask-no-repeat', { type: 'mask-repeat', value: 'no-repeat', raw: 'mask-no-repeat', arbitrary: false }],
      ['mask-repeat-x', { type: 'mask-repeat', value: 'repeat-x', raw: 'mask-repeat-x', arbitrary: false }],
      ['mask-repeat-y', { type: 'mask-repeat', value: 'repeat-y', raw: 'mask-repeat-y', arbitrary: false }],
      ['mask-repeat-space', { type: 'mask-repeat', value: 'space', raw: 'mask-repeat-space', arbitrary: false }],
      ['mask-repeat-round', { type: 'mask-repeat', value: 'round', raw: 'mask-repeat-round', arbitrary: false }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses mask-size utilities', () => {
    const cases = [
      ['mask-auto', { type: 'mask-size', value: 'auto', raw: 'mask-auto', arbitrary: false }],
      ['mask-cover', { type: 'mask-size', value: 'cover', raw: 'mask-cover', arbitrary: false }],
      ['mask-contain', { type: 'mask-size', value: 'contain', raw: 'mask-contain', arbitrary: false }],
      ['mask-size-[auto_100px]', { type: 'mask-size', value: 'auto_100px', raw: 'mask-size-[auto_100px]', arbitrary: true }],
      ['mask-size-(--my-mask-size)', { type: 'mask-size', value: 'var(--my-mask-size)', raw: 'mask-size-(--my-mask-size)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses mask-type utilities', () => {
    const cases = [
      ['mask-type-alpha', { type: 'mask-type', value: 'alpha', raw: 'mask-type-alpha', arbitrary: false }],
      ['mask-type-luminance', { type: 'mask-type', value: 'luminance', raw: 'mask-type-luminance', arbitrary: false }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses filter utilities', () => {
    const cases = [
      ['filter-none', { type: 'filter', value: 'none', raw: 'filter-none', arbitrary: false }],
      ["filter-[url('filters.svg#filter-id')]", { type: 'filter', value: "url('filters.svg#filter-id')", raw: "filter-[url('filters.svg#filter-id')]", arbitrary: true }],
      ['filter-(--my-filter)', { type: 'filter', value: 'var(--my-filter)', raw: 'filter-(--my-filter)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses brightness utilities', () => {
    const cases = [
      ['brightness-100', { type: 'brightness', value: '100', raw: 'brightness-100', arbitrary: false }],
      ['brightness-50', { type: 'brightness', value: '50', raw: 'brightness-50', arbitrary: false }],
      ['brightness-200', { type: 'brightness', value: '200', raw: 'brightness-200', arbitrary: false }],
      ['brightness-[1.75]', { type: 'brightness', value: '1.75', raw: 'brightness-[1.75]', arbitrary: true }],
      ['brightness-(--my-brightness)', { type: 'brightness', value: 'var(--my-brightness)', raw: 'brightness-(--my-brightness)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses contrast utilities', () => {
    const cases = [
      ['contrast-100', { type: 'contrast', value: '100', raw: 'contrast-100', arbitrary: false }],
      ['contrast-0', { type: 'contrast', value: '0', raw: 'contrast-0', arbitrary: false }],
      ['contrast-200', { type: 'contrast', value: '200', raw: 'contrast-200', arbitrary: false }],
      ['contrast-[.25]', { type: 'contrast', value: '.25', raw: 'contrast-[.25]', arbitrary: true }],
      ['contrast-(--my-contrast)', { type: 'contrast', value: 'var(--my-contrast)', raw: 'contrast-(--my-contrast)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses drop-shadow utilities', () => {
    const cases = [
      ['drop-shadow-md', { type: 'drop-shadow', preset: 'md', raw: 'drop-shadow-md', arbitrary: false }],
      ['drop-shadow-none', { type: 'drop-shadow', preset: 'none', raw: 'drop-shadow-none', arbitrary: false }],
      ['drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]', { type: 'drop-shadow', value: '0_35px_35px_rgba(0,0,0,0.25)', raw: 'drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]', arbitrary: true }],
      ['drop-shadow-(--my-drop-shadow)', { type: 'drop-shadow', value: 'var(--my-drop-shadow)', raw: 'drop-shadow-(--my-drop-shadow)', arbitrary: true }],
      ['drop-shadow-(color:--my-color)', { type: 'drop-shadow-color', value: 'var(--my-color)', raw: 'drop-shadow-(color:--my-color)', arbitrary: true }],
      ['drop-shadow-black', { type: 'drop-shadow-color', preset: 'black', raw: 'drop-shadow-black', arbitrary: false }],
      ['drop-shadow-indigo-500/50', { type: 'drop-shadow-color', preset: 'indigo-500/50', raw: 'drop-shadow-indigo-500/50', arbitrary: false }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses grayscale utilities', () => {
    const cases = [
      ['grayscale', { type: 'grayscale', value: '100', raw: 'grayscale', arbitrary: false }],
      ['grayscale-0', { type: 'grayscale', value: '0', raw: 'grayscale-0', arbitrary: false }],
      ['grayscale-50', { type: 'grayscale', value: '50', raw: 'grayscale-50', arbitrary: false }],
      ['grayscale-[0.5]', { type: 'grayscale', value: '0.5', raw: 'grayscale-[0.5]', arbitrary: true }],
      ['grayscale-(--my-grayscale)', { type: 'grayscale', value: 'var(--my-grayscale)', raw: 'grayscale-(--my-grayscale)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses hue-rotate utilities', () => {
    const cases = [
      ['hue-rotate-90', { type: 'hue-rotate', value: 90, negative: false, raw: 'hue-rotate-90', arbitrary: false }],
      ['-hue-rotate-15', { type: 'hue-rotate', value: 15, negative: true, raw: '-hue-rotate-15', arbitrary: false }],
      ['hue-rotate-[3.142rad]', { type: 'hue-rotate', value: '3.142rad', negative: false, raw: 'hue-rotate-[3.142rad]', arbitrary: true }],
      ['hue-rotate-(--my-hue-rotate)', { type: 'hue-rotate', value: 'var(--my-hue-rotate)', negative: false, raw: 'hue-rotate-(--my-hue-rotate)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input)).toEqual(expected);
    }
  });

  it('parses invert utilities', () => {
    const cases = [
      ['invert', { type: 'invert', value: '100', raw: 'invert', arbitrary: false }],
      ['invert-0', { type: 'invert', value: '0', raw: 'invert-0', arbitrary: false }],
      ['invert-50', { type: 'invert', value: '50', raw: 'invert-50', arbitrary: false }],
      ['invert-[.25]', { type: 'invert', value: '.25', raw: 'invert-[.25]', arbitrary: true }],
      ['invert-(--my-inversion)', { type: 'invert', value: 'var(--my-inversion)', raw: 'invert-(--my-inversion)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses saturate utilities', () => {
    const cases = [
      ['saturate-100', { type: 'saturate', value: '100', raw: 'saturate-100', arbitrary: false }],
      ['saturate-0', { type: 'saturate', value: '0', raw: 'saturate-0', arbitrary: false }],
      ['saturate-200', { type: 'saturate', value: '200', raw: 'saturate-200', arbitrary: false }],
      ['saturate-[.25]', { type: 'saturate', value: '.25', raw: 'saturate-[.25]', arbitrary: true }],
      ['saturate-(--my-saturation)', { type: 'saturate', value: 'var(--my-saturation)', raw: 'saturate-(--my-saturation)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses sepia utilities', () => {
    const cases = [
      ['sepia', { type: 'sepia', value: '100', raw: 'sepia', arbitrary: false }],
      ['sepia-0', { type: 'sepia', value: '0', raw: 'sepia-0', arbitrary: false }],
      ['sepia-100', { type: 'sepia', value: '100', raw: 'sepia-100', arbitrary: false }],
      ['sepia-[.25]', { type: 'sepia', value: '.25', raw: 'sepia-[.25]', arbitrary: true }],
      ['sepia-(--my-sepia)', { type: 'sepia', value: 'var(--my-sepia)', raw: 'sepia-(--my-sepia)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses backdrop-filter utilities', () => {
    const cases = [
      ['backdrop-filter-none', { type: 'backdrop-filter', value: 'none', raw: 'backdrop-filter-none', arbitrary: false }],
      ["backdrop-filter-[url('filters.svg#filter-id')]", { type: 'backdrop-filter', value: "url('filters.svg#filter-id')", raw: "backdrop-filter-[url('filters.svg#filter-id')]", arbitrary: true }],
      ['backdrop-filter-(--my-backdrop-filter)', { type: 'backdrop-filter', value: 'var(--my-backdrop-filter)', raw: 'backdrop-filter-(--my-backdrop-filter)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses backdrop-blur utilities', () => {
    const cases = [
      ['backdrop-blur-none', { type: 'backdrop-blur', preset: 'none', raw: 'backdrop-blur-none', arbitrary: false }],
      ['backdrop-blur-xs', { type: 'backdrop-blur', preset: 'xs', raw: 'backdrop-blur-xs', arbitrary: false }],
      ['backdrop-blur-sm', { type: 'backdrop-blur', preset: 'sm', raw: 'backdrop-blur-sm', arbitrary: false }],
      ['backdrop-blur-md', { type: 'backdrop-blur', preset: 'md', raw: 'backdrop-blur-md', arbitrary: false }],
      ['backdrop-blur-lg', { type: 'backdrop-blur', preset: 'lg', raw: 'backdrop-blur-lg', arbitrary: false }],
      ['backdrop-blur-xl', { type: 'backdrop-blur', preset: 'xl', raw: 'backdrop-blur-xl', arbitrary: false }],
      ['backdrop-blur-2xl', { type: 'backdrop-blur', preset: '2xl', raw: 'backdrop-blur-2xl', arbitrary: false }],
      ['backdrop-blur-3xl', { type: 'backdrop-blur', preset: '3xl', raw: 'backdrop-blur-3xl', arbitrary: false }],
      ['backdrop-blur-[2px]', { type: 'backdrop-blur', value: '2px', raw: 'backdrop-blur-[2px]', arbitrary: true }],
      ['backdrop-blur-(--my-blur)', { type: 'backdrop-blur', value: 'var(--my-blur)', raw: 'backdrop-blur-(--my-blur)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toEqual(expected);
    }
  });

  it('parses backdrop-brightness utilities', () => {
    const cases = [
      ['backdrop-brightness-50', { type: 'backdrop-brightness', value: '50', raw: 'backdrop-brightness-50', arbitrary: false }],
      ['backdrop-brightness-150', { type: 'backdrop-brightness', value: '150', raw: 'backdrop-brightness-150', arbitrary: false }],
      ['backdrop-brightness-[1.75]', { type: 'backdrop-brightness', value: '1.75', raw: 'backdrop-brightness-[1.75]', arbitrary: true }],
      ['backdrop-brightness-(--my-brightness)', { type: 'backdrop-brightness', value: 'var(--my-brightness)', raw: 'backdrop-brightness-(--my-brightness)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses backdrop-contrast utilities', () => {
    const cases = [
      ['backdrop-contrast-50', { type: 'backdrop-contrast', value: '50', raw: 'backdrop-contrast-50', arbitrary: false }],
      ['backdrop-contrast-200', { type: 'backdrop-contrast', value: '200', raw: 'backdrop-contrast-200', arbitrary: false }],
      ['backdrop-contrast-[.25]', { type: 'backdrop-contrast', value: '.25', raw: 'backdrop-contrast-[.25]', arbitrary: true }],
      ['backdrop-contrast-(--my-contrast)', { type: 'backdrop-contrast', value: 'var(--my-contrast)', raw: 'backdrop-contrast-(--my-contrast)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses backdrop-grayscale utilities', () => {
    const cases = [
      ['backdrop-grayscale', { type: 'backdrop-grayscale', value: '100', raw: 'backdrop-grayscale', arbitrary: false, default: true }],
      ['backdrop-grayscale-0', { type: 'backdrop-grayscale', value: '0', raw: 'backdrop-grayscale-0', arbitrary: false }],
      ['backdrop-grayscale-50', { type: 'backdrop-grayscale', value: '50', raw: 'backdrop-grayscale-50', arbitrary: false }],
      ['backdrop-grayscale-[0.5]', { type: 'backdrop-grayscale', value: '0.5', raw: 'backdrop-grayscale-[0.5]', arbitrary: true }],
      ['backdrop-grayscale-(--my-grayscale)', { type: 'backdrop-grayscale', value: 'var(--my-grayscale)', raw: 'backdrop-grayscale-(--my-grayscale)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses backdrop-hue-rotate utilities', () => {
    const cases = [
      ['backdrop-hue-rotate-90', { type: 'backdrop-hue-rotate', value: '90', negative: false, raw: 'backdrop-hue-rotate-90', arbitrary: false }],
      ['backdrop-hue-rotate-180', { type: 'backdrop-hue-rotate', value: '180', negative: false, raw: 'backdrop-hue-rotate-180', arbitrary: false }],
      ['-backdrop-hue-rotate-90', { type: 'backdrop-hue-rotate', value: '90', negative: true, raw: '-backdrop-hue-rotate-90', arbitrary: false }],
      ['-backdrop-hue-rotate-15', { type: 'backdrop-hue-rotate', value: '15', negative: true, raw: '-backdrop-hue-rotate-15', arbitrary: false }],
      ['backdrop-hue-rotate-[3.142rad]', { type: 'backdrop-hue-rotate', value: '3.142rad', raw: 'backdrop-hue-rotate-[3.142rad]', arbitrary: true }],
      ['backdrop-hue-rotate-(--my-hue)', { type: 'backdrop-hue-rotate', value: 'var(--my-hue)', raw: 'backdrop-hue-rotate-(--my-hue)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses backdrop-invert utilities', () => {
    const cases = [
      ['backdrop-invert', { type: 'backdrop-invert', value: '100', raw: 'backdrop-invert', arbitrary: false, default: true }],
      ['backdrop-invert-0', { type: 'backdrop-invert', value: '0', raw: 'backdrop-invert-0', arbitrary: false }],
      ['backdrop-invert-65', { type: 'backdrop-invert', value: '65', raw: 'backdrop-invert-65', arbitrary: false }],
      ['backdrop-invert-[.25]', { type: 'backdrop-invert', value: '.25', raw: 'backdrop-invert-[.25]', arbitrary: true }],
      ['backdrop-invert-(--my-invert)', { type: 'backdrop-invert', value: 'var(--my-invert)', raw: 'backdrop-invert-(--my-invert)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses backdrop-opacity utilities', () => {
    const cases = [
      ['backdrop-opacity-10', { type: 'backdrop-opacity', value: '10', raw: 'backdrop-opacity-10', arbitrary: false }],
      ['backdrop-opacity-95', { type: 'backdrop-opacity', value: '95', raw: 'backdrop-opacity-95', arbitrary: false }],
      ['backdrop-opacity-[.15]', { type: 'backdrop-opacity', value: '.15', raw: 'backdrop-opacity-[.15]', arbitrary: true }],
      ['backdrop-opacity-(--my-opacity)', { type: 'backdrop-opacity', value: 'var(--my-opacity)', raw: 'backdrop-opacity-(--my-opacity)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses backdrop-saturate utilities', () => {
    const cases = [
      ['backdrop-saturate-50', { type: 'backdrop-saturate', value: '50', raw: 'backdrop-saturate-50', arbitrary: false }],
      ['backdrop-saturate-200', { type: 'backdrop-saturate', value: '200', raw: 'backdrop-saturate-200', arbitrary: false }],
      ['backdrop-saturate-[.25]', { type: 'backdrop-saturate', value: '.25', raw: 'backdrop-saturate-[.25]', arbitrary: true }],
      ['backdrop-saturate-(--my-saturate)', { type: 'backdrop-saturate', value: 'var(--my-saturate)', raw: 'backdrop-saturate-(--my-saturate)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses backdrop-sepia utilities', () => {
    const cases = [
      ['backdrop-sepia', { type: 'backdrop-sepia', value: '100', raw: 'backdrop-sepia', arbitrary: false, default: true }],
      ['backdrop-sepia-0', { type: 'backdrop-sepia', value: '0', raw: 'backdrop-sepia-0', arbitrary: false }],
      ['backdrop-sepia-50', { type: 'backdrop-sepia', value: '50', raw: 'backdrop-sepia-50', arbitrary: false }],
      ['backdrop-sepia-[.25]', { type: 'backdrop-sepia', value: '.25', raw: 'backdrop-sepia-[.25]', arbitrary: true }],
      ['backdrop-sepia-(--my-sepia)', { type: 'backdrop-sepia', value: 'var(--my-sepia)', raw: 'backdrop-sepia-(--my-sepia)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses border-collapse utilities', () => {
    const cases = [
      ['border-collapse', { type: 'border-collapse', value: 'collapse', raw: 'border-collapse' }],
      ['border-separate', { type: 'border-collapse', value: 'separate', raw: 'border-separate' }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses border-spacing utilities', () => {
    const cases = [
      ['border-spacing-2', { type: 'border-spacing', axis: 'both', value: '2', raw: 'border-spacing-2', arbitrary: false }],
      ['border-spacing-[7px]', { type: 'border-spacing', axis: 'both', value: '7px', raw: 'border-spacing-[7px]', arbitrary: true }],
      ['border-spacing-(--my-spacing)', { type: 'border-spacing', axis: 'both', value: 'var(--my-spacing)', raw: 'border-spacing-(--my-spacing)', arbitrary: true }],
      ['border-spacing-x-3', { type: 'border-spacing', axis: 'x', value: '3', raw: 'border-spacing-x-3', arbitrary: false }],
      ['border-spacing-x-[2em]', { type: 'border-spacing', axis: 'x', value: '2em', raw: 'border-spacing-x-[2em]', arbitrary: true }],
      ['border-spacing-x-(--foo)', { type: 'border-spacing', axis: 'x', value: 'var(--foo)', raw: 'border-spacing-x-(--foo)', arbitrary: true }],
      ['border-spacing-y-4', { type: 'border-spacing', axis: 'y', value: '4', raw: 'border-spacing-y-4', arbitrary: false }],
      ['border-spacing-y-[1.5rem]', { type: 'border-spacing', axis: 'y', value: '1.5rem', raw: 'border-spacing-y-[1.5rem]', arbitrary: true }],
      ['border-spacing-y-(--bar)', { type: 'border-spacing', axis: 'y', value: 'var(--bar)', raw: 'border-spacing-y-(--bar)', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses table-layout utilities', () => {
    const cases = [
      ['table-auto', { type: 'table-layout', value: 'auto', raw: 'table-auto' }],
      ['table-fixed', { type: 'table-layout', value: 'fixed', raw: 'table-fixed' }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses caption-side utilities', () => {
    const cases = [
      ['caption-top', { type: 'caption-side', value: 'top', raw: 'caption-top' }],
      ['caption-bottom', { type: 'caption-side', value: 'bottom', raw: 'caption-bottom' }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses transition-property utilities', () => {
    const cases = [
      ['transition', { type: 'transition-property', preset: 'transition', raw: 'transition' }],
      ['transition-all', { type: 'transition-property', preset: 'transition-all', raw: 'transition-all' }],
      ['transition-colors', { type: 'transition-property', preset: 'transition-colors', raw: 'transition-colors' }],
      ['transition-opacity', { type: 'transition-property', preset: 'transition-opacity', raw: 'transition-opacity' }],
      ['transition-shadow', { type: 'transition-property', preset: 'transition-shadow', raw: 'transition-shadow' }],
      ['transition-transform', { type: 'transition-property', preset: 'transition-transform', raw: 'transition-transform' }],
      ['transition-none', { type: 'transition-property', preset: 'transition-none', raw: 'transition-none' }],
      ['transition-[height]', { type: 'transition-property', value: 'height', raw: 'transition-[height]', arbitrary: true }],
      ['transition-(--my-prop)', { type: 'transition-property', value: 'var(--my-prop)', raw: 'transition-(--my-prop)', arbitrary: false, customProperty: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses transition-behavior utilities', () => {
    const cases = [
      ['transition-normal', { type: 'transition-behavior', value: 'normal', raw: 'transition-normal', preset: 'transition-normal' }],
      ['transition-discrete', { type: 'transition-behavior', value: 'allow-discrete', raw: 'transition-discrete', preset: 'transition-discrete' }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses transition-duration utilities', () => {
    const cases = [
      ['duration-150', { type: 'transition-duration', value: '150ms', raw: 'duration-150', preset: true }],
      ['duration-700', { type: 'transition-duration', value: '700ms', raw: 'duration-700', preset: true }],
      ['duration-initial', { type: 'transition-duration', value: 'initial', raw: 'duration-initial', preset: true }],
      ['duration-(--my-duration)', { type: 'transition-duration', value: 'var(--my-duration)', raw: 'duration-(--my-duration)', customProperty: true, arbitrary: false }],
      ['duration-[1s,15s]', { type: 'transition-duration', value: '1s,15s', raw: 'duration-[1s,15s]', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses transition-delay utilities', () => {
    const cases = [
      ['delay-150', { type: 'transition-delay', value: '150ms', raw: 'delay-150', preset: true }],
      ['delay-700', { type: 'transition-delay', value: '700ms', raw: 'delay-700', preset: true }],
      ['delay-(--my-delay)', { type: 'transition-delay', value: 'var(--my-delay)', raw: 'delay-(--my-delay)', customProperty: true, arbitrary: false }],
      ['delay-[1s,250ms]', { type: 'transition-delay', value: '1s,250ms', raw: 'delay-[1s,250ms]', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses animation utilities', () => {
    const cases = [
      ['animate-spin', { type: 'animation', value: 'var(--animate-spin)', raw: 'animate-spin', preset: 'animate-spin' }],
      ['animate-ping', { type: 'animation', value: 'var(--animate-ping)', raw: 'animate-ping', preset: 'animate-ping' }],
      ['animate-pulse', { type: 'animation', value: 'var(--animate-pulse)', raw: 'animate-pulse', preset: 'animate-pulse' }],
      ['animate-bounce', { type: 'animation', value: 'var(--animate-bounce)', raw: 'animate-bounce', preset: 'animate-bounce' }],
      ['animate-none', { type: 'animation', value: 'none', raw: 'animate-none', preset: 'animate-none' }],
      ['animate-(--my-animation)', { type: 'animation', value: 'var(--my-animation)', raw: 'animate-(--my-animation)', customProperty: true, arbitrary: false }],
      ['animate-[wiggle_1s_ease-in-out_infinite]', { type: 'animation', value: 'wiggle_1s_ease-in-out_infinite', raw: 'animate-[wiggle_1s_ease-in-out_infinite]', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses backface-visibility utilities', () => {
    const cases = [
      ['backface-hidden', { type: 'backface-visibility', value: 'hidden', raw: 'backface-hidden', preset: 'backface-hidden' }],
      ['backface-visible', { type: 'backface-visibility', value: 'visible', raw: 'backface-visible', preset: 'backface-visible' }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses perspective utilities', () => {
    const cases = [
      ['perspective-dramatic', { type: 'perspective', value: 'var(--perspective-dramatic)', raw: 'perspective-dramatic', preset: 'perspective-dramatic' }],
      ['perspective-near', { type: 'perspective', value: 'var(--perspective-near)', raw: 'perspective-near', preset: 'perspective-near' }],
      ['perspective-normal', { type: 'perspective', value: 'var(--perspective-normal)', raw: 'perspective-normal', preset: 'perspective-normal' }],
      ['perspective-midrange', { type: 'perspective', value: 'var(--perspective-midrange)', raw: 'perspective-midrange', preset: 'perspective-midrange' }],
      ['perspective-distant', { type: 'perspective', value: 'var(--perspective-distant)', raw: 'perspective-distant', preset: 'perspective-distant' }],
      ['perspective-none', { type: 'perspective', value: 'none', raw: 'perspective-none', preset: 'perspective-none' }],
      ['perspective-(--my-perspective)', { type: 'perspective', value: 'var(--my-perspective)', raw: 'perspective-(--my-perspective)', customProperty: true, arbitrary: false }],
      ['perspective-[750px]', { type: 'perspective', value: '750px', raw: 'perspective-[750px]', arbitrary: true }],
    ];
    for (const [input, expected] of cases) {
      expect(parseUtility(input as string)).toMatchObject(expected);
    }
  });

  it('parses perspective-origin utilities', () => {
    expect(parseUtility('perspective-origin-center')).toMatchObject({ type: 'perspective-origin', value: 'center' });
    expect(parseUtility('perspective-origin-top-right')).toMatchObject({ type: 'perspective-origin', value: 'top right' });
    expect(parseUtility('perspective-origin-(--my-perspective-origin)')).toMatchObject({ type: 'perspective-origin', value: 'var(--my-perspective-origin)' });
    expect(parseUtility('perspective-origin-[200%_150%]')).toMatchObject({ type: 'perspective-origin', value: '200%_150%' });
  });

  it('parses rotate utilities', () => {
    expect(parseUtility('rotate-45')).toMatchObject({ type: 'rotate', value: '45deg' });
    expect(parseUtility('-rotate-90')).toMatchObject({ type: 'rotate', value: 'calc(90deg * -1)' });
    expect(parseUtility('rotate-x-30')).toMatchObject({ type: 'rotate-x', value: '30deg' });
    expect(parseUtility('-rotate-x-15')).toMatchObject({ type: 'rotate-x', value: '-15deg' });
    expect(parseUtility('rotate-y-60')).toMatchObject({ type: 'rotate-y', value: '60deg' });
    expect(parseUtility('-rotate-y-10')).toMatchObject({ type: 'rotate-y', value: '-10deg' });
    expect(parseUtility('rotate-z-120')).toMatchObject({ type: 'rotate-z', value: '120deg' });
    expect(parseUtility('-rotate-z-45')).toMatchObject({ type: 'rotate-z', value: '-45deg' });
    expect(parseUtility('rotate-(--my-rotation)')).toMatchObject({ type: 'rotate', value: 'var(--my-rotation)' });
    expect(parseUtility('rotate-x-(--my-rotation-x)')).toMatchObject({ type: 'rotate-x', value: 'var(--my-rotation-x)' });
    expect(parseUtility('rotate-y-(--my-rotation-y)')).toMatchObject({ type: 'rotate-y', value: 'var(--my-rotation-y)' });
    expect(parseUtility('rotate-z-(--my-rotation-z)')).toMatchObject({ type: 'rotate-z', value: 'var(--my-rotation-z)' });
    expect(parseUtility('rotate-[3.142rad]')).toMatchObject({ type: 'rotate', value: '3.142rad' });
    expect(parseUtility('rotate-x-[1.5turn]')).toMatchObject({ type: 'rotate-x', value: '1.5turn' });
    expect(parseUtility('rotate-y-[2rad]')).toMatchObject({ type: 'rotate-y', value: '2rad' });
    expect(parseUtility('rotate-z-[.5turn]')).toMatchObject({ type: 'rotate-z', value: '.5turn' });
  });

  it('parses scale utilities', () => {
    expect(parseUtility('scale-75')).toMatchObject({ type: 'scale', value: '75% 75%' });
    expect(parseUtility('-scale-100')).toMatchObject({ type: 'scale', value: 'calc(100% * -1) calc(100% * -1)' });
    expect(parseUtility('scale-x-80')).toMatchObject({ type: 'scale-x', value: '80% var(--tw-scale-y)' });
    expect(parseUtility('-scale-x-120')).toMatchObject({ type: 'scale-x', value: 'calc(120% * -1) var(--tw-scale-y)' });
    expect(parseUtility('scale-y-110')).toMatchObject({ type: 'scale-y', value: 'var(--tw-scale-x) 110%' });
    expect(parseUtility('-scale-y-90')).toMatchObject({ type: 'scale-y', value: 'var(--tw-scale-x) calc(90% * -1)' });
    expect(parseUtility('scale-z-105')).toMatchObject({ type: 'scale-z', value: 'var(--tw-scale-x) var(--tw-scale-y) 105%' });
    expect(parseUtility('-scale-z-95')).toMatchObject({ type: 'scale-z', value: 'var(--tw-scale-x) var(--tw-scale-y) calc(95% * -1)' });
    expect(parseUtility('scale-3d')).toMatchObject({ type: 'scale-3d', value: 'var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)' });
    expect(parseUtility('scale-(--my-scale)')).toMatchObject({ type: 'scale', value: 'var(--my-scale) var(--my-scale)' });
    expect(parseUtility('scale-x-(--my-scale-x)')).toMatchObject({ type: 'scale-x', value: 'var(--my-scale-x) var(--tw-scale-y)' });
    expect(parseUtility('scale-y-(--my-scale-y)')).toMatchObject({ type: 'scale-y', value: 'var(--tw-scale-x) var(--my-scale-y)' });
    expect(parseUtility('scale-z-(--my-scale-z)')).toMatchObject({ type: 'scale-z', value: 'var(--tw-scale-x) var(--tw-scale-y) var(--my-scale-z)' });
    expect(parseUtility('scale-[1.7]')).toMatchObject({ type: 'scale', value: '1.7' });
    expect(parseUtility('scale-x-[2.5]')).toMatchObject({ type: 'scale-x', value: '2.5 var(--tw-scale-y)' });
    expect(parseUtility('scale-y-[0.8]')).toMatchObject({ type: 'scale-y', value: 'var(--tw-scale-x) 0.8' });
    expect(parseUtility('scale-z-[1.2]')).toMatchObject({ type: 'scale-z', value: 'var(--tw-scale-x) var(--tw-scale-y) 1.2' });
  });

  it('parses skew utilities', () => {
    expect(parseUtility('skew-10')).toMatchObject({ type: 'skew', value: 'skewX(10deg) skewY(10deg)' });
    expect(parseUtility('-skew-8')).toMatchObject({ type: 'skew', value: 'skewX(-8deg) skewY(-8deg)' });
    expect(parseUtility('skew-x-12')).toMatchObject({ type: 'skew-x', value: 'skewX(12deg)' });
    expect(parseUtility('-skew-x-6')).toMatchObject({ type: 'skew-x', value: 'skewX(-6deg)' });
    expect(parseUtility('skew-y-7')).toMatchObject({ type: 'skew-y', value: 'skewY(7deg)' });
    expect(parseUtility('-skew-y-3')).toMatchObject({ type: 'skew-y', value: 'skewY(-3deg)' });
    expect(parseUtility('skew-(--my-skew)')).toMatchObject({ type: 'skew', value: 'skewX(var(--my-skew)) skewY(var(--my-skew))' });
    expect(parseUtility('skew-x-(--my-skew-x)')).toMatchObject({ type: 'skew-x', value: 'skewX(var(--my-skew-x))' });
    expect(parseUtility('skew-y-(--my-skew-y)')).toMatchObject({ type: 'skew-y', value: 'skewY(var(--my-skew-y))' });
    expect(parseUtility('skew-[3.142rad]')).toMatchObject({ type: 'skew', value: 'skewX(3.142rad) skewY(3.142rad)' });
    expect(parseUtility('skew-x-[1.5turn]')).toMatchObject({ type: 'skew-x', value: 'skewX(1.5turn)' });
    expect(parseUtility('skew-y-[2rad]')).toMatchObject({ type: 'skew-y', value: 'skewY(2rad)' });
  });

  it('parses transform utilities', () => {
    expect(parseUtility('transform-none')).toMatchObject({ type: 'transform', value: 'none' });
    expect(parseUtility('transform-gpu')).toMatchObject({ type: 'transform', value: 'translateZ(0) var(--tw-rotate-x) var(--tw-rotate-y) var(--tw-rotate-z) var(--tw-skew-x) var(--tw-skew-y)' });
    expect(parseUtility('transform-cpu')).toMatchObject({ type: 'transform', value: 'var(--tw-rotate-x) var(--tw-rotate-y) var(--tw-rotate-z) var(--tw-skew-x) var(--tw-skew-y)' });
    expect(parseUtility('transform-(--my-transform)')).toMatchObject({ type: 'transform', value: 'var(--my-transform)' });
    expect(parseUtility('transform-[matrix(1,2,3,4,5,6)]')).toMatchObject({ type: 'transform', value: 'matrix(1,2,3,4,5,6)' });
  });

  it('parses transform-origin utilities', () => {
    expect(parseUtility('origin-center')).toMatchObject({ type: 'transform-origin', value: 'center' });
    expect(parseUtility('origin-top-right')).toMatchObject({ type: 'transform-origin', value: 'top right' });
    expect(parseUtility('origin-(--my-transform-origin)')).toMatchObject({ type: 'transform-origin', value: 'var(--my-transform-origin)' });
    expect(parseUtility('origin-[33%_75%]')).toMatchObject({ type: 'transform-origin', value: '33%_75%' });
  });

  it('parses transform-style utilities', () => {
    expect(parseUtility('transform-3d')).toMatchObject({ type: 'transform-style', value: 'preserve-3d' });
    expect(parseUtility('transform-flat')).toMatchObject({ type: 'transform-style', value: 'flat' });
  });

  it('parses translate utilities (integration)', () => {
    expect(parseUtility('translate-2')).toMatchObject({ type: 'translate', value: expect.any(String) });
    expect(parseUtility('-translate-4')).toMatchObject({ type: 'translate', value: expect.any(String) });
    expect(parseUtility('translate-x-1/2')).toMatchObject({ type: 'translate-x', value: expect.any(String) });
    expect(parseUtility('translate-y-full')).toMatchObject({ type: 'translate-y', value: expect.any(String) });
    expect(parseUtility('translate-z-8')).toMatchObject({ type: 'translate-z', value: expect.any(String) });
    expect(parseUtility('translate-none')).toMatchObject({ type: 'translate', value: 'none' });
  });

  it('parses appearance utilities (integration)', () => {
    expect(parseUtility('appearance-none')).toMatchObject({ type: 'appearance', value: 'none' });
    expect(parseUtility('appearance-auto')).toMatchObject({ type: 'appearance', value: 'auto' });
  });

  it('parses caret-color utilities (integration)', () => {
    expect(parseUtility('caret-inherit')).toMatchObject({ type: 'caret-color', value: 'inherit' });
    expect(parseUtility('caret-current')).toMatchObject({ type: 'caret-color', value: 'currentColor' });
    expect(parseUtility('caret-transparent')).toMatchObject({ type: 'caret-color', value: 'transparent' });
    expect(parseUtility('caret-black')).toMatchObject({ type: 'caret-color', value: expect.any(String) });
    expect(parseUtility('caret-white')).toMatchObject({ type: 'caret-color', value: expect.any(String) });
    expect(parseUtility('caret-red-500')).toMatchObject({ type: 'caret-color', value: expect.any(String) });
    expect(parseUtility('caret-(--my-caret-color)')).toMatchObject({ type: 'caret-color', value: expect.any(String), customProperty: true });
    expect(parseUtility('caret-[#50d71e]')).toMatchObject({ type: 'caret-color', value: '#50d71e', arbitrary: true });
  });

  it('parses color-scheme utilities (integration)', () => {
    expect(parseUtility('scheme-normal')).toMatchObject({ type: 'color-scheme', value: 'normal' });
    expect(parseUtility('scheme-dark')).toMatchObject({ type: 'color-scheme', value: 'dark' });
    expect(parseUtility('scheme-light')).toMatchObject({ type: 'color-scheme', value: 'light' });
    expect(parseUtility('scheme-light-dark')).toMatchObject({ type: 'color-scheme', value: 'light dark' });
    expect(parseUtility('scheme-only-dark')).toMatchObject({ type: 'color-scheme', value: 'only dark' });
    expect(parseUtility('scheme-only-light')).toMatchObject({ type: 'color-scheme', value: 'only light' });
  });

  it('parses cursor utilities (integration)', () => {
    expect(parseUtility('cursor-pointer')).toMatchObject({ type: 'cursor', value: 'pointer' });
    expect(parseUtility('cursor-default')).toMatchObject({ type: 'cursor', value: 'default' });
    expect(parseUtility('cursor-grab')).toMatchObject({ type: 'cursor', value: 'grab' });
    expect(parseUtility('cursor-nwse-resize')).toMatchObject({ type: 'cursor', value: 'nwse-resize' });
    expect(parseUtility('cursor-zoom-in')).toMatchObject({ type: 'cursor', value: 'zoom-in' });
    expect(parseUtility('cursor-(--my-cursor)')).toMatchObject({ type: 'cursor', value: expect.any(String), customProperty: true });
    expect(parseUtility('cursor-[url(hand.cur),_pointer]')).toMatchObject({ type: 'cursor', value: 'url(hand.cur),_pointer', arbitrary: true });
  });

  it('parses field-sizing utilities (integration)', () => {
    expect(parseUtility('field-sizing-fixed')).toMatchObject({ type: 'field-sizing', value: 'fixed' });
    expect(parseUtility('field-sizing-content')).toMatchObject({ type: 'field-sizing', value: 'content' });
  });

  it('parses pointer-events utilities (integration)', () => {
    expect(parseUtility('pointer-events-auto')).toMatchObject({ type: 'pointer-events', value: 'auto' });
    expect(parseUtility('pointer-events-none')).toMatchObject({ type: 'pointer-events', value: 'none' });
  });

  it('parses resize utilities (integration)', () => {
    expect(parseUtility('resize')).toMatchObject({ type: 'resize', value: 'both' });
    expect(parseUtility('resize-x')).toMatchObject({ type: 'resize', value: 'horizontal' });
    expect(parseUtility('resize-y')).toMatchObject({ type: 'resize', value: 'vertical' });
    expect(parseUtility('resize-none')).toMatchObject({ type: 'resize', value: 'none' });
  });

  it('parses scroll-behavior utilities (integration)', () => {
    expect(parseUtility('scroll-auto')).toMatchObject({ type: 'scroll-behavior', value: 'auto' });
    expect(parseUtility('scroll-smooth')).toMatchObject({ type: 'scroll-behavior', value: 'smooth' });
  });

  it('parses scroll-margin utilities (integration)', () => {
    expect(parseUtility('scroll-m-4')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin', value: expect.any(String) });
    expect(parseUtility('-scroll-m-4')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin', value: expect.any(String), negative: true });
    expect(parseUtility('scroll-mx-2')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-inline', value: expect.any(String) });
    expect(parseUtility('scroll-my-3')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-block', value: expect.any(String) });
    expect(parseUtility('scroll-ms-1')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-inline-start', value: expect.any(String) });
    expect(parseUtility('scroll-me-5')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-inline-end', value: expect.any(String) });
    expect(parseUtility('scroll-mt-6')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-top', value: expect.any(String) });
    expect(parseUtility('scroll-mr-7')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-right', value: expect.any(String) });
    expect(parseUtility('scroll-mb-8')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-bottom', value: expect.any(String) });
    expect(parseUtility('scroll-ml-9')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-left', value: expect.any(String) });
    expect(parseUtility('scroll-mt-(--foo)')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-top', value: 'var(--foo)', customProperty: true });
    expect(parseUtility('scroll-mx-(--bar)')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-inline', value: 'var(--bar)', customProperty: true });
    expect(parseUtility('scroll-mb-[24rem]')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-bottom', value: '24rem', arbitrary: true });
    expect(parseUtility('scroll-ml-[var(--my-scroll-margin)]')).toMatchObject({ type: 'scroll-margin', property: 'scroll-margin-left', value: 'var(--my-scroll-margin)', arbitrary: true });
  });

  it('parses scroll-padding utilities (integration)', () => {
    expect(parseUtility('scroll-p-4')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding', value: expect.any(String) });
    expect(parseUtility('-scroll-p-4')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding', value: expect.any(String), negative: true });
    expect(parseUtility('scroll-px-2')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-inline', value: expect.any(String) });
    expect(parseUtility('scroll-py-3')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-block', value: expect.any(String) });
    expect(parseUtility('scroll-ps-1')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-inline-start', value: expect.any(String) });
    expect(parseUtility('scroll-pe-5')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-inline-end', value: expect.any(String) });
    expect(parseUtility('scroll-pt-6')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-top', value: expect.any(String) });
    expect(parseUtility('scroll-pr-7')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-right', value: expect.any(String) });
    expect(parseUtility('scroll-pb-8')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-bottom', value: expect.any(String) });
    expect(parseUtility('scroll-pl-9')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-left', value: expect.any(String) });
    expect(parseUtility('scroll-pt-(--foo)')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-top', value: 'var(--foo)', customProperty: true });
    expect(parseUtility('scroll-px-(--bar)')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-inline', value: 'var(--bar)', customProperty: true });
    expect(parseUtility('scroll-pb-[24rem]')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-bottom', value: '24rem', arbitrary: true });
    expect(parseUtility('scroll-pl-[var(--my-scroll-padding)]')).toMatchObject({ type: 'scroll-padding', property: 'scroll-padding-left', value: 'var(--my-scroll-padding)', arbitrary: true });
  });
}); 