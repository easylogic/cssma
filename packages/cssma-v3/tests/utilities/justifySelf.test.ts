import { describe, it, expect } from 'vitest';
import { parseAlignment } from '../../src/parser/utilities/alignment';

describe('parseJustifySelfUtility', () => {
  it('parses justify-self-auto', () => {
    expect(parseAlignment('justify-self-auto')).toEqual({
      type: 'justify-self',
      preset: 'auto',
      raw: 'justify-self-auto',
      arbitrary: false,
    });
  });
  it('parses justify-self-start', () => {
    expect(parseAlignment('justify-self-start')).toEqual({
      type: 'justify-self',
      preset: 'start',
      raw: 'justify-self-start',
      arbitrary: false,
    });
  });
  it('parses justify-self-end', () => {
    expect(parseAlignment('justify-self-end')).toEqual({
      type: 'justify-self',
      preset: 'end',
      raw: 'justify-self-end',
      arbitrary: false,
    });
  });
  it('parses justify-self-center', () => {
    expect(parseAlignment('justify-self-center')).toEqual({
      type: 'justify-self',
      preset: 'center',
      raw: 'justify-self-center',
      arbitrary: false,
    });
  });
  it('parses justify-self-stretch', () => {
    expect(parseAlignment('justify-self-stretch')).toEqual({
      type: 'justify-self',
      preset: 'stretch',
      raw: 'justify-self-stretch',
      arbitrary: false,
    });
  });
  it('parses justify-self-[arbitrary]', () => {
    expect(parseAlignment('justify-self-[foobar]')).toEqual({
      type: 'justify-self',
      value: 'foobar',
      raw: 'justify-self-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseAlignment('justify-self')).toBeNull();
    expect(parseAlignment('justify-self-')).toBeNull();
    expect(parseAlignment('justify-self-arbitrary')).toBeNull();
    expect(parseAlignment('justify-items-center')).toBeNull();
  });
}); 