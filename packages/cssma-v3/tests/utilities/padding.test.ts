import { describe, it, expect } from 'vitest';
import { parsePadding } from '../../src/parser/utilities/padding';

describe('parsePaddingUtility', () => {
  it('parses p-<number>', () => {
    expect(parsePadding('p-4')).toEqual({
      type: 'padding',
      value: 4,
      direction: 'all',
      raw: 'p-4',
      arbitrary: false,
    });
  });
  it('parses p-px', () => {
    expect(parsePadding('p-px')).toEqual({
      type: 'padding',
      preset: 'px',
      direction: 'all',
      raw: 'p-px',
      arbitrary: false,
    });
  });
  it('parses p-(<custom-property>)', () => {
    expect(parsePadding('p-(--my-padding)')).toEqual({
      type: 'padding',
      value: 'var(--my-padding)',
      direction: 'all',
      raw: 'p-(--my-padding)',
      arbitrary: false,
    });
  });
  it('parses p-[<value>]', () => {
    expect(parsePadding('p-[5px]')).toEqual({
      type: 'padding',
      value: '5px',
      direction: 'all',
      raw: 'p-[5px]',
      arbitrary: true,
    });
  });
  it('parses px-<number>', () => {
    expect(parsePadding('px-2')).toEqual({
      type: 'padding',
      value: 2,
      direction: 'inline',
      raw: 'px-2',
      arbitrary: false,
    });
  });
  it('parses py-px', () => {
    expect(parsePadding('py-px')).toEqual({
      type: 'padding',
      preset: 'px',
      direction: 'block',
      raw: 'py-px',
      arbitrary: false,
    });
  });
  it('parses ps-(<custom-property>)', () => {
    expect(parsePadding('ps-(--pad)')).toEqual({
      type: 'padding',
      value: 'var(--pad)',
      direction: 'inline-start',
      raw: 'ps-(--pad)',
      arbitrary: false,
    });
  });
  it('parses pe-[<value>]', () => {
    expect(parsePadding('pe-[2em]')).toEqual({
      type: 'padding',
      value: '2em',
      direction: 'inline-end',
      raw: 'pe-[2em]',
      arbitrary: true,
    });
  });
  it('parses pt-<number>', () => {
    expect(parsePadding('pt-6')).toEqual({
      type: 'padding',
      value: 6,
      direction: 'top',
      raw: 'pt-6',
      arbitrary: false,
    });
  });
  it('parses pr-px', () => {
    expect(parsePadding('pr-px')).toEqual({
      type: 'padding',
      preset: 'px',
      direction: 'right',
      raw: 'pr-px',
      arbitrary: false,
    });
  });
  it('parses pb-(<custom-property>)', () => {
    // eslint-disable-next-line no-console
    console.log('TEST pb-(--foo):', parsePadding('pb-(--foo)'));
    expect(parsePadding('pb-(--foo)')).toEqual({
      type: 'padding',
      value: 'var(--foo)',
      direction: 'bottom',
      raw: 'pb-(--foo)',
      arbitrary: false,
    });
  });
  it('parses pb-( --foo ) with whitespace', () => {
    expect(parsePadding('pb-( --foo )')).toEqual({
      type: 'padding',
      value: 'var(--foo)',
      direction: 'bottom',
      raw: 'pb-( --foo )',
      arbitrary: false,
    });
  });
  it('parses pl-[<value>]', () => {
    expect(parsePadding('pl-[1rem]')).toEqual({
      type: 'padding',
      value: '1rem',
      direction: 'left',
      raw: 'pl-[1rem]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parsePadding('padding-4')).toBeNull();
    expect(parsePadding('p-')).toBeNull();
    expect(parsePadding('px-')).toBeNull();
    expect(parsePadding('py-foo')).toBeNull();
    expect(parsePadding('p-foo')).toBeNull();
    expect(parsePadding('p-[]')).toBeNull();
  });
}); 