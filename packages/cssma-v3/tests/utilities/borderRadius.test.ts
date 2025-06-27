import { describe, it, expect } from 'vitest';
import { parseBorderRadius } from '../../src/parser/utilities/borderRadius';

describe('parseBorderRadius', () => {
  it('parses basic presets', () => {
    expect(parseBorderRadius('rounded')).toMatchObject({ type: 'border-radius', preset: 'md', raw: 'rounded', arbitrary: false });
    expect(parseBorderRadius('rounded-none')).toMatchObject({ type: 'border-radius', preset: 'none', raw: 'rounded-none', arbitrary: false });
    expect(parseBorderRadius('rounded-full')).toMatchObject({ type: 'border-radius', preset: 'full', raw: 'rounded-full', arbitrary: false });
    expect(parseBorderRadius('rounded-lg')).toMatchObject({ type: 'border-radius', preset: 'lg', raw: 'rounded-lg', arbitrary: false });
  });

  it('parses logical property presets', () => {
    expect(parseBorderRadius('rounded-t-lg')).toMatchObject({ type: 'border-radius', logical: 't', preset: 'lg', raw: 'rounded-t-lg', arbitrary: false });
    expect(parseBorderRadius('rounded-tr-md')).toMatchObject({ type: 'border-radius', logical: 'tr', preset: 'md', raw: 'rounded-tr-md', arbitrary: false });
    expect(parseBorderRadius('rounded-bl-2xl')).toMatchObject({ type: 'border-radius', logical: 'bl', preset: '2xl', raw: 'rounded-bl-2xl', arbitrary: false });
  });

  it('parses logical property with arbitrary value', () => {
    expect(parseBorderRadius('rounded-t-[2vw]')).toMatchObject({ type: 'border-radius', logical: 't', value: '2vw', raw: 'rounded-t-[2vw]', arbitrary: true });
    expect(parseBorderRadius('rounded-tr-[10px]')).toMatchObject({ type: 'border-radius', logical: 'tr', value: '10px', raw: 'rounded-tr-[10px]', arbitrary: true });
  });

  it('parses arbitrary value', () => {
    expect(parseBorderRadius('rounded-[2vw]')).toMatchObject({ type: 'border-radius', value: '2vw', raw: 'rounded-[2vw]', arbitrary: true });
    expect(parseBorderRadius('rounded-[50%]')).toMatchObject({ type: 'border-radius', value: '50%', raw: 'rounded-[50%]', arbitrary: true });
  });

  it('parses custom property', () => {
    expect(parseBorderRadius('rounded-(--my-radius)')).toMatchObject({ type: 'border-radius', value: 'var(--my-radius)', raw: 'rounded-(--my-radius)', arbitrary: true });
  });

  it('returns null for invalid', () => {
    expect(parseBorderRadius('rounded-foo')).toBeNull();
    expect(parseBorderRadius('rounded-tl')).toBeNull();
  });
}); 