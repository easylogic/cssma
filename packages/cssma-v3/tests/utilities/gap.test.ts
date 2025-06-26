import { describe, it, expect } from 'vitest';
import { parseGap } from '../../src/parser/utilities/gap';

describe('parseGapUtility', () => {
  it('parses gap-<number>', () => {
    expect(parseGap('gap-4')).toEqual({
      type: 'gap',
      value: 4,
      axis: 'both',
      raw: 'gap-4',
      arbitrary: false,
    });
  });
  it('parses gap-x-2', () => {
    expect(parseGap('gap-x-2')).toEqual({
      type: 'gap',
      value: 2,
      axis: 'x',
      raw: 'gap-x-2',
      arbitrary: false,
    });
  });
  it('parses gap-y-1', () => {
    expect(parseGap('gap-y-1')).toEqual({
      type: 'gap',
      value: 1,
      axis: 'y',
      raw: 'gap-y-1',
      arbitrary: false,
    });
  });
  it('parses gap-px', () => {
    expect(parseGap('gap-px')).toEqual({
      type: 'gap',
      preset: 'px',
      axis: 'both',
      raw: 'gap-px',
      arbitrary: false,
    });
  });
  it('parses gap-x-px', () => {
    expect(parseGap('gap-x-px')).toEqual({
      type: 'gap',
      preset: 'px',
      axis: 'x',
      raw: 'gap-x-px',
      arbitrary: false,
    });
  });
  it('parses gap-y-px', () => {
    expect(parseGap('gap-y-px')).toEqual({
      type: 'gap',
      preset: 'px',
      axis: 'y',
      raw: 'gap-y-px',
      arbitrary: false,
    });
  });
  it('parses gap-(<custom-property>)', () => {
    expect(parseGap('gap-(--my-gap)')).toEqual({
      type: 'gap',
      value: 'var(--my-gap)',
      axis: 'both',
      raw: 'gap-(--my-gap)',
      arbitrary: false,
    });
  });
  it('parses gap-x-(--foo)', () => {
    expect(parseGap('gap-x-(--foo)')).toEqual({
      type: 'gap',
      value: 'var(--foo)',
      axis: 'x',
      raw: 'gap-x-(--foo)',
      arbitrary: false,
    });
  });
  it('parses gap-y-(--bar)', () => {
    expect(parseGap('gap-y-(--bar)')).toEqual({
      type: 'gap',
      value: 'var(--bar)',
      axis: 'y',
      raw: 'gap-y-(--bar)',
      arbitrary: false,
    });
  });
  it('parses gap-[<value>]', () => {
    expect(parseGap('gap-[5px]')).toEqual({
      type: 'gap',
      value: '5px',
      axis: 'both',
      raw: 'gap-[5px]',
      arbitrary: true,
    });
  });
  it('parses gap-x-[2em]', () => {
    expect(parseGap('gap-x-[2em]')).toEqual({
      type: 'gap',
      value: '2em',
      axis: 'x',
      raw: 'gap-x-[2em]',
      arbitrary: true,
    });
  });
  it('parses gap-y-[1rem]', () => {
    expect(parseGap('gap-y-[1rem]')).toEqual({
      type: 'gap',
      value: '1rem',
      axis: 'y',
      raw: 'gap-y-[1rem]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseGap('gap-')).toBeNull();
    expect(parseGap('gap-x-')).toBeNull();
    expect(parseGap('gap-y-foo')).toBeNull();
    expect(parseGap('gap-[]')).toBeNull();
    expect(parseGap('gap-z-2')).toBeNull();
    expect(parseGap('gap-foo')).toBeNull();
  });
}); 