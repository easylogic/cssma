import { describe, it, expect } from 'vitest';
import { parseWidthUtility } from '../../src/parser/utilities/width';

describe('parseWidthUtility', () => {
  it('parses w-<number>', () => {
    expect(parseWidthUtility('w-4')).toEqual({
      type: 'width',
      value: 4,
      raw: 'w-4',
      arbitrary: false,
    });
  });
  it('parses w-1/2 (fraction)', () => {
    expect(parseWidthUtility('w-1/2')).toEqual({
      type: 'width',
      value: '1/2',
      raw: 'w-1/2',
      arbitrary: false,
    });
  });
  it('parses w-3xs', () => {
    expect(parseWidthUtility('w-3xs')).toEqual({
      type: 'width',
      preset: '3xs',
      raw: 'w-3xs',
      arbitrary: false,
    });
  });
  it('parses w-2xs', () => {
    expect(parseWidthUtility('w-2xs')).toEqual({
      type: 'width',
      preset: '2xs',
      raw: 'w-2xs',
      arbitrary: false,
    });
  });
  it('parses w-xs', () => {
    expect(parseWidthUtility('w-xs')).toEqual({
      type: 'width',
      preset: 'xs',
      raw: 'w-xs',
      arbitrary: false,
    });
  });
  it('parses w-sm', () => {
    expect(parseWidthUtility('w-sm')).toEqual({
      type: 'width',
      preset: 'sm',
      raw: 'w-sm',
      arbitrary: false,
    });
  });
  it('parses w-md', () => {
    expect(parseWidthUtility('w-md')).toEqual({
      type: 'width',
      preset: 'md',
      raw: 'w-md',
      arbitrary: false,
    });
  });
  it('parses w-lg', () => {
    expect(parseWidthUtility('w-lg')).toEqual({
      type: 'width',
      preset: 'lg',
      raw: 'w-lg',
      arbitrary: false,
    });
  });
  it('parses w-xl', () => {
    expect(parseWidthUtility('w-xl')).toEqual({
      type: 'width',
      preset: 'xl',
      raw: 'w-xl',
      arbitrary: false,
    });
  });
  it('parses w-2xl', () => {
    expect(parseWidthUtility('w-2xl')).toEqual({
      type: 'width',
      preset: '2xl',
      raw: 'w-2xl',
      arbitrary: false,
    });
  });
  it('parses w-3xl', () => {
    expect(parseWidthUtility('w-3xl')).toEqual({
      type: 'width',
      preset: '3xl',
      raw: 'w-3xl',
      arbitrary: false,
    });
  });
  it('parses w-4xl', () => {
    expect(parseWidthUtility('w-4xl')).toEqual({
      type: 'width',
      preset: '4xl',
      raw: 'w-4xl',
      arbitrary: false,
    });
  });
  it('parses w-5xl', () => {
    expect(parseWidthUtility('w-5xl')).toEqual({
      type: 'width',
      preset: '5xl',
      raw: 'w-5xl',
      arbitrary: false,
    });
  });
  it('parses w-6xl', () => {
    expect(parseWidthUtility('w-6xl')).toEqual({
      type: 'width',
      preset: '6xl',
      raw: 'w-6xl',
      arbitrary: false,
    });
  });
  it('parses w-7xl', () => {
    expect(parseWidthUtility('w-7xl')).toEqual({
      type: 'width',
      preset: '7xl',
      raw: 'w-7xl',
      arbitrary: false,
    });
  });
  it('parses w-auto', () => {
    expect(parseWidthUtility('w-auto')).toEqual({
      type: 'width',
      preset: 'auto',
      raw: 'w-auto',
      arbitrary: false,
    });
  });
  it('parses w-px', () => {
    expect(parseWidthUtility('w-px')).toEqual({
      type: 'width',
      preset: 'px',
      raw: 'w-px',
      arbitrary: false,
    });
  });
  it('parses w-full', () => {
    expect(parseWidthUtility('w-full')).toEqual({
      type: 'width',
      preset: 'full',
      raw: 'w-full',
      arbitrary: false,
    });
  });
  it('parses w-screen', () => {
    expect(parseWidthUtility('w-screen')).toEqual({
      type: 'width',
      preset: 'screen',
      raw: 'w-screen',
      arbitrary: false,
    });
  });
  it('parses w-dvw', () => {
    expect(parseWidthUtility('w-dvw')).toEqual({
      type: 'width',
      preset: 'dvw',
      raw: 'w-dvw',
      arbitrary: false,
    });
  });
  it('parses w-dvh', () => {
    expect(parseWidthUtility('w-dvh')).toEqual({
      type: 'width',
      preset: 'dvh',
      raw: 'w-dvh',
      arbitrary: false,
    });
  });
  it('parses w-lvw', () => {
    expect(parseWidthUtility('w-lvw')).toEqual({
      type: 'width',
      preset: 'lvw',
      raw: 'w-lvw',
      arbitrary: false,
    });
  });
  it('parses w-lvh', () => {
    expect(parseWidthUtility('w-lvh')).toEqual({
      type: 'width',
      preset: 'lvh',
      raw: 'w-lvh',
      arbitrary: false,
    });
  });
  it('parses w-svw', () => {
    expect(parseWidthUtility('w-svw')).toEqual({
      type: 'width',
      preset: 'svw',
      raw: 'w-svw',
      arbitrary: false,
    });
  });
  it('parses w-svh', () => {
    expect(parseWidthUtility('w-svh')).toEqual({
      type: 'width',
      preset: 'svh',
      raw: 'w-svh',
      arbitrary: false,
    });
  });
  it('parses w-min', () => {
    expect(parseWidthUtility('w-min')).toEqual({
      type: 'width',
      preset: 'min',
      raw: 'w-min',
      arbitrary: false,
    });
  });
  it('parses w-max', () => {
    expect(parseWidthUtility('w-max')).toEqual({
      type: 'width',
      preset: 'max',
      raw: 'w-max',
      arbitrary: false,
    });
  });
  it('parses w-fit', () => {
    expect(parseWidthUtility('w-fit')).toEqual({
      type: 'width',
      preset: 'fit',
      raw: 'w-fit',
      arbitrary: false,
    });
  });
  it('parses w-(<custom-property>)', () => {
    expect(parseWidthUtility('w-(--my-width)')).toEqual({
      type: 'width',
      value: 'var(--my-width)',
      raw: 'w-(--my-width)',
      arbitrary: false,
    });
  });
  it('parses w-[<value>]', () => {
    expect(parseWidthUtility('w-[5px]')).toEqual({
      type: 'width',
      value: '5px',
      raw: 'w-[5px]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseWidthUtility('w-')).toBeNull();
    expect(parseWidthUtility('w-foo')).toBeNull();
    expect(parseWidthUtility('w-[]')).toBeNull();
    expect(parseWidthUtility('w-1//2')).toBeNull();
    expect(parseWidthUtility('width-4')).toBeNull();
  });
}); 