import { describe, it, expect } from 'vitest';
import { parseJustifySelfUtility } from '../../src/parser/utilities/justifySelf';

describe('parseJustifySelfUtility', () => {
  it('parses justify-self-auto', () => {
    expect(parseJustifySelfUtility('justify-self-auto')).toEqual({
      type: 'justify-self',
      preset: 'auto',
      raw: 'justify-self-auto',
      arbitrary: false,
    });
  });
  it('parses justify-self-start', () => {
    expect(parseJustifySelfUtility('justify-self-start')).toEqual({
      type: 'justify-self',
      preset: 'start',
      raw: 'justify-self-start',
      arbitrary: false,
    });
  });
  it('parses justify-self-end', () => {
    expect(parseJustifySelfUtility('justify-self-end')).toEqual({
      type: 'justify-self',
      preset: 'end',
      raw: 'justify-self-end',
      arbitrary: false,
    });
  });
  it('parses justify-self-center', () => {
    expect(parseJustifySelfUtility('justify-self-center')).toEqual({
      type: 'justify-self',
      preset: 'center',
      raw: 'justify-self-center',
      arbitrary: false,
    });
  });
  it('parses justify-self-stretch', () => {
    expect(parseJustifySelfUtility('justify-self-stretch')).toEqual({
      type: 'justify-self',
      preset: 'stretch',
      raw: 'justify-self-stretch',
      arbitrary: false,
    });
  });
  it('parses justify-self-[arbitrary]', () => {
    expect(parseJustifySelfUtility('justify-self-[foobar]')).toEqual({
      type: 'justify-self',
      value: 'foobar',
      raw: 'justify-self-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseJustifySelfUtility('justify-self')).toBeNull();
    expect(parseJustifySelfUtility('justify-self-')).toBeNull();
    expect(parseJustifySelfUtility('justify-self-arbitrary')).toBeNull();
    expect(parseJustifySelfUtility('justify-items-center')).toBeNull();
  });
}); 