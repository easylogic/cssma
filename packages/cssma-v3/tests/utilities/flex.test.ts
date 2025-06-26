import { describe, it, expect } from 'vitest';
import { parseFlex } from '../../src/parser/utilities/flex';

describe('parseFlexUtility', () => {
  it('parses flex-row', () => {
    expect(parseFlex('flex-row')).toEqual({
      type: 'flex-direction',
      preset: 'row',
      raw: 'flex-row',
      arbitrary: false,
    });
  });
  it('parses flex-row-reverse', () => {
    expect(parseFlex('flex-row-reverse')).toEqual({
      type: 'flex-direction',
      preset: 'row-reverse',
      raw: 'flex-row-reverse',
      arbitrary: false,
    });
  });
  it('parses flex-col', () => {
    expect(parseFlex('flex-col')).toEqual({
      type: 'flex-direction',
      preset: 'col',
      raw: 'flex-col',
      arbitrary: false,
    });
  });
  it('parses flex-col-reverse', () => {
    expect(parseFlex('flex-col-reverse')).toEqual({
      type: 'flex-direction',
      preset: 'col-reverse',
      raw: 'flex-col-reverse',
      arbitrary: false,
    });
  });
  it('parses flex-wrap', () => {
    expect(parseFlex('flex-wrap')).toEqual({
      type: 'flex-wrap',
      preset: 'wrap',
      raw: 'flex-wrap',
      arbitrary: false,
    });
  });
  it('parses flex-wrap-reverse', () => {
    expect(parseFlex('flex-wrap-reverse')).toEqual({
      type: 'flex-wrap',
      preset: 'wrap-reverse',
      raw: 'flex-wrap-reverse',
      arbitrary: false,
    });
  });
  it('parses flex-nowrap', () => {
    expect(parseFlex('flex-nowrap')).toEqual({
      type: 'flex-wrap',
      preset: 'nowrap',
      raw: 'flex-nowrap',
      arbitrary: false,
    });
  });
  it('parses flex-1', () => {
    expect(parseFlex('flex-1')).toEqual({
      type: 'flex',
      preset: '1',
      raw: 'flex-1',
      arbitrary: false,
    });
  });
  it('parses flex-auto', () => {
    expect(parseFlex('flex-auto')).toEqual({
      type: 'flex',
      preset: 'auto',
      raw: 'flex-auto',
      arbitrary: false,
    });
  });
  it('parses flex-initial', () => {
    expect(parseFlex('flex-initial')).toEqual({
      type: 'flex',
      preset: 'initial',
      raw: 'flex-initial',
      arbitrary: false,
    });
  });
  it('parses flex-none', () => {
    expect(parseFlex('flex-none')).toEqual({
      type: 'flex',
      preset: 'none',
      raw: 'flex-none',
      arbitrary: false,
    });
  });
  it('parses flex-[arbitrary]', () => {
    expect(parseFlex('flex-[2_2_0%]')).toEqual({
      type: 'flex',
      value: '2_2_0%',
      raw: 'flex-[2_2_0%]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseFlex('flex')).toBeNull();
    expect(parseFlex('flex-')).toBeNull();
    expect(parseFlex('flex-arbitrary')).toBeNull();
    expect(parseFlex('flex-row-col')).toBeNull();
  });
}); 