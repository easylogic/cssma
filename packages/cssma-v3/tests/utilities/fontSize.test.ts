import { describe, it, expect } from 'vitest';
import { parseFontSize } from '../../src/parser/utilities/fontSize';

describe('parseFontSize', () => {
  it('parses preset font sizes', () => {
    expect(parseFontSize('text-xs')).toEqual({ type: 'font-size', value: 'var(--text-xs)', raw: 'text-xs', arbitrary: false });
    expect(parseFontSize('text-sm')).toEqual({ type: 'font-size', value: 'var(--text-sm)', raw: 'text-sm', arbitrary: false });
    expect(parseFontSize('text-base')).toEqual({ type: 'font-size', value: 'var(--text-base)', raw: 'text-base', arbitrary: false });
    expect(parseFontSize('text-lg')).toEqual({ type: 'font-size', value: 'var(--text-lg)', raw: 'text-lg', arbitrary: false });
    expect(parseFontSize('text-xl')).toEqual({ type: 'font-size', value: 'var(--text-xl)', raw: 'text-xl', arbitrary: false });
    expect(parseFontSize('text-2xl')).toEqual({ type: 'font-size', value: 'var(--text-2xl)', raw: 'text-2xl', arbitrary: false });
    expect(parseFontSize('text-3xl')).toEqual({ type: 'font-size', value: 'var(--text-3xl)', raw: 'text-3xl', arbitrary: false });
    expect(parseFontSize('text-4xl')).toEqual({ type: 'font-size', value: 'var(--text-4xl)', raw: 'text-4xl', arbitrary: false });
    expect(parseFontSize('text-5xl')).toEqual({ type: 'font-size', value: 'var(--text-5xl)', raw: 'text-5xl', arbitrary: false });
    expect(parseFontSize('text-6xl')).toEqual({ type: 'font-size', value: 'var(--text-6xl)', raw: 'text-6xl', arbitrary: false });
    expect(parseFontSize('text-7xl')).toEqual({ type: 'font-size', value: 'var(--text-7xl)', raw: 'text-7xl', arbitrary: false });
    expect(parseFontSize('text-8xl')).toEqual({ type: 'font-size', value: 'var(--text-8xl)', raw: 'text-8xl', arbitrary: false });
    expect(parseFontSize('text-9xl')).toEqual({ type: 'font-size', value: 'var(--text-9xl)', raw: 'text-9xl', arbitrary: false });
  });

  it('parses custom property text-[var(--foo)]', () => {
    expect(parseFontSize('text-[var(--foo)]')).toEqual({ type: 'font-size', value: 'var(--foo)', raw: 'text-[var(--foo)]', arbitrary: true });
    expect(parseFontSize('text-[var(--bar-baz)]')).toEqual({ type: 'font-size', value: 'var(--bar-baz)', raw: 'text-[var(--bar-baz)]', arbitrary: true });
  });

  it('parses arbitrary value text-[<value>]', () => {
    expect(parseFontSize('text-[2.5rem]')).toEqual({ type: 'font-size', value: '2.5rem', raw: 'text-[2.5rem]', arbitrary: true });
    expect(parseFontSize('text-[calc(100%-1rem)]')).toEqual({ type: 'font-size', value: 'calc(100%-1rem)', raw: 'text-[calc(100%-1rem)]', arbitrary: true });
  });

  it('parses preset with line-height', () => {
    expect(parseFontSize('text-xs/6')).toEqual({ type: 'font-size', value: 'var(--text-xs)', lineHeight: 'var(--text-6)', raw: 'text-xs/6', arbitrary: false });
  });

  it('parses arbitrary with line-height', () => {
    expect(parseFontSize('text-[14px]/[20px]')).toEqual({ type: 'font-size', value: '14px', lineHeight: '20px', raw: 'text-[14px]/[20px]', arbitrary: true });
  });

  it('parses custom property text-(length:--my-size)', () => {
    expect(parseFontSize('text-(length:my-size)')).toEqual({ type: 'font-size', value: 'var(--my-size)', raw: 'text-(length:my-size)', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseFontSize('text-')).toBeNull();
    expect(parseFontSize('text')).toBeNull();
    expect(parseFontSize('font-xs')).toBeNull();
    expect(parseFontSize('text-xxl')).toBeNull();
  });
}); 