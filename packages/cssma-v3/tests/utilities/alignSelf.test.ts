import { describe, it, expect } from 'vitest';
import { parseAlignSelf } from '../../src/parser/utilities/alignSelf';

describe('parseAlignSelfUtility', () => {
  it('parses self-auto', () => {
    expect(parseAlignSelf('self-auto')).toEqual({
      type: 'align-self',
      preset: 'auto',
      raw: 'self-auto',
      arbitrary: false,
    });
  });
  it('parses self-start', () => {
    expect(parseAlignSelf('self-start')).toEqual({
      type: 'align-self',
      preset: 'start',
      raw: 'self-start',
      arbitrary: false,
    });
  });
  it('parses self-end', () => {
    expect(parseAlignSelf('self-end')).toEqual({
      type: 'align-self',
      preset: 'end',
      raw: 'self-end',
      arbitrary: false,
    });
  });
  it('parses self-center', () => {
    expect(parseAlignSelf('self-center')).toEqual({
      type: 'align-self',
      preset: 'center',
      raw: 'self-center',
      arbitrary: false,
    });
  });
  it('parses self-stretch', () => {
    expect(parseAlignSelf('self-stretch')).toEqual({
      type: 'align-self',
      preset: 'stretch',
      raw: 'self-stretch',
      arbitrary: false,
    });
  });
  it('parses self-baseline', () => {
    expect(parseAlignSelf('self-baseline')).toEqual({
      type: 'align-self',
      preset: 'baseline',
      raw: 'self-baseline',
      arbitrary: false,
    });
  });
  it('parses self-[arbitrary]', () => {
    expect(parseAlignSelf('self-[foobar]')).toEqual({
      type: 'align-self',
      value: 'foobar',
      raw: 'self-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseAlignSelf('self')).toBeNull();
    expect(parseAlignSelf('self-')).toBeNull();
    expect(parseAlignSelf('self-arbitrary')).toBeNull();
    expect(parseAlignSelf('items-center')).toBeNull();
  });
}); 