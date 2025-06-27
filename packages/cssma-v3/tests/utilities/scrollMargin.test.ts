import { describe, it, expect } from 'vitest';
import { parseScrollMargin } from '../../src/parser/utilities/scrollMargin';

describe('parseScrollMargin', () => {
  it('parses scroll-m-4 and -scroll-m-4', () => {
    expect(parseScrollMargin('scroll-m-4')).toEqual({ type: 'scroll-margin', property: 'scroll-margin', value: 'calc(var(--spacing) * 4)', raw: 'scroll-m-4', negative: false });
    expect(parseScrollMargin('-scroll-m-4')).toEqual({ type: 'scroll-margin', property: 'scroll-margin', value: 'calc(var(--spacing) * -4)', raw: '-scroll-m-4', negative: true });
  });
  it('parses scroll-mx-2 and -scroll-mx-2', () => {
    expect(parseScrollMargin('scroll-mx-2')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-inline', value: 'calc(var(--spacing) * 2)', raw: 'scroll-mx-2', negative: false });
    expect(parseScrollMargin('-scroll-mx-2')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-inline', value: 'calc(var(--spacing) * -2)', raw: '-scroll-mx-2', negative: true });
  });
  it('parses scroll-my-3', () => {
    expect(parseScrollMargin('scroll-my-3')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-block', value: 'calc(var(--spacing) * 3)', raw: 'scroll-my-3', negative: false });
  });
  it('parses scroll-ms-1', () => {
    expect(parseScrollMargin('scroll-ms-1')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-inline-start', value: 'calc(var(--spacing) * 1)', raw: 'scroll-ms-1', negative: false });
  });
  it('parses scroll-me-5', () => {
    expect(parseScrollMargin('scroll-me-5')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-inline-end', value: 'calc(var(--spacing) * 5)', raw: 'scroll-me-5', negative: false });
  });
  it('parses scroll-mt-6', () => {
    expect(parseScrollMargin('scroll-mt-6')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-top', value: 'calc(var(--spacing) * 6)', raw: 'scroll-mt-6', negative: false });
  });
  it('parses scroll-mr-7', () => {
    expect(parseScrollMargin('scroll-mr-7')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-right', value: 'calc(var(--spacing) * 7)', raw: 'scroll-mr-7', negative: false });
  });
  it('parses scroll-mb-8', () => {
    expect(parseScrollMargin('scroll-mb-8')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-bottom', value: 'calc(var(--spacing) * 8)', raw: 'scroll-mb-8', negative: false });
  });
  it('parses scroll-ml-9', () => {
    expect(parseScrollMargin('scroll-ml-9')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-left', value: 'calc(var(--spacing) * 9)', raw: 'scroll-ml-9', negative: false });
  });
  it('parses scroll-mt-(--foo)', () => {
    expect(parseScrollMargin('scroll-mt-(--foo)')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-top', value: 'var(--foo)', raw: 'scroll-mt-(--foo)', customProperty: true });
  });
  it('parses scroll-mx-(--bar)', () => {
    expect(parseScrollMargin('scroll-mx-(--bar)')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-inline', value: 'var(--bar)', raw: 'scroll-mx-(--bar)', customProperty: true });
  });
  it('parses scroll-mb-[24rem]', () => {
    expect(parseScrollMargin('scroll-mb-[24rem]')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-bottom', value: '24rem', raw: 'scroll-mb-[24rem]', arbitrary: true });
  });
  it('parses scroll-ml-[var(--my-scroll-margin)]', () => {
    expect(parseScrollMargin('scroll-ml-[var(--my-scroll-margin)]')).toEqual({ type: 'scroll-margin', property: 'scroll-margin-left', value: 'var(--my-scroll-margin)', raw: 'scroll-ml-[var(--my-scroll-margin)]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseScrollMargin('scroll-m')).toBeNull();
    expect(parseScrollMargin('scroll-mt-')).toBeNull();
    expect(parseScrollMargin('scroll-mt-foo')).toBeNull();
    expect(parseScrollMargin('scroll-mt-[]')).toBeNull();
    expect(parseScrollMargin('scroll-mt-(foo)')).toBeNull();
    expect(parseScrollMargin('scroll-mt-4-4')).toBeNull();
  });
}); 