import { describe, it, expect } from 'vitest';
import { parseFlexUtility } from '../../src/parser/utilities/flex';

describe('parseFlexUtility', () => {
  it('parses flex-row', () => {
    expect(parseFlexUtility('flex-row')).toEqual({
      type: 'flex-direction',
      preset: 'row',
      raw: 'flex-row',
      arbitrary: false,
    });
  });
  it('parses flex-row-reverse', () => {
    expect(parseFlexUtility('flex-row-reverse')).toEqual({
      type: 'flex-direction',
      preset: 'row-reverse',
      raw: 'flex-row-reverse',
      arbitrary: false,
    });
  });
  it('parses flex-col', () => {
    expect(parseFlexUtility('flex-col')).toEqual({
      type: 'flex-direction',
      preset: 'col',
      raw: 'flex-col',
      arbitrary: false,
    });
  });
  it('parses flex-col-reverse', () => {
    expect(parseFlexUtility('flex-col-reverse')).toEqual({
      type: 'flex-direction',
      preset: 'col-reverse',
      raw: 'flex-col-reverse',
      arbitrary: false,
    });
  });
  it('parses flex-wrap', () => {
    expect(parseFlexUtility('flex-wrap')).toEqual({
      type: 'flex-wrap',
      preset: 'wrap',
      raw: 'flex-wrap',
      arbitrary: false,
    });
  });
  it('parses flex-wrap-reverse', () => {
    expect(parseFlexUtility('flex-wrap-reverse')).toEqual({
      type: 'flex-wrap',
      preset: 'wrap-reverse',
      raw: 'flex-wrap-reverse',
      arbitrary: false,
    });
  });
  it('parses flex-nowrap', () => {
    expect(parseFlexUtility('flex-nowrap')).toEqual({
      type: 'flex-wrap',
      preset: 'nowrap',
      raw: 'flex-nowrap',
      arbitrary: false,
    });
  });
  it('parses flex-1', () => {
    expect(parseFlexUtility('flex-1')).toEqual({
      type: 'flex',
      preset: '1',
      raw: 'flex-1',
      arbitrary: false,
    });
  });
  it('parses flex-auto', () => {
    expect(parseFlexUtility('flex-auto')).toEqual({
      type: 'flex',
      preset: 'auto',
      raw: 'flex-auto',
      arbitrary: false,
    });
  });
  it('parses flex-initial', () => {
    expect(parseFlexUtility('flex-initial')).toEqual({
      type: 'flex',
      preset: 'initial',
      raw: 'flex-initial',
      arbitrary: false,
    });
  });
  it('parses flex-none', () => {
    expect(parseFlexUtility('flex-none')).toEqual({
      type: 'flex',
      preset: 'none',
      raw: 'flex-none',
      arbitrary: false,
    });
  });
  it('parses flex-[arbitrary]', () => {
    expect(parseFlexUtility('flex-[2_2_0%]')).toEqual({
      type: 'flex',
      value: '2_2_0%',
      raw: 'flex-[2_2_0%]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseFlexUtility('flex')).toBeNull();
    expect(parseFlexUtility('flex-')).toBeNull();
    expect(parseFlexUtility('flex-arbitrary')).toBeNull();
    expect(parseFlexUtility('flex-row-col')).toBeNull();
  });
}); 