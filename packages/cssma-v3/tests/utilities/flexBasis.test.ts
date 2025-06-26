import { describe, it, expect } from 'vitest';
import { parseFlexBasisUtility } from '../../src/parser/utilities/flexBasis';

describe('parseFlexBasisUtility', () => {
  it('parses basis-0', () => {
    expect(parseFlexBasisUtility('basis-0')).toEqual({
      type: 'flex-basis',
      preset: '0',
      raw: 'basis-0',
      arbitrary: false,
    });
  });
  it('parses basis-full', () => {
    expect(parseFlexBasisUtility('basis-full')).toEqual({
      type: 'flex-basis',
      preset: 'full',
      raw: 'basis-full',
      arbitrary: false,
    });
  });
  it('parses basis-auto', () => {
    expect(parseFlexBasisUtility('basis-auto')).toEqual({
      type: 'flex-basis',
      preset: 'auto',
      raw: 'basis-auto',
      arbitrary: false,
    });
  });
  it('parses basis-px', () => {
    expect(parseFlexBasisUtility('basis-px')).toEqual({
      type: 'flex-basis',
      preset: 'px',
      raw: 'basis-px',
      arbitrary: false,
    });
  });
  it('parses basis-<number>', () => {
    expect(parseFlexBasisUtility('basis-4')).toEqual({
      type: 'flex-basis',
      value: 4,
      raw: 'basis-4',
      arbitrary: false,
    });
    expect(parseFlexBasisUtility('basis-12')).toEqual({
      type: 'flex-basis',
      value: 12,
      raw: 'basis-12',
      arbitrary: false,
    });
  });
  it('parses basis-[arbitrary]', () => {
    expect(parseFlexBasisUtility('basis-[10%]')).toEqual({
      type: 'flex-basis',
      value: '10%',
      raw: 'basis-[10%]',
      arbitrary: true,
    });
    expect(parseFlexBasisUtility('basis-[var(--basis)]')).toEqual({
      type: 'flex-basis',
      value: 'var(--basis)',
      raw: 'basis-[var(--basis)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseFlexBasisUtility('basis')).toBeNull();
    expect(parseFlexBasisUtility('basis-')).toBeNull();
    expect(parseFlexBasisUtility('basis-arbitrary')).toBeNull();
    expect(parseFlexBasisUtility('flex-basis')).toBeNull();
  });
}); 