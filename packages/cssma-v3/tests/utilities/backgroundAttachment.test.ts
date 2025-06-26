import { describe, it, expect } from 'vitest';
import { parseBackgroundAttachment } from '../../src/parser/utilities/backgroundAttachment';

describe('parseBackgroundAttachment', () => {
  it('parses bg-fixed', () => {
    expect(parseBackgroundAttachment('bg-fixed')).toEqual({
      type: 'background-attachment',
      preset: 'fixed',
      raw: 'bg-fixed',
      arbitrary: false,
    });
  });

  it('parses bg-local', () => {
    expect(parseBackgroundAttachment('bg-local')).toEqual({
      type: 'background-attachment',
      preset: 'local',
      raw: 'bg-local',
      arbitrary: false,
    });
  });

  it('parses bg-scroll', () => {
    expect(parseBackgroundAttachment('bg-scroll')).toEqual({
      type: 'background-attachment',
      preset: 'scroll',
      raw: 'bg-scroll',
      arbitrary: false,
    });
  });

  it('returns null for invalid value (bg-foo)', () => {
    expect(parseBackgroundAttachment('bg-foo')).toBeNull();
  });

  it('returns null for empty value (bg-)', () => {
    expect(parseBackgroundAttachment('bg-')).toBeNull();
  });

  it('returns null for similar but invalid (bg-fixedx)', () => {
    expect(parseBackgroundAttachment('bg-fixedx')).toBeNull();
  });
}); 