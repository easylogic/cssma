import { describe, it, expect } from 'vitest';
import { parseAlignSelfUtility } from '../../src/parser/utilities/alignSelf';

describe('parseAlignSelfUtility', () => {
  it('parses self-auto', () => {
    expect(parseAlignSelfUtility('self-auto')).toEqual({
      type: 'align-self',
      preset: 'auto',
      raw: 'self-auto',
      arbitrary: false,
    });
  });
  it('parses self-start', () => {
    expect(parseAlignSelfUtility('self-start')).toEqual({
      type: 'align-self',
      preset: 'start',
      raw: 'self-start',
      arbitrary: false,
    });
  });
  it('parses self-end', () => {
    expect(parseAlignSelfUtility('self-end')).toEqual({
      type: 'align-self',
      preset: 'end',
      raw: 'self-end',
      arbitrary: false,
    });
  });
  it('parses self-center', () => {
    expect(parseAlignSelfUtility('self-center')).toEqual({
      type: 'align-self',
      preset: 'center',
      raw: 'self-center',
      arbitrary: false,
    });
  });
  it('parses self-stretch', () => {
    expect(parseAlignSelfUtility('self-stretch')).toEqual({
      type: 'align-self',
      preset: 'stretch',
      raw: 'self-stretch',
      arbitrary: false,
    });
  });
  it('parses self-baseline', () => {
    expect(parseAlignSelfUtility('self-baseline')).toEqual({
      type: 'align-self',
      preset: 'baseline',
      raw: 'self-baseline',
      arbitrary: false,
    });
  });
  it('parses self-[arbitrary]', () => {
    expect(parseAlignSelfUtility('self-[foobar]')).toEqual({
      type: 'align-self',
      value: 'foobar',
      raw: 'self-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseAlignSelfUtility('self')).toBeNull();
    expect(parseAlignSelfUtility('self-')).toBeNull();
    expect(parseAlignSelfUtility('self-arbitrary')).toBeNull();
    expect(parseAlignSelfUtility('items-center')).toBeNull();
  });
}); 