import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/utilities/parseUtility';

describe('parseUtility', () => {
  it('parses bg-cover', () => {
    expect(parseUtility('bg-cover')).toMatchObject({ type: 'background-size', preset: 'cover' });
  });
  it('parses bg-repeat-x', () => {
    expect(parseUtility('bg-repeat-x')).toMatchObject({ type: 'background-repeat', preset: 'repeat-x' });
  });
  it('parses bg-origin-border', () => {
    expect(parseUtility('bg-origin-border')).toMatchObject({ type: 'background-origin', preset: 'border' });
  });
  it('parses bg-center', () => {
    expect(parseUtility('bg-center')).toMatchObject({ type: 'background-position', preset: 'center' });
  });
  it('parses bg-size-(--foo)', () => {
    expect(parseUtility('bg-size-(--foo)')).toMatchObject({ type: 'background-size', preset: 'var(--foo)' });
  });
  it('parses content-none', () => {
    expect(parseUtility('content-none')).toMatchObject({ type: 'content', preset: 'none' });
  });
  it('parses from-red-500', () => {
    expect(parseUtility('from-red-500')).toMatchObject({ type: 'gradient-stop', stop: 'from', preset: 'red-500' });
  });
  it('parses text-center', () => {
    expect(parseUtility('text-center')).toMatchObject({ type: 'text-align', preset: 'center' });
  });
  it('parses text-underline', () => {
    expect(parseUtility('text-underline')).toMatchObject({ type: 'text-decoration-line', preset: 'underline' });
  });
  it('parses text-decoration-blue-500', () => {
    expect(parseUtility('text-decoration-blue-500')).toMatchObject({ type: 'text-decoration-color', preset: 'blue-500' });
  });
  it('parses text-wrap', () => {
    expect(parseUtility('text-wrap')).toMatchObject({ type: 'text-wrap', preset: 'wrap' });
  });
  it('parses text-indent-4', () => {
    expect(parseUtility('text-indent-4')).toMatchObject({ type: 'text-indent', value: 4 });
  });
  it('parses vertical-align-top', () => {
    expect(parseUtility('vertical-align-top')).toMatchObject({ type: 'vertical-align', preset: 'top' });
  });
  it('parses white-space-nowrap', () => {
    expect(parseUtility('white-space-nowrap')).toMatchObject({ type: 'white-space', preset: 'nowrap' });
  });
  it('parses word-break-break-all', () => {
    expect(parseUtility('word-break-break-all')).toMatchObject({ type: 'word-break', preset: 'break-all' });
  });
  it('parses overflow-wrap-anywhere', () => {
    expect(parseUtility('overflow-wrap-anywhere')).toMatchObject({ type: 'overflow-wrap', preset: 'anywhere' });
  });
  it('parses hyphens-auto', () => {
    expect(parseUtility('hyphens-auto')).toMatchObject({ type: 'hyphens', preset: 'auto' });
  });
  it('returns unknown for invalid utility', () => {
    expect(parseUtility('abc-foo')).toEqual({ type: 'unknown', raw: 'abc-foo' });
  });
}); 