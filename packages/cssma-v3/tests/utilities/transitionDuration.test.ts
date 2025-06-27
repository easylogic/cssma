import { describe, it, expect } from 'vitest';
import { parseTransitionDuration } from '../../src/parser/utilities/transitionDuration';

describe('parseTransitionDuration', () => {
  it('parses duration-<number>', () => {
    expect(parseTransitionDuration('duration-150')).toEqual({
      type: 'transition-duration',
      value: '150ms',
      raw: 'duration-150',
      preset: true,
    });
    expect(parseTransitionDuration('duration-700')).toEqual({
      type: 'transition-duration',
      value: '700ms',
      raw: 'duration-700',
      preset: true,
    });
  });

  it('parses duration-initial', () => {
    expect(parseTransitionDuration('duration-initial')).toEqual({
      type: 'transition-duration',
      value: 'initial',
      raw: 'duration-initial',
      preset: true,
    });
  });

  it('parses custom property', () => {
    expect(parseTransitionDuration('duration-(--my-duration)')).toEqual({
      type: 'transition-duration',
      value: 'var(--my-duration)',
      raw: 'duration-(--my-duration)',
      customProperty: true,
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseTransitionDuration('duration-[1s,15s]')).toEqual({
      type: 'transition-duration',
      value: '1s,15s',
      raw: 'duration-[1s,15s]',
      arbitrary: true,
    });
  });

  it('returns null for invalid input', () => {
    expect(parseTransitionDuration('duration-foo')).toBeNull();
    expect(parseTransitionDuration('duration-')).toBeNull();
    expect(parseTransitionDuration('duration-[]')).toBeNull();
    expect(parseTransitionDuration('duration-()')).toBeNull();
  });
}); 