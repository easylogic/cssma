import { describe, it, expect } from 'vitest';
import { parseMargin } from '../../src/parser/utilities/margin';

describe('parseMarginUtility', () => {
  it('parses m-<number>', () => {
    expect(parseMargin('m-4')).toEqual({
      type: 'margin',
      value: 4,
      direction: 'all',
      raw: 'm-4',
      arbitrary: false,
      negative: false,
    });
  });
  it('parses -m-4 (negative)', () => {
    expect(parseMargin('-m-4')).toEqual({
      type: 'margin',
      value: 4,
      direction: 'all',
      raw: '-m-4',
      arbitrary: false,
      negative: true,
    });
  });
  it('parses m-px', () => {
    expect(parseMargin('m-px')).toEqual({
      type: 'margin',
      preset: 'px',
      direction: 'all',
      raw: 'm-px',
      arbitrary: false,
      negative: false,
    });
  });
  it('parses -m-px (negative)', () => {
    expect(parseMargin('-m-px')).toEqual({
      type: 'margin',
      preset: 'px',
      direction: 'all',
      raw: '-m-px',
      arbitrary: false,
      negative: true,
    });
  });
  it('parses m-(<custom-property>)', () => {
    expect(parseMargin('m-(--my-margin)')).toEqual({
      type: 'margin',
      value: 'var(--my-margin)',
      direction: 'all',
      raw: 'm-(--my-margin)',
      arbitrary: false,
      negative: false,
    });
  });
  it('parses m-[<value>]', () => {
    expect(parseMargin('m-[5px]')).toEqual({
      type: 'margin',
      value: '5px',
      direction: 'all',
      raw: 'm-[5px]',
      arbitrary: true,
      negative: false,
    });
  });
  it('parses mx-<number>', () => {
    expect(parseMargin('mx-2')).toEqual({
      type: 'margin',
      value: 2,
      direction: 'inline',
      raw: 'mx-2',
      arbitrary: false,
      negative: false,
    });
  });
  it('parses my-px', () => {
    expect(parseMargin('my-px')).toEqual({
      type: 'margin',
      preset: 'px',
      direction: 'block',
      raw: 'my-px',
      arbitrary: false,
      negative: false,
    });
  });
  it('parses ms-(<custom-property>)', () => {
    expect(parseMargin('ms-(--pad)')).toEqual({
      type: 'margin',
      value: 'var(--pad)',
      direction: 'inline-start',
      raw: 'ms-(--pad)',
      arbitrary: false,
      negative: false,
    });
  });
  it('parses me-[<value>]', () => {
    expect(parseMargin('me-[2em]')).toEqual({
      type: 'margin',
      value: '2em',
      direction: 'inline-end',
      raw: 'me-[2em]',
      arbitrary: true,
      negative: false,
    });
  });
  it('parses mt-<number>', () => {
    expect(parseMargin('mt-6')).toEqual({
      type: 'margin',
      value: 6,
      direction: 'top',
      raw: 'mt-6',
      arbitrary: false,
      negative: false,
    });
  });
  it('parses -mr-px (negative)', () => {
    expect(parseMargin('-mr-px')).toEqual({
      type: 'margin',
      preset: 'px',
      direction: 'right',
      raw: '-mr-px',
      arbitrary: false,
      negative: true,
    });
  });
  it('parses mb-(<custom-property>)', () => {
    expect(parseMargin('mb-(--foo)')).toEqual({
      type: 'margin',
      value: 'var(--foo)',
      direction: 'bottom',
      raw: 'mb-(--foo)',
      arbitrary: false,
      negative: false,
    });
  });
  it('parses ml-[<value>]', () => {
    expect(parseMargin('ml-[1rem]')).toEqual({
      type: 'margin',
      value: '1rem',
      direction: 'left',
      raw: 'ml-[1rem]',
      arbitrary: true,
      negative: false,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseMargin('margin-4')).toBeNull();
    expect(parseMargin('m-')).toBeNull();
    expect(parseMargin('mx-')).toBeNull();
    expect(parseMargin('my-foo')).toBeNull();
    expect(parseMargin('m-foo')).toBeNull();
    expect(parseMargin('m-[]')).toBeNull();
    expect(parseMargin('--m-4')).toBeNull();
  });
}); 