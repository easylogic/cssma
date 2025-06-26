import { describe, it, expect } from 'vitest';
import { parseJustifySelf } from '../../src/parser/utilities/justifySelf';

describe('parseJustifySelfUtility', () => {
  it('parses justify-self-auto', () => {
    expect(parseJustifySelf('justify-self-auto')).toEqual({
      type: 'justify-self',
      preset: 'auto',
      raw: 'justify-self-auto',
      arbitrary: false,
    });
  });
  it('parses justify-self-start', () => {
    expect(parseJustifySelf('justify-self-start')).toEqual({
      type: 'justify-self',
      preset: 'start',
      raw: 'justify-self-start',
      arbitrary: false,
    });
  });
  it('parses justify-self-end', () => {
    expect(parseJustifySelf('justify-self-end')).toEqual({
      type: 'justify-self',
      preset: 'end',
      raw: 'justify-self-end',
      arbitrary: false,
    });
  });
  it('parses justify-self-center', () => {
    expect(parseJustifySelf('justify-self-center')).toEqual({
      type: 'justify-self',
      preset: 'center',
      raw: 'justify-self-center',
      arbitrary: false,
    });
  });
  it('parses justify-self-stretch', () => {
    expect(parseJustifySelf('justify-self-stretch')).toEqual({
      type: 'justify-self',
      preset: 'stretch',
      raw: 'justify-self-stretch',
      arbitrary: false,
    });
  });
  it('parses justify-self-[arbitrary]', () => {
    expect(parseJustifySelf('justify-self-[foobar]')).toEqual({
      type: 'justify-self',
      value: 'foobar',
      raw: 'justify-self-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseJustifySelf('justify-self')).toBeNull();
    expect(parseJustifySelf('justify-self-')).toBeNull();
    expect(parseJustifySelf('justify-self-arbitrary')).toBeNull();
    expect(parseJustifySelf('justify-items-center')).toBeNull();
  });
}); 