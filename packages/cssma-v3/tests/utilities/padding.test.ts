import { describe, it, expect } from 'vitest';
import { parsePaddingUtility } from '../../src/parser/utilities/padding';

describe('parsePaddingUtility', () => {
  it('parses p-<number>', () => {
    expect(parsePaddingUtility('p-4')).toEqual({
      type: 'padding',
      value: 4,
      direction: 'all',
      raw: 'p-4',
      arbitrary: false,
    });
  });
  it('parses p-px', () => {
    expect(parsePaddingUtility('p-px')).toEqual({
      type: 'padding',
      preset: 'px',
      direction: 'all',
      raw: 'p-px',
      arbitrary: false,
    });
  });
  it('parses p-(<custom-property>)', () => {
    expect(parsePaddingUtility('p-(--my-padding)')).toEqual({
      type: 'padding',
      value: 'var(--my-padding)',
      direction: 'all',
      raw: 'p-(--my-padding)',
      arbitrary: false,
    });
  });
  it('parses p-[<value>]', () => {
    expect(parsePaddingUtility('p-[5px]')).toEqual({
      type: 'padding',
      value: '5px',
      direction: 'all',
      raw: 'p-[5px]',
      arbitrary: true,
    });
  });
  it('parses px-<number>', () => {
    expect(parsePaddingUtility('px-2')).toEqual({
      type: 'padding',
      value: 2,
      direction: 'inline',
      raw: 'px-2',
      arbitrary: false,
    });
  });
  it('parses py-px', () => {
    expect(parsePaddingUtility('py-px')).toEqual({
      type: 'padding',
      preset: 'px',
      direction: 'block',
      raw: 'py-px',
      arbitrary: false,
    });
  });
  it('parses ps-(<custom-property>)', () => {
    expect(parsePaddingUtility('ps-(--pad)')).toEqual({
      type: 'padding',
      value: 'var(--pad)',
      direction: 'inline-start',
      raw: 'ps-(--pad)',
      arbitrary: false,
    });
  });
  it('parses pe-[<value>]', () => {
    expect(parsePaddingUtility('pe-[2em]')).toEqual({
      type: 'padding',
      value: '2em',
      direction: 'inline-end',
      raw: 'pe-[2em]',
      arbitrary: true,
    });
  });
  it('parses pt-<number>', () => {
    expect(parsePaddingUtility('pt-6')).toEqual({
      type: 'padding',
      value: 6,
      direction: 'top',
      raw: 'pt-6',
      arbitrary: false,
    });
  });
  it('parses pr-px', () => {
    expect(parsePaddingUtility('pr-px')).toEqual({
      type: 'padding',
      preset: 'px',
      direction: 'right',
      raw: 'pr-px',
      arbitrary: false,
    });
  });
  it('parses pb-(<custom-property>)', () => {
    // eslint-disable-next-line no-console
    console.log('TEST pb-(--foo):', parsePaddingUtility('pb-(--foo)'));
    expect(parsePaddingUtility('pb-(--foo)')).toEqual({
      type: 'padding',
      value: 'var(--foo)',
      direction: 'bottom',
      raw: 'pb-(--foo)',
      arbitrary: false,
    });
  });
  it('parses pb-( --foo ) with whitespace', () => {
    expect(parsePaddingUtility('pb-( --foo )')).toEqual({
      type: 'padding',
      value: 'var(--foo)',
      direction: 'bottom',
      raw: 'pb-( --foo )',
      arbitrary: false,
    });
  });
  it('parses pl-[<value>]', () => {
    expect(parsePaddingUtility('pl-[1rem]')).toEqual({
      type: 'padding',
      value: '1rem',
      direction: 'left',
      raw: 'pl-[1rem]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parsePaddingUtility('padding-4')).toBeNull();
    expect(parsePaddingUtility('p-')).toBeNull();
    expect(parsePaddingUtility('px-')).toBeNull();
    expect(parsePaddingUtility('py-foo')).toBeNull();
    expect(parsePaddingUtility('p-foo')).toBeNull();
    expect(parsePaddingUtility('p-[]')).toBeNull();
  });
}); 