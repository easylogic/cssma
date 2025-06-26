import { describe, it, expect } from 'vitest';
import { parseGapUtility } from '../../src/parser/utilities/gap';

describe('parseGapUtility', () => {
  it('parses gap-<number>', () => {
    expect(parseGapUtility('gap-4')).toEqual({
      type: 'gap',
      value: 4,
      axis: 'both',
      raw: 'gap-4',
      arbitrary: false,
    });
  });
  it('parses gap-x-<number>', () => {
    expect(parseGapUtility('gap-x-2')).toEqual({
      type: 'gap',
      value: 2,
      axis: 'x',
      raw: 'gap-x-2',
      arbitrary: false,
    });
  });
  it('parses gap-y-<number>', () => {
    expect(parseGapUtility('gap-y-3')).toEqual({
      type: 'gap',
      value: 3,
      axis: 'y',
      raw: 'gap-y-3',
      arbitrary: false,
    });
  });
  it('parses gap-[arbitrary]', () => {
    expect(parseGapUtility('gap-[10px]')).toEqual({
      type: 'gap',
      value: '10px',
      axis: 'both',
      raw: 'gap-[10px]',
      arbitrary: true,
    });
  });
  it('parses gap-x-[arbitrary]', () => {
    expect(parseGapUtility('gap-x-[1.5rem]')).toEqual({
      type: 'gap',
      value: '1.5rem',
      axis: 'x',
      raw: 'gap-x-[1.5rem]',
      arbitrary: true,
    });
  });
  it('parses gap-y-[arbitrary]', () => {
    expect(parseGapUtility('gap-y-[2em]')).toEqual({
      type: 'gap',
      value: '2em',
      axis: 'y',
      raw: 'gap-y-[2em]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseGapUtility('gap')).toBeNull();
    expect(parseGapUtility('gap-x')).toBeNull();
    expect(parseGapUtility('gap-y')).toBeNull();
    expect(parseGapUtility('gap-')).toBeNull();
    expect(parseGapUtility('gap-x-')).toBeNull();
    expect(parseGapUtility('gap-y-')).toBeNull();
    expect(parseGapUtility('gap-arbitrary')).toBeNull();
    expect(parseGapUtility('gap-x-arbitrary')).toBeNull();
    expect(parseGapUtility('gap-y-arbitrary')).toBeNull();
  });
}); 