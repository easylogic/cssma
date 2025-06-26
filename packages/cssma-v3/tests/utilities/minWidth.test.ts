import { describe, it, expect } from 'vitest';
import { parseMinWidth } from '../../src/parser/utilities/minWidth';

describe('parseMinWidthUtility', () => {
  it('parses min-w-0', () => {
    expect(parseMinWidth('min-w-0')).toEqual({
      type: 'min-width',
      preset: '0',
      raw: 'min-w-0',
      arbitrary: false,
    });
  });
  it('parses min-w-full', () => {
    expect(parseMinWidth('min-w-full')).toEqual({
      type: 'min-width',
      preset: 'full',
      raw: 'min-w-full',
      arbitrary: false,
    });
  });
  it('parses min-w-min', () => {
    expect(parseMinWidth('min-w-min')).toEqual({
      type: 'min-width',
      preset: 'min',
      raw: 'min-w-min',
      arbitrary: false,
    });
  });
  it('parses min-w-max', () => {
    expect(parseMinWidth('min-w-max')).toEqual({
      type: 'min-width',
      preset: 'max',
      raw: 'min-w-max',
      arbitrary: false,
    });
  });
  it('parses min-w-fit', () => {
    expect(parseMinWidth('min-w-fit')).toEqual({
      type: 'min-width',
      preset: 'fit',
      raw: 'min-w-fit',
      arbitrary: false,
    });
  });
  it('parses min-w-px', () => {
    expect(parseMinWidth('min-w-px')).toEqual({
      type: 'min-width',
      preset: 'px',
      raw: 'min-w-px',
      arbitrary: false,
    });
  });
  it('parses min-w-screen', () => {
    expect(parseMinWidth('min-w-screen')).toEqual({
      type: 'min-width',
      preset: 'screen',
      raw: 'min-w-screen',
      arbitrary: false,
    });
  });
  it('parses min-w-dvw', () => {
    expect(parseMinWidth('min-w-dvw')).toEqual({
      type: 'min-width',
      preset: 'dvw',
      raw: 'min-w-dvw',
      arbitrary: false,
    });
  });
  it('parses min-w-dvh', () => {
    expect(parseMinWidth('min-w-dvh')).toEqual({
      type: 'min-width',
      preset: 'dvh',
      raw: 'min-w-dvh',
      arbitrary: false,
    });
  });
  it('parses min-w-lvw', () => {
    expect(parseMinWidth('min-w-lvw')).toEqual({
      type: 'min-width',
      preset: 'lvw',
      raw: 'min-w-lvw',
      arbitrary: false,
    });
  });
  it('parses min-w-lvh', () => {
    expect(parseMinWidth('min-w-lvh')).toEqual({
      type: 'min-width',
      preset: 'lvh',
      raw: 'min-w-lvh',
      arbitrary: false,
    });
  });
  it('parses min-w-svw', () => {
    expect(parseMinWidth('min-w-svw')).toEqual({
      type: 'min-width',
      preset: 'svw',
      raw: 'min-w-svw',
      arbitrary: false,
    });
  });
  it('parses min-w-svh', () => {
    expect(parseMinWidth('min-w-svh')).toEqual({
      type: 'min-width',
      preset: 'svh',
      raw: 'min-w-svh',
      arbitrary: false,
    });
  });
  it('parses min-w-(<custom-property>)', () => {
    expect(parseMinWidth('min-w-(--my-min-width)')).toEqual({
      type: 'min-width',
      value: 'var(--my-min-width)',
      raw: 'min-w-(--my-min-width)',
      arbitrary: false,
    });
  });
  it('parses min-w-[<value>]', () => {
    expect(parseMinWidth('min-w-[5px]')).toEqual({
      type: 'min-width',
      value: '5px',
      raw: 'min-w-[5px]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseMinWidth('min-w-')).toBeNull();
    expect(parseMinWidth('min-w-foo')).toBeNull();
    expect(parseMinWidth('min-w-[]')).toBeNull();
    expect(parseMinWidth('min-width-4')).toBeNull();
  });
}); 