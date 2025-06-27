import { describe, it, expect } from 'vitest';
import { parseScrollPadding } from '../../src/parser/utilities/scrollPadding';

describe('parseScrollPadding', () => {
  it('parses scroll-p-4 and -scroll-p-4', () => {
    expect(parseScrollPadding('scroll-p-4')).toEqual({ type: 'scroll-padding', property: 'scroll-padding', value: 'calc(var(--spacing) * 4)', raw: 'scroll-p-4', negative: false });
    expect(parseScrollPadding('-scroll-p-4')).toEqual({ type: 'scroll-padding', property: 'scroll-padding', value: 'calc(var(--spacing) * -4)', raw: '-scroll-p-4', negative: true });
  });
  it('parses scroll-px-2 and -scroll-px-2', () => {
    expect(parseScrollPadding('scroll-px-2')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-inline', value: 'calc(var(--spacing) * 2)', raw: 'scroll-px-2', negative: false });
    expect(parseScrollPadding('-scroll-px-2')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-inline', value: 'calc(var(--spacing) * -2)', raw: '-scroll-px-2', negative: true });
  });
  it('parses scroll-py-3', () => {
    expect(parseScrollPadding('scroll-py-3')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-block', value: 'calc(var(--spacing) * 3)', raw: 'scroll-py-3', negative: false });
  });
  it('parses scroll-ps-1', () => {
    expect(parseScrollPadding('scroll-ps-1')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-inline-start', value: 'calc(var(--spacing) * 1)', raw: 'scroll-ps-1', negative: false });
  });
  it('parses scroll-pe-5', () => {
    expect(parseScrollPadding('scroll-pe-5')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-inline-end', value: 'calc(var(--spacing) * 5)', raw: 'scroll-pe-5', negative: false });
  });
  it('parses scroll-pt-6', () => {
    expect(parseScrollPadding('scroll-pt-6')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-top', value: 'calc(var(--spacing) * 6)', raw: 'scroll-pt-6', negative: false });
  });
  it('parses scroll-pr-7', () => {
    expect(parseScrollPadding('scroll-pr-7')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-right', value: 'calc(var(--spacing) * 7)', raw: 'scroll-pr-7', negative: false });
  });
  it('parses scroll-pb-8', () => {
    expect(parseScrollPadding('scroll-pb-8')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-bottom', value: 'calc(var(--spacing) * 8)', raw: 'scroll-pb-8', negative: false });
  });
  it('parses scroll-pl-9', () => {
    expect(parseScrollPadding('scroll-pl-9')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-left', value: 'calc(var(--spacing) * 9)', raw: 'scroll-pl-9', negative: false });
  });
  it('parses scroll-pt-(--foo)', () => {
    expect(parseScrollPadding('scroll-pt-(--foo)')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-top', value: 'var(--foo)', raw: 'scroll-pt-(--foo)', customProperty: true, negative: false });
  });
  it('parses scroll-px-(--bar)', () => {
    expect(parseScrollPadding('scroll-px-(--bar)')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-inline', value: 'var(--bar)', raw: 'scroll-px-(--bar)', customProperty: true, negative: false });
  });
  it('parses scroll-pb-[24rem]', () => {
    expect(parseScrollPadding('scroll-pb-[24rem]')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-bottom', value: '24rem', raw: 'scroll-pb-[24rem]', arbitrary: true, negative: false });
  });
  it('parses scroll-pl-[var(--my-scroll-padding)]', () => {
    expect(parseScrollPadding('scroll-pl-[var(--my-scroll-padding)]')).toEqual({ type: 'scroll-padding', property: 'scroll-padding-left', value: 'var(--my-scroll-padding)', raw: 'scroll-pl-[var(--my-scroll-padding)]', arbitrary: true, negative: false });
  });
  it('returns null for invalid input', () => {
    expect(parseScrollPadding('scroll-p')).toBeNull();
    expect(parseScrollPadding('scroll-pt-')).toBeNull();
    expect(parseScrollPadding('scroll-pt-foo')).toBeNull();
    expect(parseScrollPadding('scroll-pt-[]')).toBeNull();
    expect(parseScrollPadding('scroll-pt-(foo)')).toBeNull();
    expect(parseScrollPadding('scroll-pt-4-4')).toBeNull();
  });
}); 